# Implementation of Form Control type number

I need to add new functionalities to an existing directive. The new implementation should NOT introduce breaking changes to the existing applications, aka the old functionality and API should be preserved as much as possible.

---

## 📋 Quick Reference - Implementation Decisions

| Aspect                    | Decision                       | Notes                                                       |
| ------------------------- | ------------------------------ | ----------------------------------------------------------- |
| **Type conversion**       | Force `type="text"` internally | Full control over formatting, allows thousands separator    |
| **Enhanced mode**         | Auto-detect from signal inputs | Backward compatible - only activates when new features used |
| **Empty blur**            | Remains empty (not 0)          | Only show 0 on explicit Enter in empty field                |
| **Validation**            | Use existing `state` input     | `'success' \| 'error' \| 'warning' \| 'information'`        |
| **Thousands separator**   | Configurable via input         | `useGrouping` boolean input                                 |
| **Decimal separator**     | Configurable with auto-detect  | Input property with default from `Intl.NumberFormat`        |
| **Alignment**             | `text-align: end`              | CSS logical property for RTL support                        |
| **Readonly**              | Support `readonly` attribute   | Shows value, prevents editing, not grayed out               |
| **Initial invalid value** | Ignore, show empty             | `value="abc"` → displays empty, internal `null`             |
| **Step modes**            | Addition vs Multiple           | Addition: direct arithmetic; Multiple: round to step        |
| **Negative numbers**      | Allowed by default             | Can restrict via `min >= 0`                                 |
| **Scientific notation**   | Support e/E                    | `1e5` = 100000                                              |
| **Paste behavior**        | Strip separators, validate     | Allow `1,000.50` → parse as 1000.50                         |
| **Scroll**                | One tick = one step            | Like native number input                                    |
| **Cursor position**       | Move to end after change       | After arrow/page keys                                       |
| **Error display**         | Persist until fixed            | Not "briefly" - users need time to read                     |

---

## Introduction

I have a fd-form-control directive @libs/core/form/form-control/form-control.component.ts
I can attach it to an input or textarea HTML element.
For input, I can add type, like text, number and password, and it would take the default behavior from the native HTML element.
For example, input fd-form-control type="number" min="0" max="10" step="2" />
min, max and step would work because they are coming from the default number input HTML element.
Now, we have to extend the functionality of the number input, for which we can no longer rely on the default behavior. We would need to detect the type number and treat it as a type text.

## Requirements

The following new features need to be added for an input of type number

### Value & Placeholder

The numeric input always displays a value when not in active state. The value is a rational number. The default value is 0. If a minimum or maximum value is defined, the default is the closest value to 0. When no value is set, on focus out the field is empty. Applications can set an initial value. While the field is active and the value has been cleared, placeholder text can be displayed.

Example:
input shows value 50 -> Del -> Input shows placeholder value -> Enter -> Input shows 0

Input shows placeholder value -> Enter -> Input shows 0

### Reset

When the Escape key is pressed while the numeric input is in active state, the value that was set before the field became active is restored.

Example:
input shows value 50 -> Del -> Input shows placeholder value -> Esc -> Input shows 50 again

### Step Size

A step size can be set, defined as a rational number that is added or subtracted from the current value when the value is increased or decreased via keyboard or scroll.

Example:
+1 step: input shows value 3 -> arrow up key -> input shows value 4 -> arrow up key -> input shows value 5 -> arrow down key -> input shows value 4

step size = 5: input shows value 3 -> arrow up key -> input shows value 8 -> arrow up key -> input shows value 13 -> arrow down key -> input shows value 8

### Larger Step Size

A larger step size can be set, defined as a rational number. When pressing Page Up/Down keys, the current value is increased or decreased by the product of the step size multiplied by the larger step size.

Example:
+10 larger step:
input shows value 0 -> arrow up key -> input shows value 1 -> page up key -> input shows value 11 -> page up key -> input shows value 21 -> page down key -> input shows value 11

step size = 5, larger step size = 3:
input shows value 0 -> arrow up key -> input shows value 5 -> page up key -> input shows value 20 -> page up key -> input shows value 35 -> page down key -> input shows value 20

### Step Mode

The step mode defines how the new value is calculated when stepping:
Addition and subtraction — the new value results from adding or subtracting the step size from the current value.
Multiple — the new value results from rounding the current value to the nearest multiple of the step size.

1. Increment mode
   Example:
   input shows value 1 -> arrow up key -> input shows value 2 -> arrow down key -> Input shows value 1

2. Step mode = addition and subtraction, step size = 5, larger step size = 3
   Example:
   input shows value 1 -> page up key -> input shows value 6 -> page down key -> Input shows value 1

