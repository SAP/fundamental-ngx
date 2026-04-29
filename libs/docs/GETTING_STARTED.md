# Fundamental NGX

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

## Overview

Fundamental NGX is the SAP set of Angular component libraries implementing the SAP Design System. Build modern, enterprise-grade applications with the SAP look and feel.

## Packages

### Core Libraries

| Package                                      | Description                                                                                                                                                                             |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@fundamental-ngx/core`](libs/core)         | The foundational UI component library built using [Fundamental Library Styles](https://sap.github.io/fundamental-styles/). Includes buttons, forms, dialogs, tables, and 80+ components |
| [`@fundamental-ngx/platform`](libs/platform) | Higher-level composites built on core with form integration and data binding                                                                                                            |

### UI5 Web Components

| Package                                                                    | Description                             |
| -------------------------------------------------------------------------- | --------------------------------------- |
| [`@fundamental-ngx/ui5-webcomponents`](libs/ui5-webcomponents)             | Angular wrappers for UI5 Web Components |
| [`@fundamental-ngx/ui5-webcomponents-fiori`](libs/ui5-webcomponents-fiori) | Fiori-specific UI5 component wrappers   |
| [`@fundamental-ngx/ui5-webcomponents-ai`](libs/ui5-webcomponents-ai)       | AI-specific UI5 component wrappers      |

### Supporting Packages

| Package                                                      | Description                                                                                                                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@fundamental-ngx/cdk`](libs/cdk)                           | Component Development Kit providing utilities for building custom components - DataSource patterns, ControlValueAccessor helpers, Focusable/selectable list helpers, RxJS subscription management |
| [`@fundamental-ngx/i18n`](libs/i18n)                         | Signal-based internationalization                                                                                                                                                                 |
| [`@fundamental-ngx/datetime-adapter`](libs/datetime-adapter) | Date/time adapter (Day.js)                                                                                                                                                                        |
| [`@fundamental-ngx/moment-adapter`](libs/moment-adapter)     | Date/time adapter (Moment.js, legacy)                                                                                                                                                             |

### Domain-Specific

| Package                            | Description                             |
| ---------------------------------- | --------------------------------------- |
| [`@fundamental-ngx/btp`](libs/btp) | Business Technology Platform components |
| [`@fundamental-ngx/cx`](libs/cx)   | Customer Experience components          |

### Developer Tooling

| Package                                        | Description                         |
| ---------------------------------------------- | ----------------------------------- |
| [`@fundamental-ngx/mcp`](libs/mcp-server)      | MCP server for AI coding assistants |
| [`@fundamental-ngx/nx-plugin`](libs/nx-plugin) | NX generators and executors         |

## Quick Start

### Requirements

- **Node.js**: LTS version recommended
- **Angular**: Version 21 or newer
- **npm**: Included with Node.js
- **TypeScript**: 5.9 or newer

**Peer dependencies** (installed automatically by `ng add`, required for manual installs):

| Package                | Notes                 |
| ---------------------- | --------------------- |
| `@angular/animations`  |                       |
| `@angular/cdk`         |                       |
| `@angular/router`      |                       |
| `@fundamental-ngx/cdk` |                       |
| `fundamental-styles`   | Provides the base CSS |

### Installation

Install the Angular CLI if you don't have it:

```bash
npm install -g @angular/cli
```

Create an Angular app if you don't have one:

```bash
ng new my-app
cd my-app
```

Then add the library:

```bash
ng add @fundamental-ngx/core
```

`ng add` handles everything automatically: peer dependencies, the core stylesheet, theming assets, and theming providers. It will prompt you to choose a theme — the default is `sap_horizon`.

**Manual install** — if you are not using the Angular CLI, after installing all peer dependencies you must:

1. Add to `angular.json` styles:
    ```
    ./node_modules/@fundamental-ngx/core/styles/fundamental-ngx-core.css
    ```
2. Add to `angular.json` assets:
    ```json
    { "glob": "**/css_variables.css", "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/", "output": "./assets/theming-base/" },
    { "glob": "**/*", "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/", "output": "./assets/theming-base/baseTheme/fonts/" },
    { "glob": "**/*", "input": "./node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/fonts/", "output": "./assets/theming-base/sap_horizon/fonts/" },
    { "glob": "**/*", "input": "./node_modules/fundamental-styles/dist/theming/", "output": "./assets/fundamental-styles-theming/" }
    ```
3. Add to `app.config.ts` providers:
    ```typescript
    provideTheming({ defaultTheme: 'sap_horizon', changeThemeOnQueryParamChange: false }), themingInitializer();
    ```

All components are standalone by default — import what you need:

```typescript
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
```

### Hello World

A minimal app using `@fundamental-ngx/core`:

```typescript
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, appConfig).catch(console.error);
```

```typescript
// src/app/app.config.ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideAnimations(),
        provideTheming({ defaultTheme: 'sap_horizon', changeThemeOnQueryParamChange: false }),
        themingInitializer()
    ]
};
```

```typescript
// src/app/app.ts
import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'app-root',
    imports: [ButtonComponent],
    template: `<button fd-button>Hello, Fundamental NGX!</button>`
})
export class App {}
```

See the [documentation site](https://sap.github.io/fundamental-ngx) for component examples and full API details.

## Essential Services

### i18n (`@fundamental-ngx/i18n`)

Centralized internationalization with:

- Pre-compiled translations for 37+ languages
- Runtime translation switching
- Type-safe translation keys
- `FdTranslatePipe` for templates

```typescript
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH, FD_LANGUAGE_GERMAN } from '@fundamental-ngx/i18n';
```

### RTL Support

```typescript
import { RtlService } from '@fundamental-ngx/cdk/utils';

@NgModule({
    providers: [RtlService]
})
```

### Content Density

```typescript
import { provideContentDensity } from '@fundamental-ngx/core/content-density';

providers: [provideContentDensity({ storage: 'localStorage' })];
```

## Running the Documentation App

```bash
# Install dependencies
yarn install

# Start the docs app (all packages)
yarn start

# Start with a specific package only
npx nx serve docs --configuration=core
```

Navigate to `http://localhost:4200` to view the documentation.

## Support

If you encounter an issue, [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and [NEW_COMPONENT.md](NEW_COMPONENT.md) for a step-by-step guide to building new components.

Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit) and the [SAP Contribution Guidelines](https://github.com/SAP/.github/blob/main/CONTRIBUTING.md).

---

## License

See [LICENSE.txt](LICENSE.txt).

## Resources

- [GitHub Repository](https://github.com/SAP/fundamental-ngx)
- [Full Installation Guide](https://github.com/SAP/fundamental-ngx/wiki/Full-Installation-Guide)
- [Breaking Changes](https://github.com/SAP/fundamental-ngx/wiki#breaking-changes)
