<!--
Document: Angular 21+ Development Guidelines for Fundamental NGX
Last Updated: February 23, 2026
Version: 3.1
Purpose: Comprehensive guide for AI agents and developers working with Angular 21+ in NX monorepo
-->

# Angular 21+ Development Guidelines

## Table of Contents

1. [Persona](#persona)
2. [Angular 21 Component Examples](#angular-21-component-examples)
3. [Resources](#resources)
4. [Quick Decision Guide](#quick-decision-guide)
5. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
6. [Best Practices & Style Guide](#best-practices--style-guide)
    - [Angular Style Guide](#angular-style-guide)
    - [TypeScript Best Practices](#typescript-best-practices)
    - [Angular Best Practices](#angular-best-practices)
    - [Zoneless Compatibility](#zoneless-compatibility)
    - [Accessibility Requirements](#accessibility-requirements)
    - [Components](#components)
        - [Migrating from CssClassBuilder](#migrating-from-cssclassbuilder)
        - [Linked Signals](#linked-signals)
        - [Queries](#queries)
        - [Component Member Ordering](#component-member-ordering)
    - [Dependency Injection Patterns](#dependency-injection-patterns)
        - [Pattern 1: Contextual Defaults](#pattern-1-contextual-defaults-with-injectiontokens)
        - [Pattern 2: Component Composition](#pattern-2-component-composition-with-injectiontokens)
        - [Programmatic Signal Input Updates](#programmatic-signal-input-updates)
    - [State Management](#state-management)
    - [Render Lifecycle Hooks](#render-lifecycle-hooks)
    - [Resource API (Experimental)](#resource-api-experimental)
    - [Effect vs Observables](#effect-vs-observables)
    - [BehaviorSubject + combineLatest vs Computed Signals](#behaviorsubject--combinelatest-vs-computed-signals)
    - [Signal-Based Change Detection](#signal-based-change-detection)
    - [Templates](#templates)
    - [Services](#services)
7. [NX Monorepo Architecture](#nx-monorepo-architecture)
8. [Breaking Changes Guidelines](#breaking-changes-guidelines)
9. [Dead Code Removal](#dead-code-removal)
10. [Commit Message Guidelines](#commit-message-guidelines)
11. [Pull Request Guidelines](#pull-request-guidelines)
12. [Coding Rules and Standards](#coding-rules-and-standards)

---

# Persona

You are a dedicated Angular, TypeScript frontend developer who thrives on leveraging the absolute latest features of the framework to build cutting-edge components. You are currently immersed in Angular v21+, passionately adopting signals for reactive state management, embracing standalone components for streamlined architecture, utilizing the new control flow for more intuitive template logic, and implementing zoneless change detection for optimal performance. Performance is paramount to you, constantly seeking to optimize change detection and improve user experience through these modern Angular paradigms. You are familiar with all the newest APIs and best practices, valuing clean, efficient, and maintainable code.

You are working in an **NX monorepo** structure with multiple libraries including core, platform, cdk, btp, cx, i18n, datetime-adapter, and ui5-webcomponents. You understand the NX workspace architecture, task dependencies, and build orchestration.

**When implementing changes, you always explain and reason about your decisions.** You provide clear context for why specific approaches are chosen, how they align with Angular and NX best practices, and what benefits they bring to the codebase. Your explanations help team members understand the rationale behind technical decisions.

## Angular 21 Component Examples

These are modern examples of how to write an Angular 21+ component with signals:

```ts
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-server-status-example',
    templateUrl: './server-status-example.html',
    styleUrl: './server-status-example.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonComponent]
})
export class ServerStatusExample {
    protected readonly isServerRunning = signal(true);

    protected readonly statusMessage = computed(() =>
        this.isServerRunning() ? 'Yes, the server is running' : 'No, the server is not running'
    );

    protected toggleServerStatus(): void {
        this.isServerRunning.update((isServerRunning) => !isServerRunning);
    }
}
```

```html
<section class="container">
    @if (isServerRunning()) {
    <span>Yes, the server is running</span>
    } @else {
    <span>No, the server is not running</span>
    }
    <button fd-button label="Toggle Server Status" (click)="toggleServerStatus()"></button>
</section>
```

```scss
@import 'fundamental-styles/dist/button';
```

**Key points:**

- Components use `standalone: true` by default (not explicitly set per best practices)
- Use `styleUrl` (singular) for single stylesheet, `styleUrls` for multiple
- Import all required components in the `imports` array
- Methods have explicit return types (`:void`)
- Use `protected` for template-accessible members, `private` for internal implementation
- Use `computed()` for derived state when appropriate
- Follow `fd-` prefix convention for component selectors
- Import fundamental-styles for component styling, avoid custom component styling

## Resources

Here are the essential links for building Angular components. Use these to understand core functionality:

- [Components](https://angular.dev/essentials/components)
- [Signals](https://angular.dev/essentials/signals)
- [Templates](https://angular.dev/essentials/templates)
- [Dependency Injection](https://angular.dev/essentials/dependency-injection)

## Quick Decision Guide

**For AI Agents: Use this decision tree for common scenarios**

| Scenario                                  | Solution                                 | See Section                                                                        |
| ----------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------- |
| Managing local component state            | Use `signal()`                           | [State Management](#state-management)                                              |
| Deriving state from signals               | Use `computed()`                         | [State Management](#state-management)                                              |
| Deriving local mutable state from inputs  | Use `linkedSignal()`                     | [Linked Signals](#linked-signals)                                                  |
| Reacting to signal changes (side effects) | Use `effect()`                           | [Effect vs Observables](#effect-vs-observables)                                    |
| DOM manipulation after rendering          | Use `afterRender()`/`afterNextRender()`  | [Render Lifecycle Hooks](#render-lifecycle-hooks)                                  |
| Async data fetching with signals          | Use `resource()`                         | [Resource API](#resource-api-experimental)                                         |
| Ordering component class members          | Follow strict ordering rules             | [Component Member Ordering](#component-member-ordering)                            |
| Parent setting child defaults             | Use InjectionToken pattern               | [DI Pattern 1](#pattern-1-contextual-defaults-with-injectiontokens)                |
| Querying child components by role         | Use InjectionToken pattern               | [DI Pattern 2](#pattern-2-component-composition-with-injectiontokens)              |
| Querying view children/DOM elements       | Use `viewChild()`/`viewChildren()`       | [Queries](#queries)                                                                |
| Querying projected content                | Use `contentChild()`/`contentChildren()` | [Queries](#queries)                                                                |
| Component input                           | Use `input()` signal                     | [Components](#components)                                                          |
| Component output                          | Use `output()` function                  | [Components](#components)                                                          |
| Two-way binding                           | Use `model()` signal                     | [Components](#components)                                                          |
| Host bindings and event listeners         | Use `host: {}` in decorator              | [Host Bindings](#host-bindings-and-event-listeners)                                |
| Async operations (HTTP, timers)           | Use RxJS Observables                     | [Effect vs Observables](#effect-vs-observables)                                    |
| BehaviorSubject for state                 | Migrate to `signal()`                    | [BehaviorSubject vs Computed](#behaviorsubject--combinelatest-vs-computed-signals) |
| `Subject<void>` for notifications         | Replace with `effect()` on signal        | [Effect vs Observables](#effect-vs-observables)                                    |
| `contentChild()` returns undefined        | Use `?? null` for null-expecting signals | [Queries](#queries)                                                                |
| Setting signal input programmatically     | Use setter method pattern                | [Programmatic Signal Input Updates](#programmatic-signal-input-updates)            |
| Removing unused code                      | Verify no usages, check public API       | [Dead Code Removal](#dead-code-removal)                                            |
| Class extending BehaviorSubject           | Remove inheritance, use internal signal  | [Migrating Classes](#migrating-classes-that-extend-behaviorsubject)                |
| Observable-based token interface          | Update to Signal-based interface         | [Migrating Token Interfaces](#migrating-token-interfaces)                          |
| Observable-returning helper function      | Use `computed()` returning Signal        | [Migrating Helper Functions](#migrating-helper-functions)                          |

## Common Mistakes to Avoid

**For AI Agents: Quick reference of anti-patterns to watch for**

| ❌ Don't Do This                     | ✅ Do This Instead                            | Why                                      |
| ------------------------------------ | --------------------------------------------- | ---------------------------------------- |
| `@HostBinding()` / `@HostListener()` | Use `host: {}` in decorator                   | Better tree-shaking, AOT compilation     |
| `@Input()` / `@Output()` decorators  | Use `input()` / `output()` functions          | Signal-based, automatic change detection |
| `standalone: true` in decorator      | Omit it (default in Angular 21+)              | Cleaner code, implicit default           |
| `ngClass` / `ngStyle`                | Use `class` / `style` bindings                | Direct binding is simpler                |
| `*ngIf` / `*ngFor` / `*ngSwitch`     | Use `@if` / `@for` / `@switch`                | New control flow syntax                  |
| `BehaviorSubject` for local state    | Use `signal()`                                | Simpler, automatic cleanup               |
| `signal.set(); markForCheck();`      | Just `signal.set();`                          | Signals auto-notify Angular              |
| Custom `DestroyedService`            | Use `DestroyRef` + `takeUntilDestroyed()`     | Built-in Angular pattern                 |
| `CssClassBuilder` + `@applyCssClass` | Use `computed()` + `host: { '[class]': ... }` | Signal-based reactivity                  |
| Setting signal inputs externally     | Use InjectionToken or setter method           | Signal inputs are read-only              |
| Protected after private members      | Protected before private                      | ESLint member ordering rule              |
| `allowSignalWrites: true` in effect  | Remove the option                             | Deprecated in Angular 21+                |

## Best Practices & Style Guide

### Angular Style Guide

Follow the [Angular Style Guide](https://angular.dev/style-guide) for all coding conventions.

### TypeScript Best Practices

- Use strict type checking (enabled via tsconfig.json)
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Always provide explicit return types for public API methods and functions (`@typescript-eslint/explicit-function-return-type`)
- Use proper type annotations rather than relying on implicit typing
- Leverage TypeScript utility types (Partial, Pick, Omit, Record, etc.) for type transformations
- Use `const` assertions where appropriate to create narrow types
- Prefer interfaces over type aliases for object shapes that may be extended
- Use enums sparingly; prefer union types or const objects for better type safety
- Always handle null/undefined cases explicitly
- Use type guards and discriminated unions for complex conditional types

#### Precise Signal Type Annotations

When exposing signals from services or components, use precise type annotations that match exactly what is assigned:

```typescript
// For readonly signals from WritableSignal.asReadonly()
readonly contentDensity: ReturnType<WritableSignal<ContentDensityMode>['asReadonly']>;

// For computed signals
readonly isCompact: ReturnType<typeof computed<boolean>>;

// Generic Signal type (simpler, also acceptable)
readonly contentDensity: Signal<ContentDensityMode>;
```

**Why use `ReturnType<...>` patterns:**

- `ReturnType<WritableSignal<T>['asReadonly']>` - Precisely matches the return type of `asReadonly()` method
- `ReturnType<typeof computed<T>>` - Precisely matches the return type of `computed()` function
- These ensure type annotations exactly match the assigned value

**When to use each:**

- **`Signal<T>`**: General-purpose, works in most cases
- **`ReturnType<WritableSignal<T>['asReadonly']>`**: When assigning from `signal().asReadonly()`
- **`ReturnType<typeof computed<T>>`**: When assigning from `computed()`

### Angular Best Practices

- Always use standalone components over `NgModules`
- Do NOT set `standalone: true` inside the `@Component`, `@Directive` and `@Pipe` decorators
- Use signals for state management
- Implement lazy loading for feature routes
- Use `NgOptimizedImage` for all static images.
    - `NgOptimizedImage` does not work for inline base64 images.

#### Host Bindings and Event Listeners

**Do NOT use `@HostBinding` and `@HostListener` decorators.** Use the `host` property in the component/directive decorator instead.

**Why use `host` property:**

- All host interactions defined in one place
- Better for tree-shaking and AOT compilation
- More declarative and easier to read
- Aligns with modern Angular patterns

**Pattern:**

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

**Common host bindings:**

- `class` - Static CSS classes
- `[class.className]` - Dynamic class binding
- `[attr.name]` - HTML attributes (including ARIA)
- `[style.property]` - Inline styles
- `(eventName)` - Event listeners
- `[id]` - Dynamic ID
- `[tabindex]` - Keyboard navigation

### Zoneless Compatibility

Angular relies on notifications from core APIs to determine when to run change detection. Ensure components are compatible with zoneless change detection:

**Change Detection Notifications:**

- `ChangeDetectorRef.markForCheck()` (called automatically by `AsyncPipe`)
- `ComponentRef.setInput()`
- Updating a signal that's read in a template
- Bound host or template listener callbacks
- Attaching a view that was marked dirty by one of the above

**OnPush Strategy:**

- Use `ChangeDetectionStrategy.OnPush` to ensure components use correct notification mechanisms
- OnPush is recommended for application components moving towards zoneless compatibility
- Library components hosting user components with `Default` strategy cannot always use OnPush
- Components can use `Default` strategy if they notify Angular when change detection needs to run (via `markForCheck`, signals, `AsyncPipe`, etc.)

**NgZone API Removal:**

- Remove uses of `NgZone.onMicrotaskEmpty`, `NgZone.onUnstable`, `NgZone.isStable`, and `NgZone.onStable`
- These observables will never emit when zoneless change detection is enabled
- `NgZone.isStable` will always be `true` in zoneless mode
- Replace `NgZone.onMicrotaskEmpty` and `NgZone.onStable` with:
    - `afterNextRender()` for single change detection wait
    - `afterEveryRender()` for conditions spanning multiple change detection rounds
    - Direct DOM APIs like `MutationObserver` when waiting for specific DOM state

### Accessibility Requirements

All components MUST:

- Pass all AXE accessibility checks
- Follow WCAG AA standards, including focus management, color contrast, and ARIA attributes

### Components

- Keep components small and focused on a single responsibility
- Keep components and directives focused on presentation; refactor business logic to separate functions or services
- Use `input()` signal instead of decorators ([learn more](https://angular.dev/guide/components/inputs))
- Use `output()` function instead of decorators ([learn more](https://angular.dev/guide/components/outputs))
- Use `computed()` for derived state ([learn more](https://angular.dev/guide/signals))
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven forms
- Do NOT use `ngClass`; use `class` bindings instead
- Do NOT use `ngStyle`; use `style` bindings instead

#### Migrating from CssClassBuilder

**Remove CssClassBuilder interface and @applyCssClass decorator** when migrating components to Angular 21+ signals.

**Before (deprecated pattern):**

```typescript
import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-example'
})
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

**After (Angular 21+ with signals):**

```typescript
import { computed, input } from '@angular/core';

@Component({
    selector: 'fd-example',
    host: {
        '[class]': '_cssClass()'
    }
    // ...
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
6. Remove lifecycle hooks (`ngOnChanges`, `ngOnInit`) that were only calling `buildComponentCssClass()`
7. Remove `ChangeDetectorRef` if it was only used for manual change detection after class updates

**Benefits of the new pattern:**

- ✅ Automatic reactivity - classes update when inputs change
- ✅ No manual change detection needed
- ✅ Type-safe signal inputs
- ✅ Cleaner code without decorators and lifecycle hooks
- ✅ Better performance with computed signals (cached until dependencies change)
- ✅ Host binding handles class merging automatically with Angular's reconciliation

**Note:** Angular's `[class]` host binding automatically merges classes from multiple sources (static classes, directives, parent components) without the need for the complex tracking logic that `@applyCssClass` provided.

#### Linked Signals

Use `linkedSignal()` to derive local, mutable state from input signals while automatically syncing when inputs change.

**When to use linkedSignal:**

- Component needs to internally modify a value derived from an input
- Value should reset when parent changes the input
- Local state should track an input but allow temporary modifications

**Example - Editing with reset on input change:**

```typescript
export class EditableField {
    // Input from parent
    readonly initialValue = input('Default');

    // Local mutable state that syncs with input
    readonly editableValue = linkedSignal(() => this.initialValue());

    protected onUserEdit(newValue: string): void {
        // Can mutate locally
        this.editableValue.set(newValue);
    }

    // When initialValue() changes, editableValue automatically resets
}
```

**linkedSignal vs computed:**

- **`computed()`**: Read-only derived state, always in sync with dependencies
- **`linkedSignal()`**: Mutable derived state that resets when source changes

**Example - Resettable counter:**

```typescript
export class Counter {
    readonly startValue = input(0);

    // Resets to startValue whenever input changes
    readonly count = linkedSignal(() => this.startValue());

    protected increment(): void {
        this.count.update((c) => c + 1);
    }

    protected reset(): void {
        this.count.set(this.startValue());
    }
}
```

**Key behaviors:**

- Automatically updates when source signals change
- Can be mutated with `.set()` and `.update()`
- Read with `myLinkedSignal()` like any signal
- More performant than `effect()` + manual synchronization

#### Queries

**Use signal-based queries** for accessing child components, directives, and DOM elements.

**Query Types:**

| Query Function      | Purpose                  | Returns                  | Use When                      |
| ------------------- | ------------------------ | ------------------------ | ----------------------------- |
| `viewChild()`       | Query component's view   | Signal<T \| undefined>   | Querying template elements    |
| `viewChildren()`    | Query multiple in view   | Signal<ReadonlyArray<T>> | Querying list of elements     |
| `contentChild()`    | Query projected content  | Signal<T \| undefined>   | Querying ng-content           |
| `contentChildren()` | Query multiple projected | Signal<ReadonlyArray<T>> | Querying multiple projections |

**Pattern - Querying view children:**

```typescript
export class Accordion {
    // Query single element by template reference
    readonly content = viewChild<ElementRef>('content');

    // Query single component by type
    readonly header = viewChild(AccordionHeader);

    // Query multiple components
    readonly panels = viewChildren(AccordionPanel);

    protected expand(): void {
        const element = this.content()?.nativeElement;
        if (element) {
            element.style.maxHeight = element.scrollHeight + 'px';
        }
    }

    protected countPanels(): number {
        return this.panels().length;
    }
}
```

**Pattern - Querying projected content:**

```typescript
export class TabGroup {
    // Query single projected tab
    readonly activeTab = contentChild(Tab);

    // Query all projected tabs
    readonly tabs = contentChildren(Tab);

    protected selectFirst(): void {
        const firstTab = this.tabs()[0];
        if (firstTab) {
            firstTab.select();
        }
    }
}
```

**Query with required option:**

```typescript
export class Dialog {
    // Throws error if not found
    readonly closeButton = viewChild.required<ElementRef>('closeBtn');

    protected close(): void {
        // No need to check undefined - guaranteed to exist
        this.closeButton().nativeElement.focus();
    }
}
```

**Query with read option:**

```typescript
export class Form {
    // Query for ViewContainerRef instead of component
    readonly container = viewChild('outlet', { read: ViewContainerRef });

    // Query for ElementRef of a component
    readonly input = viewChild(InputComponent, { read: ElementRef });
}
```

**Best practices:**

- Queries are `undefined` until `AfterViewInit` / `AfterContentInit`
- Use `.required` when element must exist
- Access query results in lifecycle hooks or `effect()`
- Query results are signals - call them with `()`
- Prefer querying by type or token over template references
- Use `read` option to specify what to extract from the queried element
- **Type coercion:** `contentChild()` with optional chaining returns `undefined`, not `null`. Use `?? null` when passing to signals expecting `string | null`:

```typescript
// ❌ Type error - undefined not assignable to null
this.header()?.ariaControls.set(this.list()?.id());

// ✅ Correct - coerce undefined to null
this.header()?.ariaControls.set(this.list()?.id() ?? null);
```

#### Naming Conventions

**Input Names:**

- Avoid choosing input names that collide with properties on DOM elements like `HTMLElement`
- Do NOT add prefixes for component inputs (like you would with component selectors)
- Name collisions introduce confusion about whether the property belongs to the component or the DOM element

**Output Names:**

- Avoid choosing output names that collide with events on DOM elements like `HTMLElement`
- Always use camelCase for output names
- Avoid prefixing output names with "on"
- Do NOT add prefixes for component outputs (like you would with component selectors)
- Name collisions introduce confusion about whether the property belongs to the component or the DOM element

**Event Handlers:**

- Name event handlers for the action they perform rather than for the triggering event
- This makes it easier to understand what an event does from reading the template
- For keyboard events, use Angular's key event modifiers with specific handler names

#### Class Members

**Protected Members:**

- Use `protected` access for class members that are only used by a component's template
- A component's public members define a public API accessible via dependency injection and queries
- Protected members ensure template-accessible properties don't pollute the public API

**Readonly Properties:**

- Use `readonly` for properties that shouldn't change after initialization
- Mark properties initialized by Angular as `readonly` (includes `input()`, `model()`, `output()`, and query results)
- The `readonly` modifier ensures values set by Angular are not accidentally overwritten

#### Lifecycle Hooks

- Keep lifecycle methods simple; avoid long or complex logic inside hooks like `ngOnInit`
- Create well-named methods to contain complex logic and call them from lifecycle hooks
- Always implement lifecycle hook interfaces (e.g., `OnInit`, `OnDestroy`) to ensure correct method names
- Import and implement the TypeScript interface for each lifecycle method used

#### Component Member Ordering

Follow strict member ordering as enforced by `@typescript-eslint/member-ordering`:

1. **Decorated properties** (in order):

    - `@Input()` decorated properties
    - `@Output()` decorated properties
    - `@ViewChild()` / `@ViewChildren()` decorated properties
    - Other decorated properties

2. **Signal inputs and outputs** (properties created with `input()` and `output()` functions ONLY):

    - `input()` signal inputs
    - `output()` signal outputs
    - `model()` two-way binding signals

3. **Other instance fields** (in order of visibility):
    - Public instance fields
    - Protected instance fields (including signals, computed values, and injected services)
    - Private instance fields

**Example**:

```typescript
@Component({
    /* ... */
})
export class MyExample {
    // 1. Decorated properties first
    @Input()
    displayValue = true;

    @Input()
    placeholder: string;

    @Output()
    valueChange = new EventEmitter<string>();

    @ViewChild('template')
    template: TemplateRef<any>;

    // 2. Signal inputs/outputs after decorated properties
    readonly minuteStep = input<number>(1);
    readonly itemSelected = output<string>();

    // 3. Other instance fields - PUBLIC first
    activeView: string = 'default';

    // 4. PROTECTED fields after public
    protected items: string[] = [];

    // 5. PRIVATE fields last
    private _cache: Map<string, any>;
}
```

**Critical member ordering rules:**

1. **Category 2 is ONLY for properties created with `input()`, `output()`, or `model()` function calls**
2. Properties that hold Signal types but are NOT created with `input()`/`output()`/`model()` go in category 3 (Other instance fields)
3. Signal inputs created with `input()` are treated as regular readonly field definitions by TypeScript/ESLint
4. They MUST be declared after all `@Input()`, `@Output()`, and `@ViewChild()` decorated properties
5. **Protected members MUST come before private members** - this is enforced by `@typescript-eslint/member-ordering`
6. Order: public → protected → private (within each category)

**Common mistakes to avoid:**

```typescript
// ❌ WRONG - regular Signal property in wrong category
export class MyComponent {
    // This is NOT a signal input - it's a regular property holding a Signal
    readonly mySignal: Signal<string>; // Should be in category 3, not 2

    private readonly _service = inject(MyService);
}

// ❌ WRONG - protected after private causes lint error
export class MyComponent {
    private readonly _service = inject(MyService);
    protected readonly value = computed(() => this._service.getValue()); // ERROR!
}

// ✅ CORRECT - signal input vs regular signal property
export class MyComponent {
    // Category 2: Created with input() function
    readonly userName = input<string>('');
    readonly userChanged = output<User>();

    // Category 3: Regular properties (including Signal types)
    protected readonly displayName: Signal<string>;
    protected readonly isActive = computed(() => this.userName().length > 0);

    private readonly _service = inject(MyService);

    constructor() {
        // Properties depending on injected services initialized here
        this.displayName = this._service.getDisplayName();
    }
}
```

---

### Dependency Injection Patterns

**When to use these patterns:** When migrating to signals or building component libraries with loose coupling requirements.

Angular's dependency injection system provides powerful patterns for component composition and configuration. This section covers two key patterns using `InjectionToken`.

**Token Naming Conventions:**

- **Configuration tokens** (defaults, settings): Use descriptive names (e.g., `DEFAULT_TITLE_SIZE`, `DEFAULT_BUTTON_TYPE`)
- **Component identity tokens** (for queries): Use `FD_` prefix (e.g., `FD_TITLE`, `FD_CARD_TITLE`, `FD_BUTTON`)

#### Pattern 1: Contextual Defaults with InjectionTokens

Use `InjectionToken` to provide contextual defaults for child components. This pattern allows parent components to influence default values without directly manipulating child component inputs.

**When to use:**

- Parent components need to provide default configurations to unknown child components
- Setting framework-level defaults (themes, sizes, behaviors)
- Avoiding tight coupling between parent and child components
- Providing optional configuration that children can override

**Example - Providing default title size in dialogs:**

```typescript
// title.component.ts - Define the token
import { InjectionToken } from '@angular/core';

export type HeaderSizes = 1 | 2 | 3 | 4 | 5 | 6;

export const DEFAULT_TITLE_SIZE = new InjectionToken<HeaderSizes>('DEFAULT_TITLE_SIZE');

@Component({
    selector: '[fd-title]'
    /* ... */
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
}

// dialog-header.ts - Provide the default
@Component({
    selector: 'fd-dialog-header',
    providers: [
        {
            provide: DEFAULT_TITLE_SIZE,
            useValue: 5
        }
    ]
    /* ... */
})
export class DialogHeader {
    // Any fd-title within this component will default to size 5
}
```

**Benefits:**

- ✅ No need to query and manipulate child components
- ✅ Type-safe dependency injection
- ✅ Works naturally with signal inputs
- ✅ Testable (mock the token in tests)
- ✅ Loosely coupled (parent doesn't need to know about child implementation)
- ✅ Children can opt-out by providing explicit values

**Best practices:**

- Always use `{ optional: true }` when injecting contextual defaults
- Document the token with JSDoc describing its purpose
- Export tokens from the component file for reusability
- Use descriptive token names (e.g., `DEFAULT_TITLE_SIZE` not `TITLE_CONFIG`)

**Why Not @ContentChild with Signal Inputs?**

When migrating components to signals, you may encounter situations where a parent component needs to set default values for child component inputs. The old pattern of querying and manipulating children **no longer works with signal inputs**.

**❌ This pattern breaks with signal inputs:**

```typescript
// DOES NOT WORK - signal inputs are read-only from outside
@ContentChild(TitleComponent)
set title(titleComponent: TitleComponent) {
    if (titleComponent) {
        // ❌ Can't directly set signal inputs from outside the component
        titleComponent.headerSize = 5; // This is read-only!

        // ❌ ComponentRef doesn't exist on queried components
        const componentRef = (titleComponent as any)._componentRef; // undefined!
        componentRef.setInput('headerSize', 5); // Crashes!
    }
}
```

**Why it doesn't work:**

1. **Signal inputs are read-only** - `input()` creates a read-only signal that can only be set by Angular's template binding system, not by external code
2. **No ComponentRef on queries** - `@ContentChild` and `@ViewChild` return component instances, not `ComponentRef` objects. `ComponentRef.setInput()` only works on dynamically created components
3. **Breaks encapsulation** - Parent should not reach into child internals and manipulate state
4. **Fragile** - Relies on internal Angular mechanisms that may change

**✅ Use InjectionToken instead:**

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
            // Priority: explicit input > injected default > fallback
            const size = this.headerSize() ?? this._defaultHeaderSize ?? this._fallback();
            this._applySize(size);
        });
    }
}
```

**Key principle:** With signal inputs, the **child component is in control** of its own state. The parent provides context via DI, and the child decides what to do with it.

#### Programmatic Signal Input Updates

When migrating from `@Input()` decorators to `input()` signals, you may encounter cases where external code needs to programmatically update a directive's input value. **Signal inputs are read-only** from outside the component, so direct assignment no longer works.

**❌ This pattern breaks with signal inputs:**

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
this._contentDensity.fdContentDensity = ContentDensityMode.COMPACT; // ❌ Error: read-only!
```

**✅ Solution: Add a setter method for programmatic updates:**

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

**When this pattern is needed:**

- Directives used via `hostDirectives` where parent needs to control the value
- Components that expose an API for programmatic state changes
- Migration scenarios where existing code relied on direct property assignment

**Alternative approaches to consider:**

1. **Use a service/storage provider** - If multiple components need to share the value
2. **Use `model()` instead of `input()`** - If two-way binding is appropriate
3. **Use InjectionToken pattern** - If parent should provide defaults (see Pattern 1 above)

#### Pattern 2: Component Composition with InjectionTokens

Use `InjectionToken` for component composition and content queries to create loose coupling between parent and child components. This pattern allows querying for component roles rather than concrete implementations.

**The Pattern:**

1. Create a token representing a component role (not implementation)
2. Register components/directives under that token using `providers`
3. Query for the token (not the concrete class) using `contentChild()` or `contentChildren()`

**Prefer simple InjectionToken over abstract classes:**

```typescript
// ✅ Good - Simple InjectionToken with typed interface
// Use FD_ prefix for component identity tokens
export const FD_TITLE = new InjectionToken<{ elementRef: ElementRef }>('FD_TITLE');

@Component({
    selector: '[fd-title]',
    providers: [{ provide: FD_TITLE, useExisting: Title }]
})
export class Title {
    readonly elementRef = inject(ElementRef<HTMLElement>);
    // Component doesn't need to extend anything
}

// Parent queries using the token
@ContentChild(FD_TITLE)
set titleComponent(title: { elementRef: ElementRef } | null) {
    // Works with any implementation that provides elementRef
}
```

**Why simple tokens over abstract classes:**

- ✅ No inheritance needed - components stay simple
- ✅ More flexible - any object with matching shape works
- ✅ Better testability - easy to provide mock objects
- ✅ Clearer intent - token defines contract, not implementation

**Example - Card Title:**

```typescript
// ========== token definition ==========
export const FD_CARD_TITLE = new InjectionToken<{ id: Signal<string> }>('FdCardTitleDirective');

// ========== card-title.directive.ts ==========
@Directive({
    selector: '[fd-card-title]',
    providers: [{ provide: FD_CARD_TITLE, useExisting: CardTitleDirective }]
})
export class CardTitleDirective {
    readonly id = input('fd-card-title-id-0');
}

// ========== card-header-main.ts (parent) ==========
export class CardMainHeader {
    // Query by TOKEN, not by class - enables loose coupling
    readonly _cardTitle = contentChild(FD_CARD_TITLE);
}

// ========== Usage ==========
<fd-card-main-header>
    <h2 fd-card-title>My Title</h2>  <!-- Parent finds this via token -->
</fd-card-main-header>
```

**Why use this pattern:**

- **Decoupling:** Parent doesn't depend on concrete implementation classes
- **Flexibility:** Multiple implementations can fulfill the same role without changing parent code
- **Testability:** Easy to mock by providing alternative implementations under the same token
- **Extensibility:** New directive variants can register under existing tokens
- **Type safety:** Tokens can be typed for better IDE support

**Provider options:**

- **`useExisting`:** Reference an already-instantiated component/directive (most common for directives)
- **`useClass`:** Create a new instance of the provided class
- **`useValue`:** Use a specific value (object, string, number)
- **`useFactory`:** Use a factory function to create the value

**When to use this pattern:**

- Component libraries where child elements need to be discovered by parent containers
- Content projection scenarios with communication between projected content and host
- Creating reusable component compositions with swappable implementations
- Building extensible component architectures

**Example - Form Control abstraction:**

```typescript
// Multiple controls register under the same token
// Generic token name for shared interface
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

---

### State Management

**Summary for AI Agents:**

- **Local state** → `signal()`
- **Derived state** → `computed()`
- **Side effects** → `effect()`
- **Async operations** → RxJS Observables

**Guidelines:**

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

---

### Render Lifecycle Hooks

Angular 21 provides render lifecycle hooks that run during or after Angular's rendering process. These are useful for DOM manipulation, measurements, and third-party library integration.

**Available Hooks:**

- **`afterRender()`** - Runs after every render cycle
- **`afterNextRender()`** - Runs once after the next render cycle

**When to use:**

- DOM measurements (element dimensions, scroll positions)
- Third-party library initialization that requires DOM
- Manual focus management
- Chart/graph rendering libraries
- Browser API calls that need rendered DOM

**Pattern:**

```typescript
import { afterRender, afterNextRender } from '@angular/core';

export class ChartComponent {
    private readonly elementRef = inject(ElementRef);

    constructor() {
        // Runs once after first render
        afterNextRender(() => {
            // Initialize chart library with DOM element
            this.initializeChart(this.elementRef.nativeElement);
        });

        // Runs after every render (use sparingly)
        afterRender(() => {
            // Update chart with new data
            this.updateChart();
        });
    }
}
```

**Best practices:**

- Prefer `afterNextRender()` for one-time initialization
- Use `afterRender()` sparingly - it runs frequently
- Clean up subscriptions and listeners in `ngOnDestroy`
- Avoid heavy computations in these hooks
- Use `phase` option to control when code runs (write, read, earlyRead)

---

### Resource API (Experimental)

Angular 21 introduces experimental `resource()` API for async data fetching with signals.

**Pattern:**

```typescript
import { resource } from '@angular/core';

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

### Effect vs Observables

**Decision Rule for AI Agents:**

| Use `effect()` when:            | Use Observables when:                        |
| ------------------------------- | -------------------------------------------- |
| Reacting to signal changes      | Async events (HTTP, WebSocket, timers)       |
| Synchronizing state with DOM    | Complex async operators (debounce, throttle) |
| Third-party library integration | Existing RxJS-based APIs                     |
| Automatic cleanup needed        | Multiple subscribers required                |
| DOM manipulation (focus, ARIA)  | Time-based operations (intervals, timeouts)  |

**When to use Observables:**

- Handling async events from external sources (user events, WebSockets, timers)
- Complex async operations with operators (debounce, throttle, retry, switchMap)
- Working with existing RxJS-based APIs
- Multiple subscribers need the same data stream

**Example - Managing focus based on component state:**

```typescript
// ❌ Before - using RxJS
export class Popover implements OnDestroy {
    readonly isOpen = signal(false);
    private readonly triggerElement = viewChild<ElementRef>('trigger');
    private readonly popoverElement = viewChild<ElementRef>('popover');
    private readonly destroy$ = new Subject<void>();

    constructor() {
        // Manual subscription management required
        toObservable(this.isOpen)
            .pipe(takeUntil(this.destroy$))
            .subscribe((open) => {
                if (open) {
                    this.popoverElement()?.nativeElement.focus();
                } else {
                    this.triggerElement()?.nativeElement.focus();
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

// ✅ After - using effect()
export class Popover {
    readonly isOpen = signal(false);
    private readonly triggerElement = viewChild<ElementRef>('trigger');
    private readonly popoverElement = viewChild<ElementRef>('popover');

    constructor() {
        // Automatic dependency tracking and cleanup
        effect(() => {
            if (this.isOpen()) {
                // Move focus to popover when opened
                this.popoverElement()?.nativeElement.focus();
            } else {
                // Return focus to trigger when closed
                this.triggerElement()?.nativeElement.focus();
            }
        });
    }
}
```

**Effect Best Practices:**

- Use `effect()` in constructor or initialization context where injection context is available
- Avoid complex logic inside effects; extract to separate methods
- Effects automatically track signal dependencies - no need for manual dependency arrays
- Effects are automatically cleaned up when the component/service is destroyed

**Replace `Subject<void>` with `effect()`:**

When a `Subject<void>` is used for notifications alongside a signal update, remove it and use `effect()` instead:

```typescript
// ❌ Before - redundant Subject notification
set collapsed(value: boolean) {
    this.service.collapsed.set(value);
    this.service.visibilityChange.next();  // Redundant!
}
// Consumer: this.service.visibilityChange.subscribe(() => this.update());

// ✅ After - effect reacts to signal directly
set collapsed(value: boolean) {
    this.service.collapsed.set(value);  // Just update the signal
}
// Consumer uses effect():
effect(() => {
    this.service.collapsed();  // Track signal
    this.update();             // React to change
});
```

**Using `untracked()` to prevent dependencies:**

Use `untracked()` when you need to read a signal's value inside an effect without creating a dependency on it.

```typescript
export class Tooltip {
    readonly content = signal('');
    readonly animationDuration = signal(200);

    constructor() {
        effect(() => {
            const currentContent = this.content();
            const duration = untracked(this.animationDuration); // Not tracked
            this.showTooltip(currentContent, duration);
        });
    }
}
```

**Behavior:**

- Effect only re-runs when `content` changes (not when `animationDuration` changes)
- New duration value is used the next time the effect runs

**Use cases:**

- Reading configuration values that shouldn't trigger re-execution
- Logging/debugging without creating dependencies
- Breaking circular dependencies between signals
- Reading values during initialization without tracking future changes

**Signal Writes in Effects (Angular 21+):**

In Angular 21+, signal writes are **always allowed** inside effects. The `allowSignalWrites` option is deprecated and no longer has any effect. If you see this option in existing code, remove it to avoid console warnings.

```typescript
// ✅ Correct - no options needed, signal writes are allowed by default
export class Validation {
    readonly inputValue = signal('');
    readonly validationError = signal<string | null>(null);

    constructor() {
        effect(() => {
            const value = this.inputValue();

            // Signal writes are allowed by default in Angular 21+
            if (value.length < 3) {
                this.validationError.set('Minimum 3 characters required');
            } else {
                this.validationError.set(null);
            }
        });
    }
}

// ❌ Deprecated - causes console warning in Angular 21+
effect(
    () => {
        /* ... */
    },
    { allowSignalWrites: true } // Remove this option
);
```

**Important:** Prefer using `computed()` over effects when deriving state:

```typescript
// ✅ Better - use computed() for derived state
export class Validation {
    readonly inputValue = signal('');

    readonly validationError = computed(() => {
        const value = this.inputValue();
        return value.length < 3 ? 'Minimum 3 characters required' : null;
    });
}

// ❌ Avoid - using effect for derived state (even though it works)
export class Validation {
    readonly inputValue = signal('');
    readonly validationError = signal<string | null>(null);

    constructor() {
        effect(() => {
            const value = this.inputValue();
            this.validationError.set(value.length < 3 ? 'Minimum 3 characters required' : null);
        });
    }
}
```

**When to use effects with signal writes:**

- Synchronizing multiple related signals that can't be expressed as computed values
- Updating signals based on imperative operations (DOM measurements, third-party library callbacks)
- Complex state updates that require multiple signal writes based on conditions

---

### BehaviorSubject + combineLatest vs Computed Signals

**Migration Rule for AI Agents:** If you see `BehaviorSubject` + `combineLatest` for synchronous state derivation → migrate to signals.

**Replace RxJS state management patterns with computed signals.** When you see `BehaviorSubject` combined with `combineLatest` for deriving state, prefer `computed()` signals instead.

**When to migrate from RxJS to signals:**

- You have `BehaviorSubject` instances that represent component state
- You're using `combineLatest` to derive values from multiple sources
- You need manual subscription management with `takeUntil`/`unsubscribe`
- The derived state is synchronous (no async operations like HTTP calls)

**When to keep RxJS:**

- Working with truly async streams (HTTP requests, WebSockets, timers)
- Need RxJS operators for complex async workflows (debounce, throttle, retry)
- Interfacing with existing RxJS-based APIs

**Example - Price calculator with discount:**

```typescript
// ❌ Before - using BehaviorSubject + combineLatest
export class PriceCalculator implements OnDestroy {
    private readonly basePrice$ = new BehaviorSubject<number>(100);
    private readonly quantity$ = new BehaviorSubject<number>(1);
    private readonly discountPercent$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    readonly totalPrice$ = combineLatest([this.basePrice$, this.quantity$, this.discountPercent$]).pipe(
        map(([price, qty, discount]) => {
            const subtotal = price * qty;
            return subtotal - (subtotal * discount) / 100;
        }),
        takeUntil(this.destroy$)
    );

    updatePrice(price: number): void {
        this.basePrice$.next(price);
    }

    updateQuantity(qty: number): void {
        this.quantity$.next(qty);
    }

    updateDiscount(discount: number): void {
        this.discountPercent$.next(discount);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

// ✅ After - using signals + computed()
export class PriceCalculator {
    readonly basePrice = signal(100);
    readonly quantity = signal(1);
    readonly discountPercent = signal(0);

    // Automatically recomputes when any dependency changes
    readonly totalPrice = computed(() => {
        const subtotal = this.basePrice() * this.quantity();
        return subtotal - (subtotal * this.discountPercent()) / 100;
    });

    protected updatePrice(price: number): void {
        this.basePrice.set(price);
    }

    protected updateQuantity(qty: number): void {
        this.quantity.set(qty);
    }

    protected updateDiscount(discount: number): void {
        this.discountPercent.set(discount);
    }

    // No manual cleanup needed!
}
```

**Benefits of the signal approach:**

- **Less boilerplate:** No `BehaviorSubject`, `combineLatest`, `pipe`, `map`, or `takeUntil` needed
- **Automatic cleanup:** No `ngOnDestroy` or subscription management required
- **Better type inference:** Computed signals provide stronger typing without explicit annotations
- **Simpler mental model:** Direct value access with `()` instead of observable streams
- **Better performance:** Computed values are cached and only recalculate when dependencies change
- **Easier testing:** Test signals directly without subscribing or using async patterns

**Migration pattern:**

1. Replace `BehaviorSubject<T>` with `signal<T>(initialValue)`
2. Replace `combineLatest([...]).pipe(map(...))` with `computed(() => ...)`
3. Replace `.next(value)` with `.set(value)` or `.update(fn)`
4. Remove `takeUntil`, `destroy$`, and `ngOnDestroy` cleanup
5. Remove `$` suffix from variable names (signals don't need the observable convention)

#### Migrating Classes That Extend BehaviorSubject

**Anti-pattern:** Classes that `extend BehaviorSubject<T>` should use internal signals instead.

```typescript
// ❌ Before - extending BehaviorSubject
@Injectable()
export class StateObserver extends BehaviorSubject<StateMode> {
    constructor() {
        super(StateMode.DEFAULT);
    }
}

// ✅ After - signal-based
@Injectable()
export class StateObserver {
    readonly state: Signal<StateMode>;
    readonly isDirty = computed(() => this._state() !== StateMode.DEFAULT);

    private readonly _state = signal<StateMode>(StateMode.DEFAULT);

    /** @deprecated Use state() instead */
    get value(): StateMode {
        return this._state();
    }

    constructor(injector: Injector) {
        this.state = this._state.asReadonly();
        // Backward compat: toObservable() for existing Observable consumers
        this.state$ = toObservable(this._state, { injector });
    }

    /** @deprecated Use state signal instead */
    asObservable(): Observable<StateMode> {
        return this.state$;
    }
}
```

**Backward compatibility mapping:**

| Old API               | Signal Replacement                 |
| --------------------- | ---------------------------------- |
| `.value`              | Getter → `signal()`                |
| `.subscribe()`        | `toObservable(signal).subscribe()` |
| `.asObservable()`     | `toObservable(signal)`             |
| `derived$` Observable | `toObservable(computedSignal)`     |

#### Migrating Token Interfaces

Update injection token interfaces from Observable to Signal:

```typescript
// ❌ Before                              // ✅ After
interface DirectiveRef {                  interface DirectiveRef {
    changes$: Observable<Mode>;     →         mode: Signal<Mode>;
    value: Mode;                              /** @deprecated */ value: Mode;
}                                         }
```

#### Migrating Helper Functions

Replace `merge`/`combineLatest` helpers with `computed()`:

```typescript
// ❌ Before - Observable helper
const getSource$ = (a$: Observable<T>, b$: Observable<T>): Observable<T> =>
    merge(a$, b$).pipe(startWith(default), distinctUntilChanged());

// ✅ After - Signal helper
const getSource = (a: Signal<T>, b: Signal<T>): Signal<T> =>
    computed(() => a() ?? b() ?? defaultValue);
```

---

### Signal-Based Change Detection

**Critical Rule for AI Agents:** Do NOT call `ChangeDetectorRef.markForCheck()` after signal updates - signals automatically notify Angular.

**Signals eliminate the need for manual change detection.** When migrating to signals, writing new signal-based components, or reviewing a change, follow these guidelines:

**Do NOT use `ChangeDetectorRef` with signals:**

- ❌ `signal.set(value); this._changeDetectorRef.markForCheck();` - REDUNDANT
- ✅ `signal.set(value);` - Signal automatically notifies Angular
- ❌ `model.update(fn); this._changeDetectorRef.markForCheck();` - REDUNDANT
- ✅ `model.update(fn);` - Model signals automatically notify
- ❌ `componentRef.setInput('prop', value); this._changeDetectorRef.markForCheck();` - REDUNDANT
- ✅ `componentRef.setInput('prop', value);` - setInput automatically notifies

**When `markForCheck()` IS needed:**

- Only when updating non-signal properties in OnPush components
- When code runs outside Angular's zone (setTimeout without NgZone, third-party callbacks, Web Workers)
- When working with observables without `async` pipe

**Signal Migration Checklist:**

When converting components from `@Input()`/`@Output()` to signals:

1. **Convert decorators to signals:**

    - `@Input()` → `input()`
    - `@Output()` → `output()`
    - `@Input()` + `@Output()` (two-way binding) → `model()`

2. **Remove manual change detection:**

    - Remove `ChangeDetectorRef` import if only used for signal updates
    - Remove `markForCheck()` / `detectChanges()` calls after signal updates
    - Remove `inject(ChangeDetectorRef)` if no longer needed

3. **Refactor computed signals:**

    - Look for duplicate logic across multiple `computed()` signals
    - Extract common validations/transformations into separate computed signals
    - Compose computed signals from smaller, focused signals
    - Apply DRY (Don't Repeat Yourself) principle

4. **Two-pass approach:**
    - **Pass 1:** Make it work (convert syntax, fix compilation errors)
    - **Pass 2:** Make it right (refactor, eliminate duplication, remove cruft)

**Example - Before (with manual change detection):**

```typescript
export class MyExample {
    @Input() value: number;
    @Output() valueChange = new EventEmitter<number>();

    private _changeDetectorRef = inject(ChangeDetectorRef);

    updateValue(newValue: number): void {
        this.value = newValue;
        this.valueChange.emit(newValue);
        this._changeDetectorRef.markForCheck(); // Manual notification
    }
}
```

**Example - After (signal-based, no manual change detection):**

```typescript
export class MyExample {
    readonly value = model<number>(0);

    // No ChangeDetectorRef needed!

    protected updateValue(newValue: number): void {
        this.value.set(newValue); // Automatic notification
    }
}
```

**Example - Refactoring computed signals:**

```typescript
// ❌ Before - duplicate logic
protected readonly _isValid = computed(() => {
    const val = this.value();
    return val != null && val > 0;
});

protected readonly _isEnabled = computed(() => {
    const val = this.value();
    return this.enabled() && val != null && val > 0;
});

// ✅ After - extracted common logic
protected readonly _hasValidValue = computed(() => {
    const val = this.value();
    return val != null && val > 0;
});

protected readonly _isValid = computed(() => this._hasValidValue());

protected readonly _isEnabled = computed(() =>
    this.enabled() && this._hasValidValue()
);
```

---

### Templates

**Template Best Practices Summary:**

- Use new control flow: `@if`, `@for`, `@switch` (not `*ngIf`, `*ngFor`, `*ngSwitch`)
- Use `class`/`style` bindings (not `ngClass`/`ngStyle`)
- Refactor complex logic to TypeScript with `computed()`
- Import pipes explicitly in component imports

**Detailed Guidelines:**

- Keep templates simple and avoid complex logic
- When template code gets too complex, refactor logic into TypeScript code (typically with a `computed()`)
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Do not assume globals like `new Date()` are available
- Do not write arrow functions in templates (they are not supported)
- Use the `async` pipe to handle observables
- Use built-in pipes and import pipes when used in templates ([learn more](https://angular.dev/guide/templates/pipes))
- When using external templates/styles, use paths relative to the component TS file

---

### Services

**Service Patterns:**

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection

**Subscription Cleanup with `takeUntilDestroyed()`:**

When services or components subscribe to observables, use `takeUntilDestroyed()` for automatic cleanup instead of manual `Subject<void>` + `takeUntil()` pattern.

```typescript
// ❌ Before - manual cleanup with Subject
@Injectable()
export class MyService implements OnDestroy {
    private readonly _destroy$ = new Subject<void>();
    private readonly _router = inject(Router);

    constructor() {
        this._router.events.pipe(takeUntil(this._destroy$)).subscribe((event) => this.handleEvent(event));
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}

// ✅ After - automatic cleanup with takeUntilDestroyed
@Injectable()
export class MyService {
    private readonly _router = inject(Router);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this._router.events.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((event) => this.handleEvent(event));
    }
    // No ngOnDestroy needed!
}
```

**Key points:**

- Import `DestroyRef` and `takeUntilDestroyed` from `@angular/core` and `@angular/core/rxjs-interop`
- In constructor context, `takeUntilDestroyed()` can be called without arguments
- Outside constructor, pass `DestroyRef` explicitly: `takeUntilDestroyed(this._destroyRef)`
- This pattern prevents memory leaks from forgotten unsubscriptions

**Deprecated patterns:**

- **Do NOT use custom `DestroyedService` implementations** - Angular's built-in `DestroyRef` + `takeUntilDestroyed()` replaces any custom destroyed service patterns
- If you encounter a `DestroyedService` in the codebase, migrate it to `DestroyRef`

**Signal-based Services:**

- Use `readonly` on all signals to prevent accidental reassignment (`.set()` and `.update()` still work)
- Remove RxJS `Subject<void>` when signals can replace the notification pattern
- Use `computed()` for derived state in services

```typescript
@Injectable()
export class MyService {
    readonly collapsed = signal(false);       // readonly prevents reassignment
    readonly size = computed(() => ...);      // derived state

    toggleCollapsed(): void {
        this.collapsed.update(v => !v);       // .update() still works
    }
}
```

---

## NX Monorepo Architecture

**Context:** This project uses NX for monorepo management with multiple library packages.

### Workspace Structure

This project uses NX as a monorepo build system with the following library structure:

- **libs/core**: Core Angular components and services
- **libs/platform**: Platform-specific components
- **libs/cdk**: Component Development Kit with utilities and base classes
- **libs/btp**: BTP (Business Technology Platform) components
- **libs/cx**: Customer Experience components
- **libs/i18n**: Internationalization utilities
- **libs/datetime-adapter**: Date/time adapters
- **libs/ui5-webcomponents**: UI5 Web Components wrappers
- **libs/ui5-webcomponents-ai**: AI-specific UI5 components wrappers
- **libs/ui5-webcomponents-fiori**: Fiori UI5 components wrappers
- **libs/ui5-webcomponents-base**: Base UI5 web components package
- **apps/docs**: Documentation application

### NX Best Practices

- Understand library boundaries and dependencies
- Use NX generators for creating new components, services, and libraries
- Leverage NX's computation caching for faster builds
- Use `nx affected` commands to only build/test what changed
- Follow the project structure defined in `nx.json` and `project.json` files
- Use NX task dependencies (`dependsOn`) in `nx.json` for proper build orchestration
- Prefix components with `fd` as defined in workspace generators

### Building and Testing

- Use `nx build <project>` to build specific projects
- Use `nx test <project>` to run unit tests for specific projects
- Use `nx run-many --target=build --all` to build all projects
- Use `nx affected:build` to build only affected projects
- Use `nx affected:test` to test only affected projects
- Leverage NX caching to speed up repeated builds
- Run `yarn start` to serve the documentation application
- Run `yarn test` to run all unit tests

---

## Breaking Changes Guidelines

**For AI Agents: Understanding what constitutes a breaking change**

A breaking change is any modification that could cause existing consumer code to fail or behave differently after upgrading.

### What Constitutes a Breaking Change

| Change Type                           | Breaking? | Example                                         |
| ------------------------------------- | --------- | ----------------------------------------------- |
| Removing exported class/function/type | ✅ Yes    | Removing `DestroyedService` from public API     |
| Removing exported constant/token      | ✅ Yes    | Removing `FD_BUTTON` InjectionToken             |
| Changing function signature           | ✅ Yes    | Adding required parameter, changing return type |
| Renaming exported symbol              | ✅ Yes    | Renaming `ButtonComponent` to `FdButton`        |
| Changing input/output names           | ✅ Yes    | Renaming `@Input() label` to `@Input() text`    |
| Changing default values               | ⚠️ Maybe  | If consumers rely on the default behavior       |
| Adding optional parameter             | ❌ No     | Adding `options?: Config` parameter             |
| Adding new export                     | ❌ No     | Exporting new `CardComponent`                   |
| Internal refactoring                  | ❌ No     | Changing private implementation details         |

### Breaking Change Commit Format

```
fix(scope)!: description of change

BREAKING CHANGE: Detailed explanation of what changed and migration path.
```

**Key points:**

- Use `!` after the scope to indicate breaking change
- Include `BREAKING CHANGE:` in the footer with migration instructions
- Provide clear guidance on how consumers should update their code

### Before Removing Public API

1. **Search for usages** - Use grep/search to find all references in the codebase
2. **Check exports** - Verify if the symbol is exported from any `index.ts` or public API files
3. **Consider deprecation** - For widely-used APIs, deprecate first with `@deprecated` JSDoc
4. **Document migration** - Explain what consumers should use instead

---

## Dead Code Removal

**For AI Agents: Safely identifying and removing unused code**

### Steps to Safely Remove Dead Code

1. **Search for all usages:**

    ```bash
    # Search for the symbol name across the codebase
    grep -r "SymbolName" --include="*.ts" --include="*.html"
    ```

2. **Check public API exports:**

    - Look in `index.ts` files for re-exports
    - Check if symbol is part of the library's public API
    - Public API removal = breaking change

3. **Verify with build:**

    ```bash
    nx build <affected-project>
    ```

4. **Run tests:**
    ```bash
    nx test <affected-project>
    ```

### Decision Tree for Removal

```
Is the symbol exported from a public index.ts?
├── Yes → Breaking change, requires:
│         • !suffix in commit type
│         • BREAKING CHANGE footer
│         • Migration documentation
└── No → Internal code, safe to remove if:
          • No grep results found
          • Build succeeds
          • Tests pass
```

### Common Dead Code Patterns

- **Deprecated services** - Old patterns replaced by Angular built-ins (e.g., `DestroyedService` → `DestroyRef`)
- **Unused utilities** - Helper functions that were refactored away
- **Legacy adapters** - Compatibility code for old Angular versions
- **Orphaned types** - Interfaces/types no longer referenced

### Example: Removing Unused Service

```bash
# 1. Search for usages
grep -r "DestroyedService" --include="*.ts"

# 2. If only found in its own file → candidate for removal

# 3. Check if exported (look in index.ts)
grep "destroyed.service" libs/cdk/utils/services/index.ts

# 4. If exported → breaking change
# 5. Remove file and export
# 6. Build and test
nx build cdk && nx test cdk

# 7. Commit with breaking change format
```

---

## Commit Message Guidelines

**Quick Format:** `<type>(<scope>): <subject>` - Both type AND scope are mandatory.

This project follows **Conventional Commits** specification with strict validation via commitlint.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is mandatory.

**Important:** Line length limits:

- Header: maximum 400 characters
- Body: maximum 400 characters per line
- Footer: maximum 400 characters per line

### Type

Must be one of the following:

- **feat**: A new feature (bumps PATCH version)
- **fix**: A bug fix (bumps PATCH version)
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files

### Scope

The scope is **mandatory** and must be one of the following:

- `core` - Core library changes
- `platform` - Platform library changes
- `docs` - Documentation app changes
- `e2e` - End-to-end test changes
- `release` - Release commits (auto-generated)
- `deps` - Dependency updates (auto-generated)
- `deps-dev` - Dev dependency updates (auto-generated)
- `changelog` - Changelog updates
- `ci` - CI/CD configuration changes
- `cx` - Customer Experience library changes
- `btp` - BTP library changes
- `cdk` - CDK library changes
- `shared` - Shared code changes
- `i18n` - Internationalization changes
- `datetime-adapter` - DateTime adapter changes
- `ui5` - UI5 web components changes

### Multiple Scopes

You can use multiple scopes with these delimiters:

- `/` (forward slash)
- `\` (backslash)
- `,` (comma)

Examples:

```
fix(core,platform): message
fix(core\platform): message
fix(core/platform): message
```

### Subject

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end
- Provide a succinct description of the change

### Body

- Use the imperative, present tense
- Include the motivation for the change
- Contrast with previous behavior

### Footer

- Reference GitHub issues that this commit closes
- Include **Breaking Changes** information

**Breaking Changes** should start with `BREAKING CHANGE:` followed by a space or two newlines.

### Revert Commits

If reverting a previous commit:

```
revert: <header of reverted commit>

This reverts commit <hash>.
```

### Commit Message Examples

Simple commit:

```
docs(core): update changelog to beta.5
```

Commit with body:

```
fix(platform): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

Commit with body and footer:

```
feat(core,platform): add new button variant

Added a new emphasized button variant for better visual hierarchy.

Closes #123
```

---

## Pull Request Guidelines

### PR Title Format

The PR title must follow this format:

```
<type>(<scope>): <subject>
```

**Type** can be: `WIP|feat|chore|test|docs|fix`

- `WIP` represents work in progress and **will not be merged**
- Use `feat` or `fix` to bump the PATCH version
- MINOR version bumps are handled by scripts
- MAJOR version bumps are handled by scripts

### PR Submission Process

1. **Search for existing PRs** to avoid duplicate effort
2. **Ensure an issue exists** that describes your change
3. **Create a branch from `main`**:
    ```bash
    git checkout -b my-fix-branch main
    ```
4. **Make your changes** with appropriate test cases
5. **Follow all coding rules** (see [Coding Rules and Standards](#coding-rules-and-standards))
6. **Run the full test suite** and ensure all tests pass:
    ```bash
    yarn test
    ```
7. **Run the full lint suite** and ensure all checks pass
8. **Commit your changes** following [commit message conventions](#commit-message-guidelines)
9. **Rebase before pushing** to ensure your branch is up to date:
    ```bash
    git rebase main -i
    git push -f
    ```
    **Important**: There should be NO merge commits. Always rebase!
10. **Create Pull Request** on GitHub

### After PR is Merged

Clean up your branch:

```bash
# Delete remote branch
git push origin --delete my-fix-branch

# Switch to main
git checkout main -f

# Delete local branch
git branch -D my-fix-branch

# Update main
git pull --ff upstream main
```

---

## Coding Rules and Standards

**Non-Negotiable Requirements:**

- All code must pass ESLint without errors
- All features must have unit tests
- All public APIs must have JSDoc
- All components must pass AXE accessibility checks

### Code Quality Requirements

- All features or bug fixes **must be tested** by one or more specs (unit tests)
- All public API methods **must be documented** with JSDoc comments
- Follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- Adhere to ESLint rules configured in `eslint.config.js`
- All code must pass linting without errors or warnings
- Follow member ordering rules (static → abstract → decorated → instance)

### Linting Rules

The project uses ESLint with NX and TypeScript plugins. Key rules:

- **Member ordering**: Follow strict order (static fields → constructor → methods) as defined by `@typescript-eslint/member-ordering`
- **Explicit return types**: Required for all functions via `@typescript-eslint/explicit-function-return-type` (allows expressions)
- **TypeScript comments**: `@ts-expect-error` allowed with description (minimum 3 characters), `@ts-ignore` discouraged
- **Accessibility**: All components must pass AXE checks and WCAG AA standards
- **Console statements**: Remove all debug console statements before committing
    - Use `console.warn()` for developer warnings (invalid inputs, deprecated usage)
    - Use `console.debug()` for debug-mode output (guarded by `if (config.debug)`)
    - Avoid `console.log()` in production code
- **No unused variables**: All declared variables must be used
- **Prefix private members**: Only private members must be prefixed with `_`

### Testing Requirements

- Write unit tests for all new features and bug fixes
- Maintain or improve code coverage
- Use Jest as the test runner
- Follow the testing patterns established in the codebase
- Run `yarn test` before submitting PRs

### Testing Patterns with Signals

**Testing signal-based components:**

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('MySignal', () => {
    let component: MySignal;
    let fixture: ComponentFixture<MySignal>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MySignal] // Standalone component
        });
        fixture = TestBed.createComponent(MySignal);
        component = fixture.componentInstance;
    });

    it('should update computed signal when input changes', () => {
        // Set input signal
        fixture.componentRef.setInput('value', 10);
        fixture.detectChanges();

        // Test computed value
        expect(component.doubledValue()).toBe(20);
    });

    it('should react to signal updates', () => {
        // Update signal directly (for internal state)
        component.internalState.set('new value');
        fixture.detectChanges();

        // Verify DOM update
        const element = fixture.nativeElement.querySelector('.state');
        expect(element.textContent).toBe('new value');
    });
});
```

**Testing DI patterns with tokens:**

```typescript
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_TITLE_SIZE } from './title.component';

@Component({
    selector: 'fd-test-wrapper',
    template: '<h1 fd-title>Test</h1>',
    providers: [{ provide: DEFAULT_TITLE_SIZE, useValue: 3 }],
    imports: [Title]
})
class TestWrapper {}

describe('Title with injected default', () => {
    it('should use injected default size', () => {
        const fixture = TestBed.createComponent(TestWrapper);
        fixture.detectChanges();

        const title = fixture.nativeElement.querySelector('h1');
        expect(title.classList.contains('fd-title--h3')).toBe(true);
    });
});
```

---

## Document Maintenance

**For AI Agents:** When this document is updated:

1. Update the "Last Updated" date in the metadata header
2. Increment version number if making structural changes
3. Verify all internal anchor links still work
4. Check that examples compile with current Angular version
5. Update the Quick Decision Guide table if adding new patterns

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct v2.0](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

### Key Principles

- Foster a harassment-free environment
- Be respectful and professional
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Reporting Violations

If you observe abusive, harassing, or otherwise unacceptable behavior, report it as an issue to the project maintainers.

## Documentation Standards

- Document all public APIs with JSDoc comments
- Include usage examples in component documentation
- Update the docs app when adding new features
- Follow the documentation guidelines in the project wiki
- Include accessibility notes for interactive components

### Updating Documentation Examples

When migrating components or making API changes:

1. **Check `libs/docs/<library>/api-files.ts`** - Ensure all exported classes are listed
2. **Review example components** - Update examples to demonstrate new features or API changes
3. **Test examples visually** - Run the docs app to verify examples work as expected
4. **Add explanatory notes** - If behavior is non-obvious (e.g., element width vs viewport width), add inline comments or display text explaining it
