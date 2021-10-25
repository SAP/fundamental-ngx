import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverComponent } from '@fundamental-ngx/core/popover';

import { TextTypePopoverComponent } from './text-type-popover.component';
import { generateTabBarItems, generateTestConfig } from '../../../tests-helper';

describe('TextTypePopoverComponent', () => {
    let component: TextTypePopoverComponent;
    let fixture: ComponentFixture<TextTypePopoverComponent>;
    const colorToTest = 'positive';

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TextTypePopoverComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TextTypePopoverComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.popover = fakePopover as PopoverComponent;
    });

    it('should generate styles for tabs', () => {
        const config = generateTestConfig(10);
        const extraTabs = generateTabBarItems(config);
        component.extraTabs = extraTabs;
        component.extraTabs[0].color = colorToTest;
        component.ngOnChanges({ extraTabs: extraTabs } as unknown as SimpleChanges);

        const appliedStyle = component.extraTabs[0].cssClasses.includes(`fd-icon-tab-bar__list-item--${colorToTest}`);
        expect(appliedStyle).toBeTruthy();
    });

    it('should generate styles for subTabs of parent', () => {
        const parentConfig = generateTestConfig(10, true);
        const tabs = generateTabBarItems(parentConfig);
        component.parentTab = tabs[5];
        component.parentTab.subItems[0].color = colorToTest;
        component.ngOnChanges({ parentTab: tabs[5] } as unknown as SimpleChanges);

        const appliedStyle = component.parentTab.subItems[0].cssClasses.includes(
            `fd-icon-tab-bar__list-item--${colorToTest}`
        );
        expect(appliedStyle).toBeTruthy();
    });

    it('should highlight parent tab if child is selected', () => {
        component.parentTab = {
            cssClasses: null,
            index: 0,
            uId: '0',
            flatIndex: 0,
            subItems: [
                {
                    cssClasses: null,
                    index: 1,
                    uId: '0.1',
                    flatIndex: 1,
                    subItems: [
                        {
                            cssClasses: null,
                            index: 2,
                            uId: '0.1.2',
                            flatIndex: 2,
                            subItems: [
                                {
                                    cssClasses: null,
                                    index: 3,
                                    uId: '0.1.2.3',
                                    flatIndex: 3,
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        component.ngOnChanges({ selectedSubItemUid: component.parentTab } as any);

        expect(component._containsSelected).toBeFalse();

        component.selectedSubItemUid = '0.1.2.3';
        component.ngOnChanges({ selectedSubItemUid: component.selectedSubItemUid } as any);
        expect(component._containsSelected).toBeTrue();
    });

    it('should emit selectedExtraItem event.', () => {
        const parentConfig = generateTestConfig(1);
        const tabs = generateTabBarItems(parentConfig);
        component.isExtraItemsMode = true;
        component.extraTabs = tabs;
        component.ngOnChanges({ extraTabs: tabs } as unknown as SimpleChanges);

        const emitSpy = spyOn(component.selectedExtraItem, 'emit');
        component._selectItem(component.extraTabs[0]);

        expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit selectedSubItem event.', () => {
        const parentConfig = generateTestConfig(10, true);
        const tabs = generateTabBarItems(parentConfig);
        component.parentTab = tabs[5];
        component.ngOnChanges({ parentTab: tabs[5] } as unknown as SimpleChanges);

        const emitSpy = spyOn(component.selectedSubItem, 'emit');
        component._selectItem(component.parentTab.subItems[0]);

        expect(emitSpy).toHaveBeenCalled();
    });
});

const fakePopover = {
    close: () => null
};
