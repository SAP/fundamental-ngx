# @fundamental-ngx/i18n

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fcdk.svg)](//www.npmjs.com/package/@fundamental-ngx/cdk)
![Build Status](https://github.com/SAP/fundamental-ngx/actions/workflows/create-release.yml/badge.svg?branch=main)
![npm](https://img.shields.io/npm/dm/@fundamental-ngx/cdk?label=npm%20downloads)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Content

- [1. Description](#1-description)
    - [Quick Start](#quick-start)
    - [Public API — Language Registration](#public-api--language-registration)
    - [What's Included](#whats-included)
    - [How It Works](#how-it-works)
    - [Adding New Translation Keys](#adding-new-translation-keys)
- [2. Requirements](#2-requirements)
- [3. Versioning](#3-versioning)
- [4. Known Issues](#4-known-issues)
- [5. Support](#5-support)
- [6. Contributing](#6-contributing)
- [7. License](https://github.com/SAP/fundamental-ngx/blob/main/LICENSE.txt)

## 1. Description

`@fundamental-ngx/i18n` provides centralized internationalization for Fundamental-ngx components with support for 37+ languages and runtime translation switching.

### Quick Start

**1. Register the languages your app uses:**

English works with zero setup. For any other language you **must** register it at bootstrap — otherwise a non-English `LOCALE_ID` silently falls back to English and logs a warning in development mode.

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideFundamentalTranslations } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n';

export const appConfig: ApplicationConfig = {
    providers: [
        // Register only the languages your app supports (keeps the bundle small):
        provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)
    ]
};
```

To restore the old behavior of including all 37 languages (larger bundle, no per-language registration needed):

```typescript
import { provideAllFundamentalLanguages } from '@fundamental-ngx/i18n';

export const appConfig: ApplicationConfig = {
    providers: [provideAllFundamentalLanguages()]
};
```

English-only apps need neither provider.

**2. Use translations in templates:**

```typescript
import { Component } from '@angular/core';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

@Component({
    selector: 'my-component',
    template: `<button>{{ ('coreButton.save' | fdTranslate)() }}</button>`,
    imports: [FdTranslatePipe]
})
export class MyComponent {}
```

**3. Use translations in TypeScript:**

```typescript
import { Component } from '@angular/core';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';

@Component({
    selector: 'my-component',
    template: `<button>{{ saveLabel() }}</button>`
})
export class MyComponent {
    protected readonly saveLabel = resolveTranslationSignal('coreButton.save');
}
```

**4. Change language at runtime:**

```typescript
import { Component, inject } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n';

@Component({
    selector: 'language-switcher'
})
export class LanguageSwitcher {
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL);

    switchToGerman(): void {
        this.langSignal.set(FD_LANGUAGE_GERMAN);
        // Locale + UI5 language update automatically — one call is all you need!
    }
}
```

> **Full documentation:** Visit the [i18n documentation](https://sap.github.io/fundamental-ngx/docs/i18n/getting-started) for complete guides, examples, and API reference.

### Language & Locale Architecture

`FD_LANGUAGE_SIGNAL` is the single entry point for language switching. When you set it, everything follows:

```
FD_LANGUAGE_SIGNAL  →  FD_LOCALE_SIGNAL (auto-derived via linkedSignal)
                    →  UI5 setLanguage() (if bridge active)
                    →  All translation signals
```

Each built-in language carries `locale` and `name` metadata:

```typescript
FD_LANGUAGE_GERMAN.locale; // 'de'
FD_LANGUAGE_GERMAN.name; // 'Deutsch'
```

`FD_LOCALE_SIGNAL` derives from `language.locale` by default. You can still override it independently for edge cases (e.g., German text with Japanese date formatting), but the override clears when the language changes next.

### UI5 Integration

Apps using `@fundamental-ngx/ui5-webcomponents` can activate the language bridge:

```typescript
import { provideUi5LanguageBridge } from '@fundamental-ngx/ui5-webcomponents-base/i18n';

export const appConfig: ApplicationConfig = {
    providers: [provideUi5LanguageBridge()]
};
```

The bridge watches `FD_LOCALE_SIGNAL` and calls UI5's `setLanguage()` reactively. Changing `FD_LANGUAGE_SIGNAL` updates both FD and UI5 components.

### Opting Out of Auto-Detection

To disable browser language auto-detection:

```typescript
import { FD_LANGUAGE_AUTO_DETECT } from '@fundamental-ngx/i18n';

providers: [{ provide: FD_LANGUAGE_AUTO_DETECT, useValue: false }];
```

When disabled, `FD_LANGUAGE_SIGNAL` defaults to English unless you provide a custom value.

### Public API — Language Registration

| Export                                     | Purpose                                                                                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `provideFundamentalTranslations(...langs)` | Register specific languages at bootstrap. Only listed languages are bundled. **Recommended.**                                             |
| `provideAllFundamentalLanguages()`         | Register all 37 built-in languages. Restores pre-lazy bundle behavior (one-line escape hatch).                                            |
| `FD_LANGUAGE_SIGNAL`                       | `InjectionToken<WritableSignal<FdLanguage>>` — the single source of truth for the active language.                                        |
| `FD_LOCALE_SIGNAL`                         | Derived from `FD_LANGUAGE_SIGNAL.locale`; override only for edge-case locale/language splits.                                             |
| `FD_LANGUAGE_AUTO_DETECT`                  | Set to `false` to disable browser locale auto-detection (defaults to `true`).                                                             |
| `registerLanguage(lang, ...aliases)`       | Low-level runtime registration — prefer `provideFundamentalTranslations()`. Useful for languages loaded dynamically (e.g. from a server). |
| `FD_LANGUAGE_*` constants                  | Pre-compiled translation objects for each supported locale (e.g. `FD_LANGUAGE_GERMAN`).                                                   |

### What's Included

- Pre-compiled translation data for 37+ languages (as `FD_LANGUAGE_*` constants)
- **Signal-based** translation resolver utilities
- `FdTranslatePipe` for template translations (returns `Signal<string>`)
- Type-safe translation keys via `FdLanguage` interface

### Signal-based Reactivity

Built on Angular signals for optimal performance and developer experience:

- ✅ Significantly better performance (fine-grained reactivity)
- ✅ Automatic cleanup (no subscriptions)
- ✅ Zoneless compatible
- ✅ Simpler, cleaner API

### How It Works

1. **Source**: Translation teams provide `.properties` files (Java-style format)
2. **Build**: NX executor converts `.properties` → TypeScript modules
3. **Export**: Language constants (`FD_LANGUAGE_ENGLISH`, `FD_LANGUAGE_GERMAN`, etc.)
4. **Publish**: Compiled JavaScript (not source `.properties`) published to npm
5. **Use**: Apps import language constants and translation utilities

While designed for Fundamental-ngx components, this library works in any Angular application needing runtime-switchable translations.

### Adding New Translation Keys

> **Note:** This guide is for adding new translation keys (labels, ARIA attributes), NOT for adding new languages.

**The only manual file is `libs/i18n/src/lib/models/fd-language.ts`** — the `FdLanguage` interface that defines the runtime type shape. No CLI tool updates this file; you must edit it by hand. Skipping this step causes a misleading `TS2554: Expected 2 arguments, but got 1` build error.

**Steps:**

1. **Update `fd-language.ts`** — add the property to the `FdLanguage` interface in the correct section:

    ```typescript
    coreYourComponent: {
        /** Description for translators */
        yourNewKey: FdLanguageKey;
    }
    ```

2. **Run the CLI** — adds the key to all 37 `.properties` files and regenerates TypeScript:

    ```bash
    nx run i18n:i18n-manage --command=add --key=coreYourComponent.yourNewKey --value="Your English text"
    ```

3. **Verify:**

    ```bash
    nx run i18n:i18n-manage --command=validate
    ```

For rename, remove, update, search, sort, and validation commands, see the [i18n-manage CLI reference](../nx-plugin/src/executors/i18n-manage/README.md).

**Generated files — do not edit manually:**

- `fd-language-key-identifier.ts` — union type, regenerated by `i18n-manage --command=sync`
- `translations_*.ts` — TypeScript modules, regenerated from `.properties` files

## 2. Requirements

- Node.js and npm
- Angular 16.2 or newer
- Prior Angular knowledge recommended

## 3. Versioning

See [Breaking Changes](https://github.com/SAP/fundamental-ngx/wiki#breaking-changes) for the latest updates.

## 4. Known Issues

See [Issues](https://github.com/SAP/fundamental-ngx/issues).

## 5. Support

[Create a ticket](https://github.com/SAP/fundamental-ngx/issues) for issues or questions.

## 6. Contributing

Check [CONTRIBUTING.md](https://github.com/SAP/fundamental-ngx/blob/main/CONTRIBUTING.md) for guidelines. Follow [Angular commit message guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).

See [NEW_COMPONENT.md](https://github.com/SAP/fundamental-ngx/blob/main/NEW_COMPONENT.md) for creating new components.
