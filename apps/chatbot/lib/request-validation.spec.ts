import type { LanguageModel, UIMessage } from 'ai';
import { convertToModelMessages, streamText } from 'ai';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { loadMcpTools, trimHistoryForBudget } from './chat-route-helpers';
import { activeProvider, chatModel } from './model';

vi.mock('ai', () => ({
    convertToModelMessages: vi.fn(),
    stepCountIs: vi.fn(() => ({ type: 'step-count' })),
    streamText: vi.fn()
}));

vi.mock('./chat-route-helpers', async () => {
    const actual = await vi.importActual<typeof import('./chat-route-helpers')>('./chat-route-helpers');

    return {
        ...actual,
        loadMcpTools: vi.fn()
    };
});

vi.mock('./model', () => ({
    FILE_CAPABLE_PROVIDERS: new Set(['google', 'anthropic']),
    activeProvider: vi.fn(() => 'google'),
    chatModel: vi.fn()
}));

const SAFE_PUBLIC_ERROR = 'The assistant could not complete this request';
const INVALID_REQUEST_ERROR = 'Invalid chat request';
const REQUEST_TOO_LARGE_ERROR = 'Chat request is too large';
const MAX_BODY_BYTES = 8 * 1024 * 1024;
const MAX_HISTORY_MESSAGES = 8;
const MAX_TOTAL_TEXT_BYTES = 64 * 1024;
const MAX_TEXT_PART_BYTES = 16 * 1024;
const MAX_FILES = 3;
const MAX_FILE_BYTES = 5 * 1024 * 1024;

type RoutePost = (request: Request) => Promise<Response>;

type StreamHooks = {
    abortSignal?: AbortSignal;
    onError?: (event: unknown) => void | Promise<void>;
    onFinish?: () => void | Promise<void>;
    onStepEnd?: (step: unknown) => void;
};

type ResponseHooks = {
    onError?: (error: unknown) => string;
};

const convertToModelMessagesMock = vi.mocked(convertToModelMessages);
const streamTextMock = vi.mocked(streamText);
const loadMcpToolsMock = vi.mocked(loadMcpTools);
const activeProviderMock = vi.mocked(activeProvider);
const chatModelMock = vi.mocked(chatModel);

let POST: RoutePost;
let streamHooks: StreamHooks | undefined;
let responseHooks: ResponseHooks | undefined;

beforeAll(async () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('MCP_LOG_TOOLS', '1');
    ({ POST } = await import('../app/api/chat/route'));
});

beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('MCP_SERVER_URL', 'https://fake.invalid/api/mcp?token=fake-token');
    streamHooks = undefined;
    responseHooks = undefined;
    activeProviderMock.mockReturnValue('google');
});

function jsonRequest(payload: unknown, signal?: AbortSignal): Request {
    return new Request('https://fake.invalid/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
        signal
    });
}

function textPart(text: string): { type: 'text'; text: string } {
    return { type: 'text', text };
}

function userMessage(parts: unknown[], id = 'fake-user'): UIMessage {
    return { id, role: 'user', parts } as unknown as UIMessage;
}

function assistantMessage(parts: unknown[], id = 'fake-assistant'): UIMessage {
    return { id, role: 'assistant', parts } as unknown as UIMessage;
}

function payload(messages: unknown[]): { messages: unknown[] } {
    return { messages };
}

function dataUrl(mediaType: string, bytes: Uint8Array): string {
    return 'data:' + mediaType + ';base64,' + Buffer.from(bytes).toString('base64');
}

const FILE_SIGNATURES = {
    'image/png': Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    'image/jpeg': Buffer.from([0xff, 0xd8, 0xff, 0xe0]),
    'image/webp': Buffer.from('RIFF0000WEBP', 'ascii'),
    'image/gif': Buffer.from('GIF89a', 'ascii'),
    'application/pdf': Buffer.from('%PDF-1.7\\n', 'ascii')
} as const;

type SupportedMediaType = keyof typeof FILE_SIGNATURES;

function fakeFile(mediaType: SupportedMediaType, size = FILE_SIGNATURES[mediaType].byteLength): Record<string, string> {
    const signature = FILE_SIGNATURES[mediaType];
    const bytes = Buffer.concat([signature, Buffer.alloc(Math.max(0, size - signature.byteLength), 0x41)]);

    return {
        type: 'file',
        mediaType,
        filename: 'fake-' + mediaType.replace(/[^a-z]/g, '-'),
        url: dataUrl(mediaType, bytes)
    };
}

