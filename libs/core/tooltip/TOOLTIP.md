# Tooltip — Behavior Specification (agent-normative)

> **Audience:** the Claude agent implementing the tooltip as an Angular directive in
> `@fundamental-ngx/core` and integrating it into components.
> **How to use this file:** §1–§7 are **normative** — each requirement has a stable ID
> (`TT-…`, `A11Y-…`, `TOUCH-…`) and, where testable, an acceptance criterion. Implement every
> MUST; turn each acceptance criterion into a unit test. §8 (Design Context) is
> **non-normative** background for designers/consumers — read it to understand _why_, but do
> not derive directive code from it.
> **Companion docs:** build mechanics live in [`TOOLTIP_IMPLEMENTATION.md`](./TOOLTIP_IMPLEMENTATION.md);
> Extended Keyboard Navigation detail in [`TOOLTIP_FOUNDATION_CONCEPT.md`](./TOOLTIP_FOUNDATION_CONCEPT.md).
> Keyword convention: **MUST / MUST NOT / SHOULD / MAY** as in RFC 2119.

---

## 1. Scope & shape

| ID         | Requirement                                                                                                                                                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TT-SCOPE-1 | The tooltip MUST be delivered as a **standalone attribute directive** (`[fdTooltip]`) plus supporting services — **not** a component or a template wrapper.                                                                                    |
| TT-SCOPE-2 | It MUST be addable to an existing element by adding attributes only. It MUST NOT require the consumer to change their DOM structure or wrap content.                                                                                           |
| TT-SCOPE-3 | Integration MUST be **additive / non-breaking**: a component that does not opt in renders and behaves exactly as before. No existing public API, selector, input, output, or DOM changes.                                                      |
| TT-SCOPE-4 | The tooltip is **text-only**. Rich/interactive/formatted content is out of scope — such cases use Popover instead (see §8). The directive MAY accept a `TemplateRef` for plain text layout but MUST NOT support interactive content inside it. |
| TT-SCOPE-5 | The tooltip MUST NOT use the native `title` attribute as its source or rendering mechanism.                                                                                                                                                    |

## 2. Anatomy

| ID        | Requirement                                                                                                                                                                            |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TT-ANAT-1 | The rendered tooltip consists of a **Text Container** (floating surface, dark popover style, with an arrow) wrapping the **Text**.                                                     |
| TT-ANAT-2 | The container MUST be rendered in an overlay built on the existing Popover overlay/positioning infrastructure (reuse, do not reimplement). The arrow MUST point at the target element. |

## 3. Timing (single source of truth)

All delays are configurable via a global config token with these defaults:

| ID        | Constant        | Default    | Applies to                                                                 |
| --------- | --------------- | ---------- | -------------------------------------------------------------------------- |
| TT-TIME-1 | `showDelay`     | **500 ms** | Mouse hover and keyboard-focus show.                                       |
| TT-TIME-2 | `hideDelay`     | **500 ms** | Mouse-leave and focus-out hide.                                            |
| TT-TIME-3 | `sequenceDelay` | **200 ms** | Showing the _next_ tooltip when one is already open (see TT-SEQ-1).        |
| TT-TIME-4 | _(no delay)_    | **0 ms**   | Touch long-press, keyboard shortcut, and all _immediate_ dismissals below. |

**Acceptance:** with fake timers, tooltip does not appear before `showDelay` elapses and does
appear at `showDelay`; symmetric for `hideDelay`.

## 4. Showing, keeping, dismissing, sequencing

### 4.1 Show

| ID        | Requirement                                                                                                                                                                       | Acceptance                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| TT-SHOW-1 | Show on mouse `mouseenter` of the target, after `showDelay`.                                                                                                                      | Hover → wait < 500ms → not shown; wait ≥ 500ms → shown.  |
| TT-SHOW-2 | Show on **keyboard** focus of the target, after `showDelay`.                                                                                                                      | `focus` via keyboard → shown after delay.                |
| TT-SHOW-3 | Clicking/tapping that moves focus to the element MUST NOT show the tooltip. Only hover, keyboard-focus, long-press (TOUCH-1), or shortcut (A11Y-SHOW-2) show it.                  | pointer-click focus → not shown.                         |
| TT-SHOW-4 | The tooltip is **modeless**: focus MUST stay on the target; it MUST NOT be possible to move focus into the container; the container MUST NOT be tabbable and MUST NOT trap focus. | container has no `tabindex`; `Tab` does not land in it.  |
| TT-SHOW-5 | When a tooltip is disabled via `tooltipDisabled` input, it MUST NOT show under any trigger (hover, focus, shortcut). The directive MUST NOT add any attributes or listeners.      | `tooltipDisabled=true` → no show, no ARIA, no listeners. |

