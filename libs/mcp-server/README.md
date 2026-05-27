# @fundamental-ngx/mcp

MCP (Model Context Protocol) server that exposes the entire Fundamental NGX component catalog to AI coding assistants.

## What It Does

AI coding assistants (Claude Code, Cursor, VS Code Copilot, Windsurf, etc.) can connect to this MCP server and get structured access to:

- **1000+ components** across 8 libraries (core, platform, btp, cx, cdk, ui5-webcomponents, ui5-webcomponents-fiori, ui5-webcomponents-ai)
- **Full API metadata** — inputs, outputs, slots, methods, enum values, CSS properties, and keyboard interactions
- **Component comparison** — side-by-side comparison of alternative components
- **Usage guides** — decision trees and composition patterns for complex components (dialog, table, card, etc.)
- **Selector classification** — whether a component is an element, attribute directive, or both, with correct template usage
- **Companion skills** — installable Claude Code skills for project setup, form generation, table scaffolding, and page layout (`/setup-project`, `/build-form`, `/build-table`, `/build-page-layout`, and more)

This eliminates hallucinated APIs and outdated documentation — the assistant works from the actual component metadata.

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

| Tool                     | Purpose                                                          | Example Query                                                 |
| ------------------------ | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| `list_components`        | List all components, filter by library/category                  | `{ "library": "core", "category": "Form" }`                   |
| `search_components`      | Keyword search across names, selectors, descriptions, properties | `{ "query": "date picker" }`                                  |
| `get_component_api`      | Full API details for a specific component                        | `{ "name": "fd-button" }` or `{ "name": "ui5-table" }`        |
| `get_component_examples` | Usage examples from the docs app                                 | `{ "name": "fd-dialog" }`                                     |
| `compare_components`     | Side-by-side comparison of two components                        | `{ "component_a": "fd-button", "component_b": "ui5-button" }` |
| `get_usage_guide`        | Decision tree and composition patterns for a component           | `{ "component": "dialog" }`                                   |

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

1. **Discover** — Use `search_components` or `list_components` to find the right components for your UI
2. **Decide** — Use `get_usage_guide` to choose the right variant (e.g., which dialog API surface)
3. **Learn** — Use `get_component_api` and `get_component_examples` for API details and working code
4. **Compare** — Use `compare_components` when choosing between alternatives (e.g., `fd-table` vs `fdp-table`)

### Usage Guides

The `get_usage_guide` tool provides structured decision trees for components with multiple API surfaces or variants:

- **Dialog** — template-based vs component-based vs object-based; fd-dialog vs ui5-dialog vs fd-message-box
- **Table** — fd-table (core, lightweight) vs fdp-table (platform, feature-rich) vs ui5-table (Web Components)
- **Button** — standard vs split-button vs segmented-button
- **Card** — fd-card (core) vs ui5-card (Web Components)
- **Layout Grid** — fd-layout-grid vs fd-flexible-column-layout

### Selector Classification

Each component now includes `selectorType` and `templateUsage` fields to prevent incorrect template usage:

| selectorType | Meaning                               | Example                          |
| ------------ | ------------------------------------- | -------------------------------- |
| `element`    | Use as an HTML element                | `<fd-card>...</fd-card>`         |
| `attribute`  | Use as an attribute on a host element | `<h2 fd-title>...</h2>`          |
| `both`       | Element + attribute combined          | `<button fd-button>...</button>` |

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
