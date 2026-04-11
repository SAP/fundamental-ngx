# Contributing to @fundamental-ngx/mcp

Internal development guide for contributors working on the MCP server.

## How It Works

```
  ┌────────────────────────────┐   ┌────────────────────────────┐
  │  Custom Elements Manifest  │   │        TypeDoc JSON        │
  │   (UI5 Web Components)     │   │ (core/platform/btp/cx/cdk) │
  │  3 packages, ~142 comps    │   │      ~858 components       │
  └─────────────┬──────────────┘   └──────────────┬─────────────┘
                │                                 │
                ▼                                 ▼
          ┌──────────────────────────────────────────┐
          │           build-metadata.ts              │
          │   (merges, normalizes, deduplicates)     │
          └──────────────────┬───────────────────────┘
                             ▼
                    ┌──────────────────┐
                    │  components.json │  ← pre-built
                    │   (1000 entries) │
                    └────────┬─────────┘
                             ▼
                    ┌────────────────┐
                    │   MCP Server   │  ← stdio transport
                    │   (9 tools +   │
                    │   1 resource)  │
                    └────────────────┘
```

## Local MCP Config

Use the source version instead of the npm package:

```json
{
    "servers": {
        "fundamental-ngx": {
            "command": "npx",
            "args": ["tsx", "libs/mcp-server/src/index.ts"]
        }
    }
}
```

## Regenerate Metadata

After adding/changing components or upgrading UI5 Web Components:

```bash
nx run mcp-server:extract-metadata
```

This reads from CEM files (`node_modules/@ui5/webcomponents*/dist/custom-elements-internal.json`) and TypeDoc JSON (`libs/docs/typedoc/*/typedoc.json`), then writes `libs/mcp-server/src/data/components.json`.

## Check for Stale Metadata (CI)

```bash
nx run mcp-server:check-metadata
```

Runs extraction in dry-run mode and compares against the existing `components.json`. Exits with code 1 if the catalog is stale.

## Run Tests

```bash
nx run mcp-server:test
```

131 tests across 5 suites:

- `cem-extractor.spec.ts` — CEM parsing, description cleaning, deprecation (27 tests)
- `typedoc-extractor.spec.ts` — TypeDoc parsing, deprecation extraction (27 tests)
- `changelog-extractor.spec.ts` — Changelog parsing (7 tests)
- `token-extractor.spec.ts` — Design token extraction (5 tests)
- `server.spec.ts` — Tool logic, a11y guide, compare, catalog validation (65 tests)

## Build

```bash
nx run mcp-server:build
```

Outputs to `dist/libs/mcp-server/`. The built package includes `components.json` in the `src/data/` directory.

## Run locally

```bash
npx @modelcontextprotocol/inspector npx tsx libs/mcp-server/src/index.ts
```

## Data Sources

| Source             | Components | Location                                                                   |
| ------------------ | ---------- | -------------------------------------------------------------------------- |
| CEM (ui5 core)     | 94         | `node_modules/@ui5/webcomponents/dist/custom-elements-internal.json`       |
| CEM (ui5 fiori)    | 44         | `node_modules/@ui5/webcomponents-fiori/dist/custom-elements-internal.json` |
| CEM (ui5 ai)       | 4          | `node_modules/@ui5/webcomponents-ai/dist/custom-elements-internal.json`    |
| TypeDoc (core)     | 544        | `libs/docs/typedoc/core/typedoc.json`                                      |
| TypeDoc (platform) | 220        | `libs/docs/typedoc/platform/typedoc.json`                                  |
| TypeDoc (btp)      | 40         | `libs/docs/typedoc/btp/typedoc.json`                                       |
| TypeDoc (cdk)      | 38         | `libs/docs/typedoc/cdk/typedoc.json`                                       |
| TypeDoc (cx)       | 16         | `libs/docs/typedoc/cx/typedoc.json`                                        |
