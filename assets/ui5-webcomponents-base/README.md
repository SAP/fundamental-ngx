# @fundamental-ngx/ui5-webcomponents-base

Base utilities and types shared across all `@fundamental-ngx/ui5-webcomponents-*` packages.

## Overview

This library provides the shared infrastructure used by the Angular wrappers for UI5 Web Components. It is installed automatically as a peer dependency of `@fundamental-ngx/ui5-webcomponents`, `@fundamental-ngx/ui5-webcomponents-fiori`, and `@fundamental-ngx/ui5-webcomponents-ai`.

**What's included:**

- Re-exported UI5 Web Components type enums (`ValueState`, `CalendarType`, `AnimationMode`, etc.)
- `UI5WrapperCustomEvent<T, N>` — TypeScript helper for typed custom event payloads from wrapper components
- Theming API (`provideUi5Theming`, `Ui5ThemingProvider`) for SAP theming integration
- Language bridge (`provideUi5LanguageBridge`) — syncs Fundamental NGX locale to UI5 Web Components

## Installation

This package is installed automatically as a dependency of the UI5 wrapper libraries:

```bash
npm install @fundamental-ngx/ui5-webcomponents
```

If you need it standalone:

```bash
npm install @fundamental-ngx/ui5-webcomponents-base
```

## Usage

### Typed custom events

Use `UI5WrapperCustomEvent<T, N>` to get the strongly-typed payload of a UI5 wrapper output:

```typescript
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { ButtonComponent } from '@fundamental-ngx/ui5-webcomponents';

// Get the event payload type for the "click" output of ButtonComponent
type ClickEvent = UI5WrapperCustomEvent<ButtonComponent, 'ui5Click'>;
```

### Re-exported UI5 types

Common UI5 enums are re-exported so you don't need to import from `@ui5/webcomponents-base` directly:

```typescript
import { ValueState, CalendarType, AnimationMode } from '@fundamental-ngx/ui5-webcomponents-base';
```

### Language bridge

The language bridge keeps UI5 Web Components in sync with the Fundamental NGX locale signal. Add it once in your root providers:

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideUi5LanguageBridge } from '@fundamental-ngx/ui5-webcomponents-base/i18n';

export const appConfig: ApplicationConfig = {
    providers: [provideUi5LanguageBridge()],
};
```

After this, changing the `FD_LANGUAGE_SIGNAL` will automatically update the locale used by UI5 Web Components.

## Resources

- [UI5 Web Components Documentation](https://sap.github.io/ui5-webcomponents/)
- [Fundamental NGX Documentation](https://sap.github.io/fundamental-ngx)
- [GitHub Repository](https://github.com/SAP/fundamental-ngx)
