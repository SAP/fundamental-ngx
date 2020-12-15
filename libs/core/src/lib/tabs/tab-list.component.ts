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
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, first, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { getElementCapacity, getElementWidth } from '../utils/functions';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabInfo } from './tab-utils/tab-info.class';
import { TabsService } from './tabs.service';

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
export class TabListComponent implements AfterContentInit, AfterViewInit, OnDestroy {
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

    /** Whether to move tabs overflowing in the tab bar to the dropdown */
    @Input()
    collapseOverflow = false;

    /** Limits the maximum number of tabs visible in the tab bar in collapseOverflow mode.
     * Other tabs will be moved to the collapsed tabs dropdown */
    @Input()
    maxVisibleTabs: number = null;

    /** Whether to open tab content one under another without collapsing */
    @Input()
    stackContent = false;

    /** Maximum height of the content */
    @Input()
    maxContentHeight = '100%';

    /** Whether to enable reordering tabs in the tab header */
    @Input()
    enableReordering = false;

    /** Whether to enable collapsing active tab on active tab click */
    @Input()
    expandableTabs = false;

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedTabChange = new EventEmitter<TabPanelComponent>();

    /** @hidden */
    @ContentChildren(TabPanelComponent)
    tabPanels: QueryList<TabPanelComponent>;

    /** @hidden */
    @ViewChildren(TabLinkDirective)
    tabHeaderLinks: QueryList<TabLinkDirective>;

    /** @hidden */
    @ViewChildren(TabItemDirective)
    tabHeaders: QueryList<TabItemDirective>;

    /** @hidden */
    @ViewChild('overflowTrigger', { read: ElementRef })
    overflowTrigger: ElementRef;

    /** @hidden */
    @ViewChild('headerContainer', { read: ElementRef })
    headerContainer: ElementRef;

    /** @hidden */
    @ViewChild('contentContainer', { read: ElementRef, static: true })
    contentContainer: ElementRef;

    /** @hidden Tabs divided into tabs visible in the tab-bar and collapsed */
    _tabs: { [key in 'visible' | 'overflowing']: TabInfo[] } = { visible: [], overflowing: [] };

    /** @hidden Width of the expand overflowing tabs trigger */
    _overflowTriggerWidth: number;

    /** @hidden Whether the tabs header is collapsed */
    _isCollapsed = true;

    /** @hidden */
    _tabArray: TabInfo[];

    /** @hidden Whether to disable scroll spy */
    _disableScrollSpy = false;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(private _tabsService: TabsService, private _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._listenOnTabPanelsChange();
        this._setupStackedContent();
    }

