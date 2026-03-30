---
name: best-practices
description: Audit existing code against project conventions and Angular 21+ best practices
argument-hint: [component-path-or-folder]
disable-model-invocation: true
context: fork
agent: general-purpose
allowed-tools: Read, Grep, Glob, Bash(nx *), Bash(wc *)
---

# Best Practices Audit: $ARGUMENTS

If `$ARGUMENTS` is empty, ask the user for a component path or folder before proceeding.

Audit the code at `$ARGUMENTS` against the project's conventions. Unlike `/review-pr` which checks diffs, this audits existing code as-is.

## Checklist

### 1. Angular 21+ Patterns

- [ ] **New code** uses `input()` / `output()` / `model()` / `linkedSignal()`. Existing `@Input()` / `@Output()` decorators are acceptable.
- [ ] `host: {}` in decorator — no `@HostBinding()` / `@HostListener()`
- [ ] `@if` / `@for` / `@switch` — no `*ngIf` / `*ngFor` / `*ngSwitch`
- [ ] No `standalone: true` (default since Angular 19)
- [ ] No `allowSignalWrites` option in `effect()` (the option no longer exists)
- [ ] `DestroyRef` + `takeUntilDestroyed()` — no custom `DestroyedService`
- [ ] `computed()` + `host: { '[class]': }` — no `CssClassBuilder` / `@applyCssClass`
- [ ] No `ngClass` / `ngStyle` (use direct bindings)

### 2. State Management

- [ ] `signal()` only when reactive consumer exists
- [ ] Plain properties for internal bookkeeping
- [ ] No redundant `markForCheck()` after signal updates
- [ ] `BehaviorSubject` only for async streams, not local state
- [ ] `effect()` for signal side effects — no `Subject<void>` for trigger-only patterns
- [ ] No `effect()` used for state derivation — use `computed()` or `linkedSignal` instead
- [ ] `linkedSignal` used for mutable derived state (e.g., editable fields that reset on input change)
- [ ] No object/array mutation in place then `signal.set()` with same reference — always create new references
- [ ] No conditional signal reads creating invisible dependency gaps in `effect()` / `computed()` — tracked signals read before conditional logic

### 3. Dependency Injection

- [ ] `InjectionToken` for contextual defaults — not `@ContentChild` assigning to signal inputs
- [ ] Tokens defined near child component with `{ optional: true }`
- [ ] `FD_` prefix for component identity tokens
- [ ] Queries by token, not concrete class

### 4. Component Structure

- [ ] `ChangeDetectionStrategy.OnPush`
- [ ] `fd-` selector prefix
- [ ] Member ordering: decorated → signals → public → protected → private → constructor → methods
- [ ] No oversized files (flag components > 400 lines for potential split)
- [ ] Template logic kept simple — complex expressions in `computed()` not inline

### 5. Code Quality

- [ ] No unused imports
- [ ] No commented-out code
- [ ] No `console.log` / `console.warn` (except intentional deprecation warnings)
- [ ] No `any` types (use proper generics or `unknown`)
- [ ] No magic numbers or strings (use constants or enums)

### 6. Testing (if spec file exists)

- [ ] Tests cover user scenarios, not implementation details
- [ ] `fixture.componentRef.setInput()` for signal inputs
- [ ] Individual component imports — no deprecated `*Module` classes
- [ ] Unique test component names

### 7. Documentation (if docs exist)

- [ ] Examples match current API
- [ ] No inline styles (use common-css)
- [ ] Individual imports in examples

## Output

```
## Best Practices Audit: [component name]

**Overall Score:** X / 7 sections passing

### Section Scores
| Section            | Status | Issues |
|--------------------|--------|--------|
| Angular Patterns   | PASS   | 0      |
| State Management   | WARN   | 2      |
| DI Patterns        | PASS   | 0      |
| Component Structure| FAIL   | 3      |
| Code Quality       | PASS   | 0      |
| Testing            | WARN   | 1      |
| Documentation      | FAIL   | 2      |

### Findings (by severity)

**Blocking**
- [file:line] Issue — convention reference

**Suggestions**
- [file:line] Issue — convention reference

**Nits**
- [file:line] Issue — convention reference

### Migration Items
Items that require `/migrate` to fix:
- [file] 5 @Input decorators → input()
- [file] 3 *ngIf → @if
```
