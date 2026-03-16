# Dependency Injection Patterns

> This document covers advanced dependency injection patterns for Angular 21+ development in Fundamental NGX.

## Table of Contents

- [Pattern 1: Contextual Defaults with InjectionTokens](#pattern-1-contextual-defaults-with-injectiontokens)
- [Pattern 2: Component Composition with InjectionTokens](#pattern-2-component-composition-with-injectiontokens)
- [Pattern 3: Programmatic Signal Input Updates](#pattern-3-programmatic-signal-input-updates)
- [Why Not @ContentChild with Signal Inputs?](#why-not-contentchild-with-signal-inputs)

---

## Pattern 1: Contextual Defaults with InjectionTokens

Use `InjectionToken` to provide contextual defaults for child components. This pattern allows parent components to influence default values without directly manipulating child component inputs.

### When to use

- Parent components need to provide default configurations to unknown child components
- Setting framework-level defaults (themes, sizes, behaviors)
- Avoiding tight coupling between parent and child components
- Providing optional configuration that children can override

### Implementation

**Step 1: Define the token (in child component file)**

```typescript
// title.component.ts
import { InjectionToken } from '@angular/core';

export type HeaderSizes = 1 | 2 | 3 | 4 | 5 | 6;

export const DEFAULT_TITLE_SIZE = new InjectionToken<HeaderSizes>('DEFAULT_TITLE_SIZE');
```

**Step 2: Child component injects optional default**

```typescript
@Component({
    selector: '[fd-title]'
})
export class Title {
    readonly headerSize = input<HeaderSizes | null>(null);

    private readonly _defaultHeaderSize = inject(DEFAULT_TITLE_SIZE, { optional: true });

    constructor() {
        effect(() => {
            // Priority: explicit input > injected default > element tag name
            const size = this.headerSize() ?? this._defaultHeaderSize ?? this._detectSize();
            this._applySize(size);
        });
    }

    private _detectSize(): HeaderSizes {
        // Fallback logic
        return 3;
    }
}
```

**Step 3: Parent provides the default**

```typescript
@Component({
    selector: 'fd-dialog-header',
    providers: [{ provide: DEFAULT_TITLE_SIZE, useValue: 5 }]
})
export class DialogHeader {
    // Any fd-title within this component will default to size 5
}
```

### Benefits

- ✅ No need to query and manipulate child components
- ✅ Type-safe dependency injection
- ✅ Works naturally with signal inputs
- ✅ Testable (mock the token in tests)
- ✅ Loosely coupled (parent doesn't need to know about child implementation)
- ✅ Children can opt-out by providing explicit values

### Best practices

- Always use `{ optional: true }` when injecting contextual defaults
- Document the token with JSDoc describing its purpose
- Export tokens from the component file for reusability
- Use descriptive token names (e.g., `DEFAULT_TITLE_SIZE` not `TITLE_CONFIG`)

---

## Pattern 2: Component Composition with InjectionTokens

Use `InjectionToken` for component composition and content queries to create loose coupling between parent and child components. This pattern allows querying for component roles rather than concrete implementations.

### Token Naming Conventions

- **Configuration tokens** (defaults, settings): Use descriptive names
    - `DEFAULT_TITLE_SIZE`, `DEFAULT_BUTTON_TYPE`
- **Component identity tokens** (for queries): Use `FD_` prefix
    - `FD_TITLE`, `FD_CARD_TITLE`, `FD_BUTTON`

### The Pattern

1. Create a token representing a component role (not implementation)
2. Register components/directives under that token using `providers`
3. Query for the token (not the concrete class) using `contentChild()` or `contentChildren()`

### Implementation

**Step 1: Define the token with interface**

```typescript
// Prefer simple InjectionToken over abstract classes
export const FD_CARD_TITLE = new InjectionToken<{ id: Signal<string> }>('FdCardTitle');
```

**Step 2: Component registers under the token**

```typescript
@Directive({
    selector: '[fd-card-title]',
    providers: [{ provide: FD_CARD_TITLE, useExisting: CardTitleDirective }]
})
export class CardTitleDirective {
    readonly id = input('fd-card-title-id-0');
}
```

**Step 3: Parent queries by token**

```typescript
@Component({ selector: 'fd-card-main-header' })
export class CardMainHeader {
    // Query by TOKEN, not by class - enables loose coupling
    readonly _cardTitle = contentChild(FD_CARD_TITLE);
}
```

**Usage in template:**

```html
<fd-card-main-header>
    <h2 fd-card-title>My Title</h2>
    <!-- Parent finds this via token -->
</fd-card-main-header>
```

### Provider Options

| Option        | Description                                           | When to use                |
| ------------- | ----------------------------------------------------- | -------------------------- |
| `useExisting` | Reference an already-instantiated component/directive | Most common for directives |
| `useClass`    | Create a new instance of the provided class           | Service factories          |
| `useValue`    | Use a specific value (object, string, number)         | Configuration values       |
| `useFactory`  | Use a factory function to create the value            | Complex initialization     |

### Multiple Implementations Example

```typescript
// Multiple controls register under the same token
export const FORM_CONTROL = new InjectionToken('FormControl');

@Component({
    selector: 'app-text-input',
    providers: [{ provide: FORM_CONTROL, useExisting: TextInput }]
})
export class TextInput {}

@Component({
    selector: 'app-checkbox',
    providers: [{ provide: FORM_CONTROL, useExisting: Checkbox }]
})
export class Checkbox {}

// Parent works with ANY control type
@Component({ selector: 'app-form-field' })
export class FormField {
    readonly control = contentChild(FORM_CONTROL); // Works with both!
}
```

### Why simple tokens over abstract classes

- ✅ No inheritance needed - components stay simple
- ✅ More flexible - any object with matching shape works
- ✅ Better testability - easy to provide mock objects
- ✅ Clearer intent - token defines contract, not implementation

---

## Pattern 3: Programmatic Signal Input Updates

When migrating from `@Input()` decorators to `input()` signals, you may encounter cases where external code needs to programmatically update a directive's input value. **Signal inputs are read-only** from outside the component.

### The Problem

```typescript
// Before migration - worked with @Input()
@Directive({ selector: '[fdContentDensity]' })
export class ContentDensityDirective {
    @Input() fdContentDensity: ContentDensityMode;
}

// External code could directly assign:
this._contentDensity.fdContentDensity = ContentDensityMode.COMPACT; // Worked!

// After migration - signal input is read-only
@Directive({ selector: '[fdContentDensity]' })
export class ContentDensityDirective {
    readonly fdContentDensity = input<ContentDensityMode>('');
}

// External code CANNOT assign:
this._contentDensity.fdContentDensity = ContentDensityMode.COMPACT; // ❌ Error!
```

### The Solution: Setter Method + Internal Signal

```typescript
@Directive({ selector: '[fdContentDensity]' })
export class ContentDensityDirective {
    // Signal input for template binding
    readonly fdContentDensity = input<ContentDensityMode | ''>('');

    // Private signal for programmatic updates
    private readonly _programmaticValue = signal<ContentDensityMode | null>(null);

    // Computed that combines both sources (programmatic takes priority)
    readonly effectiveValue = computed(() => {
        const programmatic = this._programmaticValue();
        if (programmatic !== null) {
            return programmatic;
        }
        return this.fdContentDensity() || this._defaultValue;
    });

    // Public method for programmatic updates
    setDensity(density: ContentDensityMode): void {
        this._programmaticValue.set(density);
    }

    // Optional: method to clear programmatic value and revert to input
    clearDensity(): void {
        this._programmaticValue.set(null);
    }
}

// External code uses the setter method:
this._contentDensity.setDensity(ContentDensityMode.COMPACT); // ✅ Works!
```

### When this pattern is needed

- Directives used via `hostDirectives` where parent needs to control the value
- Components that expose an API for programmatic state changes
- Migration scenarios where existing code relied on direct property assignment

### Alternative approaches

1. **Use a service/storage provider** - If multiple components need to share the value
2. **Use `model()` instead of `input()`** - If two-way binding is appropriate
3. **Use InjectionToken pattern** - If parent should provide defaults (see Pattern 1)

---

## Why Not @ContentChild with Signal Inputs?

When migrating components to signals, you may try to use `@ContentChild` to set default values for child component inputs. **This pattern no longer works with signal inputs.**

### The broken pattern

```typescript
// DOES NOT WORK - signal inputs are read-only from outside
@ContentChild(TitleComponent)
set title(titleComponent: TitleComponent) {
    if (titleComponent) {
        // ❌ Can't directly set signal inputs from outside the component
        titleComponent.headerSize = 5;  // This is read-only!

        // ❌ ComponentRef doesn't exist on queried components
        const componentRef = (titleComponent as any)._componentRef;  // undefined!
        componentRef.setInput('headerSize', 5);  // Crashes!
    }
}
```

### Why it doesn't work

1. **Signal inputs are read-only** - `input()` creates a read-only signal that can only be set by Angular's template binding system
2. **No ComponentRef on queries** - `@ContentChild` and `@ViewChild` return component instances, not `ComponentRef` objects
3. **Breaks encapsulation** - Parent should not reach into child internals
4. **Fragile** - Relies on internal Angular mechanisms that may change

### The correct approach: Use InjectionToken

```typescript
// Define token in child component file
export const DEFAULT_TITLE_SIZE = new InjectionToken<HeaderSizes>('DEFAULT_TITLE_SIZE');

// Parent provides the default
@Component({
    providers: [{ provide: DEFAULT_TITLE_SIZE, useValue: 5 }]
})
export class DialogHeader {}

// Child optionally injects and uses it
@Component({
    /* ... */
})
export class Title {
    readonly headerSize = input<HeaderSizes | null>(null);
    private readonly _defaultHeaderSize = inject(DEFAULT_TITLE_SIZE, { optional: true });

    constructor() {
        effect(() => {
            const size = this.headerSize() ?? this._defaultHeaderSize ?? this._fallback();
            this._applySize(size);
        });
    }
}
```

### Key principle

With signal inputs, the **child component is in control** of its own state. The parent provides context via DI, and the child decides what to do with it.
