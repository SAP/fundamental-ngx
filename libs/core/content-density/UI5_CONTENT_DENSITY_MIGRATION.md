# UI5 Web Components Content Density Integration

## Overview

This document outlines the migration to extend fundamental-ngx's content density system to also work with UI5 Web Components Angular wrappers.

### Background

- **fundamental-ngx** (native Angular components) has a comprehensive content density system in `libs/core/content-density`
- **UI5 Web Components** support compact mode via `data-ui5-compact-size` attribute or `ui5-content-density-compact` class
- **Angular wrappers** for UI5 Web Components are generated in `libs/ui5-webcomponents`, `libs/ui5-webcomponents-ai`, `libs/ui5-webcomponents-fiori`

### Goal

Enable the same content density switching experience for UI5 Web Component wrappers as exists for native fundamental-ngx components.

---

## Current State (What's Been Implemented)

### 1. Extended `ContentDensityObserverSettings`

**File:** `libs/core/content-density/classes/content-density-observer.settings.ts`

Added `Ui5ContentDensityMarkers` interface:

```typescript
export interface Ui5ContentDensityMarkers {
    enabled: boolean; // default: true
}
```

### 2. Updated `ContentDensityObserver` Service

**File:** `libs/core/content-density/services/content-density-observer.service.ts`

- Added `_applyUi5Marker()` method
- Automatically applies `data-ui5-compact-size` attribute when density is COMPACT or CONDENSED
- Removes attribute when density is COZY
- Enabled by default for all components using `ContentDensityObserver`

### 3. Created `Ui5ContentDensityDirective`

**File:** `libs/core/content-density/directives/ui5-content-density.directive.ts`

A container directive that:

- Listens to `GlobalContentDensityService`
- Applies `data-ui5-compact-size` to its host element
- Allows UI5 components inside to inherit density via DOM tree lookup

```html
<div fdUi5ContentDensity>
    <ui5-button>Will respond to density changes</ui5-button>
</div>
```

### 4. Updated Documentation

**File:** `libs/docs/core/content-density/content-density-docs.component.html`

Added "UI5 Web Components Integration" section.

### 5. Applied to Docs Example Container

**File:** `libs/docs/shared/src/lib/core-helpers/component-example/component-example.component.ts`

Added `fdUi5ContentDensity` directive to the example container so UI5 examples respond to the toolbar density switcher.

---

## Density Mapping

| fundamental-ngx | UI5 Web Components | DOM Marker              |
| --------------- | ------------------ | ----------------------- |
| `COZY`          | Cozy (default)     | No attribute            |
| `COMPACT`       | Compact            | `data-ui5-compact-size` |
| `CONDENSED`     | Compact (fallback) | `data-ui5-compact-size` |

---

## Open Questions (Blocking Next Steps)

### Q1: Generator - `supportedContentDensity` Configuration

When adding `ContentDensityObserver` to generated UI5 wrappers, what should `supportedContentDensity` be?

| Option | Description                                                           |
| ------ | --------------------------------------------------------------------- |
| **A**  | `[COMPACT, COZY]` - since UI5 only has these two modes                |
| **B**  | `[COMPACT, COZY, CONDENSED]` - allow all three, let mapping handle it |
| **C**  | Read from CEM if available, fallback to default                       |

**Current Inclination:** Option A

---

### Q2: Body-level Attribute - Implementation

For automatic global support (no extra directives needed), how should we apply the attribute to `<body>`?

| Option | Description                                                             |
| ------ | ----------------------------------------------------------------------- |
| **A**  | In `provideContentDensity()` using `APP_INITIALIZER` + `DOCUMENT` token |
| **B**  | In `GlobalContentDensityService` constructor using `DOCUMENT` token     |
| **C**  | Other approach                                                          |

**Considerations:**

- Must be SSR-compatible
- Should react to density changes (not just initial value)

**Current Inclination:** Option A

---

### Q3: The `fdContentDensity` Directive

Currently `ContentDensityDirective` only provides a signal - it doesn't modify the DOM. For local overrides to work:

```html
<div fdContentDensity="compact">
    <ui5-button>Should be compact</ui5-button>
</div>
```

Should we modify `ContentDensityDirective` to also apply `data-ui5-compact-size` to its host element?

| Option | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| **A**  | Yes - the directive should apply the attribute (unified approach) |
| **B**  | No - create a separate mechanism                                  |

**Current Inclination:** Option A (pending team discussion)

---

### Q4: Timing for Generator Changes

The generator changes will affect all 3 libraries. Should this be:

| Option | Description                                          |
| ------ | ---------------------------------------------------- |
| **A**  | Done now as part of this PR                          |
| **B**  | Done in a follow-up PR after core changes are merged |

---

## Next Steps

### Phase 1: Core Content Density Changes (Current PR)

- [x] Add `Ui5ContentDensityMarkers` to settings
- [x] Update `ContentDensityObserver` to apply UI5 attribute
- [x] Create `Ui5ContentDensityDirective` for containers
- [x] Add tests
- [x] Update documentation
- [ ] **Resolve Q2:** Implement body-level attribute in `provideContentDensity()`
- [ ] **Resolve Q3:** Update `ContentDensityDirective` to apply UI5 attribute

### Phase 2: Generator Changes (Follow-up PR or Same PR)

- [ ] **Resolve Q1:** Determine `supportedContentDensity` config
- [ ] Modify `libs/webc-generator/src/executors/generate/executor.ts`
- [ ] Update component template to include `ContentDensityObserver`
- [ ] Regenerate all UI5 wrappers
- [ ] Test with actual UI5 components

---

## Files Changed

### New Files

- `libs/core/content-density/directives/ui5-content-density.directive.ts`
- `libs/core/content-density/directives/ui5-content-density.directive.spec.ts`

### Modified Files

- `libs/core/content-density/classes/content-density-observer.settings.ts`
- `libs/core/content-density/variables/default-content-density-consumer-config.ts`
- `libs/core/content-density/services/content-density-observer.service.ts`
- `libs/core/content-density/services/content-density-observer.service.spec.ts`
- `libs/core/content-density/index.ts`
- `libs/docs/core/content-density/content-density-docs.component.html`
- `libs/docs/shared/src/lib/core-helpers/component-example/component-example.component.ts`

---

## Usage Examples (Target State)

### Application Setup (No Extra Config)

```typescript
// app.config.ts
import { provideContentDensity } from '@fundamental-ngx/core/content-density';

export const appConfig = {
    providers: [
        provideContentDensity() // Works for both fundamental-ngx and UI5 wrappers
    ]
};
```

### Mixed Components (Both Work Automatically)

```html
<!-- No extra directives needed -->
<fd-button>Fundamental Button</fd-button>
<ui5-button>UI5 Button</ui5-button>
```

### Local Override

```html
<div fdContentDensity="compact">
    <!-- Both compact regardless of global setting -->
    <fd-button>Compact FD Button</fd-button>
    <ui5-button>Compact UI5 Button</ui5-button>
</div>
```

### Programmatic Switching

```typescript
import { GlobalContentDensityService, ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({...})
class MyComponent {
  private densityService = inject(GlobalContentDensityService);

  setCompact() {
    this.densityService.updateContentDensity(ContentDensityMode.COMPACT);
  }
}
```

---

## References

- [UI5 Web Components Compact Mode Documentation](https://sap.github.io/ui5-webcomponents/docs/advanced/configuration/#compact-mode)
- Generator: `libs/webc-generator/src/executors/generate/executor.ts`
- Content Density Module: `libs/core/content-density/`
