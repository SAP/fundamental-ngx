import { Injectable } from '@angular/core';
import { ChatEvent, parseChatStream } from './fd-guide-chat-stream';

export const DEPLOYED_ATTACHMENT_LIMIT_BYTES = 256 * 1024;
export const LOCAL_ATTACHMENT_LIMIT_BYTES = 5 * 1024 * 1024;

// Keep these attachment media types synchronized with apps/docs-functions/src/_shared/chat-contract.ts.
export const CHAT_ATTACHMENT_MEDIA_TYPES = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'application/pdf'
] as const;

export type ChatAttachmentMediaType = (typeof CHAT_ATTACHMENT_MEDIA_TYPES)[number];

export interface ChatAttachment {
    name: string;
    mediaType: ChatAttachmentMediaType;
    dataUrl: string;
}

export interface ChatCapabilities {
    localProvider: boolean;
    attachmentLimitBytes: number;
}

export type ChatProvider = 'google' | 'groq';

type ChatHistoryMessage = {
    role: 'user' | 'assistant';
    content: string;
};

type ChatRequestMessage = ChatHistoryMessage & { attachments?: ChatAttachment[] };

const CHAT_DEBUG_STORAGE_KEY = 'fd-guide-chat-debug';
const CHAT_ENDPOINT = '/api/chat';
// Local development talks directly to the standalone chatbot (apps/chatbot, `next dev`),
// cross-origin, using the AI SDK protocol it speaks. Production uses the same-origin
// Netlify Function at CHAT_ENDPOINT instead. The branch is chosen by isLoopbackBrowser().
const CHATBOT_ENDPOINT = 'http://localhost:3000/api/chat';
const MAXIMUM_CHAT_HISTORY_MESSAGES = 8;
const CHAT_PROVIDER_KEY_HEADERS: Record<ChatProvider, string> = {
    google: 'x-gemini-api-key',
    groq: 'x-groq-api-key'
};

export class ChatRateLimitError extends Error {
    readonly status = 429;

    constructor() {
        super('The chat request was rate limited.');
        this.name = 'ChatRateLimitError';
    }
}

export function isChatRateLimitError(error: unknown): error is ChatRateLimitError {
    return (
        error instanceof ChatRateLimitError ||
        (isRecord(error) && error.name === 'ChatRateLimitError' && error.status === 429)
    );
}

@Injectable({
    providedIn: 'root'
})
export class FdGuideChatService {
    private _abortController: AbortController | null = null;
    private _history: ChatHistoryMessage[] = [];
    private _traceSequence = 0;

    async hasLocalProvider(): Promise<boolean> {
        return (await this.getCapabilities()).localProvider;
    }

