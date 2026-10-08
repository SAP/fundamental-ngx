import { isJsonRequest, jsonError, readLimitedBody } from './_shared/http';

const MAXIMUM_MCP_BODY_BYTES = 64 * 1024;
// eslint-disable-next-line @nx/enforce-module-boundaries -- This Function is the intentional HTTP adapter for the shared MCP server.
const { createMcpFetchHandler } = require('@fundamental-ngx/mcp-server/web') as {
    createMcpFetchHandler: () => (request: Request) => Promise<Response>;
};
const handler = createMcpFetchHandler();

export default async function mcp(request: Request): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'POST') {
        return jsonError(405, 'Method not allowed', { allow: 'GET, POST' });
    }

    if (request.method === 'POST') {
        if (!isJsonRequest(request)) {
            return jsonError(415, 'Content-Type must be application/json');
        }

        const body = await readLimitedBody(request.clone(), MAXIMUM_MCP_BODY_BYTES);
        if (body === null) {
            return jsonError(413, 'Request body is too large');
        }

        try {
            JSON.parse(new TextDecoder().decode(body));
        } catch {
            return jsonError(400, 'Request body must contain valid JSON');
        }
    }

    try {
        const response = await handler(request);
        const headers = new Headers(response.headers);
        headers.set('cache-control', 'no-store');
        headers.set('x-content-type-options', 'nosniff');
        return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    } catch {
        return jsonError(500, 'The MCP request could not be completed');
    }
}

export const config = {
    rateLimit: { windowSize: 60, windowLimit: 60, aggregateBy: ['ip', 'domain'] }
};
