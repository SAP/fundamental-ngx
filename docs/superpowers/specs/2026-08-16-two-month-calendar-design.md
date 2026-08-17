# Two-month (multi-month) calendar — full design

**Status:** proposed
**Date:** 2026-08-16
**Author:** DAEDALUS (droshev)
**Branch:** `feat/two-month`
**Issue:** [SAP/fundamental-ngx#13416](https://github.com/SAP/fundamental-ngx/issues/13416) — "Two-Month Calendar Horizontal View" (adopts fundamental-styles#6131 / `FIORITECHP1-33962`)
**Prior PR:** [SAP/fundamental-ngx#14237](https://github.com/SAP/fundamental-ngx/pull/14237) (closed)
**Supersedes:** [`2026-07-02-two-month-calendar-picker-overlay-design.md`](./2026-07-02-two-month-calendar-picker-overlay-design.md) — that spec only patched two defects (backdrop pointer-blocking, day-grid centering) in the _hand-rolled_ overlay and preserved it. This spec replaces the hand-rolled overlay with the shared mobile-mode / dialog primitive, so the earlier §5.1/§5.2 z-index and centering fixes are obsolete.

---

## 1. Goal

Provide a horizontal (and vertical) multi-month calendar, primarily for date-range selection, matching the Fiori design (issue images + `sap.ui.unified.sample.CalendarMultipleMonth` + UI5 WC `DateRangePicker show-two-months`). Two months is the common case and default; **more than two is supported** (clamped 1..N).

## 2. Requirements (source of truth: 9 design images + prior PR review)

| #   | Requirement                                                                                                                                                                      | Source                                                                                                            |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| R1  | N months rendered side-by-side (horizontal) or stacked (vertical). Default N=2. Support >2.                                                                                      | Images 1, 3, 6; user directive 2026-08-16                                                                         |
| R2  | Adjacent-month "other" days are hidden in multi-month strip view (no May-spill in June's grid).                                                                                  | fundamental-styles contract `.fd-calendar-container .fd-calendar__item--other { opacity:0; pointer-events:none }` |
| R3  | Navigation arrows only on the strip edges; navigating shifts the whole strip in lock-step.                                                                                       | Images 3, 6 (single ‹ › pair per strip)                                                                           |
| R4  | Month / year / year-range selection is a **centered modal over the calendar** (dimmed backdrop), NOT a trigger-anchored popover, and does NOT replace the day grid.              | Images 1, 2, 6, 7, 8, 9 (picker floats centered; day grids stay visible behind dim)                               |
| R5  | Range selection + hover spans across all visible months (mid-flight range highlights both months).                                                                               | Images (range highlight), branch fix `1d33ee60f2`                                                                 |
| R6  | **Phone:** the picker becomes a full-screen dialog showing **one** month, reclaiming the adjacent-month "other" days. Container owns this logic — not a consumer geometry input. | Prior PR review point #3 (droshev), spec image 1145×601                                                           |
| R7  | Weekday headers, week numbers, special days, disabled-date functions, calendar type — all inherited from the single-calendar feature set.                                        | Existing `fd-calendar` API                                                                                        |
| R8  | No a11y regression: focus trap in the picker, ESC-close, focus restore to trigger, `role="dialog"`/`aria-modal`, 956/956 axe routes stay green.                                  | Prior PR a11y report                                                                                              |

## 3. Key discovery — reuse existing primitives (do NOT reinvent)

Two verified findings drive the architecture:

1. **fundamental-styles already ships the container contract.** Present in `node_modules/fundamental-styles/dist/calendar.css`:

    - `.fd-calendar-container` — popover-styled wrapper (`--sapPopover_BorderCornerRadius`, `--sapContent_Shadow2`).
    - `.fd-calendar-container-inner` — `display:flex; flex-wrap:wrap; justify-content:center; gap:var(--fdCalendarContainerGap,1rem); flex-direction:var(--fdCalendarContainerFlexDirection,row)`.
    - `.fd-calendar-container--vertical` — sets `--fdCalendarContainerFlexDirection:column; --fdCalendarContainerGap:0.5rem`.
    - `.fd-calendar-container .fd-calendar__item--other { opacity:0; pointer-events:none }` — the R2 adjacent-day-hiding contract.
      → **Layout and other-day-hiding come from these classes + CSS vars.** The component SCSS must consume them, not hand-roll flex + `@media` breakpoints (the current branch duplicates this).

2. **The library has a shared mobile-mode abstraction** the date-picker (and select/combobox/multi-input/menu/etc.) all use — `@fundamental-ngx/core/mobile-mode`:
    - `MobileModeBase<T>` abstract directive (`libs/core/mobile-mode/mobile-mode.class.ts:29`) — injects `DialogService`, resolves config, holds `dialogRef`/`dialogConfig`/`mobileConfig`.
    - `MOBILE_MODE_CONFIG` token, `MobileMode` interface, `MobileModeControl` enum.
    - Opt-in pattern: component exposes `mobile` + `mobileConfig` inputs, defines `FD_*_COMPONENT` + `FD_*_MOBILE_CONFIG` tokens, and ships a `*-mobile` companion `extends MobileModeBase<T>` that opens a **full-screen `fd-dialog`** (`{ mobile: true }`) via `DialogService`.
      → **R6 phone mode = conform to this existing pattern.** This is exactly "reuse the phone as we have it in date-picker."

**Consequence:** both the desktop centered picker (R4) and the phone full-screen single-month (R6) can be hosted by the **same `fd-dialog` / `DialogService`** primitive — `DialogService.open(...)` centers-with-backdrop on desktop and goes full-screen with `{ mobile: true }`. This deletes the branch's hand-rolled overlay (manual backdrop, z-index 100/101/102 stack, `document.activeElement` trigger capture, `setTimeout` focus-trap activation) and replaces four fragile mechanisms with one battle-tested one that already ships correct a11y.

## 4. Architecture

One reusable multi-month primitive, consumed primarily by the date-picker. Reusability is free — the container needs shared range/hover/nav state regardless of consumer, because coordinating N calendars requires it; exporting it standalone is one barrel line + a docs example.

| Component                                                | Role                                                                                                                                                                                                                                               | Status                                        |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `FdCalendarContainerComponent` (`fd-calendar-container`) | Orchestrates N `fd-calendar` instances: `baseMonth` source of truth, lock-step nav, shared range/hover state, opens the month/year picker via `DialogService`, and the `mobile` single-month switch. Consumes styles container classes for layout. | Reworked (exists on branch)                   |
| `CalendarComponent` (`fd-calendar`)                      | Renders one month. `monthYearPickerMode: 'inline' \| 'popover'` — in `popover` mode it re-emits `activeViewChange` upward instead of swapping its own day grid.                                                                                    | Modified (branch) — keep                      |
| `CalendarContainerMobileComponent` (`*-mobile`)          | `extends MobileModeBase<CalendarContainer>`; opens the full-screen single-month dialog on phone.                                                                                                                                                   | **New** (mirrors `DatePickerMobileComponent`) |
| month / year / aggregated-year views                     | Grid renderers reused inside the picker dialog body.                                                                                                                                                                                               | Existing — keep                               |

**Tokens (new, mirroring date-picker `tokens.ts`):** `FD_CALENDAR_CONTAINER_COMPONENT`, `FD_CALENDAR_CONTAINER_MOBILE_CONFIG`.

**Consumption in `fd-date-picker`:** when a multi-month input is set (see §7 open item), the date-picker's popover body hosts `fd-calendar-container` instead of a single `fd-calendar`. Standalone use is also exported from the barrel.

## 5. Navigation & shared-state model (ratifies the branch)

- `baseMonth = signal<CalendarCurrent>` — leftmost (horizontal) / topmost (vertical) month; single source of truth.
- `displayedCount = computed(() => mobile() ? 1 : months())` — phone collapses to one.
- `calendarMonths = computed(() => range(displayedCount()).map(i => shiftMonth(baseMonth(), i)))`.
- Lock-step: `(navigated)` from any inner calendar → `baseMonth.set(shiftMonth(newMonth, -index))`. Arrow visibility `hidePreviousArrow = index>0`, `hideNextArrow = isVertical ? index>0 : !last`.
- Picker jump: selecting in the dialog sets `baseMonth = shiftMonth(selected, -triggerIndex)`.
- Range/hover: `selectedRangeDate`/`selectedDate` models + shared `hoverDate` signal in the container, pushed down to all calendars, bubbling up; mid-flight range paints hover across months (keep branch fix `1d33ee60f2`).

## 6. Picker dialog (replaces hand-rolled overlay)

- Container opens the picker through `DialogService.open(pickerTemplate, config)` — centered modal + dimmed backdrop on desktop; the same template goes full-screen via the `*-mobile` companion on phone.
- Dialog body renders `fd-calendar-month-view` / `-year-view` / `-aggregated-year-view` via `@switch` on the requested view — same three components as today.
- `DialogService` provides backdrop, focus trap, ESC-close, focus restore, `role="dialog"` + `aria-modal`, portal rendering. **Delete** from the branch: manual backdrop div, `.fd-calendar-container__picker-*` z-index rules, `document.activeElement` capture, `setTimeout` focus-trap activation, `FocusTrapService` wiring in the container.
- Backdrop-blocks-interaction (the entire concern of the 2026-07-02 spec) is now inherent — a modal dialog blocks the calendar behind it by construction; no z-index stacking-context surgery needed.

**Cleanup carried in:** remove the `[isDateRangeMonthYearFormat]="true"` reuse-hack on the month view (used only to force long month names). Replace with an explicit label-format input on the month view, or pass the format directly from the container. Do not overload a range-format flag for labeling.

## 7. Open items to resolve before/within the plan

- **O1 — date-picker opt-in API.** What input turns on multi-month in `fd-date-picker`? Options: `twoMonth: boolean`, or `months: number` (matches the container's `months` input), or infer from `type='range'`. Recommendation: explicit `months = input(1)` on the container, and a date-picker `twoMonth`/`months` passthrough — decide during writing-plans with FORGE.
- **O2 — vertical layout + >2 months on phone.** Phone always collapses to 1; vertical desktop with N=3/4 keeps the styles `--vertical` path. Confirm no separate phone treatment for vertical.
- **O3 — does `fd-date-picker` already own a `mobile` input we piggyback on**, or does the container get its own? (Date-picker has `mobile`/`mobileConfig` at `date-picker.component.ts:331`.) When embedded, the container should inherit the date-picker's mobile state rather than expose a second switch. Resolve in plan.

## 8. Acceptance criteria

- **AC1.** N months render via `.fd-calendar-container-inner` (styles-driven flex); N default 2, supports >2; `--vertical` stacks.
- **AC2.** Adjacent "other" days hidden in strip view (R2), reclaimed in phone single-month (R6).
- **AC3.** Edge-only arrows; navigating shifts the whole strip in lock-step (R3).
- **AC4.** Month/year/year-range picker opens as a centered modal over the calendar with a dimmed backdrop; day grids stay visible but non-interactive behind it; ESC + backdrop-click + selection close it; focus returns to the trigger (R4, R8).
- **AC5.** Range selection + hover span all visible months (R5).
- **AC6.** On phone (`mobile`), the picker is a full-screen dialog showing exactly one month with adjacent days reclaimed; container owns this — no consumer geometry input (R6).
- **AC7.** No hand-rolled overlay remains: `document.activeElement` capture, `setTimeout` focus-trap, manual backdrop, and `.fd-calendar-container__picker-*` z-index rules are removed.
- **AC8.** No `isDateRangeMonthYearFormat` overload for labeling.
- **AC9.** 956/956 axe routes green; single-calendar consumers (`fd-date-picker`, `fd-datetime-picker`) using inline mode unaffected.
- **AC10.** E2E baselines regenerated for the calendar-container demo (deferred until implementation complete, per user).

## 9. TDD sequencing (plan-author rule — every behavioral task names its RED test first)

Detailed task breakdown is produced by the writing-plans step. High-level, each behavioral unit is RED-first:

1. **Dialog-hosted picker** — RED: spec asserting selecting a month/year in the dialog updates `baseMonth` and closes; day grid behind is non-interactive while open. GREEN: swap hand-rolled overlay → `DialogService`.
2. **Lock-step nav** — RED: navigating calendar[1] shifts base so calendar[0] follows. (Likely already green on branch; guard.)
3. **Other-day hide/reclaim** — RED: strip view hides `--other`; phone mode reclaims them.
4. **Phone single-month** — RED: with `mobile`, `displayedCount()===1` and full-screen dialog opens. GREEN: `*-mobile` companion via `MobileModeBase`.
5. **Label-format cleanup** — mechanical (no behavioral RED required; exempt, stated explicitly): remove `isDateRangeMonthYearFormat` labeling overload.
6. **E2E regen** — deferred (user).

## 10. Handoff

- **FORGE** — component rework (container → `DialogService`, `*-mobile` companion, styles-class consumption, label-format cleanup, date-picker passthrough).
- **CRUCIBLE** — RED specs per §9 if FORGE wants tests authored separately; e2e regen when unblocked.
- **CHROMA/LOOM** — only if a styles gap surfaces (none expected; contract already ships).
- **DAEDALUS** — signs off on AC1–AC10; owns the O1–O3 resolutions.

## 11. Risks

- **DialogService centering vs. "centered over day-grid, not full container".** The 2026-07-02 spec cared about centering over the day-grid area specifically. A portaled `fd-dialog` centers over the viewport, not the calendar box — visually this matches the Fiori images (picker floats mid-screen over a dimmed calendar) and is simpler. Verify against images 6–9 in visual QA; if product wants it pinned to the calendar box rather than viewport-centered, that's a `DialogConfig` position tweak, not an architecture change.
- **Embedded-in-date-picker double dialog.** The picker dialog opens _inside_ the date-picker's popover/dialog. Nested dialog/overlay stacking must be verified (O3). `DialogService` supports stacked dialogs, but focus-trap nesting needs a live check.
- **`months` clamp semantics** unchanged (1..N). Confirm max N (branch clamps 4).
