# Restore InlineHelp Popover Inputs — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore missing popover inputs on InlineHelpDirective and introduce a shared `buildPopoverConfig()` utility so popover-consuming components don't each hand-roll config assembly.

**Architecture:** Create a `buildPopoverConfig()` function in `libs/core/popover/` that accepts an object of signal accessors and returns a `computed<PopoverConfig>`. Add 7 missing popover inputs to InlineHelpDirective. Wire them through `buildPopoverConfig()`. Test each new input.

**Tech Stack:** Angular 21+, signal inputs, computed signals, Jest

**Spec:** `docs/superpowers/specs/2026-03-29-inline-help-popover-inputs-design.md`

---

## File Map

| File                                                  | Action        | Responsibility                                                    |
| ----------------------------------------------------- | ------------- | ----------------------------------------------------------------- |
| `libs/core/popover/utils/build-popover-config.ts`     | Create        | `PopoverConfigSignals` interface + `buildPopoverConfig()` utility |
| `libs/core/popover/index.ts`                          | Edit (line 2) | Add export for new utility                                        |
| `libs/core/inline-help/inline-help.directive.ts`      | Edit          | Add 7 inputs, use `buildPopoverConfig()`                          |
| `libs/core/inline-help/inline-help.directive.spec.ts` | Edit          | Tests for new inputs                                              |

---

### Task 1: Create `buildPopoverConfig()` utility

**Files:**

- Create: `libs/core/popover/utils/build-popover-config.ts`
- Modify: `libs/core/popover/index.ts`

- [ ] **Step 1: Create the utility file**

````typescript
// libs/core/popover/utils/build-popover-config.ts
import { computed, Signal } from '@angular/core';
import { PopoverConfig } from '../base/popover-config.interface';

/**
 * Maps each PopoverConfig property to a signal accessor.
 * Components pass their input signals (or inline lambdas for fixed values).
 * All properties are optional — components only provide what they declare.
 */
export type PopoverConfigSignals = {
    [K in keyof PopoverConfig]?: () => PopoverConfig[K];
};

/**
 * Builds a computed PopoverConfig from individual signal accessors.
 * Reads all provided accessors reactively and assembles a config object.
 *
 * @example
 * ```typescript
 * readonly popoverConfig = buildPopoverConfig({
 *     placement: () => this.placement() ?? 'bottom',
 *     triggers: this.triggers,
 *     disabled: this.disabled,
 * });
 * ```
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
````

- [ ] **Step 2: Export from popover barrel**

Add this line to `libs/core/popover/index.ts` after line 2 (after the `popover-config.interface` export):

```typescript
export * from './utils/build-popover-config';
```

- [ ] **Step 3: Verify build compiles**

Run: `nx run core:build`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add libs/core/popover/utils/build-popover-config.ts libs/core/popover/index.ts
git commit -m "feat(core): add buildPopoverConfig utility for shared popover config assembly"
```

---

### Task 2: Add missing inputs to InlineHelpDirective

**Files:**

- Modify: `libs/core/inline-help/inline-help.directive.ts`

- [ ] **Step 1: Add imports for new types and the config builder**

Replace the existing imports in `libs/core/inline-help/inline-help.directive.ts`. The import block should become:

```typescript
import {
    booleanAttribute,
    computed,
    Directive,
    effect,
    ElementRef,
    EmbeddedViewRef,
    inject,
    input,
    Renderer2,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_ICON_COMPONENT } from '@fundamental-ngx/core/icon';
import { buildPopoverConfig, PopoverService, TriggerConfig } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';
```

Note: the only change is adding `buildPopoverConfig` to the popover import.

- [ ] **Step 2: Add the 7 new signal inputs**

Add these inputs after the existing `bodyRole` input (after line 72) and before the `combinedBodyClass` computed:

```typescript
    /** Whether the popover should have an arrow. */
    readonly noArrow = input(false, { transform: booleanAttribute });

    /** Whether the popover should close when the escape key is pressed. */
    readonly closeOnEscapeKey = input(false, { transform: booleanAttribute });

    /** Whether to close the popover on router navigation start. */
    readonly closeOnNavigation = input(true, { transform: booleanAttribute });

    /** Whether to restore focus to the previously focused element when the popover closes. */
    readonly restoreFocusOnClose = input(true, { transform: booleanAttribute });

    /** The element to which the overlay is attached. By default it is body. */
    readonly appendTo = input<Nullable<ElementRef | Element>>(null);

    /** Whether position should remain fixed when approaching page corners. */
    readonly fixedPosition = input(false, { transform: booleanAttribute });

    /** Maximum width of popover body in px. */
    readonly maxWidth = input<Nullable<number>>(null);
