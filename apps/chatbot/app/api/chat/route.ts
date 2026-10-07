import { createMCPClient } from '@ai-sdk/mcp';
import { convertToModelMessages, stepCountIs, streamText, type UIMessage } from 'ai';
import { chatModel } from '../../../lib/model';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are the Fundamental NGX assistant. Fundamental NGX is an
Angular component library. ALWAYS answer using the provided MCP tools
(search_components, get_component_api, get_component_examples, get_usage_guide,
compare_components, get_setup_guide, list_components) rather than prior knowledge,
because the library changes frequently. Cite the component selector (e.g. fd-dialog)
and show minimal, correct Angular usage. If a tool returns nothing, say so plainly.`;

/** CORS headers for local development */
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

function mcpUrl(): string {
    return process.env.MCP_SERVER_URL ?? 'http://localhost:3000/api/mcp';
}

/** How many trailing messages of the (text-only) history to keep per request. */
const MAX_HISTORY_MESSAGES = 8;

/**
 * Shrink the conversation before it goes to the model to keep each request small.
 *
 * `useChat` accumulates the full conversation client-side and resends it every
 * turn — including the MCP tool-call/tool-result parts, whose JSON (a single
 * `get_component_api` dump is thousands of tokens) is by far the bulk. We keep the
 * conversational thread the model actually needs for context — every user question
 * and the assistant's *text* answers — but drop the raw tool parts from the
 * history. If the model needs that data again it re-calls the tool for the current
 * turn (a fresh, small result). A sliding window then bounds very long chats.
 *
 * This mattered most on Groq's 8K free-tier TPM cap (a single turn could blow past
 * it); it's a no-op cost on roomier providers like Gemini but kept as a cheap,
 * provider-agnostic safeguard.
 */
export function trimHistoryForBudget(messages: UIMessage[]): UIMessage[] {
    return messages
        .map((m) => ({ ...m, parts: m.parts.filter((p) => p.type === 'text') }))
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

export async function OPTIONS(): Promise<Response> {
    return new Response(null, {
        status: 204,
        headers: corsHeaders
    });
}

export async function POST(req: Request): Promise<Response> {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const { tools, close } = await loadMcpTools();

    const modelMessages = await convertToModelMessages(trimHistoryForBudget(messages));

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
        onFinish: () => void close(),
        onError: (event) => {
            console.error('[api/chat] streamText error:', event.error);
            void close();
        }
    });

    // Forward the real error text to the client instead of the SDK's masked
    // "An error occurred." so failures are visible during local dev.
    return result.toUIMessageStreamResponse({
        onError: (error) => (error instanceof Error ? error.message : String(error)),
        headers: corsHeaders
    });
}
