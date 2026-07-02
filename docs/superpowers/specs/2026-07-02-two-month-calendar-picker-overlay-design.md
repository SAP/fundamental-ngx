# Two-month calendar picker overlay — pointer-blocking backdrop + day-grid centering

**Status:** approved
**Date:** 2026-07-02
**Author:** DAEDALUS (droshev)
**Branch:** `feat/two-month`
**PR:** [SAP/fundamental-ngx#14237](https://github.com/SAP/fundamental-ngx/pull/14237)
**Issue:** [SAP/fundamental-ngx#13416](https://github.com/SAP/fundamental-ngx/issues/13416)
**Related decisions:** [DECISION-007](../../../shared/fundamental-libraries/decisions.md) (superseded), [DECISION-008 + amendment](../../../shared/fundamental-libraries/decisions.md) — calendar-local overlay path.

## 1. Problem

The two-month calendar container (`<fd-calendar-container>`) uses a calendar-local overlay to present month / year / year-range pickers when the user clicks a per-calendar mini-header. Two defects vs the Fiori spec:

1. **Backdrop is decorative-only.** With the picker open, day cells behind the backdrop remain hoverable and clickable. Hovering emits `hoverDateChange`; clicking emits `selectedDateChange` and does not close the picker. Real interaction bug and a11y concern — screen-reader-reachable elements outside the picker while the focus trap is active.
2. **Picker offset.** The picker is centered on `<fd-calendar-container>` (`top: 50%; left: 50%`), so the picker sits over the container's geometric center — which includes the per-calendar mini-headers. Target design (Fiori images 1, 3, 4, 6, and sapui5 `sap.ui.unified.sample.CalendarMultipleMonth`) shows the picker centered over the **day-grid area**, not the full container.

Backdrop and picker are otherwise correct: focus trap, ESC-close, backdrop-click-close, focus-restore-to-trigger already work per DECISION-008 amendment.

## 2. Non-goals

Explicitly deferred to follow-up:

- **F-D**: container-level header with big prev/next arrows and a top-level year label (Fiori Image 1). Bigger UX shift, own baseline sweep.
- **F-E**: year-range → year → month cascade (Images 4→5→6, 7→8→9). Current: independent pickers, year-range reachable from year grid.
- **F-F**: header-state deemphasis while picker is open (Images 2, 6 — grayed labels).

## 3. Architecture (unchanged)

The design does not touch the primitive-level architecture established in DECISION-007 + DECISION-008 amendment:

- `<fd-calendar>` retains `monthYearPickerMode: input<'inline' | 'popover'>('inline')` — in popover mode, `handleActiveViewChange` re-emits `activeViewChange` upward without swapping the local view.
- `<fd-calendar-container>` owns `pickerState = signal<{open, view, calendarIndex, triggerEl}>`.
- `FocusTrapService` traps focus in the picker while open.
- ESC + backdrop-click + selection close the picker; focus returns to `triggerEl`.

**No new inputs. No new outputs. No new signals. No new template branches. Only a structural move of the existing `@if (pickerState().open)` block into the inner div (see §5.2).**

## 4. Change surface

- `libs/core/calendar/calendar-container/calendar-container.component.scss` — stacking-context + positioning fixes.
- `libs/core/calendar/calendar-container/calendar-container.component.html` — relocate the `@if (pickerState().open) { … }` block inside `.fd-calendar-container-inner` (structural move only, no new branches, no new bindings). See §5.2.
- `libs/core/calendar/calendar-container/calendar-container.component.spec.ts` — two RED regression specs.
- E2E snapshots (Playwright) — regen where the picker-open state is captured.
- No changes to: `.ts` or any other calendar file.

## 5. The fix

### 5.1 Backdrop must block pointer events (Fix 3.1)

**Root cause.** Day cells inside `<fd-calendar>` render as descendants of a non-stacking-context parent (`.fd-calendar-container-inner`). The backdrop's `z-index: 10` only compares against elements in the same stacking context — day cells escape it.

**Change** (in `calendar-container.component.scss`):

- Establish a stacking context on each `<fd-calendar>` inside the container:
    ```scss
    fd-calendar-container {
        .fd-calendar {
            position: relative;
            z-index: 0;
            box-shadow: none;
            border-radius: 0;
        }
    }
    ```
- Raise backdrop z-index to sit above the new `<fd-calendar>` stacking contexts:
    ```scss
    .fd-calendar-container__picker-backdrop {
        z-index: 100;
        pointer-events: auto; /* defensive; default anyway */
        /* rest unchanged: absolute inset:0, sapBlockLayer_Background, sapBlockLayer_Opacity, cursor: pointer */
    }
    ```
- Keep per-calendar headers above the backdrop (clickable to switch which picker is open):
    ```scss
    fd-calendar-header {
        position: relative;
        z-index: 101;
    }
    ```
- Raise picker overlay above header:
    ```scss
    .fd-calendar-container__picker-overlay {
        z-index: 102;
        /* rest unchanged */
    }
    ```

**Semantics preserved:** backdrop click still closes the picker (bound via `(click)="closeContainerPicker()"` in the template). Per-calendar headers stay clickable — user can switch which picker is open by clicking a different mini-header.

### 5.2 Picker centered on day-grid area (Fix 3.2a)

**Root cause.** Picker overlay is a direct child of `<fd-calendar-container>` (the host element), which contains the whole container box including outer margins. Centering with `top/left: 50%` picks the container center, which includes header rows.

**Change.** Move the picker overlay from being a direct child of the host into being a direct child of `.fd-calendar-container-inner`. Since the picker's `max-height: calc(100% - 2rem)` and `max-width: calc(100% - 2rem)` already handle overflow, no change to those rules.

Template update in `calendar-container.component.html`: relocate the `@if (pickerState().open) { <backdrop/><overlay/> }` block inside `.fd-calendar-container-inner`, immediately after the `@for` loop closes.

```html
<div class="fd-calendar-container-inner" (mouseleave)="onHoverChange(null)">
    @let isVertical = layout() === 'vertical'; @for (m of calendarMonths(); track $index; let last = $last) {
    <fd-calendar …></fd-calendar>
    } @if (pickerState().open) {
    <div class="fd-calendar-container__picker-backdrop" …></div>
    <div class="fd-calendar-container__picker-overlay" …>@switch (pickerState().view) { … }</div>
    }
</div>
```

This gives the picker a positioning parent (`.fd-calendar-container-inner`) that already establishes bounds over the day-grid area — the inner div wraps the calendars (headers + day grids together), and the picker's visual center within that inner div reads as "centered over the day-grid stack" close enough for both horizontal (N=2) and vertical (N=2..4) layouts.

**Note on `.fd-calendar-container-inner` `overflow: hidden`.** Currently `overflow: hidden` is set. If the picker's `max-height` limit is exceeded (unlikely at max-width 100% - 2rem and typical picker content), overflow is clipped rather than shown. Accept — the current `overflow: auto` on `.fd-calendar-container__picker-overlay` handles internal scroll if a picker view is taller than the calendar area.

### 5.3 Regression specs (Fix 3.3)

Add to `calendar-container.component.spec.ts`, in the picker-overlay describe block:

**Spec 1 (RED first) — backdrop blocks click on day cells:**

```
it('backdrop blocks click events on day cells when picker is open', () => {
    // open month picker
    // dispatch click on a day cell in a different calendar
    // assert:
    //   - selectedDateChange spy not called
    //   - selectedRangeDateChange spy not called
    //   - pickerState().open still true
})
```

**Spec 2 (RED first) — backdrop blocks hover:**

```
it('backdrop blocks mouseover on day cells when picker is open', () => {
    // open month picker
    // dispatch mouseover on a day cell
    // assert:
    //   - hoverDate signal remains null
    //   - hoverDateChange spy not called
})
```

**Jsdom caveat.** Jsdom does not honor CSS-based pointer-event blocking (it dispatches events based on the DOM tree, not paint order). Two options:

- **Option A** (preferred if it works): use `document.elementFromPoint(x, y)` at the day cell's coordinates and assert the topmost element is the backdrop, not the day cell. Requires jsdom to implement `elementFromPoint` with paint-order awareness — historically it does not.
- **Option B** (fallback): assert the DOM invariant that produces the block — verify that `.fd-calendar-container__picker-backdrop` is rendered and computed z-index chain is correct (via getComputedStyle assertions on `z-index` values). Weaker but jsdom-safe.
- **Option C** (source of truth): e2e visual + interaction test. Playwright drives real Chromium; pointer events respect paint order there. Explicit acceptance: the e2e test in `apps/e2e-harness/tests/core/calendar/` is authoritative.

Plan should default to Option B for unit specs + require an e2e interaction test for the runtime behavior.

## 6. Acceptance criteria

- **AC1.** Click on a day cell behind an open picker does not emit `selectedDateChange` and does not close the picker.
- **AC2.** Mouseover on a day cell behind an open picker does not update the hover signal.
- **AC3.** Per-calendar mini-headers remain clickable while a picker is open — clicking a different calendar's month/year label swaps `pickerState.calendarIndex` and updates the picker content (existing behavior; regression guard).
- **AC4.** Picker overlay is visually centered over the day-grid area, not the full container box. Verified visually in horizontal (N=2) and vertical (N=3, N=4) layouts.
- **AC5.** Focus trap continues to work: Tab cycles within picker, Shift+Tab cycles backward, ESC closes, focus returns to `triggerEl`.
- **AC6.** E2E baselines regenerate cleanly; no regressions in single-calendar consumers (`<fd-date-picker>`, `<fd-datetime-picker>`) — those use `monthYearPickerMode: 'inline'` by default, so this code path is not reached.
- **AC7.** No API surface change on any component.

## 7. Sequencing (TDD plan-author rule)

- **Task 1 (RED).** Write Spec 1 + Spec 2 (§5.3). Confirm they fail on current `feat/two-month` HEAD via `nx run core-calendar:test --testfile=calendar-container.component.spec.ts`.
- **Task 2 (GREEN).** Apply SCSS changes (§5.1) + template relocation (§5.2). Confirm Spec 1 + Spec 2 pass. Run full `calendar-container` spec file — confirm no regressions.
- **Task 3 (visual verification).** `yarn start`. Navigate to calendar-container demo. Open month picker, year picker, year-range picker in horizontal 2-month and vertical 3-month layouts. Screenshot each. Compare against target Images 1, 6.
- **Task 4 (e2e regen).** If Task 3 approves visually: `npx playwright test --grep "calendar-container" --update-snapshots`. Review diffs. Commit.
- **Task 5 (regression guard).** `nx affected:test` for date-picker, datetime-picker, calendar. Confirm all green.

## 8. Risks

- **Jsdom pointer-event limitations** (§5.3). Mitigation: assert DOM invariants in unit specs, defer runtime-behavior assertion to e2e.
- **Stacking-context change on `<fd-calendar>` inside container** could break a positioning assumption in a nested overlay-based feature inside `<fd-calendar>` (e.g., a legacy tooltip inside a day cell). Mitigation: scope CSS to `fd-calendar-container .fd-calendar` only. Verify no such nested overlays exist via grep before committing.
- **`.fd-calendar-container-inner` `overflow: hidden` clips picker at large picker heights**. Mitigation: picker's internal `overflow: auto` handles content overflow. If clipping surfaces at N=1 (would only occur if a single-calendar consumer opts into `popover` mode — not expected), file as follow-up.
- **z-index tier bumps (10→100, 12→101, 11→102)** collide with outer-page overlays. Mitigation: all values are inside `<fd-calendar-container>`'s stacking context (established by root selector `fd-calendar-container { position: relative; }`), so they do not affect page-level overlays.

## 9. Effort

**~2–4 hours FORGE.**

- Task 1 (RED specs): 45 min.
- Task 2 (SCSS + template): 30 min.
- Task 3 (visual verify): 30 min.
- Task 4 (e2e regen): 30–60 min depending on baseline count.
- Task 5 (regression): 15 min.

## 10. Handoff

- **FORGE** implements Tasks 1, 2, 5.
- **CRUCIBLE** owns Task 4 (e2e regen) if baseline count exceeds ~20 or if diff review is non-trivial.
- **SENTINEL** owns Task 3 visual sign-off if the FORGE screenshots are ambiguous.
- **DAEDALUS** signs off when AC1–AC7 verified.
