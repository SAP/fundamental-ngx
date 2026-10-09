import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, Signal, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { provideChatMarkdown } from './services/chat-markdown.config';
import { Attachment, ChatMessage, ChatService, ChatStatus } from './services/chat.service';

// Web Speech API types
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
    onend: ((this: SpeechRecognition, ev: Event) => void) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
    start(): void;
    stop(): void;
    abort(): void;
}

interface SpeechRecognitionErrorEvent extends Event {
    error: string;
}

interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
    length: number;
    item(index: number): SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
    length: number;
    item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface WindowWithSpeechRecognition extends Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
}

/** MIME types the attachment picker accepts — images and PDF (vision-capable providers). */
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'application/pdf'];
/** Per-file size ceiling. Base64 inflates ~33%, so this keeps payloads well within model limits. */
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
/** Max files per message. */
const MAX_FILES = 3;
const IS_MAC = /Mac|iPhone|iPad|iPod/i.test(navigator.platform);

@Component({
    selector: 'fd-guide-chat',
    imports: [CommonModule, FormsModule, IconComponent, ButtonComponent, MarkdownComponent],
    providers: [provideChatMarkdown()],
    templateUrl: './fd-guide-chat.component.html',
    styleUrls: ['./fd-guide-chat.component.scss'],
    host: {
        '(document:keydown.escape)': 'stopSpeaking()',
        '(document:keydown.space)': 'onSpaceKey($event)',
        // Mic: Ctrl+Shift+M (Win/Linux) or ⌘+Shift+M (Mac)
        '(document:keydown.ctrl.shift.m)': 'onMicShortcut($event)',
        '(document:keydown.meta.shift.m)': 'onMicShortcut($event)',
        // Attach: ⌘+Shift+A (Mac) or Ctrl+Shift+U (Win/Linux — Ctrl+Shift+A opens tab search in Chrome on Windows)
        '(document:keydown.meta.shift.a)': 'onAttachShortcut($event)',
        '(document:keydown.ctrl.shift.u)': 'onAttachShortcut($event)',
        // Chat toggle: Ctrl+Shift+G (Win/Linux) or ⌘B (Mac)
        '(document:keydown.ctrl.shift.g)': 'onToggleChatShortcut($event)',
        '(document:keydown.meta.b)': 'onToggleChatShortcut($event)'
    }
})
export class FdGuideChatComponent {
    readonly isOpen = signal(false);
    readonly isExpanded = signal(false);
    userInput = ''; // Regular property for ngModel

    readonly chatToggleShortcut = IS_MAC ? '⌘B' : 'Ctrl+Shift+G';
    readonly micShortcut = IS_MAC ? '⌘+Shift+M' : 'Ctrl+Shift+M';
    readonly attachShortcut = IS_MAC ? '⌘+Shift+A' : 'Ctrl+Shift+U';

    /** Files staged for the next message, shown as removable chips above the input. */
    readonly attachments = signal<Attachment[]>([]);
    /** Validation message for rejected files (wrong type / too big / too many). */
    readonly attachmentError = signal<string | null>(null);

    /** Speech recognition state: 'idle' | 'listening' | 'processing' | 'error' */
    readonly speechStatus = signal<'idle' | 'listening' | 'processing' | 'error'>('idle');
    /** Error message for speech recognition. */
    readonly speechError = signal<string | null>(null);
    /** True while the browser is reading the assistant response aloud. */
    readonly isSpeaking = signal(false);
    /** True while TTS is paused (Space to resume, ESC to cancel). */
    readonly isSpeechPaused = signal(false);

    readonly messages: Signal<ChatMessage[]>;
    readonly status: Signal<ChatStatus>;
    readonly error: Signal<string | null>;

    readonly isBusy = computed(() => {
        const currentStatus = this.status();
        return currentStatus === 'submitted' || currentStatus === 'streaming';
    });

