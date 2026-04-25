---
name: adopt-styles
description: Adopt breaking changes from fundamental-styles into Angular components
argument-hint: <component-names> (e.g., calendar, checkbox, radio)
disable-model-invocation: true
---

# Adopt Fundamental-Styles Changes: $ARGUMENTS

If `$ARGUMENTS` is empty, ask the user for one or more fundamental-styles component names before proceeding.

Parse `$ARGUMENTS` as a comma-separated list of fundamental-styles component names (e.g., `calendar, checkbox, radio`).

---

## Phase 1: Discover

For each component name, locate its Angular implementation across all library packages.

### Steps

1. **Find component directories:**

    ```bash
    # Search all library packages — not just core
    find libs/core libs/platform libs/btp libs/cx libs/cdk -maxdepth 1 -type d -name "<component>" 2>/dev/null
    ```

    If no exact match, try partial/fuzzy matching:

    ```bash
    find libs/core libs/platform libs/btp libs/cx libs/cdk -maxdepth 1 -type d -name "*<component>*" 2>/dev/null
    ```

2. **Enumerate all files in each matched directory (recursively):**

    ```bash
    find <matched-directory> \( -name "*.component.ts" -o -name "*.component.html" -o -name "*.component.spec.ts" -o -name "*.directive.ts" -o -name "*.directive.html" -o -name "*.directive.spec.ts" \)
    ```

3. **Present the discovered file tree** grouped by package and component:

    ```
    ## Discovered Files

    ### core/calendar
    - calendar.component.ts
    - calendar.component.html
    - calendar.component.spec.ts
    - calendar-views/calendar-day-view/calendar-day-view.component.ts
    - calendar-views/calendar-day-view/calendar-day-view.component.html
    - calendar-views/calendar-day-view/calendar-day-view.component.spec.ts
    - calendar-legend/calendar-legend.component.ts
    - ...

    ### core/checkbox
    - checkbox/checkbox.component.ts
    - ...
    ```

4. **If any component name has zero matches**, report it and ask the user to clarify before proceeding.

---

## Phase 2: Analyze

For each discovered component, compare the current Angular implementation against the fundamental-styles target state.

### Steps

1. **Fetch target state from the `fundamental-styles` MCP server:**

    - `get_component_html` — reference HTML markup (correct element structure, nesting)
    - `get_accessibility_guide` — ARIA attributes, roles, keyboard interaction patterns
    - `get_css_classes` — full BEM class hierarchy (block, elements, modifiers, states)

2. **Read the current Angular implementation:**

    - Read each `.component.html` template
    - Read each `.component.ts` file (host bindings, imports, class building logic)
    - Extract current ARIA attributes, CSS classes, and HTML structure

3. **Identify gaps by diffing current vs. target:**

    | Category                        | What to look for                                                                                                                                    |
    | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
    | **Missing ARIA attributes**     | `role`, `aria-label`, `aria-labelledby`, `aria-expanded`, `aria-readonly`, `aria-multiselectable`, `aria-roledescription`, `aria-description`, etc. |
    | **Missing/renamed CSS classes** | New BEM element/modifier classes, new `is-*` state classes (e.g., `is-readonly`)                                                                    |
    | **Structural HTML changes**     | Element type changes (e.g., `<button>` → `<span>`), wrapper additions/removals, nesting changes                                                     |
    | **Removed attributes**          | Redundant roles/ARIA on inner elements that the parent now handles                                                                                  |
    | **Import changes**              | TypeScript imports to add or remove after template changes (e.g., removing `ButtonComponent` after button → span)                                   |

4. **Flag i18n requirements:**

    If any new ARIA attribute requires translated text (e.g., `aria-label`, `aria-description`, `aria-roledescription` with user-facing strings), note:

    - The proposed i18n key name (following the `core<ComponentName>.<descriptorName>` convention)
    - The English default text
    - Which file and attribute will consume it

---

## Phase 3: Plan

Present a structured adoption plan. **Stop and wait for user approval before executing.**

### 3.1 Ripple scan

Before presenting the plan, scan for downstream consumers that may break:

1. **Find all template usages of the component's selector(s) across the monorepo:**

    ```bash
    grep -rn '<fd-<component>\|fd-<component> ' libs --include='*.html' --include='*.ts' | grep -v node_modules
    ```

2. **In each consumer, check for brittle assertions or hard-coded references:**

    - Tests that assert exact class counts (`.classList.length`)
    - Tests that assert concatenated class strings (`.className.toContain('class-a class-b')`)
    - Templates using string-attribute form for typed inputs (e.g., `tabindex="0"` instead of `[tabindex]="0"`)

3. **Add downstream fixes to the plan** as separate entries.

### 3.2 Output format

