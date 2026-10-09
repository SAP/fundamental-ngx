import type { ChatEvent } from './fd-guide-chat-stream';

/** A sentinel only; it is deliberately not a usable provider credential. */
export const TEST_ONLY_NOT_A_REAL_KEY = 'test-only-not-a-real-key';
export const DEPLOYED_ATTACHMENT_LIMIT_BYTES = 256 * 1024;
export const LOCAL_ATTACHMENT_LIMIT_BYTES = 5 * 1024 * 1024;

export type TestChatAttachment = {
    name: string;
    mediaType: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif' | 'application/pdf';
    dataUrl: string;
};

export function fakeChatAttachment(
    mediaType: TestChatAttachment['mediaType'] = 'image/png',
    name = mediaType === 'application/pdf' ? 'guide.pdf' : 'guide.png'
): TestChatAttachment {
    const bytes = mediaType === 'application/pdf' ? '%PDF-fake' : '\x89PNG\r\n\x1a\n';
    const encoded = btoa(bytes);
    return { name, mediaType, dataUrl: `data:${mediaType};base64,${encoded}` };
}

export function fakeBrowserFile(name: string, mediaType: string): File {
    const bytes = mediaType === 'application/pdf' ? '%PDF-fake' : '\x89PNG\r\n\x1a\n';
    return new File([new TextEncoder().encode(bytes)], name, { type: mediaType });
}

export type Deferred<T> = {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason?: unknown) => void;
};

export function deferred<T>(): Deferred<T> {
    let resolve!: (value: T) => void;
    let reject!: (reason?: unknown) => void;
    const promise = new Promise<T>((resolvePromise, rejectPromise) => {
        resolve = resolvePromise;
        reject = rejectPromise;
    });

    return { promise, resolve, reject };
}

export function ndjsonResponse(events: ChatEvent[], byteSplits: number[] = []): Response {
    const bytes = new TextEncoder().encode(events.map((chatEvent) => JSON.stringify(chatEvent) + '\n').join(''));
    const chunks: Uint8Array[] = [];
    let offset = 0;

    for (const size of byteSplits) {
        if (offset >= bytes.length) {
            break;
        }
        chunks.push(bytes.slice(offset, offset + size));
        offset += size;
    }
    if (offset < bytes.length) {
        chunks.push(bytes.slice(offset));
    }

    return new Response(
        new ReadableStream<Uint8Array>({
            start(controller) {
                for (const chunk of chunks) {
                    controller.enqueue(chunk);
                }
                controller.close();
            }
        }),
        {
            status: 200,
            headers: { 'content-type': 'application/x-ndjson; charset=utf-8' }
        }
    );
}

export function streamFromBytes(chunks: Uint8Array[]): ReadableStream<Uint8Array> {
    return new ReadableStream<Uint8Array>({
        start(controller) {
            for (const chunk of chunks) {
                controller.enqueue(chunk);
            }
            controller.close();
        }
    });
}

export function event(type: ChatEvent['type']): ChatEvent {
    switch (type) {
        case 'meta':
            return { type, catalogVersion: '0.65.1-rc.0' };
        case 'status':
            return { type, message: 'Searching the component docs…' };
        case 'text-delta':
            return { type, text: 'Grounded answer' };
        case 'sources':
            return { type, items: [{ selector: 'fd-dialog', docsUrl: 'https://sap.github.io/fundamental-ngx/' }] };
        case 'error':
            return { type, message: 'Safe streamed failure' };
        case 'done':
            return { type };
    }
}
