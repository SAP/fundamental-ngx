# Issue 6 — Side Panel: overflow (toggle `More`/`Less` + scrollable)

> **Series:** Side Panel implementation · issue 6 of 12
> **Depends on:** issue 5 (needs panel layout + available-height measurement)
> **Blocks:** issues 7–8
> **Plan:** [`plan.md`](./plan.md) §5 MVP task 4 > **Suggested title:** `feat(core): side panel action overflow` > **Estimate:** 3–4 days

## Goal

Handle more action buttons than fit the available height, via the two strategies from the spec.

## Scope

### Toggle overflow (`overflowMode="toggle"`) — both verbatim in the Figma

- The panel **auto-calculates** how many action buttons fit the available height; if item count > available height, a **`More` / `Less` toggle button** appears.
- The toggle opens an **action list** (popover/menu). The list **closes** on: toggling the button, clicking an action in the list, clicking anywhere else, or `Esc`.
- The list is navigable by **mouse and arrow keys**.
- **Same behaviour when the panel is expanded.**
- Supports up to **18** action buttons _(spec, "Icons Overflow")_.

### Scrollable (`overflowMode="scroll"`)

- Standard scroll instead of overflow. Supports up to **20** action buttons _(spec, "Scrollable panel")_. (Confirm whether this is in v1 per issue-1 scope cut.)

## Reusable building blocks

- `libs/platform/icon-tab-bar` (`icon-tab-bar-base.class.ts`) — **overflow item-count calculation**; the spec explicitly says follow `sap.m.IconTabBar`. Decide extract-and-share vs re-implement (see plan §7 risk).
- `libs/core/popover` + `libs/core/menu`/`list` for the action list (arrow-key nav + `Esc` + outside-click).
- `libs/core/scrollbar` for the scrollable strategy.

## Project conventions (must follow — from `CLAUDE.md`)

Signal APIs only; overflow count via `computed()` over measured sizes (effects only for the actual measurement/`ResizeObserver` side effect); `host: {}`; `@if`/`@for`; member ordering; `fundamental-styles` MCP for classes; `yarn format` before validation.

## Acceptance criteria

- [ ] Toggle mode: `More`/`Less` appears only when items exceed available height; auto item-count recalculates on resize/height change.
- [ ] Action list opens on toggle; closes on toggle / action-click / outside-click / `Esc`; arrow-key + mouse navigable.
- [ ] Overflow behaves identically when the panel is expanded.
- [ ] Scrollable mode scrolls the action bar (if in v1 scope).
- [ ] `yarn format` + `nx affected:lint` + `nx affected:build` pass.

## References

Plan §2 (overflow — nodes `1139:319345` toggle / `1139:320443` scrollable), §3 (reuse), §7 (overflow-reuse risk).
