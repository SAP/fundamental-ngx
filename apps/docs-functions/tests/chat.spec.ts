import chat, { config } from '../src/chat';
import {
    APPROVED_READ_ONLY_TOOLS,
    CHAT_ORIGIN,
    DEPLOYED_ATTACHMENT_LIMIT_BYTES,
    DEPLOYED_CHAT_BODY_LIMIT_BYTES,
    FIXTURE_API_KEY,
    LOCAL_ATTACHMENT_LIMIT_BYTES,
    LOCAL_CHAT_BODY_LIMIT_BYTES,
    bodyWithExactJsonBytes,
    fakeAttachment,
    jsonRequest,
    replaceAttachmentDataUrl,
    responseEvents,
    sharedGeminiState,
    sharedMcpState
} from './fixtures/fakes';

jest.mock('@ai-sdk/mcp', () => ({
    createMCPClient: jest.fn(async ({ transport }: { transport: { url: string } }) => {
        const { sharedMcpState: mockedMcpState } = require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedMcpState.openedUrls.push(transport.url);
        return {
            tools: async () =>
                Object.fromEntries(mockedMcpState.toolNames.map((name) => [name, { description: name }])),
            callTool: async ({ name, arguments: args }: { name: string; arguments: unknown }) => {
                mockedMcpState.calls.push({ name, args });
                if (mockedMcpState.blockTools) {
                    return new Promise(() => undefined);
                }
                if (mockedMcpState.failTools) {
                    throw new Error('fixture MCP failure');
                }
                const result =
                    name === 'search_components'
                        ? { results: [{ name: 'DialogComponent', selector: 'fd-dialog' }] }
                        : {
                              name: 'DialogComponent',
                              selector: 'fd-dialog',
                              docsUrl: require('./fixtures/fakes').FIXTURE_DOCS_URL
                          };
                return { content: [{ type: 'text', text: JSON.stringify(result) }] };
            },
            close: async () => {
                mockedMcpState.closeCalls += 1;
            }
        };
    })
}));

