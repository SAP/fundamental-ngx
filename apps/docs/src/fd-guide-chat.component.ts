import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    ElementRef,
    afterRenderEffect,
    computed,
    effect,
    inject,
    signal,
    viewChild
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { isAllowedChatUrl, renderChatMarkdown } from './fd-guide-chat-markdown';
import { ChatEvent, ChatSource } from './fd-guide-chat-stream';
import {
    CHAT_ATTACHMENT_MEDIA_TYPES,
    ChatAttachment,
    ChatAttachmentMediaType,
    DEPLOYED_ATTACHMENT_LIMIT_BYTES,
    FdGuideChatService,
    LOCAL_ATTACHMENT_LIMIT_BYTES
} from './fd-guide-chat.service';

const MAXIMUM_CHAT_ATTACHMENTS = 3;
const IS_APPLE_PLATFORM = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.platform);

type ChatStatus = 'idle' | 'submitted' | 'streaming' | 'error';
type SpeechStatus = 'idle' | 'listening' | 'processing' | 'error';

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: (() => void) | null;
    onend: (() => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    readonly length: number;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    readonly isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
}

interface WindowWithSpeechRecognition extends Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
}

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    renderedHtml: string | null;
    sources: ChatSource[];
    attachments: ChatAttachment[];
}

interface StagedChatAttachment {
    id: number;
    name: string;
    mediaType: ChatAttachmentMediaType;
    dataUrl: string | null;
    previewUrl: string;
    size: number;
}

const TRANSPARENT_IMAGE_PREVIEW = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

@Component({
    selector: 'fd-guide-chat',
    imports: [IconComponent, ButtonComponent],
    templateUrl: './fd-guide-chat.component.html',
    styleUrls: ['./fd-guide-chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '(click)': 'handleMessagesClick($event)',
        '(document:keydown.escape)': 'onEscapeKey()',
        '(document:keydown.space)': 'onSpaceKey($event)',
        '(document:keydown.ctrl.shift.m)': 'onMicShortcut($event)',
        '(document:keydown.meta.shift.m)': 'onMicShortcut($event)',
        '(document:keydown.meta.shift.a)': 'onAttachShortcut($event)',
        '(document:keydown.ctrl.shift.u)': 'onAttachShortcut($event)',
        '(document:keydown.ctrl.shift.g)': 'onToggleChatShortcut($event)',
        '(document:keydown.meta.b)': 'onToggleChatShortcut($event)'
    }
})
export class FdGuideChatComponent {
    readonly isOpen = signal(false);
    readonly isExpanded = signal(false);
    readonly isApiKeyEditorOpen = signal(true);
    readonly userInput = signal('');
    readonly apiKey = signal('');
    readonly localProviderAvailable = signal(false);
    readonly attachments = signal<StagedChatAttachment[]>([]);
    readonly attachmentError = signal<string | null>(null);
    readonly attachmentLimitBytes = signal(DEPLOYED_ATTACHMENT_LIMIT_BYTES);
    readonly speechStatus = signal<SpeechStatus>('idle');
    readonly speechError = signal<string | null>(null);
    readonly isSpeaking = signal(false);
    readonly isSpeechPaused = signal(false);
    readonly messages = signal<ChatMessage[]>([]);
    readonly status = signal<ChatStatus>('idle');
    readonly error = signal<string | null>(null);
    readonly catalogVersion = signal<string | null>(null);
    readonly statusMessage = signal('Chat ready.');
    readonly attachmentLimitLabel = computed(() => formatAttachmentLimit(this.attachmentLimitBytes()));
    readonly isBusy = computed(() => this.status() === 'submitted' || this.status() === 'streaming');
    readonly chatToggleShortcut = IS_APPLE_PLATFORM ? '⌘B' : 'Ctrl+Shift+G';
    readonly micShortcut = IS_APPLE_PLATFORM ? '⌘+Shift+M' : 'Ctrl+Shift+M';
    readonly attachShortcut = IS_APPLE_PLATFORM ? '⌘+Shift+A' : 'Ctrl+Shift+U';
    readonly isSpeechRecognitionSupported = computed(() => {
        if (typeof window === 'undefined') {
            return false;
        }
        const speechWindow = window as WindowWithSpeechRecognition;
        return Boolean(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition);
    });
    readonly speechButtonLabel = computed(() => {
        if (this.isSpeechPaused()) {
            return 'AI speech paused — Space to resume, Esc to cancel';
        }
        if (this.isSpeaking()) {
            return 'Stop AI speech (Esc)';
        }
        if (this.speechStatus() === 'listening') {
            return `Stop recording (${this.micShortcut})`;
        }
        return this.isSpeechRecognitionSupported()
            ? `Start voice input (${this.micShortcut})`
            : 'Voice input not supported';
    });
    readonly speechButtonGlyph = computed(() =>
        this.speechStatus() === 'listening' || this.isSpeaking() || this.isSpeechPaused() ? 'stop' : 'microphone'
    );
    readonly canSend = computed(
        () =>
            Boolean(this.userInput().trim() && (this.apiKey().trim() || this.localProviderAvailable())) &&
            this.attachments().every((attachment) => attachment.dataUrl !== null) &&
            !this.isBusy()
    );

