# Chat Service

Angular service that connects the FD Guide Chat component to the MCP-powered chatbot API.

## Architecture

```
[User Input] → [ChatService] → [/api/chat endpoint] → [AI Model + MCP Tools]
                     ↓
              [Streaming Response]
                     ↓
              [Signal Updates] → [UI Auto-Updates]
```

## Usage

The service is already integrated into `fd-guide-chat.component.ts`. It provides:

### Signals (Reactive State)

- `messages`: Array of chat messages (user and assistant)
- `status`: Current chat state (`'idle' | 'submitted' | 'streaming' | 'error'`)
- `error`: Error message (if any)

### Methods

- `sendMessage(content: string)`: Send a message to the chat API
- `clearMessages()`: Clear all messages and reset the chat
- `cancelRequest()`: Cancel the current streaming request

### Observable

- `streamingChunks$`: Observable that emits text chunks as they arrive (useful for real-time typing indicators)

## Configuration

The chat API URL defaults to `http://localhost:3000/api/chat`. To configure for production:

1. Update `getChatApiUrl()` method in `chat.service.ts`
2. Add environment-specific configuration

## MCP Server Connection

The service connects to a Next.js API route (`/api/chat`) that:

1. Loads MCP tools from the local MCP server
2. Sends user messages to an AI model (configured in `apps/chatbot/lib/model.ts`)
3. Streams the response back using Server-Sent Events (SSE)

The AI model has access to these MCP tools:

- `search_components` - Search for components by keyword
- `get_component_api` - Get full API details for a component
- `get_component_examples` - Get working code examples
- `get_usage_guide` - Get import path and minimal usage
- `compare_components` - Compare two components
- `list_components` - Browse all components

## Testing

To test the chat locally:

1. Start the MCP server (if not already running):

    ```bash
    cd apps/chatbot
    yarn dev
    ```

2. Start the docs app:

    ```bash
    yarn start
    ```

3. Open the chat widget in the docs app and ask: "How do I use fd-dialog?"

The AI will use the MCP tools to fetch real component data and provide accurate answers.
