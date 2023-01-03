import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarProcessTypeComponent } from './icon-tab-bar-process-type.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { generateTestConfig } from '../../tests-helper';
import { OverflowListDirective } from '@fundamental-ngx/cdk/utils';
import { of } from 'rxjs';
import { IconTabBarComponent } from '../../icon-tab-bar.component';

const AMOUNT_OF_EXTRA_TABS = 80;

describe('IconTabBarProcessTypeComponent', () => {
    let component: IconTabBarProcessTypeComponent;
    let fixture: ComponentFixture<IconTabBarProcessTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IconTabBarProcessTypeComponent],
            providers: [{ provide: IconTabBarComponent, useValue: {} }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IconTabBarProcessTypeComponent);
        component = fixture.componentInstance;
        component['_ngZone'] = fakeNgZone as any;
        component['_cd'] = fakeCdr as any;

        component.tabsConfig = generateTestConfig(100);
        fixture.detectChanges();
        component._selectItem(component._tabs[50]); // Select random item
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
