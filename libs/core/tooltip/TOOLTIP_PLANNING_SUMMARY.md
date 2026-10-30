# Tooltip Foundation — Planning Summary

**Date:** 2026-10-29  
**Feature:** Unified Tooltip Foundation + Extended Keyboard Navigation  
**Scope:** `@fundamental-ngx/core/tooltip`

---

## Executive Summary

This initiative delivers a **unified tooltip foundation** as an Angular directive that provides consistent supplemental information display across all components in the library. It replaces inconsistent tooltip implementations and adds **Extended Keyboard Navigation** mode to ensure keyboard users can access tooltip content.

### Key Deliverables

1. **Base Tooltip Directive** (`[fdTooltip]`) — A standalone directive consumers add to any element
2. **Extended Keyboard Navigation Mode** — Global keyboard mode (`Shift+Alt+F6`) that makes truncated/supplementary content accessible via keyboard
3. **Component Integration** — Rollout to affected components based on priority

### Business Value

- **Accessibility Compliance:** Ensures keyboard-only users can access tooltip content (WCAG AA)
- **Consistency:** Single implementation eliminates component-to-component variations
- **Developer Experience:** Drop-in directive requires no DOM restructuring
- **User Experience:** Hover-able tooltips with selectable text, proper timing, and mobile support

---

## Scope & Constraints

### In Scope

✅ Text-only tooltips (no rich/interactive content)  
✅ Mouse hover, keyboard focus, touch long-press triggers  
✅ Keyboard shortcuts (`Ctrl+Alt+I`, `Esc`)  
✅ Auto-positioning with viewport flipping  
✅ Truncation detection and responsive behavior  
✅ Screen reader compatibility with duplicate-announcement guard  
✅ Extended Keyboard Navigation mode (Phase 2)  
✅ Component integration rollout

### Out of Scope

❌ Rich/formatted/interactive content (use Popover instead)  
❌ Native browser `title` attribute replacement (explicitly avoided)  
❌ Breaking changes to existing component APIs  
❌ Components without user-facing tooltip needs

---

## Architecture

### Component Structure

```
@fundamental-ngx/core/tooltip
├── [fdTooltip] directive          # Main consumer API
├── TooltipService                 # Per-trigger orchestration
├── TooltipContainerComponent      # Floating overlay (role="tooltip")
├── ExtendedKeyboardNavService     # Global mode state + toast
├── ExtendedKeyboardNavDirective   # Opt-in focus management (Phase 2)
└── TOOLTIP_CONFIG token           # Global timing/placement defaults
```

### Key Design Decisions

| Decision                     | Rationale                                                                |
| ---------------------------- | ------------------------------------------------------------------------ |
| **Directive, not component** | Additive integration — consumers add one attribute, no DOM restructuring |
| **Reuse Popover overlay**    | Leverage existing positioning/flipping/arrow system, avoid duplication   |
| **Single-tooltip invariant** | Coordinator service ensures only one tooltip visible at once             |
| **Signal-based state**       | Use `signal()`, `computed()`, `host: {}` bindings (Angular 22+ pattern)  |
| **Two-phase delivery**       | Ship base directive first, Extended Keyboard Nav as follow-up            |

### Integration Pattern

**Before:**

```html
<button fd-button>Save</button>
```

**After:**

```html
<button fd-button fdTooltip="Save (Ctrl+S)">Save</button>
```

No breaking changes — components that don't opt in render identically.

---

## Affected Components & Priorities

### Phase 1: Foundation (Base Tooltip Directive)

**Timeline:** Sprint 1-2

| Component             | Reason                      | Complexity |
| --------------------- | --------------------------- | ---------- |
| **Tooltip Directive** | Core implementation         | HIGH       |
| **Tooltip Service**   | Orchestration + coordinator | MEDIUM     |
| **Tooltip Container** | Overlay rendering           | LOW        |
| **Config Token**      | Global defaults             | LOW        |

### Phase 2: Extended Keyboard Navigation

**Timeline:** Sprint 3

| Component                        | Reason                                 | Complexity |
| -------------------------------- | -------------------------------------- | ---------- |
| **ExtendedKeyboardNavService**   | Global mode state, toast               | MEDIUM     |
| **ExtendedKeyboardNavDirective** | Truncation detection, focus management | HIGH       |
| **ResizeObserver integration**   | Dynamic tab order updates              | MEDIUM     |

### Phase 3: Component Rollout (Priority Order)

**Timeline:** Sprint 4-6

#### **P1: High-Priority Components** (Sprint 4)

Components with existing tooltip needs or frequent truncation:

- **Button** (icon buttons without labels)
- **Table** (column headers with truncation)
- **Input** (clear icon, value help icon, date picker icon)
- **Step Input** (increment/decrement icons)
- **Avatar** (non-interactive avatars without labels)
- **Combobox / Multi-Combobox / Select** (dropdown arrow)

#### **P2: Medium-Priority Components** (Sprint 5)

Components where tooltips add value but are less critical:

- **Title** (truncated titles in dialogs/toolbars)
- **Toolbar** (icon buttons, truncated titles)
- **Card** (truncated card titles)
- **List** (items with supplementary icons)
- **Breadcrumb** (truncated items)
- **Object Status** (icons with semantic meaning)

#### **P3: Lower-Priority Components** (Sprint 6)

