# Fundamental-Styles CSS Integration

> This document covers how Angular components in Fundamental NGX integrate with the fundamental-styles CSS library — naming conventions, class building patterns, design tokens, and accessibility.

## Table of Contents

- [Architecture](#architecture)
- [BEM Naming Convention](#bem-naming-convention)
- [SCSS Import Pattern](#scss-import-pattern)
- [CSS Class Building](#css-class-building)
- [Design Tokens](#design-tokens)
- [Accessibility](#accessibility)
- [Common Pitfalls](#common-pitfalls)
- [MCP Tools (Claude Code)](#mcp-tools-claude-code)

---

## Architecture

[fundamental-styles](https://github.com/SAP/fundamental-styles) is a standalone, framework-agnostic CSS library implementing the SAP Fiori design system. Each Angular component in Fundamental NGX wraps one or more fundamental-styles CSS components.

The relationship:

- **fundamental-styles** provides CSS classes, design tokens, and accessibility patterns
- **@sap-theming/theming-base-content** provides theme CSS variables and fonts
- **Fundamental NGX** provides Angular components that apply the correct CSS classes based on inputs

---

## BEM Naming Convention

fundamental-styles uses BEM (Block, Element, Modifier) naming:

| Type         | Pattern                      | Example                                      |
| ------------ | ---------------------------- | -------------------------------------------- |
| **Block**    | `fd-{component}`             | `fd-button`, `fd-avatar`, `fd-dialog`        |
| **Element**  | `fd-{component}__{element}`  | `fd-button__text`, `fd-dialog__body`         |
| **Modifier** | `fd-{component}--{modifier}` | `fd-button--emphasized`, `fd-avatar--circle` |
| **State**    | `is-{state}`                 | `is-disabled`, `is-active`, `is-selected`    |

Key rules:

- Block class is always present on the host element
- Modifiers are additive — they don't replace the block class
- State classes use the `is-` prefix and are shared across components
- Size variants: `--xs`, `--s`, `--m`, `--l`, `--xl`

---

## SCSS Import Pattern

Each component imports its CSS from fundamental-styles in its SCSS file:

```scss
// button.component.scss
@import 'fundamental-styles/dist/button.css';
```

For utility classes (used in doc examples and global styles):

```scss
@import '@fundamental-styles/common-css/dist/common-css.css';
```

Global styles in `apps/docs/src/styles.scss` import shared CSS:

```scss
@import 'fundamental-styles/dist/info-label.css';
@import 'fundamental-styles/dist/form-layout-grid.css';
@import '@fundamental-styles/common-css/dist/common-css.css';
```

---

## CSS Class Building

Components build CSS class strings via `computed()` signals bound to `host: { '[class]': }`:

```typescript
protected readonly _cssClass = computed(() => {
    const classes = ['fd-button'];
    const type = this.fdType();
    if (type) classes.push(`fd-button--${type}`);
    if (this.fdMenu()) classes.push('fd-button--menu');
    if (this._disabledState()) classes.push('is-disabled');
    if (this.toggled()) classes.push('fd-button--toggled');
    return classes.join(' ');
});
```

```typescript
host: {
    '[class]': '_cssClass()'
}
```

Pattern:

1. Start with the block class (`fd-button`)
2. Add modifiers based on component inputs (`fd-button--emphasized`)
3. Add state classes based on component state (`is-disabled`)
4. Return joined string

See `docs/agents/angular-patterns.md` for the general computed signal pattern and migration from `CssClassBuilder`.

---

## Design Tokens

SAP design tokens are CSS custom properties following the `--sap{Category}_{Property}` naming:

```css
--sapButton_Background
--sapButton_BorderColor
--sapContent_LabelColor
--sapField_Background
--sapShell_Background
```

Rules:

- Never hardcode colors — always use `--sap*` variables
- Theme files are loaded from `@sap-theming/theming-base-content`
- Available themes include `sap_horizon` (light), `sap_horizon_dark`, `sap_horizon_hcb` (high contrast black), `sap_horizon_hcw` (high contrast white)

---

## Accessibility

fundamental-styles defines ARIA patterns and keyboard interactions per component. Angular components must implement:

- Correct ARIA roles and attributes as specified by the CSS component
- Keyboard navigation (arrow keys, Enter, Escape, Tab)
- Focus management and visible focus indicators

Check the accessibility guide for each component before implementing or modifying ARIA attributes.

---

## Common Pitfalls

| Mistake                              | Correct                                                   |
| ------------------------------------ | --------------------------------------------------------- |
| `fd-button--disabled`                | `is-disabled` (state classes use `is-` prefix)            |
| Hardcoding `color: #0854a0`          | Use `var(--sapButton_TextColor)`                          |
| Missing element classes in templates | Check `get_component_html` for the full element structure |
| Guessing class names                 | Look them up — modifiers vary per component               |
| Importing all of fundamental-styles  | Import only the component CSS you need                    |

---

## MCP Tools (Claude Code)

The project has a configured `@fundamental-styles/mcp` server (`.claude/mcp.json`) that provides structured access to CSS component metadata. Available tools:

- `get_css_classes` — full BEM class hierarchy for a component
- `get_component_html` — working HTML examples
- `get_design_tokens` — search 1500+ CSS custom properties
- `get_accessibility_guide` — ARIA patterns and keyboard interactions
- `recommend_components` — match a UI description to components
- `get_component_relationships` — dependencies and composition
- `get_utility_classes` — spacing, flex, typography helpers
- `get_migration_guide` — breaking changes between versions
- `get_theme_info` — available SAP themes
- `list_components` / `search_components` — browse and search components

See `.claude/rules/fundamental-styles-mcp.md` for detailed usage guidance.
