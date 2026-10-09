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

    if (!request.body) {
        return new Uint8Array();
    }

    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let byteLength = 0;

    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            if (!value) {
                continue;
            }

            byteLength += value.byteLength;
            if (byteLength > maximumBytes) {
                void reader.cancel().catch(() => undefined);
                return null;
            }
            chunks.push(value);
        }
    } finally {
        reader.releaseLock();
    }

    const body = new Uint8Array(byteLength);
    let offset = 0;
    for (const chunk of chunks) {
        body.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return body;
}

export function isJsonRequest(request: Request): boolean {
    return request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase() === 'application/json';
}
