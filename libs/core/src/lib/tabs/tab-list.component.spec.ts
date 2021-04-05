import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabListComponent } from './tab-list.component';
import { TabsModule } from './tabs.module';
import { whenStable } from '../utils/tests';

@Component({
    template: `
        <fd-tab-list>
            <fd-tab title="Link" id="tab1">
                Content Link
            </fd-tab>
            <fd-tab title="Selected" id="tab2">
                Content Selected
            </fd-tab>
            <fd-tab title="Link" id="tab3">
                Content Link Two
            </fd-tab>
            <fd-tab title="Disabled" id="tab4" *ngIf="showDisabled">
                Disabled
            </fd-tab>
        </fd-tab-list>`
})
class TestTabsComponent {
    @ViewChildren(TabPanelComponent)
    tabs: QueryList<TabPanelComponent>;

    showDisabled = true;
}

describe('TabListComponent', () => {
    let component: TabListComponent;
    let testComponent: TestTabsComponent;
    let fixture: ComponentFixture<TestTabsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestTabsComponent],
            imports: [TabsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTabsComponent);
        testComponent = fixture.componentInstance;
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initially open first tab', async () => {
        await whenStable(fixture);
        expect(testComponent.tabs.first.expanded).toBeTrue();
    });

    it('should update tab storing structures', async () => {
        await whenStable(fixture);
        expect(component._tabArray.length).toBe(4);
        expect(component._visualOrder.visible.length).toBe(4);
    });

    it('should select tab', async () => {
        await whenStable(fixture);
        const tabChangeSpy = spyOn(component.selectedTabChange, 'emit');
        const firstActiveTab = testComponent.tabs.first;
        const secondActiveTab = testComponent.tabs.last;

        secondActiveTab.open(true);

        await whenStable(fixture);

        expect(tabChangeSpy).toHaveBeenCalled();
        expect(firstActiveTab.expanded).toBeFalse();
        expect(secondActiveTab.expanded).toBeTrue();
    });

    it('should update on tab panels change', async () => {
        await whenStable(fixture);

        fixture.componentInstance.showDisabled = false;

        await whenStable(fixture);

        expect(component._tabArray.length).toBe(3);
        expect(component._visualOrder.visible.length).toBe(3);
    });

    it('should keep active element after tab panels change', async () => {
        await whenStable(fixture);

        testComponent.tabs.last.open(true);

        await whenStable(fixture);

        const tabChangeSpy = spyOn(component.selectedTabChange, 'emit');
        fixture.componentInstance.showDisabled = false;

        await whenStable(fixture);

        expect(tabChangeSpy).toHaveBeenCalled();
    });

    it('should call select tab on service event', async () => {
        await whenStable(fixture);

        (component as any)._tabsService.tabSelected.next(2);

        await whenStable(fixture);

        expect(component._tabArray[2].active).toBeTrue();
    });
});

const NUMBER_OF_TABS = 10;

@Component({
    template: `
        <fd-tab-list style="width: 200px"
                     [collapsibleTabs]="true"
                     [collapseOverflow]="true"
                     [maxVisibleTabs]="maxVisibleTabs">
            <fd-tab *ngFor="let title of _tabs" [title]="title">{{title}} content</fd-tab>
        </fd-tab-list>
    `
})
class TestCollapsibleTabsComponent {
    @ViewChildren(TabPanelComponent)
    tabs: QueryList<TabPanelComponent>;

    maxVisibleTabs = 10;
    _tabs = [];

    constructor() {
        for (let i = 0; i < NUMBER_OF_TABS; i++) {
            this._tabs.push(`Tab ${i + 1}`);
        }
    }
}

describe('TabListComponent', () => {
    let component: TabListComponent;
    let testComponent: TestCollapsibleTabsComponent;
    let fixture: ComponentFixture<TestCollapsibleTabsComponent>;
    const groupedTabs = tabList => [tabList._visualOrder.visible, tabList._visualOrder.overflowing];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestCollapsibleTabsComponent],
            imports: [TabsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCollapsibleTabsComponent);
        testComponent = fixture.componentInstance;
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(testComponent).toBeTruthy();
    });

    it('should collapse tabs', async () => {
        await whenStable(fixture);
        const [visibleTabs, overflowingTabs] = groupedTabs(component);

        expect(visibleTabs.length + overflowingTabs.length === NUMBER_OF_TABS).toBeTrue();
        expect(component._tabArray.length === NUMBER_OF_TABS).toBeTrue();
        expect(overflowingTabs.length > 0).toBeTrue();
    });

    it('should respect maximum number of visible tabs', async () => {
        await whenStable(fixture);

        testComponent.maxVisibleTabs = 1;

        await whenStable(fixture);

        const [visibleTabs, overflowingTabs] = groupedTabs(component);

        expect(testComponent._tabs.length).toEqual(10);
        expect(visibleTabs.length).toEqual(1);
        expect(overflowingTabs.length).toEqual(9);
    });

    it('should collapse active tab', async () => {
        await whenStable(fixture);

        testComponent.tabs.first.open(false);

        await whenStable(fixture);

        const someTabActive = component._tabArray.some(tab => tab.active);
        expect(someTabActive).toBeFalse();
    });
});
