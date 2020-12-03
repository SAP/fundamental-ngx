import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { TabPanelComponent } from './tab/tab-panel.component';
import { fromEvent, merge, Subject, timer } from 'rxjs';
import { TabsService } from './tabs.service';
import { debounceTime, filter, startWith, takeUntil } from 'rxjs/operators';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { getElementCapacity, getElementWidth } from '../utils/functions';

export type TabModes = 'icon-only' | 'process' | 'filter';

export type TabSizes = 's' | 'm' | 'l' | 'xl' | 'xxl';

/**
 * Represents a list of tab-panels.
 */
@Component({
    selector: 'fd-tab-list',
    templateUrl: './tab-list.component.html',
    styleUrls: ['./tab-list.component.scss'],
    host: {
        class: 'fd-tabs-custom'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TabsService]
})
export class TabListComponent implements AfterContentInit, AfterViewInit, OnChanges, OnDestroy {

    /** Index of the selected tab panel. */
    @Input()
    selectedIndex = 0;

    /** Whether user wants to use tab component in compact mode */
    @Input()
    compact = false;

    /** Size of tab, it's mostly about adding spacing on tab container, available sizes 's' | 'm' | 'l' | 'xl' | 'xxl' */
    @Input()
    size: TabSizes = 'm';

    /**
     * Whether user wants to use tab component in certain mode. Modes available:
     * 'icon-only' | 'process' | 'filter'
     */
    @Input()
    mode: TabModes;

    /** Whether to move overflowing tabs to the dropdown */
    @Input()
    collapseOverflow = false;

    /** Limits the maximum number of tabs visible in the tab bar in collapseOverflow mode.
     * Other tabs will be moved to the collapsed tabs dropdown */
    @Input()
    maxVisibleTabs: number = null;

    /** Whether to open tab content one under another without collapsing */
    @Input()
    stackContent = false;

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedIndexChange = new EventEmitter<number>();

    /** @hidden */
    @ContentChildren(TabPanelComponent)
    panelTabs: QueryList<TabPanelComponent>;

    /** @hidden */
    @ViewChildren(TabLinkDirective)
    tabLinks: QueryList<TabLinkDirective>;

    /** @hidden */
    @ViewChildren(TabItemDirective)
    tabItems: QueryList<TabItemDirective>;

    /** @hidden */
    @ViewChild('tabsItemContainer', { read: ElementRef })
    tabsItemContainer: ElementRef;

    /** @hidden */
    @ViewChild('expandTabsTrigger', { read: ElementRef })
    expandTabsTrigger: ElementRef;

    /** @hidden TODO */
    _tabs: { [key: string]: TabPanelComponent[] } = { visible: [], collapsed: [] };

    /** @hidden TODO */
    _tabsWidth: [TabItemDirective, number][];

    /** @hidden TODO */
    _triggerWidth: number;

    /** @hidden TODO */
    _isCollapsed = true;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(private _tabsService: TabsService, private _changeRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._tabs.visible = this.panelTabs.toArray();
    }

