# Issue 11 — Side Panel: mobile full-screen mode

> **Series:** Side Panel implementation · issue 11 of 12
> **Depends on:** issue 10
> **Blocks:** issue 12
> **Plan:** [`plan.md`](./plan.md) §5 mobile tasks 14–15 > **Suggested title:** `feat(core): side panel mobile full-screen mode` > **Estimate:** 4–5 days

## Goal

Implement the mobile experience: a bottom action bar and a full-screen panel.

## Scope

- Below the **mobile switch point** (resolved in issue 1), move the **action buttons to the bottom** of the app page.
- Clicking an action opens the panel **full screen**.
- **Scroll-collapse** still applies: the action buttons panel collapses to icons-only on scroll down.
- Close via the **close button** or a **swipe-down indicator**.
- Ensure the responsive transition between desktop/tablet (issue 5) and mobile is clean (both directions), and RTL holds.

## Reusable building blocks

`libs/core/mobile-mode` (mobile rendering patterns), `libs/core/scrollbar`, existing swipe/gesture utilities in `libs/cdk` if present.

## Project conventions (must follow — from `CLAUDE.md`)

Signal APIs; `host: {}`; `@if`/`@for`; member ordering; `fundamental-styles` MCP for classes; `yarn format` before validation.

## Acceptance criteria

- [ ] Below the switch point, actions render at the bottom and the panel opens full screen.
- [ ] Swipe-down and close button both dismiss the panel.
- [ ] Scroll-collapse works on mobile.
- [ ] Desktop ↔ mobile transition is correct both ways; RTL verified.
- [ ] Unit + mobile tests pass.
- [ ] `/preflight` passes; mobile follow-up PR opened.

## References

Plan §2 (Mobile full-screen), §8 (mobile switch-point open question — must be resolved in issue 1 first).