jest.mock('@ai-sdk/google', () => ({
    createGoogleGenerativeAI: jest.fn(({ apiKey }: { apiKey: string }) => {
        const { sharedGeminiState: mockedGeminiState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedGeminiState.keys.push(apiKey);
        return () => ({ provider: 'fixture-gemini' });
    })
}));

jest.mock('@ai-sdk/groq', () => ({
    createGroq: jest.fn(({ apiKey }: { apiKey: string }) => {
        const { sharedGeminiState: mockedModelState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedModelState.keys.push(apiKey);
        return () => ({ provider: 'fixture-groq' });
    })
}));

jest.mock('@ai-sdk/anthropic', () => ({
    createAnthropic: jest.fn(({ apiKey }: { apiKey: string }) => {
        const { sharedGeminiState: mockedModelState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedModelState.keys.push(apiKey);
        return () => ({ provider: 'fixture-anthropic' });
    })
}));

jest.mock('ai', () => ({
    convertToModelMessages: async (messages: unknown) => messages,
    stepCountIs: (value: number) => ({ type: 'step-count', value }),
    streamText: (options: unknown) => {
        const { sharedGeminiState: mockedGeminiState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        const { abortSignal } = options as { abortSignal: AbortSignal };
        mockedGeminiState.calls += 1;
        mockedGeminiState.options.push(options);
        mockedGeminiState.prompts.push(JSON.stringify(options));
        return {
            textStream: (async function* () {
                if (!mockedGeminiState.emptyStream) {
                    yield 'fixture answer';
                }
                if (mockedGeminiState.blockStream) {
                    await new Promise((_, reject) => {
                        if (abortSignal.aborted) {
                            reject(new Error('fixture aborted'));
                            return;
                        }
                        abortSignal.addEventListener('abort', () => reject(new Error('fixture aborted')), {
                            once: true
                        });
                    });
                }
            })(),
            toTextStreamResponse: () => new Response('fixture answer'),
            toUIMessageStreamResponse: () => new Response('fixture answer')
        };
    }
}));

describe('/api/chat request and orchestration contract', () => {
    const providerEnvironmentKeys = [
        'NETLIFY_DEV',
        'GOOGLE_GENERATIVE_AI_API_KEY',
        'GROQ_API_KEY',
        'ANTHROPIC_BASE_URL',
        'ANTHROPIC_API_KEY',
        'CHAT_MODEL'
    ] as const;
    const originalProviderEnvironment = Object.fromEntries(
        providerEnvironmentKeys.map((key) => [key, process.env[key]])
    );

    beforeEach(() => {
        sharedMcpState.openedUrls.length = 0;
        sharedMcpState.closeCalls = 0;
        sharedMcpState.calls.length = 0;
        sharedMcpState.toolNames = [...APPROVED_READ_ONLY_TOOLS];
        sharedMcpState.blockTools = false;
        sharedMcpState.failTools = false;
        sharedGeminiState.keys.length = 0;
        sharedGeminiState.prompts.length = 0;
        sharedGeminiState.options.length = 0;
        sharedGeminiState.calls = 0;
        sharedGeminiState.blockStream = false;
        sharedGeminiState.emptyStream = false;
        sharedGeminiState.streamErrorAfterStart = false;
        delete process.env.MCP_SERVER_URL;
        providerEnvironmentKeys.forEach((key) => delete process.env[key]);
    });

    afterAll(() => {
        providerEnvironmentKeys.forEach((key) => {
            const value = originalProviderEnvironment[key];
            if (value === undefined) {
                delete process.env[key];
            } else {
                process.env[key] = value;
            }
        });
    });

    const validBody = { messages: [{ role: 'user', content: 'How do I use fd-dialog?' }] };
    const validRequest = (body: unknown = validBody, init: RequestInit = {}): Request => {
        if (init.method && init.method !== 'POST') {
            return new Request(CHAT_ORIGIN + '/api/chat', {
                method: init.method,
                headers: { 'content-type': 'application/json', 'x-gemini-api-key': FIXTURE_API_KEY, ...init.headers }
            });
        }
        return jsonRequest(CHAT_ORIGIN + '/api/chat', body, {
            ...init,
            headers: { 'x-gemini-api-key': FIXTURE_API_KEY, ...init.headers }
        });
    };
    const attachmentBody = (
        attachments: unknown[],
        content = 'Explain fd-dialog with these files'
    ): { messages: [{ role: 'user'; content: string; attachments: unknown[] }] } => ({
        messages: [{ role: 'user', content, attachments }]
    });
    const modelOptions = (): { messages: Array<{ role: string; content: unknown }> } =>
        sharedGeminiState.options[0] as { messages: Array<{ role: string; content: unknown }> };

    it('exports a 10/minute IP-and-domain rate limit', () => {
        expect(config).toEqual({
            rateLimit: { windowSize: 60, windowLimit: 10, aggregateBy: ['ip', 'domain'] }
        });
    });

    it('resolves the same-origin MCP endpoint from the incoming chat request', async () => {
        await chat(validRequest());

        expect(sharedMcpState.openedUrls).toEqual([CHAT_ORIGIN + '/api/mcp']);
    });

    it('uses a valid absolute MCP_SERVER_URL override instead of same-origin resolution', async () => {
        process.env.MCP_SERVER_URL = 'https://separate-mcp.example.test/api/mcp';

        await chat(validRequest());

        expect(sharedMcpState.openedUrls).toEqual(['https://separate-mcp.example.test/api/mcp']);
    });

    it.each(['javascript:alert(1)', 'file:///tmp/mcp', '/attacker-controlled-mcp'])(
        'rejects an invalid MCP_SERVER_URL protocol or non-absolute override: %s',
        async (url) => {
            process.env.MCP_SERVER_URL = url;

            const response = await chat(validRequest());

            expect(response.status).toBe(500);
            expect(sharedMcpState.openedUrls).toEqual([]);
        }
    );

    it('never accepts an MCP URL supplied by the request body or query string', async () => {
        const response = await chat(
            jsonRequest(
                CHAT_ORIGIN + '/api/chat?MCP_SERVER_URL=https://attacker.example',
                {
                    mcpServerUrl: 'https://attacker.example',
                    messages: [{ role: 'user', content: 'Find fd-dialog' }]
                },
                { headers: { 'x-gemini-api-key': FIXTURE_API_KEY } }
            )
        );

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(sharedMcpState.openedUrls).not.toContain('https://attacker.example');
    });

    it.each(['GET', 'PUT', 'PATCH', 'DELETE'])('enforces POST-only chat: %s', async (method) => {
        const response = await chat(validRequest(undefined, { method }));

        expect(response.status).toBe(405);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('rejects non-JSON requests before opening MCP or invoking Gemini', async () => {
        const response = await chat(
            new Request(CHAT_ORIGIN + '/api/chat', {
                method: 'POST',
                headers: { 'content-type': 'text/plain', 'x-gemini-api-key': FIXTURE_API_KEY },
                body: 'messages'
            })
        );

        expect(response.status).toBe(415);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('requires x-gemini-api-key and never starts expensive work without it', async () => {
        const request = jsonRequest(CHAT_ORIGIN + '/api/chat', validBody);
        const response = await chat(request);

        expect(response.status).toBe(401);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('keeps the server-side provider unavailable to deployed requests', async () => {
        process.env.NETLIFY_DEV = 'true';
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'local-fixture-key';

        const response = await chat(jsonRequest(CHAT_ORIGIN + '/api/chat', validBody));

        expect(response.status).toBe(401);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('detects and uses a server-side Google provider only in local Netlify Dev', async () => {
        process.env.NETLIFY_DEV = 'true';
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'local-fixture-key';

        const statusResponse = await chat(new Request('http://localhost:8888/api/chat'));
        const response = await chat(jsonRequest('http://localhost:8888/api/chat', validBody));
        await response.text();

        await expect(statusResponse.json()).resolves.toEqual({
            localProvider: true,
            attachmentLimitBytes: LOCAL_ATTACHMENT_LIMIT_BYTES
        });
        expect(statusResponse.headers.get('cache-control')).toBe('no-store');
        expect(sharedGeminiState.keys).toEqual(['local-fixture-key']);
        expect(sharedGeminiState.calls).toBe(1);
    });

    it('uses the local Anthropic-compatible proxy without exposing its credentials', async () => {
        process.env.NETLIFY_DEV = 'true';
        process.env.ANTHROPIC_BASE_URL = 'http://localhost:6655/anthropic/v1';
        process.env.ANTHROPIC_API_KEY = 'local-anthropic-fixture-key';

        const response = await chat(jsonRequest('http://127.0.0.1:8888/api/chat', validBody));
        const responseText = await response.text();
        const options = sharedGeminiState.options[0] as {
            model: { provider: string };
            providerOptions: { anthropic: { toolStreaming: boolean } };
        };

        expect(response.status).toBe(200);
        expect(options.model.provider).toBe('fixture-anthropic');
        expect(options.providerOptions).toEqual({ anthropic: { toolStreaming: false } });
        expect(responseText).not.toContain('local-anthropic-fixture-key');
    });

    it.each([
        {},
        { messages: [] },
        { messages: 'not-an-array' },
        { messages: [{ role: 'user', content: '' }] },
        { messages: [{ role: 'assistant', content: 'no user question' }] },
        { messages: [{ role: 'user', content: '   ' }] }
    ])('rejects invalid or empty messages: %j', async (body) => {
        const response = await chat(validRequest(body));

        expect(response.status).toBe(400);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('rejects a chat body over 256 KB before opening MCP or invoking Gemini', async () => {
        const response = await chat(validRequest({ messages: [{ role: 'user', content: 'x'.repeat(256 * 1024) }] }));

        expect(response.status).toBe(413);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('sets no-store on validation errors as well as successful responses', async () => {
        const response = await chat(new Request(CHAT_ORIGIN + '/api/chat', { method: 'GET' }));

        expect(response.headers.get('cache-control')).toBe('no-store');
    });

    it('passes only the seven approved read-only tools to the model', async () => {
        sharedMcpState.toolNames.push('delete_component', 'run_shell');

        await chat(validRequest());

        expect(sharedGeminiState.keys).toEqual([FIXTURE_API_KEY]);
        expect(sharedGeminiState.options).toHaveLength(1);
        const options = sharedGeminiState.options[0] as { tools: Record<string, unknown> };
        expect(Object.keys(options.tools)).toEqual(APPROVED_READ_ONLY_TOOLS);
    });

    it('fails before model execution when an approved tool is missing', async () => {
        sharedMcpState.toolNames = APPROVED_READ_ONLY_TOOLS.slice(0, -1);

        const response = await chat(validRequest());

        expect(response.status).toBe(500);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('requires successful MCP evidence before a substantive answer', async () => {
        sharedMcpState.toolNames = [];

        const response = await chat(validRequest());

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('closes MCP after successful orchestration', async () => {
        const response = await chat(validRequest());
        await response.text();

        expect(sharedMcpState.closeCalls).toBe(1);
    });

    it('closes MCP after an orchestration error', async () => {
        sharedMcpState.failTools = true;

        await chat(validRequest());

        expect(sharedMcpState.closeCalls).toBe(1);
    });

    it('uses the bounded orchestration settings and propagates cancellation/deadlines', async () => {
        jest.useFakeTimers();
        try {
            await chat(validRequest());

            const options = sharedGeminiState.options[0] as {
                stopWhen: unknown;
                prepareStep: (options: { stepNumber: number }) => { toolChoice: string };
                maxOutputTokens: number;
                temperature: number;
                maxRetries: number;
                abortSignal?: AbortSignal;
            };
            expect(options.stopWhen).toEqual({ type: 'step-count', value: 4 });
            expect(options.prepareStep({ stepNumber: 0 })).toEqual({ toolChoice: 'required' });
            expect(options.prepareStep({ stepNumber: 1 })).toEqual({ toolChoice: 'auto' });
            expect(options.prepareStep({ stepNumber: 3 })).toEqual({ toolChoice: 'none' });
            expect(options.maxOutputTokens).toBe(4096);
            expect(options.temperature).toBe(0.1);
            expect(options.maxRetries).toBe(1);
            expect(options.abortSignal).toBeInstanceOf(AbortSignal);
        } finally {
            jest.useRealTimers();
        }
    });

    it('fails cleanly at the 10-second MCP operation deadline and closes the client', async () => {
        jest.useFakeTimers();
        sharedMcpState.blockTools = true;
        try {
            const responsePromise = chat(validRequest());
            await jest.advanceTimersByTimeAsync(10_000);
            const response = await responsePromise;

            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(sharedMcpState.closeCalls).toBe(1);
        } finally {
            jest.useRealTimers();
        }
    });

    it('enforces the 50-second overall deadline after MCP evidence succeeds', async () => {
        jest.useFakeTimers();
        sharedGeminiState.blockStream = true;
        try {
            const response = await chat(validRequest());
            const eventsPromise = responseEvents(response);
            await jest.advanceTimersByTimeAsync(50_000);
            const events = await eventsPromise;

            expect(events).toEqual(expect.arrayContaining([expect.objectContaining({ type: 'text-delta' })]));
            expect(events.at(-2)).toEqual(expect.objectContaining({ type: 'error' }));
            expect(events.at(-1)).toEqual({ type: 'done' });
            expect(sharedMcpState.closeCalls).toBe(1);
        } finally {
            jest.useRealTimers();
        }
    });

    it('closes MCP when the incoming request is cancelled', async () => {
        jest.useFakeTimers();
        sharedMcpState.blockTools = true;
        const controller = new AbortController();
        try {
            const responsePromise = chat(validRequest(undefined, { signal: controller.signal }));
            await Promise.resolve();
            controller.abort();
            await jest.advanceTimersByTimeAsync(1);
            const response = await responsePromise;

            expect(response.status).toBeGreaterThanOrEqual(400);
            expect(sharedMcpState.closeCalls).toBe(1);
        } finally {
            jest.useRealTimers();
        }
    });

    it('never places the API key in URLs, prompts, logs, responses, or errors', async () => {
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
        try {
            const response = await chat(validRequest());
            const responseText = await response.text();
            const observed = JSON.stringify({
                urls: sharedMcpState.openedUrls,
                prompts: sharedGeminiState.prompts,
                response: responseText,
                logs: errorSpy.mock.calls
            });

            expect(observed).not.toContain(FIXTURE_API_KEY);
        } finally {
            errorSpy.mockRestore();
        }
    });

    it('accepts optional attachments only on the final user turn and sends a validated file part to the model', async () => {
        const attachment = fakeAttachment('image/png', 32);
        const body = {
            messages: [
                { role: 'user', content: 'Earlier text question' },
                { role: 'assistant', content: 'Earlier answer' },
                { role: 'user', content: 'What does this image show?', attachments: [attachment] }
            ]
        };

        const response = await chat(validRequest(body));
        await response.text();

        expect(response.status).toBe(200);
        const messages = modelOptions().messages;
        expect(JSON.stringify(messages.slice(0, -1))).not.toContain(attachment.dataUrl);
        expect(messages.at(-1)?.content).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ type: 'text', text: 'What does this image show?' }),
                expect.objectContaining({ type: 'file', data: attachment.dataUrl, mediaType: attachment.mediaType })
            ])
        );
    });

    it.each([
        [
            'an attachment-only question',
            { messages: [{ role: 'user', content: '   ', attachments: [fakeAttachment()] }] }
        ],
        [
            'more than three attachments',
            attachmentBody([
                fakeAttachment(),
                fakeAttachment('image/jpeg'),
                fakeAttachment('image/gif'),
                fakeAttachment('application/pdf')
            ])
        ],
        [
            'files on an old user message',
            {
                messages: [
                    { role: 'user', content: 'Old question', attachments: [fakeAttachment()] },
                    { role: 'assistant', content: 'Old answer' },
                    { role: 'user', content: 'Current question' }
                ]
            }
        ],
        [
            'files on an assistant message',
            {
                messages: [
                    { role: 'user', content: 'Old question' },
                    { role: 'assistant', content: 'Old answer', attachments: [fakeAttachment()] },
                    { role: 'user', content: 'Current question' }
                ]
            }
        ]
    ])('rejects %s before MCP or model work', async (_caseName, body) => {
        const response = await chat(validRequest(body));

        expect(response.status).toBe(400);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it.each([
        ['a malformed base64 payload', replaceAttachmentDataUrl(fakeAttachment(), 'data:image/png;base64,not base64!')],
        [
            'a MIME type that is not allowed',
            { name: 'notes.txt', mediaType: 'text/plain', dataUrl: 'data:text/plain;base64,SGVsbG8=' }
        ],
        [
            'a data URL MIME type that disagrees with mediaType',
            replaceAttachmentDataUrl(fakeAttachment(), fakeAttachment('application/pdf').dataUrl)
        ],
        [
            'a file signature that disagrees with mediaType',
            replaceAttachmentDataUrl(fakeAttachment(), fakeAttachment('application/pdf').dataUrl)
        ],
        ['a path-like or empty name', { ...fakeAttachment(), name: '../secret.png' }],
        ['an empty name', { ...fakeAttachment(), name: '' }]
    ])('rejects %s before MCP or model work', async (_caseName, attachment) => {
        const response = await chat(validRequest(attachmentBody([attachment])));

        expect(response.status).toBe(400);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('accepts exactly 256 KiB of decoded deployed attachment bytes and rejects one byte over before work', async () => {
        const exact = await chat(
            validRequest(attachmentBody([fakeAttachment('image/png', DEPLOYED_ATTACHMENT_LIMIT_BYTES)]))
        );
        await exact.text();
        const callsAfterExact = sharedGeminiState.calls;
        const mcpOpenedAfterExact = sharedMcpState.openedUrls.length;
        const mcpCallsAfterExact = sharedMcpState.calls.length;

        const over = await chat(
            validRequest(attachmentBody([fakeAttachment('image/png', DEPLOYED_ATTACHMENT_LIMIT_BYTES + 1)]))
        );

        expect(exact.status).toBe(200);
        expect(over.status).toBe(413);
        expect(sharedGeminiState.calls).toBe(callsAfterExact);
        expect(sharedMcpState.openedUrls.length).toBe(mcpOpenedAfterExact);
        expect(sharedMcpState.calls.length).toBe(mcpCallsAfterExact);
    });

    it('accepts exactly 5 MiB of decoded attachment bytes only for trusted loopback Netlify Dev', async () => {
        process.env.NETLIFY_DEV = 'true';
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'local-google-fixture-key';
        const url = 'http://localhost:8888/api/chat';
        const exact = await chat(
            jsonRequest(url, attachmentBody([fakeAttachment('image/png', LOCAL_ATTACHMENT_LIMIT_BYTES)]))
        );
        await exact.text();
        const callsAfterExact = sharedGeminiState.calls;
        const mcpOpenedAfterExact = sharedMcpState.openedUrls.length;
        const mcpCallsAfterExact = sharedMcpState.calls.length;
        const over = await chat(
            jsonRequest(url, attachmentBody([fakeAttachment('image/png', LOCAL_ATTACHMENT_LIMIT_BYTES + 1)]))
        );

        expect(exact.status).toBe(200);
        expect(over.status).toBe(413);
        expect(sharedGeminiState.calls).toBe(callsAfterExact);
        expect(sharedMcpState.openedUrls.length).toBe(mcpOpenedAfterExact);
        expect(sharedMcpState.calls.length).toBe(mcpCallsAfterExact);
    });

    it('enforces the exact 512 KiB deployed attachment-aware JSON ceiling and rejects one byte over', async () => {
        const attachment = fakeAttachment('image/png', 16);
        const exact = await chat(validRequest(bodyWithExactJsonBytes(DEPLOYED_CHAT_BODY_LIMIT_BYTES, attachment)));
        await exact.text();
        const mcpOpenedAfterExact = sharedMcpState.openedUrls.length;
        const mcpCallsAfterExact = sharedMcpState.calls.length;
        const over = await chat(validRequest(bodyWithExactJsonBytes(DEPLOYED_CHAT_BODY_LIMIT_BYTES + 1, attachment)));

        expect(exact.status).toBe(200);
        expect(over.status).toBe(413);
        expect(sharedMcpState.openedUrls.length).toBe(mcpOpenedAfterExact);
        expect(sharedMcpState.calls.length).toBe(mcpCallsAfterExact);
    });

    it('enforces the exact 8 MiB loopback attachment-aware JSON ceiling and rejects one byte over', async () => {
        process.env.NETLIFY_DEV = 'true';
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'local-google-fixture-key';
        const url = 'http://127.0.0.1:8888/api/chat';
        const attachment = fakeAttachment('application/pdf', 16);
        const exact = await chat(jsonRequest(url, bodyWithExactJsonBytes(LOCAL_CHAT_BODY_LIMIT_BYTES, attachment)));
        await exact.text();
        const mcpOpenedAfterExact = sharedMcpState.openedUrls.length;
        const mcpCallsAfterExact = sharedMcpState.calls.length;
        const over = await chat(jsonRequest(url, bodyWithExactJsonBytes(LOCAL_CHAT_BODY_LIMIT_BYTES + 1, attachment)));

        expect(exact.status).toBe(200);
        expect(over.status).toBe(413);
        expect(sharedMcpState.openedUrls.length).toBe(mcpOpenedAfterExact);
        expect(sharedMcpState.calls.length).toBe(mcpCallsAfterExact);
    });

    it.each([
        { headers: { 'x-netlify-dev': 'true' } },
        { headers: { host: 'localhost:8888', 'x-forwarded-host': 'localhost:8888' } },
        { query: '?netlifyDev=true' }
    ])(
        'does not activate the local attachment limit from request-controlled values: %j',
        async ({ headers, query = '' }) => {
            const body = attachmentBody([fakeAttachment('image/png', DEPLOYED_ATTACHMENT_LIMIT_BYTES + 1)]);
            const response = await chat(
                jsonRequest(CHAT_ORIGIN + '/api/chat' + query, body, {
                    headers: { 'x-gemini-api-key': FIXTURE_API_KEY, ...headers }
                })
            );

            expect(response.status).toBe(413);
            expect(sharedMcpState.openedUrls).toEqual([]);
            expect(sharedGeminiState.calls).toBe(0);
        }
    );

    it('does not activate the local limit from a request body field', async () => {
        const response = await chat(
            validRequest({
                localAttachmentLimitBytes: LOCAL_ATTACHMENT_LIMIT_BYTES,
                ...attachmentBody([fakeAttachment('image/png', 16)])
            })
        );

        expect(response.status).toBe(400);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });

    it('keeps deployed GET at 405 and exposes the local attachment limit only in loopback Netlify Dev status', async () => {
        const deployed = await chat(new Request(CHAT_ORIGIN + '/api/chat'));
        expect(deployed.status).toBe(405);

        process.env.NETLIFY_DEV = 'true';
        const local = await chat(new Request('http://localhost:8888/api/chat'));
        const status = (await local.json()) as Record<string, unknown>;

        expect(local.status).toBe(200);
        expect(status.attachmentLimitBytes).toBe(LOCAL_ATTACHMENT_LIMIT_BYTES);
        expect(JSON.stringify(status)).not.toMatch(/google|anthropic|groq|key|api|secret|localhost:6655/i);
    });

    it.each(['google', 'anthropic'])(
        'passes validated files to the %s model provider without exposing file data to MCP',
        async (provider) => {
            const attachment = fakeAttachment('application/pdf', 24);
            const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
            let response: Response;
            try {
                if (provider === 'google') {
                    response = await chat(validRequest(attachmentBody([attachment])));
                } else {
                    process.env.NETLIFY_DEV = 'true';
                    process.env.ANTHROPIC_BASE_URL = 'http://localhost:6655/anthropic/v1';
                    process.env.ANTHROPIC_API_KEY = 'local-anthropic-fixture-key';
                    response = await chat(jsonRequest('http://localhost:8888/api/chat', attachmentBody([attachment])));
                }
                const responseText = await response.text();
                const observedMcp = JSON.stringify(sharedMcpState.calls);

                expect(response.status).toBe(200);
                expect(JSON.stringify(modelOptions().messages)).toContain(attachment.dataUrl);
                expect(observedMcp).not.toContain(attachment.dataUrl);
                expect(responseText).not.toContain(attachment.dataUrl);
                expect(JSON.stringify(logSpy.mock.calls)).not.toContain(attachment.dataUrl);
            } finally {
                logSpy.mockRestore();
            }
        }
    );

    it('rejects local Groq attachment requests safely before MCP or model work', async () => {
        process.env.NETLIFY_DEV = 'true';
        process.env.GROQ_API_KEY = 'local-groq-fixture-key';

        const response = await chat(
            jsonRequest('http://localhost:8888/api/chat', attachmentBody([fakeAttachment('image/png', 24)]))
        );
        const body = await response.text();

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(body).toMatch(/attachment/i);
        expect(body).not.toMatch(/groq|local-groq-fixture-key/i);
        expect(sharedMcpState.openedUrls).toEqual([]);
        expect(sharedGeminiState.calls).toBe(0);
    });
});
