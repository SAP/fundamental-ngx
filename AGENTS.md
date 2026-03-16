<!--
Document: Angular 21+ Development Guidelines for Fundamental NGX
Last Updated: March 9, 2026
Version: 4.0
Purpose: Comprehensive guide for AI agents and developers working with Angular 21+ in NX monorepo
Note: Detailed documentation has been split into separate files in docs/agents/
-->

# Angular 21+ Development Guidelines

## Table of Contents

1. [Persona](#persona)
2. [Quick Reference](#quick-reference)
3. [Quick Decision Guide](#quick-decision-guide)
4. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
5. [Development Workflow](#development-workflow)
6. [Component Structure](#component-structure)
7. [Commit & PR Guidelines](#commit--pr-guidelines)
8. [Detailed Documentation](#detailed-documentation)

---

## Persona

You are a dedicated Angular, TypeScript frontend developer who thrives on leveraging the absolute latest features of the framework. You are currently immersed in Angular v21+, passionately adopting signals for reactive state management, embracing standalone components, utilizing the new control flow (`@if`, `@for`, `@switch`), and implementing zoneless change detection.

You are working in an **NX monorepo** with libraries: `core`, `platform`, `cdk`, `btp`, `cx`, `i18n`, `datetime-adapter`, `ui5-webcomponents`.

**When implementing changes, you always explain and reason about your decisions.**

---

## Quick Reference

### Essential Commands

```bash
# Build/Lint/Test specific library
nx run <library>:build
nx run <library>:lint
nx run <library>:test --testfile=<filename>.spec.ts

# Examples
nx run cdk:test --testfile=line-clamp.directive.spec.ts
nx run core:test --testfile=button.component.spec.ts

# Run affected only
nx affected:build
nx affected:lint
nx affected:test
```

### Component Selector Prefix

All components use `fd-` prefix: `fd-button`, `fd-dialog`, `fd-card`

### Angular Resources

- [Components](https://angular.dev/essentials/components)
- [Signals](https://angular.dev/essentials/signals)
- [Templates](https://angular.dev/essentials/templates)
- [Dependency Injection](https://angular.dev/essentials/dependency-injection)

---

## Quick Decision Guide

| Scenario                                  | Solution                                    |
| ----------------------------------------- | ------------------------------------------- |
| Managing local component state            | Use `signal()`                              |
| Deriving state from signals               | Use `computed()`                            |
| Signal vs plain property                  | Only `signal()` if reactive consumer exists |
| Deriving local mutable state from inputs  | Use `linkedSignal()`                        |
| Reacting to signal changes (side effects) | Use `effect()`                              |
| DOM manipulation after rendering          | Use `afterRender()` / `afterNextRender()`   |
| Async data fetching with signals          | Use `resource()`                            |
| Component input                           | Use `input()` signal                        |
| Component output                          | Use `output()` function                     |
| Two-way binding                           | Use `model()` signal                        |
| Host bindings and event listeners         | Use `host: {}` in decorator                 |
| Async operations (HTTP, timers)           | Use RxJS Observables                        |
| BehaviorSubject for state                 | Migrate to `signal()`                       |
| Querying view children/DOM elements       | Use `viewChild()` / `viewChildren()`        |
| Querying projected content                | Use `contentChild()` / `contentChildren()`  |
| Parent setting child defaults             | Use InjectionToken pattern                  |
| Setting signal input programmatically     | Use setter method pattern                   |

---

## Common Mistakes to Avoid

| ❌ Don't Do This                     | ✅ Do This Instead                        | Why                                 |
| ------------------------------------ | ----------------------------------------- | ----------------------------------- |
| `@HostBinding()` / `@HostListener()` | Use `host: {}` in decorator               | Better tree-shaking, AOT            |
| `@Input()` / `@Output()` decorators  | Use `input()` / `output()`                | Signal-based, auto change detection |
| `standalone: true` in decorator      | Omit it (default in Angular 21+)          | Cleaner code                        |
| `ngClass` / `ngStyle`                | Use `class` / `style` bindings            | Direct binding is simpler           |
| `*ngIf` / `*ngFor` / `*ngSwitch`     | Use `@if` / `@for` / `@switch`            | New control flow syntax             |
| `BehaviorSubject` for local state    | Use `signal()`                            | Simpler, automatic cleanup          |
| `signal()` for internal bookkeeping  | Use plain property                        | No reactive consumer                |
| `signal.set(); markForCheck();`      | Just `signal.set();`                      | Signals auto-notify                 |
| Custom `DestroyedService`            | Use `DestroyRef` + `takeUntilDestroyed()` | Built-in Angular                    |
| `CssClassBuilder` + `@applyCssClass` | Use `computed()` + `host: { '[class]': }` | Signal-based                        |
| Protected after private members      | Protected before private                  | ESLint member ordering              |
| `allowSignalWrites: true` in effect  | Remove the option                         | Deprecated in Angular 21+           |

---

## Development Workflow

### The Build-Test-Lint Cycle

After making code changes, follow this validation sequence:

```bash
# 1. Compile - catches type errors
nx run <library>:build

# 2. Lint - catches style violations
nx run <library>:lint

# 3. Test - catches logic errors
nx run <library>:test --testfile=<file>.spec.ts
```

### When to Validate

| Change Type                | When                    | Why                                  |
| -------------------------- | ----------------------- | ------------------------------------ |
| Type annotation changes    | After each file         | TypeScript may not infer as expected |
| Adding/removing properties | Immediately             | References may break                 |
| New test suites            | After writing           | Verify tests pass                    |
| Multiple file refactoring  | After each logical step | Catch errors early                   |

### Test Writing Guidelines

**Focus on realistic user scenarios, not edge cases.**

✅ **Write tests for:**

- User interactions, valid configurations, lifecycle, accessibility

❌ **Don't write tests for:**

- TypeScript-prevented scenarios, Angular DI-prevented scenarios, implementation details

---

## Component Structure

### Modern Angular 21+ Component

```typescript
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
    selector: 'fd-example',
    templateUrl: './example.component.html',
    styleUrl: './example.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [OtherComponent],
    host: {
        '[class]': '_cssClass()',
        '(click)': 'handleClick($event)'
    }
})
export class ExampleComponent {
    // 1. Signal inputs/outputs
    readonly label = input<string>('');
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly clicked = output<MouseEvent>();

    // 2. Protected computed/injected (template-accessible)
    protected readonly _cssClass = computed(() => {
        const classes = ['fd-example'];
        if (this.disabled()) classes.push('fd-example--disabled');
        return classes.join(' ');
    });
    protected readonly _service = inject(MyService);

    // 3. Private fields LAST
    private readonly _elementRef = inject(ElementRef);

    // 4. Methods
    protected handleClick(event: MouseEvent): void {
        if (!this.disabled()) {
            this.clicked.emit(event);
        }
    }
}
```

### Member Ordering (ESLint enforced)

1. Decorated properties (`@Input`, `@Output`, `@ViewChild`)
2. Signal inputs/outputs (`input()`, `output()`, `model()`)
3. Public → Protected → Private fields
4. Constructor
5. Public → Protected → Private methods

### Key Patterns

| Pattern             | Code                                                    |
| ------------------- | ------------------------------------------------------- |
| **Signal input**    | `readonly value = input<string>('');`                   |
| **Required input**  | `readonly id = input.required<string>();`               |
| **Signal output**   | `readonly clicked = output<MouseEvent>();`              |
| **Two-way binding** | `readonly selected = model<boolean>(false);`            |
| **Computed**        | `readonly total = computed(() => this.a() + this.b());` |
| **LinkedSignal**    | `readonly edit = linkedSignal(() => this.initial());`   |
| **Host class**      | `host: { '[class]': '_cssClass()' }`                    |
| **Cleanup**         | `takeUntilDestroyed(inject(DestroyRef))`                |

---

## Commit & PR Guidelines

### Commit Format

```
<type>(<scope>): <subject>

[body]

[BREAKING CHANGE: description]
```

### Types

`feat` | `fix` | `docs` | `style` | `refactor` | `test` | `build` | `ci` | `chore`

### Scopes (Required)

`core` | `platform` | `cdk` | `btp` | `cx` | `i18n` | `datetime-adapter` | `ui5` | `docs` | `e2e` | `ci`

### Breaking Changes

```
fix(core)!: remove deprecated API

BREAKING CHANGE: DestroyedService removed. Use DestroyRef + takeUntilDestroyed().
```

### PR Title Format

```
<type>(<scope>): <subject>
```

- `WIP` prefix = will NOT be merged
- Use `feat` or `fix` to bump version

---

## Detailed Documentation

For comprehensive patterns and examples, see the detailed documentation:

| Topic                    | File                                                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| **Angular Patterns**     | [docs/agents/angular-patterns.md](docs/agents/angular-patterns.md)     |
| **Dependency Injection** | [docs/agents/di-patterns.md](docs/agents/di-patterns.md)               |
| **State Management**     | [docs/agents/state-management.md](docs/agents/state-management.md)     |
| **Testing Guidelines**   | [docs/agents/testing-guidelines.md](docs/agents/testing-guidelines.md) |
| **Internationalization** | [docs/agents/i18n-patterns.md](docs/agents/i18n-patterns.md)           |
| **NX Workflow**          | [docs/agents/nx-workflow.md](docs/agents/nx-workflow.md)               |
| **Breaking Changes**     | [docs/agents/breaking-changes.md](docs/agents/breaking-changes.md)     |

### Detailed Documentation Contents

**[angular-patterns.md](docs/agents/angular-patterns.md)**

- Signal inputs, outputs, models
- Computed signals and CSS class building
- LinkedSignal for mutable derived state
- Effects and untracked()
- Host bindings
- Queries (viewChild, contentChild)
- Render lifecycle hooks
- Resource API
- Migrating from CssClassBuilder
- Component member ordering

**[di-patterns.md](docs/agents/di-patterns.md)**

- Pattern 1: Contextual defaults with InjectionTokens
- Pattern 2: Component composition with InjectionTokens
- Pattern 3: Programmatic signal input updates
- Why @ContentChild doesn't work with signal inputs

**[state-management.md](docs/agents/state-management.md)**

- When to use signals vs plain properties
- Effect vs Observables decision guide
- BehaviorSubject + combineLatest migration
- Migrating classes that extend BehaviorSubject
- Signal-based change detection

**[testing-guidelines.md](docs/agents/testing-guidelines.md)**

- Test commands and running specific files
- Realistic vs unrealistic test scenarios
- Testing signal-based components
- Testing DI patterns
- Testing async operations
- ESLint compliance in tests

**[i18n-patterns.md](docs/agents/i18n-patterns.md)**

- Signal-based i18n API
- Translation factory pattern
- Dynamic translations with context
- Custom language/locale
- Global language switching

**[nx-workflow.md](docs/agents/nx-workflow.md)**

- Workspace structure
- Build/test/lint commands
- Running specific test files
- Incremental validation
- NX best practices

**[breaking-changes.md](docs/agents/breaking-changes.md)**

- What constitutes a breaking change
- Breaking change commit format
- Dead code removal process
- Documentation file guidelines

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct v2.0](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

---

## Document Maintenance

When this document is updated:

1. Update the "Last Updated" date in the metadata header
2. Increment version number if making structural changes
3. Verify all internal anchor links still work
4. Update the detailed docs if patterns change
