import { createMCPClient } from '@ai-sdk/mcp';
import type { UIMessage } from 'ai';

const MAX_HISTORY_MESSAGES = 8;

function mcpUrl(): string {
    return process.env.MCP_SERVER_URL ?? 'http://localhost:3000/api/mcp';
}

export function trimHistoryForBudget(messages: UIMessage[]): UIMessage[] {
    return messages
        .map((message) => ({
            ...message,
            parts: message.parts.filter((part) => part.type === 'text' || part.type === 'file')
        }))
        .filter((message) => message.parts.length > 0)
        .slice(-MAX_HISTORY_MESSAGES);
}

export async function loadMcpTools(url = mcpUrl()): Promise<{
    tools: Awaited<ReturnType<Awaited<ReturnType<typeof createMCPClient>>['tools']>>;
    close: () => Promise<void>;
}> {
    const client = await createMCPClient({ transport: { type: 'http', url } });
    const tools = await client.tools();
    return { tools, close: () => client.close() };
}
