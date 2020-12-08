import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { TabListComponent } from './tab-list.component';
import { TabsModule } from './tabs.module';
import { whenStable } from '../utils/tests';

@Component({
    selector: 'fd-test-tabs',
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
    showDisabled = true;
}

describe('TabListComponent', () => {
    let component: TabListComponent;
    let fixture: ComponentFixture<TestTabsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestTabsComponent],
            imports: [TabsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTabsComponent);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle ngAfterContentInit', () => {
        component.ngAfterViewInit();
        expect(component.selectedIndex).toBe(0);
        expect(component.tabLinks.length).toBe(4);
    });

    it('should select tab', fakeAsync(() => {
        component.ngAfterViewInit();
        component.selectTab(3);

        tick(10);
        fixture.detectChanges();
        expect(component.selectedIndex).toBe(3);
    }));

    it('should call reset tab', fakeAsync(() => {
        spyOn((component as any), '_resetTabHook').and.callThrough();
        component.ngAfterViewInit();
        component.selectTab(3);

        tick(10);
        fixture.detectChanges();

        fixture.componentInstance.showDisabled = false;
        fixture.detectChanges();
        tick(10);
        fixture.detectChanges();
        expect((component as any)._resetTabHook).toHaveBeenCalled();

    }));

    it('should not call reset tab', fakeAsync(() => {
        spyOn((component as any), '_resetTabHook').and.callThrough();
        component.ngAfterViewInit();
        component.selectTab(2);

        tick(10);
        fixture.detectChanges();

        fixture.componentInstance.showDisabled = false;
        fixture.detectChanges();
        tick(10);
        fixture.detectChanges();
        expect((component as any)._resetTabHook).not.toHaveBeenCalled();

    }));

    it('should not select out of range tab', fakeAsync(() => {
        component.ngAfterViewInit();
        component.selectTab(1);

        tick(10);
        fixture.detectChanges();
        expect(component.selectedIndex).toBe(1);

        component.selectTab(7);

        tick(10);
        fixture.detectChanges();
        expect(component.selectedIndex).toBe(1);
    }));

    it('should call select tab on service event', fakeAsync(() => {
        component.ngAfterViewInit();
        component.selectTab(1);

        tick(10);
        fixture.detectChanges();
        expect(component.selectedIndex).toBe(1);

        spyOn((component as any), 'selectTab').and.callThrough();

        (component as any)._tabsService.tabSelected.next(2);

        tick(10);
        fixture.detectChanges();
        expect(component.selectTab).toHaveBeenCalledWith(2, true);
        expect(component.selectedIndex).toBe(2);
    }));
});

const NUMBER_OF_TABS = 10;

@Component({
    selector: 'fd-test-tabs',
    template: `
        <div style="width: 400px">
            <fd-tab-list [collapseOverflow]="collapseOverflow" [maxVisibleTabs]="maxVisibleTabs">
                <fd-tab *ngFor="let title of tabs" [title]="title">{{title}} content</fd-tab>
            </fd-tab-list>
        </div>
    `
})
class TestCollapsibleTabsComponent {
    @ViewChild(TabListComponent)
    tabListComponent;

    maxVisibleTabs = 10;
    collapseOverflow = false;
    tabs = [];

    constructor() {
        for (let i = 0; i < NUMBER_OF_TABS; i++) {
            this.tabs.push();
        }
    }
}

describe('TabListComponent', () => {
    let component: TabListComponent;
    let testComponent: TestCollapsibleTabsComponent;
    let fixture: ComponentFixture<TestCollapsibleTabsComponent>;
    const getGroupedTabs = tabsComponent => [tabsComponent['_tabs'].visible, tabsComponent['_tabs'].overflowing];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestCollapsibleTabsComponent],
            imports: [TabsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCollapsibleTabsComponent);
        testComponent = fixture.componentInstance;
        component = fixture.componentInstance.tabListComponent;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should collapse tabs', (async () => {
        await whenStable(fixture);
        const [visibleTabs, overflowingTabs] = getGroupedTabs(component);

        expect(visibleTabs.length + overflowingTabs.length === NUMBER_OF_TABS).toBeTrue();
        expect(overflowingTabs.length > 0).toBeTrue();
    }));

    it('should cache tabs width', (async () => {
        await whenStable(fixture);
        expect(component['_tabsWidth'].length === NUMBER_OF_TABS).toBeTrue();
    }));

    it('should respect maximum number of visible tabs', (async () => {
        await whenStable(fixture);

        testComponent.maxVisibleTabs = 1;

        fixture.detectChanges();
        await whenStable(fixture);

        const [visibleTabs, overflowingTabs] = getGroupedTabs(component);

        expect(visibleTabs.length).toEqual(1);
        expect(overflowingTabs.length).toEqual(9);
    }));
});