### 4.2 Keep (hover-able)

| ID        | Requirement                                                                                                      | Acceptance                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| TT-KEEP-1 | If the pointer leaves the target but enters the container, the tooltip MUST stay open (cancel the pending hide). | target `mouseleave` → container `mouseenter` within hide window → stays open. |
| TT-KEEP-2 | Text inside the container MUST be selectable.                                                                    | container text has no `user-select: none`.                                    |

### 4.3 Dismiss

| ID        | Requirement                                                                                                                                                                                                                                                                                 | Acceptance                                                                                                                          |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| TT-HIDE-1 | Hide after `hideDelay` when the pointer leaves **both** target and container.                                                                                                                                                                                                               | leave both → hidden after hideDelay.                                                                                                |
| TT-HIDE-2 | Hide when the user clicks any other element.                                                                                                                                                                                                                                                | outside click → hidden.                                                                                                             |
| TT-HIDE-3 | Hide after `hideDelay` when keyboard focus moves away from the target.                                                                                                                                                                                                                      | `blur` → hidden after delay.                                                                                                        |
| TT-HIDE-4 | `Esc` dismisses the tooltip. If a tooltip was open, the handler MUST consume the event (stopPropagation) so the host's own `Esc` (e.g. dialog close) does **not** also fire on that press; a second `Esc` then reaches the host. If no tooltip was open, `Esc` MUST pass through untouched. | tooltip open + `Esc` → tooltip closes, dialog stays open; `Esc` again → dialog closes. tooltip closed + `Esc` → event not consumed. |
| TT-HIDE-5 | When the element's own action is triggered while the tooltip is open (e.g. `Enter` activating a button), the tooltip MUST dismiss **immediately**.                                                                                                                                          | open + action → hidden with no delay.                                                                                               |
| TT-HIDE-6 | On window blur / `visibilitychange` to hidden, dismiss. On return, MUST NOT auto-restore even if focus is unchanged — re-show only on a new interaction.                                                                                                                                    | window blur → hidden; refocus window → still hidden.                                                                                |

### 4.4 Sequence (single-tooltip invariant)

| ID       | Requirement                                                                                                                                                                                                              | Acceptance                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| TT-SEQ-1 | If a tooltip is open and the user moves (hover or focus) to another tooltip-bearing element, the previous tooltip MUST close **immediately** and the next one MUST open after `sequenceDelay` (200 ms), not `showDelay`. | A open → move to B → A hidden at once; B shown after 200ms. |
| TT-SEQ-2 | **At most one tooltip visible at any time**, regardless of delays. This MUST be enforced by a single coordinator (root service / overlay owner), not by independent directive instances.                                 | never two containers in the DOM simultaneously.             |

## 5. Placement & alignment

| ID       | Requirement                                                                                                                                         | Acceptance                                               |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| TT-POS-1 | Supported placements: `top`, `bottom`, `left`, `right`. Default **`top`**.                                                                          | default renders above the target.                        |
| TT-POS-2 | The tooltip MUST auto-reposition (flip) to the opposite available side when it would overflow the viewport.                                         | target at top edge, placement `top` → flips to `bottom`. |
| TT-POS-3 | Alignment along the chosen side: `start`, `middle`, `end`. Default `middle`.                                                                        | —                                                        |
| TT-POS-4 | For vertically-stacked/vertical-layout targets, `left`/`right` SHOULD be preferred (caller-chosen; directive just honors the input).                | —                                                        |
| TT-POS-5 | Arrow always points at the target (inherited from Popover). Known SAPUI5 arrow-positioning limitation is accepted; do not build a new arrow system. | —                                                        |

