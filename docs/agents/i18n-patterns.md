# Internationalization (i18n) with Signals

> This document covers the signal-based internationalization patterns in Fundamental NGX.

## Table of Contents

- [Overview](#overview)
- [Basic Usage Pattern](#basic-usage-pattern)
- [Translation Factory for Multiple Keys](#translation-factory-for-multiple-keys)
- [Translation with Context/Variables](#translation-with-contextvariables)
- [Custom Language/Locale](#custom-languagelocale)
- [Changing Language Globally](#changing-language-globally)
- [How Language and Locale Relate](#how-language-and-locale-relate)
- [When to Set What — App Developer Guide](#when-to-set-what--app-developer-guide)
- [Browser Auto-Detection](#browser-auto-detection)
- [UI5 Web Components Integration](#ui5-web-components-integration)
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

> **Note:** Locale now auto-derives from the language's `locale` field via `linkedSignal`. You only need to provide `fdLocale` explicitly if you want a locale that differs from the language (e.g., French text with Japanese date formatting).

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
        // One call — translations, locale, and UI5 all follow automatically
        this.langSignal.set(FD_LANGUAGE_GERMAN);
    }
}
```

**How it works:**

- `FD_LANGUAGE_SIGNAL` is a `WritableSignal` provided at root level
- All translation signals are `computed()` from this source
- `FD_LOCALE_SIGNAL` auto-derives via `linkedSignal` — no need to set it separately
- If the UI5 bridge is active, `setLanguage()` is called automatically
- Changing the signal triggers automatic updates across the app

---

## How Language and Locale Relate

`FD_LANGUAGE_SIGNAL` is the primary signal. `FD_LOCALE_SIGNAL` derives from it automatically via `linkedSignal`.

```
FD_LANGUAGE_SIGNAL  (WritableSignal<FdLanguage>)
        │
        │  derives via linkedSignal
        ▼
FD_LOCALE_SIGNAL    (WritableSignal<string>)
        │
        │  reads locale
        ▼
UI5 Bridge          (calls setLanguage())
```

**Default behavior:** When you set `FD_LANGUAGE_SIGNAL`, the locale auto-derives from `language.locale`. No need to set `FD_LOCALE_SIGNAL` manually.

```typescript
langSignal.set(FD_LANGUAGE_GERMAN);
// FD_LOCALE_SIGNAL → 'de' (auto-derived from FD_LANGUAGE_GERMAN.locale)
// UI5 → setLanguage('de') (if bridge is active)
```

**Override behavior:** You can still set `FD_LOCALE_SIGNAL` independently for edge cases (e.g., German text + Japanese date formatting). The override resets when the language changes next (linkedSignal behavior).

```typescript
langSignal.set(FD_LANGUAGE_GERMAN); // locale → 'de'
localeSignal.set('ja-JP'); // locale → 'ja-JP' (override)
langSignal.set(FD_LANGUAGE_FRENCH); // locale → 'fr' (override cleared)
```

**Each `FdLanguage` object carries metadata:**

```typescript
export interface FdLanguage {
    locale?: string; // e.g., 'en', 'de', 'fr'
    name?: string; // e.g., 'English', 'Deutsch', 'Français'
    // ... translation keys
}
```

---

## When to Set What — App Developer Guide

| Scenario                                       | What to do                                                                               | Tokens involved                           |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------- |
| **Default (95% of apps)**                      | Nothing — language auto-detects from browser, locale derives, UI5 follows                | `FD_LANGUAGE_AUTO_DETECT` (default: true) |
| **Explicit language at startup**               | Provide `FD_LANGUAGE_SIGNAL` with a `signal(FD_LANGUAGE_*)` in `app.config.ts`           | `FD_LANGUAGE_SIGNAL`                      |
| **Switch language at runtime**                 | Call `langSignal.set(FD_LANGUAGE_*)` — locale and UI5 follow automatically               | `FD_LANGUAGE_SIGNAL`                      |
| **Different formatting than language implies** | Call `localeSignal.set('ja-JP')` after setting language. Resets on next language change. | `FD_LOCALE_SIGNAL` (override)             |
| **Disable auto-detection**                     | Provide `{ provide: FD_LANGUAGE_AUTO_DETECT, useValue: false }`                          | `FD_LANGUAGE_AUTO_DETECT`                 |
| **UI5 web components**                         | Add `provideUi5LanguageBridge()` to app providers                                        | `Ui5LanguageService`                      |

**Key principle:** Set `FD_LANGUAGE_SIGNAL` and let everything else derive. Only touch `FD_LOCALE_SIGNAL` for the rare case where formatting locale must differ from the language.

---

## Browser Auto-Detection

By default, `FD_LANGUAGE_SIGNAL` auto-detects the user's language from Angular's `LOCALE_ID` at bootstrap:

```
navigator.language → Angular LOCALE_ID → detectLanguage() → FD_LANGUAGE_SIGNAL
```

**Resolution order:**

1. Exact locale match (`'de'` → German)
2. Base language match (`'pt-BR'` → Portuguese)
3. Fallback to English

**Opt out** by providing `FD_LANGUAGE_AUTO_DETECT`:

```typescript
providers: [{ provide: FD_LANGUAGE_AUTO_DETECT, useValue: false }];
```

When auto-detection is disabled, `FD_LANGUAGE_SIGNAL` defaults to English (or whatever you provide via a custom provider).

---

## UI5 Web Components Integration

Apps using UI5 wrapper components (`@fundamental-ngx/ui5-webcomponents`, etc.) can activate the language bridge so UI5 components react to FD language changes.

**Setup:**

```typescript
import { provideUi5LanguageBridge } from '@fundamental-ngx/ui5-webcomponents-base/i18n';

export const appConfig: ApplicationConfig = {
    providers: [provideUi5LanguageBridge()]
};
```

**How it works:**

- `Ui5LanguageService` watches `FD_LOCALE_SIGNAL` via `effect()`
- When locale changes, it calls UI5's `setLanguage()` automatically
- Activated via `provideEnvironmentInitializer` — explicit opt-in by the app

**Result:** Changing `FD_LANGUAGE_SIGNAL` updates FD translations, formatting locale, and UI5 component language — all with one call.

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