    private readonly _chatService = inject(FdGuideChatService);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _sanitizer = inject(DomSanitizer);
    private readonly _chatToggle = viewChild(ButtonComponent);
    private readonly _messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');
    private readonly _fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
    private readonly _chatInput = viewChild<ElementRef<HTMLTextAreaElement>>('chatInput');
    private readonly _fileReaders = new Set<FileReader>();
    private readonly _pendingTimeouts = new Set<number>();
    private _activeAssistantId: string | null = null;
    private _attachmentSequence = 0;
    private _messageSequence = 0;
    private _requestSequence = 0;
    private _destroyed = false;
    private _shouldFocusInput = false;
    private _recognition: SpeechRecognition | null = null;
    private _lastInputWasVoice = false;
    private _speechResponsePending = false;
    private _lastSpokenLength = 0;

    constructor() {
        afterRenderEffect({
            mixedReadWrite: () => {
                this.messages();
                this.status();
                this.isOpen();
                const container = this._messagesContainer()?.nativeElement;
                if (container) {
                    container.scrollTop = container.scrollHeight;
                }
                if (this._shouldFocusInput && this.isOpen()) {
                    this._shouldFocusInput = false;
                    this._chatInput()?.nativeElement.focus();
                }
            }
        });
        effect(() => {
            const status = this.status();
            const messages = this.messages();
            if (!this._speechResponsePending) {
                return;
            }

            const assistant = messages.findLast((message) => message.role === 'assistant');
            if (!assistant?.content) {
                return;
            }

            const unspoken = assistant.content.slice(this._lastSpokenLength);
            if (status === 'streaming') {
                const boundary = lastSentenceBoundary(unspoken);
                if (boundary >= 0) {
                    const chunk = stripMarkdownForSpeech(unspoken.slice(0, boundary + 1));
                    if (chunk) {
                        this._queueSpeech(chunk);
                    }
                    this._lastSpokenLength += boundary + 1;
                }
            } else if (status === 'idle') {
                this._speechResponsePending = false;
                const remaining = stripMarkdownForSpeech(unspoken);
                if (remaining) {
                    this._queueSpeech(remaining);
                }
                this._lastSpokenLength = 0;
            }
        });
        this._destroyRef.onDestroy(() => {
            this._destroyed = true;
            this.attachments.set([]);
            this._fileReaders.forEach((reader) => reader.abort());
            this._fileReaders.clear();
            this._recognition?.abort();
            window.speechSynthesis?.cancel();
            this._pendingTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
            this._pendingTimeouts.clear();
            this._chatService.stop();
        });
        void this._detectCapabilities();
    }

