# Restore Shared Popover Inputs for InlineHelp

**Date:** 2026-03-29
**Status:** Draft
**Task:** TASK-001

## Problem

PR #13886 migrated popover and menu to Angular signals, dropping `BasePopoverClass` inheritance from InlineHelp, Menu, and ProductSwitch. This removed inputs that stakeholders relied on. PRs #13973 and #13976 partially restored inputs by adding them individually, but InlineHelp is still missing several popover configuration inputs.

`BasePopoverClass` is deprecated (composition over inheritance). The fix is not to re-adopt it, but to:

1. Add the missing inputs back to InlineHelp as signal inputs.
2. Create a shared `buildPopoverConfig()` utility so popover-consuming components don't each hand-roll their config computed.

## Scope

- **In scope:** InlineHelpDirective only + shared config builder utility.
- **Out of scope:** Menu, ProductSwitch, other components. ProductSwitch `isOpenChange` duplicate emission TODO (separate task).

## Design

### 1. Shared Config Builder Utility

**New file:** `libs/core/popover/utils/build-popover-config.ts`

A `PopoverConfigSignals` interface maps each `PopoverConfig` property to a signal accessor (`() => T`). All properties are optional — components only provide the signals they declare.

`buildPopoverConfig(signals)` returns a `computed<PopoverConfig>` that reads all provided signal accessors and assembles a config object. Missing signals fall back to `PopoverConfig` defaults.

```typescript
import { computed, Signal } from '@angular/core';
import { PopoverConfig } from '../base/popover-config.interface';

/**
 * Signal accessor shape for each PopoverConfig property.
 * Components pass their input signals (or inline lambdas for fixed values).
 */
export interface PopoverConfigSignals {
    [K in keyof PopoverConfig]?: () => PopoverConfig[K];
}

/**
 * Builds a computed PopoverConfig from individual signal accessors.
 * Centralizes the config assembly logic so popover-consuming components
 * don't duplicate it.
 */
export function buildPopoverConfig(signals: PopoverConfigSignals): Signal<PopoverConfig> {
    return computed(() => {
        const config: PopoverConfig = {};
        for (const key of Object.keys(signals) as (keyof PopoverConfig)[]) {
            const accessor = signals[key];
            if (accessor) {
                (config as any)[key] = accessor();
            }
        }
        return config;
    });
}
```

Exported from `libs/core/popover/index.ts`.

### 2. InlineHelp Input Changes

**Current inputs (8):** `inlineHelpContent`, `placement`, `triggers`, `closeOnOutsideClick`, `additionalBodyClass`, `disabled`, `bodyId`, `bodyRole`

**New inputs to add (7):**

| Input                 | Type                                            | Default | Rationale                |
| --------------------- | ----------------------------------------------- | ------- | ------------------------ |
| `noArrow`             | `input(false, { transform: booleanAttribute })` | `false` | Control arrow visibility |
| `closeOnEscapeKey`    | `input(false, { transform: booleanAttribute })` | `false` | Escape key behavior      |
| `closeOnNavigation`   | `input(true, { transform: booleanAttribute })`  | `true`  | Close on route change    |
| `restoreFocusOnClose` | `input(true, { transform: booleanAttribute })`  | `true`  | Accessibility            |
| `appendTo`            | `input<ElementRef \| Element \| null>(null)`    | `null`  | Portal rendering         |
| `fixedPosition`       | `input(false, { transform: booleanAttribute })` | `false` | Prevent repositioning    |
| `maxWidth`            | `input<number \| null>(null)`                   | `null`  | Constrain body width     |

**Excluded inputs** (not relevant for tooltip-like component): `focusTrapped`, `focusAutoCapture`, `fillControlMode`, `resizable`, `applyOverlay`, `scrollStrategy`, `cdkPositions`, `placementContainer`, `additionalBodyComponentClasses`, `additionalTriggerClass`, `disableScrollbar`, `isOpen`

### 3. InlineHelp Config Wiring

Replace the inline `computed()` with `buildPopoverConfig()`:

```typescript
readonly popoverConfig = buildPopoverConfig({
    placement: () => this.placement() ?? 'bottom',
    triggers: this.triggers,
    noArrow: this.noArrow,
    closeOnEscapeKey: this.closeOnEscapeKey,
    closeOnOutsideClick: this.closeOnOutsideClick,
    closeOnNavigation: this.closeOnNavigation,
    restoreFocusOnClose: this.restoreFocusOnClose,
    appendTo: this.appendTo,
    fixedPosition: this.fixedPosition,
    maxWidth: this.maxWidth,
    additionalBodyClass: this.combinedBodyClass,
    disabled: this.disabled,
    bodyRole: this.bodyRole,
    bodyId: this.bodyId,
});
```

The existing `combinedBodyClass` computed stays as-is (it merges internal inline-help classes with user-provided classes).

### 4. Tests

Update `inline-help.directive.spec.ts`:

- Test each new input propagates to `PopoverService.refreshConfiguration()`.
- Test default values for new inputs.
- Verify existing tests still pass (no regressions).

## File Changes Summary

| File                                                  | Action                                              |
| ----------------------------------------------------- | --------------------------------------------------- |
| `libs/core/popover/utils/build-popover-config.ts`     | **Create** — shared config builder                  |
| `libs/core/popover/index.ts`                          | **Edit** — add export                               |
| `libs/core/inline-help/inline-help.directive.ts`      | **Edit** — add 7 inputs, use `buildPopoverConfig()` |
| `libs/core/inline-help/inline-help.directive.spec.ts` | **Edit** — add tests for new inputs                 |

## Non-Goals

- Migrating Menu or ProductSwitch to `buildPopoverConfig()` (can be done later).
- Resolving ProductSwitch `isOpenChange` duplicate emission (separate task).
- Removing or modifying `BasePopoverClass` (it's already deprecated; removal is a future major version concern).
