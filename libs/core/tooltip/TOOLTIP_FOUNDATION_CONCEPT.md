# Tooltip Foundation Concept

## Overview

This document defines the requirements and expected behavior for the unified tooltip foundation in `@fundamental-ngx/core`. The implementation should be delivered as an Angular directive that can be applied to any component where text is present, providing consistent tooltip behavior across the library.

### Summary

- **Unified** tooltip-like concepts into one tooltip foundation
- **Refined** usage and best practices for tooltips
- **Introduced** new guidance about tooltip content
- **Provided** flexible tooltip features
- **Enhanced** tooltip responsiveness
- **Added** mobile support for tooltips
- **Enhanced** accessibility-related features for tooltips

---

## Introduction

The tooltip foundation provides a consistent way to display supplemental information across all components. It integrates with the **Extended Keyboard Navigation** mode to ensure keyboard users can access tooltip content that would otherwise be unavailable without mouse interaction.

### Extended Keyboard Navigation Mode

Extended Keyboard Navigation is an optional keyboard navigation mode, primarily designed for desktop use and also supported on touch devices when a hardware keyboard is connected. It is intended specifically for keyboard users who navigate without a mouse.

When enabled, the mode extends the tab sequence by including elements that are not part of the default tab order. Each included element receives a visible focus indicator while focused. This ensures that keyboard users can:

- Navigate to previously unreachable elements
- Clearly identify the active focus state
- Trigger any associated tooltip on focus

**Important Constraints:**

- Use this feature **only when other keyboard access patterns cannot be applied** (see Wrapping & Truncation Foundation)
- This mode must **not replace proper accessibility implementation** or compensate for design gaps
- When Extended Keyboard Navigation is disabled, the control's default keyboard navigation remains unchanged
- The mode can be enabled or disabled at any time
- Because this mode alters the natural tab order, it may cause unexpected announcements or behavior when used with screen readers. **It is not recommended to enable this mode while using a screen reader.**

---

## Tooltip Behavior Fundamentals

### Single-Tooltip Invariant

**Critical Rule:** At most **one tooltip visible at any time** across the entire application.

This invariant must be enforced by a **singleton coordinator service** at the root level, not by individual directive instances. When a new tooltip is triggered:

1. Any existing open tooltip closes **immediately** (no delay)
2. The new tooltip opens after the appropriate delay (500ms for first, 200ms for sequence)

### Timing Rules

All timing values are configurable via `TOOLTIP_CONFIG` InjectionToken with these defaults:

| Trigger                 | Delay | Notes                                                                              |
| ----------------------- | ----- | ---------------------------------------------------------------------------------- |
| **Initial hover/focus** | 500ms | First tooltip shown                                                                |
| **Sequence**            | 200ms | Moving from one tooltip-bearing element to another while a tooltip is already open |
| **Hide on leave/blur**  | 500ms | Delay before closing                                                               |
| **Touch long-press**    | 0ms   | Immediate show                                                                     |
| **Keyboard shortcut**   | 0ms   | `Ctrl+Alt+I` toggles immediately                                                   |
| **Dismiss actions**     | 0ms   | `Esc`, element action (`Enter`), outside click, window blur                        |

**Sequence behavior example:**

```
User hovers Element A → wait 500ms → Tooltip A shows
User moves to Element B → Tooltip A closes immediately → wait 200ms → Tooltip B shows
User moves to Element C → Tooltip B closes immediately → wait 200ms → Tooltip C shows
```

### Modeless Tooltip Behavior

Tooltips are **modeless** — they do not trap focus or interrupt the user's workflow:

- Focus **always stays on the target element**, never moves into the tooltip
- The tooltip container is **not focusable** (no `tabindex`)
- The tooltip container is **not tabbable** — pressing `Tab` moves to the next element in the natural tab order
- The tooltip is a passive overlay that provides supplemental information

### Hover-able Tooltip

The tooltip container itself is hover-able to support text selection:

- If the pointer leaves the target but enters the tooltip container, the tooltip **stays open**
- Text inside the tooltip is **selectable** (no `user-select: none`)
- When the pointer leaves both the target AND the container, the hide delay starts

**Use case:** Users can hover onto the tooltip to select and copy text (e.g., long truncated titles, error messages).

### Placement & Auto-Flip