    readonly isSpeechRecognitionSupported = computed(() => {
        const win = window as WindowWithSpeechRecognition;
        return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
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

    readonly speechButtonGlyph = computed(() => {
        if (this.speechStatus() === 'listening' || this.isSpeaking() || this.isSpeechPaused()) {
            return 'stop';
        }
        return 'microphone';
    });

    private readonly chatService = inject(ChatService);
    private readonly destroyRef = inject(DestroyRef);
    private readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');
    private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
    /** Speech recognition instance (lazy-initialized). */
    private recognition: SpeechRecognition | null = null;
    private readonly pendingTimeouts: ReturnType<typeof setTimeout>[] = [];
    private lastInputWasVoice = false;
    private speechResponsePending = false;

    constructor() {
        this.messages = this.chatService.messages;
        this.status = this.chatService.status;
        this.error = this.chatService.error;
        // Auto-scroll to bottom when new messages arrive
        effect(() => {
            const msgs = this.messages();
            if (msgs.length > 0) {
                this.scrollToBottom();
            }
        });

        // Speak the assistant response when voice was used for the input
        effect(() => {
            const s = this.status();
            const msgs = this.messages();
            if (s === 'idle' && this.speechResponsePending) {
                this.speechResponsePending = false;
                const lastAssistant = [...msgs].reverse().find((m) => m.role === 'assistant');
                if (lastAssistant?.content) {
                    this.speakText(this.stripMarkdown(lastAssistant.content));
                }
            }
        });

        // Set up event delegation for copy buttons using effect
        effect(() => {
            const container = this.messagesContainer()?.nativeElement;
            if (container) {
                const handleClick = (event: Event): void => {
                    const target = event.target as HTMLElement;
                    const button = target.closest('.code-block-copy') as HTMLButtonElement;

                    if (!button) {
                        return;
                    }

                    const base64Code = button.getAttribute('data-code');
                    if (!base64Code) {
                        return;
                    }

                    // Decode base64
                    let decodedCode: string;
                    try {
                        decodedCode = decodeURIComponent(escape(atob(base64Code)));
                    } catch (e) {
                        console.error('Failed to decode code:', e);
                        return;
                    }

                    // Copy to clipboard
                    navigator.clipboard
                        .writeText(decodedCode)
                        .then(() => {
                            // Show success feedback
                            const originalText = button.innerHTML;
                            button.innerHTML = `
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                                </svg>
                                Copied!
                            `;
                            button.classList.add('code-block-copy--success');

                            // Reset after 2 seconds
                            setTimeout(() => {
                                button.innerHTML = originalText;
                                button.classList.remove('code-block-copy--success');
                            }, 2000);
                        })
                        .catch((err) => {
                            console.error('Failed to copy code:', err);
                        });
                };

                container.addEventListener('click', handleClick);

                // Cleanup function
                return () => {
                    container.removeEventListener('click', handleClick);
                };
            }
            return;
        });

        this.destroyRef.onDestroy(() => {
            this.recognition?.abort();
            window.speechSynthesis?.cancel();
            for (const id of this.pendingTimeouts) {
                clearTimeout(id);
            }
        });
    }

    toggleChat(): void {
        this.isOpen.update((v) => !v);
        if (!this.isOpen()) {
            this.isExpanded.set(false);
        }
    }

    toggleExpand(): void {
        this.isExpanded.update((v) => !v);
    }

    closeChat(): void {
        this.isOpen.set(false);
        this.isExpanded.set(false);
        this.attachmentError.set(null);
    }

    async sendMessage(): Promise<void> {
        const input = this.userInput.trim();
        const attachments = this.attachments();
        if ((!input && attachments.length === 0) || this.isBusy()) {
            return;
        }

        // Capture voice intent before resetting state
        this.speechResponsePending = this.lastInputWasVoice;
        this.lastInputWasVoice = false;

        // Auto-stop recognition if still active
        const s = this.speechStatus();
        if (s === 'listening' || s === 'processing') {
            this.stopSpeechRecognition();
        }

        // Clear input + staged files immediately for better UX
        this.userInput = '';
        this.attachments.set([]);
        this.attachmentError.set(null);

        // Send the message
        await this.chatService.sendMessage(input, attachments);
    }

    /** Open the native file picker (triggered by the paper-clip button). */
    openFilePicker(): void {
        this.attachmentError.set(null);
        this.fileInput()?.nativeElement.click();
    }

    /** Validate the chosen files and stage the accepted ones as data-URL attachments. */
    async onFilesSelected(event: Event): Promise<void> {
        const target = event.target as HTMLInputElement;
        const files = target.files ? Array.from(target.files) : [];
        // Reset the input so selecting the same file again still fires `change`.
        target.value = '';
        if (files.length === 0) {
            return;
        }

        this.attachmentError.set(null);
        const errors: string[] = [];
        const accepted: Attachment[] = [];

        for (const file of files) {
            if (this.attachments().length + accepted.length >= MAX_FILES) {
                errors.push(`You can attach at most ${MAX_FILES} files.`);
                break;
            }
            if (!ALLOWED_FILE_TYPES.includes(file.type)) {
                errors.push(`"${file.name}" is not a supported type (images or PDF only).`);
                continue;
            }
            if (file.size > MAX_FILE_SIZE_BYTES) {
                errors.push(`"${file.name}" is larger than ${MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB.`);
                continue;
            }
            try {
                const url = await this.readAsDataUrl(file);
                accepted.push({ name: file.name, mediaType: file.type, url });
            } catch {
                errors.push(`"${file.name}" could not be read.`);
            }
        }

        if (accepted.length > 0) {
            this.attachments.update((list) => [...list, ...accepted]);
        }
        if (errors.length > 0) {
            this.attachmentError.set(errors.join(' '));
        }
    }

    /** Remove a staged attachment by its data URL. */
    removeAttachment(url: string): void {
        this.attachments.update((list) => list.filter((attachment) => attachment.url !== url));
        // Removing a file resolves "too many files" (and clears any stale notice).
        this.attachmentError.set(null);
    }

    onEnterKey(event: Event): void {
        const keyboardEvent = event as KeyboardEvent;
        // Allow Shift+Enter for new lines
        if (keyboardEvent.shiftKey) {
            return;
        }
        // Otherwise, send the message
        event.preventDefault();
        void this.sendMessage();
    }

    clearChat(): void {
        this.chatService.clearMessages();
        this.attachmentError.set(null);
    }

    /** Toggle speech recognition on/off. */
    toggleSpeechRecognition(): void {
        if (this.isSpeaking() || this.isSpeechPaused()) {
            this.stopSpeaking();
            return;
        }
        const s = this.speechStatus();
        if (s === 'listening' || s === 'processing') {
            this.stopSpeechRecognition();
        } else {
            this.startSpeechRecognition();
        }
    }

    /** Cancel TTS playback entirely. Bound to ESC key via host binding. */
    stopSpeaking(): void {
        if (!window.speechSynthesis) {
            return;
        }
        if (this.isSpeaking() || this.isSpeechPaused()) {
            window.speechSynthesis.cancel();
            this.isSpeechPaused.set(false);
        }
    }

    /** Toggle TTS pause/resume. Bound to Space key via host binding. */
    onSpaceKey(event: Event): void {
        if (!this.isSpeaking() && !this.isSpeechPaused()) {
            return;
        }
        const target = event.target as HTMLElement;
        if (target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement) {
            return;
        }
        event.preventDefault();
        if (this.isSpeechPaused()) {
            window.speechSynthesis.resume();
            this.isSpeechPaused.set(false);
        } else {
            window.speechSynthesis.pause();
            this.isSpeechPaused.set(true);
        }
    }

    /** Reset voice-input flag when the user types manually. */
    onTextareaInput(): void {
        this.lastInputWasVoice = false;
    }

    /** Alt+M shortcut: toggle mic (same as clicking the mic button). */
    onMicShortcut(event: Event): void {
        const target = event.target as HTMLElement;
        if (target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement) {
            return;
        }
        event.preventDefault();
        this.toggleSpeechRecognition();
    }

    /** Ctrl+Shift+A shortcut: open the file picker (same as clicking the attach button). */
    onAttachShortcut(event: Event): void {
        const target = event.target as HTMLElement;
        if (target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement) {
            return;
        }
        event.preventDefault();
        if (!this.isBusy()) {
            this.openFilePicker();
        }
    }

    /** Ctrl+Shift+C shortcut: toggle the chat popup open/closed. */
    onToggleChatShortcut(event: Event): void {
        const target = event.target as HTMLElement;
        if (target instanceof HTMLTextAreaElement || target instanceof HTMLInputElement) {
            return;
        }
        event.preventDefault();
        this.toggleChat();
    }

    /** Start listening for speech input. */
    private startSpeechRecognition(): void {
        if (!this.isSpeechRecognitionSupported()) {
            this.speechError.set('Speech recognition is not supported in your browser.');
            this.speechStatus.set('error');
            return;
        }

        // Lazy-initialize recognition
        if (!this.recognition) {
            const win = window as WindowWithSpeechRecognition;
            const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
            if (!SpeechRecognitionClass) {
                this.speechError.set('Speech recognition is not available.');
                this.speechStatus.set('error');
                return;
            }

            this.recognition = new SpeechRecognitionClass();
            this.recognition.continuous = false;
            this.recognition.interimResults = true;
            this.recognition.lang = document.documentElement.lang || 'en-US';

            this.recognition.onstart = () => {
                this.speechStatus.set('listening');
                this.speechError.set(null);
            };

            this.recognition.onresult = (event: SpeechRecognitionEvent) => {
                let finalTranscript = '';
                let interimTranscript = '';
                for (let i = 0; i < event.results.length; i++) {
                    const result = event.results[i];
                    if (result.isFinal) {
                        finalTranscript += result[0].transcript;
                    } else {
                        interimTranscript += result[0].transcript;
                    }
                }
                this.userInput = finalTranscript + interimTranscript;
                this.lastInputWasVoice = true;
            };

            this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                this.speechStatus.set('error');
                if (event.error === 'no-speech') {
                    this.speechError.set('No speech detected. Please try again.');
                } else if (event.error === 'audio-capture') {
                    this.speechError.set('No microphone found. Please ensure a microphone is connected.');
                } else if (event.error === 'not-allowed') {
                    this.speechError.set('Microphone permission denied. Please allow microphone access.');
                } else {
                    this.speechError.set(`Speech recognition error: ${event.error}`);
                }
                this.pendingTimeouts.push(
                    setTimeout(() => {
                        this.speechError.set(null);
                        this.speechStatus.set('idle');
                    }, 5000)
                );
            };

            this.recognition.onend = () => {
                if (this.speechStatus() !== 'listening') {
                    return;
                }
                // Auto-send if there is a transcript; otherwise just reset state
                if (this.userInput.trim()) {
                    void this.sendMessage();
                } else {
                    this.speechStatus.set('idle');
                }
            };
        }

        try {
            this.recognition.start();
        } catch {
            this.speechStatus.set('error');
            this.speechError.set('Failed to start speech recognition.');
            this.pendingTimeouts.push(
                setTimeout(() => {
                    this.speechError.set(null);
                    this.speechStatus.set('idle');
                }, 5000)
            );
        }
    }

    /** Stop listening for speech input. */
    private stopSpeechRecognition(): void {
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch {
                // Already stopped (e.g. called from onend after auto-send)
            }
            this.speechStatus.set('idle');
        }
    }

