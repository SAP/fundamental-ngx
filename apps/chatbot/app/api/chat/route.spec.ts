import type { UIMessage } from 'ai';
import { loadMcpTools, trimHistoryForBudget } from './route';

// Integration test: requires a live MCP endpoint. Opt in by setting MCP_SERVER_URL
// (e.g. http://localhost:3000/api/mcp with `yarn dev` running). Skipped by default so
// `yarn test` stays green in CI and fresh checkouts where no dev server is up.
const integrationUrl = process.env.MCP_SERVER_URL;
const itIntegration = integrationUrl ? it : it.skip;

describe('loadMcpTools', () => {
    itIntegration(
        'loads the fundamental-ngx tools from the MCP endpoint',
        async () => {
            const { tools, close } = await loadMcpTools(integrationUrl);
            expect(Object.keys(tools)).toContain('search_components');
            expect(Object.keys(tools)).toContain('get_usage_guide');
            await close();
        },
        30000
    );
});

describe('trimHistoryForBudget', () => {
    it('strips tool parts but keeps the text thread', () => {
        const messages = [
            { id: '1', role: 'user', parts: [{ type: 'text', text: 'How do I use fd-dialog?' }] },
            {
                id: '2',
                role: 'assistant',
                parts: [
                    { type: 'tool-get_component_api', input: {}, output: { huge: 'x'.repeat(10000) } },
                    { type: 'text', text: 'Use <fd-dialog>...' }
                ]
            },
            { id: '3', role: 'user', parts: [{ type: 'text', text: 'And fd-button?' }] }
        ] as unknown as UIMessage[];

        const trimmed = trimHistoryForBudget(messages);

        expect(trimmed).toHaveLength(3);
        expect(trimmed[1].parts).toEqual([{ type: 'text', text: 'Use <fd-dialog>...' }]);
        expect(JSON.stringify(trimmed)).not.toContain('xxxxx');
    });

    it('drops messages left empty after stripping (pure tool-call turns)', () => {
        const messages = [
            { id: '1', role: 'user', parts: [{ type: 'text', text: 'hi' }] },
            { id: '2', role: 'assistant', parts: [{ type: 'tool-search_components', input: {}, output: {} }] }
        ] as unknown as UIMessage[];

        const trimmed = trimHistoryForBudget(messages);

        expect(trimmed).toHaveLength(1);
        expect(trimmed[0].id).toBe('1');
    });

    it('keeps file parts (attachments) alongside text on the current turn', () => {
        const messages = [
            { id: '1', role: 'assistant', parts: [{ type: 'text', text: 'Hi, how can I help?' }] },
            {
                id: '2',
                role: 'user',
                parts: [
                    { type: 'text', text: 'What component is this?' },
                    { type: 'file', mediaType: 'image/png', filename: 'shot.png', url: 'data:image/png;base64,AAAA' }
                ]
            }
        ] as unknown as UIMessage[];

        const trimmed = trimHistoryForBudget(messages);

        expect(trimmed).toHaveLength(2);
        expect(trimmed[1].parts).toEqual([
            { type: 'text', text: 'What component is this?' },
            { type: 'file', mediaType: 'image/png', filename: 'shot.png', url: 'data:image/png;base64,AAAA' }
        ]);
    });

    it('keeps a file-only user message (no text) rather than dropping it', () => {
        const messages = [
            {
                id: '1',
                role: 'user',
                parts: [
                    {
                        type: 'file',
                        mediaType: 'application/pdf',
                        filename: 'spec.pdf',
                        url: 'data:application/pdf;base64,AAAA'
                    }
                ]
            }
        ] as unknown as UIMessage[];

        const trimmed = trimHistoryForBudget(messages);

        expect(trimmed).toHaveLength(1);
        expect(trimmed[0].parts).toHaveLength(1);
        expect(trimmed[0].parts[0].type).toBe('file');
    });

    it('keeps only the last 8 messages', () => {
        const messages = Array.from({ length: 12 }, (_, i) => ({
            id: String(i),
            role: i % 2 === 0 ? 'user' : 'assistant',
            parts: [{ type: 'text', text: `msg ${i}` }]
        })) as unknown as UIMessage[];

        const trimmed = trimHistoryForBudget(messages);

        expect(trimmed).toHaveLength(8);
        expect(trimmed[0].id).toBe('4');
        expect(trimmed[7].id).toBe('11');
    });
});