The tooltip supports configurable placement with automatic viewport flipping:

**Supported placements:**

- `top` (default)
- `bottom`
- `left`
- `right`

**Auto-flip behavior:**

- When the tooltip would overflow the viewport edge, it automatically flips to the opposite side
- Example: tooltip with `placement="top"` at the top edge of the viewport automatically flips to `bottom`
- Alignment options: `start`, `middle` (default), `end` along the chosen side

**Arrow:**

- Always points at the target element
- Reuses Popover arrow implementation
- Known SAPUI5 arrow-positioning limitation is accepted

**Recommendation for vertical layouts:**

- Prefer `left` or `right` placement for vertically-stacked elements to avoid visual clutter

### Content Assembly (Caller Responsibility)

The tooltip directive receives **already-assembled** content. Content ordering and separators are the **caller's** responsibility, not the directive's.

**Content types:**

- Label text (for unlabeled components like icon buttons)
- Truncated text (shown only when actually truncated)
- Supplementary description
- Keyboard shortcut

**Assembly order** (when multiple types present):

```
[Label/Truncated] - [Supplementary description] (Keyboard shortcut)
```

**Separator rules:**

- General content joined by `-` (hyphen with leading + trailing space)
- Keyboard shortcut in parentheses with leading space: `content (shortcut)`

**Examples:**

- Icon button: `"Save (Ctrl+S)"`
- Truncated title: `"Risk and Criticality AT AlphaNumeric"`
- Icon with description: `"Warning - Status Critical"`
- Button with badge: `"Notifications - You have 3 unread messages (Ctrl+N)"`

**Length guideline:**

- Keep concise — a word, phrase, or single sentence
- For longer content → use message strip or popover instead

### Mobile & Touch Behavior

**Touch interactions:**

- **Long-press** on the target shows the tooltip **immediately** (no delay)
- **Tap outside** the tooltip dismisses it
- **Text selection** (double/triple-tap) MUST NOT be blocked by the tooltip

**Special cases:**

- **Links that open new pages:** Tooltip MUST be disabled on touch to preserve native context menu
- **Custom context menu:** If present, shown together with tooltip on the same side
- **Hardware keyboard attached:** With keyboard connected to touch device, behavior matches desktop (focus + keyboard shortcuts work)

**Implementation note:**

```ts
// Detect long-press (~500ms hold) and show immediately
// Use touch events: touchstart → touchend timing
// Disable on <a> tags with target="_blank" or external hrefs
```

---

## When to Use Tooltips

### Recommended Use Cases

1. **Truncated Text**

    - The full content is revealed only through a tooltip
    - The content cannot be exposed through the container or another keyboard-accessible element

2. **Supplemental Contextual Information**

    - Additional details are available only through tooltips attached to elements that are not normally focusable
    - Examples: avatars or icons that provide contextual information

3. **Interactive Elements Inside Inputs**
    - Controls embedded in an input field (e.g., clear button, value help icon)
    - Elements not reachable through the default tab order
    - Tooltip content is otherwise inaccessible

### When NOT to Use Tooltips

Do **not** use tooltips in the following situations:

1. **Decorative or Redundant Content**

    - Elements that do not provide meaningful information or functionality
    - Examples: decorative icons, styling graphics, or visuals that duplicate existing text
    - These should not be made focusable in Extended Keyboard Navigation mode

2. **Disabled Elements**

    - Disabled controls must remain unfocusable
    - Must not be included in the extended tab sequence, regardless of whether they carry a tooltip

3. **When Alternatives Are Available**

    - Before using Extended Keyboard Navigation mode, ensure that none of the proposed alternatives in the Wrapping & Truncation Foundation can be applied for your use case

4. **For Essential Information**
    - Tooltips should provide supplemental, not critical, information
    - The expected tooltip text and control behavior should be specified in the control specification

---

## Extended Keyboard Navigation Mode

### Mode Activation

#### Keyboard Shortcut Activation

- **Shortcut:** `Shift + Alt + F6` (or `Alt + Shift + F6`) toggles the mode on or off
- **Scope:** The mode can be activated regardless of where you are on the page — it acts globally
- **Feedback:** Show a toast message to indicate that the mode has been enabled or disabled
- **Persistence:** If the page is reloaded or the user navigates to another page, the mode stays activated
- **Note:** Both key combinations (`Shift + Alt + F6` and `Alt + Shift + F6`) appear in the spec — implementation should support both for consistency

