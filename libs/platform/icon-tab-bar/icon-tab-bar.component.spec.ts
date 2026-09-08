import { Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
    IconTabBarTabComponent,
    IconTabBarTabContentDirective
} from './components/icon-tab-bar-tab/icon-tab-bar-tab.component';
import { FdDnDEvent } from './directives/dnd/icon-bar-dnd-container.directive';
import { IconBarDndItemDirective } from './directives/dnd/icon-bar-dnd-item.directive';
import { IconTabBarComponent } from './icon-tab-bar.component';
import { TabConfig } from './interfaces/tab-config.interface';
import { generateTestConfig } from './tests-helper';
import { IconTabBarSize, TabType } from './types';

// --- Task 1: node stability test host ---
@Component({
    template: ` <fdp-icon-tab-bar [stackContent]="true" [tabsConfig]="tabs"> </fdp-icon-tab-bar> `,
    imports: [IconTabBarComponent]
})
class StackContentNodeStabilityHostComponent {
    @ViewChild(IconTabBarComponent) tabBar!: IconTabBarComponent;
    tabs: TabConfig[] = generateTestConfig(3);
}

@Component({
    template: ` <fdp-icon-tab-bar [stackContent]="true" [tabsConfig]="tabsConfig()"> </fdp-icon-tab-bar> `,
    imports: [IconTabBarComponent]
})
class StackContentStructuralMutationHostComponent {
    @ViewChild(IconTabBarComponent) tabBar!: IconTabBarComponent;
    tabsConfig = signal<TabConfig[]>([
        { id: 'alpha', label: 'Alpha' },
        { id: 'beta', label: 'Beta' },
        { id: 'gamma', label: 'Gamma' }
    ]);
}

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
    template: ` <fdp-icon-tab-bar [tabsConfig]="tabsConfig()"> </fdp-icon-tab-bar> `,
    imports: [IconTabBarComponent]
})
class UidCollisionHostComponent {
    @ViewChild(IconTabBarComponent) tabBar!: IconTabBarComponent;
    tabsConfig = signal<TabConfig[]>([
        { id: 'a', label: 'A' },
        { id: 'b', label: 'B' }
    ]);
}

@Component({
    template: ` <fdp-icon-tab-bar [tabsConfig]="tabsConfig()"> </fdp-icon-tab-bar> `,
    imports: [IconTabBarComponent]
})
class NestedUidStabilityHostComponent {
    @ViewChild(IconTabBarComponent) tabBar!: IconTabBarComponent;
    tabsConfig = signal<TabConfig[]>([
        {
            id: 'parent',
            label: 'Parent',
            subItems: [
                { id: 'child-a', label: 'Child A' },
                { id: 'child-b', label: 'Child B' }
            ]
        }
    ]);
}

@Component({
    template: ` <fdp-icon-tab-bar [stackContent]="true" [tabsConfig]="tabsConfig()"> </fdp-icon-tab-bar> `,
    imports: [IconTabBarComponent]
})
class ReorderContentCorrectnessHostComponent {
    @ViewChild(IconTabBarComponent) tabBar!: IconTabBarComponent;
    tabsConfig = signal<TabConfig[]>([
        { id: 'alpha', label: 'Alpha' },
        { id: 'beta', label: 'Beta' },
        { id: 'gamma', label: 'Gamma' }
    ]);
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
        const tabs = hostEl.querySelectorAll<HTMLElement>('.fd-icon-tab-bar__tab');

        const someOtherTab = tabs[1];

        jest.spyOn(component, 'selected');
        expect(someOtherTab).toBeDefined();
        someOtherTab?.click();
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
        const tabs = hostEl.querySelectorAll<HTMLElement>('.fd-icon-tab-bar__tab');

        const someOtherTab = tabs[1];

