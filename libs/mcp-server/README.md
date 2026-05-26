# @fundamental-ngx/mcp

MCP (Model Context Protocol) server that exposes the entire Fundamental NGX component catalog to AI coding assistants.

## What It Does

AI coding assistants (Claude Code, Cursor, VS Code Copilot, Windsurf, etc.) can connect to this MCP server and get structured access to:

- **1000+ components** across 8 libraries (core, platform, btp, cx, cdk, ui5-webcomponents, ui5-webcomponents-fiori, ui5-webcomponents-ai)
- **Full API metadata** — inputs, outputs, slots, methods, enum values, CSS properties
- **Accessibility guidance** — ARIA inputs, keyboard handling, and a11y examples
- **Component comparison** — side-by-side comparison of alternative components
- **Usage guides** — decision trees and composition patterns for complex components (dialog, table, card, etc.)
- **Selector classification** — whether a component is an element, attribute directive, or both, with correct template usage
- **Companion skills** — installable Claude Code skills for project setup, form generation, table scaffolding, and page layout (`/setup-project`, `/build-form`, `/build-table`, `/build-page-layout`, and more)

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

| Tool                      | Purpose                                                          | Example Query                                                 |
| ------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------- |
| `list_components`         | List all components, filter by library/category                  | `{ "library": "core", "category": "Form" }`                   |
| `search_components`       | Keyword search across names, selectors, descriptions, properties | `{ "query": "date picker" }`                                  |
| `get_component_api`       | Full API details for a specific component                        | `{ "name": "fd-button" }` or `{ "name": "ui5-table" }`        |
| `get_component_examples`  | Usage examples from the docs app                                 | `{ "name": "fd-dialog" }`                                     |
| `get_accessibility_guide` | ARIA inputs, keyboard handling, and a11y examples                | `{ "name": "ui5-dialog" }`                                    |
| `compare_components`      | Side-by-side comparison of two components                        | `{ "component_a": "fd-button", "component_b": "ui5-button" }` |
| `get_usage_guide`         | Decision tree and composition patterns for a component           | `{ "component": "dialog" }`                                   |

## Metadata Schema

Each component in the catalog follows this structure:

```typescript
interface ComponentMetadata {
    name: string; // "ButtonComponent"
    selector: string; // "fd-button" or "ui5-button"
    selectorType: 'element' | 'attribute' | 'both'; // how to use in templates
    templateUsage: string; // "<button fd-button>...</button>"
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

## AI Onboarding

The MCP server is designed as the primary AI-assisted onboarding path for Fundamental NGX. Here's the recommended workflow:

1. **Discover** — Use `search_components` or `list_components` to find the right components for your UI
2. **Decide** — Use `get_usage_guide` to choose the right variant (e.g., which dialog API surface)
3. **Learn** — Use `get_component_api` and `get_component_examples` for API details and working code
4. **Build** — Use `get_accessibility_guide` while implementing
5. **Compare** — Use `compare_components` when choosing between alternatives (e.g., `fd-table` vs `fdp-table`)

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

## Complementary Skills

The MCP server answers _what_ Fundamental NGX components exist and _how_ their APIs work. For the procedural _how do I compose these together_ knowledge, a set of installable Claude Code skills is available in the repository.

Install them with:

```bash
npx skills add sap/fundamental-ngx
```

Or copy the skills directory into your project's `.claude/skills/` folder.

| Skill               | Invocation                                                 | What It Does                                                                                                                                |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `setup-project`     | `/setup-project my-app horizon`                            | Creates a new Angular app, installs `@fundamental-ngx/core`, applies a SAP Fiori theme, and verifies the setup with a smoke-test component  |
| `build-form`        | `/build-form UserProfile firstName:text role:select`       | Generates a reactive form with `FormGroup` wiring, `fdp-form-field` composition, typed interface, and automatic error message setup         |
| `build-table`       | `/build-table Orders sort filter paginate select=multiple` | Generates a platform data table with `FdpTableDataSource`, column definitions, sort/filter directives, pagination, and row selection        |
| `build-page-layout` | `/build-page-layout ProductDetail subheader footer`        | Generates an `fd-dynamic-page` with collapsing header, subheader, scrollable content, floating footer, and optional tabs or FCL integration |
| `scaffold`          | `/scaffold dialog component-ref`                           | Generates a working component for any supported pattern (dialog, table, card, form, shell, layout-grid) using live MCP data                 |
| `migrate`           | `/migrate src/app/my-component`                            | Migrates a component to Angular 21+ signal-based patterns (`@Input→input()`, `@HostBinding→host`, `*ngIf→@if`, `BehaviorSubject→signal()`)  |
| `a11y-audit`        | `/a11y-audit fd-menu`                                      | Audits a component for WCAG AA compliance — semantic HTML, ARIA, keyboard navigation, focus management                                      |

The skills call back into the MCP server (`get_usage_guide`, `get_component_api`, `get_component_examples`) so the procedural guidance is always backed by up-to-date component metadata.
