---
name: migrate
description: Migrate a component or directive to Angular 21+ signal-based patterns
argument-hint: [component-path-or-folder]
disable-model-invocation: true
---

# Angular 21+ Migration: $ARGUMENTS

## Phase 1: Analyze

Read all files in the target path. For each component, directive, or service, scan for migration items below. If a folder is given, process all `.ts` and `.html` files within it.

### What to migrate

**Inputs / Outputs / Models:**

- `@Input()` → `input()` or `input.required()`
- `@Input()` with setter → `input()` + `linkedSignal()` or `effect()`
- `@Input()` + `@Output()` pair (e.g. `value` / `valueChange`) → `model()`
- `@Output()` → `output()`
- Boolean inputs: add `{ transform: booleanAttribute }`
- Number inputs: add `{ transform: numberAttribute }`

**Host bindings:**

- `@HostBinding('class.x')` → `host: { '[class.x]': 'expr()' }`
- `@HostBinding('attr.x')` → `host: { '[attr.x]': 'expr()' }`
- `@HostBinding('style.x')` → `host: { '[style.x]': 'expr()' }`
- `@HostListener('event')` → `host: { '(event)': 'handler($event)' }`

**Queries:**

- `@ViewChild()` → `viewChild()` or `viewChild.required()`
- `@ViewChildren()` → `viewChildren()`
- `@ContentChild()` → `contentChild()`
- `@ContentChildren()` → `contentChildren()`

**Template syntax:**

- `*ngIf` → `@if`
- `*ngFor` → `@for` (requires `track` expression)
- `*ngSwitch` / `*ngSwitchCase` → `@switch` / `@case`

**State management:**

- `BehaviorSubject` used for local component state → `signal()`
- `BehaviorSubject` + `combineLatest` → `computed()`
- `Subject<void>` used only to trigger side effects → `effect()`
- Redundant `markForCheck()` after signal updates → remove

**CSS class building:**

- `CssClassBuilder` + `@applyCssClass` → `computed()` returning class string + `host: { '[class]': '_cssClass()' }`

**Cleanup patterns:**

- Custom `DestroyedService` → `DestroyRef` + `takeUntilDestroyed()`
- `ngOnDestroy` only for `destroy$.next()` → remove entirely after migration

**Decorator cleanup:**

- Remove `standalone: true` (default in Angular 21+)
- Remove `allowSignalWrites: true` in `effect()` (deprecated)

**Imports:**

- Deprecated `*Module` classes → individual component/directive imports

**Member ordering** (ESLint enforced):

1. Decorated properties (any remaining `@Input`, `@Output`, `@ViewChild`)
2. Signal inputs/outputs (`input()`, `output()`, `model()`)
3. Public → Protected → Private fields
4. Constructor
5. Public → Protected → Private methods

### What NOT to migrate

Do NOT convert these — they should stay as-is:

- **RxJS for async operations**: HTTP calls, WebSocket streams, timers, interval-based logic → keep as Observable
- **BehaviorSubject with complex operators**: `switchMap`, `debounceTime`, `distinctUntilChanged`, `combineLatest` with async sources → keep as RxJS
- **Plain properties with no reactive consumer**: If nothing in template, host binding, computed, or effect reads it → keep as plain property, do not wrap in `signal()`
- **Signals for internal bookkeeping**: One-time flags, cached DOM measurements, counters with no reactive consumer → use plain property

## Phase 2: Present Plan

Output a structured migration plan:

```
## Migration Plan: [component name]

### Files affected
- path/to/component.ts
- path/to/component.html
- path/to/component.spec.ts

### Inputs / Outputs
| Current | Migration | Notes |
|---------|-----------|-------|
| `@Input() label: string` | `readonly label = input<string>('')` | |
| `@Input() disabled: boolean` | `readonly disabled = input(false, { transform: booleanAttribute })` | |
| `@Input() value` + `@Output() valueChange` | `readonly value = model<T>()` | Two-way binding |

### Host Bindings
| Current | Migration |
|---------|-----------|
| `@HostBinding('class.is-open')` | `host: { '[class.is-open]': 'isOpen()' }` |

### Template Changes
| Current | Migration |
|---------|-----------|
| `*ngIf="condition"` | `@if (condition) { ... }` |
| `*ngFor="let item of items"` | `@for (item of items; track item.id) { ... }` |

### State Management
| Current | Migration | Reason |
|---------|-----------|--------|
| `BehaviorSubject<boolean>` | `signal(false)` | Local state, no async consumers |

### Skipped (intentionally not migrated)
| Item | Reason |
|------|--------|
| `httpData$` Observable | Async HTTP stream |

### Test Updates
- [ ] Replace `component.input = value` with `fixture.componentRef.setInput('input', value)`
- [ ] Update module imports to individual components
- [ ] Verify existing tests still pass after migration

### Docs Updates
- [ ] Update examples if public API changed (input names, usage patterns)
- [ ] Ensure examples use individual imports, not deprecated modules

### Breaking Changes
- [ ] List any renamed/removed inputs or outputs
- [ ] Draft BREAKING CHANGE footer if needed
```

**Stop here and wait for approval before proceeding.**

## Phase 3: Execute

After approval:

1. Apply all migrations from the approved plan
2. Run build: `nx run <library>:build`
3. Run lint: `nx run <library>:lint`
4. Run tests: `nx run <library>:test --testfile=<spec-file> --skip-nx-cache`
5. Report results and any issues
