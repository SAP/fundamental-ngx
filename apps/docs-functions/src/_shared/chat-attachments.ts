import type { ModelMessage } from 'ai';

import {
    CHAT_ATTACHMENT_MEDIA_TYPES,
    type ChatAttachment,
    type ChatAttachmentMediaType,
    type ChatMessage,
    type ChatRequest
} from './chat-contract';

export const MAXIMUM_CHAT_ATTACHMENTS = 3;
export const MAXIMUM_TEXT_ONLY_CHAT_BODY_BYTES = 256 * 1024;
export const DEPLOYED_ATTACHMENT_LIMIT_BYTES = 256 * 1024;
export const LOCAL_ATTACHMENT_LIMIT_BYTES = 5 * 1024 * 1024;
export const DEPLOYED_ATTACHMENT_CHAT_BODY_LIMIT_BYTES = 512 * 1024;
export const LOCAL_ATTACHMENT_CHAT_BODY_LIMIT_BYTES = 8 * 1024 * 1024;

type ChatValidationResult =
    | { valid: true; body: ChatRequest; hasAttachments: boolean }
    | { valid: false; status: 400 | 413; message: string };

const ATTACHMENT_KEYS = ['dataUrl', 'mediaType', 'name'];
const BASE64_DATA_URL_PATTERN = /^data:([^;,]+);base64,([A-Za-z0-9+/]+={0,2})$/;
const MAXIMUM_ATTACHMENT_NAME_LENGTH = 255;

export function validateChatRequest(value: unknown, attachmentLimitBytes: number): ChatValidationResult {
    if (!isRecord(value) || !hasExactKeys(value, ['messages']) || !Array.isArray(value.messages)) {
        return invalidChatRequest();
    }
    if (value.messages.length === 0) {
        return invalidChatRequest();
    }

    let decodedAttachmentBytes = 0;
    let hasAttachments = false;
    const messages: ChatMessage[] = [];

    for (const [index, candidate] of value.messages.entries()) {
        if (!isRecord(candidate)) {
            return invalidChatRequest();
        }

        const isFinalMessage = index === value.messages.length - 1;
        const hasAttachmentField = Object.hasOwn(candidate, 'attachments');
        const expectedKeys = hasAttachmentField ? ['attachments', 'content', 'role'] : ['content', 'role'];
        if (
            !hasExactKeys(candidate, expectedKeys) ||
            (candidate.role !== 'user' && candidate.role !== 'assistant') ||
            typeof candidate.content !== 'string' ||
            candidate.content.trim().length === 0
        ) {
            return invalidChatRequest();
        }

        if (!hasAttachmentField) {
            messages.push({ role: candidate.role, content: candidate.content });
            continue;
        }
        if (candidate.role !== 'user' || !isFinalMessage || !Array.isArray(candidate.attachments)) {
            return invalidAttachmentRequest();
        }
        if (candidate.attachments.length === 0 || candidate.attachments.length > MAXIMUM_CHAT_ATTACHMENTS) {
            return invalidAttachmentRequest();
        }

        const attachments: ChatAttachment[] = [];
        for (const attachment of candidate.attachments) {
            const validated = validateAttachment(attachment);
            if (!validated) {
                return invalidAttachmentRequest();
            }
            decodedAttachmentBytes += validated.decodedBytes;
            if (decodedAttachmentBytes > attachmentLimitBytes) {
                return { valid: false, status: 413, message: 'Attachments exceed the allowed total size' };
            }
            attachments.push(validated.attachment);
        }
        hasAttachments = true;
        messages.push({ role: candidate.role, content: candidate.content, attachments });
    }

    if (messages.at(-1)?.role !== 'user') {
        return invalidChatRequest();
    }

    return { valid: true, body: { messages }, hasAttachments };
}

export function toModelMessages(messages: ChatMessage[]): ModelMessage[] {
    return messages.map((message, index) => {
        const isFinalMessage = index === messages.length - 1;
        if (message.role !== 'user' || !isFinalMessage || !message.attachments?.length) {
            return { role: message.role, content: message.content };
        }
        return {
            role: 'user',
            content: [
                { type: 'text', text: message.content },
                ...message.attachments.map((attachment) => ({
                    type: 'file' as const,
                    data: attachment.dataUrl,
                    mediaType: attachment.mediaType,
                    filename: attachment.name
                }))
            ]
        };
    });
}