    toggleChat(): void {
        if (this.isOpen()) {
            this.closeChat();
        } else {
            this._shouldFocusInput = true;
            this.isOpen.set(true);
        }
    }

    toggleExpand(): void {
        this.isExpanded.update((expanded) => !expanded);
    }

    toggleApiKeyEditor(): void {
        this.isApiKeyEditorOpen.update((isOpen) => !isOpen);
    }

    closeChat(): void {
        this._stopActiveRequest('Generation stopped.');
        this._stopSpeechRecognition();
        this.stopSpeaking();
        this.isOpen.set(false);
        this.isExpanded.set(false);
        this._chatToggle()?.elementRef.nativeElement.focus();
    }

    async sendMessage(): Promise<void> {
        const question = this.userInput().trim();
        const key = this.apiKey().trim();
        if (!question || (!key && !this.localProviderAvailable()) || this.isBusy()) {
            return;
        }
        const attachments = this._validatedAttachmentsForSend();
        if (!attachments) {
            return;
        }
        this._speechResponsePending = this._lastInputWasVoice;
        this._lastInputWasVoice = false;
        this._lastSpokenLength = 0;
        if (this.speechStatus() === 'listening' || this.speechStatus() === 'processing') {
            this._stopSpeechRecognition();
        }

        const requestSequence = ++this._requestSequence;
        const assistantId = this._nextMessageId();
        this._activeAssistantId = assistantId;
        this.isApiKeyEditorOpen.set(false);
        this.userInput.set('');
        this.attachments.set([]);
        this.attachmentError.set(null);
        this.error.set(null);
        this.status.set('submitted');
        this.statusMessage.set('Searching the component docs…');
        this.messages.update((messages) => [
            ...messages,
            {
                id: this._nextMessageId(),
                role: 'user',
                content: question,
                renderedHtml: null,
                sources: [],
                attachments
            },
            { id: assistantId, role: 'assistant', content: '', renderedHtml: null, sources: [], attachments: [] }
        ]);

        try {
            const onEvent = (event: ChatEvent): void => this._handleEvent(event, assistantId, requestSequence);
            if (attachments.length) {
                await this._chatService.send(question, key, onEvent, attachments);
            } else {
                await this._chatService.send(question, key, onEvent);
            }
        } catch {
            if (requestSequence === this._requestSequence) {
                this._speechResponsePending = false;
                this._lastSpokenLength = 0;
                this.error.set('The assistant could not complete this request. Please try again.');
                this.status.set('error');
                this.statusMessage.set('The assistant could not complete this request.');
            }
        } finally {
            if (requestSequence === this._requestSequence && this.isBusy()) {
                this.status.set('idle');
                this.statusMessage.set('Chat ready.');
            }
        }
    }

    onEnterKey(event: Event): void {
        if ((event as KeyboardEvent).shiftKey) {
            return;
        }
        event.preventDefault();
        void this.sendMessage();
    }

    onTextareaInput(event: Event): void {
        this.userInput.set((event.target as HTMLTextAreaElement).value);
        this._lastInputWasVoice = false;
    }

    toggleSpeechRecognition(): void {
        if (this.isSpeaking() || this.isSpeechPaused() || window.speechSynthesis?.pending) {
            this.stopSpeaking();
            return;
        }
        if (this.speechStatus() === 'listening' || this.speechStatus() === 'processing') {
            this._stopSpeechRecognition();
        } else {
            this._startSpeechRecognition();
        }
    }

    onEscapeKey(): void {
        if (this.isSpeaking() || this.isSpeechPaused() || window.speechSynthesis?.pending) {
            this.stopSpeaking();
        } else if (this.isOpen()) {
            this.closeChat();
        }
    }

    stopSpeaking(): void {
        window.speechSynthesis?.cancel();
        this.isSpeaking.set(false);
        this.isSpeechPaused.set(false);
        this._speechResponsePending = false;
        this._lastSpokenLength = 0;
    }