    ngAfterViewInit(): void {
        this._setupCollapsingOverflowedTabs();
        this._listenOnKeyboardTabSelect();
        this._listenOnPropertiesChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    _tabHeaderClickHandler(tabPanel: TabPanelComponent): void {
        this._expandTab(tabPanel, !tabPanel.expanded);
    }

    /** @hidden */
    _overflowingTabHeaderClickHandler(tabPanel: TabPanelComponent): void {
        this._expandTab(tabPanel, true);
        this._keepActiveTabVisible();
        this._changeDetectorRef.detectChanges();
    }

    /** @hidden */
    _tabHeaderKeyHandler(index: number, event: any): void {
        this._tabsService.tabHeaderKeyHandler(
            index,
            event,
            this.tabHeaderLinks.map(tab => tab.elementRef.nativeElement)
        );
    }

    /** @hidden */
    _highlightActiveTab({ id }: HTMLElement): void {
        const tab = this._tabArray.find(_tab => _tab.id === id);
        this._activateStackedContentTab(tab.panel, false);
        this.selectedTabChange.emit(tab.panel);
    }

    /** @hidden */
    private _listenOnKeyboardTabSelect(): void {
        this._tabsService.tabSelected
            .pipe(
                takeUntil(this._onDestroy$),
                map(index => this._tabs.visible[index]?.panel),
                filter(tabPanel => !!tabPanel)
            ).subscribe(tabPanel => this._expandTab(tabPanel, !tabPanel.expanded));
    }

    /** @hidden */
    private _detectChanges(): void {
        if (this._changeDetectorRef && !this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden Setup mechanisms required for handling the stacked content behavior */
    private _setupStackedContent(): void {
        if (this.stackContent) {
            this._tabArray
                .filter(tab => !tab.panel.disabled)
                .forEach(tab => tab.panel._expand(true));
        }
    }

    /** @hidden TODO: IMPROVE*/
    private _expandTab(tabPanel: TabPanelComponent, expand: boolean): void {
        if (this.stackContent) {
            this._activateStackedContentTab(tabPanel);
        } else {
            if (!this._canChangeExpandState(tabPanel, expand)) {
                return;
            }

            const collapse = this.expandableTabs && !expand;
            this._tabArray.forEach(el => {
                const isActive = el.panel === tabPanel && !collapse;
                el.panel._expand(isActive);
                el.active = isActive;
            });
            this._changeDetectorRef.detectChanges();
        }

        this.selectedTabChange.emit(tabPanel);
    }

    /** @hidden */
    private _listenOnPropertiesChange(): void {
        this._tabsService.tabPanelPropertyChanged
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._detectChanges());
    }

    /** @hidden Setup mechanisms required for handling the overflowing tabs behavior */
    private _setupCollapsingOverflowedTabs(): void {
        if (this.collapseOverflow) {
            this._cacheTabsDimensions(this.tabHeaders.toArray());
            this._listenOnTabPanelsChangeAndCollapse();
            this._listenOnResizeAndHideItems();
            this._hideOverflowingItems();
            this._keepActiveTabVisible();
        } else {
            this._isCollapsed = false;
        }
    }

    /** @hidden */
    private _listenOnResizeAndHideItems(): void {
        fromEvent(window, 'resize').pipe(
            debounceTime(100),
            takeUntil(this._onDestroy$)
        ).subscribe(_ => {
            this._hideOverflowingItems();
            this._keepActiveTabVisible();
            this._changeDetectorRef.detectChanges();
        })
    }

    /** @hidden */
    private _listenOnTabPanelsChangeAndCollapse(): void {
        const $tabHeadersSource = this.tabHeaders.changes.pipe(
            map(tabHeaders => tabHeaders.toArray()),
            first()
        );

        this.tabPanels.changes.pipe(
            takeUntil(this._onDestroy$),
            switchMap(() => $tabHeadersSource)
        ).subscribe(tabHeaders => {
            this._cacheTabsWidth(tabHeaders);
            this._hideOverflowingItems();
            this._keepActiveTabVisible();
            this._changeDetectorRef.detectChanges();
        });
    }

    /** @hidden Divides tabs into tabs visible in the header and moved tabs to the dropdown */
    private _hideOverflowingItems(): void {
        const capacity = getElementCapacity(this.headerContainer);
        const tabsLimit = this.maxVisibleTabs || Number.MAX_SAFE_INTEGER;
        const totalRequiredWidth = this._tabArray.reduce((total, tab) => total + tab.headerWidth, 0);

        this._isCollapsed = totalRequiredWidth > capacity || tabsLimit < this._tabArray.length;

        const requiredFreeSpace = this._isCollapsed ? this._overflowTriggerWidth : 0;
        let numOfVisibleElements = 0;
        let capacityLeft = capacity;

        for (let i = 0; capacityLeft > requiredFreeSpace && this._tabArray.length > i && tabsLimit > i; i++) {
            const width = this._tabArray[i].headerWidth;

            if (capacityLeft - width > requiredFreeSpace) {
                numOfVisibleElements++;
            }
            capacityLeft -= width;
        }

        this._tabs = {
            visible: this._tabArray.slice(0, numOfVisibleElements),
            overflowing: this._tabArray.slice(numOfVisibleElements)
        };
    };

    /** @hidden Check whether the active tab is visible */
    private _keepActiveTabVisible(): void {
        const activeTab = this._tabs.overflowing.find(tab => tab.active);

        if (activeTab) {
            this._moveToVisible(activeTab);
        }
    }

    /** @hidden Make given tab visible in the tab bar*/
    private _moveToVisible(tabToMove: TabInfo): void {
        const activeTabWidth = tabToMove.headerWidth;
        const numOfVisibleTabs = this._tabs.visible.length;
        const capacity = getElementCapacity(this.headerContainer);
        const tabsLimit = this.maxVisibleTabs || Number.MAX_SAFE_INTEGER;

        const visibleTabsWidth = this._tabs.visible.reduce((total, tab) => total + tab.headerWidth, 0);

        let widthRequired = activeTabWidth - (capacity - visibleTabsWidth - this._overflowTriggerWidth);
        let numOfTabsToMove = 0;

        for (let i = numOfVisibleTabs - 1; (widthRequired > 0 || numOfVisibleTabs - numOfTabsToMove + 1 < tabsLimit) && i >= 0; i--) {
            widthRequired -= this._tabArray[i].headerWidth;
            numOfTabsToMove++;
        }

        const tabToMoveIndex = this._tabs.overflowing.indexOf(tabToMove);
        const [selectedTab] = this._tabs.overflowing.splice(tabToMoveIndex, 1);
        const tabsToMove = this._tabs.visible.splice(-numOfTabsToMove, numOfTabsToMove, selectedTab);
        this._tabs.overflowing.unshift(...tabsToMove);
    }

    /** @hidden */
    private _listenOnTabPanelsChange(): void {
        const $tabPanelsSource: Observable<TabPanelComponent[]> = this.tabPanels.changes.pipe(
            startWith(this.tabPanels),
            takeUntil(this._onDestroy$),
            map(tabPanels => tabPanels.toArray())
        );

        // Update tab storage structures
        $tabPanelsSource.pipe(
            map(tabPanels => tabPanels.map(el => new TabInfo(el)))
        ).subscribe(tabs => {
            this._tabArray = tabs;
            this._tabs = { visible: tabs, overflowing: [] };
            this._changeDetectorRef.detectChanges();
        });

        // Subscribe to tab panels events
        $tabPanelsSource.pipe(
            map(tabPanels => tabPanels.map(el => el._expandedStateChange.asObservable())),
            switchMap(tabPanels => merge(...tabPanels))
        ).subscribe(event => this._expandTab(event.target, event.state));

        // Expand first panel if no panels expanded
        $tabPanelsSource.pipe(
            filter(tabPanels => !tabPanels.some(el => el.expanded)),
            map(tabPanels => tabPanels.find(el => !el.disabled)),
            filter(tabPanel => !!tabPanel)
        ).subscribe(tabPanel => this._expandTab(tabPanel, true));
    }

    /** @hidden Caches width dimension of the elements in the tabs header */
    private _cacheTabsDimensions(tabHeaders: TabItemDirective[]): void {
        this._overflowTriggerWidth = Math.ceil(getElementWidth(this.overflowTrigger));
        this._cacheTabsWidth(tabHeaders);
    }

    /** @hidden Caches the width of the tabs */
    private _cacheTabsWidth(tabHeaders: TabItemDirective[]): void {
        tabHeaders.forEach((item, i) => {
            this._tabArray[i].headerWidth = Math.ceil(getElementWidth(item.elementRef(), true));
        });
    }

    /** @hidden */
    private _scrollToPanel(tabPanel: TabPanelComponent): void {
        const panelElement = tabPanel.elementRef.nativeElement;
        const containerElement = this.contentContainer.nativeElement;
        const distanceToScroll = panelElement.offsetTop - containerElement.offsetTop;
        const maximumScrollTop = containerElement.scrollHeight - containerElement.clientHeight;
        const currentScrollPosition = Math.ceil(containerElement.scrollTop);

        if (!(currentScrollPosition === maximumScrollTop && distanceToScroll > maximumScrollTop)) {
            this._disableScrollSpy = true;
            fromEvent(containerElement, 'scroll')
                .pipe(
                    takeUntil(this._onDestroy$),
                    debounceTime(100),
                    first()
                ).subscribe(() => this._disableScrollSpy = false);

            containerElement.scrollTo({ top: distanceToScroll, behavior: 'smooth' });
        }
    }

    /** @hidden Whether tab can be expanded/collapsed */
    private _canChangeExpandState(tabPanel: TabPanelComponent, expand: boolean): boolean {
        return !tabPanel.disabled
        && expand !== tabPanel.expanded
        && expand === false ? this.expandableTabs : true;
    }

    /** @hidden */
    private _activateStackedContentTab(tabPanel: TabPanelComponent, scroll = true): void {
        if (scroll) {
            this._scrollToPanel(tabPanel);
        }
        this._tabArray.forEach(tab => tab.active = tab.panel === tabPanel);
    }
}
