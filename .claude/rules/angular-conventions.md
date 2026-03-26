---
paths: ['libs/**/*.ts']
alwaysApply: false
---

# Angular 21+ Conventions (fundamental-ngx)

## Quick Decision Guide

| Scenario                                  | Solution                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------ |
| Local component state                     | `signal()`                                                                     |
| Derived state (read-only)                 | `computed()`                                                                   |
| Derived state (resettable/editable)       | `linkedSignal()`                                                               |
| Reacting to signal changes (side effects) | `effect()`                                                                     |
| Component input                           | `input()` for new code; `@Input()` fine in existing code                       |
| Component output                          | `output()` for new code; `@Output()` fine in existing code                     |
| Two-way binding                           | `model()`                                                                      |
| Host bindings / listeners                 | `host: {}` in decorator (not `@HostBinding`/`@HostListener`)                   |
| DOM queries                               | `viewChild()` / `viewChildren()` / `contentChild()` / `contentChildren()`      |
| DOM manipulation after render             | `afterNextRender()` (one-time) / `afterRender()` (every render, use sparingly) |
| Async operations (HTTP, streams)          | RxJS Observables                                                               |
| Cleanup                                   | `DestroyRef` + `takeUntilDestroyed()`                                          |
| Signal vs plain property                  | Only `signal()` if a reactive consumer exists                                  |

## New Code vs Existing Code

- **New components/directives/pipes**: use `input()`, `output()`, `model()`, `computed()`, `host: {}`.
- **Existing code**: both decorator-style (`@Input`, `@Output`, `@HostBinding`) and signal-style are fine.
- **When modifying existing `@Input()`/`@Output()`**: prefer migrating to signal functions if the change is already in scope, but don't refactor just for the sake of it.

## Component Structure

```typescript
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
    // 1. Decorated properties (@Input, @Output, @ViewChild -- in existing code)
    // 2. Signal inputs/outputs
    readonly label = input<string>('');
    readonly disabled = input(false, { transform: booleanAttribute });
    readonly clicked = output<MouseEvent>();

    // 3. Public fields
    // 4. Protected fields (computed, injected services for template)
    protected readonly _cssClass = computed(() => {
        const classes = ['fd-example'];
        if (this.disabled()) classes.push('fd-example--disabled');
        return classes.join(' ');
    });

    // 5. Private fields
    private readonly _elementRef = inject(ElementRef);

    // 6. Constructor
    // 7. Public -> Protected -> Private methods
}
```

**Member ordering** (ESLint enforced): decorated props, then signal inputs/outputs, then public, then protected, then private. Protected always before private.

## CSS Class Building

Replace `CssClassBuilder` + `@applyCssClass` with `computed()` + `host`:

```typescript
host: { '[class]': '_cssClass()' }

protected readonly _cssClass = computed(() => {
    const classes = ['fd-example'];
    if (this.emphasized()) classes.push('fd-example--emphasized');
    classes.push(`fd-example--${this.size()}`);
    if (this.class()) classes.push(this.class());
    return classes.join(' ');
});
```

## Effects

- Signal writes in effects work by default -- do not pass `allowSignalWrites` (the option no longer exists).
- Prefer `computed()` over `effect()` for derived state.
- Use `untracked()` to read signals without creating dependencies.

```typescript
effect(() => {
    const content = this.content(); // tracked
    const duration = untracked(this.duration); // not tracked
    this.animate(content, duration);
});
```

## linkedSignal

Use when you need local mutable state that resets when its source changes:

```typescript
readonly editableValue = linkedSignal(() => this.initialValue());
// Can .set() / .update() locally; resets when initialValue changes
```

## Zoneless Migration

The codebase is migrating toward zoneless change detection. For new code:

- Use `OnPush` change detection strategy.
- Rely on signals for state -- they notify the framework automatically.
- Avoid `ChangeDetectorRef.markForCheck()` when using signals.

## Don't

- Don't add `standalone: true` -- it's the default since Angular 19.
- Don't use `*ngIf` / `*ngFor` / `*ngSwitch` -- use `@if` / `@for` / `@switch`.
- Don't use `ngClass` / `ngStyle` -- use direct `class` / `style` bindings.
- Don't use custom `DestroyedService` -- use `DestroyRef` + `takeUntilDestroyed()`.
- Don't use `signal.set()` then `markForCheck()` when the signal is read in the template -- Angular tracks it automatically. `markForCheck()` is still valid when you need to trigger change detection outside of a template-consumed signal.