function chunkedRequest(
    chunks: string[],
    contentLength?: string
): {
    request: Request;
    state: { pulls: number; cancelled: boolean };
} {
    let index = 0;
    const state = { pulls: 0, cancelled: false };
    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
        pull(controller) {
            state.pulls++;
            if (index < chunks.length) {
                controller.enqueue(encoder.encode(chunks[index++]));
            } else {
                controller.close();
            }
        },
        cancel() {
            state.cancelled = true;
        }
    });
    const headers = new Headers({ 'content-type': 'application/json' });
    if (contentLength !== undefined) {
        headers.set('content-length', contentLength);
    }
    const init: RequestInit & { duplex: 'half' } = {
        method: 'POST',
        headers,
        body,
        duplex: 'half'
    };

    return { request: new Request('https://fake.invalid/api/chat', init), state };
}

function configureSuccessfulStream(): { close: ReturnType<typeof vi.fn>; response: Response } {
    const close = vi.fn(async (): Promise<void> => undefined);
    loadMcpToolsMock.mockResolvedValue({ tools: {}, close });
    convertToModelMessagesMock.mockResolvedValue([]);
    chatModelMock.mockReturnValue({} as LanguageModel);

    const response = new Response('fake-stream');
    const result = {
        toUIMessageStreamResponse: vi.fn((options: unknown) => {
            responseHooks = options as ResponseHooks;
            return response;
        })
    };
    streamTextMock.mockImplementation((options) => {
        streamHooks = options as unknown as StreamHooks;
        return result as unknown as ReturnType<typeof streamText>;
    });

    return { close, response };
}

async function flushMicrotasks(): Promise<void> {
    await Promise.resolve();
    await Promise.resolve();
}

async function expectValidationResponse(requestPayload: unknown, status: number, message: string): Promise<void> {
    const response = await POST(jsonRequest(requestPayload));

    expect(response.status).toBe(status);
    await expect(response.json()).resolves.toEqual({ error: message });
    expect(loadMcpToolsMock).not.toHaveBeenCalled();
    expect(chatModelMock).not.toHaveBeenCalled();
    expect(streamTextMock).not.toHaveBeenCalled();
}

