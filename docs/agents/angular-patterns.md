# Angular 21+ Patterns - Detailed Reference

> This document provides detailed patterns and examples for Angular 21+ development in the Fundamental NGX project.

## Table of Contents

- [Signal Inputs, Outputs, and Models](#signal-inputs-outputs-and-models)
- [Computed Signals](#computed-signals)
- [LinkedSignal - Mutable Derived State](#linkedsignal---mutable-derived-state)
- [Effects](#effects)
- [Host Bindings](#host-bindings)
- [Queries](#queries)
- [Render Lifecycle Hooks](#render-lifecycle-hooks)
- [Resource API (Experimental)](#resource-api-experimental)
- [Migrating from CssClassBuilder](#migrating-from-cssclassbuilder)
- [Component Member Ordering](#component-member-ordering)

---

## Signal Inputs, Outputs, and Models

### input() - Read-only signal inputs

```typescript
// Optional with default value
readonly name = input<string>('');

// Required input (throws if not provided)
readonly id = input.required<string>();

// With transform function
readonly count = input(0, { transform: numberAttribute });
readonly disabled = input(false, { transform: booleanAttribute });

// Reading the value (call like a function)
const currentName = this.name();
```

### output() - Event emitters

```typescript
// Define outputs
readonly clicked = output<MouseEvent>();
readonly valueChange = output<string>();
readonly closed = output<void>();

// Emit events
this.clicked.emit(event);
this.valueChange.emit('new value');
this.closed.emit();
```

### model() - Two-way binding

```typescript
// Optional with default
readonly value = model<number>(0);

// Required model
readonly selected = model.required<boolean>();

// Update model value
this.value.set(10);
this.value.update(v => v + 1);

// In parent template:
<child [(value)]="parentValue" />
```

---

## Computed Signals

### Basic Usage

```typescript
protected readonly fullName = computed(() =>
    `${this.firstName()} ${this.lastName()}`
);

// Multiple dependencies
protected readonly total = computed(() =>
    this.price() * this.quantity()
);
```

### With Validation/Fallback

```typescript
protected readonly safeValue = computed(() => {
    const val = this.inputValue();
    if (!val || val < 0) return 0;
    return val;
});

// Enum validation
protected readonly validatedMode = computed(() => {
    const mode = this.mode();
    if (!Object.values(ValidModes).includes(mode)) {
        return ValidModes.DEFAULT;
    }
    return mode;
});
```

### CSS Class Building Pattern

```typescript
@Component({
    host: { '[class]': '_cssClass()' }
})
export class Example {
    readonly class = input<string>('');
    readonly emphasized = input(false);
    readonly size = input<'sm' | 'md' | 'lg'>('md');

    protected readonly _cssClass = computed(() => {
        const classes = ['fd-example'];

        if (this.emphasized()) {
            classes.push('fd-example--emphasized');
        }

        classes.push(`fd-example--${this.size()}`);

        const customClass = this.class();
        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });
}
```

---

## LinkedSignal - Mutable Derived State

Use `linkedSignal()` when you need local state that automatically resets when its source changes.

### Basic Usage

```typescript
export class EditableField {
    readonly initialValue = input('');

    // Resets when initialValue changes
    readonly editableValue = linkedSignal(() => this.initialValue());

    protected onEdit(value: string): void {
        this.editableValue.set(value); // Can mutate locally
    }

    protected reset(): void {
        this.editableValue.set(this.initialValue());
    }
}
```

### With Computation Function

```typescript
readonly density = linkedSignal({
    source: this._contextDensity,
    computation: (source) => {
        // Guard against undefined/null
        if (!source || typeof source !== 'string') {
            return ContentDensityMode.COZY;
        }
        return this._validate(source);
    }
});
```

### linkedSignal vs computed

| Feature           | `computed()`           | `linkedSignal()`                       |
| ----------------- | ---------------------- | -------------------------------------- |
| **Mutability**    | Read-only              | Writable with `.set()` / `.update()`   |
| **Use case**      | Derived display values | Editable form fields, resettable state |
| **Sync behavior** | Always in sync         | Resets when source changes             |

---

## Effects

### Basic Effect

```typescript
constructor() {
    effect(() => {
        if (this.isOpen()) {
            this.popoverElement()?.nativeElement.focus();
        } else {
            this.triggerElement()?.nativeElement.focus();
        }
    });
}
```

### Using untracked()

Read a signal's value without creating a dependency:

```typescript
effect(() => {
    const content = this.content(); // Tracked - effect re-runs when this changes
    const duration = untracked(this.animationDuration); // Not tracked
    this.animate(content, duration);
});
```

**Use cases for `untracked()`:**

- Reading configuration values that shouldn't trigger re-execution
- Logging/debugging without creating dependencies
- Breaking circular dependencies between signals
- Reading values during initialization

### Signal Writes in Effects

Signal writes are **allowed by default** in Angular 21+. The `allowSignalWrites` option is deprecated.

```typescript
// Correct - no options needed
effect(() => {
    const value = this.inputValue();
    if (value.length < 3) {
        this.validationError.set('Minimum 3 characters required');
    } else {
        this.validationError.set(null);
    }
});

// Deprecated - causes console warning
effect(
    () => {
        /* ... */
    },
    { allowSignalWrites: true }
); // Remove this option
```

**Important:** Prefer `computed()` over effects when deriving state:

```typescript
// PREFERRED - use computed() for derived state
readonly validationError = computed(() => {
    const value = this.inputValue();
    return value.length < 3 ? 'Minimum 3 characters required' : null;
});

// AVOID - using effect for derived state
readonly validationError = signal<string | null>(null);
effect(() => {
    this.validationError.set(
        this.inputValue().length < 3 ? 'Min 3 chars' : null
    );
});
```

### Replace Subject<void> with effect()

```typescript
// BEFORE - redundant Subject notification
set collapsed(value: boolean) {
    this.service.collapsed.set(value);
    this.service.visibilityChange.next();  // Redundant!
}
// Consumer: this.service.visibilityChange.subscribe(() => this.update());

// AFTER - effect reacts to signal directly
set collapsed(value: boolean) {
    this.service.collapsed.set(value);  // Just update the signal
}
// Consumer:
effect(() => {
    this.service.collapsed();  // Track signal
    this.update();             // React to change
});
```

---

## Host Bindings

All host interactions should be defined in the `host` property of the decorator:

```typescript
@Component({
    selector: 'fd-button',
    host: {
        // Static classes
        class: 'fd-button',

        // Dynamic class bindings
        '[class.fd-button--emphasized]': 'emphasized()',
        '[class.is-disabled]': 'disabled()',

        // Attribute bindings
        '[attr.aria-disabled]': 'disabled()',
        '[attr.role]': '"button"',
        '[attr.tabindex]': 'disabled() ? -1 : 0',

        // Style bindings
        '[style.width]': 'width()',
        '[style.display]': '"inline-block"',

        // Event listeners
        '(click)': 'handleClick($event)',
        '(keydown.enter)': 'handleEnter()',
        '(keydown.space)': 'handleSpace()'
    }
})
export class Button {
    readonly emphasized = input(false);
    readonly disabled = input(false);
    readonly width = input<string | null>(null);

    protected handleClick(event: MouseEvent): void {
        if (this.disabled()) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
```

**Why use `host` instead of decorators:**

- All host interactions in one place
- Better for tree-shaking and AOT compilation
- More declarative and easier to read
- Aligns with modern Angular patterns

---

## Queries

### viewChild / viewChildren

```typescript
// Query by template reference
readonly content = viewChild<ElementRef>('content');

// Query by component type
readonly header = viewChild(HeaderComponent);

// Query multiple
readonly panels = viewChildren(PanelComponent);

// Required (throws if not found)
readonly closeBtn = viewChild.required<ElementRef>('closeBtn');

// Usage - queries return signals, call with ()
protected expand(): void {
    const element = this.content()?.nativeElement;
    if (element) {
        element.style.maxHeight = element.scrollHeight + 'px';
    }
}
```

### contentChild / contentChildren

```typescript
// Query projected content
readonly tab = contentChild(TabComponent);
readonly tabs = contentChildren(TabComponent);

// With token
readonly title = contentChild(FD_CARD_TITLE);
```

### With read option

```typescript
// Get ViewContainerRef instead of component
readonly container = viewChild('outlet', { read: ViewContainerRef });

// Get ElementRef of a component
readonly input = viewChild(InputComponent, { read: ElementRef });
```

### Handling undefined

`contentChild()` returns `undefined`, not `null`. Use `?? null` when needed:

```typescript
// Type error - undefined not assignable to null
this.header()?.ariaControls.set(this.list()?.id());

// Correct - coerce undefined to null
this.header()?.ariaControls.set(this.list()?.id() ?? null);
```

**Best practices:**

- Queries are `undefined` until `AfterViewInit` / `AfterContentInit`
- Use `.required` when element must exist
- Access query results in lifecycle hooks or `effect()`
- Prefer querying by type or token over template references

---

## Render Lifecycle Hooks

### afterNextRender - One-time initialization

```typescript
constructor() {
    afterNextRender(() => {
        // Initialize chart library with DOM element
        this.initializeChart(this.elementRef.nativeElement);
    });
}
```

### afterRender - Every render (use sparingly)

```typescript
constructor() {
    afterRender(() => {
        // Update chart with new data
        this.updateChartData();
    });
}
```

### With phase option

```typescript
afterRender(
    () => {
        // Read phase - for DOM measurements
        const height = this.element.offsetHeight;
        this.measuredHeight.set(height);
    },
    { phase: AfterRenderPhase.Read }
);

afterRender(
    () => {
        // Write phase - for DOM modifications
        this.element.style.height = this.targetHeight() + 'px';
    },
    { phase: AfterRenderPhase.Write }
);
```

**Best practices:**

- Prefer `afterNextRender()` for one-time initialization
- Use `afterRender()` sparingly - it runs frequently
- Clean up subscriptions and listeners in `ngOnDestroy`
- Avoid heavy computations in these hooks

---

## Resource API (Experimental)

Angular 21 introduces experimental `resource()` API for async data fetching:

```typescript
export class UserProfile {
    readonly userId = input.required<string>();

    readonly userResource = resource({
        request: () => ({ id: this.userId() }),
        loader: async ({ request }) => {
            const response = await fetch(`/api/users/${request.id}`);
            return response.json();
        }
    });

    // Access data, loading, and error states
    readonly user = computed(() => this.userResource.value());
    readonly isLoading = computed(() => this.userResource.isLoading());
    readonly error = computed(() => this.userResource.error());
}
```

**When to use:**

- Fetching data based on signal inputs
- Automatic request cancellation when inputs change
- Built-in loading and error states
- Replacing custom BehaviorSubject + switchMap patterns

---

## Migrating from CssClassBuilder

### Before (deprecated pattern)

```typescript
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

@Component({ selector: 'fd-example' })
export class ExampleComponent implements CssClassBuilder {
    @Input() class: string;
    @Input() emphasized: boolean;

    @applyCssClass
    buildComponentCssClass(): string[] {
        return ['fd-example', this.emphasized ? 'fd-example--emphasized' : '', this.class];
    }

    ngOnChanges(): void {
        this.buildComponentCssClass();
    }
}
```

### After (Angular 21+ with signals)

```typescript
@Component({
    selector: 'fd-example',
    host: { '[class]': '_cssClass()' }
})
export class ExampleComponent {
    readonly class = input<string>('');
    readonly emphasized = input(false);

    protected readonly _cssClass = computed(() => {
        const classes: string[] = ['fd-example'];

        if (this.emphasized()) {
            classes.push('fd-example--emphasized');
        }

        const customClass = this.class();
        if (customClass) {
            classes.push(customClass);
        }

        return classes.join(' ');
    });
}
```

**Migration steps:**

1. Remove `CssClassBuilder` interface implementation
2. Remove `@applyCssClass` decorator and `buildComponentCssClass()` method
3. Convert `@Input()` properties to signal inputs using `input()`
4. Create a `computed()` signal that builds the CSS class string
5. Add `'[class]': '_cssClass()'` to the component's `host` property
6. Remove lifecycle hooks that only called `buildComponentCssClass()`
7. Remove `ChangeDetectorRef` if only used for manual change detection

---

## Component Member Ordering

Follow strict member ordering as enforced by `@typescript-eslint/member-ordering`:

```typescript
@Component({
    /* ... */
})
export class MyComponent {
    // 1. Decorated properties first
    @Input() displayValue = true;
    @Output() valueChange = new EventEmitter<string>();
    @ViewChild('template') template: TemplateRef<any>;

    // 2. Signal inputs/outputs (created with input()/output()/model())
    readonly minuteStep = input<number>(1);
    readonly itemSelected = output<string>();

    // 3. Other instance fields - PUBLIC first
    activeView: string = 'default';

    // 4. PROTECTED fields after public
    protected readonly items: string[] = [];
    protected readonly _service = inject(MyService);

    // 5. PRIVATE fields last
    private readonly _cache: Map<string, any>;
    private readonly _elementRef = inject(ElementRef);

    // 6. Constructor
    constructor() {}

    // 7. Public methods
    getValue(): string {}

    // 8. Protected methods
    protected handleClick(): void {}

    // 9. Private methods last
    private _computeValue(): void {}
}
```

**Critical rules:**

- Protected members MUST come before private members
- Signal inputs (`input()`, `output()`, `model()`) go after decorated properties
- Regular Signal properties (not created with `input()`) go in "Other instance fields"