## 6. Responsiveness

| ID        | Requirement                                                                                                                                                         | Acceptance                                   |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| TT-RESP-1 | Text wraps **only** when it reaches the container's max width; size units MUST be `rem` so the tooltip scales with browser zoom (e.g. 200%).                        | sizes defined in rem, not px.                |
| TT-RESP-2 | Show/dismiss animation MUST reuse the Popover animation set.                                                                                                        | —                                            |
| TT-RESP-3 | On viewport resize, if truncated text becomes fully visible, the element MUST be removed from the extended tab order and the tooltip MUST NOT show on hover.        | Resize → text fits → no tooltip.             |
| TT-RESP-4 | On viewport resize, if non-truncated text becomes truncated, the element MUST be added to the extended tab order (when mode active) and tooltip MUST show on hover. | Resize → text truncated → tooltip available. |

## 7. Accessibility (normative)

### 7.1 Keyboard

| ID          | Keys                  | Behavior                                                                                                                                                                                                            | Notes                                                                                      |
| ----------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| A11Y-KEY-1  | `Tab` / `Shift`+`Tab` | Entering a tooltip-bearing element shows its tooltip after `showDelay`; if a tooltip was already open on the previous element, the new one shows **immediately** (per TT-SEQ-1). Leaving dismisses **immediately**. |                                                                                            |
| A11Y-KEY-2  | `Esc`                 | Dismiss (see TT-HIDE-4).                                                                                                                                                                                            |                                                                                            |
| A11Y-SHOW-2 | `Ctrl`+`Alt`+`I`      | Toggle: show if hidden, hide if visible, **no delay**. Requires target to be focused.                                                                                                                               | Marked **"Future Update"** in source — implement behind a flag or document as provisional. |
| A11Y-KEY-4  | `Shift`+`Alt`+`F6`    | Toggle Extended Keyboard Navigation mode.                                                                                                                                                                           | **Phase 2** — see TOOLTIP_FOUNDATION_CONCEPT.md; not required for base directive.          |

### 7.2 ARIA

| ID          | Requirement                                                                                                                                                                                                            | Acceptance                                                         |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| A11Y-ARIA-1 | The container host MUST have `role="tooltip"` and a generated unique `id`.                                                                                                                                             | —                                                                  |
| A11Y-ARIA-2 | **Duplicate-announcement guard:** set `aria-describedby="<id>"` on the **target** only when the tooltip text **differs** from the target's accessible name/label. If identical, MUST NOT set `aria-describedby`.       | text == label → no `aria-describedby`; text != label → present.    |
| A11Y-ARIA-3 | The invisible SR text (the `role="tooltip"` content) MUST contain the tooltip text **without** the keyboard-shortcut portion. The shortcut MUST be exposed via `aria-keyshortcuts` on the target (e.g. `"Control+S"`). | shortcut not in container text; `aria-keyshortcuts` set on target. |
| A11Y-ARIA-4 | When `aria-describedby` is kept on a title/element, the accessible name is announced first, then the tooltip.                                                                                                          | —                                                                  |

### 7.3 Annotation reference cases (turn each into a test asserting the resulting attributes)

- **Icon button** (icon + shortcut): `aria-label="Save"`, `aria-keyshortcuts="Control+S"`,
  `aria-describedby="<tooltip-id>"`. SR output ≈ _"Save - Button - Control+S"_.
- **Text button** where label == tooltip text: visual tooltip MAY show, but
  `aria-describedby` MUST exclude the duplicated label text (A11Y-ARIA-2).
- **Column header** (truncated): `aria-describedby="<tooltip-id>"` holding the full
  untruncated text; element keeps `role="columnheader"` and its `aria-colindex`.
- **Title**: if tooltip text == title → remove `aria-describedby`; if it differs → keep it
  (title read first, then tooltip).

## 7.4 Touch (SHOULD for base directive; verify on a touch target)

