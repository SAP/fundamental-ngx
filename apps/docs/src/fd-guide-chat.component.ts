import { CommonModule } from '@angular/common';
import { Component, ElementRef, Signal, computed, effect, inject, signal, viewChild } from '@angular/core';
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
    message: string;
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

@Component({
    selector: 'fd-guide-chat',
    imports: [CommonModule, FormsModule, IconComponent, ButtonComponent, MarkdownComponent],
    providers: [provideChatMarkdown()],
    templateUrl: './fd-guide-chat.component.html',
    styleUrls: ['./fd-guide-chat.component.scss']
})
export class FdGuideChatComponent {
    readonly isOpen = signal(false);
    readonly isExpanded = signal(false);
    userInput = ''; // Regular property for ngModel

    /** Files staged for the next message, shown as removable chips above the input. */
    readonly attachments = signal<Attachment[]>([]);
    /** Validation message for rejected files (wrong type / too big / too many). */
    readonly attachmentError = signal<string | null>(null);

    /** Speech recognition state: 'idle' | 'listening' | 'processing' | 'error' */
    readonly speechStatus = signal<'idle' | 'listening' | 'processing' | 'error'>('idle');
    /** Error message for speech recognition. */
    readonly speechError = signal<string | null>(null);

    readonly messages: Signal<ChatMessage[]>;
    readonly status: Signal<ChatStatus>;
    readonly error: Signal<string | null>;

    readonly isBusy = computed(() => {
        const currentStatus = this.status();
        return currentStatus === 'submitted' || currentStatus === 'streaming';
    });

    private readonly chatService = inject(ChatService);
    private readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');
    private readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
    /** Speech recognition instance (lazy-initialized). */
    private recognition: SpeechRecognition | null = null;

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

    /** Check if speech recognition is supported in the current browser. */
    isSpeechRecognitionSupported(): boolean {
        const win = window as WindowWithSpeechRecognition;
        return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
    }

    /** Toggle speech recognition on/off. */
    toggleSpeechRecognition(): void {
        if (this.speechStatus() === 'listening') {
            this.stopSpeechRecognition();
        } else {
            this.startSpeechRecognition();
        }
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
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.speechStatus.set('listening');
                this.speechError.set(null);
            };

            this.recognition.onresult = (event: SpeechRecognitionEvent) => {
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                // Update the input field with the recognized text
                this.userInput = transcript;
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
                // Clear error after 5 seconds
                setTimeout(() => {
                    this.speechError.set(null);
                    this.speechStatus.set('idle');
                }, 5000);
            };

            this.recognition.onend = () => {
                if (this.speechStatus() === 'listening') {
                    this.speechStatus.set('processing');
                    // Set to idle after a brief delay
                    setTimeout(() => {
                        this.speechStatus.set('idle');
                    }, 500);
                }
            };
        }

        try {
            this.recognition.start();
        } catch {
            this.speechStatus.set('error');
            this.speechError.set('Failed to start speech recognition.');
            setTimeout(() => {
                this.speechError.set(null);
                this.speechStatus.set('idle');
            }, 5000);
        }
    }

    /** Stop listening for speech input. */
    private stopSpeechRecognition(): void {
        if (this.recognition) {
            this.recognition.stop();
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
