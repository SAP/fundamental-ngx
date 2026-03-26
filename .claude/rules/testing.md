---
paths: ['**/*.spec.ts']
alwaysApply: false
---

# Testing Conventions (fundamental-ngx)

## Commands

```bash
nx run <library>:test --testfile=<filename>.spec.ts   # single file
nx run <library>:test                                  # whole library
nx affected:test                                       # affected only
```

## What to Test

Write tests for realistic user scenarios:

- User interactions (clicks, inputs, keyboard)
- Valid configuration options
- Component lifecycle (mount, update, unmount)
- Accessibility requirements

Don't write tests for:

- TypeScript-prevented scenarios (undefined for required params)
- Angular DI-prevented scenarios (missing required deps)
- Implementation details (internal signal updates, private methods)
- Impossible states (null in non-nullable fields)

## Signal-Based Components

```typescript
// Set signal inputs via componentRef
fixture.componentRef.setInput('value', 10);
fixture.detectChanges();
expect(component.doubledValue()).toBe(20);

// Test outputs
const spy = jest.fn();
component.clicked.subscribe(spy);
button.click();
expect(spy).toHaveBeenCalled();
```

## Testing i18n

```typescript
const langSignal = signal(FD_LANGUAGE_ENGLISH);
TestBed.configureTestingModule({
    imports: [MyComponent],
    providers: [{ provide: FD_LANGUAGE_SIGNAL, useValue: langSignal }]
});
// Change language and verify
langSignal.set(FD_LANGUAGE_GERMAN);
fixture.detectChanges();
```

## ESLint Compliance

- Avoid variable shadowing between `describe` scope and test component constructors.
- Use unique, descriptive names for test wrapper components (e.g., `ButtonWithLabelTestComponent`).

## Workflow

Validate incrementally -- write 2-3 tests, run, verify, then write more. Don't batch 20 tests before running.
