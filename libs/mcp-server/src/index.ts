#!/usr/bin/env node
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { loadData, server, startStdioServer } from './server';

const args = process.argv.slice(2);

if (args[0] === '--list-tools') {
    runListTools().catch((e) => {
        console.error(e);
        process.exit(1);
    });
} else if (args[0] === '--call') {
    const toolName = args[1];
    const rawArgs = args[2] ?? '{}';
    if (!toolName) {
        console.error('Usage: fundamental-ngx-mcp --call <tool-name> [json-args]');
        process.exit(1);
    }
    runCallTool(toolName, rawArgs).catch((e) => {
        console.error(e);
        process.exit(1);
    });
} else {
    startStdioServer().catch((error) => {
        console.error('MCP server failed to start:', error);
        process.exit(1);
    });
}

async function runListTools(): Promise<void> {
    await loadData();
    const [serverTransport, clientTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    const client = new Client({ name: 'cli', version: '1.0' });
    await client.connect(clientTransport);
    const { tools } = await client.listTools();
    console.log(
        JSON.stringify(
            tools.map((t) => ({ name: t.name, description: t.description })),
            null,
            2
        )
    );
    await client.close();
}

async function runCallTool(toolName: string, rawArgs: string): Promise<void> {
    let parsedArgs: Record<string, unknown>;
    try {
        parsedArgs = JSON.parse(rawArgs);
    } catch {
        console.error(`Invalid JSON arguments: ${rawArgs}`);
        process.exit(1);
    }
    await loadData();
    const [serverTransport, clientTransport] = InMemoryTransport.createLinkedPair();
    await server.connect(serverTransport);
    const client = new Client({ name: 'cli', version: '1.0' });
    await client.connect(clientTransport);
    const result = await client.callTool({ name: toolName, arguments: parsedArgs });
    const content = result.content as Array<{ type: string; text?: string }>;
    for (const item of content) {
        if (item.type === 'text') {
            console.log(item.text);
        }
    }
    await client.close();
}
