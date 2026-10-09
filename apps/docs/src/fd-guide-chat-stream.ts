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

export async function* parseChatStream(stream: ReadableStream<Uint8Array>): AsyncGenerator<ChatEvent> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                buffer += decoder.decode();
                break;
            }

            buffer += decoder.decode(value, { stream: true });
            let lineEnd = buffer.indexOf('\n');

            while (lineEnd !== -1) {
                const event = parseEvent(buffer.slice(0, lineEnd).replace(/\r$/, ''));
                buffer = buffer.slice(lineEnd + 1);

                if (event) {
                    yield event;
                    if (event.type === 'done') {
                        return;
                    }
                }

                lineEnd = buffer.indexOf('\n');
            }
        }

        const finalEvent = parseEvent(buffer.replace(/\r$/, ''));
        if (finalEvent) {
            yield finalEvent;
            if (finalEvent.type === 'done') {
                return;
            }
        }
    } finally {
        reader.releaseLock();
    }

    throw new Error('Chat stream ended without a done event.');
}

function parseEvent(line: string): ChatEvent | null {
    if (!line.trim()) {
        return null;
    }

    let value: unknown;
    try {
        value = JSON.parse(line);
    } catch {
        return null;
    }

    if (!isRecord(value) || typeof value.type !== 'string') {
        return null;
    }

    switch (value.type) {
        case 'meta':
            return typeof value.catalogVersion === 'string'
                ? { type: value.type, catalogVersion: value.catalogVersion }
                : null;
        case 'status':
        case 'error':
            return typeof value.message === 'string' ? { type: value.type, message: value.message } : null;
        case 'text-delta':
            return typeof value.text === 'string' ? { type: value.type, text: value.text } : null;
        case 'sources': {
            if (!Array.isArray(value.items)) {
                return null;
            }
            const items = value.items.filter(isChatSource).slice(0, 5);
            return items.length === value.items.length ? { type: value.type, items } : null;
        }
        case 'done':
            return { type: value.type };
        default:
            return null;
    }
}

function isChatSource(value: unknown): value is ChatSource {
    return isRecord(value) && typeof value.selector === 'string' && typeof value.docsUrl === 'string';
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
}
