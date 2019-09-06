import { AfterContentInit, ElementRef, EventEmitter, OnChanges, OnDestroy, QueryList, SimpleChanges } from '@angular/core';
import { TabPanelComponent } from './tab/tab-panel.component';
import { TabsService } from './tabs.service';
/**
 * Represents a list of tab-panels.
 */
export declare class TabListComponent implements AfterContentInit, OnChanges, OnDestroy {
    private tabsService;
    /** @hidden */
    panelTabs: QueryList<TabPanelComponent>;
    /** @hidden */
    tabLinks: QueryList<ElementRef>;
    /** Index of the selected tab panel. */
    selectedIndex: number;
    /** Event emitted when the selected panel changes. */
    selectedIndexChange: EventEmitter<number>;
    private _tabsSubscription;
    private _tabSelectSubscription;
    constructor(tabsService: TabsService);
    /** @hidden */
    ngAfterContentInit(): void;
    /** @hidden */
    ngOnDestroy(): void;
    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number): void;
    /** @hidden */
    tabHeaderClickHandler(tabIndex: number): void;
    /** @hidden */
    tabHeaderKeyHandler(index: number, event: any): void;
    private isIndexInRange;
    private isTargetTabEnabled;
    private isTabContentEmpty;
    private resetTabHook;
}
