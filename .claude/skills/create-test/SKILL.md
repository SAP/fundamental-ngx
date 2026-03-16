---
name: create-test
description: Generate or update unit tests for a component following project testing conventions
argument-hint: [component-path]
disable-model-invocation: true
context: fork
agent: general-purpose
---

# Create/Update Tests: $ARGUMENTS

## Phase 1: Analyze the component

Read the component file at `$ARGUMENTS`. Extract:

- All `input()` / `input.required()` declarations with types and defaults
- All `output()` declarations with event types
- All `model()` declarations
- All public/protected methods
- Template interactions (click handlers, form bindings, conditional rendering)
- Host bindings and listeners
- Injected dependencies

## Phase 2: Check existing tests

Look for an existing `.spec.ts` file alongside the component. If found, read it and identify:

- What is already covered
- What is missing based on the component analysis
- Any patterns that violate project conventions (see below)

## Phase 3: Generate/update tests

### Conventions to follow

**Structure:**

- One `describe` block per component
- Nested `describe` for each feature group (inputs, outputs, interactions, a11y)
- `it` descriptions should be user-focused: "should display label when label input is set"
- AAA pattern: Arrange → Act → Assert

**Signal inputs:**

- Use `fixture.componentRef.setInput('inputName', value)` — never assign directly
- Call `fixture.detectChanges()` after setting inputs
- Test default values by checking initial render without setting input

**Imports:**

- Individual component/directive imports — no deprecated `*Module` classes
- Import only what the test needs

**Test components:**

- Use unique names: `MenuTestComponent`, not `TestComponent`
- Keep test component templates minimal — only what's needed for the test

**What to test:**

- Default rendering
- Each input affects the component as expected
- Outputs emit correct events on user interaction
- Two-way bindings (`model()`) update in both directions
- Keyboard navigation where applicable
- Disabled state behavior
- Edge cases: empty strings, null values, boundary numbers

**What NOT to test:**

- TypeScript-prevented scenarios (passing wrong types)
- Angular DI-prevented scenarios (missing required providers)
- Private methods or internal signal values
- Implementation details (internal CSS classes unless they're the public API)

### Output format

Generate the complete test file content. If updating an existing file, show only the additions/changes needed.

## Phase 4: Verify

```bash
nx run <library>:test --testfile=<spec-file> --skip-nx-cache
```

Report test results. If failures occur, diagnose and fix.