#### Screen Reader Announcements

**Mode Activation:**

```
Role: alert
Message: "Extended Keyboard Navigation is on. Press Alt+Shift+F6 to turn off. Note: Some elements in this mode may not be fully accessible with screen readers."
Component: Toast

Properties:
- aria-describedby = id refers to "Note: Some elements in this mode may not be fully accessible with screen readers."
```

**Mode Deactivation:**

```
Role: alert
Message: "Extended Keyboard Navigation is off."
Component: Toast

Properties:
- role: name
```

#### Activation via Application Settings

Applications **should** provide a clearly labeled toggle in the **Accessibility Settings**, accompanied by:

- A short description of the feature
- The keyboard shortcut used to activate it (`Shift + Alt + F6`)

**Note:** The exact placement of this toggle may vary depending on the application and its settings structure.

**Recommendation:** The examples in this specification are for illustration purposes only. The application team should evaluate whether this feature can be made available in the app settings.

---

## Keyboard Interaction

### Show/Dismiss Tooltip

The mode should align with tooltip behavior. When focus moves to an element from the extended tab order that has an assigned tooltip, the tooltip should be shown. Any existing tooltip keyboard shortcuts should remain functional in this mode.

| Keys             | Behavior                                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `Ctrl + Alt + I` | **By element which contains tooltip:**<br/>• Dismiss the tooltip if it is open<br/>• Show the tooltip if it is not visible |
| `Esc`            | Dismiss the tooltip if there is any                                                                                        |

#### Visual Examples

**When `Esc` is pressed:**

```
[Focused element with truncated text: "Risk and Criticality AT Alp..."]
[Tooltip visible: "Risk and Criticality AT AlphaNumeric"]

↓ (Esc pressed)

[Focused element with truncated text: "Risk and Criticality AT Alp..."]
[No tooltip visible]
```

**When `Ctrl + Alt + I` is pressed:**

```
[Focused element with truncated text: "Risk and Criticality AT Alp..."]
[No tooltip visible]

↓ (Ctrl + Alt + I pressed)

[Focused element with truncated text: "Risk and Criticality AT Alp..."]
[Tooltip visible: "Risk and Criticality AT AlphaNumeric"]
```

### Group Navigation

When additional elements are introduced into the tab order, the grouping and navigation sequence are affected accordingly. If an element from the extended tab chain becomes the first focusable element within a control, it should be treated as the entry point for that control in the updated tab order.

As a result, keyboard navigation using `F6` and `Shift + F6` must continue to function consistently, moving focus forward and backward between groups in alignment with the revised focus sequence.

| Keys         | Behavior                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------- |
| `F6`         | **Navigate backwards:**<br/>• Moves focus to the first control of the next group          |
| `Shift + F6` | **Navigate backwards:**<br/>• Moves focus to the first/last control of the previous group |

### Initial Focus

`Tab` and `Shift + Tab` move through all eligible elements in the extended tab chain order. Other keyboard shortcuts work as usual.

#### Mode Activated - Extended Tab Order

When the mode is activated, the focus should be set to the first element in the extended tab order (typically the first interactive control or the first truncated/tooltip-enabled element).

**Visual Example:**

```
[MODE IS ACTIVATED]

Focus initially on: [First focusable element in extended tab order]
```

#### Mode Not Activated - Default Tab Order

When the mode is not activated, the focus should be set to the first element in the default tab order (typically the first interactive control).

**Visual Example:**

```
[MODE IS NOT ACTIVATED]

Focus initially on: [First focusable element in default tab order]
```

### Movement

`Tab` and `Shift + Tab` move through all eligible elements in the extended tab chain order. Other keyboard shortcuts work as usual.