Components with occasional tooltip use cases:

- **Link** (truncated links)
- **Badge** (supplementary information)
- **Tag** (truncated tags)
- **Timeline** (event icons)
- **Tree** (node icons)

---

## Time Estimation

### Detailed Breakdown

| Phase       | Task                            | Estimate       | Dependencies    |
| ----------- | ------------------------------- | -------------- | --------------- |
| **Phase 1** | **Base Tooltip**                | **10-15 days** |                 |
|             | Directive API design            | 1 day          | —               |
|             | Service + coordinator           | 2 days         | —               |
|             | Container component             | 1 day          | Popover overlay |
|             | Timing logic (delays, sequence) | 2 days         | —               |
|             | Keyboard interaction            | 1 day          | —               |
|             | Accessibility (ARIA)            | 2 days         | —               |
|             | Touch support                   | 1 day          | —               |
|             | Unit tests                      | 2-3 days       | All above       |
|             | Documentation                   | 1 day          | —               |
| **Phase 2** | **Extended Keyboard Nav**       | **5-10 days**  | Phase 1         |
|             | Global service + toast          | 1 day          | Phase 1         |
|             | Directive + focus management    | 2 days         | Phase 1         |
|             | Truncation detection            | 2 days         | ResizeObserver  |
|             | Unit tests                      | 2-3 days       | All above       |
|             | Documentation                   | 1 day          | —               |
| **Phase 3** | **Component Rollout**           | **15-20 days** | Phase 1 + 2     |
|             | P1 components (6 components)    | 6-8 days       | Phase 1         |
|             | P2 components (6 components)    | 5-7 days       | Phase 2         |
|             | P3 components (5 components)    | 4-5 days       | Phase 2         |
|             | Integration tests               | 2-3 days       | All above       |
|             | Docs app examples               | 2 days         | All above       |

### **Total Estimate: 30-45 days (6-9 weeks)**

**Conservative estimate:** 9 weeks (including buffer for unknowns)  
**Optimistic estimate:** 6 weeks (if no blockers)

---

## Risks & Mitigation

| Risk                             | Impact | Mitigation                                                         |
| -------------------------------- | ------ | ------------------------------------------------------------------ |
| **Popover overlay coupling**     | Medium | Abstract shared positioning logic into reusable helper             |
| **ResizeObserver performance**   | Low    | Debounce observations, unobserve when mode inactive                |
| **Screen reader compatibility**  | Medium | Extensive SR testing (NVDA, JAWS, VoiceOver), document limitations |
| **Component integration breaks** | High   | Enforce "additive only" rule, test each integration in isolation   |
| **Timing edge cases**            | Medium | Comprehensive fake-timer tests, coordinator state machine          |
| **Touch device behavior**        | Low    | Test on physical devices (iOS, Android), fallback to hover         |

---

## Success Criteria

### Functional Requirements

- [ ] Tooltip shows after 500ms on hover/focus, hides after 500ms on leave
- [ ] Second tooltip shows after 200ms when one is already open
- [ ] Only one tooltip visible at any time (enforced by coordinator)
- [ ] `Esc` dismisses tooltip first, dialog second (two-press behavior)
- [ ] Hover-able tooltip with selectable text
- [ ] `aria-describedby` guard prevents duplicate announcements
- [ ] Extended Keyboard Nav mode toggles with `Shift+Alt+F6` + toast
- [ ] Truncation detection adds/removes elements from tab order dynamically
- [ ] All P1 components integrated without breaking changes

### Non-Functional Requirements

- [ ] Zero breaking changes to existing component APIs
- [ ] All tests pass (`nx run core:test`)
- [ ] Linting passes (`nx run core:lint`)
- [ ] Documentation complete with usage examples
- [ ] Accessibility audit passes (WCAG AA)
- [ ] Performance: no layout thrashing from ResizeObserver

---

## Dependencies

### Technical Dependencies

- **Angular 22+** — Signal-based APIs (`input()`, `output()`, `computed()`)
- **Angular CDK Overlay** — Positioning strategy
- **@fundamental-ngx/core/popover** — Overlay infrastructure
- **@fundamental-ngx/cdk/utils** — KeyUtil, ResizeObserver utilities
- **@fundamental-ngx/i18n** — Toast messages for mode activation
- **fundamental-styles** — Tooltip BEM classes

### Team Dependencies

- **Design Team** — Final Figma spec sign-off (completed)
- **Accessibility Team** — SR testing and WCAG validation
- **Documentation Team** — Docs app example creation
- **QA Team** — Cross-browser and cross-device testing

---

## Open Questions

1. **Should Extended Keyboard Navigation mode be enabled by default in apps?**  
   → Recommendation: **No**, opt-in via settings or keyboard shortcut only

2. **Should we expose a programmatic API to show/hide tooltips imperatively?**  
   → Recommendation: **Yes**, via `exportAs: 'fdTooltip'` for edge cases

3. **Should tooltips be disabled on all disabled elements, or allow opt-in?**  
   → Recommendation: **Disabled elements = no tooltips** (per spec, not focusable)

4. **Should we support custom tooltip animations?**  
   → Recommendation: **No**, reuse Popover animations for consistency

5. **Should P3 component integration happen in this initiative or defer to later?**  
   → Decision needed from Product Owner

---
