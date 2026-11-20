# Issue 10 — Side Panel: integrate the resize splitter (context menu, width caps, a11y)

> **Series:** Side Panel implementation · issue 10 of 12
> **Depends on:** issue 9 (promoted core `fd-splitter`)
> **Blocks:** issue 11
> **Plan:** [`plan.md`](./plan.md) §5 splitter tasks 12–13 > **Suggested title:** `feat(core): side panel resizable splitter` > **Estimate:** 4–5 days

## Goal

Wire `fd-splitter` into `fd-side-panel` so users can resize the panel, and add the panel-specific resize affordances.

## Scope

- **Integrate** `fd-splitter` so dragging it resizes the content panel; sync with `defaultWidth`/`minWidth`/`maxWidth`; emit `widthChange`. Gate on the `resizable` input.
- **Right-click context menu** — on the splitter or anywhere in the panel — to set width to **Max / Min / Default**. Reuse `libs/core/menu` (contextual menu).
- **Width caps:** Min = 15% / Max = 90% of screen (overridable). When a **left and right** side panel coexist, expanded max **≤ 50%** (only if dual-panel is in scope per issue 1).
- **Splitter accessibility** in the side-panel context (the Figma references "Splitter Accessibility"); announce width changes.
- **Tests + docs:** splitter-in-side-panel unit + e2e coverage; update the side-panel docs page with a resizable example.

## Reusable building blocks

`libs/core/splitter` (issue 9), `libs/core/menu` (contextual/right-click menu).

## Project conventions (must follow — from `CLAUDE.md`)

Signal APIs; `host: {}`; derived width via `computed()`/`linkedSignal()` (not `effect()`); member ordering; `fundamental-styles` MCP for classes; `yarn format` before validation.

## Acceptance criteria

- [ ] Dragging the splitter resizes the panel within min/max; `widthChange` emits.
- [ ] Right-click menu offers Max/Min/Default and applies them.
- [ ] 15%/90% caps enforced; 50% dual-panel cap enforced (if in scope).
- [ ] Splitter is keyboard- and screen-reader-accessible inside the panel; width changes announced.
- [ ] Unit + e2e tests pass; docs updated.
- [ ] `/preflight` passes; splitter follow-up PR opened.

## References

Plan §2 (splitter, widths), §3 (reuse), §7 (splitter a11y risk, dual-panel cap), §8 (dual-panel open question).
