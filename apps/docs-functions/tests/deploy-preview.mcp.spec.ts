const PREVIEW_ENV = 'DEPLOY_PREVIEW_URL';
const MAX_TOOL_RESPONSE_BYTES = 64 * 1024;
const MAX_CATALOG_BYTES = 50 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 20_000;

const previewUrl = process.env[PREVIEW_ENV]?.trim();
const previewBaseUrl = previewUrl ? parsePreviewUrl(previewUrl) : undefined;
const previewDescribe = previewBaseUrl ? describe : describe.skip;
const rateLimitDescribe = isDisposablePreview(previewBaseUrl) ? describe : describe.skip;

if (!previewBaseUrl) {
    console.warn('[deploy-preview.mcp] skipped: ' + PREVIEW_ENV + ' is not set');
} else if (process.env.TEST_RATE_LIMITS === '1' && !isDisposablePreview(previewBaseUrl)) {
    console.warn('[deploy-preview.mcp] rate-limit check skipped: target is not a disposable Netlify Deploy Preview');
}

type HttpResult = { status: number; headers: Headers; body: string };
type JsonRpcPayload = { result?: unknown; error?: { message?: string } };

let requestId = 0;
let catalogPromise: Promise<{ version: string; components: unknown[] }> | undefined;

previewDescribe('/api/mcp deployed contract', () => {
    beforeEach(() => {
        requestId += 1;
    });

    it('serves a non-empty catalog with a deployed source version', async () => {
        const result = await getCatalog();
        expect(result.version).toEqual(expect.any(String));
        expect(result.version.length).toBeGreaterThan(0);
        expect(result.components.length).toBeGreaterThan(0);
    });

    it('advertises the expected bounded read-only tools', async () => {
        const result = (await callMcp('tools/list', {})).result as { tools?: Array<{ name?: string }> };
        const names = result.tools?.map((tool) => tool.name).filter((name): name is string => Boolean(name)) ?? [];
        expect(names).toEqual(
            expect.arrayContaining([
                'search_components',
                'get_component_api',
                'get_component_examples',
                'get_usage_guide',
                'compare_components',
                'get_setup_guide',
                'list_components'
            ])
        );
    });

    it('returns real bounded data for dialog search and its usage guide', async () => {
        const search = parseToolJson(
            (await callMcp('tools/call', { name: 'search_components', arguments: { query: 'dialog' } })).result,
            '/api/mcp'
        );
        const searchResults = Array.isArray(search.results) ? search.results : [];
        expect(searchResults.length).toBeGreaterThan(0);
        expect(searchResults.length).toBeLessThanOrEqual(8);
        expect(searchResults.some((item) => /dialog/i.test(JSON.stringify(item)))).toBe(true);

        const guide = parseToolJson(
            (await callMcp('tools/call', { name: 'get_usage_guide', arguments: { name: 'dialog' } })).result,
            '/api/mcp'
        );
        expect(JSON.stringify(guide)).toMatch(/dialog/i);
        expect(guide).not.toHaveProperty('error');
    });

    it('does not advertise the full catalog resource over HTTP', async () => {
        const result = (await callMcp('resources/list', {})).result as { resources?: Array<{ name?: string }> };
        const names = result.resources?.map((resource) => resource.name) ?? [];
        expect(names).not.toContain('component-catalog');
    });
});

rateLimitDescribe('/api/mcp optional rate-limit contract', () => {
    const rateLimitIt = process.env.TEST_RATE_LIMITS === '1' ? it : it.skip;

    rateLimitIt('returns 429 after the disposable preview MCP budget is exceeded', async () => {
        const statuses: number[] = [];
        for (let attempt = 0; attempt < 70 && !statuses.includes(429); attempt++) {
            const response = await requestPreview(
                '/api/mcp',
                {
                    method: 'POST',
                    headers: mcpHeaders(),
                    body: JSON.stringify({ jsonrpc: '2.0', id: attempt + 1, method: 'tools/list', params: {} })
                },
                MAX_TOOL_RESPONSE_BYTES
            );
            statuses.push(response.status);
        }
        expect(statuses).toContain(429);
    });
});

async function getCatalog(): Promise<{ version: string; components: unknown[] }> {
    if (!catalogPromise) {
        catalogPromise = (async () => {
            const response = await requestPreview('/components.json', undefined, MAX_CATALOG_BYTES);
            assertStatus(response, 200, '/components.json');
            expect(response.body.trim().length).toBeGreaterThan(0);
            let value: unknown;
            try {
                value = JSON.parse(response.body);
            } catch {
                throw contractFailure('/components.json', 'valid JSON', 'invalid JSON', response.body);
            }
            if (!isRecord(value) || typeof value.version !== 'string' || !Array.isArray(value.components)) {
                throw contractFailure(
                    '/components.json',
                    'version and components',
                    'invalid catalog shape',
                    response.body
                );
            }
            return { version: value.version, components: value.components };
        })();
    }
    return catalogPromise;
}

