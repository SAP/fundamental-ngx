export const JSON_HEADERS = {
    'cache-control': 'no-store',
    'content-type': 'application/json; charset=utf-8',
    'x-content-type-options': 'nosniff'
} as const;

export const STREAM_HEADERS = {
    'cache-control': 'no-store, no-transform',
    'content-type': 'application/x-ndjson; charset=utf-8',
    'x-content-type-options': 'nosniff'
} as const;

export function jsonError(status: number, message: string, extraHeaders: HeadersInit = {}): Response {
    return new Response(JSON.stringify({ error: message }), {
        status,
        headers: { ...JSON_HEADERS, ...extraHeaders }
    });
}

export async function readLimitedBody(request: Request, maximumBytes: number): Promise<Uint8Array | null> {
    const declaredLength = request.headers.get('content-length');
    if (declaredLength !== null) {
        const bytes = Number(declaredLength);
        if (Number.isFinite(bytes) && bytes > maximumBytes) {
            return null;
        }
    }

    const body = new Uint8Array(await request.arrayBuffer());
    return body.byteLength <= maximumBytes ? body : null;
}

export function isJsonRequest(request: Request): boolean {
    return request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() === 'application/json';
}