    async getCapabilities(): Promise<ChatCapabilities> {
        if (!isLoopbackBrowser()) {
            return { localProvider: false, attachmentLimitBytes: DEPLOYED_ATTACHMENT_LIMIT_BYTES };
        }
        // On localhost the backend is either the Netlify Function (via `netlify dev`, which
        // answers this probe) or the standalone chatbot (via `yarn start`, which has no
        // capability endpoint and so the probe can't resolve). When the probe doesn't yield
        // JSON, assume the local provider is available — the chatbot supplies its own key.
        try {
            const response = await fetch(CHAT_ENDPOINT, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                cache: 'no-store'
            });
            if (response.ok) {
                const body: unknown = await response.json();
                if (isRecord(body)) {
                    return {
                        localProvider: body.localProvider === true,
                        attachmentLimitBytes:
                            body.attachmentLimitBytes === LOCAL_ATTACHMENT_LIMIT_BYTES
                                ? LOCAL_ATTACHMENT_LIMIT_BYTES
                                : DEPLOYED_ATTACHMENT_LIMIT_BYTES
                    };
                }
            }
        } catch {
            // Probe unavailable (standalone chatbot under `yarn start`) — fall through.
        }
        return { localProvider: true, attachmentLimitBytes: LOCAL_ATTACHMENT_LIMIT_BYTES };
    }

    async send(
        content: string,
        apiKey: string,
        onEvent: (event: ChatEvent) => void,
        attachments: readonly ChatAttachment[] = [],
        provider: ChatProvider = 'google'
    ): Promise<void> {
        const question = content.trim();
        const key = apiKey.trim();
        if (!question) {
            return;
        }

        this.stop();
        const controller = new AbortController();
        this._abortController = controller;

        if (isLoopbackBrowser()) {
            try {
                await this._streamFromChatbot(question, onEvent, attachments, controller);
            } catch (error) {
                if (!isAbortError(error)) {
                    throw error;
                }
            } finally {
                if (this._abortController === controller) {
                    this._abortController = null;
                }
            }
            return;
        }

        const newestMessage: ChatRequestMessage = attachments.length
            ? {
                  role: 'user',
                  content: question,
                  attachments: attachments.map((attachment) => ({ ...attachment }))
              }
            : { role: 'user', content: question };
        const requestHistory = selectNewestCompletePairs(this._history, MAXIMUM_CHAT_HISTORY_MESSAGES - 2);
        const requestMessages: ChatRequestMessage[] = [...requestHistory, newestMessage];
        const traceId = ++this._traceSequence;
        const startedAt = Date.now();
        const eventCounts: Record<ChatEvent['type'], number> = {
            meta: 0,
            status: 0,
            'text-delta': 0,
            sources: 0,
            error: 0,
            done: 0
        };
        let answer = '';
        let streamFailed = false;
        traceChat('request:start', {
            traceId,
            endpoint: CHAT_ENDPOINT,
            messageCount: requestMessages.length,
            questionLength: question.length
        });

        try {
            const headers = new Headers({ 'Content-Type': 'application/json' });
            if (key) {
                headers.set(CHAT_PROVIDER_KEY_HEADERS[provider], key);
            }
            const response = await fetch(CHAT_ENDPOINT, {
                method: 'POST',
                headers,
                body: JSON.stringify({ messages: requestMessages }),
                signal: controller.signal
            });
            traceChat('response', {
                traceId,
                status: response.status,
                ok: response.ok,
                contentType: response.headers.get('content-type') ?? 'missing',
                elapsedMs: Date.now() - startedAt
            });

            if (response.status === 429) {
                throw new ChatRateLimitError();
            }
            if (!response.ok) {
                throw new Error('The chat request could not be started.');
            }
            if (!response.body) {
                throw new Error('The chat response did not include a stream.');
            }

            for await (const event of parseChatStream(response.body)) {
                eventCounts[event.type] += 1;
                traceChat('stream:event', {
                    traceId,
                    type: event.type,
                    sequence: eventCounts[event.type],
                    ...safeEventDetails(event)
                });
                if (event.type === 'text-delta') {
                    answer += event.text;
                } else if (event.type === 'error') {
                    streamFailed = true;
                }
                onEvent(event);
            }

            if (!streamFailed && answer) {
                this._history = selectNewestCompletePairs(
                    [...this._history, { role: 'user', content: question }, { role: 'assistant', content: answer }],
                    MAXIMUM_CHAT_HISTORY_MESSAGES
                );
            }
            traceChat('request:complete', {
                traceId,
                elapsedMs: Date.now() - startedAt,
                answerLength: answer.length,
                streamFailed,
                eventCounts
            });
        } catch (error) {
            traceChat('request:failed', {
                traceId,
                elapsedMs: Date.now() - startedAt,
                aborted: isAbortError(error),
                errorType: error instanceof Error ? error.name : typeof error
            });
            if (!isAbortError(error)) {
                throw error;
            }
        } finally {
            if (this._abortController === controller) {
                this._abortController = null;
            }
        }
    }

    stop(): void {
        this._abortController?.abort();
        this._abortController = null;
    }

    /**
     * Local-development transport. Talks to the standalone chatbot (apps/chatbot) using the
     * AI SDK UI-message protocol it speaks — UIMessage request shape plus an SSE (`data:`)
     * response stream — and translates that stream into the same ChatEvent callbacks the
     * component consumes from the production Netlify Function. The chatbot reads its provider
     * key from its own .env.local, so no browser key is sent here.
     */
    private async _streamFromChatbot(
        question: string,
        onEvent: (event: ChatEvent) => void,
        attachments: readonly ChatAttachment[],
        controller: AbortController
    ): Promise<void> {
        const newestParts: Array<Record<string, unknown>> = [{ type: 'text', text: question }];
        for (const attachment of attachments) {
            newestParts.push({
                type: 'file',
                mediaType: attachment.mediaType,
                filename: attachment.name,
                url: attachment.dataUrl
            });
        }
        const messages = [
            ...this._history.map((message, index) => ({
                id: `history-${index}`,
                role: message.role,
                parts: [{ type: 'text', text: message.content }]
            })),
            { id: 'current', role: 'user', parts: newestParts }
        ];

        const response = await fetch(CHATBOT_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages }),
            signal: controller.signal
        });
        if (!response.ok || !response.body) {
            throw new Error('The chat request could not be started.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = '';
        let hadToolCallSinceText = false;
        let failed = false;

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const chunk = decoder.decode(value, { stream: true });
                for (const line of chunk.split('\n')) {
                    const trimmed = line.trim();
                    if (!trimmed.startsWith('data:')) {
                        continue;
                    }
                    const data = trimmed.slice(5).trim();
                    if (!data || data === '[DONE]') {
                        continue;
                    }
                    let parsed: Record<string, unknown>;
                    try {
                        parsed = JSON.parse(data) as Record<string, unknown>;
                    } catch {
                        continue;
                    }
                    const type = typeof parsed.type === 'string' ? parsed.type : '';
                    if (type === 'text-delta') {
                        let text =
                            typeof parsed.delta === 'string'
                                ? parsed.delta
                                : typeof parsed.textDelta === 'string'
                                  ? parsed.textDelta
                                  : '';
                        if (!text) {
                            continue;
                        }
                        // Insert a paragraph break when text resumes after a tool call.
                        if (hadToolCallSinceText && answer.trim().length > 0 && !answer.endsWith('\n')) {
                            text = `\n\n${text}`;
                        }
                        hadToolCallSinceText = false;
                        answer += text;
                        onEvent({ type: 'text-delta', text });
                    } else if (type === 'error') {
                        failed = true;
                        const message =
                            typeof parsed.errorText === 'string'
                                ? parsed.errorText
                                : typeof parsed.error === 'string'
                                  ? parsed.error
                                  : 'The assistant could not complete this request.';
                        onEvent({ type: 'error', message });
                    } else if (type.startsWith('tool-')) {
                        hadToolCallSinceText = true;
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }

        if (!failed) {
            onEvent({ type: 'done' });
            if (answer) {
                this._history = selectNewestCompletePairs(
                    [...this._history, { role: 'user', content: question }, { role: 'assistant', content: answer }],
                    MAXIMUM_CHAT_HISTORY_MESSAGES
                );
            }
        }
    }
}

function selectNewestCompletePairs(
    history: readonly ChatHistoryMessage[],
    maximumMessages: number
): ChatHistoryMessage[] {
    const pairs: Array<[ChatHistoryMessage, ChatHistoryMessage]> = [];
    for (let index = 0; index + 1 < history.length; index += 2) {
        const userMessage = history[index];
        const assistantMessage = history[index + 1];
        if (userMessage.role === 'user' && assistantMessage.role === 'assistant') {
            pairs.push([userMessage, assistantMessage]);
        }
    }

    return pairs
        .slice(-Math.floor(maximumMessages / 2))
        .flatMap(([userMessage, assistantMessage]) => [userMessage, assistantMessage]);
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isLoopbackBrowser(): boolean {
    if (typeof location === 'undefined') {
        return false;
    }
    return location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '[::1]';
}

function safeEventDetails(event: ChatEvent): Record<string, unknown> {
    switch (event.type) {
        case 'meta':
            return { catalogVersion: event.catalogVersion };
        case 'status':
        case 'error':
            return { messageLength: event.message.length };
        case 'text-delta':
            return { textLength: event.text.length };
        case 'sources':
            return { sourceCount: event.items.length, selectors: event.items.map((source) => source.selector) };
        case 'done':
            return {};
    }
}

function traceChat(stage: string, details: Record<string, unknown>): void {
    if (!isChatDebugEnabled()) {
        return;
    }
    console.log(`[FD Guide Chat] ${stage}`, details);
}

function isChatDebugEnabled(): boolean {
    try {
        const queryEnabled =
            typeof location !== 'undefined' && new URLSearchParams(location.search).get('fdGuideDebug') === '1';
        const storageEnabled =
            typeof localStorage !== 'undefined' && localStorage.getItem(CHAT_DEBUG_STORAGE_KEY) === '1';
        return queryEnabled || storageEnabled;
    } catch {
        return false;
    }
}

function isAbortError(error: unknown): boolean {
    return error instanceof DOMException
        ? error.name === 'AbortError'
        : error instanceof Error && error.name === 'AbortError';
}
