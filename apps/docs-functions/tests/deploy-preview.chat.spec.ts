import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PREVIEW_ENV = 'DEPLOY_PREVIEW_URL';
const MAX_CATALOG_BYTES = 50 * 1024 * 1024;
const MAX_CHAT_RESPONSE_BYTES = 20 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 55_000;
const API_KEY_HEADER = 'x-gemini-api-key';

const previewUrl = process.env[PREVIEW_ENV]?.trim();
const previewBaseUrl = previewUrl ? parsePreviewUrl(previewUrl) : undefined;
const testKey = process.env.TEST_GEMINI_API_KEY?.trim();
const previewDescribe = previewBaseUrl ? describe : describe.skip;
const smokeIt = previewBaseUrl && testKey ? it : it.skip;
const rateLimitDescribe = isDisposablePreview(previewBaseUrl) ? describe : describe.skip;

if (!previewBaseUrl) {
    console.warn('[deploy-preview.chat] skipped: ' + PREVIEW_ENV + ' is not set');
} else if (!testKey) {
    console.warn(
        '[deploy-preview.chat] real chat smoke skipped: TEST_GEMINI_API_KEY is not set (value not needed for MCP)'
    );
} else if (process.env.TEST_RATE_LIMITS === '1' && !isDisposablePreview(previewBaseUrl)) {
    console.warn('[deploy-preview.chat] rate-limit check skipped: target is not a disposable Netlify Deploy Preview');
}

type EvaluationFixture = {
    version: string;
    questions: Array<{ id: string; prompt: string }>;
    rubric: { minimumScore: number; demoQuestionIds: string[]; dimensions: string[] };
};

const evaluation = JSON.parse(
    readFileSync(resolve(__dirname, 'fixtures/chat-evaluation.json'), 'utf8')
) as EvaluationFixture;

previewDescribe('/api/chat deployed contract', () => {
    it('rejects missing credentials without exposing provider details', async () => {
        const response = await requestChat({ messages: [{ role: 'user', content: 'How do I use fd-dialog?' }] });

        assertStatus(response, 401, '/api/chat');
        expect(response.headers.get('content-type')).toContain('application/json');
        expect(response.headers.get('cache-control')).toBe('no-store');
        expect(response.body).not.toMatch(/authorization|provider|stack|AIza/i);
    });

    smokeIt('streams the NDJSON contract with text before done', async () => {
        const response = await requestChat(
            { messages: [{ role: 'user', content: 'How do I use fd-dialog?' }] },
            { [API_KEY_HEADER]: testKey as string }
        );

        assertStatus(response, 200, '/api/chat');
        expect(response.headers.get('content-type')).toBe('application/x-ndjson; charset=utf-8');
        expect(response.headers.get('cache-control')).toBe('no-store, no-transform');
        expect(response.headers.get('x-content-type-options')).toBe('nosniff');
        expect(response.body).not.toContain(testKey as string);

        const events = parseNdjson(response.body, '/api/chat');
        const types = events.map((event) => event.type);
        const doneIndex = types.lastIndexOf('done');
        const textIndex = types.indexOf('text-delta');

        expect(types[0]).toBe('meta');
        expect(types).toContain('status');
        expect(textIndex).toBeGreaterThan(types.indexOf('status'));
        expect(textIndex).toBeGreaterThanOrEqual(0);
        expect(doneIndex).toBe(types.length - 1);
        expect(textIndex).toBeLessThan(doneIndex);
        expect(types).toContain('sources');
        expect(types).not.toContain('error');

        const meta = events.find((event) => event.type === 'meta');
        expect(meta?.catalogVersion).toEqual(expect.any(String));
        expect((meta?.catalogVersion as string).length).toBeGreaterThan(0);

        const text = events
            .filter((event) => event.type === 'text-delta')
            .map((event) => event.text)
            .join('');
        expect(text.length).toBeGreaterThan(0);

        const sources = events.find((event) => event.type === 'sources');
        expect(Array.isArray(sources?.items)).toBe(true);
        expect((sources?.items as unknown[]).length).toBeLessThanOrEqual(5);

        expect(meta?.catalogVersion).toBe(await getCatalogVersion());
    });
});

