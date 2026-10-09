import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FdGuideChatComponent } from './fd-guide-chat.component';
import { FdGuideChatService } from './fd-guide-chat.service';
import {
    deferred,
    DEPLOYED_ATTACHMENT_LIMIT_BYTES,
    fakeBrowserFile,
    LOCAL_ATTACHMENT_LIMIT_BYTES,
    TEST_ONLY_NOT_A_REAL_KEY
} from './fd-guide-chat.test-fixtures';

const RATE_LIMIT_MESSAGE = 'Too many requests. Please wait a moment and try again.';

describe('FdGuideChatComponent', () => {
    let fixture: ComponentFixture<FdGuideChatComponent>;
    let service: { hasLocalProvider: jest.Mock; send: jest.Mock; stop: jest.Mock };
    let emit: (event: unknown) => void;
    let request: ReturnType<typeof deferred<void>>;

    beforeEach(async () => {
        request = deferred<void>();
        service = {
            hasLocalProvider: jest.fn().mockResolvedValue(false),
            getCapabilities: jest.fn().mockResolvedValue({
                localProvider: false,
                attachmentLimitBytes: DEPLOYED_ATTACHMENT_LIMIT_BYTES
            }),
            send: jest.fn((_question: string, _key: string, onEvent: (event: unknown) => void) => {
                emit = onEvent;
                return request.promise;
            }),
            stop: jest.fn()
        };
        await TestBed.configureTestingModule({
            imports: [FdGuideChatComponent],
            providers: [{ provide: FdGuideChatService, useValue: service }]
        }).compileComponents();
        fixture = TestBed.createComponent(FdGuideChatComponent);
        fixture.detectChanges();
    });

    afterEach(() => {
        if (fixture) {
            fixture.destroy();
        }
    });

    function openChat(): HTMLElement {
        const fab = fixture.nativeElement.querySelector<HTMLButtonElement>('.fd-guide-fab');
        fab.click();
        fixture.detectChanges();
        return fixture.nativeElement.querySelector('[role="dialog"]');
    }

    function input(selector: string, value: string): HTMLInputElement | HTMLTextAreaElement {
        const element = fixture.nativeElement.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        fixture.detectChanges();
        return element;
    }

    function submitWith(question: string, key = TEST_ONLY_NOT_A_REAL_KEY): void {
        input('#fd-guide-input', question);
        const keyInput = fixture.nativeElement.querySelector<HTMLInputElement>('input[type="password"]');
        if (keyInput) {
            input('input[type="password"]', key);
        }
        fixture.nativeElement
            .querySelector<HTMLFormElement>('.fd-guide-chat__input-form')
            .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        fixture.detectChanges();
    }

    async function selectFiles(files: File[]): Promise<void> {
        const picker = fixture.nativeElement.querySelector<HTMLInputElement>('input[type="file"]');
        expect(picker).not.toBeNull();
        if (!picker) {
            return;
        }
        Object.defineProperty(picker, 'files', { configurable: true, value: files });
        await fixture.componentInstance.onFilesSelected({ target: picker } as unknown as Event);
        fixture.detectChanges();
    }

    async function sendAndWait(question: string): Promise<void> {
        input('#fd-guide-input', question);
        const keyInput = fixture.nativeElement.querySelector<HTMLInputElement>('input[type="password"]');
        if (keyInput) {
            input('input[type="password"]', TEST_ONLY_NOT_A_REAL_KEY);
        }
        await fixture.componentInstance.sendMessage();
        fixture.detectChanges();
    }

    it('keeps Send disabled until both a non-empty question and an in-memory key exist', () => {
        openChat();
        const send = fixture.nativeElement.querySelector<HTMLButtonElement>('.fd-guide-chat__send-btn');

        expect(send.disabled).toBe(true);
        input('#fd-guide-input', 'A question');
        expect(send.disabled).toBe(true);
        input('#fd-guide-input', '');
        input('input[type="password"][aria-label="Gemini API key"]', TEST_ONLY_NOT_A_REAL_KEY);
        expect(send.disabled).toBe(true);
        input('#fd-guide-input', 'A question');
        expect(send.disabled).toBe(false);
    });

    it('uses the local server provider without asking for a browser key', async () => {
        fixture.destroy();
        service.hasLocalProvider.mockResolvedValue(true);
        service.getCapabilities.mockResolvedValue({
            localProvider: true,
            attachmentLimitBytes: LOCAL_ATTACHMENT_LIMIT_BYTES
        });
        fixture = TestBed.createComponent(FdGuideChatComponent);
        fixture.detectChanges();
        await Promise.resolve();
        fixture.detectChanges();

        openChat();
        expect(fixture.nativeElement.querySelector('input[type="password"]')).toBeNull();
        expect(fixture.nativeElement.textContent).toContain('Using the local server provider configuration.');

        input('#fd-guide-input', 'Explain fd-dialog');
        expect(fixture.nativeElement.querySelector<HTMLButtonElement>('.fd-guide-chat__send-btn').disabled).toBe(false);
        submitWith('Explain fd-dialog');

        expect(service.send).toHaveBeenCalledWith('Explain fd-dialog', '', expect.any(Function), [], 'google');
        request.resolve();
    });

    it('clears the key explicitly and starts a new component with no key', () => {
        openChat();
        submitWith('A question');
        expect(fixture.nativeElement.querySelector('input[type="password"]')).toBeNull();

        const settings = fixture.nativeElement.querySelector<HTMLButtonElement>(
            'button[aria-label="Configure AI provider"]'
        );
        settings.click();
        fixture.detectChanges();
        const clear = fixture.nativeElement.querySelector<HTMLButtonElement>('button[aria-label="Clear API key"]');
        clear.click();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector<HTMLInputElement>('input[type="password"]').value).toBe('');
        expect(fixture.nativeElement.querySelector<HTMLButtonElement>('.fd-guide-chat__send-btn').disabled).toBe(true);
        expect(localStorage.length).toBe(0);
        expect(sessionStorage.length).toBe(0);
        expect(document.cookie).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);

        fixture.destroy();
        fixture = TestBed.createComponent(FdGuideChatComponent);
        fixture.detectChanges();
        openChat();

        expect(fixture.nativeElement.querySelector<HTMLInputElement>('input[type="password"]').value).toBe('');
        expect(fixture.nativeElement.querySelector<HTMLButtonElement>('.fd-guide-chat__send-btn').disabled).toBe(true);
    });

    it('uses an in-memory Groq key with the internal Qwen model and disables attachments', () => {
        openChat();
        const provider = fixture.nativeElement.querySelector<HTMLSelectElement>('select[aria-label="AI provider"]');
        provider.value = 'groq';
        provider.dispatchEvent(new Event('change', { bubbles: true }));
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('input[type="password"]').getAttribute('aria-label')).toBe(
            'Groq API key'
        );
        expect(fixture.nativeElement.textContent).toContain('Attachments are unavailable with Groq.');
        expect(
            fixture.nativeElement.querySelector<HTMLButtonElement>('button[aria-label^="Attach files"]').disabled
        ).toBe(true);

        submitWith('Explain fd-button');

        expect(service.send).toHaveBeenCalledWith(
            'Explain fd-button',
            TEST_ONLY_NOT_A_REAL_KEY,
            expect.any(Function),
            [],
            'groq'
        );
        request.resolve();
    });

    it('renders partial text as text and only converts restricted Markdown after done', () => {
        openChat();
        submitWith('Explain dialog');
        emit({ type: 'text-delta', text: '<strong>literal</strong> **formatted**' });
        fixture.detectChanges();

        const log = fixture.nativeElement.querySelector('[role="log"]');
        expect(log.textContent).toContain('<strong>literal</strong> **formatted**');
        expect(log.querySelector('strong')).toBeNull();

        emit({ type: 'meta', catalogVersion: '0.65.1-rc.0' });
        emit({ type: 'done' });
        fixture.detectChanges();

        expect(log.querySelector('strong')?.textContent).toBe('formatted');
        request.resolve();
    });

    it('renders catalog version and structured server sources without trusting generated Markdown', () => {
        openChat();
        submitWith('Where is fd-dialog documented?');
        emit({ type: 'meta', catalogVersion: '0.65.1-rc.0' });
        emit({ type: 'text-delta', text: '[forged](javascript:alert(1)) <script>alert(1)</script>' });
        emit({
            type: 'sources',
            items: [{ selector: 'fd-dialog', docsUrl: 'https://sap.github.io/fundamental-ngx/fd-dialog' }]
        });
        emit({ type: 'done' });
        fixture.detectChanges();

        expect(fixture.nativeElement.textContent).toContain('0.65.1-rc.0');
        expect(fixture.nativeElement.textContent).not.toContain('v0.65');
        expect(fixture.nativeElement.querySelector('script')).toBeNull();
        expect(fixture.nativeElement.querySelector('a[href^="javascript:"]')).toBeNull();
        const source = fixture.nativeElement.querySelector<HTMLAnchorElement>(
            '.fd-guide-chat__sources a[href="https://sap.github.io/fundamental-ngx/fd-dialog"]'
        );
        expect(source).not.toBeNull();
        expect(source?.rel).toContain('noopener');
        expect(source?.rel).toContain('noreferrer');
        request.resolve();
    });

    it('keeps the complete visible conversation while transport history is bounded', async () => {
        service.send.mockImplementation(
            (question: string, _key: string, onEvent: (event: unknown) => void): Promise<void> => {
                onEvent({ type: 'text-delta', text: `answer-${question}` });
                onEvent({ type: 'done' });
                return Promise.resolve();
            }
        );
        openChat();

        for (let turn = 1; turn <= 8; turn++) {
            await sendAndWait(`question-${turn}`);
        }

        expect(fixture.componentInstance.messages()).toHaveLength(16);
        expect(fixture.componentInstance.messages().map(({ role, content }) => ({ role, content }))).toEqual(
            Array.from({ length: 8 }, (_, index) => [
                { role: 'user', content: `question-${index + 1}` },
                { role: 'assistant', content: `answer-question-${index + 1}` }
            ]).flat()
        );
        const log = fixture.nativeElement.querySelector<HTMLElement>('[role="log"]');
        for (let turn = 1; turn <= 8; turn++) {
            expect(log.textContent).toContain(`question-${turn}`);
            expect(log.textContent).toContain(`answer-question-${turn}`);
        }
    });

    it('shows a stable retry-later message for a typed 429 failure without exposing untrusted details', async () => {
        const providerBody = `provider detail ${TEST_ONLY_NOT_A_REAL_KEY}`;
        const rateLimitError = Object.assign(new Error(providerBody), {
            name: 'ChatRateLimitError',
            status: 429
        });
        service.send.mockRejectedValue(rateLimitError);
        openChat();

        await sendAndWait('Question that hit the limit');

        const text = fixture.nativeElement.textContent;
        expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toBe(`Error: ${RATE_LIMIT_MESSAGE}`);
        expect(text).toContain(RATE_LIMIT_MESSAGE);
        expect(text).not.toContain(providerBody);
        expect(text).not.toContain(TEST_ONLY_NOT_A_REAL_KEY);
    });

    it('keeps the existing generic safe message for non-429 failures', async () => {
        service.send.mockRejectedValue(new Error('provider outage details'));
        openChat();

        await sendAndWait('Question during an outage');

        expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toBe(
            'Error: The assistant could not complete this request. Please try again.'
        );
        expect(fixture.nativeElement.textContent).not.toContain('provider outage details');
    });

    it('supports keyboard open, Escape close, submit, Stop, focus return, and a polite message log', () => {
        const fab = fixture.nativeElement.querySelector<HTMLButtonElement>('.fd-guide-fab');
        fab.focus();
        fab.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        fab.click();
        fixture.detectChanges();

        const dialog = fixture.nativeElement.querySelector<HTMLElement>('[role="dialog"]');
        const log = fixture.nativeElement.querySelector<HTMLElement>('[role="log"]');
        const textarea = fixture.nativeElement.querySelector<HTMLTextAreaElement>('#fd-guide-input');
        expect(fab.getAttribute('aria-expanded')).toBe('true');
        expect(dialog.getAttribute('aria-label')).toBe('Fundamental Guide Chat');
        expect(log.getAttribute('aria-live')).toBe('polite');

        input('#fd-guide-input', 'Explain fd-dialog');
        input('input[type="password"][aria-label="Gemini API key"]', TEST_ONLY_NOT_A_REAL_KEY);
        textarea.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        fixture.detectChanges();
        expect(service.send).toHaveBeenCalledWith(
            'Explain fd-dialog',
            TEST_ONLY_NOT_A_REAL_KEY,
            expect.any(Function),
            [],
            'google'
        );

        const stop = fixture.nativeElement.querySelector<HTMLButtonElement>('button[aria-label="Stop generating"]');
        expect(stop).not.toBeNull();
        stop.click();
        expect(service.stop).toHaveBeenCalled();

        dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
        expect(fab.getAttribute('aria-expanded')).toBe('false');
        expect(document.activeElement).toBe(fab);
    });

    it('stops active work when the widget closes or the component is destroyed', () => {
        openChat();
        submitWith('Explain fd-dialog');
        const close = fixture.nativeElement.querySelector<HTMLButtonElement>('button[aria-label="Close chat"]');
        close.click();
        fixture.detectChanges();
        expect(service.stop).toHaveBeenCalledTimes(1);

        openChat();
        submitWith('Explain fd-button');
        fixture.destroy();
        expect(service.stop).toHaveBeenCalledTimes(2);
    });

    it('displays the deployed 256 KiB default and adopts 5 MiB only from loopback capabilities', async () => {
        openChat();
        expect(fixture.nativeElement.textContent).toContain('256 KiB');

        fixture.destroy();
        service.getCapabilities.mockResolvedValue({
            localProvider: true,
            attachmentLimitBytes: LOCAL_ATTACHMENT_LIMIT_BYTES
        });
        fixture = TestBed.createComponent(FdGuideChatComponent);
        fixture.detectChanges();
        await Promise.resolve();
        fixture.detectChanges();
        openChat();

        expect(fixture.nativeElement.textContent).toContain('5 MiB');
    });

    it('stages image/PDF previews, removes files, and never stages more than three', async () => {
        openChat();
        await selectFiles([
            fakeBrowserFile('guide.png', 'image/png'),
            fakeBrowserFile('api.pdf', 'application/pdf'),
            fakeBrowserFile('screen.png', 'image/png'),
            fakeBrowserFile('fourth.png', 'image/png')
        ]);

        const chips = fixture.nativeElement.querySelectorAll('.fd-guide-chat__attachment-chip');
        expect(chips).toHaveLength(3);
        expect(fixture.nativeElement.querySelectorAll('.fd-guide-chat__attachment-thumb')).toHaveLength(2);
        expect(fixture.nativeElement.textContent).toContain('api.pdf');
        expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toMatch(/3|three/i);

        chips[0].querySelector<HTMLButtonElement>('button[aria-label^="Remove"]')?.click();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.fd-guide-chat__attachment-chip')).toHaveLength(2);

        await selectFiles([fakeBrowserFile('notes.txt', 'text/plain')]);
        expect(fixture.nativeElement.querySelectorAll('.fd-guide-chat__attachment-chip')).toHaveLength(2);
        expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toMatch(/supported|image|PDF/i);
    });

    it('requires a non-empty question even when a valid attachment is staged and sends the attachment on the current turn', async () => {
        openChat();
        await selectFiles([fakeBrowserFile('guide.png', 'image/png')]);
        input('input[type="password"][aria-label="Gemini API key"]', TEST_ONLY_NOT_A_REAL_KEY);

        const send = fixture.nativeElement.querySelector<HTMLButtonElement>('.fd-guide-chat__send-btn');
        expect(send.disabled).toBe(true);

        input('#fd-guide-input', 'Explain this image');
        expect(send.disabled).toBe(false);
        send.click();
        fixture.detectChanges();

        expect(service.send).toHaveBeenCalledWith(
            'Explain this image',
            TEST_ONLY_NOT_A_REAL_KEY,
            expect.any(Function),
            [
                expect.objectContaining({
                    name: 'guide.png',
                    mediaType: 'image/png',
                    dataUrl: expect.stringContaining('data:image/png;base64,')
                })
            ],
            'google'
        );
        expect(fixture.nativeElement.querySelector('.fd-guide-chat__bubble-attachments')).not.toBeNull();
        request.resolve();
    });
});
