import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarTextTypeComponent } from './icon-tab-bar-text-type.component';
import { generateTestConfig } from '../../tests-helper';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IconTabBarComponent } from '../../icon-tab-bar.component';

describe('IconTabBarTextTypeComponent', () => {
    let component: IconTabBarTextTypeComponent;
    let fixture: ComponentFixture<IconTabBarTextTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IconTabBarTextTypeComponent],
            providers: [{ provide: IconTabBarComponent, useValue: {} }],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IconTabBarTextTypeComponent);
        component = fixture.componentInstance;
        component.tabsConfig = generateTestConfig(10);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should _selectExtraItem move selected tab to last visible position', () => {
        const hiddenItem = component._tabs[component._tabs.length - 1];

        component._selectExtraItem(hiddenItem);
        const lastVisibleItemAfterSelect = component._tabs[component._lastVisibleTabIndex];

        expect(hiddenItem.label).toEqual(lastVisibleItemAfterSelect.label);
    });

    it('should insert tab to another tab as child', () => {
        const draggableItem = component._tabs[0];
        const targetItem = component._tabs[1];
        component._onDropped({
            draggableItem,
            targetItem,
            action: 'insert'
        });
        const child = targetItem.subItems?.find((item) => item.label === draggableItem.label);
        expect(child).toBeTruthy();
    });

    it('should replace tab', () => {
        const draggableItem = component._tabs[0];
        const targetItem = component._tabs[1];
        const dragItemPreviousUid = draggableItem.uId;
        const targetItemPreviousUid = targetItem.uId;

        component._onDropped({
            draggableItem,
            targetItem,
            action: 'replace'
        });
        const dragItemCurrentUid = draggableItem.uId;

        expect(dragItemPreviousUid).not.toEqual(dragItemCurrentUid);
        expect(dragItemCurrentUid).toEqual(targetItemPreviousUid);
    });

    it('should change number of visible/hidden tabs', () => {
        const tabsLength = component._tabs.length;
        const extraTabs = 5;
        component._recalculateVisibleItems(extraTabs);
        const visibleTabsLength = component._tabs.filter((tab) => !tab.hidden).length;

        expect(component._extraTabs.length).toBe(extraTabs);
        expect(visibleTabsLength).toBe(tabsLength - extraTabs);
    });
});
