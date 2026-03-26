import { Component, provideZonelessChangeDetection, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { whenStable } from '@fundamental-ngx/core/tests';
import { TabListComponent } from './tab-list.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabsModule } from './tabs.module';

@Component({
    template: `<fd-tab-list>
        <fd-tab title="Link" id="tab1"> Content Link </fd-tab>
        <fd-tab title="Selected" id="tab2"> Content Selected </fd-tab>
        <fd-tab title="Link" id="tab3"> Content Link Two </fd-tab>
        @if (showDisabled) {
            <fd-tab title="Disabled" id="tab4"> Disabled </fd-tab>
        }
    </fd-tab-list>`,
    imports: [TabsModule]
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
            imports: [TestTabsComponent]
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
        expect(testComponent.tabs.first.expanded).toBe(true);
    });

    it('should update tab storing structures', async () => {
        await whenStable(fixture);
        expect(component._tabArray.length).toBe(4);
    });

    it('should select tab', async () => {
        await whenStable(fixture);
        const tabChangeSpy = jest.spyOn(component.selectedTabChange, 'emit');
        const tabIndexChangeSpy = jest.spyOn(component.selectedTabIndexChange, 'emit');
        const firstActiveTab = testComponent.tabs.first;
        const secondActiveTab = testComponent.tabs.last;

        secondActiveTab.open(true);

        await whenStable(fixture);

        expect(tabChangeSpy).toHaveBeenCalled();
        expect(tabIndexChangeSpy).toHaveBeenCalledWith(3);
        expect(firstActiveTab.expanded).toBe(false);
        expect(secondActiveTab.expanded).toBe(true);
    });

    it('should update on tab panels change', async () => {
        await whenStable(fixture);

        fixture.componentInstance.showDisabled = false;

        await whenStable(fixture);

        expect(component._tabArray.length).toBe(3);
    });

    it('should keep active element after tab panels change', async () => {
        await whenStable(fixture);

        testComponent.tabs.last.open(true);

        await whenStable(fixture);

        const tabChangeSpy = jest.spyOn(component.selectedTabChange, 'emit');
        const tabIndexChangeSpy = jest.spyOn(component.selectedTabIndexChange, 'emit');
        fixture.componentInstance.showDisabled = false;

        await whenStable(fixture);

        expect(tabChangeSpy).toHaveBeenCalled();
        expect(tabIndexChangeSpy).toHaveBeenCalledWith(0);
    });
});

const NUMBER_OF_TABS = 10;

@Component({
    template: `
        <fd-tab-list
            [style.width.px]="200"
            [collapsibleTabs]="true"
            [collapseOverflow]="true"
            [maxVisibleTabs]="maxVisibleTabs"
        >
            @for (title of _tabs; track title) {
                <fd-tab [title]="title">{{ title }} content</fd-tab>
            }
        </fd-tab-list>
    `,
    imports: [TabsModule]
})
class TestCollapsibleTabsComponent {
    @ViewChildren(TabPanelComponent)
    tabs: QueryList<TabPanelComponent>;

    @ViewChild(TabListComponent)
    tabList: TabListComponent;

    maxVisibleTabs = 10;
    _tabs = new Array(NUMBER_OF_TABS).fill(null).map((e, i) => `Tab ${i + 1}`);
}

describe('TabListComponent', () => {
    let component: TabListComponent;
    let testComponent: TestCollapsibleTabsComponent;
    let fixture: ComponentFixture<TestCollapsibleTabsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestCollapsibleTabsComponent]
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

    it('should respect maximum number of visible tabs', async () => {
        await whenStable(fixture);
        const containerWidth = 200;
        const itemWidth = 50;

        const visibleTabsSpy = jest.spyOn(component.visibleItemsCount, 'emit');
        const hiddenTabsSpy = jest.spyOn(component.hiddenItemsCount, 'emit');

        jest.spyOn(
            (component as any)._overflowLayout._elementRef.nativeElement,
            'getBoundingClientRect'
        ).mockReturnValue({
            width: containerWidth
        });

        jest.spyOn((component as any)._overflowLayout._overflowLayoutService, '_getElementWidth').mockImplementation(
            () => itemWidth
        );

        testComponent.maxVisibleTabs = 1;

        await whenStable(fixture);

        expect(testComponent._tabs.length).toEqual(10);
        expect(visibleTabsSpy).toHaveBeenCalledWith(1);
        expect(hiddenTabsSpy).toHaveBeenCalledWith(9);
    });

    it('should collapse active tab', async () => {
        await whenStable(fixture);

        testComponent.tabs.first.open(false);

        await whenStable(fixture);

        const someTabActive = component._tabArray.some((tab) => tab.active);
        expect(someTabActive).toBe(false);
    });
});

@Component({
    template: `<fd-tab-list [stackContent]="true">
        <fd-tab title="Tab 1" id="stacked-tab1"> Content 1 </fd-tab>
        <fd-tab title="Tab 2" id="stacked-tab2"> Content 2 </fd-tab>
        @if (showThirdTab) {
            <fd-tab title="Tab 3" id="stacked-tab3"> Content 3 </fd-tab>
        }
    </fd-tab-list>`,
    imports: [TabsModule]
})
class TestStackedTabsComponent {
    @ViewChildren(TabPanelComponent)
    tabs: QueryList<TabPanelComponent>;

    @ViewChild(TabListComponent)
    tabList: TabListComponent;

    showThirdTab = false;
}

describe('TabListComponent (stacked content)', () => {
    let component: TabListComponent;
    let testComponent: TestStackedTabsComponent;
    let fixture: ComponentFixture<TestStackedTabsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestStackedTabsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestStackedTabsComponent);
        testComponent = fixture.componentInstance;
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    });

    it('should expand all tabs in stacked mode', async () => {
        await whenStable(fixture);
        testComponent.tabs.forEach((tab) => {
            expect(tab.expanded).toBe(true);
        });
    });

    it('should update tab count tracking when tabs change', async () => {
        await whenStable(fixture);
        expect(component._currentNumberOfTabs).toBe(2);

        testComponent.showThirdTab = true;
        await whenStable(fixture);

        // queueMicrotask runs asynchronously — wait for it
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(component._currentNumberOfTabs).toBe(3);
    });
});

describe('TabListComponent (zoneless)', () => {
    let component: TabListComponent;
    let testComponent: TestTabsComponent;
    let fixture: ComponentFixture<TestTabsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestTabsComponent],
            providers: [provideZonelessChangeDetection()]
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
        expect(testComponent.tabs.first.expanded).toBe(true);
    });

    it('should apply is-expanded class to expanded tab', async () => {
        await whenStable(fixture);
        const firstTab = testComponent.tabs.first;
        expect(firstTab.expanded).toBe(true);
        expect(firstTab.elementRef.nativeElement.classList.contains('is-expanded')).toBe(true);
    });

    it('should select tab', async () => {
        await whenStable(fixture);
        const tabChangeSpy = jest.spyOn(component.selectedTabChange, 'emit');

        testComponent.tabs.last.open(true);

        await whenStable(fixture);

        expect(tabChangeSpy).toHaveBeenCalled();
        expect(testComponent.tabs.first.expanded).toBe(false);
        expect(testComponent.tabs.last.expanded).toBe(true);
    });
});
