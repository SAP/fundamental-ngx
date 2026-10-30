# Issue 5 — Side Panel: content panel open/close + responsive layout + RTL

> **Series:** Side Panel implementation · issue 5 of 12
> **Depends on:** issue 4
> **Blocks:** issues 6–8
> **Plan:** [`plan.md`](./plan.md) §5 MVP tasks 3 & 6 > **Suggested title:** `feat(core): side panel content & responsive layout` > **Estimate:** 4–5 days

## Goal

Make the panel actually open/close content groups, and implement the responsive layout behaviour (push vs overlay, widths, height responsiveness, scroll-collapse) including RTL.

## Scope

### Open / close content

- Click an action button → opens its content group in the panel; `open` model + `openChange`.
- Close via the **close icon** or by **clicking the highlighted (active) action button again**.
- Active-item highlight reflects the open group.

### Responsive layout

- **≥ 1440px screen:** panel **pushes** the main content (coexist side-by-side). Below 1440px: panel is an **overlay**.
- **Widths:** app-definable `defaultWidth` / `minWidth` / `maxWidth`. **Min = 15% of screen** (overridable, higher preferred); **Max = 90% of screen** (overridable).
- **Panel-width behaviour** per the issue-1 decision on _"Opens fully from 220px to 560px"_ / _"561px and up opens in default width"_ (do not guess — use the resolved semantics).
- **Height responsiveness:** when the page's main header collapses on scroll, the panel height expands simultaneously.
- **Scroll-triggered mode collapse:** default icons+text; scrolling down collapses to icons-only; scrolling up re-expands.
- **Tablet:** behaves like desktop (pushes content).

### RTL

- Panel + action bar mirror: a left-anchored panel in LTR is right-anchored in RTL. Lay out with logical properties / existing RTL utilities and verify.

## Out of scope

Overflow (issue 6), the resize splitter (issues 9–10), mobile full-screen (issue 11).

## Reusable building blocks

`libs/core/dynamic-side-content` (responsive push/overlay + breakpoints reference), `libs/core/dynamic-page` (header-collapse integration), `libs/core/scrollbar`.

## Project conventions (must follow — from `CLAUDE.md`)

Signal APIs only; **derive layout state with `computed()`/`linkedSignal()`, not `effect()`** (effects are for side effects only — DOM/listeners); read tracked signals unconditionally (no signal reads only inside `if` branches); `host: {}`; `@if`/`@for`; member ordering; `fundamental-styles` MCP for classes; `yarn format` before validation.

## Acceptance criteria

- [ ] Clicking an action opens its group; close icon and re-clicking the active action both close it.
- [ ] ≥1440px pushes content; below 1440px overlays. Verified with a resize.
- [ ] Min/max/default widths honored and overridable via inputs.
- [ ] Panel height expands when the dynamic-page header collapses on scroll.
- [ ] Scroll down collapses to icons-only; scroll up restores icons+text.
- [ ] Full behaviour verified in RTL.
- [ ] `yarn format` + `nx affected:lint` + `nx affected:build` pass.

## References

Plan §2 (content panel, responsive behaviour), §3 (reuse), §7 (push/overlay + header-collapse integration risk).
