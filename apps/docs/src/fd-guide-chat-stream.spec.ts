import { parseChatStream } from './fd-guide-chat-stream';
import { event, streamFromBytes } from './fd-guide-chat.test-fixtures';

async function collect<T>(values: AsyncIterable<T>): Promise<T[]> {
    const result: T[] = [];
    for await (const value of values) {
        result.push(value);
    }
    return result;
}

describe('parseChatStream', () => {
    it('parses events when every NDJSON line is split at arbitrary byte boundaries', async () => {
        const source = new TextEncoder().encode(
            JSON.stringify(event('meta')) +
                '\n' +
                JSON.stringify({ type: 'text-delta', text: 'Ångström 🚀' }) +
                '\n' +
                JSON.stringify(event('done')) +
                '\n'
        );
        const chunks = Array.from(source, (_byte, index) => source.slice(index, index + 1));

        await expect(collect(parseChatStream(streamFromBytes(chunks)))).resolves.toEqual([
            event('meta'),
            { type: 'text-delta', text: 'Ångström 🚀' },
            event('done')
        ]);
    });

    it('accepts both LF and CRLF delimiters without leaking carriage returns', async () => {
        const bytes = new TextEncoder().encode(
            JSON.stringify(event('status')) + '\r\n' + JSON.stringify(event('done')) + '\n'
        );

        await expect(collect(parseChatStream(streamFromBytes([bytes])))).resolves.toEqual([
            event('status'),
            event('done')
        ]);
    });

    it('keeps UTF-8 characters intact when a multi-byte character is split across chunks', async () => {
        const bytes = new TextEncoder().encode(JSON.stringify({ type: 'text-delta', text: '文' }) + '\n');
        const split = bytes.findIndex((byte) => byte >= 0xe0);
        const chunks = [
            bytes.slice(0, split + 1),
            bytes.slice(split + 1),
            new TextEncoder().encode(JSON.stringify(event('done')) + '\n')
        ];

        await expect(collect(parseChatStream(streamFromBytes(chunks)))).resolves.toEqual([
            { type: 'text-delta', text: '文' },
            event('done')
        ]);
    });

    it('ignores malformed JSON lines but continues parsing valid events', async () => {
        const bytes = new TextEncoder().encode(
            JSON.stringify(event('meta')) + '\n{not-json}\n' + JSON.stringify(event('done')) + '\n'
        );

        await expect(collect(parseChatStream(streamFromBytes([bytes])))).resolves.toEqual([
            event('meta'),
            event('done')
        ]);
    });

    it('preserves streamed error events as safe application events', async () => {
        const bytes = new TextEncoder().encode(
            JSON.stringify(event('error')) + '\n' + JSON.stringify(event('done')) + '\n'
        );

        await expect(collect(parseChatStream(streamFromBytes([bytes])))).resolves.toEqual([
            event('error'),
            event('done')
        ]);
    });

    it('emits meta, status, text-delta, sources, error, and done as the complete event union', async () => {
        const events = [
            event('meta'),
            event('status'),
            event('text-delta'),
            event('sources'),
            event('error'),
            event('done')
        ];
        const bytes = new TextEncoder().encode(events.map((value) => JSON.stringify(value)).join('\n') + '\n');

        await expect(collect(parseChatStream(streamFromBytes([bytes])))).resolves.toEqual(events);
    });

    it('rejects an abruptly truncated response that never sends done', async () => {
        const stream = streamFromBytes([new TextEncoder().encode(JSON.stringify(event('text-delta')) + '\n')]);

        await expect(collect(parseChatStream(stream))).rejects.toThrow(/done/i);
    });
});
