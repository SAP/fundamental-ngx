import mcp, { config } from '../src/mcp';
import { createFakeMcpState, fakeMcpFetchHandler, mcpJsonRpcRequest } from './fixtures/fakes';

jest.mock(
    '@fundamental-ngx/mcp-server/web',
    () => ({
        createMcpFetchHandler: () => require('./fixtures/fakes').fakeMcpFetchHandler
    }),
    { virtual: true }
);

describe('/api/mcp Netlify Function', () => {
    beforeEach(() => {
        fakeMcpFetchHandler.mockClear();
    });

    it('exports a 60/minute IP-and-domain rate limit', () => {
        expect(config).toEqual({
            rateLimit: { windowSize: 60, windowLimit: 60, aggregateBy: ['ip', 'domain'] }
        });
    });

    it('delegates a valid MCP request and disables caching', async () => {
        const response = await mcp(mcpJsonRpcRequest({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} }));

        expect(fakeMcpFetchHandler).toHaveBeenCalledTimes(1);
        expect(response.status).toBe(200);
        expect(response.headers.get('cache-control')).toBe('no-store');
    });

    it('accepts GET for the MCP transport and disables caching', async () => {
        const response = await mcp(mcpJsonRpcRequest(undefined, { method: 'GET' }));

        expect(response.status).toBe(200);
        expect(response.headers.get('cache-control')).toBe('no-store');
        expect(fakeMcpFetchHandler).toHaveBeenCalledTimes(1);
    });

    it.each(['PUT', 'PATCH', 'DELETE'])('rejects %s without opening MCP', async (method) => {
        const response = await mcp(mcpJsonRpcRequest({ jsonrpc: '2.0', id: 1, method: 'tools/list' }, { method }));

        expect(response.status).toBe(405);
        expect(response.headers.get('cache-control')).toBe('no-store');
        expect(fakeMcpFetchHandler).not.toHaveBeenCalled();
    });

    it('rejects an MCP body over 64 KB before opening the MCP server', async () => {
        const response = await mcp(
            mcpJsonRpcRequest({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { value: 'x'.repeat(65 * 1024) } })
        );

        expect(response.status).toBe(413);
        expect(response.headers.get('cache-control')).toBe('no-store');
        expect(fakeMcpFetchHandler).not.toHaveBeenCalled();
    });

    it('adds no-store to an MCP handler response', async () => {
        const response = await mcp(mcpJsonRpcRequest({ jsonrpc: '2.0', id: 2, method: 'resources/list' }));

        expect(response.headers.get('cache-control')).toBe('no-store');
    });

    it('keeps MCP boundary state scoped to a request', () => {
        const first = createFakeMcpState();
        const second = createFakeMcpState();

        first.openedUrls.push('https://one.example/api/mcp');
        expect(second.openedUrls).toEqual([]);
        expect(first.closeCalls).toBe(0);
    });
});
