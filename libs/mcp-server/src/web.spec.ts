import { createMcpFetchHandler } from './web';

// web.ts statically imports the generated `./data/components.json` so the catalog
// gets bundled into serverless deployments. That file is git-ignored and only
// produced by `nx run mcp-server:extract-metadata`, so it is absent in CI and on
// fresh checkouts — a static import of it would make this suite fail to load.
// This is a unit test of the handler's wiring, not of the catalog data, so we
// stub the import with an empty catalog (the same shape `loadCatalogFromDisk()`
// falls back to when the file is missing). The tool set asserted below is
// registered by `createServer` regardless of catalog contents.
jest.mock(
    './data/components.json',
    () => ({
        __esModule: true,
        default: { generatedAt: '2026-01-01T00:00:00.000Z', version: 'test', components: [] }
    }),
    { virtual: true }
);

function jsonRpcRequest(body: unknown): Request {
    return new Request('http://local/api/mcp', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json, text/event-stream'
        },
        body: JSON.stringify(body)
    });
}

describe('createMcpFetchHandler', () => {
    it('responds to tools/list with the fundamental-ngx tool set', async () => {
        const handler = createMcpFetchHandler();
        const res = await handler(jsonRpcRequest({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }));

        expect(res.status).toBe(200);
        const text = await res.text();
        const payload = text.startsWith('{') ? JSON.parse(text) : JSON.parse(text.split('data: ')[1]);
        const names = payload.result.tools.map((t: { name: string }) => t.name);
        expect(names).toContain('search_components');
        expect(names).toContain('get_usage_guide');
    });

    it('does not expose the full component-catalog resource over HTTP', async () => {
        const handler = createMcpFetchHandler();
        const res = await handler(jsonRpcRequest({ jsonrpc: '2.0', id: 2, method: 'resources/list', params: {} }));

        expect(res.status).toBe(200);
        const payload = (await res.json()) as { result?: { resources?: Array<{ name: string }> } };
        const resourceNames = payload.result?.resources?.map((resource) => resource.name) ?? [];
        expect(resourceNames).not.toContain('component-catalog');
    });
});
