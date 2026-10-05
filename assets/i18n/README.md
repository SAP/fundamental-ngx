# @fundamental-ngx/i18n

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fi18n.svg)](//www.npmjs.com/package/@fundamental-ngx/i18n)
![Build Status](https://github.com/SAP/fundamental-ngx/actions/workflows/create-release.yml/badge.svg?branch=main)
![npm](https://img.shields.io/npm/dm/@fundamental-ngx/i18n?label=npm%20downloads)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Content

- [1. Description](#1-description)
    - [Quick Start](#quick-start)
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

`@fundamental-ngx/i18n` provides centralized internationalization for Fundamental ngx components with support for 37+ languages and runtime translation switching.

### Quick Start

**1. Provide a language in your app (optional — auto-detects from browser by default):**

By default, `FD_LANGUAGE_SIGNAL` reads the browser's locale via Angular's `LOCALE_ID` and picks the closest built-in language. An explicit provider is only needed if you want to override the default.

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideFundamentalTranslations } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';
import { FD_LANGUAGE_FRENCH } from '@fundamental-ngx/i18n/fr';

export const appConfig: ApplicationConfig = {
    providers: [provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)]
};
```

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
import { FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';

@Component({
    selector: 'language-switcher'
})
export class LanguageSwitcher {
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL);

    switchToGerman(): void {
        this.langSignal.set(FD_LANGUAGE_GERMAN);
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
import { FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n/de';

FD_LANGUAGE_GERMAN.locale; // 'de'
FD_LANGUAGE_GERMAN.name; // 'Deutsch'
```

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

### What's Included

- Pre-compiled translation data for 37+ languages (as `FD_LANGUAGE_*` constants)
- **Signal-based** translation resolver utilities
- `FdTranslatePipe` for template translations (returns `Signal<string>`)
- Type-safe translation keys via `FdLanguage` interface

### How It Works

1. **Source**: Translation teams provide `.properties` files (Java-style format)
2. **Build**: NX executor converts `.properties` → TypeScript modules
3. **Export**: Language constants (`FD_LANGUAGE_ENGLISH`, `FD_LANGUAGE_GERMAN`, etc.)
4. **Publish**: Compiled JavaScript (not source `.properties`) published to npm
5. **Use**: Apps import language constants and translation utilities

While designed for Fundamental-ngx components, this library works in any Angular application needing runtime-switchable translations.

### Adding New Translation Keys

> **Note:** This guide is for adding new translation keys (labels, ARIA attributes), NOT for adding new languages.

**Run the CLI** — it updates `translations.properties` and `fd-language.ts` automatically:

```bash
nx run i18n:i18n-manage --command=add --key=coreYourComponent.yourNewKey --value="Your English text"
```

For keys that require typed parameters (e.g., `FdLanguageKey<{ count: number }>`), update `fd-language.ts` manually after running the command.

**Verify:**

```bash
nx run i18n:i18n-manage --command=validate
```

For rename, remove, update, search, sort, and validation commands, see the [i18n-manage CLI reference](../nx-plugin/src/executors/i18n-manage/README.md).

## 2. Requirements

- Node.js and npm
- Angular 22 or newer
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
