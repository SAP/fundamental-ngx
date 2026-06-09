# Component Catalog

The fundamental-ngx component catalog is a machine-readable JSON file that lists all components, directives, and pipes across all libraries in the monorepo.

## Public URL

The catalog is published to the docs site at:

```
https://sap.github.io/fundamental-ngx/components.json
```

This URL is stable and updated with every release.

## Format

The catalog follows this structure:

```json
{
  "generatedAt": "2026-06-03T17:41:29.766Z",
  "version": "0.63.0-rc.2",
  "components": [
    {
      "name": "ButtonComponent",
      "selector": "[fd-button], fd-button",
      "library": "@fundamental-ngx/core",
      "category": "button",
      "description": "The button component provides a simple way to create buttons...",
      "inputs": [...],
      "outputs": [...],
      "slots": [...],
      "methods": [...],
      "cssProperties": [...],
      "sourceFile": "libs/core/button/button.component.ts",
      "source": "typedoc",
      "examples": [...]
    }
  ]
}
```

### Fields

- **`generatedAt`**: ISO 8601 timestamp of when the catalog was generated
- **`version`**: The fundamental-ngx version (matches `lerna.json`)
- **`components`**: Array of all components/directives/pipes

#### Component Entry

- **`name`**: Component class name (e.g. `ButtonComponent`, `DialogDirective`)
- **`selector`**: All valid Angular selectors, comma-separated (includes attribute selectors like `[fd-button]`)
- **`library`**: npm package name (e.g. `@fundamental-ngx/core`, `@fundamental-ngx/platform`)
- **`category`**: Component category for grouping (e.g. `button`, `dialog`, `table`)
- **`description`**: Component description (from JSDoc or docs)
- **`inputs`**: Array of component inputs with name, type, description, and required flag
- **`outputs`**: Array of component outputs with name, type, and description
- **`slots`**: Array of content projection slots (UI5 Web Components only)
- **`methods`**: Array of public methods with parameters and return types
- **`cssProperties`**: Array of CSS custom properties (UI5 Web Components only)
- **`sourceFile`**: Relative path to the source file
- **`source`**: Extraction source (`typedoc` for hand-written, `cem` for UI5 Web Components)
- **`examples`**: Array of code examples with TypeScript and HTML (optional)

## Coverage

The catalog includes all 1,000+ components across these libraries:

| Library                                    | Prefix | Count |
| ------------------------------------------ | ------ | ----- |
| `@fundamental-ngx/core`                    | `fd-`  | ~300  |
| `@fundamental-ngx/platform`                | `fdp-` | ~200  |
| `@fundamental-ngx/cdk`                     | `fdk-` | ~100  |
| `@fundamental-ngx/btp`                     | `fdb-` | ~50   |
| `@fundamental-ngx/cx`                      | `cx-`  | ~50   |
| `@fundamental-ngx/ui5-webcomponents`       | `ui5-` | ~150  |
| `@fundamental-ngx/ui5-webcomponents-fiori` | `ui5-` | ~100  |
| `@fundamental-ngx/ui5-webcomponents-ai`    | `ui5-` | ~50   |

## Use Cases

### Static Analysis

The catalog enables static scanners to detect fundamental-ngx component usage in codebases:

```typescript
// Fetch the catalog
const catalog = await fetch('https://sap.github.io/fundamental-ngx/components.json').then((r) => r.json());

// Build a regex to match all selectors
const selectors = catalog.components.map((c) => c.selector.split(',').map((s) => s.trim())).flat();
const regex = new RegExp(selectors.join('|'), 'g');

// Scan HTML/templates
const matches = templateContent.match(regex);
```

### Component Discovery

Find components by library, category, or feature:

```typescript
// All buttons
const buttons = catalog.components.filter((c) => c.category === 'button');

// All platform components
const platformComponents = catalog.components.filter((c) => c.library === '@fundamental-ngx/platform');

// Components with a specific input
const withDisabled = catalog.components.filter((c) => c.inputs.some((i) => i.name === 'disabled'));
```

### Documentation Generation

Generate documentation, migration guides, or component inventories:

```typescript
// Generate a component list grouped by library
const byLibrary = catalog.components.reduce((acc, c) => {
    if (!acc[c.library]) acc[c.library] = [];
    acc[c.library].push(c);
    return acc;
}, {});
```

## Maintenance

The catalog is **automatically generated** from source code. Do not edit `components.json` manually.

### Regeneration

The catalog regenerates:

1. **On every release** via CI ([.github/workflows/create-release.yml](.github/workflows/create-release.yml))
2. **On demand** via `nx run mcp-server:extract-metadata`

### Validation

PRs automatically validate the catalog is up-to-date via `nx run mcp-server:check-metadata`. If the catalog is stale (component count changed, components added/removed), CI fails.

### Version Source

The `version` field is read from [lerna.json](lerna.json) at generation time, ensuring it always matches the published package versions.

## Source Code

- **Generator**: [libs/mcp-server/src/extractors/build-metadata.ts](libs/mcp-server/src/extractors/build-metadata.ts)
- **Catalog**: [libs/mcp-server/src/data/components.json](libs/mcp-server/src/data/components.json)
- **Extractors**:
    - TypeDoc (hand-written components): [libs/mcp-server/src/extractors/typedoc-extractor.ts](libs/mcp-server/src/extractors/typedoc-extractor.ts)
    - CEM (UI5 Web Components): [libs/mcp-server/src/extractors/cem-extractor.ts](libs/mcp-server/src/extractors/cem-extractor.ts)
    - Examples: [libs/mcp-server/src/extractors/example-extractor.ts](libs/mcp-server/src/extractors/example-extractor.ts)
    - Descriptions: [libs/mcp-server/src/extractors/description-extractor.ts](libs/mcp-server/src/extractors/description-extractor.ts)

## Related

- **MCP Server**: The catalog powers the `@fundamental-ngx/mcp` MCP server for Claude Code and other AI coding assistants
- **llms.txt**: Human-readable component list at [https://sap.github.io/fundamental-ngx/llms.txt](https://sap.github.io/fundamental-ngx/llms.txt)
