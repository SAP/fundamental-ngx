---
name: review-pr
description: Review a pull request against project conventions and Angular 21+ best practices
argument-hint: [PR-number]
disable-model-invocation: true
context: fork
agent: general-purpose
---

# PR Review: #$0

## Context

Review PR #$0 against the project's conventions documented in AGENTS.md and docs/agents/.

Fetch the PR details:

- Diff: !`gh pr diff $0`
- PR info: !`gh pr view $0`
- Changed files: !`gh pr diff $0 --name-only`

## Review Checklist

For each changed file, check the applicable sections below. Report findings grouped by severity: **Blocking** (must fix), **Suggestion** (should fix), **Nit** (optional).

### 1. Angular 21+ Patterns

- [ ] `input()` / `output()` / `model()` — no `@Input()` / `@Output()` decorators
- [ ] `host: {}` in decorator — no `@HostBinding()` / `@HostListener()`
- [ ] `@if` / `@for` / `@switch` — no `*ngIf` / `*ngFor` / `*ngSwitch`
- [ ] No `standalone: true` in `@Component` (default in Angular 21+)
- [ ] No `allowSignalWrites: true` in `effect()` (deprecated)
- [ ] `DestroyRef` + `takeUntilDestroyed()` — no custom `DestroyedService`
- [ ] `computed()` + `host: { '[class]': }` — no `CssClassBuilder` / `@applyCssClass`
- [ ] Member ordering: decorated props → signal inputs/outputs → public → protected → private → constructor → methods

### 2. State Management

- [ ] `signal()` only used when a reactive consumer exists (template, computed, effect, host binding)
- [ ] Plain properties for internal bookkeeping, one-time flags, cached values
- [ ] No redundant `markForCheck()` after signal updates
- [ ] `BehaviorSubject` → `signal()` where there are no async consumers
- [ ] `effect()` for signal reactions; RxJS only for async operations (HTTP, WebSocket, timers)

### 3. Dependency Injection

- [ ] `InjectionToken` for contextual defaults (not `@ContentChild` assigning to signal inputs)
- [ ] Token defined near child component, injected with `{ optional: true }`
- [ ] `FD_` prefix for component identity tokens
- [ ] `contentChild()` / `contentChildren()` query by token, not concrete class

### 4. Unit Tests

- [ ] **New/changed inputs, outputs, or behavior have corresponding test updates**
- [ ] Tests cover user interactions and realistic scenarios, not implementation details
- [ ] No tests for TypeScript-prevented scenarios (e.g. passing undefined to required input)
- [ ] No tests for Angular DI-prevented scenarios (e.g. missing required dependency)
- [ ] `fixture.componentRef.setInput()` used for signal inputs in tests
- [ ] Individual component imports in test `imports` arrays — no deprecated `*Module` classes
- [ ] Unique test component names (no generic `TestComponent`)

### 5. Documentation Examples

- [ ] **If public API changed (new input, changed behavior, removed feature), docs examples are updated**
- [ ] Examples consolidated into existing examples — no unnecessary standalone example files
- [ ] Every demonstrated feature is user-observable (can the user see it working?)
- [ ] `@sap-ui/common-css` utility classes (`sap-flex`, `sap-margin-*`, `sap-padding-*`) — no inline styles
- [ ] Individual component imports in examples — no deprecated `*Module` classes

### 6. Breaking Changes

- [ ] **If exports removed, inputs/outputs renamed, or defaults changed:**
    - [ ] Commit message has `!` after scope: `fix(core)!: description`
    - [ ] Commit message has `BREAKING CHANGE:` footer with migration instructions
    - [ ] PR description has a "Breaking Changes" section with before/after examples
- [ ] Widely-used APIs marked `@deprecated` before removal (not removed in same PR)
- [ ] All usages searched with grep before removing exports

### 7. Commit & PR Format

- [ ] Commit format: `<type>(<scope>): <subject>`
- [ ] Valid type: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `build` | `ci` | `chore`
- [ ] Valid scope: `core` | `platform` | `cdk` | `btp` | `cx` | `i18n` | `datetime-adapter` | `ui5` | `docs` | `e2e` | `ci`
- [ ] PR title follows same format
- [ ] No `WIP` prefix (unless intentionally draft)

## Output Format

Summarize findings as:

```
## Review Summary

**PR:** #$0
**Overall:** APPROVE / REQUEST CHANGES / COMMENT

### Blocking
- [file:line] Issue description

### Suggestions
- [file:line] Issue description

### Nits
- [file:line] Issue description

### Missing
- Tests: list any untested new behavior
- Docs: list any undocumented API changes
- Breaking changes: list any unannounced breaking changes
```
