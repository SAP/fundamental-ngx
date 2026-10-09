export const FIXTURE_API_KEY = 'fixture-key-never-use';
export const CHAT_ORIGIN = 'https://preview.example.test';
export const FIXTURE_DOCS_URL = 'https://sap.github.io/fundamental-ngx/#/core/dialog';
export const DEPLOYED_ATTACHMENT_LIMIT_BYTES = 256 * 1024;
export const LOCAL_ATTACHMENT_LIMIT_BYTES = 5 * 1024 * 1024;
export const DEPLOYED_CHAT_BODY_LIMIT_BYTES = 512 * 1024;
export const LOCAL_CHAT_BODY_LIMIT_BYTES = 8 * 1024 * 1024;

export type TestAttachment = {
    name: string;
    mediaType: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif' | 'application/pdf';
    dataUrl: string;
};

const FILE_SIGNATURES: Record<TestAttachment['mediaType'], number[]> = {
    'image/png': [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    'image/jpeg': [0xff, 0xd8, 0xff, 0xe0],
    'image/webp': [0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50],
    'image/gif': [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    'application/pdf': [0x25, 0x50, 0x44, 0x46, 0x2d]
};

export function fakeAttachment(
    mediaType: TestAttachment['mediaType'] = 'image/png',
    byteLength = FILE_SIGNATURES[mediaType].length,
    name = defaultAttachmentName(mediaType)
): TestAttachment {
    const signature = FILE_SIGNATURES[mediaType];
    const bytes = new Uint8Array(Math.max(byteLength, signature.length));
    bytes.set(signature);
    return { name, mediaType, dataUrl: `data:${mediaType};base64,${Buffer.from(bytes).toString('base64')}` };
}

export function replaceAttachmentDataUrl(attachment: TestAttachment, dataUrl: string): TestAttachment {
    return { ...attachment, dataUrl };
}

export function bodyByteLength(body: unknown): number {
    return new TextEncoder().encode(JSON.stringify(body)).byteLength;
}

export function bodyWithExactJsonBytes(
    targetBytes: number,
    attachment?: TestAttachment
): {
    messages: Array<{ role: 'user'; content: string; attachments?: TestAttachment[] }>;
} {
    const attachments = attachment ? [attachment] : undefined;
    const base = { messages: [{ role: 'user' as const, content: '', ...(attachments ? { attachments } : {}) }] };
    const baseLength = bodyByteLength(base);
    if (targetBytes < baseLength) {
        throw new Error('Fixture target must be larger than its JSON envelope');
    }
    const content = 'q'.repeat(targetBytes - baseLength);
    const body = { messages: [{ role: 'user' as const, content, ...(attachments ? { attachments } : {}) }] };
    if (bodyByteLength(body) !== targetBytes) {
        throw new Error(`Fixture JSON size mismatch: expected ${targetBytes}, got ${bodyByteLength(body)}`);
    }
    return body;
}

function defaultAttachmentName(mediaType: TestAttachment['mediaType']): string {
    return mediaType === 'application/pdf' ? 'guide.pdf' : `guide.${mediaType.slice('image/'.length)}`;
}

export const APPROVED_READ_ONLY_TOOLS = [
    'search_components',
    'get_component_api',
    'get_component_examples',
    'get_usage_guide',
    'compare_components',
    'get_setup_guide',
    'list_components'
] as const;

export type FakeMcpState = {
    openedUrls: string[];
    closeCalls: number;
    toolNames: string[];
    calls: Array<{ name: string; args: unknown }>;
    operationSignals: AbortSignal[];
    initializationSignals: AbortSignal[];
    blockTools: boolean;
    failTools: boolean;
    failCreate: boolean;
};

export type FakeGeminiState = {
    keys: string[];
    prompts: string[];
    options: unknown[];
    calls: number;
    blockStream: boolean;
    emptyStream: boolean;
    streamErrorAfterStart: boolean;
    abortSignals: AbortSignal[];
};

export function createFakeMcpState(toolNames = [...APPROVED_READ_ONLY_TOOLS]): FakeMcpState {
    return {
        openedUrls: [],
        closeCalls: 0,
        toolNames,
        calls: [],
        operationSignals: [],
        initializationSignals: [],
        blockTools: false,
        failTools: false,
        failCreate: false
    };
}

export function createFakeGeminiState(): FakeGeminiState {
    return {
        keys: [],
        prompts: [],
        options: [],
        calls: 0,
        blockStream: false,
        emptyStream: false,
        streamErrorAfterStart: false,
        abortSignals: []
    };
}

export const sharedMcpState = createFakeMcpState();
export const sharedGeminiState = createFakeGeminiState();

export function jsonRequest(url: string, body: unknown, init: RequestInit = {}): Request {
    const method = init.method ?? 'POST';
    return new Request(url, {
        ...init,
        method,
        headers: { 'content-type': 'application/json', ...init.headers },
        body: method === 'GET' || method === 'HEAD' ? undefined : JSON.stringify(body)
    });
}

export function mcpJsonRpcRequest(body: unknown, init: RequestInit = {}): Request {
    return jsonRequest(CHAT_ORIGIN + '/api/mcp', body, {
        ...init,
        headers: { accept: 'application/json, text/event-stream', ...init.headers }
    });
}

export async function responseEvents(response: Response): Promise<Record<string, unknown>[]> {
    const lines = (await response.text()).split(/\r?\n/).filter(Boolean);
    return lines.map((line) => JSON.parse(line) as Record<string, unknown>);
}

export const fakeMcpFetchHandler = jest.fn(
    async () =>
        new Response(JSON.stringify({ jsonrpc: '2.0', id: 1, result: { tools: [] } }), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        })
);