```

- [ ] **Step 3: Replace inline `popoverConfig` computed with `buildPopoverConfig()`**

Replace the existing `popoverConfig` computed (lines 84-95):

Old:

```typescript
    /** @hidden Popover configuration computed from all inputs. */
    readonly popoverConfig = computed(() => ({
        placement: this.placement() ?? 'bottom',
        triggers: this.triggers(),
        noArrow: false,
        closeOnEscapeKey: false,
        closeOnOutsideClick: this.closeOnOutsideClick(),
        additionalBodyClass: this.combinedBodyClass(),
        disabled: this.disabled(),
        bodyRole: this.bodyRole(),
        bodyId: this.bodyId()
    }));
```

New:

```typescript
    /** @hidden Popover configuration computed from all inputs. */
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
        bodyId: this.bodyId
    });
```

- [ ] **Step 4: Run format and lint**

```bash
yarn format
nx run core:lint
```

Expected: No errors.

- [ ] **Step 5: Verify existing tests pass**

Run: `nx run core:test --testfile=inline-help.directive.spec.ts`
Expected: All 5 existing tests pass.

- [ ] **Step 6: Commit**

```bash
git add libs/core/inline-help/inline-help.directive.ts
git commit -m "feat(core): restore missing popover inputs on InlineHelpDirective

Add noArrow, closeOnEscapeKey, closeOnNavigation, restoreFocusOnClose,
appendTo, fixedPosition, and maxWidth inputs. Wire all inputs through
the new buildPopoverConfig() utility."
```

---

### Task 3: Test new inputs on InlineHelpDirective

**Files:**

- Modify: `libs/core/inline-help/inline-help.directive.spec.ts`

- [ ] **Step 1: Update test component to expose the directive ref and add input bindings**

Replace the entire test file with:

```typescript
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverService } from '@fundamental-ngx/core/popover';
import { InlineHelpDirective } from './inline-help.directive';
import { InlineHelpModule } from './inline-help.module';

@Component({
    template: `
        @if (visible) {
            <div #directiveElement fd-inline-help="123"></div>
        }
    `,
    imports: [InlineHelpModule]
})
class InlineHelpDefaultTestComponent {
    @ViewChild('directiveElement', { static: false, read: ElementRef })
    ref: ElementRef<HTMLDivElement>;

    visible = true;
}

@Component({
    template: `
        <div
            #directiveElement
            fd-inline-help="Test content"
            [noArrow]="noArrow"
            [closeOnEscapeKey]="closeOnEscapeKey"
            [closeOnNavigation]="closeOnNavigation"
            [restoreFocusOnClose]="restoreFocusOnClose"
            [fixedPosition]="fixedPosition"
            [maxWidth]="maxWidth"
            [appendTo]="appendTo"
        ></div>
    `,
    imports: [InlineHelpModule]
})
class InlineHelpInputsTestComponent {
    @ViewChild('directiveElement', { static: false, read: ElementRef })
    ref: ElementRef<HTMLDivElement>;

    noArrow = false;
    closeOnEscapeKey = false;
    closeOnNavigation = true;
    restoreFocusOnClose = true;
    fixedPosition = false;
    maxWidth: number | null = null;
    appendTo: Element | null = null;
}