| Keys          | Behavior                                                                                                                                                                                                                                                                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Tab`         | **Navigate forward:**<br/>• By entering an element that contains a tooltip, the tooltip will appear after a set delay. If a tooltip was already displayed on the previous focused element, the tooltip for the next element will display immediately<br/>• By leaving an element that contains a tooltip, the tooltip will be dismissed immediately   |
| `Shift + Tab` | **Navigate backwards:**<br/>• By entering an element that contains a tooltip, the tooltip will appear after a set delay. If a tooltip was already displayed on the previous focused element, the tooltip for the next element will display immediately<br/>• By leaving an element that contains a tooltip, the tooltip will be dismissed immediately |

**Visual Flow Examples:**

```
[Element 1 focused]
↓ (Tab pressed)
[Element 2 focused with tooltip appearing after delay]
↓ (Tab pressed)
[Element 3 focused, Element 2 tooltip dismissed, Element 3 tooltip appears immediately]
```

---

## Expected Control Behavior

### Icons in Inputs

**Note:** The expected tooltip text and control behavior should be specified in the control specification the visuals.

#### Combobox / Multi-Combobox / Select

Currently the dropdown arrow of the combobox is not focusable. When the mode is activated, the user will be able to focus on it.

**Mode Activated Behavior:**

```
[MODE IS ACTIVATED]

Before: [Placeholder ▼] (Dropdown arrow not focusable)
After: [Placeholder ▼] (Dropdown arrow becomes focusable with visible focus indicator)

Tooltip: "Open Dropdown (F4)"
```

#### Input / Multiinput / Search Field / File Uploader

Currently the clear and value help icon of the input are not focusable. When the mode is activated, the user will be able to focus on it. If the icons have tooltips, they will be exposed.

**Mode Activated Behavior:**

```
[MODE IS ACTIVATED]

Before: [Loki  ×  🔍] (Icons not focusable)

After (Tab to clear icon): [Loki  [×]  🔍] (Clear icon focused with visible focus indicator)
       Tooltip: Empty

After (Tab to search icon): [Loki  ×  [🔍]] (Search icon focused with visible focus indicator)
       Tooltip: Empty
```

#### Date / Time / Date-Time Picker

Currently the value help icon of the date/time/date-time picker is not focusable. When the mode is activated, the user will be able to focus on it. If the icons have tooltips, they will be exposed.

**Mode Activated Behavior:**

```
[MODE IS ACTIVATED]

Before: [Placeholder  📅] (Icon not focusable)
After:  [Placeholder  [📅]] (Icon focused with visible focus indicator)
        Tooltip: Empty
```

#### Step Input

Currently the `+` and `-` icons of the step input are not focusable. When the mode is activated, the user will be able to focus on it. If the icons have tooltips, they will be exposed.

**Mode Activated Behavior:**

```
[MODE IS ACTIVATED]

Before: [−  50  +] (Icons not focusable)

After (focusing each icon in sequence):
Step 1: [[−]  50  +] (Minus icon focused) → Tooltip: "Decrement"
Step 2: [−  [50]  +] (Value focused)
Step 3: [−  50  [+]] (Plus icon focused) → Tooltip: "Increment"
```

### Visual Elements

**Warning:**

- Before using the mode, ensure that none of the proposed alternatives in the **Wrapping & Truncation Foundation** can be applied for your use case
- The expected tooltip behavior should be specified in the control specification

Here are listed visual elements that convey information but don't initiate any action.

#### Non-Interactive Avatar

If a non-interactive avatar conveys important information through a tooltip and is the only available method, enable this mode to ensure the tooltip is accessible to keyboard users. If the avatar has a label that gives context to its meaning, don't use the mode.

**Mode Activated Behavior:**

```
[MODE IS ACTIVATED]

Before: [👤] (Avatar not focusable)
After:  [👤 with focus ring] (Avatar focused)
        Tooltip: "Avatar Andy Smith"
```

#### Non-Interactive, Non-Decorative Icons

When the mode is activated, the user will be able to focus on it. If the icons have tooltips, they will be exposed.

**Mode Activated Behavior:**

```
[MODE IS ACTIVATED]

Before: [⚠️] (Warning icon not focusable)
After:  [⚠️ with focus ring] (Icon focused)
        Tooltip: "Status Critical"
```

**List Item Example:**

For example, if there is an icon with tooltip in a list that needs to be reached via keyboard, when the mode is activated the user will be able to focus on it.

```
[MODE IS ACTIVATED]

Before: [⭐  List Item] (Star icon not focusable)
After:  [[⭐]  List Item] (Star icon focused)
        Tooltip: "Favorite"
