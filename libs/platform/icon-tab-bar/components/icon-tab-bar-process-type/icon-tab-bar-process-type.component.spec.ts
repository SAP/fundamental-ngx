import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverflowListDirective } from '@fundamental-ngx/cdk/utils';
import { of } from 'rxjs';
import { IconTabBarComponent } from '../../icon-tab-bar.component';
import { _generateTabBarItems, generateTestConfig } from '../../tests-helper';
import { IconTabBarProcessTypeComponent } from './icon-tab-bar-process-type.component';

const AMOUNT_OF_EXTRA_TABS = 80;

describe('IconTabBarProcessTypeComponent', () => {
    let component: IconTabBarProcessTypeComponent;
    let fixture: ComponentFixture<IconTabBarProcessTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconTabBarProcessTypeComponent],
            providers: [{ provide: IconTabBarComponent, useValue: {} }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IconTabBarProcessTypeComponent);
        component = fixture.componentInstance;
        (component as any)['_ngZone'] = fakeNgZone as any;
        (component as any)['_cd'] = fakeCdr as any;

        component.tabs = _generateTabBarItems(generateTestConfig(100));
        fixture.detectChanges();
        component._selectItem(component.tabs[50]); // Select random item
        component._lastVisibleTabIndex = 60; // Random big number
        component.overflowDirective = fakeOverflowDirective as OverflowListDirective;
        component._recalculateVisibleItems(AMOUNT_OF_EXTRA_TABS);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should work two side overflow mode', () => {
        expect(component._prevSteps.length).toBeGreaterThan(0);
        expect(component._nextSteps.length).toBeGreaterThan(0);
    });

    it('should shift tabs by click inside previous steps popover', () => {
        const previousLengthOfPrevSteps = component._prevSteps.length;
        const previousLengthOfNextSteps = component._nextSteps.length;

        const randomSubTabInsidePrevPopover = component._prevSteps[component._prevSteps.length - 5];
        component._selectExtraItem(randomSubTabInsidePrevPopover);
        fixture.detectChanges();

        expect(component._prevSteps.length).toBeLessThan(previousLengthOfPrevSteps);
        expect(component._nextSteps.length).toBeGreaterThan(previousLengthOfNextSteps);
    });

    it('should shift tabs by click inside next steps popover', () => {
        const previousLengthOfPrevSteps = component._prevSteps.length;
        const previousLengthOfNextSteps = component._nextSteps.length;
        const randomSubTabInsideNextPopover = component._nextSteps[component._nextSteps.length - 3];

        component._selectExtraItem(randomSubTabInsideNextPopover);
        fixture.detectChanges();

        expect(component._prevSteps.length).toBeGreaterThan(previousLengthOfPrevSteps);
        expect(component._nextSteps.length).toBeLessThan(previousLengthOfNextSteps);
    });

    describe('displaying an overflow popover to the right', () => {
        beforeEach(() => {
            component.isRtl = false; // Ensure LTR mode
        });

        it('should not display an overflow popover if there are no extra items', () => {
            component._recalculateVisibleItems(0);
            fixture.detectChanges();

            const popoverElement = fixture.nativeElement.querySelector('.fd-icon-tab-bar__item--overflow-right fdp-icon-tab-bar-popover');

            expect(component._prevSteps.length).toBe(0);
            expect(component._nextSteps.length).toBe(0);
            expect(popoverElement).toBeNull();
        });

        it('should display an overflow popover if there are extra items', () => {
            component._recalculateVisibleItems(AMOUNT_OF_EXTRA_TABS);
            fixture.detectChanges();

            const popoverElement = fixture.nativeElement.querySelector('.fd-icon-tab-bar__item--overflow-right fdp-icon-tab-bar-popover');

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

            const popoverElement = fixture.nativeElement.querySelector('.fd-icon-tab-bar__item--overflow-left fdp-icon-tab-bar-popover');

            expect(component._prevSteps.length).toBe(0);
            expect(component._nextSteps.length).toBe(0);
            expect(popoverElement).toBeNull();
        });

        it('should display an overflow popover if there are extra items', () => {
            component._recalculateVisibleItems(AMOUNT_OF_EXTRA_TABS);
            fixture.detectChanges();

            const popoverElement = fixture.nativeElement.querySelector('.fd-icon-tab-bar__item--overflow-left fdp-icon-tab-bar-popover');

            expect(component._prevSteps.length).toBeGreaterThan(0);
            expect(component._nextSteps.length).toBeGreaterThan(0);
            expect(popoverElement).toBeTruthy();
        });
    });
});

const fakeOverflowDirective = {
    getAmountOfExtraItems: () => AMOUNT_OF_EXTRA_TABS
};

const fakeNgZone = {
    onMicrotaskEmpty: {
        pipe: () => of(1)
    }
};

const fakeCdr = {
    detectChanges: () => null,
    markForCheck: () => null
};