| ID      | Requirement                                                                                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TOUCH-1 | Long-press on the target shows the tooltip **immediately** (no delay). Tapping outside dismisses it.                                                             |
| TOUCH-2 | On a link whose navigation target opens a new page, the tooltip MUST be **disabled on touch** to preserve the native context menu.                               |
| TOUCH-3 | A custom context menu, if present, is shown together with the tooltip on the **same side**. Double/triple-tap text selection MUST NOT be blocked by the tooltip. |
| TOUCH-4 | With a hardware keyboard attached to a touch device, keyboard focus + shortcut behavior MUST match desktop.                                                      |

---

# 8. Design Context (non-normative)

> Background for designers and consumers. Do **not** implement directive logic from this
> section — it explains intent and usage, and some of it (content authoring, when-to-use)
> is the **caller's** responsibility, not the directive's.

## 8.1 Introduction

A tooltip is a non-disruptive text popup that provides a description for the component it is
assigned to. It is the SAP replacement for the native browser tooltip.

## 8.2 When to use

- Interactive components without a label (icon buttons, avatars).
- Supplementary, non-critical descriptions (e.g. icon buttons with badges) — the user can
  still complete the task without this info.
- Showing a keyboard shortcut for an action.
- Showing truncated text on a component **only** when other patterns (wrapping,
  responsiveness) cannot be applied — a rare exception; prefer showing text initially.

## 8.3 When not to use

- To label an element → use a label.
- For large/rich/interactive/formatted content → use a Popover.
- For information essential to completing the task → never hide critical info in a tooltip.
- For long truncated text → use a wrapping/truncation pattern instead.
- For in-app help / context help / guided tours → use SAP Companion.

## 8.4 Best practices

- Use tooltips on **interactive** elements. Exceptions: titles, non-interactive avatars
  without labels, and semantic icons (e.g. a truncated Title in a toolbar/dialog header with
  limited vertical space). For such non-interactive cases, keyboard users need Extended
  Keyboard Navigation to reach and trigger the tooltip. Prefer wrapping/shorter text first.
- If an interactive element supports wrapping, prefer wrapping over truncation + tooltip.
- Do **not** use tooltips for truncated labels on actionable controls (menu/text buttons) —
  actions must be understandable without hover/focus.
- For a busy element needing explanation, attach the tooltip to the interactive element, not
  the busy icon.
- Tooltips aren't available on disabled elements (not focusable) unless the element stays
  focusable; otherwise convey important info via inline helper text or an info button.
- Keep tooltips supplementary and precise; do not put general help text in them (use SAP
  Companion).
- Never use the native `title` tooltip (poor keyboard/touch/zoom/SR behavior).
- For rich/interactive/formatted content, use a Popover.
- On a link opening a new page, applying a tooltip disables it on touch (see TOUCH-2).

## 8.5 Content (caller's responsibility)

**Content types:** label text (for unlabeled components), truncated text (shown only when
actually truncated, to avoid duplicate content), supplementary description, keyboard
shortcut.

**Combination order** when multiple types appear: Label/Truncated text → Supplementary
description → Keyboard shortcut.

**Separators:** general content joined by `-` (hyphen with leading+trailing space);
keyboard shortcut in parentheses with a leading space: `content (shortcut)`.

**Length:** keep concise — a word, phrase, or single sentence, even when combining types.
Longer content → use a message strip or popover.

> Implementation note: the directive receives the **already-assembled** string. Ordering and
> separators above are applied by the consumer, not the directive (see TT-SCOPE-4).

## 8.6 Custom display pattern for truncation

When text is truncated and no alternative exists, use a tooltip to show the full text. Only
use this if wrapping and other truncation patterns can't work. Known applications: truncated
card title, dialog header title (static and movable/resizable; also the resize handle),
toolbar title, and table column header.

## 8.7 Extended Keyboard Navigation (summary)

An optional global mode (`Shift`+`Alt`+`F6`) that adds normally-unfocusable truncated/
supplementary elements to the tab order so keyboard users can focus them and trigger their
tooltips. Not recommended with a screen reader. Full behavior and control-by-control
expectations are in `TOOLTIP_FOUNDATION_CONCEPT.md`. **This is Phase 2** and is not required
for the base directive (A11Y-KEY-4).

---