describe('reference chat request limits', () => {
    it.each([
        ['without Content-Length', undefined],
        ['with a false Content-Length', '1']
    ])('stops reading a chunked body above 8 MiB %s before MCP/model creation', async (_label, contentLength) => {
        configureSuccessfulStream();
        const chunkSize = 1024 * 1024;
        const chunks = [
            '{"messages":[{"id":"fake","role":"user","parts":[{"type":"text","text":"',
            ...Array.from({ length: MAX_BODY_BYTES / chunkSize + 1 }, () => 'A'.repeat(chunkSize)),
            '"}]}]}'
        ];
        const { request, state } = chunkedRequest(chunks, contentLength);

        const response = await POST(request);

        expect(response.status).toBe(413);
        await expect(response.json()).resolves.toEqual({ error: REQUEST_TOO_LARGE_ERROR });
        expect(state.pulls).toBeLessThan(chunks.length);
        expect(state.cancelled).toBe(true);
        expect(loadMcpToolsMock).not.toHaveBeenCalled();
        expect(chatModelMock).not.toHaveBeenCalled();
    });

    it('keeps at most the newest eight messages before conversion', async () => {
        configureSuccessfulStream();
        const messages = Array.from({ length: 12 }, (_, index) =>
            index % 2 === 0
                ? userMessage([textPart('fake message ' + index)], 'fake-' + index)
                : assistantMessage([textPart('fake message ' + index)], 'fake-' + index)
        );

        await POST(jsonRequest(payload(messages)));

        const convertedMessages = convertToModelMessagesMock.mock.calls[0]?.[0] as UIMessage[];
        expect(convertedMessages).toHaveLength(MAX_HISTORY_MESSAGES);
        expect(convertedMessages.map((message) => message.id)).toEqual([
            'fake-4',
            'fake-5',
            'fake-6',
            'fake-7',
            'fake-8',
            'fake-9',
            'fake-10',
            'fake-11'
        ]);
    });

    it('accepts exactly 64 KiB of text when every text part is at most 16 KiB', async () => {
        configureSuccessfulStream();
        const messages = Array.from({ length: 4 }, (_, index) =>
            (index % 2 === 0 ? userMessage : assistantMessage)(
                [textPart('T'.repeat(MAX_TEXT_PART_BYTES))],
                'fake-' + index
            )
        );

        const response = await POST(jsonRequest(payload(messages)));

        expect(response.status).toBe(200);
        expect(loadMcpToolsMock).toHaveBeenCalledTimes(1);
    });

    it('rejects a text part over 16 KiB before MCP/model creation', async () => {
        await expectValidationResponse(
            payload([userMessage([textPart('T'.repeat(MAX_TEXT_PART_BYTES + 1))])]),
            413,
            REQUEST_TOO_LARGE_ERROR
        );
    });

    it('rejects total text over 64 KiB before MCP/model creation', async () => {
        const messages = Array.from({ length: 4 }, (_, index) =>
            userMessage([textPart('T'.repeat(MAX_TEXT_PART_BYTES + (index === 3 ? 1 : 0)))], 'fake-' + index)
        );

        await expectValidationResponse(payload(messages), 413, REQUEST_TOO_LARGE_ERROR);
    });

    it.each([
        ['missing messages', {}, 400],
        ['messages with a malformed shape', { messages: [{ id: 'fake', role: 'user' }] }, 400],
        ['an unsupported part', payload([userMessage([{ type: 'audio', data: 'fake-audio' }])]), 400],
        [
            'a file on an earlier turn',
            payload([userMessage([fakeFile('image/png')], 'fake-old'), userMessage([textPart('fake question')])]),
            400
        ],
        [
            'a fourth file',
            payload([
                userMessage([
                    textPart('fake question'),
                    ...Array.from({ length: MAX_FILES + 1 }, () => fakeFile('image/png'))
                ])
            ]),
            400
        ],
        [
            'invalid base64',
            payload([
                userMessage([
                    textPart('fake question'),
                    { ...fakeFile('image/png'), url: 'data:image/png;base64,%%%%' }
                ])
            ]),
            400
        ],
        [
            'unsupported file type',
            payload([
                userMessage([
                    textPart('fake question'),
                    { ...fakeFile('image/png'), mediaType: 'text/plain', url: 'data:text/plain;base64,ZmFrZQ==' }
                ])
            ]),
            400
        ],
        [
            'a MIME/signature mismatch',
            payload([
                userMessage([
                    textPart('fake question'),
                    { ...fakeFile('image/png'), url: dataUrl('image/png', FILE_SIGNATURES['application/pdf']) }
                ])
            ]),
            400
        ],
        [
            'a decoded file aggregate over 5 MiB',
            payload([userMessage([textPart('fake question'), fakeFile('image/png', MAX_FILE_BYTES + 1)])]),
            413
        ]
    ])('returns a stable %s validation response before MCP/model creation', async (_name, requestPayload, status) => {
        await expectValidationResponse(
            requestPayload,
            status,
            status === 413 ? REQUEST_TOO_LARGE_ERROR : INVALID_REQUEST_ERROR
        );
    });

    it.each(Object.keys(FILE_SIGNATURES) as SupportedMediaType[])(
        'accepts a current-turn %s file with a strict signature',
        async (mediaType) => {
            configureSuccessfulStream();

            const response = await POST(
                jsonRequest(payload([userMessage([textPart('fake question'), fakeFile(mediaType)])]))
            );

            expect(response.status).toBe(200);
            expect(loadMcpToolsMock).toHaveBeenCalledTimes(1);
            expect(chatModelMock).toHaveBeenCalledTimes(1);
        }
    );
});