    private scrollToBottom(): void {
        setTimeout(() => {
            const container = this.messagesContainer()?.nativeElement;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 0);
    }

    private speakText(text: string): void {
        if (!window.speechSynthesis) {
            return;
        }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = document.documentElement.lang || 'en-US';
        utterance.voice = this.getBestVoice();
        utterance.onstart = () => this.isSpeaking.set(true);
        utterance.onend = () => this.isSpeaking.set(false);
        utterance.onerror = () => this.isSpeaking.set(false);
        window.speechSynthesis.speak(utterance);
    }

    private getBestVoice(): SpeechSynthesisVoice | null {
        const voices = window.speechSynthesis.getVoices();
        if (!voices.length) {
            return null;
        }
        const lang = (document.documentElement.lang || 'en-US').toLowerCase();
        const prefix = lang.split('-')[0];
        const matching = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
        const pool = matching.length ? matching : voices;
        return (
            pool.find((v) => /google.*neural/i.test(v.name)) ??
            pool.find((v) => /google/i.test(v.name)) ??
            pool.find((v) => /premium|enhanced|neural/i.test(v.name)) ??
            pool[0] ??
            null
        );
    }

    private stripMarkdown(text: string): string {
        return text
            .replace(/```[\s\S]*?```/g, 'code block')
            .replace(/`([^`\n]+)`/g, '$1')
            .replace(/^#{1,6}\s+/gm, '')
            .replace(/\*{3}([^*\n]+)\*{3}/g, '$1')
            .replace(/_{3}([^_\n]+)_{3}/g, '$1')
            .replace(/\*{2}([^*\n]+)\*{2}/g, '$1')
            .replace(/_{2}([^_\n]+)_{2}/g, '$1')
            .replace(/\*([^*\n]+)\*/g, '$1')
            .replace(/_([^_\n]+)_/g, '$1')
            .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
            .replace(/^[ \t]*[-*+]\s+/gm, '')
            .replace(/^[ \t]*\d+\.\s+/gm, '')
            .replace(/^[-*_]{3,}\s*$/gm, '')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }

    /** Read a File into a base64 data URL (`data:<mime>;base64,...`). */
    private readAsDataUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error ?? new Error('FileReader failed'));
            reader.readAsDataURL(file);
        });
    }
}