```

---

## Text Controls With Additional Information Available in a Tooltip

**Warning:**

- Before using the mode, ensure that none of the proposed alternatives in the **Wrapping & Truncation Foundation** can be applied for your use case
- The expected tooltip behavior should be specified in the control specification

In cases when there is application-specific text for the title available, the application-specific text is shown in the custom tooltip - regardless of whether it is (additionally) truncated or abbreviated.

### Heading Title Example

**Mode Activated Behavior:**

```
[MODE IS ACTIVATED]

Visual: Heading title

When focused: [Heading title with focus ring]
Tooltip: "A heading title shows non-truncated heading state. (Arrow keys to move, Shift+Arrow keys to resize)"
```

---

## Abbreviations

**Warning:**

- Before using the mode, ensure that none of the proposed alternatives in the **Wrapping & Truncation Foundation** can be applied for your use case
- The expected tooltip behavior should be specified in the control specification

In cases when the title (or other text controls) contains abbreviations, a custom tooltip is shown on focus to see the fully written out title text.

### Abbreviation Example

**Mode Activated Behavior:**

```
[MODE IS ACTIVATED]

Visual: S.A.P

When focused: [S.A.P with focus ring]
Tooltip: "Systems Applications and Products"
```

---

## Wrapping & Truncation

### Single-Line Text Truncation

**Scenario:** Text that is too long for the available space gets truncated (ends with `...`)

**Behavior:**

1. **Before Resize/Mode Activation:**

    - Element displays truncated text: `"Risk and Criticality AT Alp..."`
    - Element is **not** in the tab order
    - Tooltip shows on hover: `"Risk and Criticality AT AlphaNumeric"`

2. **After Mode Activation:**

    - Element becomes focusable and is added to the extended tab order
    - Element displays truncated text with visible focus indicator: `"Risk and Criticality AT Alp..."`
    - Tooltip shows on focus: `"Risk and Criticality AT AlphaNumeric"`

3. **After Resize (Text No Longer Truncated):**
    - Element displays full text: `"Risk and Criticality AT AlphaNumeric"`
    - Element is removed from the extended tab order
    - No tooltip is shown
    - On pressing `Tab`, focus moves to the next component in the tab chain

**Visual Flow:**

```
[MODE IS ACTIVATED]

[Focused: "Risk and Criticality AT Alp..."]
[Tooltip: "Risk and Criticality AT AlphaNumeric"]

↓ (Container resized, text no longer truncated)

[Displayed: "Risk and Criticality AT AlphaNumeric"]
[No focus indicator, removed from tab order]
[No tooltip]

↓ (Tab pressed)

[Focus moves to next component in tab chain]
```

### Multi-Line Text Truncation

**Similar behavior applies to multi-line text that is truncated across multiple lines.**

---

## Resizing

When the screen or the container containing the truncated text is resized and the text is no longer truncated, the element is removed from the extended tab sequence.

**Behavior:**

```
[MODE IS ACTIVATED]

Before resize:
[Focused: "Risk and Criticality AT Alp..."]
[Tooltip: "Risk and Criticality AT AlphaNumeric"]

↓ (Container resized)

After resize:
[Displayed: "Risk and Criticality AT AlphaNumeric"]

If the text element is resized, the focus state stays and any visible tooltip is removed.

↓ (Tab pressed)

On pressing the Tab key, the focus moves to the next component in the tab chain.
```

---

## Mode Activation/Deactivation

### Keyboard Shortcut Behavior

| Keys              | Behavior                                                  |
| ----------------- | --------------------------------------------------------- |
| `Ctrl + Alt + F6` | Activates or deactivates the Extended Keyboard Navigation |

### Visual Examples

#### Example 1: Focus is Set to the Container

In this example, the focus is set to the container of the item of the Carousel.

```
[MODE IS NOT ACTIVATED]

[Product Card 1]  [Product Card 2]
Normal tab order

↓ (Ctrl + Alt + F6 pressed)

[MODE IS ACTIVATED]
[Product Card 1 with focus ring]  [Product Card 2]

Toast: "Extended Keyboard Navigation is activated. Press Alt+Shift+F6 to turn off."
```

#### Example 2: Focus is Set to the First Focusable Element

```
[MODE IS NOT ACTIVATED]

[Product Card with:
 - On-site Construction Worker...
 - Available in 1 day
 - Supplier: Trinity Maxcom Ltd.
 - Quantity: 1
 - 180.00 USD / each
 - [Add to Cart]]

