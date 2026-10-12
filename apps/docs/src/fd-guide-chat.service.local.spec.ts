/**
 * Local-development transport tests. jsdom's default host is `localhost`, so the service
 * routes to the standalone chatbot (apps/chatbot) using the AI-SDK protocol — a UIMessage
 * request shape and an SSE (`data:`) response stream translated into ChatEvent callbacks.
 * The deployed Netlify Function transport is covered in fd-guide-chat.service.spec.ts.
 */
import { FdGuideChatService } from './fd-guide-chat.service';
import {
    DEPLOYED_ATTACHMENT_LIMIT_BYTES,
    LOCAL_ATTACHMENT_LIMIT_BYTES,
    TEST_ONLY_NOT_A_REAL_KEY
} from './fd-guide-chat.test-fixtures';

describe('FdGuideChatService (localhost transport)', () => {
    let service: FdGuideChatService;
    let fetchSpy: jest.SpiedFunction<typeof fetch>;

    beforeEach(() => {
        service = new FdGuideChatService();
        fetchSpy = jest.spyOn(globalThis, 'fetch');
    });

    afterEach(() => {
        service.stop();
        fetchSpy.mockRestore();
    });

    /** Builds an AI-SDK style SSE response (`data: {json}\n` lines) for the chatbot path. */
    function sseResponse(parts: Array<Record<string, unknown> | string>): Response {
        const body = parts.map((part) => `data: ${typeof part === 'string' ? part : JSON.stringify(part)}\n`).join('');
        return new Response(
            new ReadableStream<Uint8Array>({
                start(controller) {
                    controller.enqueue(new TextEncoder().encode(body));
                    controller.close();
                }
            }),
            { status: 200, headers: { 'content-type': 'text/event-stream' } }
        );
    }

    it('detects when the local provider probe reports a server-side provider', async () => {
        fetchSpy.mockResolvedValue(Response.json({ localProvider: true }));

        await expect(service.hasLocalProvider()).resolves.toBe(true);
        expect(fetchSpy).toHaveBeenCalledWith('/api/chat', {
            method: 'GET',
            headers: { Accept: 'application/json' },
            cache: 'no-store'
        });
    });

    it('adopts the 5 MiB attachment limit from the loopback status response and keeps 256 KiB as default', async () => {
        fetchSpy.mockResolvedValue(
            Response.json({ localProvider: true, attachmentLimitBytes: LOCAL_ATTACHMENT_LIMIT_BYTES })
        );

        const capabilities = await (
            service as unknown as {
                getCapabilities: () => Promise<{ localProvider: boolean; attachmentLimitBytes: number }>;
            }
        ).getCapabilities();

        expect(capabilities).toEqual({
            localProvider: true,
            attachmentLimitBytes: LOCAL_ATTACHMENT_LIMIT_BYTES
        });
        expect(DEPLOYED_ATTACHMENT_LIMIT_BYTES).toBe(256 * 1024);
        expect(JSON.stringify(capabilities)).not.toMatch(/provider.*key|api.?key/i);
    });

    it('assumes a local provider when the capability probe yields no JSON (standalone chatbot)', async () => {
        // Under `yarn start` the GET falls through to the Angular SPA shell (HTML, not JSON).
        fetchSpy.mockResolvedValue(new Response('<!doctype html><html></html>', { status: 200 }));

        await expect(service.hasLocalProvider()).resolves.toBe(true);
    });

    it('streams from the standalone chatbot with the UIMessage shape and no key header', async () => {
        fetchSpy.mockResolvedValue(sseResponse([{ type: 'text-delta', delta: 'Hello' }]));
        const events: unknown[] = [];

        await service.send('How do I use fd-dialog?', TEST_ONLY_NOT_A_REAL_KEY, (value) => events.push(value));

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const [url, init] = fetchSpy.mock.calls[0];
        expect(url).toBe('http://localhost:3000/api/chat');
        expect(init?.method).toBe('POST');
        const headers = new Headers(init?.headers);
        expect(headers.has('x-gemini-api-key')).toBe(false);
        expect(headers.has('x-groq-api-key')).toBe(false);
        expect(String(init?.body)).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
        const body = JSON.parse(String(init?.body)) as {
            messages: Array<{ id: string; role: string; parts: unknown[] }>;
        };
        expect(body.messages.at(-1)).toEqual({
            id: 'current',
            role: 'user',
            parts: [{ type: 'text', text: 'How do I use fd-dialog?' }]
        });
        // The chatbot stream carries no `done` sentinel; the service synthesizes it after the stream ends.
        expect(events).toEqual([{ type: 'text-delta', text: 'Hello' }, { type: 'done' }]);
    });

    it('inserts a paragraph break when assistant text resumes after a tool call', async () => {
        fetchSpy.mockResolvedValue(
            sseResponse([
                { type: 'text-delta', delta: 'Searching the docs.' },
                { type: 'tool-call' },
                { type: 'text-delta', delta: 'Here is the answer.' }
            ])
        );
        const texts: string[] = [];

        await service.send('How do I use fd-dialog?', '', (value) => {
            if ((value as { type: string }).type === 'text-delta') {
                texts.push((value as { text: string }).text);
            }
        });

        expect(texts.join('')).toBe('Searching the docs.\n\nHere is the answer.');
    });
});
