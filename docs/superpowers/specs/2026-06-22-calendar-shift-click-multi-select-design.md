# Design: Shift-Click Multi-Date Selection for `fd-calendar` / `fd-date-picker`

**Date:** 2026-06-22  
**Issue:** [#13502](https://github.com/SAP/fundamental-ngx/issues/13502)  
**Branch:** `feat/calendar-allow-multi-selection`

---

## Problem

When `fd-calendar` (or `fd-date-picker`) has `[allowMultipleSelection]="true"`, users must click every date individually. There is no way to select a contiguous block of dates efficiently. SAP UI5's Calendar component supports Shift+Click to fill all dates between the last plain-clicked date (the "anchor") and the shift-clicked date. This feature should be brought to `fd-calendar`.

---

## Scope

- `fd-calendar` (`libs/core/calendar/`)
- `fd-calendar-day-view` (`libs/core/calendar/calendar-views/calendar-day-view/`)
- `fd-date-picker` (`libs/core/date-picker/`)
- Docs example for `fd-date-picker` multi-selection

Out of scope: month/year/aggregated-year views, range mode (`calType="range"`), keyboard-driven shift-extend (Shift+Arrow).

---

## Approach

The shift-click anchor lives in **`CalendarComponent`** so it survives month navigation. `CalendarDayViewComponent` detects the shift key on click and emits a new event. `CalendarComponent` owns the anchor state and the range-fill arithmetic.

---

## Data Model

### New state in `CalendarComponent`

```typescript
private _shiftAnchorDate: D | null = null;
```

Set to the clicked date on every plain click. Preserved across month navigation. Reset to `null` when `selectedMultipleDates` is reset from outside (via `writeValue` or `@Input` change) or when the selection mode changes away from `allowMultipleSelection + single`.

---

## Component Changes

### 1. `CalendarDayViewComponent`

**New output:**

```typescript
@Output() readonly selectedMultipleDateWithShiftChange = new EventEmitter<{ date: D; shiftKey: boolean }>();
```

**Change to `selectDate`:**

In the branch where `allowMultipleSelection() && calType() === 'single'`, replace the direct call to `_toggleMultiDate(day)` with:

```typescript
this.selectedMultipleDateWithShiftChange.emit({
    date: day.date,
    shiftKey: event?.shiftKey ?? false
});
```

`_toggleMultiDate` is **removed** — it becomes dead code once `selectDate` no longer calls it. The toggle logic is replicated in `CalendarComponent._toggleMultiDateFromCalendar` (see below).

> **Why remove:** `_toggleMultiDate` modifies the internal `_selectedMultipleDates` array and emits `selectedMultipleDatesChange`. With Approach B, `CalendarComponent` owns all merged selection logic and emits the final array. Keeping `_toggleMultiDate` in the day view would produce duplicate emissions.

**Re-render flow after shift-click:** After `CalendarComponent` emits `selectedMultipleDatesChange`, the updated array flows back to `CalendarDayViewComponent` via its `@Input() set selectedMultipleDates` setter (through the `[selectedMultipleDates]` binding in `calendar.component.html`). The setter updates `_selectedMultipleDates` and marks the view for check, triggering a re-render. No additional mechanism is needed.

**No change** to the existing `selectedMultipleDatesChange` output — it is still used for the final merged result, emitted by `CalendarComponent`.

---

### 2. `CalendarComponent`

**Wire the new output in the template:**

```html
(selectedMultipleDateWithShiftChange)="handleMultipleDateWithShift($event)"
```

**New private method `_fillDateRange(from: D, to: D): D[]`:**

Uses `DatetimeAdapter` to enumerate every calendar day between `from` and `to` (inclusive, order-independent). Filters out disabled dates via `disableFunction`.

```
start = compareDate(from, to) <= 0 ? from : to
end   = compareDate(from, to) <= 0 ? to   : from

result = []
current = start
while compareDate(current, end) <= 0:
    if !disableFunction || !disableFunction(current):
        result.push(current)
    current = addCalendarDays(current, 1)
return result
```

**New handler `handleMultipleDateWithShift({ date, shiftKey })`:**

```
if !shiftKey || !_shiftAnchorDate:
    _shiftAnchorDate = date
    call _toggleMultiDateFromCalendar(date)      // plain toggle, see below
else:
    rangeDates = _fillDateRange(_shiftAnchorDate, date)
    merged = union(selectedMultipleDates, rangeDates)  // add only, never remove
    selectedMultipleDates = merged
    onChange(merged)
    selectedMultipleDatesChange.emit(merged)
    // do NOT emit closeCalendar — user is mid-selection
```

**New private method `_toggleMultiDateFromCalendar(date: D)`:**

Replicates the toggle logic currently in `CalendarDayViewComponent._toggleMultiDate`, operating on `CalendarComponent.selectedMultipleDates`:

```
if date is in selectedMultipleDates: remove it
else: add it
emit selectedMultipleDatesChange
emit closeCalendar  // only on plain click, existing behaviour
```

**Anchor reset:**

Override `writeValue` and the `selectedMultipleDates` setter to reset `_shiftAnchorDate = null` when the selection is reset externally.

---

### 3. `DatePickerComponent`

No structural change required. `DatePickerComponent` already:

- Passes `[allowMultipleSelection]` to `CalendarComponent`
- Listens to `(selectedMultipleDatesChange)` via `handleMultipleDatesChange`

The only implicit change: `CalendarComponent` will no longer emit `closeCalendar` during shift-click fills (only on plain toggles). `DatePickerComponent`'s `closeFromCalendar()` handler is therefore not called mid-fill — the picker stays open while the user builds up the selection. This is the correct UX.

---

## Range-Fill Arithmetic

All date math uses the existing injected `DatetimeAdapter<D>`:

| Operation          | Method                             |
| ------------------ | ---------------------------------- |
| Compare two dates  | `adapter.compareDate(a, b)`        |
| Advance by one day | `adapter.addCalendarDays(date, 1)` |
| Check disabled     | existing `disableFunction` input   |

No new date utilities are needed.

---

## Cross-Month Example

1. User clicks **Jan 10** → `_shiftAnchorDate = Jan 10`, Jan 10 toggled into selection
2. User navigates to February (grid rebuilds, anchor untouched)
3. User shift-clicks **Feb 20** → `CalendarDayViewComponent` emits `{ date: Feb 20, shiftKey: true }`
4. `CalendarComponent._fillDateRange(Jan 10, Feb 20)` produces 42 dates via `addCalendarDays` loop
5. Merged with existing selection, emitted — calendar stays open

---

## Edge Cases

| Case                                                               | Behaviour                                                      |
| ------------------------------------------------------------------ | -------------------------------------------------------------- |
| Shift-click with no anchor yet                                     | Treat as plain click; set anchor, toggle date                  |
| Shift-click on already-selected date in fill range                 | Date stays selected (fill is additive)                         |
| Shift-click on a disabled date                                     | Disabled date excluded from fill; click is otherwise processed |
| External reset of `selectedMultipleDates`                          | `_shiftAnchorDate` reset to `null`                             |
| Mode change (e.g. `allowMultipleSelection` toggled off)            | `_shiftAnchorDate` reset to `null`                             |
| Keyboard Enter/Space activation (no `shiftKey` on `KeyboardEvent`) | `event.shiftKey` is `false` → plain toggle; anchor updated     |

---

## Documentation Example

New file: `libs/docs/core/date-picker/examples/date-picker-allow-multiple-selection-example.component.ts`

Demonstrates:

- `fd-date-picker` with `[allowMultipleSelection]="true"`
- Displays the `selectedMultipleDates` array
- Comment in template explaining shift-click UX

The example is registered in the existing date-picker docs page (`libs/docs/core/date-picker/`).

---

## Testing

- Unit tests in `calendar-day-view.component.spec.ts`: new output emits correct `{ date, shiftKey }` payload
- Unit tests in `calendar.component.spec.ts`:
    - Shift-click fills dates between anchor and clicked date
    - Plain click after shift-click sets new anchor
    - Cross-month fill (anchor in Jan, shift-click in Feb)
    - Disabled dates excluded from fill
    - External reset clears anchor
- No changes to `date-picker.component.spec.ts` required (behaviour flows through existing output handling)

---

## Files Changed

| File                                                                                            | Change                                                                                                                   |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `libs/core/calendar/calendar-views/calendar-day-view/calendar-day-view.component.ts`            | New output; modify `selectDate` branch                                                                                   |
| `libs/core/calendar/calendar.component.ts`                                                      | `_shiftAnchorDate` state; `handleMultipleDateWithShift`; `_fillDateRange`; `_toggleMultiDateFromCalendar`; anchor resets |
| `libs/core/calendar/calendar.component.html`                                                    | Wire `(selectedMultipleDateWithShiftChange)`                                                                             |
| `libs/docs/core/date-picker/examples/date-picker-allow-multiple-selection-example.component.ts` | New docs example                                                                                                         |
| `libs/docs/core/date-picker/`                                                                   | Register new example                                                                                                     |
