/**
 * Stateless Fetch-API handler for the fundamental-ngx MCP server.
 *
 * Rationale: serverless runtimes (Vercel Edge, Cloudflare Workers, Next.js
 * API routes) cannot share long-lived in-process state across invocations.
 * Each request therefore gets a brand-new McpServer + transport pair:
 * - No session ID is generated (sessionIdGenerator: undefined → stateless mode)
 * - enableJsonResponse: true makes POST requests return a buffered JSON body
 *   rather than an SSE stream, which is safe for request/response HTTP contexts
 * - The server and transport are closed after the response body is fully
 *   delivered (JSON: eagerly after handleRequest; SSE: the transport closes
 *   itself when the stream ends, so we do not intervene)
 */
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';

import catalogData from './data/components.json';
import { createServer, normalizeCatalog } from './server';
import type { ComponentCatalog } from './types/component-metadata';

const catalog = normalizeCatalog(catalogData as unknown as ComponentCatalog);

/**
 * Creates a Fetch-API-compatible MCP handler.
 *
 * @returns An async function `(req: Request) => Promise<Response>` suitable for
 *          mounting as a Next.js API route, Hono handler, or any Web-Standard
 *          HTTP entrypoint.
 */
export function createMcpFetchHandler(): (req: Request) => Promise<Response> {
    return async (req: Request): Promise<Response> => {
        const server = createServer(catalog, { includeCatalogResource: false });
        const transport = new WebStandardStreamableHTTPServerTransport({
            sessionIdGenerator: undefined, // stateless — no session tracking
            enableJsonResponse: true // buffered JSON instead of SSE for POST requests
        });

        await server.connect(transport);

        let res: Response;
        try {
            res = await transport.handleRequest(req);
        } catch (err) {
            // handleRequest threw before producing a response — clean up and
            // propagate so the caller can return a 500.
            await transport.close();
            await server.close();
            throw err;
        }

        // SSE streaming responses own their own lifecycle: the transport writes
        // to the ReadableStream controller and closes when done. Closing the
        // transport here would truncate the stream body while it is still in
        // flight. For JSON responses (Content-Type: application/json) the body
        // is already fully buffered, so we can close immediately.
        const isStreaming = (res.headers.get('content-type') ?? '').includes('text/event-stream');
        if (!isStreaming) {
            await transport.close();
            await server.close();
        }

        return res;
    };
}
