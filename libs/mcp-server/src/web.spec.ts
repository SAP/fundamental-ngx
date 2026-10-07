import { createMcpFetchHandler } from './web';

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
});