describe('InlineHelpDirective', () => {
    let component: InlineHelpDefaultTestComponent;
    let fixture: ComponentFixture<InlineHelpDefaultTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [InlineHelpDefaultTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineHelpDefaultTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the inline help on hover', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseleave'));
        tick(50);
        expect(document.body.querySelector(selector)).toBeFalsy();
    }));

    it('should hide the inline help if host element is destroyed', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.visible = false;
        fixture.detectChanges();
        tick(50);
        expect(document.body.querySelector(selector)).toBeFalsy();
    }));

    it('should show the inline help on focus', fakeAsync(() => {
        const selector = '.fd-popover__body.fd-inline-help__content';
        expect(document.body.querySelector(selector)).toBeFalsy();
        component.ref.nativeElement.dispatchEvent(new Event('focusin'));
        expect(document.body.querySelector(selector)).toBeTruthy();
        component.ref.nativeElement.dispatchEvent(new Event('focusout'));
        tick(50);
        expect(document.body.querySelector(selector)).toBeFalsy();
    }));

    it('should have correct trigger class applied', () => {
        expect(component.ref.nativeElement.classList.contains('fd-inline-help__trigger')).toBe(true);
    });

    it('should apply inline help content class to popover body', fakeAsync(() => {
        component.ref.nativeElement.dispatchEvent(new Event('mouseenter'));
        const popoverBody = document.body.querySelector('.fd-popover__body');
        expect(popoverBody?.classList.contains('fd-inline-help__content')).toBe(true);
        component.ref.nativeElement.dispatchEvent(new Event('mouseleave'));
        tick(50);
    }));
});

describe('InlineHelpDirective popover inputs', () => {
    let fixture: ComponentFixture<InlineHelpInputsTestComponent>;
    let component: InlineHelpInputsTestComponent;
    let popoverService: PopoverService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [InlineHelpInputsTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InlineHelpInputsTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const directiveDebugEl = fixture.debugElement.query(By.directive(InlineHelpDirective));
        popoverService = directiveDebugEl.injector.get(PopoverService);
    });

    it('should pass noArrow to popover service', () => {
        expect(popoverService.noArrow()).toBe(false);
        fixture.componentRef.setInput('noArrow', true);
        fixture.detectChanges();
        expect(popoverService.noArrow()).toBe(true);
    });

    it('should pass closeOnEscapeKey to popover service', () => {
        expect(popoverService.closeOnEscapeKey()).toBe(false);
        fixture.componentRef.setInput('closeOnEscapeKey', true);
        fixture.detectChanges();
        expect(popoverService.closeOnEscapeKey()).toBe(true);
    });

    it('should pass closeOnNavigation to popover service', () => {
        expect(popoverService.closeOnNavigation()).toBe(true);
        fixture.componentRef.setInput('closeOnNavigation', false);
        fixture.detectChanges();
        expect(popoverService.closeOnNavigation()).toBe(false);
    });

    it('should pass restoreFocusOnClose to popover service', () => {
        expect(popoverService.restoreFocusOnClose()).toBe(true);
        fixture.componentRef.setInput('restoreFocusOnClose', false);
        fixture.detectChanges();
        expect(popoverService.restoreFocusOnClose()).toBe(false);
    });

    it('should pass fixedPosition to popover service', () => {
        expect(popoverService.fixedPosition()).toBe(false);
        fixture.componentRef.setInput('fixedPosition', true);
        fixture.detectChanges();
        expect(popoverService.fixedPosition()).toBe(true);
    });

    it('should pass maxWidth to popover service', () => {
        expect(popoverService.maxWidth()).toBeNull();
        fixture.componentRef.setInput('maxWidth', 300);
        fixture.detectChanges();
        expect(popoverService.maxWidth()).toBe(300);
    });

    it('should pass appendTo to popover service', () => {
        expect(popoverService.appendTo()).toBeNull();
        const container = document.createElement('div');
        document.body.appendChild(container);
        fixture.componentRef.setInput('appendTo', container);
        fixture.detectChanges();
        expect(popoverService.appendTo()).toBe(container);
        document.body.removeChild(container);
    });
});
```

- [ ] **Step 2: Run tests**

Run: `nx run core:test --testfile=inline-help.directive.spec.ts`
Expected: All 12 tests pass (5 existing + 7 new).

- [ ] **Step 3: Run format**

```bash
yarn format
```

- [ ] **Step 4: Commit**

```bash
git add libs/core/inline-help/inline-help.directive.spec.ts
git commit -m "test(core): add tests for new InlineHelp popover inputs"
```

---

### Task 4: Final validation

- [ ] **Step 1: Run full inline-help tests**

Run: `nx run core:test --testfile=inline-help.directive.spec.ts`
Expected: All tests pass.

- [ ] **Step 2: Run lint for core**

Run: `nx run core:lint`
Expected: No lint errors.

- [ ] **Step 3: Run core build**

Run: `nx run core:build`
Expected: Build succeeds.

- [ ] **Step 4: Format check**

Run: `yarn format`
Expected: No formatting changes needed.