describe('reference chat safe failures and lifecycle cleanup', () => {
    it.each([
        ['MCP load', async () => loadMcpToolsMock.mockRejectedValue(new Error('fake-mcp-secret'))],
        [
            'conversion',
            async () => {
                configureSuccessfulStream();
                convertToModelMessagesMock.mockRejectedValue(new Error('fake-conversion-secret'));
            }
        ],
        [
            'provider creation',
            async () => {
                configureSuccessfulStream();
                chatModelMock.mockImplementation(() => {
                    throw new Error('fake-provider-secret');
                });
            }
        ],
        [
            'stream creation',
            async () => {
                configureSuccessfulStream();
                streamTextMock.mockImplementation(() => {
                    throw new Error('fake-stream-secret');
                });
            }
        ]
    ])('does not expose the raw %s error', async (_stage, arrange) => {
        await arrange();
        const response = await POST(jsonRequest(payload([userMessage([textPart('fake question')])])));

        expect(response.status).toBe(500);
        await expect(response.json()).resolves.toEqual({ error: SAFE_PUBLIC_ERROR });
    });

    it('returns one stable public message for a stream error', async () => {
        configureSuccessfulStream();
        await POST(jsonRequest(payload([userMessage([textPart('fake question')])])));

        expect(responseHooks?.onError?.(new Error('fake-provider-stream-secret'))).toBe(SAFE_PUBLIC_ERROR);
    });

    it('closes an opened MCP client exactly once when conversion fails before stream creation', async () => {
        const { close } = configureSuccessfulStream();
        convertToModelMessagesMock.mockRejectedValue(new Error('fake-conversion-secret'));

        await POST(jsonRequest(payload([userMessage([textPart('fake question')])])));

        expect(close).toHaveBeenCalledTimes(1);
        expect(streamTextMock).not.toHaveBeenCalled();
    });

    it('aborts provider work and closes MCP exactly once on finish', async () => {
        const { close } = configureSuccessfulStream();
        await POST(jsonRequest(payload([userMessage([textPart('fake question')])])));

        streamHooks?.onFinish?.();
        await flushMicrotasks();

        expect(streamHooks?.abortSignal?.aborted).toBe(true);
        expect(close).toHaveBeenCalledTimes(1);
    });

    it('aborts provider work and closes MCP exactly once on stream error', async () => {
        const { close } = configureSuccessfulStream();
        await POST(jsonRequest(payload([userMessage([textPart('fake question')])])));

        streamHooks?.onError?.({ error: new Error('fake-provider-stream-secret') });
        await flushMicrotasks();

        expect(streamHooks?.abortSignal?.aborted).toBe(true);
        expect(close).toHaveBeenCalledTimes(1);
    });

    it('aborts provider work and closes MCP exactly once when the response body is cancelled', async () => {
        const { close } = configureSuccessfulStream();
        const response = await POST(jsonRequest(payload([userMessage([textPart('fake question')])])));

        await response.body?.cancel('fake-client-cancel');
        await flushMicrotasks();

        expect(streamHooks?.abortSignal?.aborted).toBe(true);
        expect(close).toHaveBeenCalledTimes(1);
    });

    it('aborts provider work and closes MCP exactly once when the client disconnects', async () => {
        const { close } = configureSuccessfulStream();
        const controller = new AbortController();
        await POST(jsonRequest(payload([userMessage([textPart('fake question')])]), controller.signal));

        controller.abort();
        await flushMicrotasks();

        expect(streamHooks?.abortSignal?.aborted).toBe(true);
        expect(close).toHaveBeenCalledTimes(1);
    });

    it('keeps cleanup idempotent when finish, error, cancellation, and disconnect race', async () => {
        const { close } = configureSuccessfulStream();
        const controller = new AbortController();
        const response = await POST(
            jsonRequest(payload([userMessage([textPart('fake question')])]), controller.signal)
        );

        streamHooks?.onFinish?.();
        streamHooks?.onError?.({ error: new Error('fake-provider-stream-secret') });
        controller.abort();
        await response.body?.cancel('fake-client-cancel');
        await flushMicrotasks();

        expect(streamHooks?.abortSignal?.aborted).toBe(true);
        expect(close).toHaveBeenCalledTimes(1);
    });
});

describe('reference chat diagnostic redaction', () => {
    it('logs only tool names, duration, counts, and outcome', async () => {
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);
        const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
        try {
            configureSuccessfulStream();
            await POST(jsonRequest(payload([userMessage([textPart('fake prompt text')])])));

            streamHooks?.onStepEnd?.({
                toolCalls: [{ toolName: 'search_components', input: { query: 'fake-query' } }],
                toolResults: [{ toolName: 'search_components', output: { preview: 'fake-result-preview' } }]
            });
            streamHooks?.onError?.({ error: new Error('fake-raw-provider-error') });
            await flushMicrotasks();

            const output = [...logSpy.mock.calls, ...errorSpy.mock.calls]
                .flat()
                .map((value) => String(value))
                .join('\\n');

            expect(output).toContain('search_components');
            expect(output).toMatch(/duration|elapsed/i);
            expect(output).toMatch(/count/i);
            expect(output).toMatch(/outcome|success|failure/i);
            for (const forbidden of [
                'fake-query',
                'fake prompt text',
                'fake-result-preview',
                'fake-raw-provider-error',
                'fake-token',
                'https://fake.invalid'
            ]) {
                expect(output).not.toContain(forbidden);
            }
        } finally {
            logSpy.mockRestore();
            errorSpy.mockRestore();
        }
    });
});

describe('request-validation contract constants', () => {
    it('keeps the intended security ceilings explicit in this RED suite', () => {
        expect(MAX_BODY_BYTES).toBe(8 * 1024 * 1024);
        expect(MAX_HISTORY_MESSAGES).toBe(8);
        expect(MAX_TOTAL_TEXT_BYTES).toBe(64 * 1024);
        expect(MAX_TEXT_PART_BYTES).toBe(16 * 1024);
        expect(MAX_FILES).toBe(3);
        expect(MAX_FILE_BYTES).toBe(5 * 1024 * 1024);
        expect(trimHistoryForBudget).toBeTypeOf('function');
    });
});
