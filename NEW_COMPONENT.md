# Adding a New Component

This guide walks you through scaffolding and completing a new component in the Fundamental NGX monorepo.

## Prerequisites

- Node.js (LTS) and Yarn installed (`corepack enable && yarn`)
- Repository cloned and dependencies installed (`yarn install`)

## 1. Choose the right library

| Library    | Selector prefix | Use when                                                       |
| ---------- | --------------- | -------------------------------------------------------------- |
| `core`     | `fd-`           | Standalone UI primitive (button, card, dialog, table, etc.)    |
| `platform` | `fdp-`          | Higher-level composite built on `core`, with form/data binding |
| `cdk`      | `fdk-`          | Utility directive, service, or abstraction — no visible UI     |
| `btp`      | `fdb-`          | Business Technology Platform-specific visual component         |
| `cx`       | `fdx-`          | Customer Experience-specific visual component                  |

**Dependency rules:**

- `cdk` has no library dependencies — it is the base layer.
- `core` may depend on `cdk` and `i18n`.
- `platform` may depend on `core`, `cdk`, and `i18n`.
- `btp` and `cx` may depend on `core`, `platform`, and `cdk`.

If you are unsure, use `core` for new UI primitives and `platform` for form-aware composites.

## 2. Run the generator

```bash
nx g @fundamental-ngx/nx-plugin:sap-component --name=<component-name> --project=<library>
```

Replace `<component-name>` with a kebab-case name (e.g. `rating-indicator`) and `<library>` with one of `core | platform | cdk | btp | cx`.

**Example:**

```bash
nx g @fundamental-ngx/nx-plugin:sap-component --name=rating-indicator --project=core
```

The generator will prompt interactively if you omit either flag.

## 3. What gets generated

Running the generator creates two areas:

**Library source** (`libs/<library>/src/lib/<component-name>/`):

```
<component-name>.component.ts   # The Angular component
index.ts                        # Public API barrel
```

**Documentation app** (`apps/docs/src/app/modules/<library>/<component-name>/`):

```
<component-name>-docs.component.ts      # Docs page shell
<component-name>-docs.component.html
<component-name>-header/                # Header / title section
examples/
  default/
    <component-name>-default-example.component.ts
    <component-name>-default-example.component.html
  index.ts
e2e/
  <component-name>.e2e-spec.ts          # WebdriverIO e2e spec
index.ts
```

The generator also registers the new route in the docs app automatically.

## 4. Complete the component

Open the generated `<component-name>.component.ts` and fill in:

- `selector` is pre-filled with the library prefix (e.g. `fd-rating-indicator`).
- Add `@Input()` / `input()` signal inputs for public API.
- Add `host: {}` bindings for ARIA attributes and CSS classes.
- All components are standalone by default — do **not** add `standalone: true`.

**Key patterns** (see `docs/agents/angular-patterns.md` for full reference):

```typescript
// Use signal inputs for new components
import { Component, input, computed } from '@angular/core';

@Component({
    selector: 'fd-rating-indicator',
    imports: [],
    template: `...`,
    host: {
        '[attr.aria-valuenow]': 'value()',
        '[class.fd-rating-indicator]': 'true'
    }
})
export class RatingIndicatorComponent {
    value = input<number>(0);
    max = input<number>(5);

    stars = computed(() => Array.from({ length: this.max() }));
}
```

## 5. Add i18n keys (if needed)

If the component renders user-visible text (labels, aria strings), add translation keys:

```bash
nx run i18n:i18n-manage -- add-key <KEY_NAME> --defaultValue="Default text"
```

See `docs/agents/i18n-patterns.md` for the full i18n API.

## 6. Write unit tests

Create a spec file alongside the component:

```
libs/<library>/src/lib/<component-name>/<component-name>.component.spec.ts
```

See `docs/agents/testing-guidelines.md` for patterns. Run with:

```bash
nx run <library>:test --testfile=<component-name>.component.spec.ts
```

## 7. Add documentation examples

Edit the generated files under `apps/docs/src/app/modules/<library>/<component-name>/examples/`:

- The `default` example is pre-generated. Add more examples as sibling directories.
- Export all example components from `examples/index.ts`.
- Reference examples in `<component-name>-docs.component.ts` using the `<fd-docs-section-title>` / `<fd-component-example>` scaffolding.

## 8. Validate your work

```bash
# Format first (required before lint/test)
yarn format

# Then lint and test the affected library
nx affected:lint
nx affected:test

# Serve the docs app to verify visually
yarn start
```

## 9. Commit

Follow the [commit format](.claude/rules/commit-format.md):

```
feat(core): add RatingIndicatorComponent
```

For breaking changes, add `!` after the scope and a `BREAKING CHANGE:` footer.

---

For deeper reference, see:

- `docs/agents/angular-patterns.md` — signals, computed, host bindings
- `docs/agents/i18n-patterns.md` — translation API
- `docs/agents/testing-guidelines.md` — test patterns
- `docs/agents/breaking-changes.md` — what constitutes a breaking change
