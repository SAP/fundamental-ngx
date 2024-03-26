import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, ViewChild, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FdDnDEvent } from './directives/dnd/icon-bar-dnd-container.directive';
import { IconBarDndItemDirective } from './directives/dnd/icon-bar-dnd-item.directive';
import { IconTabBarComponent } from './icon-tab-bar.component';
import { FDP_ICON_TAB_BAR } from './icon-tab-bar.module';
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
    imports: [FDP_ICON_TAB_BAR]
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

describe('IconTabBarComponent with projected tabs', () => {
    let component: ProjectedTestComponent;
    let fixture: ComponentFixture<ProjectedTestComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ProjectedTestComponent]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(ProjectedTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should convert projected tabs into tab config', async () => {
        await fixture.whenRenderingDone();

        const tabs = component.tabBar._tabsConfig$();

        expect(tabs.length).toBeGreaterThan(0);

        expect(tabs[0].label).toEqual('Tab 1');
    });

    it('should render selected tab content', async () => {
        await fixture.whenRenderingDone();

        let renderedTabContent = fixture.nativeElement.querySelector('.tab-content').innerHTML;

        expect(renderedTabContent).toEqual('1');

        const thirdTabId = component.tabBar._tabs$()[2];

        component.tabBar._selectItem(thirdTabId);

        fixture.detectChanges();
        await fixture.whenStable();

        renderedTabContent = fixture.nativeElement.querySelector('.tab-content').innerHTML;

        expect(renderedTabContent).toEqual('3');
    });

    it('should render stacked tabs', async () => {
        component.stackContent$.set(true);
        fixture.detectChanges();
        await fixture.whenStable();

        expect(fixture.nativeElement.querySelectorAll('.tab-content').length).toEqual(4);
    });
});
