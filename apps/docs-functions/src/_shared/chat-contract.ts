// Keep these contracts synchronized with apps/docs/src/fd-guide-chat-stream.ts (NDJSON events) and
// apps/docs/src/fd-guide-chat.service.ts (attachment media types); do not add an app-to-app import.
export type ChatRole = 'user' | 'assistant';
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

export interface ChatMessage {
    role: ChatRole;
    content: string;
    attachments?: ChatAttachment[];
}

export interface ChatRequest {
    messages: ChatMessage[];
}

export interface ChatErrorResponse {
    error: string;
}

export interface ChatSource {
    selector: string;
    docsUrl: string;
}

export type ChatEvent =
    | { type: 'meta'; catalogVersion: string }
    | { type: 'status'; message: string }
    | { type: 'text-delta'; text: string }
    | { type: 'sources'; items: ChatSource[] }
    | { type: 'error'; message: string }
    | { type: 'done' };

export function encodeEvent(event: ChatEvent): Uint8Array {
    return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
}
