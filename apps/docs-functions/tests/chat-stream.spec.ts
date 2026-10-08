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
            callTool: async ({ name, arguments: args }: { name: string; arguments: unknown }) => {
                mockedMcpState.calls.push({ name, args });
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

jest.mock('ai', () => ({
    stepCountIs: (value: number) => ({ type: 'step-count', value }),
    streamText: () => {
        const { sharedGeminiState: mockedGeminiState } =
            require('./fixtures/fakes') as typeof import('./fixtures/fakes');
        return {
            textStream: (async function* () {
                if (!mockedGeminiState.emptyStream) {
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