    onSpaceKey(event: Event): void {
        const synthesis = window.speechSynthesis;
        if (!synthesis || (!this.isSpeaking() && !this.isSpeechPaused() && !synthesis.pending)) {
            return;
        }
        if (isTextEntryTarget(event.target)) {
            return;
        }

        event.preventDefault();
        if (this.isSpeechPaused()) {
            synthesis.resume();
            this.isSpeechPaused.set(false);
        } else {
            synthesis.pause();
            this.isSpeechPaused.set(true);
        }
    }

    onMicShortcut(event: Event): void {
        if (isTextEntryTarget(event.target) || this.isBusy()) {
            return;
        }
        event.preventDefault();
        this.toggleSpeechRecognition();
    }

    onAttachShortcut(event: Event): void {
        if (isTextEntryTarget(event.target) || this.isBusy() || this.attachments().length >= MAXIMUM_CHAT_ATTACHMENTS) {
            return;
        }
        event.preventDefault();
        this.openFilePicker();
    }

    onToggleChatShortcut(event: Event): void {
        if (isTextEntryTarget(event.target)) {
            return;
        }
        event.preventDefault();
        this.toggleChat();
    }

    openFilePicker(): void {
        this.attachmentError.set(null);
        this._fileInput()?.nativeElement.click();
    }

    async onFilesSelected(event: Event): Promise<void> {
        const input = event.target as HTMLInputElement;
        const files = input.files ? Array.from(input.files) : [];
        input.value = '';
        if (!files.length) {
            return;
        }

        this.attachmentError.set(null);
        const errors: string[] = [];
        const acceptedFiles: File[] = [];
        let acceptedCount = this.attachments().length;
        let decodedBytes = this.attachments().reduce((total, attachment) => total + attachment.size, 0);

        for (const file of files) {
            if (acceptedCount >= MAXIMUM_CHAT_ATTACHMENTS) {
                errors.push(`You can attach at most ${MAXIMUM_CHAT_ATTACHMENTS} files.`);
                break;
            }
            if (!isSafeAttachmentName(file.name)) {
                errors.push('An attachment has an invalid file name.');
                continue;
            }
            if (!isAttachmentMediaType(file.type)) {
                errors.push(`"${file.name}" is not a supported type. Use PNG, JPEG, WebP, GIF, or PDF.`);
                continue;
            }
            if (file.size === 0) {
                errors.push(`"${file.name}" is empty and cannot be attached.`);
                continue;
            }
            if (decodedBytes + file.size > this.attachmentLimitBytes()) {
                errors.push(`Attachments must be ${this.attachmentLimitLabel()} or less in total.`);
                continue;
            }

            acceptedFiles.push(file);
            acceptedCount += 1;
            decodedBytes += file.size;
        }

        const accepted = acceptedFiles.map(
            (file): StagedChatAttachment => ({
                id: ++this._attachmentSequence,
                name: file.name,
                mediaType: file.type as ChatAttachmentMediaType,
                dataUrl: null,
                previewUrl: file.type.startsWith('image/') ? TRANSPARENT_IMAGE_PREVIEW : '',
                size: file.size
            })
        );
        this.attachments.update((current) => [...current, ...accepted]);

        await Promise.all(
            accepted.map(async (attachment, index) => {
                try {
                    const dataUrl = await this._readAsDataUrl(acceptedFiles[index]);
                    if (this._destroyed) {
                        return;
                    }
                    this.attachments.update((current) =>
                        current.map((item) =>
                            item.id === attachment.id
                                ? {
                                      ...item,
                                      dataUrl,
                                      previewUrl: item.mediaType.startsWith('image/') ? dataUrl : ''
                                  }
                                : item
                        )
                    );
                } catch {
                    if (this._destroyed) {
                        return;
                    }
                    this.attachments.update((current) => current.filter((item) => item.id !== attachment.id));
                    this.attachmentError.set(`"${attachment.name}" could not be read.`);
                }
            })
        );

        if (errors.length) {
            this.attachmentError.set(errors.join(' '));
        }
    }

