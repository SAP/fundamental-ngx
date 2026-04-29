# @fundamental-ngx/mcp

MCP (Model Context Protocol) server that exposes the entire Fundamental NGX component catalog to AI coding assistants.

## What It Does

AI coding assistants (Claude Code, Cursor, VS Code Copilot, Windsurf, etc.) can connect to this MCP server and get structured access to:

- **1000+ components** across 8 libraries (core, platform, btp, cx, cdk, ui5-webcomponents, ui5-webcomponents-fiori, ui5-webcomponents-ai)
- **Full API metadata** — inputs, outputs, slots, methods, enum values, CSS properties
- **Component recommendations** — describe what you want to build and get matching components
- **Design tokens** — SAP theming CSS custom properties and utility classes
- **Migration guidance** — breaking changes and upgrade paths from changelogs
- **Accessibility guidance** — ARIA inputs, keyboard handling, and a11y examples
- **Component comparison** — side-by-side comparison of alternative components

This eliminates hallucinated APIs and outdated documentation — the assistant works from the actual component metadata.

## Quick Start

### VS Code / Cursor

Create or edit `.vscode/mcp.json` in your project root:

```json
{
    "servers": {
        "fundamental-ngx": {
            "command": "npx",
            "args": ["-y", "@fundamental-ngx/mcp"]
        }
    }
}
```

### Claude Code

Run this command in your terminal to register the server for the current project:

```bash
claude mcp add fundamental-ngx -- npx -y @fundamental-ngx/mcp
```

Or to make it available across all your projects:

```bash
claude mcp add --scope user fundamental-ngx -- npx -y @fundamental-ngx/mcp
```

You can verify it was added with:

```bash
claude mcp list
```

### Windsurf

Add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
    "mcpServers": {
        "fundamental-ngx": {
            "command": "npx",
            "args": ["-y", "@fundamental-ngx/mcp"]
        }
    }
}
```

That's it — your AI assistant now has full access to the Fundamental NGX component catalog.

## Available Tools

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

## Metadata Schema

Each component in the catalog follows this structure:

```typescript
interface ComponentMetadata {
    name: string; // "ButtonComponent"
    selector: string; // "fd-button" or "ui5-button"
    library: Library; // "@fundamental-ngx/core"
    category: string; // "Actions", "Form", "Layout"
    description: string;
    deprecated?: string; // deprecation message
    inputs: InputMetadata[];
    outputs: OutputMetadata[];
    slots: SlotMetadata[]; // UI5 components
    methods: MethodMetadata[];
    cssProperties: CssPropertyMetadata[];
    keyboardHandling?: string; // keyboard interaction notes (UI5 components)
    source: 'cem' | 'typedoc';
}
```

See `src/types/component-metadata.ts` for full type definitions.
