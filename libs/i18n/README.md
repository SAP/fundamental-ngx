# @fundamental-ngx/i18n

[![npm version](https://badge.fury.io/js/%40fundamental-ngx%2Fcdk.svg)](//www.npmjs.com/package/@fundamental-ngx/cdk)
![Build Status](https://github.com/SAP/fundamental-ngx/actions/workflows/create-release.yml/badge.svg?branch=main)
![npm](https://img.shields.io/npm/dm/@fundamental-ngx/cdk?label=npm%20downloads)
[![Slack](https://img.shields.io/badge/slack-ui--fundamentals-blue.svg?logo=slack)](https://ui-fundamentals.slack.com)
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

`@fundamental-ngx/i18n` provides centralized internationalization for Fundamental-ngx components with support for 37+ languages and runtime translation switching.

### Quick Start

**1. Provide a language in your app:**

```typescript
import { ApplicationConfig } from '@angular/core';
import { signal } from '@angular/core';
import { FD_LANGUAGE_SIGNAL, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: FD_LANGUAGE_SIGNAL,
            useValue: signal(FD_LANGUAGE_ENGLISH)
        }
    ]
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
import { FD_LANGUAGE_SIGNAL, FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n';

@Component({
    selector: 'language-switcher'
})
export class LanguageSwitcher {
    private readonly langSignal = inject(FD_LANGUAGE_SIGNAL);

    switchToGerman(): void {
        this.langSignal.set(FD_LANGUAGE_GERMAN);
        // All translations update automatically!
    }
}
```

> **📚 Full documentation:** Visit the [i18n documentation](https://sap.github.io/fundamental-ngx/docs/i18n/getting-started) for complete guides, examples, and API reference.

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

**Quick Steps:**

1. Add key to [`FdLanguage`](src/lib/models/fd-language.ts) interface
2. Add same key + English text to all 37+ `.properties` files in `libs/i18n/src/lib/translations/`
3. Run `nx run i18n:transform-translations`
4. Use in your component

---

#### Detailed Guide

**Step 1: Update TypeScript Interface**

Add your key to `libs/i18n/src/lib/models/fd-language.ts`:

```typescript
export interface FdLanguage {
    coreYourComponent: {
        /** Description for translators */
        yourNewKey: FdLanguageKey;
        keyWithParams: FdLanguageKey<{ count: number }>;
    };
}
```

> **Note:** `fd-language-key-identifier.ts` is auto-generated - don't edit manually.

**Step 2: Add to ALL .properties Files**

Add to **all** files in `libs/i18n/src/lib/translations/` (use English text everywhere):

```properties
#XBUT: Button / #XFLD: Label / #XTIT: Title / #XACT: ARIA / #XMSG: Message
coreYourComponent.yourNewKey = Your English text
coreYourComponent.keyWithParams = Item {count}
```

**Why all files?** TypeScript requires identical keys across all languages. Translation teams will replace English placeholders later.

**Step 3: Generate TypeScript Files**

```bash
nx run i18n:transform-translations
```

This auto-generates: `translations*.ts`, `fd-language-key-identifier.ts`, and test files.

**Step 4: Use in Components**

**In Templates:**

```typescript
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

@Component({
    imports: [FdTranslatePipe],
    template: `<button>{{ ('coreYourComponent.yourNewKey' | fdTranslate)() }}</button>`
    //                                                                   ^^
    //                                                         Signal invocation!
})
```

> **Important:** The pipe returns `Signal<string>`, invoke with `()`.

**In TypeScript:**

```typescript
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';

export class MyComponent {
    // Creates a computed signal that updates when language changes
    protected readonly label = resolveTranslationSignal('coreYourComponent.yourNewKey');
}
```

**With Parameters:**

```typescript
protected readonly message = resolveTranslationSignal('coreYourComponent.keyWithParams', { count: 5 });
// {{ message() }} renders as: "Item 5"
```

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
