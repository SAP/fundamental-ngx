---
name: scaffold
description: Generate a working component using fundamental-ngx patterns (dialog, table, card, form, shell, layout-grid)
argument-hint: <pattern> [variant]
disable-model-invocation: true
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Bash(nx *), Write, Edit
---

# Scaffold: $ARGUMENTS

If `$ARGUMENTS` is empty, ask the user which pattern they want. Supported patterns:

- `dialog` — modal dialog (template / component-ref / object-based variants)
- `table` — data table (fd-table / fdp-table / ui5-table variants)
- `card` — content card with header and body
- `form` — form layout with form-items and validation
- `shell` — app shell with shellbar and navigation
- `layout-grid` — responsive grid layout

## Phase 1: Identify Pattern

Parse the pattern name from `$ARGUMENTS`. If a variant is specified (e.g., `dialog component-ref`), note it for Phase 3.

## Phase 2: Gather Context

Use the `@fundamental-ngx/mcp` MCP server tools to get accurate, up-to-date information:

1. Call `get_usage_guide` with the pattern name to get:

    - Decision tree for choosing variants
    - Composition patterns (correct parent/child nesting)
    - Common pitfalls to avoid
    - Related components

2. Call `get_component_api` for the primary component to get:

    - Correct selector (element vs attribute)
    - Available inputs and their types
    - Required imports

3. Call `get_component_examples` to get real working examples from the docs app.

If the MCP server is not available, fall back to reading `libs/mcp-server/src/data/usage-guides.ts` directly.

## Phase 3: Choose Variant

If the pattern has multiple variants (e.g., dialog has 3 API surfaces):

- If the user specified a variant in `$ARGUMENTS`, use it
- Otherwise, present the decision tree from `get_usage_guide` and ask the user to choose

## Phase 4: Determine Target Location

Ask the user where to generate the component:

- Path relative to their project (e.g., `src/app/dialogs/confirm-dialog`)
- Component name (e.g., `ConfirmDialog`)

If the user provides just a name, default to `src/app/components/<name>/`.

## Phase 5: Generate Component

Create a complete Angular component with:

1. **TypeScript file** (`.component.ts`):

    - Correct imports from `@fundamental-ngx/core`, `@fundamental-ngx/platform`, or `@fundamental-ngx/ui5-webcomponents`
    - `ChangeDetectionStrategy.OnPush`
    - Signal-based state (`signal()`, `computed()`)
    - `input()` / `output()` for component API
    - Proper selector with `fd-` prefix conventions

2. **HTML template** (`.component.html`):

    - Correct selector usage (element vs attribute directives)
    - Proper nesting/composition from the usage guide
    - `@if` / `@for` control flow (not `*ngIf` / `*ngFor`)
    - ARIA attributes for accessibility

3. **SCSS file** (`.component.scss`):
    - Minimal styles using SAP design tokens (`--sapTextColor`, `--sapContent_LabelColor`, etc.)
    - No hardcoded colors

### Critical Rules

- Use ATTRIBUTE directives correctly: `<button fd-button>` not `<fd-button>`, `<h2 fd-title>` not `<fd-title>`
- Use ELEMENT selectors correctly: `<fd-card>`, `<fd-dialog-body>`, `<fd-layout-grid>`
- Do NOT add `standalone: true` (default since Angular 19)
- Do NOT use `@HostBinding` / `@HostListener` — use `host: {}` in decorator
- Use `@if` / `@for` / `@switch`, not structural directives

## Phase 6: Validate

If the user has an NX workspace or Angular CLI project:

1. Run the project build to verify compilation: `nx run <project>:build` or `ng build`
2. Report any import errors or type mismatches
3. Fix issues if found

## Output

```
## Scaffold: [pattern] — [variant]

**Generated files:**
- path/to/component.component.ts
- path/to/component.component.html
- path/to/component.component.scss

**Imports required in your module/component:**
- `import { ComponentName } from '@fundamental-ngx/core/...'`

**Next steps:**
- [ ] Add the component to your routing or parent template
- [ ] Customize the template content
- [ ] Add your business logic
```
