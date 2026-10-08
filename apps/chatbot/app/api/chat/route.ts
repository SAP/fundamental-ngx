import { createMCPClient } from '@ai-sdk/mcp';
import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from 'ai';
import { corsHeaders, preflight } from '../../../lib/cors';
import { FILE_CAPABLE_PROVIDERS, activeProvider, chatModel } from '../../../lib/model';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are the Fundamental NGX assistant. Fundamental NGX is an
Angular component library. ALWAYS answer using the provided MCP tools
(search_components, get_component_api, get_component_examples, get_usage_guide,
compare_components, get_setup_guide, list_components) rather than prior knowledge,
because the library changes frequently. Cite the component selector (e.g. fd-dialog)
and show minimal, correct Angular usage. If a tool returns nothing, say so plainly.`;

function mcpUrl(): string {
    return process.env.MCP_SERVER_URL ?? 'http://localhost:3000/api/mcp';
}

/**
 * Tool-call logging gate — mirrors the MCP server's `MCP_LOG_TOOLS` switch so the
 * two layers turn on and off together. On by default in development, off in
 * production unless explicitly enabled, so a deployed build stays quiet until you
 * opt in to debug (set `MCP_LOG_TOOLS=1` in the host's env vars). These lines
 * carry tool names, arguments, and short result previews — never secrets or keys.
 */
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

/** How many trailing messages of the (text + file) history to keep per request. */
const MAX_HISTORY_MESSAGES = 8;

/**
 * Shrink the conversation before it goes to the model to keep each request small.
 *
 * `useChat` accumulates the full conversation client-side and resends it every
 * turn — including the MCP tool-call/tool-result parts, whose JSON (a single
 * `get_component_api` dump is thousands of tokens) is by far the bulk. We keep the
 * conversational thread the model actually needs for context — every user question,
 * the assistant's *text* answers, and any *file* parts the user attached — but drop
 * the raw tool parts from the history. If the model needs that data again it
 * re-calls the tool for the current turn (a fresh, small result). A sliding window
 * then bounds very long chats.
 *
 * File parts are kept because the client only sends them on the newest user message
 * (see chat.service.ts), so history stays cheap while the current turn's attachment
 * survives into the model request.
 *
 * This mattered most on Groq's 8K free-tier TPM cap (a single turn could blow past
 * it); it's a no-op cost on roomier providers like Gemini but kept as a cheap,
 * provider-agnostic safeguard.
 */
export function trimHistoryForBudget(messages: UIMessage[]): UIMessage[] {
    return messages
        .map((m) => ({ ...m, parts: m.parts.filter((p) => p.type === 'text' || p.type === 'file') }))
        .filter((m) => m.parts.length > 0)
        .slice(-MAX_HISTORY_MESSAGES);
}

/** Opens an MCP client against the HTTP endpoint and returns its tool set + a closer. */
export async function loadMcpTools(url = mcpUrl()): Promise<{
    tools: Awaited<ReturnType<Awaited<ReturnType<typeof createMCPClient>>['tools']>>;
    close: () => Promise<void>;
}> {
    const client = await createMCPClient({ transport: { type: 'http', url } });
    const tools = await client.tools();
    return { tools, close: () => client.close() };
}

export function OPTIONS(req: Request): Response {
    return preflight(req);
}

export async function POST(req: Request): Promise<Response> {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // Fail fast if the user attached files but the configured model can't read them
    // (e.g. Groq's text-only qwen fallback). Done before opening the MCP client so a
    // doomed request spends no tool/network work; the message surfaces in the widget.
    const hasFileParts = messages.some((m) => m.parts?.some((p) => p.type === 'file'));
    if (hasFileParts) {
        const provider = activeProvider();
        if (provider && !FILE_CAPABLE_PROVIDERS.has(provider)) {
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

    const endpoint = mcpUrl();
    const { tools, close } = await loadMcpTools(endpoint);
    logChat(`[api/chat] MCP endpoint ${endpoint} → loaded tools: ${Object.keys(tools).join(', ') || '(none)'}`);

    const modelMessages = await convertToModelMessages(trimHistoryForBudget(messages));

    let toolCallCount = 0;

    const result = streamText({
        model: chatModel(),
        system: SYSTEM_PROMPT,
        messages: modelMessages,
        tools,
        // Disable eager tool-input streaming: the SDK otherwise stamps
        // `eager_input_streaming: true` on every tool, which older Anthropic API
        // versions behind a proxy reject ("Extra inputs are not permitted").
        providerOptions: { anthropic: { toolStreaming: false } },
        stopWhen: stepCountIs(6),
        // Per-step trace: which MCP tools the model called this step, with args,
        // and the results that came back. Zero tool calls across a whole turn
        // means the model answered from memory — i.e. it did NOT use the MCP.
        onStepEnd: (step) => {
            for (const call of step.toolCalls) {
                toolCallCount++;
                logChat(`[api/chat] tool call → ${call.toolName} ${JSON.stringify(call.input)}`);
            }
            for (const toolResult of step.toolResults) {
                const preview = JSON.stringify(toolResult.output).slice(0, 300);
                logChat(`[api/chat] tool result ← ${toolResult.toolName}: ${preview}`);
            }
        },
        onFinish: () => {
            logChat(
                toolCallCount > 0
                    ? `[api/chat] turn finished — ${toolCallCount} MCP tool call(s) used.`
                    : `[api/chat] turn finished — NO MCP tool calls (answered from the model's own knowledge).`
            );
            void close();
        },
        onError: (event) => {
            console.error('[api/chat] streamText error:', event.error);
            void close();
        }
    });

    // Forward the real error text to the client instead of the SDK's masked
    // "An error occurred." so failures are visible during local dev.
    return result.toUIMessageStreamResponse({
        onError: (error) => (error instanceof Error ? error.message : String(error)),
        headers: corsHeaders(req)
    });
}