↓ (Ctrl + Alt + F6 pressed)

[MODE IS ACTIVATED]

[Product Card with:
 - [On-site Construction Worker... ← FOCUSED]
 - [Tooltip: "On-site Construction Worker In Work Clothes And Orange Safety Helmet."]
 - Available in 1 day
 - Supplier: Trinity Maxcom Ltd.
 - Quantity: 1
 - 180.00 USD / each
 - [Add to Cart]]

Toast: "Extended Keyboard Navigation is activated. Press Alt+Shift+F6 to turn off."

The Extended Keyboard Navigation is activated, and a message toast appears on the screen. If the currently focused element contains text that has the chance to be truncated, these items are added to the tab order.
```

#### Example 3: Focus is Moved to the Next Focusable Element

```
[MODE IS ACTIVATED]

Before deactivation:
[Product Card with truncated title focused]

↓ (Ctrl + Alt + F6 pressed)

After deactivation:
The focus is moved to the next focusable element.

Toast: "Extended Keyboard Navigation is Deactivated."
```

### If Available in Application Settings

**Warning:** The examples below are for illustration purposes only. The application team should evaluate whether this feature can be made available in the app settings.

#### Example 1: Toggle in Settings

```
Settings > Accessibility

[Toggle Switch]
Label: "Extended Keyboard Navigation"
Description: "When enabled, navigation includes all controls and relevant info icons with tooltips. Note: This feature is not optimized for use with screen readers. Toggling can also be done by pressing Alt+Shift+F6."

Current State: [OFF]

↓ (Toggle switched ON)

[MODE IS ACTIVATED]
Toast: "Extended Keyboard Navigation is activated. Press Alt+Shift+F6 to turn off."
```

#### Example 2: Settings Panel

```
Settings > Accessibility

User Account
   Jane Smith

Appearance
   Edit display options

Accessibility
   [Extended Keyboard Navigation]  ← SELECTED

Language
   Languages
```

When selected:

```
Accessibility

[Toggle Switch: ON]
Extended Keyboard Navigation

When enabled, navigation includes all controls and relevant info icons with tooltips. The feature is not fully optimized for use with screen readers.
Toggling can also be done by pressing Alt+Shift+F6.

[Cancel]  [Save]
```

**Note:** If the mode can be activated both through the application settings and a keyboard shortcut, anyone with a physical keyboard present (either the same user at all times, or different users) should be able to activate the mode. If the mode is toggled via keyboard shortcut the settings section is kept open, the corresponding switch must update immediately to reflect the current state.

---

## Focus Behavior

### Initial Focus

`Tab` and `Shift + Tab` move through all eligible elements in the extended tab chain order. Other keyboard shortcuts work as usual.

#### Mode Activated - Extended Tab Order

When the mode is activated, initial focus should be set according to the extended tab order.

**Visual Examples:**

```
[MODE IS ACTIVATED]

Example 1: Focus on first element
[Comprehensi... ← FOCUSED]  [Casu... ← ]  [Filtered by ▼]  [⋯]

Example 2: Focus on next element
[Comprehensi...]  [Casu... ← ]  [[Filtered by ▼] ← FOCUSED]  [⋯]
```

#### Mode Not Activated - Default Tab Order

When the mode is not activated, initial focus follows the default tab order.

**Visual Examples:**

```
[MODE IS NOT ACTIVATED]

Example 1: Default focus
[Comprehensi...]  [Casu...]  [[Filtered by ▼] ← FOCUSED]  [⋯]

Example 2: Default tab order
[Comprehensi...]  [Casu...]  [Filtered by ▼]  [⋯]
```

### Movement

#### Tab Navigation

When navigating with `Tab` and `Shift + Tab`:

**Forward Navigation (`Tab`):**

- By entering an element that contains a tooltip, the tooltip will appear after a set delay
- If a tooltip was already displayed on the previous focused element, the tooltip for the next element will display immediately
- By leaving an element that contains a tooltip, the tooltip will be dismissed immediately

**Backward Navigation (`Shift + Tab`):**

- Same behavior as forward navigation

**Visual Flow:**

```
[MODE IS ACTIVATED]

State 1: [Element 1 ← FOCUSED]
         [Tooltip: "..."]