3. Addition mode
   Example:
   input shows value 1 -> arrow up key -> input shows value 5 -> arrow down key -> Input shows value 1

4. Step mode = multiple, step size = 5, larger step size = 3
   Example:
   input shows value 3 -> page up key -> input shows value 15 -> page down key -> Input shows value 0

### Minimum & Maximum Value

Minimum and maximum values can be set as rational numbers. When the value reaches the minimum or maximum, the Up/Down keyboard shortcuts are disabled at that boundary. If a value outside the range is entered, an error state appears. When adding or subtracting a step size would exceed the minimum or maximum, the value is set to the minimum or maximum instead.

### Value Precision

The number of digits after the decimal point can be defined as a natural number, including 0. When typing or pasting a value, digits exceeding the defined precision are not accepted and an error state appears briefly.

### Validation mode

Delayed — the value is validated after the user presses Enter or focus leaves the field.Live — the value is validated immediately on each keystroke.

### Value Alignment

The value can be aligned within the input field. End alignment is the default and is recommended for easier comparison of numbers.
Right-aligned - the input text is on the right side
Center-aligned - the input text is in the middle
Left-aligned - the input text is on the left side

### Thousands Separator

Large values can be grouped using thousands separators to improve readability.

Example: Without separator 1000000, with separator 1,000,000

### Localization

The numeric input supports left-to-right (LTR) and right-to-left (RTL) reading directions. All features work in both directions.

### Internationalization (i18n)

Issue description: Currently there is no locale support for input-field with type="number". We have such support for the date-, datetime- and time-fields.
By default it is showing decimal numbers with comma (e. 2,3). But there are other locale like "en-US", where decimal numbers should be shown with a point.

### Additional requirements

0. Create new SIGNAL input properties for min, max, step, largeStep, alignment, validationMode, valuePrecision, etc. Min/max/step/largeStep they should accept num and strings and should normalize the values. Should preserve the default behavior of native HTML number input.
1. The input should behave as a native number input aka the user cannot type text except for numeric text like e, E
2. The input should have validation by an output like the other form controls we have
3. Do not add any i18n strings for the validation!!!
4. Do not introduce breaking changes in existing directives and components
5. For each requirement update the example in the documentation so it can be tested. Here's where the examples should be libs/docs/core/input/examples/input-number-example.component.html. I prepared the boilerplate.
6. Use latest Angular features: signals, signal inputs/outputs, etc. If necessary migrate old code to latest BUT ONLY IF NECESSARY. That's especially valid for libs/core/form/form-control/form-control.component.ts
7. DO NOT WRITE TESTS UNTIL I SPECIFY.
8. Keep the code as simple as possible.
9. Extract the logic for number input in a separate from libs/core/form/form-control/form-control.component.ts file to keep the code simple, clean and easy to maintain.
10. The mouse scroll should work as for default number input
11. Now here's more info that can be helpful

## Implementation Decisions (Clarified)

### 1. Type Conversion Strategy

**Decision:** Force `type="text"` internally when enhanced mode is detected and handle all numeric validation manually.

**Rationale:** Native `type="number"` allows "e", "E", "+", "-" which breaks thousands separator display. Using text gives full control over formatting.

### 2. Enhanced Mode Activation

**Decision:** Auto-detect based on presence of new signal inputs (step, largeStep, valuePrecision, etc.)

**Rationale:** Preserves backward compatibility. Existing `type="number"` inputs without new features continue to work as before.

### 3. Default Value on Empty Blur

**Decision:** User clicks input (empty) → types nothing → blur → input remains empty (not 0)

**Exception:** Only show 0 when user explicitly clears a value then presses Enter.

### 4. Validation Output Event

**Decision:** Simple boolean output

```typescript
readonly validation = output<boolean>();
```

### 5. Thousands Separator Format

**Decision:** Configurable via an input property

```typescript
readonly useGrouping = input<boolean>(false);
```

### 6. Value Alignment Default

**Decision:** Use `text-align: end` (CSS logical property) for proper RTL support.

### 7. Multiple Mode: Rounding Direction

**Note:** Logic copied from design specs. Need to verify/test the rounding behavior during implementation.

Example: `value 3 → page up (step=5, largeStep=3) → value 15`

- Calculation: `3 + (5 × 3) = 18`, but shows `15`
- Likely: Round down to nearest multiple of step: `Math.floor(18 / 5) × 5 = 15`

## Missing Requirements - Clarifications

### 1. Paste Behavior

**Decision:** Strip thousands separators, validate precision, block invalid numeric text.

**Best Practice:**

- Allow paste of "1,000.50" → parse as 1000.50
- Reject paste if value exceeds precision
- Reject non-numeric text (except valid numeric chars: digits, decimal, minus, "e"/"E")

