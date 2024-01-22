import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTabBarComponent } from '../../icon-tab-bar.component';
import { _generateTabBarItems, generateTestConfig } from '../../tests-helper';
import { IconTabBarTextTypeComponent } from './icon-tab-bar-text-type.component';

describe('IconTabBarTextTypeComponent', () => {
    let component: IconTabBarTextTypeComponent;
    let fixture: ComponentFixture<IconTabBarTextTypeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IconTabBarTextTypeComponent],
            providers: [{ provide: IconTabBarComponent, useValue: {} }]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IconTabBarTextTypeComponent);
        component = fixture.componentInstance;
        component.tabs = _generateTabBarItems(generateTestConfig(10));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should _selectExtraItem move selected tab to last visible position', () => {
        const hiddenItem = component.tabs[component.tabs.length - 1];

        component._selectExtraItem(hiddenItem);
        const lastVisibleItemAfterSelect = component.tabs[component._lastVisibleTabIndex];

        expect(hiddenItem.label).toEqual(lastVisibleItemAfterSelect.label);
    });

    it('should insert tab to another tab as child', () => {
        const draggableItem = component.tabs[0];
        const targetItem = component.tabs[1];
        component._onDropped({
            draggableItem,
            targetItem,
            action: 'insert'
        });
        const child = targetItem.subItems?.find((item) => item.label === draggableItem.label);
        expect(child).toBeTruthy();
    });

    it('should replace tab', () => {
        const draggableItem = component.tabs[0];
        const targetItem = component.tabs[1];
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
        const tabsLength = component.tabs.length;
        const extraTabs = 5;
        component._recalculateVisibleItems(extraTabs);
        const visibleTabsLength = component.tabs.filter((tab) => !tab.hidden).length;

        expect(component._extraTabs$().length).toBe(extraTabs);
        expect(visibleTabsLength).toBe(tabsLength - extraTabs);
    });
});