export function attachmentPayloads(messages: ChatMessage[]): string[] {
    return (messages.at(-1)?.attachments ?? []).flatMap((attachment) => {
        const separator = attachment.dataUrl.indexOf(',');
        return separator === -1 ? [attachment.dataUrl] : [attachment.dataUrl, attachment.dataUrl.slice(separator + 1)];
    });
}

export function containsAttachmentPayload(value: unknown, payloads: string[], seen = new Set<unknown>()): boolean {
    if (typeof value === 'string') {
        return (
            BASE64_DATA_URL_PATTERN.test(value) ||
            payloads.some((payload) => payload.length > 0 && value.includes(payload))
        );
    }
    if (value === null || value === undefined || typeof value !== 'object' || seen.has(value)) {
        return false;
    }
    if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
        return true;
    }

    seen.add(value);
    const children = Array.isArray(value) ? value : Object.values(value as Record<string, unknown>);
    return children.some((child) => containsAttachmentPayload(child, payloads, seen));
}

function validateAttachment(value: unknown): { attachment: ChatAttachment; decodedBytes: number } | undefined {
    if (
        !isRecord(value) ||
        !hasExactKeys(value, ATTACHMENT_KEYS) ||
        !isSafeAttachmentName(value.name) ||
        !isAttachmentMediaType(value.mediaType) ||
        typeof value.dataUrl !== 'string'
    ) {
        return undefined;
    }

    const match = BASE64_DATA_URL_PATTERN.exec(value.dataUrl);
    if (!match || match[1] !== value.mediaType || match[2].length % 4 !== 0) {
        return undefined;
    }

    const decoded = Buffer.from(match[2], 'base64');
    if (
        decoded.length === 0 ||
        decoded.toString('base64') !== match[2] ||
        !hasExpectedSignature(decoded, value.mediaType)
    ) {
        return undefined;
    }

    return {
        attachment: { name: value.name, mediaType: value.mediaType, dataUrl: value.dataUrl },
        decodedBytes: decoded.byteLength
    };
}

function hasExpectedSignature(bytes: Uint8Array, mediaType: ChatAttachmentMediaType): boolean {
    switch (mediaType) {
        case 'image/png':
            return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
        case 'image/jpeg':
            return startsWith(bytes, [0xff, 0xd8, 0xff]);
        case 'image/webp':
            return (
                startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes.subarray(8), [0x57, 0x45, 0x42, 0x50])
            );
        case 'image/gif':
            return (
                startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x37, 0x61]) ||
                startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x39, 0x61])
            );
        case 'application/pdf':
            return startsWith(bytes, [0x25, 0x50, 0x44, 0x46, 0x2d]);
    }
}

function startsWith(bytes: Uint8Array, signature: number[]): boolean {
    return bytes.length >= signature.length && signature.every((byte, index) => bytes[index] === byte);
}

function isSafeAttachmentName(value: unknown): value is string {
    return (
        typeof value === 'string' &&
        value.trim().length > 0 &&
        value.length <= MAXIMUM_ATTACHMENT_NAME_LENGTH &&
        !Array.from(value).some((character) => {
            const code = character.charCodeAt(0);
            return code <= 31 || code === 127 || character === '/' || character === '\\';
        }) &&
        value !== '.' &&
        value !== '..'
    );
}

function isAttachmentMediaType(value: unknown): value is ChatAttachmentMediaType {
    return typeof value === 'string' && CHAT_ATTACHMENT_MEDIA_TYPES.some((mediaType) => mediaType === value);
}

function invalidChatRequest(): ChatValidationResult {
    return {
        valid: false,
        status: 400,
        message: 'Request body must contain a valid non-empty conversation ending with a user message'
    };
}

function invalidAttachmentRequest(): ChatValidationResult {
    return { valid: false, status: 400, message: 'Request contains an invalid attachment' };
}

function hasExactKeys(value: Record<string, unknown>, expected: string[]): boolean {
    const keys = Object.keys(value).sort();
    return keys.length === expected.length && keys.every((key, index) => key === expected[index]);
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