```
## Adoption Plan

### <ComponentName> (<package>/<path>)

| File | What to change | Why |
|------|---------------|-----|
| `component.ts` | Add `role="group"` to host | Screen readers need to identify as group |
| `component.html` | Add `aria-readonly` to `<table>` | Grid table needs ARIA state attributes |
| `component.html` | Change `<button fd-button>` → `<span class="fd-button ...">` | Remove double-focusable element |
| `component.ts` | Remove `ButtonComponent` from imports | No longer used after button → span |

### i18n Keys Needed

| Key | English Default | Used By |
|-----|----------------|---------|
| `coreCalendar.calendarLegendLabel` | `Calendar legend` | `calendar-legend.component.ts` → `aria-label` |

### Tests to Add

| Spec File | Test Description |
|-----------|-----------------|
| `calendar.component.spec.ts` | Verify `role="group"` present on host element |
| `calendar.component.spec.ts` | Verify `aria-roledescription="Calendar"` on host |
| `calendar-day-view.component.spec.ts` | Verify `aria-readonly="false"` on table |

### Summary

- **Files to modify:** X
- **ARIA attributes added/changed:** X
- **CSS classes added/changed:** X
- **Structural HTML changes:** X
- **i18n keys needed:** X
- **Tests to add:** X
- **No public API changes** (or list any if there are)
```

**Wait for user approval. Do not proceed until the user confirms.**

---

## Phase 4: Execute

After the user approves the plan, apply all changes.

### 4.1 Template and TypeScript changes

For each change in the plan:

1. Apply the template (`.component.html`) modifications — ARIA attributes, CSS classes, structural HTML
2. Apply the TypeScript (`.component.ts`) modifications — host bindings, import additions/removals
3. Verify each file compiles (no syntax errors in the edit)

### 4.2 Incremental build check

After applying template and TypeScript changes but **before writing tests**, run a quick build to catch type errors early:

```bash
nx run <library>:build
```

This catches issues like string-attribute vs property-binding mismatches (e.g., `tabindex="0"` vs `[tabindex]="0"`) before investing time in test creation. Fix any build errors before proceeding.

### 4.3 Test generation

For each ARIA or markup change, add test(s) to the corresponding `.spec.ts` file:

- **Host binding tests:** Create component via `TestBed`, check `fixture.debugElement.attributes` or `nativeElement.getAttribute()`
- **Template attribute tests:** Query the target element, assert attribute presence and value
- **Dynamic attribute tests:** If the attribute depends on component state (e.g., `aria-multiselectable` based on `selectionMode`), test both states
- **Structural tests:** If an element type changed (button → span), verify the new element type and that old element is absent

Follow the testing patterns in `docs/agents/testing-guidelines.md` and existing spec files in the component directory.

### 4.4 i18n delegation

If the plan includes i18n keys:

1. Add translation keys following the i18n rule (`.claude/rules/i18n.md`) and patterns in `docs/agents/i18n-patterns.md`
2. Add keys to `libs/i18n/src/lib/models/fd-language-key-identifier.ts` (union type)
3. Add keys to `libs/i18n/src/lib/models/fd-language.ts` (interface)
4. Add English defaults to all `.properties` and `.ts` translation files under `libs/i18n/src/lib/translations/`
5. Use `FdTranslatePipe` in templates or `resolveTranslationSignalFn()` in TypeScript as appropriate

### 4.5 Preflight

Run local quality gates:

```bash
yarn format
nx run <library>:build
nx run <library>:lint
nx run <library>:test --skip-nx-cache
```

Report results per gate (PASS/FAIL). If any gate fails, diagnose and fix before reporting completion.

---

## Phase 5: Retrospective

After execution is complete and all quality gates pass, produce a retrospective report.

### Output format

```
## Retrospective

### What went well
- [List components/changes where discovery → analysis → execution was smooth]
- [Patterns that were fast to apply]
- [MCP tools that returned accurate, complete data]

### What was slow or needed manual judgment
- [Components where file discovery was non-obvious]
- [MCP tools that returned incomplete/unexpected data for specific components]
- [Structural changes that needed careful reasoning beyond simple attribute additions]
- [i18n overhead]
- [Test generation that required unusual setup or mocking]

### Suggested improvements

#### This skill (`adopt-styles`)
- [Specific changes to improve discovery, analysis, or execution]

#### Other skills / docs
- [Updates to other skill files, agent docs, or rules that would reduce friction]
- [e.g., "i18n-manage skill could accept batch of keys", "fundamental-styles MCP rule could note that get_component_html may not show all variants"]

#### fundamental-styles MCP
- [Gaps in MCP tool coverage or data quality encountered during this run]

### Timing
| Phase | Duration | Notes |
|-------|----------|-------|
| Discover | ~X min | |
| Analyze | ~X min | |
| Plan + approval | ~X min | |
| Execute | ~X min | |
| **Total** | **~X min** | |
```

**Ask the user if they would like to apply any of the suggested improvements now.** If approved, make the updates to skill files, docs, or rules directly.
