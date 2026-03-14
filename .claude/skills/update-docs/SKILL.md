---
name: update-docs
description: Verify and update documentation examples to match a component's current public API
argument-hint: [component-path-or-folder]
disable-model-invocation: true
context: fork
agent: general-purpose
---

# Update Documentation: $ARGUMENTS

Verify that documentation examples are in sync with the component's current public API. If a path to a component is given, find its corresponding docs. If a docs path is given, find the component it documents.

## Phase 1: Map component to docs

Component locations: `libs/core/<component>/` or `libs/platform/<component>/`
Docs locations: `libs/docs/core/<component>/` or `libs/docs/platform/<component>/`

Read:

- The component `.ts` file — extract all `input()`, `output()`, `model()` declarations
- The docs component (e.g. `<component>-docs.component.ts` and `.html`)
- All example files in the docs `examples/` folder

## Phase 2: Audit

### API coverage

For each public input/output/model on the component:

- [ ] Is it demonstrated in at least one example?
- [ ] Is it mentioned in a `<description>` block?
- [ ] If it has non-obvious behavior, is there a dedicated section?

Flag inputs/outputs that exist in the component but are not documented anywhere.

### Example quality

For each example file:

- [ ] Individual component imports — no deprecated `*Module` classes
- [ ] `@sap-ui/common-css` utility classes — no inline styles where avoidable
- [ ] Every demonstrated feature is user-observable
- [ ] No unnecessary standalone examples (consolidate where possible)
- [ ] Example code matches current API (no removed/renamed inputs)

### Description accuracy

For each `<description>` block in the docs HTML:

- [ ] Input/output names in `<code>` tags match the actual component API
- [ ] Described behavior matches the component's implementation
- [ ] No references to removed or renamed APIs

## Phase 3: Fix

For each issue found:

1. **Missing documentation** — Add the input/output to an existing example's description, or add it to an existing example template if it can be demonstrated inline
2. **Stale references** — Update `<code>` tags and descriptions to match current API
3. **Convention violations** — Replace deprecated module imports, replace inline styles with common-css classes

## Phase 4: Verify

```bash
nx run docs:build
```

Report what was updated and what remains undocumented (with rationale if intentional, e.g. internal-only inputs).

## Output

```
## Docs Sync Report: [component name]

### Updated
- [file:line] What was changed and why

### Undocumented API
| Input/Output | Type | Reason |
|-------------|------|--------|
| `appendTo` | input | Not demonstrated — added to description |
| `_internalFlag` | input | Internal — intentionally undocumented |

### Convention Fixes
- [file] Replaced ModuleX with individual imports
- [file] Replaced inline styles with sap-flex classes
```