        jest.spyOn(component, 'selected');
        expect(someOtherTab).toBeDefined();
        someOtherTab?.click();
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

describe('IconTabBarComponent — stackContent node stability (Task 1 — #14501)', () => {
    let stabilityFixture: ComponentFixture<StackContentNodeStabilityHostComponent>;
    let stabilityComponent: StackContentNodeStabilityHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StackContentNodeStabilityHostComponent]
        }).compileComponents();
        stabilityFixture = TestBed.createComponent(StackContentNodeStabilityHostComponent);
        stabilityComponent = stabilityFixture.componentInstance;
        stabilityFixture.detectChanges();
        await stabilityFixture.whenStable();
        stabilityFixture.detectChanges();
    });

    it('should not recreate fdp-icon-tab-bar-tab-content directive instances when _flatTabs$ recomputes', () => {
        const directivesBefore = stabilityFixture.debugElement
            .queryAll(By.directive(IconTabBarTabContentDirective))
            .map((de) => de.injector.get(IconTabBarTabContentDirective));

        expect(directivesBefore.length).toBeGreaterThan(0);

        // Mutate tab 0 counter → new spread object → new object identity → _flatTabs$ recomputes
        stabilityComponent.tabs = stabilityComponent.tabs.map((t, i) =>
            i === 0 ? { ...t, counter: (t.counter ?? 0) + 1 } : t
        );
        stabilityFixture.detectChanges();

        const directivesAfter = stabilityFixture.debugElement
            .queryAll(By.directive(IconTabBarTabContentDirective))
            .map((de) => de.injector.get(IconTabBarTabContentDirective));

        // track tab.uId: directive instances for tabs 1 and 2 must be identical (reused, not recreated).
        // track tab (identity): Angular destroys and recreates them → different instances → test fails RED.
        expect(directivesAfter[1]).toBe(directivesBefore[1]);
        expect(directivesAfter[2]).toBe(directivesBefore[2]);
    });

    it('should produce unique uId values across all flat tabs including nested subItems', () => {
        const tabBar = stabilityFixture.componentInstance.tabBar;
        const flatTabs = tabBar._flatTabs$();
        const uIds = flatTabs.map((t) => t.uId);
        const uniqueUIds = new Set(uIds);
        expect(uniqueUIds.size).toBe(uIds.length);
    });
});

describe('IconTabBarComponent — stackContent structural uId stability (Task B — #14501)', () => {
    let structFixture: ComponentFixture<StackContentStructuralMutationHostComponent>;
    let structComponent: StackContentStructuralMutationHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [StackContentStructuralMutationHostComponent]
        }).compileComponents();
        structFixture = TestBed.createComponent(StackContentStructuralMutationHostComponent);
        structComponent = structFixture.componentInstance;
        structFixture.detectChanges();
        await structFixture.whenStable();
        structFixture.detectChanges();
    });

    it('panels retain correct content after removing the first tab', async () => {
        // Capture uIds assigned on first render
        const initialFlatTabs = structComponent.tabBar._flatTabs$();
        const betaUIdBefore = initialFlatTabs.find((t) => t.id === 'beta')?.uId;
        const gammaUIdBefore = initialFlatTabs.find((t) => t.id === 'gamma')?.uId;
        expect(betaUIdBefore).toBeDefined();
        expect(gammaUIdBefore).toBeDefined();

        // Remove "Alpha" (index 0) — Beta and Gamma survive, shifting to indices 0 and 1.
        structComponent.tabsConfig.update((tabs) => tabs.filter((t) => t.id !== 'alpha'));
        structFixture.detectChanges();
        await structFixture.whenStable();
        structFixture.detectChanges();

        // With the uId fix: Beta and Gamma must retain their original uIds (allocated by id-based stable key).
        // Without the fix: Beta gets index 0 → uId "0", Gamma gets index 1 → uId "1" (wrong — they had "1" and "2").
        const afterFlatTabs = structComponent.tabBar._flatTabs$();
        expect(afterFlatTabs.length).toBe(2);

        const betaUIdAfter = afterFlatTabs.find((t) => t.id === 'beta')?.uId;
        const gammaUIdAfter = afterFlatTabs.find((t) => t.id === 'gamma')?.uId;

        // uIds must be stable — same as before the removal of Alpha
        expect(betaUIdAfter).toBe(betaUIdBefore);
        expect(gammaUIdAfter).toBe(gammaUIdBefore);

        // The panel count must also be correct
        const hostEl: HTMLElement = structFixture.debugElement.nativeElement;
        const panels = hostEl.querySelectorAll<HTMLElement>('fdp-icon-tab-bar-tab-content');
        expect(panels.length).toBe(2);

        // The tab bar must render Beta and Gamma labels (content correctness, not just uId equality)
        const tabItems = hostEl.querySelectorAll<HTMLElement>('.fd-icon-tab-bar__tab');
        const renderedLabels = Array.from(tabItems).map((el) => el.textContent?.trim() ?? '');
        expect(renderedLabels.some((l) => l.includes('Beta'))).toBe(true);
        expect(renderedLabels.some((l) => l.includes('Gamma'))).toBe(true);
        expect(renderedLabels.every((l) => !l.includes('Alpha'))).toBe(true);
    });
});

