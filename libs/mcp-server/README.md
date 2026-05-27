# @fundamental-ngx/mcp

MCP (Model Context Protocol) server that exposes the [Fundamental NGX](https://github.com/SAP/fundamental-ngx) component catalog to AI coding assistants.

## Quick Start

### With Claude Code

**Option 1: Using claude mcp add (Recommended)**

```bash
# Install latest version
claude mcp add fundamental-ngx -- npx -y @fundamental-ngx/mcp

# Or install a specific version
claude mcp add fundamental-ngx -- npx -y @fundamental-ngx/mcp@0.62.4
```

This command automatically adds the MCP server to your `.claude/mcp.json` configuration.

**Option 2: Manual configuration**

```json
// .claude/mcp.json
{
    "mcpServers": {
        "fundamental-ngx": {
            "command": "npx",
            "args": ["-y", "@fundamental-ngx/mcp"]
        }
    }
}
```

### With Cursor

```json
// .cursor/mcp.json
{
    "mcpServers": {
        "fundamental-ngx": {
            "command": "npx",
            "args": ["-y", "@fundamental-ngx/mcp"]
        }
    }
}
```

### With VS Code (Copilot)

```json
// .vscode/mcp.json
{
    "servers": {
        "fundamental-ngx": {
            "command": "npx",
            "args": ["-y", "@fundamental-ngx/mcp"],
            "type": "stdio"
        }
    }
}
```

### How it works

`npx -y @fundamental-ngx/mcp` starts a Node.js process that listens on **stdio** for JSON-RPC messages following the [Model Context Protocol](https://modelcontextprotocol.io/). Running it directly in a terminal will appear to hang — that is intentional. The process is idle, waiting for a client to send tool requests over stdin. It is designed to be launched and managed by an MCP client (Claude Code, Cursor, VS Code Copilot), not run interactively.

To explore the server's tools from a browser UI, use the MCP Inspector instead (see below).

**Debugging with MCP Inspector:**

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) is a web UI for testing MCP servers interactively:

```bash
npx @modelcontextprotocol/inspector npx -y @fundamental-ngx/mcp
```

This opens a browser UI where you can:

- Browse all 10 available tools
- Send test requests with custom parameters
- View formatted JSON responses
- Debug tool behavior without an AI client

The server communicates over **stdio** using the MCP JSON-RPC protocol.

## Tools

| Tool                      | Purpose                                                          | Example Query                                                  |
| ------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------- |
| `list_components`         | List all components, filter by library/category                  | `{ "library": "core", "category": "Form" }`                    |
| `search_components`       | Keyword search across names, selectors, descriptions, properties | `{ "query": "date picker" }`                                   |
| `get_component_api`       | Full API details for a specific component                        | `{ "name": "fd-button" }` or `{ "name": "ui5-table" }`         |
| `get_component_examples`  | Usage examples from the docs app                                 | `{ "name": "fd-dialog" }`                                      |
| `recommend_components`    | Suggest components for a UI description                          | `{ "description": "a filterable data table with pagination" }` |
| `get_migration_guide`     | Breaking changes and upgrade guidance                            | `{ "from_version": "0.58.0" }`                                 |
| `get_design_tokens`       | SAP theming tokens and utility classes                           | `{ "query": "background color", "category": "color" }`         |
| `get_accessibility_guide` | ARIA inputs, keyboard handling, and a11y examples                | `{ "name": "ui5-dialog" }`                                     |
| `compare_components`      | Side-by-side comparison of two components                        | `{ "component_a": "fd-button", "component_b": "ui5-button" }`  |
| `get_usage_guide`         | Decision tree and composition patterns for a component           | `{ "component": "dialog" }`                                    |

## Example Queries

```
"What components are available in the core library?"
  → list_components with library "core"

"Find a component for selecting a date range"
  → search_components with query "date range"

"What inputs does fd-button accept?"
  → get_component_api with name "fd-button"

"Show me HTML examples for fd-dialog"
  → get_component_examples with name "fd-dialog"

"I need to build a filterable data table with pagination"
  → recommend_components with description "filterable data table with pagination"

"What broke between 0.60.0 and 0.62.0?"
  → get_migration_guide with from_version "0.60.0", to_version "0.62.0"

"What SAP design tokens are available for background colors?"
  → get_design_tokens with query "background color", category "color"

"How do I handle keyboard navigation in fd-menu?"
  → get_accessibility_guide with name "fd-menu"

"What is the difference between fd-table and fdp-table?"
  → compare_components with component_a "fd-table", component_b "fdp-table"

"Which dialog API should I use?"
  → get_usage_guide with component "dialog"
```

## Contributing

### Prerequisites

- Node.js 18+
- Yarn 4.x (the monorepo uses Yarn workspaces)

### Setup

```bash
# From the repo root
yarn install
```

### Build

```bash
npx nx build mcp-server
```

This compiles TypeScript and copies data assets (JSON files) into `dist/libs/mcp-server/`.

### Extract metadata

The server's component catalog is generated from the built library artifacts. Re-run this after changing component source files:

```bash
npx nx run mcp-server:extract-metadata
```

Use `--dry-run` to validate without writing:

```bash
npx nx run mcp-server:check-metadata
```

### Test

```bash
npx nx test mcp-server
```
