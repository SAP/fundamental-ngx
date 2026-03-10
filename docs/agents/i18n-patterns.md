# Internationalization (i18n) with Signals

> This document covers the signal-based internationalization patterns in Fundamental NGX.

## Table of Contents

- [Overview](#overview)
- [Basic Usage Pattern](#basic-usage-pattern)
- [Translation Factory for Multiple Keys](#translation-factory-for-multiple-keys)
- [Translation with Context/Variables](#translation-with-contextvariables)
- [Custom Language/Locale](#custom-languagelocale)
- [Changing Language Globally](#changing-language-globally)
- [Testing with Signals](#testing-with-signals)

---

## Overview

The `@fundamental-ngx/i18n` library provides signal-based internationalization with zoneless compatibility.

**Modern Signal-Based API:**

- **Signal tokens** → `FD_LANGUAGE_SIGNAL`, `FD_LOCALE_SIGNAL`
- **Signal resolution** → `resolveTranslationSignal()`, `resolveTranslationSignalFn()`
- **Template usage** → `{{ translatedLabel() }}` (no async pipe needed)

**Benefits:**

- ✅ No `async` pipe in templates
- ✅ Simpler template syntax
- ✅ Better performance (no RxJS overhead)
- ✅ Zoneless compatible
- ✅ Automatic change detection

---

## Basic Usage Pattern

### Direct translation with signal

```typescript
import { Component, computed, inject } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, resolveTranslationSignal } from '@fundamental-ngx/i18n';

@Component({
    selector: 'my-component',
    template: '{{ label() }}'
})
export class MyComponent {
    // Inject signal token
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL);

    // Create computed translation signal
    readonly label = computed(() => this.langSignal().coreButton.label);

    // Alternative: use helper function for single translation
    readonly tooltipSignal = resolveTranslationSignal('coreButton.tooltip');
}
```

---

## Translation Factory for Multiple Keys

When you need multiple translations in the same component:

```typescript
import { Component, computed, inject } from '@angular/core';
import { resolveTranslationSignalFn } from '@fundamental-ngx/i18n';

@Component({
    selector: 'my-form',
    template: `
        <button>{{ submitLabel() }}</button>
        <button>{{ cancelLabel() }}</button>
    `
})
export class MyForm {
    // Create translation factory once
    private readonly translate = resolveTranslationSignalFn();

    // Use factory for multiple translations
    readonly submitLabel = this.translate('coreForm.submit');
    readonly cancelLabel = this.translate('coreForm.cancel');
}
```

**When to use:**

- Multiple translations in the same component
- Want to avoid repeating inject() calls
- Need consistent translation resolution logic

---

## Translation with Context/Variables

For translations that include dynamic values:

```typescript
import { Component, computed, signal } from '@angular/core';
import { resolveTranslationSignalFn } from '@fundamental-ngx/i18n';

@Component({
    selector: 'user-greeting',
    template: '{{ greeting() }}'
})
export class UserGreeting {
    private readonly translate = resolveTranslationSignalFn();
    readonly username = signal('John');

    // Pass context object for variable substitution
    readonly greeting = this.translate('coreMessages.welcome', {
        name: this.username()
    });
}
```

**Translation key example:**

```typescript
// In language file:
coreMessages: {
    welcome: 'Welcome, {{name}}!';
}
```

---

## Custom Language/Locale

Override the default language for specific components:

```typescript
import { Component, signal } from '@angular/core';
import { resolveTranslationSignalFn, FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n';

@Component({
    selector: 'french-component'
})
export class FrenchComponent {
    // Override default language
    private readonly translate = resolveTranslationSignalFn({
        fdLang: signal(FD_LANGUAGE_FRENCH),
        fdLocale: signal('fr-FR')
    });

    readonly label = this.translate('coreButton.label');
}
```

**When to use:**

- Component needs a different language than global setting
- Testing with specific language
- Multi-language UI sections

---

## Changing Language Globally

```typescript
import { Component, inject } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n';

@Component({
    selector: 'language-switcher',
    template: `<button (click)="switchToGerman()">Deutsch</button>`
})
export class LanguageSwitcher {
    // Inject writable signal
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL);

    switchToGerman(): void {
        // Update the signal - all translations react automatically
        this.langSignal.set(FD_LANGUAGE_GERMAN);
    }
}
```

**How it works:**

- `FD_LANGUAGE_SIGNAL` is a `WritableSignal` provided at root level
- All translation signals are `computed()` from this source
- Changing the signal triggers automatic updates across the app

---

## Architecture Notes

### Signal-first design

- `FD_LANGUAGE_SIGNAL` is the source of truth (WritableSignal)
- All translation signals are `computed()` from this source
- Same pattern for `FD_LOCALE_SIGNAL` / `FD_LOCALE`

### Why signals

- Simpler mental model (just values that change)
- Better performance (fine-grained reactivity)
- Zoneless compatible
- Less boilerplate (no pipe, map, async)
- Type-safe by default

---

## Testing with Signals

```typescript
import { TestBed } from '@angular/core/testing';
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

**Testing tips:**

- Create a writable signal to control language in tests
- Provide the signal via TestBed providers
- Change the signal and verify the component updates
