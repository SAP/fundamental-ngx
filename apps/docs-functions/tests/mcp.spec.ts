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

    it('logs MCP request failures with one safe trace schema and no raw error or request data', async () => {
        const methods = ['debug', 'info', 'log', 'warn', 'error'] as const;
        const spies = methods.map((method) => jest.spyOn(console, method).mockImplementation(() => undefined));
        fakeMcpFetchHandler.mockRejectedValue(new Error('raw MCP payload and credential must stay internal'));

        try {
            const response = await mcp(
                mcpJsonRpcRequest({
                    jsonrpc: '2.0',
                    id: 4,
                    method: 'tools/call',
                    params: { query: 'fixture-sensitive-query' }
                })
            );

            expect(response.status).toBe(500);
            const calls = spies.flatMap((spy) => spy.mock.calls);
            expect(calls.length).toBeGreaterThan(0);
            const lines = calls.map((call) =>
                call.map((entry) => (typeof entry === 'string' ? entry : JSON.stringify(entry))).join(' ')
            );
            const traceIds = lines.map((line) => line.match(/traceId["']?\s*[:=]\s*["']?([0-9a-f]{8})/i)?.[1]);
            expect(new Set(traceIds).size).toBe(1);
            expect(traceIds[0]).toMatch(/^[0-9a-f]{8}$/);
            for (const line of lines) {
                expect(line).toMatch(/stage["']?\s*[:=]/i);
                expect(line).toMatch(/error(?:Type|Name)?["']?\s*[:=]/i);
                expect(line).toMatch(/duration(?:Ms)?["']?\s*[:=]/i);
                expect(line).toMatch(/outcome["']?\s*[:=]/i);
            }
            expect(JSON.stringify(calls)).not.toMatch(/raw MCP payload|fixture-sensitive-query|credential/i);
        } finally {
            spies.forEach((spy) => spy.mockRestore());
        }
    });

    it('keeps MCP boundary state scoped to a request', () => {
        const first = createFakeMcpState();
        const second = createFakeMcpState();

        first.openedUrls.push('https://one.example/api/mcp');
        expect(second.openedUrls).toEqual([]);
        expect(first.closeCalls).toBe(0);
    });

    it('catches MCP adapter initialization failure and returns the stable public 500', async () => {
        const methods = ['debug', 'info', 'log', 'warn', 'error'] as const;
        const spies = methods.map((method) => jest.spyOn(console, method).mockImplementation(() => undefined));
        jest.resetModules();
        jest.doMock(
            '@fundamental-ngx/mcp-server/web',
            () => {
                throw new Error('fixture adapter load path and filesystem details');
            },
            { virtual: true }
        );

        try {
            const loaded = await import('../src/mcp');
            const response = await loaded.default(
                mcpJsonRpcRequest({ jsonrpc: '2.0', id: 3, method: 'tools/list', params: {} })
            );

            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ error: 'The MCP request could not be completed' });
            const output = JSON.stringify(spies.flatMap((spy) => spy.mock.calls));
            expect(output).toMatch(/stage|adapter|load/i);
            expect(output).not.toContain('fixture adapter load path and filesystem details');
        } finally {
            spies.forEach((spy) => spy.mockRestore());
            jest.dontMock('@fundamental-ngx/mcp-server/web');
            jest.resetModules();
        }
    });
});