    ngAfterViewInit(): void {
        this._setupCollapsingOverflowedTabs();
        this._setupStackedContent();
        this.selectTab(this.selectedIndex);
        this._listenOnTabSelect();
        this._listenOnContentQueryListChange();
        this._listenOnPropertiesChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedIndex) {
            this.selectTab(changes.selectedIndex.currentValue);
        }
    }

    /**
     * Function to select a new tab from an index.
     * @param tabIndex Index of the tab to select.
     */
    selectTab(tabIndex: number, emitEvent?: boolean): void {
        if (this._canBeSelected(tabIndex)) {
            timer(10)
                .pipe(takeUntil(this._onDestroy$))
                .subscribe(() => {
                    this._openTab(tabIndex);
                    this.selectedIndex = tabIndex;
                    if (emitEvent) {
                        this.selectedIndexChange.emit(tabIndex);
                    }
                    this._detectChanges();
                });
        }
    }

    /** @hidden */
    tabHeaderClickHandler(tabIndex: number): void {
        if (tabIndex !== this.selectedIndex) {
            this.selectTab(tabIndex, true);
        }
    }

    /** @hidden */
    tabHeaderKeyHandler(index: number, event: any): void {
        this._tabsService.tabHeaderKeyHandler(
            index,
            event,
            this.tabLinks.map(tab => tab.elementRef.nativeElement)
        );
    }

    /** @hidden */
    private _listenOnTabSelect(): void {
        this._tabsService.tabSelected
            .pipe(
                takeUntil(this._onDestroy$),
                filter(index => index !== this.selectedIndex)
            )
            .subscribe((index) => this.selectTab(index, true));
    }

    /**
     * @hidden
     * Every time any of query is changed, ex. tab is removed or added
     * reference to keydown subscriptions handler is renewed
     */
    private _listenOnContentQueryListChange(): void {
        this.panelTabs.changes
            .pipe(
                takeUntil(this._onDestroy$),
                filter(() => !this._isIndexInRange(this.selectedIndex) || this._isAnyTabExpanded())
            )
            .subscribe(() => this._resetTabHook());
    }

    /** @hidden */
    private _listenOnPropertiesChange(): void {
        merge(this._tabsService.tabPanelPropertyChanged, this.panelTabs.changes)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._detectChanges());
    }

    /** @hidden */
    private _isIndexInRange(index: number): boolean {
        return this.panelTabs && this.panelTabs.length > 0 && index < this.panelTabs.length;
    }

    /** @hidden */
    private _isAnyTabExpanded(): boolean {
        return !this.panelTabs.some((tab) => tab.expanded);
    }

    /** @hidden */
    private _resetTabHook(): void {
        this.selectTab(0, true);
    }

    private _detectChanges(): void {
        if (this._changeRef && !this._changeRef['destroyed']) {
            this._changeRef.detectChanges();
        }
    }

    private _isDisabled(index: number): boolean {
        return this.panelTabs.toArray()[index].disabled;
    }

    private _canBeSelected(index: number): boolean {
        return this._isIndexInRange(index) && !this._isDisabled(index);
    }

    private _collapseItems(): void {
        const capacity = getElementCapacity(this.tabsItemContainer);
        const tabsLimit = this.maxVisibleTabs || Number.MAX_SAFE_INTEGER;
        const totalRequiredWidth = this._tabsWidth.reduce((total, [_, width]) => total + width, 0);

        this._isCollapsed = totalRequiredWidth > capacity || tabsLimit < this._tabsWidth.length;

        const requiredFreeSpace = this._isCollapsed ? this._triggerWidth : 0;
        const visibleElements = [];
        let capacityLeft = capacity;

        for (let i = 0; capacityLeft > requiredFreeSpace && this._tabsWidth.length > i && tabsLimit > i; i++) {
            const [element, width] = this._tabsWidth[i];

            if (capacityLeft - width > requiredFreeSpace) {
                visibleElements.push(element);
            }
            capacityLeft -= width;
        }
        const panelTabs = this.panelTabs.toArray();

        this._tabs = {
            visible: panelTabs.splice(0, visibleElements.length),
            collapsed: panelTabs
        }
    };

    private _collapseOverflowingTabs(): void {
        const source$ = merge(fromEvent(window, 'resize'), this.panelTabs.changes);

        source$.pipe(
            startWith(0),
            debounceTime(100),
            takeUntil(this._onDestroy$)
        ).subscribe(_ => {
            this._collapseItems();
            this._changeRef.detectChanges();
        })
    }

    private _cacheTabsDimensions(tabItems: TabItemDirective[]): void {
        this._triggerWidth = Math.ceil(getElementWidth(this.expandTabsTrigger));
        this._tabsWidth = tabItems.map(item => [item, Math.ceil(getElementWidth(item.elementRef(), true))]);
    }

    private _setupCollapsingOverflowedTabs(): void {
        if (this.collapseOverflow) {
            this._cacheTabsDimensions(this.tabItems.toArray());
            this._collapseOverflowingTabs();
        } else {
            this._isCollapsed = false;
        }
    }

    private _openTab(index: number): void {
        if (this.stackContent) {
            this.panelTabs.toArray()[index]?.elementRef.nativeElement.scrollIntoView(true);
        } else {
            this.panelTabs.forEach((tab, i) => tab.triggerExpandedPanel(i === index));
        }
    }

    private _setupStackedContent(): void {
        if (this.stackContent) {
            this.panelTabs.forEach(tab => tab.triggerExpandedPanel(true));
        }
    }
}
