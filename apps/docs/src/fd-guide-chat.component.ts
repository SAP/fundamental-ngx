import { CommonModule } from '@angular/common';
import { Component, ElementRef, Signal, computed, effect, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MarkdownComponent } from 'ngx-markdown';
import { provideChatMarkdown } from './services/chat-markdown.config';
import { ChatMessage, ChatService, ChatStatus } from './services/chat.service';

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

    readonly messages: Signal<ChatMessage[]>;
    readonly status: Signal<ChatStatus>;
    readonly error: Signal<string | null>;

    readonly isBusy = computed(() => {
        const currentStatus = this.status();
        return currentStatus === 'submitted' || currentStatus === 'streaming';
    });

    private readonly chatService = inject(ChatService);
    private readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

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
    }

    async sendMessage(): Promise<void> {
        const input = this.userInput.trim();
        if (!input || this.isBusy()) {
            return;
        }

        // Clear input immediately for better UX
        this.userInput = '';

        // Send the message
        await this.chatService.sendMessage(input);
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
    }

    private scrollToBottom(): void {
        setTimeout(() => {
            const container = this.messagesContainer()?.nativeElement;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 0);
    }
}
