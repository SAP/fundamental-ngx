import { FdGuideChatService } from './fd-guide-chat.service';
import {
    deferred,
    DEPLOYED_ATTACHMENT_LIMIT_BYTES,
    fakeChatAttachment,
    LOCAL_ATTACHMENT_LIMIT_BYTES,
    ndjsonResponse,
    TEST_ONLY_NOT_A_REAL_KEY
} from './fd-guide-chat.test-fixtures';

describe('FdGuideChatService', () => {
    let service: FdGuideChatService;
    let fetchSpy: jest.SpiedFunction<typeof fetch>;

    beforeEach(() => {
        service = new FdGuideChatService();
        fetchSpy = jest.spyOn(globalThis, 'fetch');
    });

    afterEach(() => {
        service.stop();
        fetchSpy.mockRestore();
        localStorage.removeItem('fd-guide-chat-debug');
    });

    function sendWithAttachments(
        content: string,
        apiKey: string,
        attachments: unknown[],
        onEvent: (event: unknown) => void
    ): Promise<void> {
        return (
            service.send as unknown as (
                content: string,
                apiKey: string,
                onEvent: (event: unknown) => void,
                attachments: unknown[]
            ) => Promise<void>
        )(content, apiKey, onEvent, attachments);
    }

    function responseFor(answer: string): Response {
        return ndjsonResponse([{ type: 'text-delta', text: answer }, { type: 'done' }]);
    }

    function requestMessages(callIndex: number): Array<{ role: string; content: string; attachments?: unknown[] }> {
        const body = JSON.parse(String(fetchSpy.mock.calls[callIndex][1]?.body)) as {
            messages: Array<{ role: string; content: string; attachments?: unknown[] }>;
        };
        return body.messages;
    }

    async function completeTurn(question: string, answer: string, attachments: unknown[] = []): Promise<void> {
        fetchSpy.mockResolvedValueOnce(responseFor(answer));
        if (attachments.length) {
            await sendWithAttachments(question, TEST_ONLY_NOT_A_REAL_KEY, attachments, () => undefined);
        } else {
            await service.send(question, TEST_ONLY_NOT_A_REAL_KEY, () => undefined);
        }
    }

    it('detects when the local Function has a server-side provider', async () => {
        fetchSpy.mockResolvedValue(Response.json({ localProvider: true }));

        await expect(service.hasLocalProvider()).resolves.toBe(true);
        expect(fetchSpy).toHaveBeenCalledWith('/api/chat', {
            method: 'GET',
            headers: { Accept: 'application/json' },
            cache: 'no-store'
        });
    });

    it('adopts the 5 MiB attachment limit only from the loopback status response and keeps 256 KiB as default', async () => {
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

    it('uses native fetch and sends the key only in x-gemini-api-key', async () => {
        fetchSpy.mockResolvedValue(ndjsonResponse([{ type: 'done' }]));
        const events: unknown[] = [];

        await service.send('How do I use fd-dialog?', TEST_ONLY_NOT_A_REAL_KEY, (value) => events.push(value));

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const [url, init] = fetchSpy.mock.calls[0];
        expect(url).toBe('/api/chat');
        expect(url).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
        expect(init?.method).toBe('POST');
        expect(new Headers(init?.headers).get('x-gemini-api-key')).toBe(TEST_ONLY_NOT_A_REAL_KEY);
        expect(init?.body).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
        expect(JSON.parse(String(init?.body))).toEqual({
            messages: [{ role: 'user', content: 'How do I use fd-dialog?' }]
        });
        expect(String(init?.body)).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
        expect(events).toEqual([{ type: 'done' }]);
    });

    it('sends a Groq key only in x-groq-api-key', async () => {
        fetchSpy.mockResolvedValue(ndjsonResponse([{ type: 'done' }]));

        await service.send('How do I use fd-button?', TEST_ONLY_NOT_A_REAL_KEY, () => undefined, [], 'groq');

        const [url, init] = fetchSpy.mock.calls[0];
        const headers = new Headers(init?.headers);
        expect(url).toBe('/api/chat');
        expect(headers.get('x-groq-api-key')).toBe(TEST_ONLY_NOT_A_REAL_KEY);
        expect(headers.has('x-gemini-api-key')).toBe(false);
        expect(String(init?.body)).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
        expect(String(url)).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
    });

    it('puts attachments only on the newest user message and never resends file data in later text-only history', async () => {
        const attachment = fakeChatAttachment('image/png');
        fetchSpy
            .mockResolvedValueOnce(ndjsonResponse([{ type: 'done' }]))
            .mockResolvedValueOnce(ndjsonResponse([{ type: 'done' }]));

        await sendWithAttachments('Describe this image', TEST_ONLY_NOT_A_REAL_KEY, [attachment], () => undefined);
        await service.send('What did we discuss?', TEST_ONLY_NOT_A_REAL_KEY, () => undefined);

        const firstBody = JSON.parse(String(fetchSpy.mock.calls[0][1]?.body));
        const secondBody = JSON.parse(String(fetchSpy.mock.calls[1][1]?.body));
        expect(firstBody).toEqual({
            messages: [{ role: 'user', content: 'Describe this image', attachments: [attachment] }]
        });
        expect(JSON.stringify(secondBody)).not.toContain(attachment.dataUrl);
        expect(secondBody.messages.at(-1)).toEqual({ role: 'user', content: 'What did we discuss?' });
        expect(localStorage.length).toBe(0);
        expect(sessionStorage.length).toBe(0);
        expect(String(fetchSpy.mock.calls[1][0])).not.toContain(attachment.dataUrl);
    });

    it('retains exactly the newest four complete pairs and sends the newest three pairs plus the current user', async () => {
        for (let turn = 1; turn <= 6; turn++) {
            await completeTurn(`question-${turn}`, `answer-${turn}`);
        }

        await completeTurn('question-7', 'answer-7');

        expect(requestMessages(6)).toEqual([
            { role: 'user', content: 'question-4' },
            { role: 'assistant', content: 'answer-4' },
            { role: 'user', content: 'question-5' },
            { role: 'assistant', content: 'answer-5' },
            { role: 'user', content: 'question-6' },
            { role: 'assistant', content: 'answer-6' },
            { role: 'user', content: 'question-7' }
        ]);
        expect(requestMessages(6)).toHaveLength(7);
        expect(requestMessages(6)[0].role).toBe('user');
        expect(requestMessages(6).at(-1)).toEqual({ role: 'user', content: 'question-7' });
        expect(
            requestMessages(6).some((message) => message.role === 'assistant' && message.content === 'answer-3')
        ).toBe(false);
    });

    it('preserves exact role/content order and does not regrow bounded history on later successful turns', async () => {
        for (let turn = 1; turn <= 8; turn++) {
            await completeTurn(`question-${turn}`, `answer-${turn}`);
        }

        expect(requestMessages(6)).toEqual([
            { role: 'user', content: 'question-4' },
            { role: 'assistant', content: 'answer-4' },
            { role: 'user', content: 'question-5' },
            { role: 'assistant', content: 'answer-5' },
            { role: 'user', content: 'question-6' },
            { role: 'assistant', content: 'answer-6' },
            { role: 'user', content: 'question-7' }
        ]);
        expect(requestMessages(7)).toEqual([
            { role: 'user', content: 'question-5' },
            { role: 'assistant', content: 'answer-5' },
            { role: 'user', content: 'question-6' },
            { role: 'assistant', content: 'answer-6' },
            { role: 'user', content: 'question-7' },
            { role: 'assistant', content: 'answer-7' },
            { role: 'user', content: 'question-8' }
        ]);
        expect(requestMessages(7)).toHaveLength(7);
    });

    it('keeps attachments current-turn-only while older text pairs fall out of bounded history', async () => {
        const attachment = fakeChatAttachment('image/png');
        await completeTurn('question-1', 'answer-1');
        await completeTurn('question-2-with-file', 'answer-2', [attachment]);
        await completeTurn('question-3', 'answer-3');
        await completeTurn('question-4', 'answer-4');
        await completeTurn('question-5', 'answer-5');
        await completeTurn('question-6', 'answer-6');
        await completeTurn('question-7', 'answer-7');

        expect(requestMessages(1)).toEqual([
            { role: 'user', content: 'question-1' },
            { role: 'assistant', content: 'answer-1' },
            { role: 'user', content: 'question-2-with-file', attachments: [attachment] }
        ]);
        const messages = requestMessages(6);
        expect(messages).toEqual([
            { role: 'user', content: 'question-4' },
            { role: 'assistant', content: 'answer-4' },
            { role: 'user', content: 'question-5' },
            { role: 'assistant', content: 'answer-5' },
            { role: 'user', content: 'question-6' },
            { role: 'assistant', content: 'answer-6' },
            { role: 'user', content: 'question-7' }
        ]);
        expect(JSON.stringify(messages)).not.toContain(attachment.dataUrl);
        expect(JSON.stringify(messages)).not.toContain('question-2-with-file');
    });

    it('returns a typed stable rate-limit outcome without exposing the 429 response body or key', async () => {
        const providerBody = `provider failure details ${TEST_ONLY_NOT_A_REAL_KEY}`;
        const response = new Response(providerBody, { status: 429 });
        const textSpy = jest.spyOn(response, 'text');
        const jsonSpy = jest.spyOn(response, 'json');
        fetchSpy.mockResolvedValue(response);

        const request = service.send('Question', TEST_ONLY_NOT_A_REAL_KEY, () => undefined);

        await expect(request).rejects.toMatchObject({ name: 'ChatRateLimitError', status: 429 });
        await request.catch((error: unknown) => {
            expect(String(error)).not.toContain(providerBody);
            expect(String(error)).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
        });
        expect(textSpy).not.toHaveBeenCalled();
        expect(jsonSpy).not.toHaveBeenCalled();
    });

    it('omits the key header when using the local server provider', async () => {
        fetchSpy.mockResolvedValue(ndjsonResponse([{ type: 'done' }]));

        await service.send('How do I use fd-dialog?', '', () => undefined);

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const [, init] = fetchSpy.mock.calls[0];
        expect(new Headers(init?.headers).has('x-gemini-api-key')).toBe(false);
        expect(new Headers(init?.headers).has('x-groq-api-key')).toBe(false);
    });

    it('does not place the key in Web Storage, cookies, credentials, or request URL state', async () => {
        fetchSpy.mockResolvedValue(ndjsonResponse([{ type: 'done' }]));
        localStorage.clear();
        sessionStorage.clear();
        document.cookie = '';

        await service.send('Question', TEST_ONLY_NOT_A_REAL_KEY, () => undefined);

        expect(localStorage.getItem(TEST_ONLY_NOT_A_REAL_KEY)).toBeNull();
        expect(sessionStorage.getItem(TEST_ONLY_NOT_A_REAL_KEY)).toBeNull();
        expect(document.cookie).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
        const [url, init] = fetchSpy.mock.calls[0];
        expect(String(url)).not.toMatch(/[?#]/);
        expect(init?.credentials).not.toBe('include');
    });

    it('aborts active native fetch work when Stop is requested', async () => {
        const pending = deferred<Response>();
        fetchSpy.mockReturnValue(pending.promise);
        const request = service.send('Question', TEST_ONLY_NOT_A_REAL_KEY, () => undefined);

        await Promise.resolve();
        const signal = fetchSpy.mock.calls[0][1]?.signal as AbortSignal;
        expect(signal.aborted).toBe(false);

        service.stop();

        expect(signal.aborted).toBe(true);
        pending.reject(new DOMException('Aborted', 'AbortError'));
        await expect(request).resolves.toBeUndefined();
    });

    it('aborts the prior request before starting a replacement request', async () => {
        const first = deferred<Response>();
        fetchSpy.mockReturnValueOnce(first.promise).mockResolvedValueOnce(ndjsonResponse([{ type: 'done' }]));
        const firstRequest = service.send('First', TEST_ONLY_NOT_A_REAL_KEY, () => undefined);
        await Promise.resolve();
        const firstSignal = fetchSpy.mock.calls[0][1]?.signal as AbortSignal;

        await service.send('Second', TEST_ONLY_NOT_A_REAL_KEY, () => undefined);

        expect(firstSignal.aborted).toBe(true);
        first.reject(new DOMException('Aborted', 'AbortError'));
        await expect(firstRequest).resolves.toBeUndefined();
    });

    it('emits opt-in diagnostics without logging prompts, answers, keys, or source URLs', async () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
        localStorage.setItem('fd-guide-chat-debug', '1');
        fetchSpy.mockResolvedValue(
            ndjsonResponse([
                { type: 'meta', catalogVersion: '1.2.3' },
                { type: 'status', message: 'Searching private prompt content' },
                { type: 'text-delta', text: 'private model answer' },
                {
                    type: 'sources',
                    items: [{ selector: 'fd-dialog', docsUrl: 'https://example.test/private-source' }]
                },
                { type: 'done' }
            ])
        );

        try {
            await service.send('private user question', TEST_ONLY_NOT_A_REAL_KEY, () => undefined);

            const output = JSON.stringify(consoleSpy.mock.calls);
            expect(output).toContain('request:start');
            expect(output).toContain('response');
            expect(output).toContain('stream:event');
            expect(output).toContain('request:complete');
            expect(output).toContain('fd-dialog');
            expect(output).not.toContain('private user question');
            expect(output).not.toContain('private model answer');
            expect(output).not.toContain('Searching private prompt content');
            expect(output).not.toContain('https://example.test/private-source');
            expect(output).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
        } finally {
            consoleSpy.mockRestore();
        }
    });
});
