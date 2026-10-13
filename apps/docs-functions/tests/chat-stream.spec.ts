import chat from '../src/chat';
import {
    APPROVED_READ_ONLY_TOOLS,
    CHAT_ORIGIN,
    FIXTURE_API_KEY,
    FIXTURE_DOCS_URL,
    jsonRequest,
    responseEvents,
    sharedGeminiState,
    sharedMcpState
} from './fixtures/fakes';

jest.mock('@ai-sdk/mcp', () => ({
    createMCPClient: jest.fn(async ({ transport }: { transport: { url: string } }) => {
        const { sharedMcpState: mockedMcpState } = require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedMcpState.openedUrls.push(transport.url);
        return {
            tools: async () =>
                Object.fromEntries(mockedMcpState.toolNames.map((name) => [name, { description: name }])),
            callTool: async ({
                name,
                arguments: args,
                options
            }: {
                name: string;
                arguments: unknown;
                options?: { signal?: AbortSignal };
            }) => {
                mockedMcpState.calls.push({ name, args });
                if (options?.signal) {
                    mockedMcpState.operationSignals.push(options.signal);
                }
                const result =
                    name === 'search_components'
                        ? { results: [{ name: 'DialogComponent', selector: 'fd-dialog' }] }
                        : { name: 'DialogComponent', selector: 'fd-dialog', docsUrl: FIXTURE_DOCS_URL };
                return { content: [{ type: 'text', text: JSON.stringify(result) }] };
            },
            close: async () => {
                mockedMcpState.closeCalls += 1;
            }
        };
    })
}));

