import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { Directive, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { OverflowListDirective, OverflowListItemDirective } from '@fundamental-ngx/cdk/utils';
import { IconTabBarComponent } from '../../icon-tab-bar.component';
import { _generateTabBarItems, generateTestConfig } from '../../tests-helper';
import { IconTabBarProcessTypeComponent } from './icon-tab-bar-process-type.component';

const AMOUNT_OF_EXTRA_TABS = 80;

/**
 * Mock OverflowListDirective that doesn't automatically trigger overflow calculations.
 * This allows tests to control when overflow events are emitted.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdkOverflowList]'
})
class MockOverflowListDirective {
    @Input() overflowOffset = 0;
    @Input() isRtl = false;
    @Input() itemCssBlockValue = 'flex';
    @Output() overflowChanged = new EventEmitter<number>();

    getAmountOfExtraItems(): number {
        return AMOUNT_OF_EXTRA_TABS;
    }

    calculateOverflow(): void {
        // No-op in tests - we manually control overflow events
    }
}

/**
 * Mock OverflowListItemDirective - just a no-op placeholder.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdkOverflowListItem]'
})
class MockOverflowListItemDirective {}

describe('IconTabBarProcessTypeComponent', () => {
    const selectedTabIndex = 50;
    let component: IconTabBarProcessTypeComponent;
    let fixture: ComponentFixture<IconTabBarProcessTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconTabBarProcessTypeComponent],
            providers: [{ provide: IconTabBarComponent, useValue: {} }]
        })
            .overrideComponent(IconTabBarProcessTypeComponent, {
                remove: { imports: [OverflowListDirective, OverflowListItemDirective] },
                add: { imports: [MockOverflowListDirective, MockOverflowListItemDirective] }
            })
            .compileComponents();
    });

    beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(IconTabBarProcessTypeComponent);
        component = fixture.componentInstance;

        component.tabs = _generateTabBarItems(generateTestConfig(100));
        fixture.detectChanges();
        // Flush any pending microtasks
        flush();

        component._selectItem(component.tabs[selectedTabIndex]); // Select random item
        component._lastVisibleTabIndex = 60; // Random big number
        component.overflowDirective = fakeOverflowDirective as OverflowListDirective;
        component._recalculateVisibleItems(AMOUNT_OF_EXTRA_TABS);
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should work two side overflow mode', () => {
        expect(component._prevSteps.length).toBeGreaterThan(0);
        expect(component._nextSteps.length).toBeGreaterThan(0);
    });

    it('should shift tabs by click inside previous steps popover', fakeAsync(() => {
        const previousLengthOfPrevSteps = component._prevSteps.length;
        const previousLengthOfNextSteps = component._nextSteps.length;

        const randomSubTabInsidePrevPopover = component._prevSteps[component._prevSteps.length - 5];
        component._selectExtraItem(randomSubTabInsidePrevPopover);
        flush();
        fixture.detectChanges();

        expect(component._prevSteps.length).toBeLessThan(previousLengthOfPrevSteps);
        expect(component._nextSteps.length).toBeGreaterThan(previousLengthOfNextSteps);
    }));

    it('should shift tabs by click inside next steps popover', fakeAsync(() => {
        const previousLengthOfPrevSteps = component._prevSteps.length;
        const previousLengthOfNextSteps = component._nextSteps.length;
        const randomSubTabInsideNextPopover = component._nextSteps[component._nextSteps.length - 3];

        component._selectExtraItem(randomSubTabInsideNextPopover);
        flush();
        fixture.detectChanges();

        expect(component._prevSteps.length).toBeGreaterThan(previousLengthOfPrevSteps);
        expect(component._nextSteps.length).toBeLessThan(previousLengthOfNextSteps);
    }));

    it('should set tabindex=0 to the selected tab', () => {
        const tabElements = fixture.debugElement.queryAll(By.css('li a'));
        tabElements.forEach((tabElement, index) => {
            if (index === selectedTabIndex) {
                expect(tabElement.nativeElement.getAttribute('tabindex')).toBe('0');
            } else {
                expect(tabElement.nativeElement.getAttribute('tabindex')).toBe('-1');
            }
        });
    });

    describe('displaying an overflow popover to the right', () => {
        beforeEach(() => {
            component.isRtl = false; // Ensure LTR mode
        });

        it('should not display an overflow popover if there are no extra items', () => {
            component._recalculateVisibleItems(0);
            fixture.detectChanges();

            const popoverElement = fixture.nativeElement.querySelector(
                '.fd-icon-tab-bar__item--overflow-right fdp-icon-tab-bar-popover'
            );

            expect(component._prevSteps.length).toBe(0);
            expect(component._nextSteps.length).toBe(0);
            expect(popoverElement).toBeNull();
        });

        it('should display an overflow popover if there are extra items', () => {
            component._recalculateVisibleItems(AMOUNT_OF_EXTRA_TABS);
            fixture.detectChanges();

            const popoverElement = fixture.nativeElement.querySelector(
                '.fd-icon-tab-bar__item--overflow-right fdp-icon-tab-bar-popover'
            );

            expect(component._prevSteps.length).toBeGreaterThan(0);
            expect(component._nextSteps.length).toBeGreaterThan(0);
            expect(popoverElement).toBeTruthy();
        });
    });

    describe('displaying an overflow popover to the left', () => {
        beforeEach(() => {
            component.isRtl = true; // Ensure RTL mode
        });

        it('should not display an overflow popover if there are no extra items', () => {
            component._recalculateVisibleItems(0);
            fixture.detectChanges();

            const popoverElement = fixture.nativeElement.querySelector(
                '.fd-icon-tab-bar__item--overflow-left fdp-icon-tab-bar-popover'
            );

            expect(component._prevSteps.length).toBe(0);
            expect(component._nextSteps.length).toBe(0);
            expect(popoverElement).toBeNull();
        });

        it('should display an overflow popover if there are extra items', () => {
            component._recalculateVisibleItems(AMOUNT_OF_EXTRA_TABS);
            fixture.detectChanges();

            const popoverElement = fixture.nativeElement.querySelector(
                '.fd-icon-tab-bar__item--overflow-left fdp-icon-tab-bar-popover'
            );

            expect(component._prevSteps.length).toBeGreaterThan(0);
            expect(component._nextSteps.length).toBeGreaterThan(0);
            expect(popoverElement).toBeTruthy();
        });
    });
});

const fakeOverflowDirective = {
    getAmountOfExtraItems: () => AMOUNT_OF_EXTRA_TABS
};

/**
 * Regression coverage for #14593: when the parent drives [selectedUid] (e.g. scroll-spy
 * crossing a tab boundary in stackContent mode), the process-type header must synchronize
 * its selection-derived state WITHOUT re-emitting (selected) — a re-emit would round-trip
 * through the parent's _selectItem → _scrollToPanel and jump the scroll position backward.
 */
describe('IconTabBarProcessTypeComponent — parent-driven selectedUid sync (#14593)', () => {
    const initialSelectedIndex = 50;
    let component: IconTabBarProcessTypeComponent;
    let fixture: ComponentFixture<IconTabBarProcessTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconTabBarProcessTypeComponent],
            providers: [{ provide: IconTabBarComponent, useValue: {} }]
        })
            .overrideComponent(IconTabBarProcessTypeComponent, {
                remove: { imports: [OverflowListDirective, OverflowListItemDirective] },
                add: { imports: [MockOverflowListDirective, MockOverflowListItemDirective] }
            })
            .compileComponents();
    });

    beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(IconTabBarProcessTypeComponent);
        component = fixture.componentInstance;

        component.tabs = _generateTabBarItems(generateTestConfig(100));
        fixture.detectChanges();
        flush();

        component._selectItem(component.tabs[initialSelectedIndex]);
        component._lastVisibleTabIndex = 60;
        component.overflowDirective = fakeOverflowDirective as OverflowListDirective;
        component._recalculateVisibleItems(AMOUNT_OF_EXTRA_TABS);
        fixture.detectChanges();
        flush();
    }));

    /** Simulates the parent setting [selectedUid] and Angular firing ngOnChanges. */
    function driveSelectedUid(newUid: string): void {
        const previousUid = component.selectedUid;
        component.selectedUid = newUid;
        component.ngOnChanges({
            selectedUid: new SimpleChange(previousUid, newUid, false)
        });
    }

    it('should not re-emit (selected) when the parent drives [selectedUid]', fakeAsync(() => {
        const selectedSpy = jest.spyOn(component.selected, 'emit');

        // Target a step currently hidden in the previous-steps overflow popover.
        const target = component.tabs[10];
        driveSelectedUid(target.uId);
        flush();
        fixture.detectChanges();

        expect(selectedSpy).not.toHaveBeenCalled();
    }));

    it('should synchronize _currentStepIndex to the parent-driven selection', fakeAsync(() => {
        const target = component.tabs[10];
        driveSelectedUid(target.uId);
        flush();
        fixture.detectChanges();

        // Without the sync hook, _currentStepIndex would remain stale at the initial index.
        expect((component as any)._currentStepIndex).toBe(target.index);
    }));

    it('should keep the parent-driven active step visible instead of hidden in overflow', fakeAsync(() => {
        const target = component.tabs[10];
        expect(target.hidden).toBe(true); // precondition: currently in the prev-steps overflow

        driveSelectedUid(target.uId);
        flush();
        fixture.detectChanges();

        // Overflow recalculation must have re-centered on the fresh step, so it is now visible.
        expect(component.tabs[target.index].hidden).toBe(false);
    }));
});