    removeAttachment(id: number): void {
        this.attachments.update((attachments) => attachments.filter((attachment) => attachment.id !== id));
        this.attachmentError.set(null);
    }

    stopGenerating(): void {
        this._stopActiveRequest('Generation stopped.');
    }

    clearApiKey(): void {
        this.apiKey.set('');
        this.isApiKeyEditorOpen.set(true);
        if (this.isBusy()) {
            this._stopActiveRequest('API key cleared.');
        }
    }

    handleMessagesClick(event: MouseEvent): void {
        if (!(event.target instanceof Element)) {
            return;
        }

        const button = event.target.closest<HTMLButtonElement>('.code-block-copy');
        const code = button?.closest('.code-block-wrapper')?.querySelector('code')?.textContent;
        if (!button || code === undefined || !navigator.clipboard) {
            return;
        }

        const originalContent = button.innerHTML;
        void navigator.clipboard.writeText(code).then(
            () => {
                button.textContent = 'Copied!';
                button.classList.add('code-block-copy--success');
                window.setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.classList.remove('code-block-copy--success');
                }, 2000);
            },
            () => {
                button.title = 'Copy failed';
            }
        );
    }

    isExternalSource(source: ChatSource): boolean {
        return source.docsUrl.startsWith('https://');
    }

    private _startSpeechRecognition(): void {
        if (!this.isSpeechRecognitionSupported()) {
            this.speechError.set('Speech recognition is not supported in your browser.');
            this.speechStatus.set('error');
            return;
        }

        if (!this._recognition) {
            const speechWindow = window as WindowWithSpeechRecognition;
            const SpeechRecognitionConstructor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
            if (!SpeechRecognitionConstructor) {
                this.speechError.set('Speech recognition is not available.');
                this.speechStatus.set('error');
                return;
            }

            this._recognition = new SpeechRecognitionConstructor();
            this._recognition.continuous = false;
            this._recognition.interimResults = true;
            this._recognition.lang = document.documentElement.lang || 'en-US';
            this._recognition.onstart = () => {
                this.speechStatus.set('listening');
                this.speechError.set(null);
            };
            this._recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';
                for (let index = 0; index < event.results.length; index++) {
                    const result = event.results[index];
                    if (result.isFinal) {
                        finalTranscript += result[0].transcript;
                    } else {
                        interimTranscript += result[0].transcript;
                    }
                }
                this.userInput.set(finalTranscript + interimTranscript);
                this._lastInputWasVoice = true;
            };
            this._recognition.onerror = (event) => {
                this.speechStatus.set('error');
                this.speechError.set(speechRecognitionErrorMessage(event.error));
                this._scheduleSpeechReset();
            };
            this._recognition.onend = () => {
                if (this._destroyed || this.speechStatus() !== 'listening') {
                    return;
                }
                this.speechStatus.set('idle');
                if (this.userInput().trim()) {
                    void this.sendMessage();
                }
            };
        }

        try {
            this.speechStatus.set('processing');
            this._recognition.start();
        } catch {
            this.speechStatus.set('error');
            this.speechError.set('Failed to start speech recognition.');
            this._scheduleSpeechReset();
        }
    }

    private _stopSpeechRecognition(): void {
        try {
            this._recognition?.stop();
        } catch {
            // The browser may have already stopped recognition before this handler runs.
        }
        this.speechStatus.set('idle');
    }

    private _scheduleSpeechReset(): void {
        const timeoutId = window.setTimeout(() => {
            this._pendingTimeouts.delete(timeoutId);
            if (!this._destroyed) {
                this.speechError.set(null);
                this.speechStatus.set('idle');
            }
        }, 5000);
        this._pendingTimeouts.add(timeoutId);
    }

    private _queueSpeech(text: string): void {
        const synthesis = window.speechSynthesis;
        if (!synthesis || typeof SpeechSynthesisUtterance === 'undefined') {
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = document.documentElement.lang || 'en-US';
        utterance.voice = this._bestVoice(synthesis.getVoices());
        utterance.onstart = () => this.isSpeaking.set(true);
        utterance.onend = () => this._syncSpeakingState();
        utterance.onerror = () => this._syncSpeakingState();
        synthesis.speak(utterance);
    }

    private _bestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
        const language = (document.documentElement.lang || 'en-US').toLowerCase().split('-')[0];
        const matching = voices.filter((voice) => voice.lang.toLowerCase().startsWith(language));
        const candidates = matching.length ? matching : voices;
        return (
            candidates.find((voice) => /google.*neural/i.test(voice.name)) ??
            candidates.find((voice) => /google/i.test(voice.name)) ??
            candidates.find((voice) => /premium|enhanced|neural/i.test(voice.name)) ??
            candidates[0] ??
            null
        );
    }

    private _syncSpeakingState(): void {
        const synthesis = window.speechSynthesis;
        if (!synthesis?.speaking && !synthesis?.pending) {
            this.isSpeaking.set(false);
            this.isSpeechPaused.set(false);
        }
    }

    private _handleEvent(event: ChatEvent, assistantId: string, requestSequence: number): void {
        if (requestSequence !== this._requestSequence || this._activeAssistantId !== assistantId) {
            return;
        }

        switch (event.type) {
            case 'meta':
                this.catalogVersion.set(event.catalogVersion);
                break;
            case 'status':
                this.statusMessage.set(event.message);
                break;
            case 'text-delta':
                this.status.set('streaming');
                this._updateAssistant(assistantId, (message) => ({
                    ...message,
                    content: message.content + event.text
                }));
                break;
            case 'sources':
                this._updateAssistant(assistantId, (message) => ({
                    ...message,
                    sources: event.items.filter((source) => isAllowedChatUrl(source.docsUrl))
                }));
                break;
            case 'error':
                this._speechResponsePending = false;
                this._lastSpokenLength = 0;
                this.error.set(event.message);
                this.status.set('error');
                this.statusMessage.set(event.message);
                break;
            case 'done':
                this._completeAssistant(assistantId);
                this._activeAssistantId = null;
                if (!this.error()) {
                    this.status.set('idle');
                    this.statusMessage.set('Answer complete.');
                }
                break;
        }
    }

    private _stopActiveRequest(statusMessage: string): void {
        ++this._requestSequence;
        this._speechResponsePending = false;
        this._lastSpokenLength = 0;
        this._chatService.stop();
        if (this._activeAssistantId) {
            const assistantId = this._activeAssistantId;
            const message = this.messages().find((item) => item.id === assistantId);
            if (!message?.content) {
                this.messages.update((messages) => messages.filter((item) => item.id !== assistantId));
            }
        }
        this._activeAssistantId = null;
        this.status.set('idle');
        this.statusMessage.set(statusMessage);
    }

    private _completeAssistant(assistantId: string): void {
        this._updateAssistant(assistantId, (message) => ({
            ...message,
            renderedHtml: renderChatMarkdown(message.content, this._sanitizer)
        }));
    }

    private _updateAssistant(assistantId: string, update: (message: ChatMessage) => ChatMessage): void {
        this.messages.update((messages) =>
            messages.map((message) => (message.id === assistantId ? update(message) : message))
        );
    }

    private _nextMessageId(): string {
        return 'fd-guide-message-' + ++this._messageSequence;
    }

    private _validatedAttachmentsForSend(): ChatAttachment[] | undefined {
        const attachments = this.attachments();
        const totalBytes = attachments.reduce((total, attachment) => total + attachment.size, 0);
        if (attachments.length > MAXIMUM_CHAT_ATTACHMENTS || totalBytes > this.attachmentLimitBytes()) {
            this.attachmentError.set(
                `Attachments must be up to ${MAXIMUM_CHAT_ATTACHMENTS} supported files and ${this.attachmentLimitLabel()} or less in total.`
            );
            return undefined;
        }

        const outgoing: ChatAttachment[] = [];
        for (const attachment of attachments) {
            if (
                !isSafeAttachmentName(attachment.name) ||
                !isAttachmentMediaType(attachment.mediaType) ||
                attachment.dataUrl === null ||
                !attachment.dataUrl.startsWith(`data:${attachment.mediaType};base64,`)
            ) {
                this.attachmentError.set('An attachment is still being read or is invalid.');
                return undefined;
            }
            outgoing.push({
                name: attachment.name,
                mediaType: attachment.mediaType,
                dataUrl: attachment.dataUrl
            });
        }
        return outgoing;
    }

    private _readAsDataUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            const cleanup = (): void => {
                this._fileReaders.delete(reader);
            };
            this._fileReaders.add(reader);
            reader.onload = () => {
                cleanup();
                typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('FileReader failed'));
            };
            reader.onerror = () => {
                cleanup();
                reject(reader.error ?? new Error('FileReader failed'));
            };
            reader.onabort = () => {
                cleanup();
                reject(new DOMException('Aborted', 'AbortError'));
            };
            reader.readAsDataURL(file);
        });
    }

    private async _detectCapabilities(): Promise<void> {
        const capabilities = await this._chatService.getCapabilities();
        if (this._destroyed) {
            return;
        }

        this.localProviderAvailable.set(capabilities.localProvider);
        this.attachmentLimitBytes.set(
            capabilities.attachmentLimitBytes === LOCAL_ATTACHMENT_LIMIT_BYTES
                ? LOCAL_ATTACHMENT_LIMIT_BYTES
                : DEPLOYED_ATTACHMENT_LIMIT_BYTES
        );
        if (capabilities.localProvider && !this.apiKey()) {
            this.isApiKeyEditorOpen.set(false);
        }
    }
}

