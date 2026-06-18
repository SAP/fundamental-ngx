## 0.63.0-rc.31 (2026-06-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.30 (2026-06-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.29 (2026-06-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.28 (2026-06-16)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.27 (2026-06-16)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.26 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.25 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.24 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.23 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.22 (2026-06-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.21 (2026-06-13)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.20 (2026-06-12)

### 🩹 Fixes

- **ci:** generate components.json before netlify docs build ([#14285](https://github.com/SAP/fundamental-ngx/pull/14285))

### ❤️ Thank You

- deno

## 0.63.0-rc.19 (2026-06-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.18 (2026-06-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.17 (2026-06-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.16 (2026-06-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.15 (2026-06-10)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.14 (2026-06-10)

### 🚀 Features

- **core:** add header content area to User Menu, adopt latest fund-styles ([#14268](https://github.com/SAP/fundamental-ngx/pull/14268))

### ❤️ Thank You

- Inna Atanasova @InnaAtanasova

## 0.63.0-rc.13 (2026-06-10)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.12 (2026-06-10)

### 🩹 Fixes

- datetime adapters migration ([#14016](https://github.com/SAP/fundamental-ngx/pull/14016))

### ❤️ Thank You

- deno
- github-actions

## 0.63.0-rc.11 (2026-06-09)

### 🚀 Features

- **mcp:** MCP server evaluation - part 6 ([#14259](https://github.com/SAP/fundamental-ngx/pull/14259))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.63.0-rc.10 (2026-06-09)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.9 (2026-06-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.8 (2026-06-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.7 (2026-06-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.6 (2026-06-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.5 (2026-06-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.4 (2026-06-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.3 (2026-06-04)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.2 (2026-06-01)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.1 (2026-05-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.63.0-rc.0 (2026-05-28)

### 🚀 Features

- ⚠️  **mcp:** MCP server evaluation - part 5 ([#14224](https://github.com/SAP/fundamental-ngx/pull/14224))

### ⚠️  Breaking Changes

- **mcp:** MCP server evaluation - part 5  ([#14224](https://github.com/SAP/fundamental-ngx/pull/14224))
  recommend_components removed. It used a hardcoded
  23-entry UI_PATTERNS dict that missed the entire platform form layer
  (fdp-form-group, fdp-form-field). Use search_components with relevant
  keywords instead.
  BREAKING CHANGE: get_design_tokens removed. The corpus was only 92
  tokens (42 hardcoded SAP theme vars + 50 spacing utility classes);
  focus, disabled, and hover tokens were absent, making it unusable for
  component styling. Use @fundamental-styles/mcp get_design_tokens
  (1500+ tokens) instead.
  BREAKING CHANGE: get_migration_guide tool removed from @fundamental-ngx/mcp.
  BREAKING CHANGE: get_accessibility_guide tool removed from @fundamental-ngx/mcp.
  Use get_component_api — it returns all inputs (including ARIA inputs with
  descriptions) and the keyboardHandling field.

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.4-rc.9 (2026-05-27)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.8 (2026-05-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.7 (2026-05-23)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.6 (2026-05-21)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.5 (2026-05-21)

### 🚀 Features

- **mcp:** MCP server evaluation - part 4 ([#14221](https://github.com/SAP/fundamental-ngx/pull/14221))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.4-rc.4 (2026-05-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.3 (2026-05-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.2 (2026-05-20)

### 🚀 Features

- **mcp:** MCP server evaluation part 3 - Skills ([#14211](https://github.com/SAP/fundamental-ngx/pull/14211))

### ❤️ Thank You

- Copilot
- Maria Dineva @MariaIDineva

## 0.62.4-rc.1 (2026-05-19)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.4-rc.0 (2026-05-18)

### 🩹 Fixes

- **ui5:** bridge ThemingService to UI5 Web Components and fix theme propagation ([#14188](https://github.com/SAP/fundamental-ngx/pull/14188))

### ❤️ Thank You

- deno

## 0.62.3 (2026-05-18)

### 🚀 Features

- **mcp:** MCP server evaluation part 2 ([#14208](https://github.com/SAP/fundamental-ngx/pull/14208), [#1](https://github.com/SAP/fundamental-ngx/issues/1), [#2](https://github.com/SAP/fundamental-ngx/issues/2), [#3](https://github.com/SAP/fundamental-ngx/issues/3), [#4](https://github.com/SAP/fundamental-ngx/issues/4), [#5](https://github.com/SAP/fundamental-ngx/issues/5), [#6](https://github.com/SAP/fundamental-ngx/issues/6), [#7](https://github.com/SAP/fundamental-ngx/issues/7))
- MCP server evaluation - part 1 ([#14178](https://github.com/SAP/fundamental-ngx/pull/14178), [#14159](https://github.com/SAP/fundamental-ngx/issues/14159))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.3-rc.5 (2026-05-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.3-rc.4 (2026-05-18)

### 🚀 Features

- **mcp:** MCP server evaluation part 2 ([#14208](https://github.com/SAP/fundamental-ngx/pull/14208), [#1](https://github.com/SAP/fundamental-ngx/issues/1), [#2](https://github.com/SAP/fundamental-ngx/issues/2), [#3](https://github.com/SAP/fundamental-ngx/issues/3), [#4](https://github.com/SAP/fundamental-ngx/issues/4), [#5](https://github.com/SAP/fundamental-ngx/issues/5), [#6](https://github.com/SAP/fundamental-ngx/issues/6), [#7](https://github.com/SAP/fundamental-ngx/issues/7))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.3-rc.3 (2026-05-15)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.3-rc.2 (2026-05-14)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.3-rc.1 (2026-05-13)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.3-rc.0 (2026-05-13)

### 🚀 Features

- MCP server evaluation - part 1 ([#14178](https://github.com/SAP/fundamental-ngx/pull/14178), [#14159](https://github.com/SAP/fundamental-ngx/issues/14159))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.2 (2026-05-13)

### 🚀 Features

- **core:** improve MCP server metadata and add usage guide tool ([#14159](https://github.com/SAP/fundamental-ngx/pull/14159))

### ❤️ Thank You

- deno

## 0.62.2-rc.17 (2026-05-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.16 (2026-05-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.15 (2026-05-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.14 (2026-05-12)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.13 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.12 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.11 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.10 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.9 (2026-05-11)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.8 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.7 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.6 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.5 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.4 (2026-05-08)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.3 (2026-05-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.2 (2026-05-05)

### 🚀 Features

- **core:** improve MCP server metadata and add usage guide tool ([#14159](https://github.com/SAP/fundamental-ngx/pull/14159))

### ❤️ Thank You

- deno

## 0.62.2-rc.1 (2026-05-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.2-rc.0 (2026-05-05)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.1 (2026-05-03)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.1-rc.0 (2026-05-01)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0 (2026-04-29)

### 🚀 Features

- add mcp ([#14121](https://github.com/SAP/fundamental-ngx/pull/14121))
- **i18n,ui5:** implement ui5 locale support ([#13981](https://github.com/SAP/fundamental-ngx/pull/13981))
- **i18n:** introduce i18n cli commands and GHAction for translation ([#13968](https://github.com/SAP/fundamental-ngx/pull/13968))
- i18n migration ([#13937](https://github.com/SAP/fundamental-ngx/pull/13937))

### 🩹 Fixes

- **ui5:** make webcomponents wrappers more visible ([#14156](https://github.com/SAP/fundamental-ngx/pull/14156))
- **ci:** harden workflow security against injection and over-permissioning ([#14084](https://github.com/SAP/fundamental-ngx/pull/14084))
- **core, platform:** adopt latest fund-styles changes ([#14102](https://github.com/SAP/fundamental-ngx/pull/14102))
- **core:** fix mobile popover/menu reopen and form-item NG0100 ([#14087](https://github.com/SAP/fundamental-ngx/pull/14087))
- ⚠️  **core:** remove Angular animation dependncy + redesign example cards with density toggle, responsive preview, and keyboard hints ([#14077](https://github.com/SAP/fundamental-ngx/pull/14077))
- **ci:** allow .ts files in i18n fork PR validation ([#14062](https://github.com/SAP/fundamental-ngx/pull/14062))

### ⚠️  Breaking Changes

- **core:** remove Angular animation dependncy + redesign example cards with density toggle, responsive preview, and keyboard hints  ([#14077](https://github.com/SAP/fundamental-ngx/pull/14077))
  @angular/animations is no longer required by @fundamental-ngx/core. The add-animations schematic has been removed.

### ❤️ Thank You

- deno
- Inna Atanasova @InnaAtanasova
- Maria Dineva @MariaIDineva

## 0.62.0-rc.101 (2026-04-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.100 (2026-04-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.99 (2026-04-29)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.98 (2026-04-28)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.97 (2026-04-27)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.96 (2026-04-27)

### 🩹 Fixes

- **ui5:** make webcomponents wrappers more visible ([#14156](https://github.com/SAP/fundamental-ngx/pull/14156))

### ❤️ Thank You

- Maria Dineva @MariaIDineva

## 0.62.0-rc.95 (2026-04-25)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.94 (2026-04-25)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.93 (2026-04-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.92 (2026-04-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.91 (2026-04-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.90 (2026-04-24)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.89 (2026-04-21)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.88 (2026-04-20)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.87 (2026-04-18)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.86 (2026-04-17)

This was a version bump only for mcp-server to align it with other projects, there were no code changes.

## 0.62.0-rc.85 (2026-04-17)

### 🚀 Features

- add mcp ([#14121](https://github.com/SAP/fundamental-ngx/pull/14121))

### ❤️ Thank You

- deno