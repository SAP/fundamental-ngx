import { createMcpFetchHandler } from '@fundamental-ngx/mcp-server/web';

export const runtime = 'nodejs';
export const maxDuration = 30;

/** CORS headers for local development */
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

const handler = createMcpFetchHandler();

export function OPTIONS(): Response {
    return new Response(null, {
        status: 204,
        headers: corsHeaders
    });
}

export async function POST(req: Request): Promise<Response> {
    const response = await handler(req);
    // Add CORS headers to the response
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });
    return response;
}

export async function GET(req: Request): Promise<Response> {
    const response = await handler(req);
    // Add CORS headers to the response
    Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
    });
    return response;
}
