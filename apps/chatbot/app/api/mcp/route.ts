import { createMcpFetchHandler } from '@fundamental-ngx/mcp-server/web';
import { corsHeaders, preflight } from '../../../lib/cors';

export const runtime = 'nodejs';
export const maxDuration = 30;

const handler = createMcpFetchHandler();

/** Copies the request's allowed CORS headers onto a handler response. */
function withCors(req: Request, response: Response): Response {
    for (const [key, value] of Object.entries(corsHeaders(req))) {
        response.headers.set(key, value);
    }
    return response;
}

export function OPTIONS(req: Request): Response {
    return preflight(req);
}

export async function POST(req: Request): Promise<Response> {
    return withCors(req, await handler(req));
}

export async function GET(req: Request): Promise<Response> {
    return withCors(req, await handler(req));
}
