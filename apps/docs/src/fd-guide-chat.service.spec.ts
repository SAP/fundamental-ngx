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

    it('omits the key header when using the local server provider', async () => {
        fetchSpy.mockResolvedValue(ndjsonResponse([{ type: 'done' }]));

        await service.send('How do I use fd-dialog?', '', () => undefined);

        expect(fetchSpy).toHaveBeenCalledTimes(1);
        const [, init] = fetchSpy.mock.calls[0];
        expect(new Headers(init?.headers).has('x-gemini-api-key')).toBe(false);
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
