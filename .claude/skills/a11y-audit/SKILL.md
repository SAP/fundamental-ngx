---
name: a11y-audit
description: Audit a component for WCAG AA accessibility compliance
argument-hint: [component-path-or-folder]
disable-model-invocation: true
context: fork
agent: general-purpose
---

# Accessibility Audit: $ARGUMENTS

Audit the component(s) at `$ARGUMENTS` for WCAG AA compliance. Check both the component implementation and its documentation examples.

## Checklist

### 1. Semantic HTML

- [ ] Interactive elements use native HTML (`<button>`, `<a>`, `<input>`) — not `<div>` or `<span>` with click handlers
- [ ] Lists use `<ul>`/`<ol>`/`<li>` — not divs with list styling
- [ ] Headings use `<h1>`-`<h6>` with correct hierarchy
- [ ] Tables use `<table>`, `<thead>`, `<tbody>`, `<th>` with scope

### 2. ARIA Attributes

- [ ] Custom interactive components have appropriate `role` attribute
- [ ] `aria-label` or `aria-labelledby` on elements without visible text
- [ ] `aria-expanded` on expandable triggers (menus, dropdowns, accordions)
- [ ] `aria-selected` on selectable items (tabs, list items)
- [ ] `aria-disabled` synced with `disabled` input
- [ ] `aria-haspopup` on elements that open popups/menus
- [ ] `aria-live` regions for dynamic content updates
- [ ] No redundant ARIA (e.g. `role="button"` on `<button>`)

### 3. Keyboard Navigation

- [ ] All interactive elements reachable via Tab
- [ ] Tab order follows visual/logical order
- [ ] Arrow keys for navigation within composite widgets (menus, tabs, grids)
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals, popups, and dropdowns
- [ ] Focus trapped inside modals/dialogs when open
- [ ] Focus returns to trigger element when popup/modal closes
- [ ] No keyboard traps (user can always Tab out)

### 4. Focus Management

- [ ] Focus indicator visible on all interactive elements (`:focus-visible` styles)
- [ ] Focus moves to new content when dynamically added (e.g. dialog opens)
- [ ] `tabindex="0"` only on elements that need to be in tab order
- [ ] `tabindex="-1"` for programmatically focusable elements not in tab order
- [ ] No positive `tabindex` values (breaks natural tab order)

### 5. Color and Contrast

- [ ] Text meets 4.5:1 contrast ratio (normal text) or 3:1 (large text)
- [ ] Information not conveyed by color alone (icons, patterns, or text as backup)
- [ ] Focus indicators meet 3:1 contrast ratio
- [ ] Disabled states still readable (though not required to meet full contrast)

### 6. Screen Reader Compatibility

- [ ] Meaningful `alt` text on images (or `alt=""` for decorative)
- [ ] Form inputs have associated `<label>` or `aria-label`
- [ ] Error messages associated via `aria-describedby`
- [ ] Status changes announced via `aria-live` or role="status"
- [ ] Hidden decorative elements have `aria-hidden="true"`

### 7. Documentation Examples

- [ ] Examples are keyboard-navigable when rendered
- [ ] Examples include `tabindex` where needed for non-native interactive elements
- [ ] Examples demonstrate accessible usage patterns

## Output

```
## A11y Audit: [component name]

**Compliance:** PASS / PARTIAL / FAIL

### Critical (WCAG A — must fix)
- [file:line] Issue description — WCAG criterion

### Major (WCAG AA — should fix)
- [file:line] Issue description — WCAG criterion

### Minor (best practice)
- [file:line] Issue description

### Recommendations
- Suggested improvements for better accessibility
```