↓ (Tab pressed)

State 2: [Element 1]
         [Element 2 ← FOCUSED]
         [Tooltip appears immediately: "..."]

↓ (Tab pressed)

State 3: [Element 2]
         [Element 3 ← FOCUSED]
         [Tooltip appears immediately: "..."]
```

#### Shift + Tab Navigation

```
[MODE IS ACTIVATED]

State 1: [Element 3 ← FOCUSED]
         [Tooltip: "..."]

↓ (Shift + Tab pressed)

State 2: [Element 3]
         [Element 2 ← FOCUSED]
         [Tooltip appears immediately: "..."]
```

---

## Implementation Notes

### Angular Directive Approach

The tooltip foundation should be implemented as an **Angular directive** that can be applied to any component where text is present.

**Key Requirements:**

1. **Directive Design:**

    - Should be a standalone directive
    - Can be applied via attribute selector (e.g., `[fdTooltip]` or `[fdExtendedKeyboardNav]`)
    - Should work with both signal-based and decorator-based inputs
    - Use signal-based APIs for all new code (`input()`, `output()`, `computed()`)

2. **Focus Management:**

    - Track Extended Keyboard Navigation mode state (global service or signal)
    - Dynamically manage `tabindex` based on mode state
    - Apply visible focus indicators using `host: { '[class]': }` binding
    - Never use `@HostBinding` or `@HostListener` — use `host: {}` metadata

3. **Tooltip Integration:**

    - **Reuse Popover overlay infrastructure** — do not build a new overlay system
    - Integrate with Angular CDK `Overlay` + `FlexibleConnectedPositionStrategy`
    - Handle show/hide logic based on focus/hover
    - Support keyboard shortcuts (`Ctrl + Alt + I`, `Esc`)
    - Implement delay logic for tooltip appearance (configurable via `TOOLTIP_CONFIG` token)
    - Enforce **single-tooltip invariant** via coordinator service

4. **Truncation Detection:**

    - Detect when text is truncated (compare `scrollWidth` vs `clientWidth` for single-line)
    - Use `ResizeObserver` to detect container size changes
    - Dynamically add/remove element from extended tab order
    - **Important:** Debounce observations to prevent performance issues

5. **Accessibility:**

    - Add appropriate ARIA attributes (`role="tooltip"`, `aria-describedby`)
    - **Duplicate-announcement guard:** Only set `aria-describedby` when tooltip text differs from accessible name
    - Ensure screen reader compatibility (with documented limitations)
    - Handle `aria-describedby` for tooltip content
    - Keyboard shortcuts exposed via `aria-keyshortcuts` on target element

6. **State Management:**

    - Global service or signal to track mode activation state
    - Toast notifications for mode activation/deactivation (use `@fundamental-ngx/core/message-toast`)
    - Persist mode state across page navigation (sessionStorage)
    - Use `DestroyRef` + `takeUntilDestroyed()` for cleanup (no custom `DestroyedService`)
    - Use `signal()` for local state (not `BehaviorSubject`)

7. **Timing Configuration:**

    - **Show delay:** 500ms (hover/focus)
    - **Hide delay:** 500ms (leave/blur)
    - **Sequence delay:** 200ms (when moving between tooltip-bearing elements)
    - **Immediate:** Touch long-press, keyboard shortcut (`Ctrl+Alt+I`)
    - All configurable via `TOOLTIP_CONFIG` InjectionToken

8. **Touch Support:**
    - Long-press shows tooltip immediately
    - Tap outside dismisses
    - **Disable tooltips on links that open new pages** (preserve native context menu)
    - Hardware keyboard attached to touch device = desktop behavior

### Two-Phase Delivery

**Phase 1: Base Tooltip Directive**

- `[fdTooltip]` directive with hover/focus/keyboard triggers
- Tooltip service + coordinator
- Container component (role="tooltip")
- Full accessibility implementation
- Touch support
- Unit tests

**Phase 2: Extended Keyboard Navigation**

- `ExtendedKeyboardNavService` (global mode state)
- `ExtendedKeyboardNavDirective` (opt-in focus management)
- Truncation detection with ResizeObserver
- Toast notifications
- sessionStorage persistence
- Unit tests

This separation allows the base tooltip to ship independently while Extended Keyboard Nav is developed and tested.
