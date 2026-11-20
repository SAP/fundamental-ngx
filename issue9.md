# Issue 9 — Promote `fdb-splitter` to core as `fd-splitter` + modernize + extend

> **Series:** Side Panel implementation · issue 9 of 12 · **starts the splitter follow-up** > **Depends on:** issue 8 (MVP merged) — sequential
> **Blocks:** issue 10
> **Plan:** [`plan.md`](./plan.md) §5 splitter task 11, §3 (reuse), §4 (splitter decision)
> **Suggested title:** `feat(core): add splitter component` > **Estimate:** 4–6 days

## Goal

Create a reusable **core** `fd-splitter` by **promoting the existing `libs/btp/splitter` (`fdb-splitter`)** into `libs/core`, modernizing it to the project's signal conventions, and adding the features the Side Panel needs. A core component is required because the Side Panel lives in `libs/core`, and **`core` cannot depend on `btp`** (enforced module boundaries: `scope:fd` may only depend on `cdk`/`i18n`) — so `fdb-splitter` cannot be imported directly.

## Background — what the btp splitter already provides

`libs/btp/splitter` (`splitter.component.ts`, `splitter-pane-container`, `splitter-split-pane`, `splitter-resizer`, `splitter-pagination`) already implements:

- 16px resizer (`.fd-splitter__resizer`, `RESIZER_SIZE_PX`) with the `.fd-splitter` styles.
- Pointer **drag** resize (throttled document `mousemove`/`mouseup`).
- **Keyboard** resize with `role="separator"` + `aria-orientation` (accessibility baseline).
- **RTL** handling (`RtlService` + diff inversion in `_onResize`).
- Responsive pane hide/show by `requiredParentWidth`, pagination for off-canvas panes, horizontal/vertical orientation.

**Reuse this logic** — port it, don't rewrite from zero.

## Scope

1. **Create `libs/core/splitter`** (`@fundamental-ngx/core/splitter`) by porting the btp implementation (component + pane-container + split-pane + resizer + pagination + interfaces + scss + constants). Register in `libs/core/index.ts` and entry points.
2. **Modernize to project conventions** (the btp source uses legacy patterns): replace `@Input()`/`@Output()` with `input()`/`output()`/`model()`; replace `@HostBinding`/`@HostListener` with `host: {}`; drop `standalone: true`; replace `markForCheck` + manual CD with signals/`computed()`/`linkedSignal()`; `@if`/`@for` in templates; satisfy member ordering.
3. **Add the missing Side-Panel features:**
    - **Configurable keyboard step sizes** — 10px regular / 100px large (app-configurable). (btp only nudges ±1px today.)
    - **Double-click cycle** — Default → Max-Width → Min-Width → Default.
    - **Explicit min / max / default** size clamping (btp only prevents negative sizes today).
4. **btp back-compat:** have `libs/btp/splitter` **re-export / thin-wrap** the promoted core component so existing `fdb-splitter` consumers keep working. Decide with a maintainer whether to deprecate `fdb-splitter` in favour of `fd-splitter`. Confirm this is handled as **non-breaking** (`docs/agents/breaking-changes.md`).

## Out of scope

Side-panel wiring, the right-click width context menu, and the left+right 50% cap — all in issue 10.

## Reusable building blocks

`libs/btp/splitter` (the source to promote), `.fd-splitter` CSS (`fundamental-styles`, confirm classes via the **MCP**), `libs/cdk` pointer/keyboard utilities + `RtlService`.

## Project conventions (must follow — from `CLAUDE.md`)

Signal APIs only; `host: {}` (no `@HostBinding`/`@HostListener`); effects only for pointer-move/`ResizeObserver` side effects, derived sizes via `computed()`/`linkedSignal()`; `@if`/`@for`; no `standalone: true`; member ordering; `fundamental-styles` MCP for classes; `yarn format` before validation.

## Acceptance criteria

- [ ] `@fundamental-ngx/core/splitter` builds and lints clean; usable independently of side-panel.
- [ ] Ported to signal conventions (no `@HostBinding`/`@HostListener`/`standalone: true`/`markForCheck`).
- [ ] Drag resize works and respects **min/max/default** clamps.
- [ ] Keyboard step resize with configurable 10/100px steps works.
- [ ] Double-click cycles Default → Max → Min → Default.
- [ ] Correct in RTL.
- [ ] `fdb-splitter` consumers still work via re-export; change confirmed non-breaking.
- [ ] Unit tests + a docs page with a standalone example.
- [ ] `yarn format` + `nx affected:lint` + `nx affected:build` + `nx affected:test` pass.

## References

Plan §2 (Responsive splitter), §3 (reuse — btp splitter), §4 (promote-to-core decision), §7 (splitter is the biggest risk). Source: `libs/btp/splitter/*`.
