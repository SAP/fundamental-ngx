import { createMcpFetchHandler } from '@fundamental-ngx/mcp-server/web';

export const runtime = 'nodejs';
export const maxDuration = 30;

const handler = createMcpFetchHandler();

export function POST(req: Request): Promise<Response> {
    return handler(req);
}

export function GET(req: Request): Promise<Response> {
    return handler(req);
}
