# Testing Guidelines

> This document covers testing patterns and best practices for Angular 21+ development in Fundamental NGX.

## Table of Contents

- [Test Commands](#test-commands)
- [Test Writing Guidelines](#test-writing-guidelines)
- [Testing Signal-Based Components](#testing-signal-based-components)
- [Testing DI Patterns](#testing-di-patterns)
- [Testing Async Operations](#testing-async-operations)
- [ESLint Compliance in Tests](#eslint-compliance-in-tests)
- [Common Validation Pitfalls](#common-validation-pitfalls)

---

## Test Commands

```bash
# Run all tests in a library
nx test <library>

# Run specific test file
nx run <library>:test --testfile=<filename>.spec.ts

# Examples
nx run cdk:test --testfile=line-clamp.directive.spec.ts
nx run core:test --testfile=button.component.spec.ts
nx run platform:test --testfile=table.component.spec.ts

# Watch mode (recommended during development)
nx test <library> --watch

# Run affected tests only
nx affected:test

# Lint specific library
nx run <library>:lint
```

---

## Test Writing Guidelines

### Focus on User Scenarios, Not Edge Cases

When writing tests, ask: **"Can this actually happen in a real Angular application?"**

### ✅ Write tests for

- User interactions (clicks, inputs, keyboard)
- Valid configuration options
- Component lifecycle (mount, update, unmount)
- Accessibility requirements
- Realistic error scenarios (unsupported enum values, optional services missing)

### ❌ Don't write tests for

- TypeScript-prevented scenarios (`undefined` for required parameters)
- Angular DI-prevented scenarios (missing required dependencies)
- Implementation details (internal signal updates, private methods)
- Impossible states (null values in non-nullable fields)

### Example: Realistic vs Unrealistic Tests

```typescript
// ✅ GOOD - Tests realistic user scenario
it('should fallback to cozy when unsupported density is provided', () => {
    const observer = new ContentDensityObserver(injector, {
        supportedContentDensity: [ContentDensityMode.COZY],
        defaultContentDensity: ContentDensityMode.COMPACT // User might try this
    });
    expect(observer.value).toBe(ContentDensityMode.COZY); // Fallback works
});

// ❌ BAD - Tests impossible scenario (TypeScript prevents this)
it('should handle undefined defaultContentDensity', () => {
    const observer = new ContentDensityObserver(injector, {
        defaultContentDensity: undefined // TypeScript won't allow this!
    });
    expect(observer.value).toBe(ContentDensityMode.COZY);
});
```

---

## Testing Signal-Based Components

### Basic Test Setup

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('MyComponent', () => {
    let component: MyComponent;
    let fixture: ComponentFixture<MyComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MyComponent] // Standalone component
        });
        fixture = TestBed.createComponent(MyComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
```

### Setting Signal Inputs

```typescript
it('should update computed signal when input changes', () => {
    // Use setInput() for signal inputs
    fixture.componentRef.setInput('value', 10);
    fixture.detectChanges();

    // Test computed value
    expect(component.doubledValue()).toBe(20);
});
```

### Testing Computed Signals

```typescript
it('should compute derived value', () => {
    fixture.componentRef.setInput('firstName', 'John');
    fixture.componentRef.setInput('lastName', 'Doe');
    fixture.detectChanges();

    expect(component.fullName()).toBe('John Doe');
});
```

### Testing Internal State

```typescript
it('should react to signal updates', () => {
    // Update signal directly (for internal state)
    component.internalState.set('new value');
    fixture.detectChanges();

    // Verify DOM update
    const element = fixture.nativeElement.querySelector('.state');
    expect(element.textContent).toBe('new value');
});
```

### Testing Outputs

```typescript
it('should emit on button click', () => {
    const spy = jest.fn();
    component.clicked.subscribe(spy);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
});
```

---

## Testing DI Patterns

### Testing with InjectionToken

```typescript
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DEFAULT_TITLE_SIZE, Title } from './title.component';

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

### Mocking Signals

```typescript
import { signal } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FD_LANGUAGE_ENGLISH, FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n';

describe('MyComponent', () => {
    it('should translate label', () => {
        const langSignal = signal(FD_LANGUAGE_ENGLISH);

        TestBed.configureTestingModule({
            imports: [MyComponent],
            providers: [{ provide: FD_LANGUAGE_SIGNAL, useValue: langSignal }]
        });

        const fixture = TestBed.createComponent(MyComponent);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Submit');

        // Test language change
        langSignal.set(FD_LANGUAGE_GERMAN);
        fixture.detectChanges();
        expect(fixture.nativeElement.textContent).toContain('Senden');
    });
});
```

### Testing Services

```typescript
describe('MyService', () => {
    let service: MyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MyService]
        });
        service = TestBed.inject(MyService);
    });

    it('should update state', () => {
        service.setState('active');
        expect(service.state()).toBe('active');
    });

    it('should compute derived value', () => {
        service.setState('active');
        expect(service.isActive()).toBe(true);
    });
});
```

---

## Testing Async Operations

### Using fakeAsync

```typescript
import { fakeAsync, tick } from '@angular/core/testing';

it('should debounce input', fakeAsync(() => {
    component.searchInput.set('test');
    tick(300); // Wait for debounce
    expect(component.searchResults().length).toBeGreaterThan(0);
}));
```

### Testing ViewportSizeObservable

```typescript
import { BehaviorSubject } from 'rxjs';
import { ViewportSizeObservable } from '@fundamental-ngx/cdk/utils';

describe('ResponsiveComponent', () => {
    let viewportSizeSubject: BehaviorSubject<number>;

    beforeEach(() => {
        viewportSizeSubject = new BehaviorSubject<number>(1024);

        TestBed.configureTestingModule({
            imports: [ResponsiveComponent],
            providers: [{ provide: ViewportSizeObservable, useValue: viewportSizeSubject.asObservable() }]
        });
    });

    it('should respond to viewport changes', fakeAsync(() => {
        const fixture = TestBed.createComponent(ResponsiveComponent);
        fixture.detectChanges();
        tick();

        // Simulate resize
        viewportSizeSubject.next(800);
        tick(250); // Wait for debounce
        fixture.detectChanges();

        expect(component.isMobile()).toBe(true);
    }));
});
```

### Testing setTimeout

```typescript
it('should execute after timeout', fakeAsync(() => {
    component.startTimer();

    tick(1000); // Advance time by 1 second
    fixture.detectChanges();

    expect(component.timerComplete()).toBe(true);
}));
```

---

## ESLint Compliance in Tests

### Avoid Variable Shadowing

```typescript
// ❌ BAD - Shadows outer 'observer'
describe('ContentDensityObserver', () => {
    let observer: ContentDensityObserver;

    it('should work', () => {
        @Component({ template: '' })
        class TestComponent {
            constructor(readonly observer: ContentDensityObserver) {} // Shadows!
        }
    });
});

// ✅ GOOD - Unique names
describe('ContentDensityObserver', () => {
    let observer: ContentDensityObserver;

    it('should work', () => {
        @Component({ template: '' })
        class TestComponent {
            constructor(readonly densityObserver: ContentDensityObserver) {}
        }
    });
});
```

### Unique Test Component Names

```typescript
// ✅ GOOD - Descriptive, unique names
@Component({ template: '<fd-button>Click</fd-button>' })
class ButtonWithLabelTestComponent {}

@Component({ template: '<fd-button [disabled]="true">Click</fd-button>' })
class DisabledButtonTestComponent {}
```

---

## Common Validation Pitfalls

### Pitfall 1: Assuming Type Inference Always Works

```typescript
// Don't assume - verify with IDE hover or explicit compilation
const mySignal = computed(() => complexCalculation());
// Does TypeScript infer the correct type? Check before proceeding!
```

### Pitfall 2: Not Running Tests Immediately After Writing

```typescript
// ❌ BAD - Write 20 tests → run once → 16 failures
// ✅ GOOD - Write 2-3 tests → run → verify → write more
```

### Pitfall 3: Referencing Non-Existent Properties

```typescript
// Always verify property exists in the class before using
if (this._defaultContentDensity) {
} // Does this property exist? Check!
```

### Pitfall 4: Forgetting ESLint Member Ordering

```typescript
// Moving fields around? Run lint immediately:
// $ nx run core:lint
```

---

## Pre-Commit Checklist

Before requesting code review or committing:

- [ ] All modified files compile successfully
- [ ] All affected library tests pass
- [ ] No ESLint errors in modified files
- [ ] No console.log statements (use console.warn/console.debug with guards)
- [ ] Tests focus on user scenarios, not implementation details
- [ ] Type annotations use inference where appropriate
- [ ] All properties referenced actually exist
- [ ] Member ordering follows ESLint rules
- [ ] No variable shadowing

---

## Incremental Validation Pattern

**Validate DURING development, not just at the end:**

```bash
# Option 1: Watch mode (recommended)
nx test <library> --watch

# Option 2: Manual checks after each logical change
nx run <library>:lint
nx run <library>:test --testfile=<file>.spec.ts

# Option 3: Check affected projects
nx affected:lint
nx affected:test
```

**Cost of Late Validation:**

- Discover lint errors late → Fix → Re-run → Re-check (2-5 minutes)
- Discover during development → Fix immediately (30 seconds)
- **Time saved per issue: ~2-4 minutes**