rateLimitDescribe('/api/chat optional rate-limit contract', () => {
    const rateLimitIt = process.env.TEST_RATE_LIMITS === '1' ? it : it.skip;

    rateLimitIt('returns 429 after the disposable preview chat budget is exceeded', async () => {
        const statuses: number[] = [];
        for (let attempt = 0; attempt < 20 && !statuses.includes(429); attempt++) {
            const response = await requestChat({
                messages: [{ role: 'user', content: 'This request intentionally omits credentials.' }]
            });
            statuses.push(response.status);
        }
        expect(statuses).toContain(429);
    });
});

describe('versioned chat evaluation fixture', () => {
    it('contains 20 questions and the documented grounding rubric', () => {
        expect(Number(evaluation.version.slice(0, 4))).toBeGreaterThanOrEqual(2000);
        expect(evaluation.questions).toHaveLength(20);
        expect(new Set(evaluation.questions.map((question) => question.id)).size).toBe(20);
        expect(evaluation.rubric.minimumScore).toBeGreaterThanOrEqual(15);
        expect(evaluation.rubric.demoQuestionIds).toHaveLength(5);
        expect(evaluation.rubric.dimensions).toEqual(
            expect.arrayContaining(['component', 'selector', 'importPath', 'api', 'deprecation', 'exampleEvidence'])
        );
    });
});

async function requestChat(
    body: unknown,
    headers: HeadersInit = {}
): Promise<{ status: number; headers: Headers; body: string }> {
    if (!previewBaseUrl) {
        throw new Error('[owner=SENTINEL] endpoint=/api/chat expected configured Deploy Preview URL');
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const response = await fetch(new URL('/api/chat', previewBaseUrl).toString(), {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...headers },
            body: JSON.stringify(body),
            signal: controller.signal
        });
        const text = await readBody(response, MAX_CHAT_RESPONSE_BYTES, '/api/chat');
        return { status: response.status, headers: response.headers, body: text };
    } catch (error) {
        if (error instanceof Error && error.message.startsWith('[owner=')) {
            throw error;
        }
        throw contractFailure(
            '/api/chat',
            'reachable endpoint',
            error instanceof Error ? error.message : 'request failed'
        );
    } finally {
        clearTimeout(timeout);
    }
}

async function getCatalogVersion(): Promise<string> {
    if (!previewBaseUrl) {
        throw new Error('[owner=SENTINEL] endpoint=/components.json expected configured Deploy Preview URL');
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
        const response = await fetch(new URL('/components.json', previewBaseUrl).toString(), {
            signal: controller.signal
        });
        const body = await readBody(response, MAX_CATALOG_BYTES, '/components.json');
        if (response.status !== 200) {
            throw contractFailure('/components.json', 'HTTP 200', 'HTTP ' + response.status, body);
        }
        const value = JSON.parse(body) as { version?: unknown };
        if (typeof value.version !== 'string' || value.version.length === 0) {
            throw contractFailure('/components.json', 'non-empty version', 'missing version', body);
        }
        return value.version;
    } catch (error) {
        if (error instanceof Error && error.message.startsWith('[owner=')) {
            throw error;
        }
        throw contractFailure(
            '/components.json',
            'catalog JSON',
            error instanceof Error ? error.message : 'invalid JSON'
        );
    } finally {
        clearTimeout(timeout);
    }
}

function parseNdjson(body: string, endpoint: string): Array<Record<string, unknown>> {
    const events: Array<Record<string, unknown>> = [];
    for (const line of body.split(String.fromCharCode(10)).filter(Boolean)) {
        try {
            const event = JSON.parse(line) as Record<string, unknown>;
            if (
                !event.type ||
                !['meta', 'status', 'text-delta', 'sources', 'error', 'done'].includes(String(event.type))
            ) {
                throw new Error('unknown event type');
            }
            events.push(event);
        } catch {
            throw contractFailure(endpoint, 'valid NDJSON event', 'invalid event', line);
        }
    }
    return events;
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

function assertStatus(response: { status: number; body: string }, expected: number, endpoint: string): void {
    if (response.status !== expected) {
        throw contractFailure(endpoint, 'HTTP ' + expected, 'HTTP ' + response.status, response.body);
    }
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
    if (testKey) {
        excerpt = excerpt.split(testKey).join('[redacted]');
    }
    return excerpt.replace(new RegExp('AIza[0-9A-Za-z_-]{20,}', 'g'), '[redacted-key]');
}
