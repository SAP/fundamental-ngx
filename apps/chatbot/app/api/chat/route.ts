import { convertToModelMessages, stepCountIs, streamText } from 'ai';
import { readAndValidateChatRequest } from '../../../lib/chat-request-validation';
import { loadMcpTools, trimHistoryForBudget } from '../../../lib/chat-route-helpers';
import { corsHeaders, preflight } from '../../../lib/cors';
import { FILE_CAPABLE_PROVIDERS, activeProvider, chatModel } from '../../../lib/model';

export const runtime = 'nodejs';
export const maxDuration = 60;

const PUBLIC_STREAM_ERROR = 'The assistant could not complete this request';
const SYSTEM_PROMPT = `You are the Fundamental NGX assistant. Fundamental NGX is an
Angular component library. ALWAYS answer using the provided MCP tools
(search_components, get_component_api, get_component_examples, get_usage_guide,
compare_components, get_setup_guide, list_components) rather than prior knowledge,
because the library changes frequently. Cite the component selector (e.g. fd-dialog)
and show minimal, correct Angular usage. If a tool returns nothing, say so plainly.`;

const LOG_TOOLS =
    process.env.MCP_LOG_TOOLS === '1' ||
    process.env.MCP_LOG_TOOLS === 'true' ||
    (process.env.MCP_LOG_TOOLS !== '0' &&
        process.env.MCP_LOG_TOOLS !== 'false' &&
        process.env.NODE_ENV !== 'production');

function logChat(message: string): void {
    if (LOG_TOOLS) {
        console.log(message);
    }
}

export function OPTIONS(req: Request): Response {
    return preflight(req);
}

export async function POST(req: Request): Promise<Response> {
    const startedAt = Date.now();
    const providerAbortController = new AbortController();
    let closeMcp: (() => Promise<void>) | undefined;
    let closePromise: Promise<void> | undefined;
    let cleanupRequested = false;
    let stage = 'request validation';
    let toolCallCount = 0;

    const cleanup = async (): Promise<void> => {
        cleanupRequested = true;
        req.signal.removeEventListener('abort', disconnect);
        if (!providerAbortController.signal.aborted) {
            providerAbortController.abort();
        }
        if (closeMcp) {
            const close = closeMcp;
            closePromise ??= Promise.resolve()
                .then(close)
                .catch((error: unknown) => {
                    logFailure('MCP cleanup', error, startedAt);
                });
            await closePromise;
        }
    };
    const disconnect = (): void => {
        void cleanup();
    };
    const registerMcpCleanup = (close: () => Promise<void>): void => {
        closeMcp = close;
        if (cleanupRequested) {
            void cleanup();
        }
    };

    req.signal.addEventListener('abort', disconnect, { once: true });

    try {
        const validation = await readAndValidateChatRequest(req);
        if (!validation.valid) {
            await cleanup();
            return errorResponse(validation.status, validation.message, req);
        }

        if (validation.hasFiles) {
            stage = 'provider selection';
            const provider = activeProvider();
            if (provider && !FILE_CAPABLE_PROVIDERS.has(provider)) {
                await cleanup();
                return Response.json(
                    {
                        error:
                            `The active model provider ("${provider}") can't read file attachments. ` +
                            `Remove the attachment, or configure a vision-capable provider ` +
                            `(Gemini or the Anthropic-compatible gateway).`
                    },
                    { status: 400, headers: corsHeaders(req) }
                );
            }
        }

        const endpoint = process.env.MCP_SERVER_URL ?? 'http://localhost:3000/api/mcp';
        const toolsStartedAt = Date.now();
        stage = 'MCP load';
        const { tools, close } = await loadMcpTools(endpoint);
        registerMcpCleanup(close);
        logChat(
            `[api/chat] tools durationMs=${Date.now() - toolsStartedAt} count=${Object.keys(tools).length} outcome=success`
        );

        stage = 'message conversion';
        const modelMessages = await convertToModelMessages(trimHistoryForBudget(validation.messages));

        stage = 'provider creation';
        const model = chatModel();

        stage = 'stream creation';
        const result = streamText({
            model,
            system: SYSTEM_PROMPT,
            messages: modelMessages,
            tools,
            abortSignal: providerAbortController.signal,
            providerOptions: { anthropic: { toolStreaming: false } },
            stopWhen: stepCountIs(6),
            onStepEnd: (step) => {
                const successfulTools = new Set(step.toolResults.map((toolResult) => toolResult.toolName));
                for (const call of step.toolCalls) {
                    toolCallCount++;
                    const duration =
                        step.performance?.toolExecutionMs?.[call.toolCallId] ?? Math.max(0, Date.now() - startedAt);
                    logChat(
                        `[api/chat] tool name=${safeIdentifier(call.toolName)} durationMs=${duration} ` +
                            `count=${toolCallCount} outcome=${successfulTools.has(call.toolName) ? 'success' : 'failure'}`
                    );
                }
            },
            onFinish: () => {
                logChat(
                    `[api/chat] turn durationMs=${Math.max(0, Date.now() - startedAt)} ` +
                        `count=${toolCallCount} outcome=success`
                );
                void cleanup();
            },
            onError: (event) => {
                logFailure('provider stream', event.error, startedAt);
                void cleanup();
            },
            onAbort: () => {
                void cleanup();
            }
        });

        stage = 'stream response';
        const response = result.toUIMessageStreamResponse({
            onError: () => PUBLIC_STREAM_ERROR,
            headers: corsHeaders(req)
        });
        return responseWithCleanup(response, cleanup, startedAt);
    } catch (error) {
        logFailure(stage, error, startedAt);
        await cleanup();
        return errorResponse(500, PUBLIC_STREAM_ERROR, req);
    }
}

function responseWithCleanup(response: Response, cleanup: () => Promise<void>, startedAt: number): Response {
    if (!response.body) {
        void cleanup();
        return response;
    }

    const reader = response.body.getReader();
    const body = new ReadableStream<Uint8Array>({
        async pull(controller) {
            try {
                const { done, value } = await reader.read();
                if (done) {
                    await cleanup();
                    controller.close();
                } else {
                    controller.enqueue(value);
                }
            } catch (error) {
                logFailure('response stream', error, startedAt);
                await cleanup();
                controller.error(new Error(PUBLIC_STREAM_ERROR));
            }
        },
        async cancel() {
            await cleanup();
            try {
                await reader.cancel();
            } catch (error) {
                logFailure('response cancellation', error, startedAt);
            }
        }
    });

    return new Response(body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
    });
}

function errorResponse(status: number, message: string, request: Request): Response {
    return Response.json({ error: message }, { status, headers: corsHeaders(request) });
}

function logFailure(stage: string, error: unknown, startedAt: number): void {
    console.error(
        `[api/chat] stage=${stage} errorType=${safeIdentifier(error instanceof Error ? error.name : typeof error)} ` +
            `durationMs=${Math.max(0, Date.now() - startedAt)} outcome=failure`
    );
}

function safeIdentifier(value: string): string {
    return value.replace(/[^A-Za-z0-9_.:-]/g, '_').slice(0, 64) || 'unknown';
}
