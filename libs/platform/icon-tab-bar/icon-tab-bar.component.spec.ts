import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FdDnDEvent } from './directives/dnd/icon-bar-dnd-container.directive';
import { IconBarDndItemDirective } from './directives/dnd/icon-bar-dnd-item.directive';
import { IconTabBarComponent } from './icon-tab-bar.component';
import { TabConfig } from './interfaces/tab-config.interface';
import { generateTestConfig } from './tests-helper';
import { TabType } from './types';

@Component({
    template: ` <fdp-icon-tab-bar
        [tabsConfig]="items"
        [enableTabReordering]="enableTabReordering"
        [showTotalTab]="showTotalTab"
        [iconTabType]="iconTabType"
        (iconTabSelected)="selected()"
        (iconTabReordered)="reordered()"
    ></fdp-icon-tab-bar>`,
    standalone: true,
    imports: [IconTabBarComponent]
})
class HostComponent {
    enableTabReordering = false;
    showTotalTab = false;
    iconTabType: TabType = 'text';
    items: TabConfig[] = [];

    selected(): void {}

    reordered(): void {}
}

let component: HostComponent;
let fixture: ComponentFixture<HostComponent>;

describe('IconTabBarComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        component.items = generateTestConfig(6);
        fixture.detectChanges();
    });
    it('should create tabs', () => {
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const tabs = hostEl.querySelectorAll('.fd-icon-tab-bar__item');
        expect(tabs.length).toBeGreaterThan(0);
    });

    it('should create tabs with subtabs', () => {
        component.items = generateTestConfig(6, true);
        fixture.detectChanges();
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const subItemBtn = hostEl.querySelector('.fd-icon-tab-bar__arrow');
        expect(subItemBtn).toBeTruthy();
    });

    it('should create all products tab for filter.', () => {
        component.iconTabType = 'filter';
        component.showTotalTab = true;
        fixture.detectChanges();
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const tabAllEl = hostEl.querySelector('.fd-icon-tab-bar__container--filter');
        expect(tabAllEl).toBeTruthy();
    });

    it('should reordering feature available', () => {
        component.enableTabReordering = true;
        fixture.detectChanges();
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const items = fixture.debugElement.queryAll(By.directive(IconBarDndItemDirective));

        const draggableItem = items[0];
        const target = items[1];
        const initialTabsLength = items.length;

        const evt: FdDnDEvent = {
            draggableItem: draggableItem.injector.get(IconBarDndItemDirective).dndItemData,
            targetItem: target.injector.get(IconBarDndItemDirective).dndItemData,
            action: 'insert'
        };

        target.componentInstance._onDropped(evt);

        fixture.detectChanges();
        const updateTabsList = hostEl.querySelectorAll<HTMLElement>('.fd-icon-tab-bar__item');
        expect(updateTabsList.length).toBeLessThan(initialTabsLength);
    });

    it('should remove badge on click', () => {
        component.items[0].badge = true;
        component.items = [...component.items];
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const tabsWithBadge = hostEl.querySelector<HTMLElement>('.fd-icon-tab-bar__badge');
        expect(tabsWithBadge).toBeDefined();
        tabsWithBadge?.click();
        fixture.detectChanges();
        const emptyResult = hostEl.querySelector<HTMLElement>('.fd-icon-tab-bar__badge');

        expect(emptyResult).not.toBeTruthy();
    });

    it('should emit selected event.', () => {
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const someTab = hostEl.querySelector<HTMLElement>('.fd-icon-tab-bar__tab');

        jest.spyOn(component, 'selected');
        expect(someTab).toBeDefined();
        someTab?.click();
        fixture.detectChanges();

        expect(component.selected).toHaveBeenCalled();
    });

    it('should emit reordered event.', () => {
        component.enableTabReordering = true;
        fixture.detectChanges();

        jest.spyOn(component, 'reordered');

        const items = fixture.debugElement.queryAll(By.directive(IconBarDndItemDirective));

        const draggableItem = items[0];
        const target = items[1];

        const evt: FdDnDEvent = {
            draggableItem: draggableItem.injector.get(IconBarDndItemDirective).dndItemData,
            targetItem: target.injector.get(IconBarDndItemDirective).dndItemData,
            action: 'insert'
        };

        target.componentInstance._onDropped(evt);

        fixture.detectChanges();

        expect(component.reordered).toHaveBeenCalled();
    });
});
