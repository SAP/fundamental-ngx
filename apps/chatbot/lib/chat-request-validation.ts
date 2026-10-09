import type { UIMessage } from 'ai';

export const MAX_CHAT_BODY_BYTES = 8 * 1024 * 1024;
export const MAX_CHAT_TEXT_BYTES = 64 * 1024;
export const MAX_CHAT_TEXT_PART_BYTES = 16 * 1024;
export const MAX_CHAT_FILES = 3;
export const MAX_CHAT_FILE_BYTES = 5 * 1024 * 1024;

export const INVALID_CHAT_REQUEST_ERROR = 'Invalid chat request';
export const CHAT_REQUEST_TOO_LARGE_ERROR = 'Chat request is too large';

type ValidationResult =
    | { valid: true; messages: UIMessage[]; hasFiles: boolean }
    | { valid: false; status: 400 | 413; message: string };

type SupportedMediaType = 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif' | 'application/pdf';

const BASE64_DATA_URL_PATTERN = /^data:([^;,]+);base64,([A-Za-z0-9+/]+={0,2})$/;
const MAXIMUM_FILENAME_LENGTH = 255;
const textEncoder = new TextEncoder();

export async function readAndValidateChatRequest(request: Request): Promise<ValidationResult> {
    const body = await readLimitedBody(request, MAX_CHAT_BODY_BYTES);
    if (body === undefined) {
        return tooLarge();
    }
    if (body === null) {
        return invalid();
    }

    let value: unknown;
    try {
        value = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body));
    } catch {
        return invalid();
    }

    return validateChatRequest(value);
}

async function readLimitedBody(request: Request, maximumBytes: number): Promise<Uint8Array | null | undefined> {
    const declaredLength = request.headers.get('content-length');
    if (declaredLength && /^\d+$/.test(declaredLength) && Number(declaredLength) > maximumBytes) {
        try {
            await request.body?.cancel();
        } catch {
            return undefined;
        }
        return undefined;
    }
    if (!request.body) {
        return null;
    }

    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let totalBytes = 0;
    let disconnected = false;
    const disconnect = (): void => {
        disconnected = true;
        void reader.cancel().catch(() => undefined);
    };
    request.signal.addEventListener('abort', disconnect, { once: true });

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (disconnected) {
                throw new DOMException('The request was aborted', 'AbortError');
            }
            if (done) {
                break;
            }
            if (totalBytes + value.byteLength > maximumBytes) {
                try {
                    await reader.cancel();
                } catch {
                    return undefined;
                }
                return undefined;
            }
            chunks.push(value);
            totalBytes += value.byteLength;
        }
    } finally {
        request.signal.removeEventListener('abort', disconnect);
    }

    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
        body.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return body;
}

function validateChatRequest(value: unknown): ValidationResult {
    if (!isRecord(value) || !Array.isArray(value.messages) || value.messages.length === 0) {
        return invalid();
    }

    const newestUserIndex = findNewestUserIndex(value.messages);
    if (newestUserIndex === -1) {
        return invalid();
    }

    let totalTextBytes = 0;
    let fileCount = 0;
    let decodedFileBytes = 0;

    for (const [messageIndex, message] of value.messages.entries()) {
        if (!isMessage(message)) {
            return invalid();
        }

        for (const part of message.parts) {
            if (!isRecord(part) || typeof part.type !== 'string') {
                return invalid();
            }

            if (part.type === 'text') {
                if (typeof part.text !== 'string') {
                    return invalid();
                }
                const partBytes = textEncoder.encode(part.text).byteLength;
                if (partBytes > MAX_CHAT_TEXT_PART_BYTES) {
                    return tooLarge();
                }
                totalTextBytes += partBytes;
                if (totalTextBytes > MAX_CHAT_TEXT_BYTES) {
                    return tooLarge();
                }
                continue;
            }

            if (part.type === 'file') {
                if (messageIndex !== newestUserIndex || message.role !== 'user') {
                    return invalid();
                }
                fileCount++;
                if (fileCount > MAX_CHAT_FILES) {
                    return invalid();
                }
                const decodedBytes = validateFile(part);
                if (decodedBytes === undefined) {
                    return invalid();
                }
                decodedFileBytes += decodedBytes;
                if (decodedFileBytes > MAX_CHAT_FILE_BYTES) {
                    return tooLarge();
                }
                continue;
            }

            if (!isStrippedUiPart(part.type)) {
                return invalid();
            }
        }
    }

    return { valid: true, messages: value.messages as UIMessage[], hasFiles: fileCount > 0 };
}

function findNewestUserIndex(messages: unknown[]): number {
    for (let index = messages.length - 1; index >= 0; index--) {
        const message = messages[index];
        if (isRecord(message) && message.role === 'user') {
            return index;
        }
    }
    return -1;
}

function isMessage(value: unknown): value is { id: string; role: 'user' | 'assistant'; parts: unknown[] } {
    return (
        isRecord(value) &&
        typeof value.id === 'string' &&
        value.id.length > 0 &&
        (value.role === 'user' || value.role === 'assistant') &&
        Array.isArray(value.parts) &&
        value.parts.length > 0
    );
}

function isStrippedUiPart(type: string): boolean {
    return (
        type.startsWith('tool-') ||
        type.startsWith('data-') ||
        type === 'dynamic-tool' ||
        type === 'reasoning' ||
        type === 'source-url' ||
        type === 'source-document' ||
        type === 'step-start'
    );
}

function validateFile(value: Record<string, unknown>): number | undefined {
    if (
        !isSupportedMediaType(value.mediaType) ||
        typeof value.url !== 'string' ||
        (value.filename !== undefined && !isSafeFilename(value.filename))
    ) {
        return undefined;
    }

    const match = BASE64_DATA_URL_PATTERN.exec(value.url);
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
    return decoded.byteLength;
}

function isSupportedMediaType(value: unknown): value is SupportedMediaType {
    return (
        value === 'image/png' ||
        value === 'image/jpeg' ||
        value === 'image/webp' ||
        value === 'image/gif' ||
        value === 'application/pdf'
    );
}

function isSafeFilename(value: unknown): value is string {
    return (
        typeof value === 'string' &&
        value.trim().length > 0 &&
        value.length <= MAXIMUM_FILENAME_LENGTH &&
        value !== '.' &&
        value !== '..' &&
        !Array.from(value).some((character) => {
            const code = character.charCodeAt(0);
            return code <= 31 || code === 127 || character === '/' || character === '\\';
        })
    );
}

function hasExpectedSignature(bytes: Uint8Array, mediaType: SupportedMediaType): boolean {
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

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function invalid(): ValidationResult {
    return { valid: false, status: 400, message: INVALID_CHAT_REQUEST_ERROR };
}

function tooLarge(): ValidationResult {
    return { valid: false, status: 413, message: CHAT_REQUEST_TOO_LARGE_ERROR };
}
