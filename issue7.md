# Issue 7 — Side Panel: accessibility (keyboard, ARIA, screen reader, RTL)

> **Series:** Side Panel implementation · issue 7 of 12
> **Depends on:** issues 3–6 (all interactive web behaviour present)
> **Blocks:** issue 8
> **Plan:** [`plan.md`](./plan.md) §2 (Accessibility) > **Suggested title:** `feat(core): side panel accessibility` > **Estimate:** 2–3 days

## Goal

Bring the web Side Panel to WCAG AA: keyboard operability, ARIA semantics, and screen-reader support, including RTL.

## Scope

- **Keyboard shortcuts** per the Figma's "Keyboard Shortcuts" table (Mac + Windows): navigate action buttons, open/close panel, open/close overflow list, move within the list, `Esc` to close.
- **Focus management:** logical focus order; focus moves into the content panel on open and returns to the triggering action button on close; focus trap only where appropriate.
- **ARIA roles/states:** action buttons expose pressed/selected + labels; content panel has an accessible name; overflow toggle exposes expanded state; counts/badges announced.
- **Screen reader:** match the "Screen reader control types" table in the Figma.
- **Tooltips** reachable and announced on focus (not hover-only).
- Verify all of the above in **RTL**.

## Reusable building blocks

`libs/platform/icon-tab-bar` (its a11y for overflow + count/badge is the reference the spec points to), existing focus/keyboard utilities in `libs/cdk`.

## How to work this

Run the **`/a11y-audit`** skill against `fd-side-panel` and fix findings. Follow `docs/agents/i18n-patterns.md` for any announced strings (actual key work is issue 8).

## Project conventions (must follow — from `CLAUDE.md`)

`host: {}` for host ARIA bindings (no `@HostBinding`); keyboard handlers via `host: { '(keydown)': ... }` (no `@HostListener`); signal APIs; member ordering; `yarn format` before validation.

## Acceptance criteria

- [ ] All spec'd keyboard shortcuts work (Mac + Windows) for bar, panel, and overflow list.
- [ ] Focus enters the panel on open and returns to the trigger on close.
- [ ] ARIA roles/states correct; counts/badges and tooltips announced.
- [ ] `/a11y-audit` passes with no AA violations.
- [ ] Verified in RTL.
- [ ] `yarn format` + `nx affected:lint` + `nx affected:build` pass.

## References

Plan §2 (Accessibility — keyboard shortcuts, screen-reader table, follow `sap.m.IconTabBar`; splitter a11y handled later in issue 10). `docs/agents/` testing + i18n patterns.
