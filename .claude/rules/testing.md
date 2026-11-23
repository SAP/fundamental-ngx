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

## CSP Browser Validation

Follow the [CSP guide](../../docs/agents/csp-guidelines.md) and [review examples](../../docs/agents/csp-guidelines.md#review-examples). Add browser regression tests for CSP-sensitive components; unit/jsdom tests cannot verify enforcement.

- Enforce `style-src-attr 'none'` with authorized stylesheets. Confirm bootstrap, capture `securitypolicyviolation` before it, and check for zero attributable component violations. Include a separate blocked-attribute control.
- Assert computed styles/layout and interactions, including initial/settled states, consumer styles, themes, portals and supported SSR/hydration. Report the exercised browser/version scope.
- Reuse existing CSP fixtures. Confirm the intended tests are discovered and executed with the actual Playwright/CI configuration, projects and filters.
- Report file/line, operation/directive, impact, remedy and evidence. Separate source findings, browser failures, setup failures and missing checks.

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
