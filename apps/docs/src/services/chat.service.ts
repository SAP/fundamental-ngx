import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Attachment {
    /** Original file name, shown as the chip label and sent as the file-part filename. */
    name: string;
    /** MIME type, e.g. `image/png` or `application/pdf`. */
    mediaType: string;
    /** Base64 data URL (`data:<mediaType>;base64,...`) — self-contained, no upload step. */
    url: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    attachments?: Attachment[];
}

export type ChatStatus = 'idle' | 'submitted' | 'streaming' | 'error';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    readonly messages = signal<ChatMessage[]>([]);
    readonly status = signal<ChatStatus>('idle');
    readonly error = signal<string | null>(null);

    /**
     * Observable that emits chunks of text as they arrive from the streaming response.
     * Subscribe to this to get real-time updates during message streaming.
     */
    readonly streamingChunks$: Observable<string>;

    private readonly http = inject(HttpClient);
    private readonly messageSubject = new Subject<string>();
    private abortController: AbortController | null = null;

    constructor() {
        this.streamingChunks$ = this.messageSubject.asObservable();
    }

    /**
     * Send a message to the chat API and handle the streaming response.
     * @param content The user's message text
     * @param attachments Optional files (images/PDF) to send with this message
     */
    async sendMessage(content: string, attachments: Attachment[] = []): Promise<void> {
        if (!content.trim() && attachments.length === 0) {
            return;
        }

        // Cancel any ongoing request
        if (this.abortController) {
            this.abortController.abort();
        }

        this.abortController = new AbortController();
        this.status.set('submitted');
        this.error.set(null);

        // Add user message
        const userMessage: ChatMessage = {
            id: this.generateId(),
            role: 'user',
            content: content.trim(),
            timestamp: new Date(),
            attachments: attachments.length > 0 ? attachments : undefined
        };
        this.messages.update((msgs) => [...msgs, userMessage]);

        // Create placeholder for assistant message
        const assistantMessageId = this.generateId();
        const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            role: 'assistant',
            content: '',
            timestamp: new Date()
        };
        this.messages.update((msgs) => [...msgs, assistantMessage]);

        try {
            // Attach file parts only to the newest user message: older turns keep
            // their attachments for display, but resending every base64 blob each
            // turn would bloat the payload (and the backend re-grounds via MCP, not
            // old files). The server keeps 'file' parts on the current turn only.
            const lastUserId = [...this.messages()].reverse().find((msg) => msg.role === 'user')?.id;

            // Prepare the request payload (all messages in the conversation)
            const payload = {
                messages: this.messages().map((msg) => {
                    const parts: {
                        type: string;
                        text?: string;
                        mediaType?: string;
                        filename?: string;
                        url?: string;
                    }[] = [];
                    if (msg.content) {
                        parts.push({ type: 'text', text: msg.content });
                    }
                    if (msg.id === lastUserId && msg.attachments?.length) {
                        for (const attachment of msg.attachments) {
                            parts.push({
                                type: 'file',
                                mediaType: attachment.mediaType,
                                filename: attachment.name,
                                url: attachment.url
                            });
                        }
                    }
                    // Guarantee at least one part (e.g. the empty assistant placeholder)
                    if (parts.length === 0) {
                        parts.push({ type: 'text', text: msg.content });
                    }
                    return { id: msg.id, role: msg.role, parts };
                })
            };

            // Get the API URL from environment or default to localhost
            const apiUrl = this.getChatApiUrl();

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                signal: this.abortController.signal
            });

            if (!response.ok) {
                // Surface the backend's JSON `error` (e.g. "provider can't read files")
                // instead of a bare status line; fall back if the body isn't JSON.
                let message = `HTTP ${response.status}: ${response.statusText}`;
                try {
                    const body = await response.json();
                    if (body?.error) {
                        message = body.error;
                    }
                } catch {
                    // non-JSON error body — keep the status-line message
                }
                throw new Error(message);
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            this.status.set('streaming');

            // Read the streaming response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';
            let hadToolCallSinceLastText = false;

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (!line.trim() || !line.startsWith('data: ')) {
                        continue;
                    }

                    const data = line.substring(6); // Remove 'data: ' prefix

                    if (data === '[DONE]') {
                        continue;
                    }

                    try {
                        const parsed = JSON.parse(data);

                        // Handle different response formats from AI SDK
                        if (parsed.type === 'text-delta') {
                            const textDelta = parsed.delta || parsed.textDelta || '';
                            // Insert a paragraph break when text resumes after a tool call
                            if (hadToolCallSinceLastText && accumulatedContent.trim().length > 0) {
                                if (!accumulatedContent.endsWith('\n')) {
                                    accumulatedContent += '\n\n';
                                }
                            }
                            hadToolCallSinceLastText = false;
                            accumulatedContent += textDelta;
                            this.messageSubject.next(textDelta);

                            // Update the assistant message
                            this.messages.update((msgs) =>
                                msgs.map((msg) =>
                                    msg.id === assistantMessageId ? { ...msg, content: accumulatedContent } : msg
                                )
                            );
                        } else if (parsed.type === 'error') {
                            throw new Error(parsed.error || 'Unknown error occurred');
                        } else if (parsed.type === 'tool-call' || parsed.type === 'tool-result') {
                            hadToolCallSinceLastText = true;
                        }
                        // Silently ignore other event types (start, finish, tool-output-available, etc.)
                    } catch (parseError) {
                        // Only re-throw actual errors (like the Error() we throw above)
                        // Silently ignore JSON parsing errors - they're expected for some SSE chunks
                        if (!(parseError instanceof SyntaxError)) {
                            throw parseError;
                        }
                    }
                }
            }

            this.status.set('idle');
        } catch (err) {
            if (err instanceof Error) {
                if (err.name === 'AbortError') {
                    console.log('Request aborted');
                    // Remove the incomplete assistant message
                    this.messages.update((msgs) => msgs.filter((msg) => msg.id !== assistantMessageId));
                } else {
                    console.error('Chat error:', err);
                    this.error.set(err.message);
                    this.status.set('error');

                    // Update assistant message to show error
                    this.messages.update((msgs) =>
                        msgs.map((msg) =>
                            msg.id === assistantMessageId ? { ...msg, content: `Error: ${err.message}` } : msg
                        )
                    );
                }
            }
        } finally {
            this.abortController = null;
        }
    }

    /**
     * Clear all messages and reset the chat.
     */
    clearMessages(): void {
        this.messages.set([]);
        this.status.set('idle');
        this.error.set(null);
    }

    /**
     * Cancel the current streaming request.
     */
    cancelRequest(): void {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
    }

    private getChatApiUrl(): string {
        // In production, this would come from environment config
        // For now, default to the chatbot app running on port 3000
        return 'http://localhost:3000/api/chat';
    }

    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
}
