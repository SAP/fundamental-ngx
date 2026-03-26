---
paths:
    [
        'libs/ui5-webcomponents/**',
        'libs/ui5-webcomponents-fiori/**',
        'libs/ui5-webcomponents-ai/**',
        'libs/ui5-webcomponents-base/**'
    ]
alwaysApply: false
---

# UI5 Web Component Wrappers

Files in `libs/ui5-webcomponents*` are **auto-generated** by `libs/webc-generator`.

## Rules

- **DO NOT** hand-edit generated wrapper files. Changes will be overwritten.
- To modify wrapper behavior, edit the generator in `libs/webc-generator/`.
- The `ui5-webcomponents-base` library provides shared infrastructure (i18n bridge, base classes).
- Wrappers are transparent to i18n -- no special handling needed.

## Dependency Scope

UI5 wrapper libraries may only depend on `ui5-webcomponents-base`. They must not import from `core`, `platform`, `cdk`, or other libraries.

## i18n Integration

Apps using UI5 wrappers can activate the language bridge:

```typescript
import { provideUi5LanguageBridge } from '@fundamental-ngx/ui5-webcomponents-base/i18n';
// Add to app providers -- UI5 components then react to FD_LANGUAGE_SIGNAL changes
```
