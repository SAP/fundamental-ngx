# Issue 1 — Side Panel: design spike & public API finalization (Phase 0)

> **Series:** Side Panel implementation · issue 1 of 12 · **do this first** > **Depends on:** nothing
> **Blocks:** all other issues
> **Plan:** see [`plan.md`](./plan.md) > **Suggested title:** `docs(core): side panel — finalize public API & resolve open questions` > **Estimate:** 1–2 days

## Goal

Lock down the public API and resolve the open spec questions **before** any code is written, so every downstream issue has a stable target. This is a design/spike issue — the deliverable is an agreed, written API proposal plus answered questions, not production code.

## Background

The Side Panel is a new `libs/core` component (`fd-side-panel`), a close match to SAPUI5's `sap.f.SidePanel`: a vertical action-button bar anchored to one edge of the page; each button opens a group of content in a panel beside the main content. Full behaviour is summarized in [`plan.md`](./plan.md) §2.

## Scope

1. **Resolve the open questions** (plan §8, items 5–7) with a designer/maintainer and record the answers in this issue:
    - **Panel-width semantics:** do _"Opens fully from 220px to 560px"_ / _"561px and up opens in default width"_ refer to the panel's own width, available space, or screen width?
    - **Dual side panels:** is a simultaneous left **and** right panel (the "expanded max ≤ 50%" case) in v1 scope, or one panel per page?
    - **Mobile switch point:** at what screen width does the component switch to mobile full-screen mode?
2. **Finalize the public API** (starting point in plan §4):
    - Host `fd-side-panel` inputs: `side` (`left`|`right`), `mode` (`icons`|`icons-label`), `overflowMode` (`toggle`|`scroll`), `open`, `activeItem`, `defaultWidth`/`minWidth`/`maxWidth`, `resizable`, `pushBreakpoint`.
    - Item API: `fd-side-panel-item` / `*fdSidePanelItem` with `icon`, `label`, `count`, `badge`, `disabled`.
    - Content projection: `*fdSidePanelContent` per group.
    - Outputs: `openChange`, `activeItemChange`, `widthChange`.
    - Decide signal-based API shape (`input()`/`output()`/`model()`) — this is **new** code so signal functions are mandatory.
3. **Agree the BEM class names** with the `fundamental-styles` author (issue 2) so the two tracks don't drift (e.g. `.fd-side-panel`, `.fd-side-panel__action-bar`, `.fd-side-panel__item`, …).
4. **Confirm v1 scope cut:** which of {scrollable overflow, dual panels, mobile} are in v1 vs follow-up.

## Deliverables / acceptance criteria

- [ ] Open questions 5–7 answered and written into this issue.
- [ ] Public API table (inputs/outputs/directives, with types) agreed and recorded.
- [ ] BEM class-name list agreed and shared with issue 2.
- [ ] v1 scope cut documented.
- [ ] Maintainer + designer sign-off noted.

## References

- Plan: [`plan.md`](./plan.md) §2 (spec), §4 (architecture), §8 (open questions)
- Project conventions: root `CLAUDE.md` (signals, `host: {}`, control flow, member ordering)
