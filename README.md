# Fundamental Library for Angular

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-light.svg" alt="Deploys by Netlify" />
</a>

**The official SAP-maintained Angular library for UI5 Web Components and the SAP design system.** Ships 1000+ components across 14 packages, targeting Angular 21+.

[Documentation](https://sap.github.io/fundamental-ngx) | [Component Playground](https://sap.github.io/fundamental-ngx)

## Packages

### Core Libraries

| Package                                      | Description                                                                  |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| [`@fundamental-ngx/core`](libs/core)         | Base UI components (button, dialog, card, calendar, table, etc.)             |
| [`@fundamental-ngx/platform`](libs/platform) | Higher-level composites built on core with form integration and data binding |

### UI5 Web Components

| Package                                                                    | Description                             |
| -------------------------------------------------------------------------- | --------------------------------------- |
| [`@fundamental-ngx/ui5-webcomponents`](libs/ui5-webcomponents)             | Angular wrappers for UI5 Web Components |
| [`@fundamental-ngx/ui5-webcomponents-fiori`](libs/ui5-webcomponents-fiori) | Fiori-specific UI5 component wrappers   |
| [`@fundamental-ngx/ui5-webcomponents-ai`](libs/ui5-webcomponents-ai)       | AI-specific UI5 component wrappers      |

### Supporting Packages

| Package                                                      | Description                                |
| ------------------------------------------------------------ | ------------------------------------------ |
| [`@fundamental-ngx/cdk`](libs/cdk)                           | Utilities, forms, data-source abstractions |
| [`@fundamental-ngx/i18n`](libs/i18n)                         | Signal-based internationalization          |
| [`@fundamental-ngx/datetime-adapter`](libs/datetime-adapter) | Date/time adapter (Day.js)                 |
| [`@fundamental-ngx/moment-adapter`](libs/moment-adapter)     | Date/time adapter (Moment.js, legacy)      |

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

## Getting Started

### Requirements

- Angular 21 or newer
- TypeScript 5.9 or newer
- Node.js (LTS)

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

## AI Integration (MCP Server)

[`@fundamental-ngx/mcp`](libs/mcp-server) is an MCP ([Model Context Protocol](https://modelcontextprotocol.io)) server that gives AI coding assistants structured access to the entire component catalog — APIs, examples, design tokens, accessibility guidance, and migration help from actual component metadata.

### Quick Start

**VS Code / Cursor** — create or edit `.vscode/mcp.json`:

```json
{
    "servers": {
        "fundamental-ngx": {
            "command": "npx",
            "args": ["-y", "@fundamental-ngx/mcp"]
        }
    }
}
```

**Claude Code:**

```bash
claude mcp add fundamental-ngx -- npx -y @fundamental-ngx/mcp
```

**Windsurf** — add to `~/.codeium/windsurf/mcp_config.json`:

```json
{
    "mcpServers": {
        "fundamental-ngx": {
            "command": "npx",
            "args": ["-y", "@fundamental-ngx/mcp"]
        }
    }
}
```

See the [full MCP server documentation](libs/mcp-server) for available tools and schema details.

## Known Issues

See [Issues](https://github.com/SAP/fundamental-ngx/issues).

## Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

Angular version support: features and enhancements target the latest version. Bugfixes can be downported to the version compiled with the previous Angular release. More details on the [Angular Versions Support](https://github.com/SAP/fundamental-ngx/wiki/Angular-Versions-Support) wiki page.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and [NEW_COMPONENT.md](NEW_COMPONENT.md) for a step-by-step guide to building new components.

Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit) and the [SAP Contribution Guidelines](https://github.com/SAP/.github/blob/main/CONTRIBUTING.md).

## License

See [LICENSE.txt](LICENSE.txt).
