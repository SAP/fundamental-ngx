# Fundamental Library for Angular

[![REUSE status](https://api.reuse.software/badge/github.com/SAP/fundamental-ngx)](https://api.reuse.software/info/github.com/SAP/fundamental-ngx)

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-light.svg" alt="Deploys by Netlify" />
</a>

**The official SAP-maintained Angular library for UI5 Web Components and the SAP design system.** Ships 1000+ components across 14 packages, targeting Angular 21+.

[Documentation](https://sap.github.io/fundamental-ngx) | [Component Playground](https://sap.github.io/fundamental-ngx)

## Packages

### UI5 Web Components

Angular wrappers for the [@ui5/webcomponents](https://sap.github.io/ui5-webcomponents) project, letting you use UI5 Web Components in Angular without needing [CUSTOM_ELEMENTS_SCHEMA](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA) or [NO_ERRORS_SCHEMA](https://angular.io/api/core/NO_ERRORS_SCHEMA). Provides full type safety and access to the underlying web components in a type-safe environment. Everything available on the [@ui5/webcomponents](https://sap.github.io/ui5-webcomponents) side is available here.

| Package                                                                    | Description                               |
| -------------------------------------------------------------------------- | ----------------------------------------- |
| [`@fundamental-ngx/ui5-webcomponents`](libs/ui5-webcomponents)             | Angular wrappers for UI5 Web Components   |
| [`@fundamental-ngx/ui5-webcomponents-fiori`](libs/ui5-webcomponents-fiori) | Angular wrappers for UI5 Fiori components |
| [`@fundamental-ngx/ui5-webcomponents-ai`](libs/ui5-webcomponents-ai)       | Angular wrappers for UI5 AI components    |

### Core Libraries

| Package                                      | Description                                                                  |
| -------------------------------------------- | ---------------------------------------------------------------------------- |
| [`@fundamental-ngx/core`](libs/core)         | Base UI components (button, dialog, card, calendar, table, etc.)             |
| [`@fundamental-ngx/platform`](libs/platform) | Higher-level composites built on core with form integration and data binding |

## AI Integration (MCP Server)

The [`@fundamental-ngx/mcp`](https://github.com/SAP/fundamental-ngx/tree/main/libs/mcp-server) package is an MCP ([Model Context Protocol](https://modelcontextprotocol.io)) server that gives AI coding assistants structured access to the entire Fundamental NGX component catalog — 1000+ components across 8 libraries.

With it, your AI assistant can look up component APIs, get usage examples, compare alternatives, check accessibility guidance, and receive migration help — all from actual component metadata, not hallucinated docs.

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

See the [full MCP server documentation](https://github.com/SAP/fundamental-ngx/tree/main/libs/mcp-server) for available tools and schema details.

## <a name="2"></a>2. Requirements

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

## Getting Started

### Requirements

- Angular 21 or newer
- Node.js (LTS)
- Yarn (`corepack enable`, then `yarn`)

### Installation

```bash
ng add @fundamental-ngx/core
```

All components are standalone by default — import what you need:

```typescript
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
```

See the [documentation site](https://sap.github.io/fundamental-ngx) for component examples and API details.

## Known Issues

See [Issues](https://github.com/SAP/fundamental-ngx/issues).

## Support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-ngx/issues).

Angular version support: features and enhancements target the latest version. Bugfixes can be downported to the version compiled with the previous Angular release. More details on the [Angular Versions Support](https://github.com/SAP/fundamental-ngx/wiki/Angular-Versions-Support) wiki page.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and [NEW_COMPONENT.md](NEW_COMPONENT.md) for building new components.

Please follow the [Angular commit message guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit) and the [SAP Contribution Guidelines](https://github.com/SAP/.github/blob/main/CONTRIBUTING.md).

## License

See [LICENSE.txt](LICENSE.txt).