### 2. Negative Numbers

**Decision:** Allowed by default (can be restricted via `min >= 0`)

### 3. Scientific Notation

**Decision:** Support "e"/"E" for scientific notation (1e5 = 100000)

**Note:** User explicitly mentioned we should allow "e".

### 4. Initial Value Handling

**Decision:** If initial value exceeds precision, round/truncate on init.

**Example:** `value="3.14159"` with `valuePrecision="2"` → display as "3.14"

### 5. Scroll Increment Amount

**Decision:** One scroll tick = one step (same as native HTML number input)

### 6. Cursor Position After Value Change

**Decision:** Move cursor to end of input after arrow key/page key changes value

### 7. Empty String vs Zero

**Decision:**

- Internal model value: `null` when empty, `number` when set
- Displayed value: empty string when null, formatted number when set
- On Enter in empty field: set to 0 and display "0"

### 8. Error State Display Duration

**Decision:** Persist error state until next valid input (not "briefly")

**Rationale:** Users need time to see and understand the error. Brief flash might be missed.

---

## Additional Features from UI5 Reference

Based on UI5 NumberInput implementation (https://ui5.github.io/webcomponents/components/main/NumberInput/):

### Value States

Consider supporting multiple validation states beyond simple boolean:

- None (default)
- Positive (success)
- Negative (error)
- Critical (warning)
- Information

**For MVP:** Use simple boolean validation output. Can extend later if needed.

### Events to Implement

1. **change** - Fires on Enter keypress or focus loss (blur)
2. **input** - Fires on every keystroke (optional, for live validation mode)
3. **validation** - Our custom event for validation state changes

### Readonly State

**Question for consideration:** Should we support `readonly` attribute?

- Readonly = displays value but prevents editing
- Different from `disabled` which grays out the field

### Form Integration

**Note:** Ensure the underlying value can be submitted in forms via:

- Native form submission
- Angular reactive forms integration
- Template-driven forms support

---

## Critical Edge Cases & Scenarios

### 1. Focus/Blur Behavior

- **On Focus:** Select all text for easy replacement
- **On Blur:**
    - Validate value
    - Apply formatting (thousands separator if enabled)
    - If empty and no value entered, remain empty
    - If invalid, show error state

### 2. Decimal Separator

**Decision Needed:** Which decimal separator to use?

- Period (.) for en-US locale: `1000.50`
- Comma (,) for de-DE locale: `1000,50`

**Recommendation:** Use browser locale via `Intl.NumberFormat` or accept as input property.

### 3. Leading Zeros

**Behavior:** `0005` should be normalized to `5`

### 4. Decimal Edge Cases

- `.5` should be accepted as `0.5`
- `5.` should be accepted as `5.0` or `5`
- Multiple decimals `5.5.5` should be rejected

### 5. Minus Sign Placement

- `-` only allowed as first character
- `-5` valid, `5-` invalid
- `--5` invalid (double minus)

### 6. Scientific Notation Edge Cases

- `1e5` = 100000 ✓
- `1E5` = 100000 ✓
- `1e-2` = 0.01 ✓
- `1ee5` invalid ✗
- `e5` invalid (needs coefficient) ✗

### 7. Boundary Behavior

**When at min boundary (e.g., min=0, value=0):**

- Arrow Down: disabled/no-op
- Page Down: disabled/no-op
- Scroll down: disabled/no-op

**When at max boundary (e.g., max=100, value=100):**

- Arrow Up: disabled/no-op
- Page Up: disabled/no-op
- Scroll up: disabled/no-op

**When step would exceed boundary:**

- Clamp to boundary instead
- Example: value=98, max=100, step=5 → Arrow Up → value=100 (not 103)

### 8. Keyboard Shortcuts Summary

| Key                | Action                                                       |
| ------------------ | ------------------------------------------------------------ |
| Arrow Up           | Increase by step                                             |
| Arrow Down         | Decrease by step                                             |
| Page Up            | Increase by (step × largeStep)                               |
| Page Down          | Decrease by (step × largeStep)                               |
| Escape             | Revert to value before focus                                 |
| Enter              | Accept value, validate, trigger change event                 |
| Minus (-)          | Toggle negative (if not at start of input) or enter negative |
| Period (.)         | Decimal separator                                            |
| e / E              | Scientific notation                                          |
| Digits (0-9)       | Numeric input                                                |
| Backspace / Delete | Remove characters                                            |

### 9. Disabled State

When `disabled="true"`:

- All keyboard interactions disabled
- Scroll disabled
- Visual state: grayed out
- Form value: not submitted

### 10. Value Precision Validation

**Live validation mode:**

- Block input immediately if exceeds precision
- Show error state on invalid keystroke

**Delayed validation mode:**

- Allow typing any value
- Validate on blur or Enter
- Round/truncate to precision or show error

---

## Implementation Priority

### Phase 1: Core Numeric Behavior (MVP)

1. ✓ Type conversion (force text internally)
2. ✓ Basic numeric input validation (digits, minus, decimal, e/E)
3. ✓ Value get/set
4. ✓ Min/max clamping
5. ✓ Step up/down (Arrow keys)
6. ✓ Enter to confirm, Escape to reset

### Phase 2: Enhanced Features

7. ✓ Value precision
8. ✓ Larger step (Page Up/Down)
9. ✓ Step mode (addition vs multiple)
10. ✓ Validation mode (live vs delayed)
11. ✓ Scroll support

### Phase 3: Formatting & UX

12. ✓ Thousands separator (optional)
13. ✓ Value alignment (start/center/end)
14. ✓ Focus behavior (select all)
15. ✓ Cursor position management

### Phase 4: Advanced

16. ✓ RTL support (text-align: end)
17. ✓ Scientific notation parsing
18. ✓ Paste behavior
19. ✓ Locale-aware formatting (i18n)

---

## Final Clarifications ✅

### 1. Decimal Separator

**Decision:** Configurable via input with default value (auto-detect from browser locale)

```typescript
readonly decimalSeparator = input<'.' | ','>('.'); // default, but detectable via Intl
```

### 2. Readonly Support

**Decision:** YES, support `[readonly]="true"` state

- Shows value (not grayed out)
- Prevents editing
- Different from `disabled` (which grays out and excludes from form submission)

### 3. Value State Types

**Decision:** Use existing `state` input (already implemented in form-control)

```typescript
@Input() state: FormStates | null = null; // 'success' | 'error' | 'warning' | 'information'
```

Works with existing `fd-form-input-message-group` infrastructure. No new validation output needed.

### 4. Initial Invalid Value

**Decision:** Ignore and show empty input

```html
<input value="abc" type="number" fd-form-control />
<!-- Result: displays empty, no error, internal value = null -->
```

### 5. Step Mode Logic (VERIFIED from specs)

#### **Addition and Subtraction Mode** (default)

Simple arithmetic: `newValue = currentValue ± step`

**Examples from specs:**

- **Increment:** `1 → arrow up → 2 → arrow down → 1`
- **With larger step (step=5, largeStep=3):** `1 → page up → 16 → page down → 1`
    - Page Up: `1 + (5 × 3) = 1 + 15 = 16` ✓
    - Page Down: `16 - (5 × 3) = 16 - 15 = 1` ✓

#### **Multiple Mode** (rounds to nearest multiple)

Round current value to nearest multiple of step, then add/subtract.

**Examples from specs:**

- **Multiple mode (step=5):** `1 → arrow up → 5 → arrow down → 1`
    - Arrow Up: Round 1 to nearest multiple of 5 → could be 0 or 5. Going UP, so rounds to 5 ✓
    - Arrow Down: Round 5 to nearest multiple of 5 below → 0, but we started at 1, so goes to 0 then "down" would wrap or go to previous, which shows 1

**Wait, the logic from the screenshot is clearer:**

**Multiple Mode Algorithm:**

- **Arrow Up:** Round current value **up** to next multiple of step
    - `1 → 5` (next multiple of 5 above 1)
    - `5 → 10` (already at multiple, go to next)
- **Arrow Down:** Round current value **down** to previous multiple of step
    - `5 → 1` (Hmm, previous multiple of 5 below 5 is 0, not 1...)

**Actually, looking at screenshot more carefully:**

**Multiple mode with step=5, largeStep=3:**

- `3 → page up → 15 → page down → 0`
- Page Up: `3 + (5 × 3) = 18`, then round **down** to nearest multiple of 5 = `15` ✓
- Page Down: `15 - (5 × 3) = 0`, already multiple of 5 = `0` ✓

**So the algorithm is:**

1. Calculate new value using addition/subtraction: `newValue = current ± (step × [1 or largeStep])`
2. In **Multiple mode**: Round result to nearest multiple of `step`
    - Use `Math.round(newValue / step) × step` for nearest
    - OR use `Math.floor(newValue / step) × step` for down, `Math.ceil(newValue / step) × step` for up

Let me verify with "Addition mode" example:

- `1 → arrow up → 5`: This is **Multiple mode**, not addition mode
- Addition mode would be: `1 → arrow up → 6` (1 + 5 = 6)

**Correction: The two modes are:**

1. **Addition/Subtraction mode:** Direct arithmetic, no rounding
2. **Multiple mode:** Round to nearest multiple of step after arithmetic
