import { CommonModule } from '@angular/common';
import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconTabBarTabComponent } from './components/icon-tab-bar-tab/icon-tab-bar-tab.component';
import { FdDnDEvent } from './directives/dnd/icon-bar-dnd-container.directive';
import { IconBarDndItemDirective } from './directives/dnd/icon-bar-dnd-item.directive';
import { IconTabBarComponent } from './icon-tab-bar.component';
import { TabConfig } from './interfaces/tab-config.interface';
import { generateTestConfig } from './tests-helper';
import { IconTabBarSize, TabType } from './types';

@Component({
    template: ` <fdp-icon-tab-bar
        [tabsConfig]="items"
        [iconTabSize]="iconTabSize"
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
    iconTabSize?: IconTabBarSize;

    selected(): void {}

    reordered(): void {}
}

@Component({
    template: `
        <fdp-icon-tab-bar [stackContent]="stackContent$()">
            <fdp-icon-tab-bar-tab label="Tab 1"><span class="tab-content">1</span></fdp-icon-tab-bar-tab>
            <fdp-icon-tab-bar-tab label="Tab 2"><span class="tab-content">2</span></fdp-icon-tab-bar-tab>
            <fdp-icon-tab-bar-tab label="Tab 3"><span class="tab-content">3</span></fdp-icon-tab-bar-tab>
            <fdp-icon-tab-bar-tab label="Tab 4"><span class="tab-content">4</span></fdp-icon-tab-bar-tab>
        </fdp-icon-tab-bar>
    `,
    standalone: true,
    imports: [IconTabBarComponent, IconTabBarTabComponent]
})
export class ProjectedTestComponent {
    @ViewChild(IconTabBarComponent)
    tabBar: IconTabBarComponent;
    stackContent$ = signal(false);
}

describe('IconTabBarComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent, CommonModule]
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

    it('should create all products tab for filter', () => {
        component.iconTabType = 'filter';
        component.showTotalTab = true;
        fixture.detectChanges();
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const tabAllEl = hostEl.querySelector('.fd-icon-tab-bar__container--filter');
        expect(tabAllEl).toBeTruthy();
    });

    it('should handle reordering feature', () => {
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

        const updatedTabsList = hostEl.querySelectorAll<HTMLElement>('.fd-icon-tab-bar__item');
        expect(updatedTabsList.length).toBeLessThan(initialTabsLength);
    });

    it('should handle dynamic tab selection', () => {
        const selectedTabEventSpy = jest.spyOn(component, 'selected');
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const tabs = hostEl.querySelectorAll('.fd-icon-tab-bar__tab');

        // select second tab
        tabs[1].dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(selectedTabEventSpy).toHaveBeenCalled();

        // verify aria-selected attribute
        const selectedTab = hostEl.querySelector('.fd-icon-tab-bar__tab[aria-selected="true"]');
        expect(selectedTab).toBe(tabs[1]);
    });

    it('should handle reorder event', () => {
        component.enableTabReordering = true;
        fixture.detectChanges();

        const reorderedEventSpy = jest.spyOn(component, 'reordered');

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

        expect(reorderedEventSpy).toHaveBeenCalled();
    });

    it('should handle maxContentHeight input', () => {
        component.items = generateTestConfig(4);
        fixture.detectChanges();

        const iconTabBarEl: HTMLElement = fixture.debugElement.nativeElement;
        const contentEl = iconTabBarEl.querySelector('.fd-icon-tab-bar__content') as HTMLElement;
        expect(contentEl.style.maxHeight).toBe('100%');
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

    it('should emit selected event', () => {
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const someTab = hostEl.querySelector<HTMLElement>('.fd-icon-tab-bar__tab');

        jest.spyOn(component, 'selected');
        expect(someTab).toBeDefined();
        someTab?.click();
        fixture.detectChanges();

        expect(component.selected).toHaveBeenCalled();
    });

    it('should emit reordered event', () => {
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

describe('IconTabBarComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent, CommonModule]
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

    it('should create all products tab for filter', () => {
        component.iconTabType = 'filter';
        component.showTotalTab = true;
        fixture.detectChanges();
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const tabAllEl = hostEl.querySelector('.fd-icon-tab-bar__container--filter');
        expect(tabAllEl).toBeTruthy();
    });

    it('should handle reordering feature', () => {
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

        const updatedTabsList = hostEl.querySelectorAll<HTMLElement>('.fd-icon-tab-bar__item');
        expect(updatedTabsList.length).toBeLessThan(initialTabsLength);
    });

    it('should handle dynamic tab selection', () => {
        const selectedTabEventSpy = jest.spyOn(component, 'selected');
        fixture.detectChanges();

        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const tabs = hostEl.querySelectorAll('.fd-icon-tab-bar__tab');

        // select second tab
        tabs[1].dispatchEvent(new Event('click'));
        fixture.detectChanges();

        expect(selectedTabEventSpy).toHaveBeenCalled();

        // verify aria-selected attribute
        const selectedTab = hostEl.querySelector('.fd-icon-tab-bar__tab[aria-selected="true"]');
        expect(selectedTab).toBe(tabs[1]);
    });

    it('should handle reorder event', () => {
        component.enableTabReordering = true;
        fixture.detectChanges();

        const reorderedEventSpy = jest.spyOn(component, 'reordered');

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

        expect(reorderedEventSpy).toHaveBeenCalled();
    });

    it('should handle maxContentHeight input', () => {
        component.items = generateTestConfig(4);
        fixture.detectChanges();

        const iconTabBarEl: HTMLElement = fixture.debugElement.nativeElement;
        const contentEl = iconTabBarEl.querySelector('.fd-icon-tab-bar__content') as HTMLElement;
        expect(contentEl.style.maxHeight).toBe('100%');
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

    it('should emit selected event', () => {
        const hostEl: HTMLElement = fixture.debugElement.nativeElement;
        const someTab = hostEl.querySelector<HTMLElement>('.fd-icon-tab-bar__tab');

        jest.spyOn(component, 'selected');
        expect(someTab).toBeDefined();
        someTab?.click();
        fixture.detectChanges();

        expect(component.selected).toHaveBeenCalled();
    });

    it('should emit reordered event', () => {
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