async function callMcp(method: string, params: unknown): Promise<JsonRpcPayload> {
    const response = await requestPreview(
        '/api/mcp',
        {
            method: 'POST',
            headers: mcpHeaders(),
            body: JSON.stringify({ jsonrpc: '2.0', id: requestId, method, params })
        },
        MAX_TOOL_RESPONSE_BYTES
    );
    assertStatus(response, 200, '/api/mcp');
    let payload: JsonRpcPayload;
    try {
        payload = parseMcpPayload(response.body);
    } catch {
        throw contractFailure('/api/mcp', 'valid JSON-RPC response', 'invalid response', response.body);
    }
    if (payload.error) {
        throw contractFailure('/api/mcp', 'successful JSON-RPC result', payload.error.message ?? 'JSON-RPC error');
    }
    return payload;
}

function parseToolJson(result: unknown, endpoint: string): Record<string, unknown> {
    if (!isRecord(result) || !Array.isArray(result.content)) {
        throw contractFailure(endpoint, 'tool content', 'missing tool content', JSON.stringify(result));
    }
    const text = result.content.find(
        (item): item is { type: 'text'; text: string } =>
            isRecord(item) && item.type === 'text' && typeof item.text === 'string'
    )?.text;
    if (!text) {
        throw contractFailure(endpoint, 'text tool content', 'missing text content', JSON.stringify(result));
    }
    try {
        return JSON.parse(text) as Record<string, unknown>;
    } catch {
        throw contractFailure(endpoint, 'JSON tool content', 'invalid tool JSON', text);
    }
}

function parseMcpPayload(body: string): JsonRpcPayload {
    const trimmed = body.trim();
    if (trimmed.startsWith('{')) {
        return JSON.parse(trimmed) as JsonRpcPayload;
    }
    const dataLine = trimmed
        .split(String.fromCharCode(10))
        .find((line) => line.startsWith('data:'))
        ?.slice('data:'.length)
        .trim();
    if (!dataLine) {
        throw new Error('Missing MCP response data');
    }
    return JSON.parse(dataLine) as JsonRpcPayload;
}

async function requestPreview(path: string, init: RequestInit | undefined, maximumBytes: number): Promise<HttpResult> {
    if (!previewBaseUrl) {
        throw new Error('[owner=SENTINEL] endpoint=' + path + ' expected configured Deploy Preview URL');
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const response = await fetch(new URL(path, previewBaseUrl).toString(), { ...init, signal: controller.signal });
        const body = await readBody(response, maximumBytes, path);
        return { status: response.status, headers: response.headers, body };
    } catch (error) {
        if (error instanceof Error && error.message.startsWith('[owner=')) {
            throw error;
        }
        throw contractFailure(path, 'reachable endpoint', error instanceof Error ? error.message : 'request failed');
    } finally {
        clearTimeout(timeout);
    }
}

async function readBody(response: Response, maximumBytes: number, endpoint: string): Promise<string> {
    if (!response.body) {
        const body = await response.text();
        if (new TextEncoder().encode(body).byteLength > maximumBytes) {
            throw contractFailure(endpoint, 'response <= ' + maximumBytes + ' bytes', 'oversized response');
        }
        return body;
    }
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        size += value.byteLength;
        if (size > maximumBytes) {
            await reader.cancel();
            throw contractFailure(endpoint, 'response <= ' + maximumBytes + ' bytes', 'oversized response');
        }
        chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return new TextDecoder().decode(bytes);
}

function assertStatus(response: HttpResult, expected: number, endpoint: string): void {
    if (response.status !== expected) {
        throw contractFailure(endpoint, 'HTTP ' + expected, 'HTTP ' + response.status, response.body);
    }
}

function mcpHeaders(): HeadersInit {
    return { accept: 'application/json, text/event-stream', 'content-type': 'application/json' };
}

function parsePreviewUrl(value: string): string {
    let url: URL;
    try {
        url = new URL(value);
    } catch {
        throw new Error('[owner=SENTINEL] endpoint=' + PREVIEW_ENV + ' expected an absolute http(s) URL');
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        throw new Error('[owner=SENTINEL] endpoint=' + PREVIEW_ENV + ' expected an http(s) URL');
    }
    return url.origin;
}

function isDisposablePreview(value: string | undefined): boolean {
    if (!value || process.env.TEST_RATE_LIMITS !== '1') {
        return false;
    }
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.netlify.app') && url.hostname.includes('--');
}

function contractFailure(endpoint: string, expected: string, actual: string, excerpt = ''): Error {
    return new Error(
        '[owner=SENTINEL] endpoint=' +
            endpoint +
            ' expected=' +
            expected +
            ' actual=' +
            actual +
            ' excerpt=' +
            sanitizeExcerpt(excerpt)
    );
}

function sanitizeExcerpt(value: string): string {
    let excerpt = value.replaceAll(String.fromCharCode(13), ' ').replaceAll(String.fromCharCode(10), ' ').slice(0, 400);
    const testKey = process.env.TEST_GEMINI_API_KEY?.trim();
    if (testKey) {
        excerpt = excerpt.split(testKey).join('[redacted]');
    }
    return excerpt.replace(new RegExp('AIza[0-9A-Za-z_-]{20,}', 'g'), '[redacted-key]');
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