describe('IconTabBarComponent — uId collision-free on insert (BLOCKER 2 — #14501)', () => {
    let fixture: ComponentFixture<UidCollisionHostComponent>;
    let component: UidCollisionHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UidCollisionHostComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(UidCollisionHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('inserting a new tab before id-bearing tabs does not produce duplicate uIds', async () => {
        // Initial state: [{id:'a'},{id:'b'}] → uIds allocated e.g. "0","1"
        const before = component.tabBar._flatTabs$();
        const aUIdBefore = before.find((t) => t.id === 'a')?.uId;
        const bUIdBefore = before.find((t) => t.id === 'b')?.uId;
        expect(aUIdBefore).toBeDefined();
        expect(bUIdBefore).toBeDefined();

        // Insert a new id-less tab at the front
        component.tabsConfig.update((tabs) => [{ label: 'New' }, ...tabs]);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const after = component.tabBar._flatTabs$();
        const uIds = after.map((t) => t.uId);
        const unique = new Set(uIds);

        // MUST: all uIds are unique
        expect(unique.size).toBe(uIds.length);

        // MUST: existing id-bearing tabs retain their uIds
        const aUIdAfter = after.find((t) => t.id === 'a')?.uId;
        const bUIdAfter = after.find((t) => t.id === 'b')?.uId;
        expect(aUIdAfter).toBe(aUIdBefore);
        expect(bUIdAfter).toBe(bUIdBefore);
    });
});

describe('IconTabBarComponent — nested uId stability (BLOCKER 3 — #14501)', () => {
    let fixture: ComponentFixture<NestedUidStabilityHostComponent>;
    let component: NestedUidStabilityHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NestedUidStabilityHostComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(NestedUidStabilityHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('nested id-bearing tabs retain their uIds after a sibling is inserted', async () => {
        const before = component.tabBar._flatTabs$();
        const childAUIdBefore = before.find((t) => t.id === 'child-a')?.uId;
        const childBUIdBefore = before.find((t) => t.id === 'child-b')?.uId;
        expect(childAUIdBefore).toBeDefined();
        expect(childBUIdBefore).toBeDefined();

        // Insert a new child before child-a
        component.tabsConfig.update((tabs) => [
            {
                ...tabs[0],
                subItems: [{ label: 'New Child' }, ...(tabs[0].subItems ?? [])]
            }
        ]);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const after = component.tabBar._flatTabs$();
        const uIds = after.map((t) => t.uId);
        const unique = new Set(uIds);

        // All uIds unique
        expect(unique.size).toBe(uIds.length);

        // child-a and child-b must retain their uIds
        const childAUIdAfter = after.find((t) => t.id === 'child-a')?.uId;
        const childBUIdAfter = after.find((t) => t.id === 'child-b')?.uId;
        expect(childAUIdAfter).toBe(childAUIdBefore);
        expect(childBUIdAfter).toBe(childBUIdBefore);
    });
});

describe('IconTabBarComponent — reorder panels match tabs (BLOCKER 2 — #14501)', () => {
    let fixture: ComponentFixture<ReorderContentCorrectnessHostComponent>;
    let component: ReorderContentCorrectnessHostComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReorderContentCorrectnessHostComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ReorderContentCorrectnessHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('panels are associated with the correct tabs after reordering', async () => {
        // Capture initial uId → label mapping
        const before = component.tabBar._flatTabs$();
        const alphaUIdBefore = before.find((t) => t.id === 'alpha')?.uId;
        const betaUIdBefore = before.find((t) => t.id === 'beta')?.uId;
        expect(alphaUIdBefore).toBeDefined();
        expect(betaUIdBefore).toBeDefined();

        // Reorder: swap alpha and beta
        component.tabsConfig.update(() => [
            { id: 'beta', label: 'Beta' },
            { id: 'alpha', label: 'Alpha' },
            { id: 'gamma', label: 'Gamma' }
        ]);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const after = component.tabBar._flatTabs$();
        // alpha and beta must keep their original uIds (not get swapped/re-indexed)
        expect(after.find((t) => t.id === 'alpha')?.uId).toBe(alphaUIdBefore);
        expect(after.find((t) => t.id === 'beta')?.uId).toBe(betaUIdBefore);

        // All uIds still unique
        const uIds = after.map((t) => t.uId);
        expect(new Set(uIds).size).toBe(uIds.length);
    });
});
