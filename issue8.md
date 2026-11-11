# Issue 8 — Side Panel: MVP hardening (i18n, unit tests, docs) — closes the Web MVP

> **Series:** Side Panel implementation · issue 8 of 12 · **completes the MVP** > **Depends on:** issues 3–7 (and issue 2 styles adopted)
> **Blocks:** issues 9–12 (sequential)
> **Plan:** [`plan.md`](./plan.md) §5 MVP tasks 8–10 > **Suggested title:** `feat(core): side panel i18n, tests and docs` > **Estimate:** 4.5–6 days

## Goal

Make the Web MVP production-ready: externalize strings, add real test coverage, publish docs, adopt the upstream styles, and pass the local quality gates.

## Scope

- **i18n:** add all user-facing strings (tooltips default text, overflow `More`/`Less`, close button aria-label, group-name fallbacks) as translation keys. Use the **`/i18n-manage`** skill (updates the `FdLanguage` interface, `.properties` files, generated types). Follow `docs/agents/i18n-patterns.md`.
- **Unit tests:** cover modes, open/close, overflow calc + list interactions, responsive push/overlay, scroll-collapse, count/badge, and a11y wiring. Use the **`/create-test`** skill; follow `docs/agents/testing-guidelines.md` (realistic scenarios, signal testing).
- **Styles adoption:** replace placeholder classes with the real `.fd-side-panel*` classes from issue 2 via the **`/adopt-styles`** skill; bump the `fundamental-styles` dependency to the version issue 2 published.
- **Docs:** create `libs/docs/core/side-panel` with working examples (icons-only, icons+label, single-action, overflow both modes, push vs overlay) and API docs. Use **`/update-docs`** to verify examples against the public API; register in the docs nav.

## How to work this

`/i18n-manage` → `/create-test` → `/adopt-styles` → `/update-docs` → **`/preflight`**.

## Project conventions (must follow — from `CLAUDE.md`)

Signal-based test patterns; `yarn format` before build/lint/test; prefer `nx affected:*` for validation.

## Acceptance criteria

- [ ] No hardcoded user-facing strings; all keys present in `libs/i18n` + generated types.
- [ ] Unit tests meaningfully cover the MVP behaviour and pass (`nx run core:test --testfile=side-panel.component.spec.ts`).
- [ ] Component uses the real upstream `side-panel` styles; dependency bumped.
- [ ] Docs page renders all MVP variants; API docs accurate.
- [ ] **`/preflight`** passes; MVP PR opened with title `feat(core): add side panel component`.

## References

Plan §5 (MVP tasks 8–10), §6 (styles land during MVP, adopt before merge), §9 (workflow).
