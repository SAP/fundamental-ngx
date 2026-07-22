# @fundamental-ngx/nx-plugin

NX plugin for internal use in the Fundamental NGX monorepo. Provides generators for scaffolding new components and executors for project-specific build tasks.

> **Note:** This plugin is designed for use inside the `SAP/fundamental-ngx` monorepo. It is not intended for use in external projects.

## Generators

### `sap-component`

Scaffolds a new Angular component with full setup: component file, public API barrel, documentation page, and usage examples. Creates the component as a sub-library within `core`, `platform`, `cx`, `cdk`, or `btp`.

**Usage:**

```bash
nx g @fundamental-ngx/nx-plugin:sap-component --name=<component-name> --project=<library>
```

**Examples:**

```bash
# Add a new component to core (selector: fd-rating-indicator)
nx g @fundamental-ngx/nx-plugin:sap-component --name=rating-indicator --project=core

# Add a new component to platform (selector: fdp-approval-flow)
nx g @fundamental-ngx/nx-plugin:sap-component --name=approval-flow --project=platform
```

Omit `--name` or `--project` to be prompted interactively.

**Library prefixes:** `core` → `fd-`, `platform` → `fdp-`, `cx` → `fdx-`, `cdk` → `fdk-`, `btp` → `fdb-`

See [NEW_COMPONENT.md](../../NEW_COMPONENT.md) for the full component authoring workflow.

---

### `sync-versions`

Synchronizes version placeholders in build output files with actual package version numbers, used as part of the library publish pipeline.

See [sync-versions README](src/generators/sync-versions/README.md) for details.

## Executors

### `compile-typedoc`

Compiles TypeDoc API documentation for a library.

```bash
nx run core:compile-typedoc
```

---

### `i18n-manage`

CLI for managing translation keys across all language files. Supports adding, removing, and syncing keys.

```bash
# Add a new translation key
nx run i18n:i18n-manage --command=add --key=coreButton.submit --value="Submit" --commentType=XBUT --comment="Submit button"

# Search within existing keys
nx run i18n:i18n-manage --command=search --searchTerm=save
```

See [i18n-manage README](src/executors/i18n-manage/README.md) for the full command reference.

---

### `i18n-manage`

Manages i18n translation keys across all language files. See the [i18n-manage README](./src/executors/i18n-manage/README.md) for detailed usage.

**Commands:** `add`, `rename`, `remove`, `search`, `validate`, `update`, `sort`, `sync`

The `sync` command regenerates all TypeScript files from `.properties` files and is called automatically by other commands. It replaces the deprecated `transform-translations` executor.
