# Issue 3 — Side Panel: scaffold `fd-side-panel` + action-button bar (icons-only) + tooltips

> **Series:** Side Panel implementation · issue 3 of 12 · **first code issue** > **Depends on:** issue 1 (API). Can start against placeholder styles before issue 2 lands.
> **Blocks:** issues 4–8
> **Plan:** [`plan.md`](./plan.md) §5 MVP task 1 > **Suggested title:** `feat(core): add side panel component with icons-only action bar` > **Estimate:** 2–3 days

## Goal

Create the new `libs/core/side-panel` library and render the **icons-only action-button bar** (the default state), with active-item selection and tooltips. This lays the foundation all later issues build on.

## Scope

- Create the secondary entry point `libs/core/side-panel` (exported as `@fundamental-ngx/core/side-panel`): `side-panel.component.ts/html/scss`, `side-panel-item` (component or directive per issue-1 API), `index.ts`, `ng-package.json`, `project.json`, `*.spec.ts`. Register in `libs/core/index.ts` and the library's entry-point config; wire into the docs app nav (component list) if trivial.
- Render the vertical **action-button bar** (anchored per `side` input) in **icons-only** mode: one icon per content group.
- **Active state** on the selected action button; `activeItem` input/model + `activeItemChange` output.
- **Tooltips** on hover **and** focus revealing the group name (spec: _"a tooltip will always appear on focus and on hover"_).
- Content-projection plumbing for groups (`*fdSidePanelContent`) — wiring only; open/close behaviour comes in issue 5.

## Out of scope (later issues)

Icons+label mode & single-action arrow (issue 4), opening content / responsive layout (issue 5), overflow (issue 6), count/badge (issue 4), accessibility hardening (issue 7), splitter (issues 9–10), mobile (issue 11).

## Reusable building blocks

`libs/core/side-navigation` & `vertical-navigation` (vertical icon-nav pattern), `libs/core/icon`, `button`, `toolbar` (tooltip).

## Project conventions (must follow — from `CLAUDE.md`)

- **New** component → signal APIs only: `input()`, `output()`, `model()`, `computed()`, `linkedSignal()`. No `@Input()/@Output()` decorators.
- Use `host: {}` in the decorator — **no** `@HostBinding`/`@HostListener`. Derive host classes with `computed()` + `host: { '[class]': ... }`.
- Control flow `@if`/`@for`/`@switch` only. No `*ngIf`/`*ngFor`, no `ngClass`/`ngStyle`.
- **No** `standalone: true` (it's the default). Use `DestroyRef` + `takeUntilDestroyed()`, not a `DestroyedService`.
- ESLint **member ordering**: decorated props → signal inputs/outputs → public → protected → private (protected before private).
- For CSS class names, use the **`fundamental-styles` MCP tools** (`get_css_classes`, `get_component_html`) — do **not** grep `node_modules/fundamental-styles/`.
- Run `yarn format` before build/lint/test.

## Acceptance criteria

- [ ] `@fundamental-ngx/core/side-panel` builds (`nx run core:build`) and lints clean.
- [ ] Icons-only vertical action bar renders from projected items; `side` input positions it left/right.
- [ ] Selecting an action button sets active state and emits `activeItemChange`.
- [ ] Tooltip appears on hover and on keyboard focus with the group name.
- [ ] Basic spec file in place (expanded in issue 8).
- [ ] `yarn format` + `nx affected:lint` + `nx affected:build` pass.

## References

Plan §2 (action bar, tooltips), §3 (reuse), §4 (API). Discovery: `fundamental-ngx` MCP (`search_components`, `get_component_api`, `get_usage_guide "side"`).
