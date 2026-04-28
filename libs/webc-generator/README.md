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

After modifying the generator, rebuild it and run the `generate` executor to regenerate all UI5 wrapper libraries:

```bash
nx build webc-generator && nx run webc-generator:generate
```

This overwrites all files in `libs/ui5-webcomponents`, `libs/ui5-webcomponents-fiori`, and `libs/ui5-webcomponents-ai`. Commit the regenerated output as part of the same PR as your generator changes.

## Adding a new wrapper

Wrappers are derived from UI5 component metadata — you do not add them manually. To expose a new UI5 Web Component:

1. Ensure the component is included in the CEM of the relevant `@ui5/webcomponents-*` package (this happens upstream in the UI5 repository).
2. Run `nx run webc-generator:generate` — the new wrapper will appear automatically.
3. If the generated output needs customization (e.g. custom CVA logic), update the templates in `src/executors/generate/` and regenerate.

## Modifying generated component behavior

All customization goes through the generator templates in `src/executors/generate/`:

- `component-template.ts` — Angular component class template
- `utils/` — shared utilities (theming, CVA stubs)

After editing templates, run `nx build webc-generator && nx run webc-generator:generate` to apply the changes.