jest.mock('@ai-sdk/google', () => ({
    createGoogleGenerativeAI: jest.fn(({ apiKey }: { apiKey: string }) => {
        const { sharedGeminiState: mockedGeminiState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedGeminiState.keys.push(apiKey);
        return () => ({ provider: 'fixture-gemini' });
    })
}));

// Mutable gate for timing the first text chunk in heartbeat tests. When set, the
// first chunk only resolves after the given delay (driven by fake timers), so the
// gap between stream open and first text-delta is controllable.
const firstChunkControl: { delayMs: number } = { delayMs: 0 };

jest.mock('ai', () => ({
    stepCountIs: (value: number) => ({ type: 'step-count', value }),
    streamText: (options: unknown) => {
        const { sharedGeminiState: mockedGeminiState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedGeminiState.abortSignals.push((options as { abortSignal: AbortSignal }).abortSignal);
        return {
            textStream: (async function* () {
                if (!mockedGeminiState.emptyStream) {
                    if (firstChunkControl.delayMs > 0) {
                        await new Promise<void>((res) => setTimeout(res, firstChunkControl.delayMs));
                    }
                    yield 'fixture text';
                }
                if (mockedGeminiState.streamErrorAfterStart) {
                    throw new Error('fixture provider secret must stay server-side');
                }
            })(),
            toTextStreamResponse: () => new Response('fixture text'),
            toUIMessageStreamResponse: () => new Response('fixture text')
        };
    }
}));

const streamBody = {
    messages: [{ role: 'user', content: 'Show me how to use fd-dialog.' }]
};

function request(): Request {
    return jsonRequest(CHAT_ORIGIN + '/api/chat', streamBody, {
        headers: { 'x-gemini-api-key': FIXTURE_API_KEY }
    });
}

describe('/api/chat NDJSON stream contract', () => {
    beforeEach(() => {
        sharedGeminiState.streamErrorAfterStart = false;
        sharedGeminiState.emptyStream = false;
        sharedMcpState.toolNames = [...APPROVED_READ_ONLY_TOOLS];
        sharedMcpState.openedUrls.length = 0;
        sharedMcpState.closeCalls = 0;
        sharedMcpState.calls.length = 0;
        sharedMcpState.operationSignals.length = 0;
        sharedGeminiState.abortSignals.length = 0;
        firstChunkControl.delayMs = 0;
    });

    it('uses the application-owned NDJSON content type and no-store/no-transform headers', async () => {
        const response = await chat(request());

        expect(response.headers.get('content-type')).toBe('application/x-ndjson; charset=utf-8');
        expect(response.headers.get('cache-control')).toBe('no-store, no-transform');
        expect(response.headers.get('x-content-type-options')).toBe('nosniff');
    });

    it('accepts only the exact six-event union: meta, status, text-delta, sources, error, done', async () => {
        const response = await chat(request());
        const events = await responseEvents(response);

        expect(events.length).toBeGreaterThan(0);
        for (const event of events) {
            expect(['meta', 'status', 'text-delta', 'sources', 'error', 'done']).toContain(event.type);
        }
    });

    it('emits catalog metadata, activity status, text deltas, bounded sources, and a final done event', async () => {
        const response = await chat(request());
        const events = await responseEvents(response);
        const types = events.map((event) => event.type);

        expect(types[0]).toBe('meta');
        expect(types).toContain('status');
        expect(types).toContain('text-delta');
        expect(types).toContain('sources');
        expect(types).not.toContain('error');
        expect(types.at(-1)).toBe('done');
        expect(events.find((event) => event.type === 'meta')).toEqual(
            expect.objectContaining({ type: 'meta', catalogVersion: expect.any(String) })
        );
    });

    it('limits sources to five server-derived selector/docsUrl pairs', async () => {
        const response = await chat(request());
        const events = await responseEvents(response);
        const sources = events.find((event) => event.type === 'sources') as { items: unknown[] };

        expect(sources.items.length).toBeLessThanOrEqual(5);
        expect(sources.items).toEqual([{ selector: 'fd-dialog', docsUrl: FIXTURE_DOCS_URL }]);
        expect(sharedMcpState.calls).toContainEqual({
            name: 'search_components',
            args: { query: 'Show me how to use fd-dialog.', limit: 5 }
        });
    });

    it('turns an error after streaming starts into a safe error event and closes without provider internals', async () => {
        const { sharedGeminiState: mockedGeminiState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedGeminiState.streamErrorAfterStart = true;
        const response = await chat(request());
        const events = await responseEvents(response);
        const error = events.find((event) => event.type === 'error');

        expect(error).toEqual(expect.objectContaining({ type: 'error', message: expect.any(String) }));
        expect(JSON.stringify(error)).not.toMatch(/stack|API key|authorization|provider/i);
    });

    it('turns an empty model response into a safe error instead of a source-only answer', async () => {
        const { sharedGeminiState: mockedGeminiState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        mockedGeminiState.emptyStream = true;

        const response = await chat(request());
        const events = await responseEvents(response);

        expect(events).toEqual(expect.arrayContaining([expect.objectContaining({ type: 'error' })]));
        expect(events).not.toEqual(expect.arrayContaining([expect.objectContaining({ type: 'sources' })]));
        expect(events.at(-1)).toEqual({ type: 'done' });
    });

    it('does not expose MCP tool calls or unapproved tools in the browser stream', async () => {
        const response = await chat(request());
        const text = await response.text();

        expect(text).not.toContain('tool-call');
        expect(text).not.toContain('tool-result');
        for (const name of APPROVED_READ_ONLY_TOOLS) {
            expect(text).not.toContain(name);
        }
    });

    it('never includes the request API key in the stream or response headers', async () => {
        const response = await chat(request());
        const text = await response.text();

        expect(text).not.toContain(FIXTURE_API_KEY);
        expect([...response.headers.values()].join('\n')).not.toContain(FIXTURE_API_KEY);
    });
});

describe('/api/chat NDJSON stream heartbeat (HTTP/2 idle-kill mitigation)', () => {
    const decoder = new TextDecoder();

    function streamReader(response: Response): ReadableStreamDefaultReader<Uint8Array> {
        if (!response.body) {
            throw new Error('Expected a streaming response body');
        }
        return response.body.getReader();
    }

    beforeEach(() => {
        jest.useFakeTimers();
        sharedGeminiState.streamErrorAfterStart = false;
        sharedGeminiState.emptyStream = false;
        sharedMcpState.toolNames = [...APPROVED_READ_ONLY_TOOLS];
        sharedMcpState.openedUrls.length = 0;
        sharedMcpState.closeCalls = 0;
        sharedMcpState.calls.length = 0;
        sharedMcpState.operationSignals.length = 0;
        sharedGeminiState.abortSignals.length = 0;
        firstChunkControl.delayMs = 0;
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    // Continuously reads the NDJSON stream in the background into `events`, while the
    // test advances fake timers so heartbeat ticks (and the gated first chunk) fire.
    // Returns a controller to drive time and inspect collected events.
    function pumpStream(reader: ReadableStreamDefaultReader<Uint8Array>): {
        events: Record<string, unknown>[];
        tick: (ms: number) => Promise<void>;
        done: () => boolean;
    } {
        const events: Record<string, unknown>[] = [];
        let buffer = '';
        let finished = false;
        const read = (): void => {
            reader
                .read()
                .then(({ done, value }) => {
                    if (done) {
                        finished = true;
                        return;
                    }
                    if (value) {
                        buffer += decoder.decode(value, { stream: true });
                        let newline = buffer.indexOf('\n');
                        while (newline !== -1) {
                            const line = buffer.slice(0, newline).trim();
                            buffer = buffer.slice(newline + 1);
                            if (line) {
                                events.push(JSON.parse(line) as Record<string, unknown>);
                            }
                            newline = buffer.indexOf('\n');
                        }
                    }
                    read();
                })
                .catch(() => {
                    finished = true;
                });
        };
        read();
        return {
            events,
            done: () => finished,
            tick: async (ms: number) => {
                await jest.advanceTimersByTimeAsync(ms);
            }
        };
    }

    it('emits repeated keep-alive status heartbeats before the first text-delta when the first chunk is delayed', async () => {
        // First real chunk arrives far later than one heartbeat interval.
        firstChunkControl.delayMs = 10_000;

        const response = await chat(request());
        const reader = streamReader(response);
        const pump = pumpStream(reader);

        // Advance ~3 heartbeat intervals while the model loop is "working" (before text).
        await pump.tick(7_000);

        const firstTextIndex = pump.events.findIndex((event) => event.type === 'text-delta');
        const statusesBeforeText = pump.events
            .slice(0, firstTextIndex === -1 ? pump.events.length : firstTextIndex)
            .filter((event) => event.type === 'status');

        // Current code emits exactly ONE upfront status, so this requires the heartbeat loop.
        expect(statusesBeforeText.length).toBeGreaterThanOrEqual(2);
        // No text should have arrived yet (first chunk is gated at 10s).
        expect(firstTextIndex).toBe(-1);
        // Heartbeats must stay payload-free: neutral labels only.
        for (const status of statusesBeforeText) {
            expect(typeof status.message).toBe('string');
            expect(JSON.stringify(status)).not.toMatch(
                /tool|query|selector|api[-_ ]?key|authorization|fd-dialog|arguments|result/i
            );
        }

        await pump.tick(10_000);
        reader.releaseLock();
    });

    it('stops heartbeats once real text flows and still terminates with done', async () => {
        firstChunkControl.delayMs = 10_000;

        const response = await chat(request());
        const reader = streamReader(response);
        const pump = pumpStream(reader);

        // Drive well past the first-chunk gate so text flows and the stream completes.
        await pump.tick(20_000);
        reader.releaseLock();

        const events = pump.events;
        const firstTextIndex = events.findIndex((event) => event.type === 'text-delta');
        expect(firstTextIndex).toBeGreaterThanOrEqual(0);

        // No further status heartbeats after text begins.
        const statusesAfterText = events.slice(firstTextIndex).filter((event) => event.type === 'status');
        expect(statusesAfterText.length).toBe(0);

        expect(events.map((event) => event.type)).toContain('sources');
        expect(events.at(-1)).toEqual({ type: 'done' });
    });

    it('clears the heartbeat interval on cancel() without leaking or double-clearing', async () => {
        firstChunkControl.delayMs = 10_000;
        const clearSpy = jest.spyOn(global, 'clearInterval');

        const response = await chat(request());
        const reader = streamReader(response);
        const pump = pumpStream(reader);

        // Let at least one heartbeat tick fire so an interval is actually running.
        await pump.tick(5_000);
        expect(pump.events.some((event) => event.type === 'status')).toBe(true);
        expect(jest.getTimerCount()).toBeGreaterThan(0);

        // Cancel mid-flight before any text arrives.
        await reader.cancel();
        // Draining any remaining time must not throw (no double-clear) and no timers remain.
        await jest.advanceTimersByTimeAsync(20_000);

        expect(clearSpy).toHaveBeenCalled();
        expect(jest.getTimerCount()).toBe(0);
        clearSpy.mockRestore();
    });
});
