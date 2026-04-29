---
paths: ['libs/**/*.ts', 'libs/**/*.scss', 'libs/**/*.html']
alwaysApply: false
---

# Fundamental-Styles MCP Tools

Use the `fundamental-styles` MCP server instead of grepping `node_modules/` for CSS class names, HTML examples, or design tokens.

## Tool Decision Table

| Task                                                            | MCP Tool                                                                           |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Building CSS class list for `computed()` host binding           | `get_css_classes` — returns full BEM hierarchy: block, elements, modifiers, states |
| Finding correct modifier/state class for a component            | `get_css_classes` — shows all `--modifier` and `is-*` state classes                |
| Creating or updating an HTML template                           | `get_component_html` — working examples from 484 story files                       |
| Adding ARIA attributes or keyboard interactions                 | `get_accessibility_guide` — ARIA roles, keyboard nav per component                 |
| Looking up a CSS custom property (theming)                      | `get_design_tokens` — searches 1500+ `--sap*` variables                            |
| Choosing which CSS component to wrap                            | `recommend_components` then `get_css_classes`                                      |
| Understanding component composition (e.g. dialog = bar + title) | `get_component_relationships` — dependencies, composition, alternatives            |
| Adding utility classes (spacing, flex, typography)              | `get_utility_classes`                                                              |
| Checking for breaking CSS changes after upgrade                 | `get_migration_guide`                                                              |
| Browsing all available components                               | `list_components` or `search_components`                                           |
| Checking available SAP themes                                   | `get_theme_info`                                                                   |

## Workflow: Building a CSS Class Computed Signal

1. Call `get_css_classes` with the fundamental-styles component name (e.g. `button`, `avatar`, `dialog`)
2. Map each modifier to a component `input()` signal
3. Map each state class (`is-disabled`, `is-selected`) to component state
4. Build the `computed()` using exact class names from the MCP response

```typescript
protected readonly _cssClass = computed(() => {
    const classes = ['fd-example'];
    if (this.compact()) classes.push('fd-example--compact');
    if (this.disabled()) classes.push('is-disabled');
    return classes.join(' ');
});
```

## Anti-Pattern

**DO NOT** grep through `node_modules/fundamental-styles/` for CSS classes. The MCP server provides structured, complete data including modifiers, states, and accessibility info that grep will miss.

## Deep Reference

See `docs/agents/fundamental-styles.md` for BEM naming conventions, design token patterns, and SCSS import guidelines.
