# Issue 12 — Side Panel: cross-cutting e2e/visual tests & release polish

> **Series:** Side Panel implementation · issue 12 of 12 · **final** > **Depends on:** issue 11 (all functionality complete)
> **Blocks:** nothing
> **Plan:** [`plan.md`](./plan.md) §5 cross-cutting tasks 16–17 > **Suggested title:** `test(e2e): side panel end-to-end and visual coverage` > **Estimate:** 3.5–5 days

## Goal

Add end-to-end / visual regression coverage across all variants and complete release hygiene.

## Scope

- **Playwright e2e** across web variants: icons-only, icons+label, single-action, both overflow modes, push vs overlay, resize (drag + keyboard + double-click + context menu), and mobile full-screen. See `docs/e2e-testing.md`.
    - `npx playwright test --grep "core/side-panel"`
- **Visual regression** snapshots for the key states, light + dark + HC themes, LTR + RTL.
- **Release hygiene:** final **`/preflight`**; confirm the work is **additive** (no breaking changes per `docs/agents/breaking-changes.md`); changelog/release notes; verify docs examples render in a built docs app (`yarn start`).

## Project conventions (must follow — from `CLAUDE.md`)

`yarn format` before validation; prefer `nx affected:*`; Playwright per `docs/e2e-testing.md`.

## Acceptance criteria

- [ ] e2e suite covers all variants and passes locally and in CI.
- [ ] Visual snapshots committed for key states in both themes and both directions.
- [ ] No breaking changes; changelog updated.
- [ ] `/preflight` passes; final PR opened.

## References

Plan §5 (cross-cutting), §6 (ship order), §9 (workflow). `docs/e2e-testing.md`, `docs/agents/breaking-changes.md`.
