# State Management

> This document covers state management patterns using Angular signals and migration from RxJS patterns.

## Table of Contents

- [When to Use Signals vs Plain Properties](#when-to-use-signals-vs-plain-properties)
- [Effect vs Observables](#effect-vs-observables)
- [BehaviorSubject + combineLatest Migration](#behaviorsubject--combinelatest-migration)
- [Migrating Classes That Extend BehaviorSubject](#migrating-classes-that-extend-behaviorsubject)
- [Migrating Token Interfaces](#migrating-token-interfaces)
- [Signal-Based Change Detection](#signal-based-change-detection)

---

## When to Use Signals vs Plain Properties

**Core principle:** Signals exist to feed Angular's reactive graph. If a value has no reactive consumer, making it a signal adds tracking overhead for no benefit.

### Decision Rule

```
Does anything REACTIVE read this value?
│
├─ YES (template, host binding, computed, effect)
│   └─▶ Use signal()
│
└─ NO (only used in imperative methods, cleanup, caching)
    └─▶ Use plain property
```

### Use `signal()` when the value drives the UI

```typescript
// 1. Template reads it
protected readonly count = signal(0);
// <span>{{ count() }}</span>

// 2. Host binding reads it
protected readonly isActive = signal(false);
// host: { '[class.active]': 'isActive()' }

// 3. A computed() derives from it
protected readonly price = signal(100);
protected readonly quantity = signal(2);
protected readonly total = computed(() => this.price() * this.quantity());

// 4. An effect() should re-run when it changes
protected readonly theme = signal<'light' | 'dark'>('light');
// effect(() => { document.body.setAttribute('data-theme', this.theme()); });
```

### Do NOT use `signal()` for internal bookkeeping

```typescript
// 1. One-time initialization flag — no reactive consumer
private _initialized = false;

// 2. Cached DOM measurement — used imperatively only
private _cachedRect: DOMRect;

// 3. Subscription/observer reference — just for cleanup
private _resizeObserver: ResizeObserver | null = null;

// 4. Intermediate calculation variable — method-scoped
private _formatValue(raw: number): string {
    const rounded = Math.round(raw * 100) / 100;
    return `${rounded}%`;
}
```

### Quick Reference Table

| Scenario                           | Signal? | Reason                         |
| ---------------------------------- | ------- | ------------------------------ |
| Counter shown in template          | ✅ Yes  | Template needs reactive update |
| CSS class toggled via host binding | ✅ Yes  | Host binding reads it          |
| Derived display value              | ✅ Yes  | `computed()` depends on it     |
| Value that triggers DOM sync       | ✅ Yes  | `effect()` re-runs on change   |
| One-time initialization flag       | ❌ No   | No reactive consumer           |
| Cached DOM measurement             | ❌ No   | Used imperatively only         |
| Timer/observer reference           | ❌ No   | Just for cleanup               |
| Loop counter inside a method       | ❌ No   | Temporary, method-scoped       |

---

## Effect vs Observables

### Decision Rule

| Use `effect()` when:            | Use Observables when:                        |
| ------------------------------- | -------------------------------------------- |
| Reacting to signal changes      | Async events (HTTP, WebSocket, timers)       |
| Synchronizing state with DOM    | Complex async operators (debounce, throttle) |
| Third-party library integration | Existing RxJS-based APIs                     |
| Automatic cleanup needed        | Multiple subscribers required                |
| DOM manipulation (focus, ARIA)  | Time-based operations                        |

### Example: Managing Focus

```typescript
// BEFORE - using RxJS
export class Popover implements OnDestroy {
    readonly isOpen = signal(false);
    private readonly triggerElement = viewChild<ElementRef>('trigger');
    private readonly popoverElement = viewChild<ElementRef>('popover');
    private readonly destroy$ = new Subject<void>();

    constructor() {
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

// AFTER - using effect()
export class Popover {
    readonly isOpen = signal(false);
    private readonly triggerElement = viewChild<ElementRef>('trigger');
    private readonly popoverElement = viewChild<ElementRef>('popover');

    constructor() {
        effect(() => {
            if (this.isOpen()) {
                this.popoverElement()?.nativeElement.focus();
            } else {
                this.triggerElement()?.nativeElement.focus();
            }
        });
    }
    // No ngOnDestroy needed - automatic cleanup!
}
```

---

## BehaviorSubject + combineLatest Migration

**Migration Rule:** If you see `BehaviorSubject` + `combineLatest` for synchronous state derivation → migrate to signals.

### When to Migrate

- You have `BehaviorSubject` instances that represent component state
- You're using `combineLatest` to derive values from multiple sources
- You need manual subscription management with `takeUntil`/`unsubscribe`
- The derived state is synchronous (no async operations)

### When to Keep RxJS

- Working with truly async streams (HTTP requests, WebSockets, timers)
- Need RxJS operators for complex async workflows (debounce, throttle, retry)
- Interfacing with existing RxJS-based APIs

### Example: Price Calculator

```typescript
// BEFORE - using BehaviorSubject + combineLatest
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

// AFTER - using signals + computed()
export class PriceCalculator {
    readonly basePrice = signal(100);
    readonly quantity = signal(1);
    readonly discountPercent = signal(0);

    readonly totalPrice = computed(() => {
        const subtotal = this.basePrice() * this.quantity();
        return subtotal - (subtotal * this.discountPercent()) / 100;
    });

    protected updatePrice(price: number): void {
        this.basePrice.set(price);
    }
    // No manual cleanup needed!
}
```

### Migration Pattern

1. Replace `BehaviorSubject<T>` with `signal<T>(initialValue)`
2. Replace `combineLatest([...]).pipe(map(...))` with `computed(() => ...)`
3. Replace `.next(value)` with `.set(value)` or `.update(fn)`
4. Remove `takeUntil`, `destroy$`, and `ngOnDestroy` cleanup
5. Remove `$` suffix from variable names

### Benefits

- **Less boilerplate** - No `BehaviorSubject`, `combineLatest`, `pipe`, `map`, `takeUntil`
- **Automatic cleanup** - No `ngOnDestroy` or subscription management
- **Better type inference** - Stronger typing without explicit annotations
- **Simpler mental model** - Direct value access with `()`
- **Better performance** - Computed values are cached
- **Easier testing** - Test signals directly without async patterns

---

## Migrating Classes That Extend BehaviorSubject

**Anti-pattern:** Classes that `extend BehaviorSubject<T>` should use internal signals instead.

```typescript
// BEFORE - extending BehaviorSubject
@Injectable()
export class StateObserver extends BehaviorSubject<StateMode> {
    constructor() {
        super(StateMode.DEFAULT);
    }
}

// AFTER - signal-based
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

### Backward Compatibility Mapping

| Old API               | Signal Replacement                 |
| --------------------- | ---------------------------------- |
| `.value`              | Getter → `signal()`                |
| `.subscribe()`        | `toObservable(signal).subscribe()` |
| `.asObservable()`     | `toObservable(signal)`             |
| `derived$` Observable | `toObservable(computedSignal)`     |

---

## Migrating Token Interfaces

Update injection token interfaces from Observable to Signal:

```typescript
// BEFORE
interface DirectiveRef {
    changes$: Observable<Mode>;
    value: Mode;
}

// AFTER
interface DirectiveRef {
    mode: Signal<Mode>;
    /** @deprecated */ value: Mode;
}
```

### Migrating Helper Functions

Replace `merge`/`combineLatest` helpers with `computed()`:

```typescript
// BEFORE - Observable helper
const getSource$ = (a$: Observable<T>, b$: Observable<T>): Observable<T> =>
    merge(a$, b$).pipe(startWith(default), distinctUntilChanged());

// AFTER - Signal helper
const getSource = (a: Signal<T>, b: Signal<T>): Signal<T> =>
    computed(() => a() ?? b() ?? defaultValue);
```

---

## Signal-Based Change Detection

**Critical Rule:** Do NOT call `ChangeDetectorRef.markForCheck()` after signal updates - signals automatically notify Angular.

### Do NOT use `ChangeDetectorRef` with signals

```typescript
// REDUNDANT - signals auto-notify
signal.set(value);
this._changeDetectorRef.markForCheck();

// CORRECT - just update the signal
signal.set(value);
```

### When `markForCheck()` IS needed

- Only when updating non-signal properties in OnPush components
- When code runs outside Angular's zone (setTimeout, third-party callbacks)
- When working with observables without `async` pipe

### Migration Checklist

When converting components from `@Input()`/`@Output()` to signals:

1. **Convert decorators to signals:**

    - `@Input()` → `input()`
    - `@Output()` → `output()`
    - `@Input()` + `@Output()` (two-way binding) → `model()`

2. **Remove manual change detection:**

    - Remove `ChangeDetectorRef` import if only used for signal updates
    - Remove `markForCheck()` / `detectChanges()` calls after signal updates

3. **Refactor computed signals:**

    - Look for duplicate logic across multiple `computed()` signals
    - Extract common validations into separate computed signals
    - Apply DRY principle

4. **Two-pass approach:**
    - **Pass 1:** Make it work (convert syntax, fix compilation errors)
    - **Pass 2:** Make it right (refactor, eliminate duplication)
