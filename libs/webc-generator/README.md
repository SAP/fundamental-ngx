# webc-generator

Code generator that produces Angular wrapper libraries from UI5 Web Components Custom Elements Manifests (CEM). The generated output lives in `libs/ui5-webcomponents*` — those directories are **auto-generated** and must not be edited by hand.

## How it works

The generator reads the Custom Elements Manifest produced by `@ui5/webcomponents-tools` and emits Angular wrapper components for each UI5 Web Component:

1. **Input:** CEM JSON from `@ui5/webcomponents` / `@ui5/webcomponents-fiori` / `@ui5/webcomponents-ai`
2. **Processing:** `executor.ts` maps each component's properties, events, and slots to Angular `input()` signals, `output()` emitters, and content-projection directives
3. **Output:** Angular component + type files in `libs/ui5-webcomponents*`

Generated files include:

- Angular component class with `input()` / `output()` declarations
- `ng-package.json` (publishable sub-library entry point)
- `index.ts` (public API barrel)
- Shared CVA (Control Value Accessor) utilities
- Theming service stubs

## Building

```bash
nx build webc-generator
```

## Running unit tests

```bash
nx test webc-generator
```

## Regenerating wrappers

After modifying the generator, rebuild it and run the `generate` target across all UI5 wrapper libraries:

```bash
nx build webc-generator && nx run-many -t generate -p ui5-webcomponents ui5-webcomponents-fiori ui5-webcomponents-ai
```

This overwrites all files in `libs/ui5-webcomponents`, `libs/ui5-webcomponents-fiori`, and `libs/ui5-webcomponents-ai`. Commit the regenerated output as part of the same PR as your generator changes.

Individual packages can be regenerated in isolation if you only need to update one library:

```bash
nx run ui5-webcomponents-base:generate --skip-nx-cache
nx run ui5-webcomponents:generate --skip-nx-cache
nx run ui5-webcomponents-ai:generate --skip-nx-cache
nx run ui5-webcomponents-fiori:generate --skip-nx-cache
```

> **Note:** After running `yarn cleanup`, the generated output will be missing or stale. Always regenerate before building. It is also advised that you do `yarn cleanup` before you regenerate a package to avoid any intermittent errors.

After regenerating, the packages must also be built before the documentation app (`yarn start`) can run:

```bash
nx run ui5-webcomponents-base:build --skip-nx-cache
nx run ui5-webcomponents:build --skip-nx-cache
nx run ui5-webcomponents-ai:build --skip-nx-cache
nx run ui5-webcomponents-fiori:build --skip-nx-cache
```

## Adding a new wrapper

Wrappers are derived from UI5 component metadata — you do not add them manually. To expose a new UI5 Web Component:

1. Ensure the component is included in the CEM of the relevant `@ui5/webcomponents-*` package (this happens upstream in the UI5 repository).
2. Run `nx build webc-generator && nx run-many -t generate -p ui5-webcomponents ui5-webcomponents-fiori ui5-webcomponents-ai` — the new wrapper will appear automatically.
3. If the generated output needs customization (e.g. custom CVA logic), update the templates in `src/executors/generate/` and regenerate.

## Modifying generated component behavior

All customization goes through the generator templates in `src/executors/generate/`:

- `component-template.ts` — Angular component class template
- `utils/` — shared utilities (theming, CVA stubs)

After editing templates, run `nx build webc-generator && nx run-many -t generate -p ui5-webcomponents ui5-webcomponents-fiori ui5-webcomponents-ai` to apply the changes.
