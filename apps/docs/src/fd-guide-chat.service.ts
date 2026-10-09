import { Injectable } from '@angular/core';
import { ChatEvent, parseChatStream } from './fd-guide-chat-stream';

export const DEPLOYED_ATTACHMENT_LIMIT_BYTES = 256 * 1024;
export const LOCAL_ATTACHMENT_LIMIT_BYTES = 5 * 1024 * 1024;

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

type ChatHistoryMessage = {
    role: 'user' | 'assistant';
    content: string;
};

type ChatRequestMessage = ChatHistoryMessage & { attachments?: ChatAttachment[] };

const CHAT_DEBUG_STORAGE_KEY = 'fd-guide-chat-debug';
const CHAT_ENDPOINT = '/api/chat';

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
        const fallback = { localProvider: false, attachmentLimitBytes: DEPLOYED_ATTACHMENT_LIMIT_BYTES };
        if (!isLoopbackBrowser()) {
            return fallback;
        }
        try {
            const response = await fetch(CHAT_ENDPOINT, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                cache: 'no-store'
            });
            if (!response.ok) {
                return fallback;
            }

            const body: unknown = await response.json();
            if (!isRecord(body)) {
                return fallback;
            }

            return {
                localProvider: body.localProvider === true,
                attachmentLimitBytes:
                    body.attachmentLimitBytes === LOCAL_ATTACHMENT_LIMIT_BYTES
                        ? LOCAL_ATTACHMENT_LIMIT_BYTES
                        : DEPLOYED_ATTACHMENT_LIMIT_BYTES
            };
        } catch {
            return fallback;
        }
    }

    async send(
        content: string,
        apiKey: string,
        onEvent: (event: ChatEvent) => void,
        attachments: readonly ChatAttachment[] = []
    ): Promise<void> {
        const question = content.trim();
        const key = apiKey.trim();
        if (!question) {
            return;
        }

        this.stop();
        const controller = new AbortController();
        this._abortController = controller;
        const newestMessage: ChatRequestMessage = attachments.length
            ? {
                  role: 'user',
                  content: question,
                  attachments: attachments.map((attachment) => ({ ...attachment }))
              }
            : { role: 'user', content: question };
        const requestMessages: ChatRequestMessage[] = [...this._history, newestMessage];
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
                headers.set('x-gemini-api-key', key);
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
                this._history = [
                    ...this._history,
                    { role: 'user', content: question },
                    { role: 'assistant', content: answer }
                ];
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