function isAttachmentMediaType(value: string): value is ChatAttachmentMediaType {
    return CHAT_ATTACHMENT_MEDIA_TYPES.some((mediaType) => mediaType === value);
}

function isSafeAttachmentName(value: string): boolean {
    const hasInvalidCharacter = Array.from(value).some((character) => {
        const code = character.charCodeAt(0);
        return code <= 31 || code === 127 || character === '/' || character === '\\';
    });
    return value.trim().length > 0 && value.length <= 255 && !hasInvalidCharacter && value !== '.' && value !== '..';
}

function formatAttachmentLimit(bytes: number): string {
    return bytes === LOCAL_ATTACHMENT_LIMIT_BYTES ? '5 MiB' : '256 KiB';
}

function isTextEntryTarget(target: EventTarget | null): boolean {
    return target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement;
}

function lastSentenceBoundary(value: string): number {
    return ['.', '!', '?', '\n'].reduce((latest, character) => Math.max(latest, value.lastIndexOf(character)), -1);
}

function speechRecognitionErrorMessage(error: string): string {
    if (error === 'no-speech') {
        return 'No speech detected. Please try again.';
    }
    if (error === 'audio-capture') {
        return 'No microphone found. Please ensure a microphone is connected.';
    }
    if (error === 'not-allowed') {
        return 'Microphone permission denied. Please allow microphone access.';
    }
    return `Speech recognition error: ${error}`;
}

function stripMarkdownForSpeech(value: string): string {
    return value
        .replace(/```[\s\S]*?```/g, 'code block')
        .replace(/`([^`\n]+)`/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, '$1')
        .replace(/_{1,3}([^_\n]+)_{1,3}/g, '$1')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/^[ \t]*[-*+]\s+/gm, '')
        .replace(/^[ \t]*\d+\.\s+/gm, '')
        .replace(/^[-*_]{3,}\s*$/gm, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}
