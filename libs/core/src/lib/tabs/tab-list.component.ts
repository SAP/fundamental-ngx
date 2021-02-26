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
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, filter, first, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { getElementCapacity, getElementWidth, KeyUtil } from '../utils/functions';
import { TabItemExpandComponent } from './tab-item-expand/tab-item-expand.component';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabInfo } from './tab-utils/tab-info.class';
import { TabsService } from './tabs.service';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { MenuComponent } from '../menu/menu.component';
import { scrollTop } from '../utils/functions/scroll';
import { ContentDensityService } from '../utils/public_api';

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
export class TabListComponent implements AfterContentInit, AfterViewInit, OnDestroy, OnInit {
    /** Whether user wants to use tab component in compact mode */
    @Input()
    compact: boolean = null;

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

    /** Whether to enable collapsing expanded tab on expanded tab click */
    @Input()
    collapsibleTabs = false;

    /** Text visible in expand overflow trigger */
    @Input()
    expandOverflowText = 'More';

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
    @ViewChild(TabItemExpandComponent, { read: ElementRef })
    overflowTrigger: ElementRef;

    /** @hidden */
    @ViewChild('headerContainer', { read: ElementRef })
    headerContainer: ElementRef;

    /** @hidden */
    @ViewChild('contentContainer', { read: ElementRef, static: true })
    contentContainer: ElementRef;

    /** @hidden Tabs divided into tabs visible in the tab-bar and collapsed */
    _visualOrder: { [key in 'visible' | 'overflowing']: TabInfo[] } = { visible: [], overflowing: [] };

    /** @hidden Width of the expand overflowing tabs trigger */
    _overflowTriggerWidth: number;

    /** @hidden Whether the tabs header is collapsed */
    _isCollapsed = true;

    /** @hidden Collection of tabs in original order */
    _tabArray: TabInfo[];

    /** @hidden Whether to disable scroll spy */
    _disableScrollSpy = false;

    /** @hidden */
    _init = true;

    /** @hidden */
    private _numbOfVisibleTabs: number;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _tabsService: TabsService,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === null && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService.contentDensity.subscribe(density => {
                this.compact = density === 'compact';
                this._changeDetectorRef.detectChanges();
            }))
        }
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._setupTabPanelsChangeListeners();
    }

    ngAfterViewInit(): void {
        this._setupCollapsingOverflowedTabs();
        this._listenOnKeyboardTabSelect();
        this._listenOnPropertiesChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Fits tabs in the tab bar and moves overflowing elements into a dropdown */
    refreshOverflow(): void {
        this._hideOverflowingItems();
        this._keepActiveTabVisible();
    }

    /** @hidden */
    _tabHeaderClickHandler(tabPanel: TabPanelComponent): void {
        this._expandTab(tabPanel, !tabPanel.expanded);
    }

    /** @hidden */
    _overflowingTabHeaderClickHandler(tabPanel: TabPanelComponent): void {
        this._expandTab(tabPanel, true, false);
        this._resetVisualOrder();
        this._keepActiveTabVisible();
        this._detectChanges();
    }

    /** @hidden */
    _tabHeaderKeyHandler(index: number, event: any): void {
        this._tabsService.tabHeaderKeyHandler(
            index,
            event,
            this.tabHeaderLinks.map((tab) => tab.elementRef.nativeElement)
        );
    }

    /** @hidden */
    _highlightActiveTab({ id }: HTMLElement): void {
        const tab = this._tabArray.find((_tab) => _tab.id === id);
        this._activateStackedTab(tab.panel, false);
        this.selectedTabChange.emit(tab.panel);
    }

    /** @hidden */
    _onTriggerKeydown(event: KeyboardEvent, menuRef: MenuComponent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            event.preventDefault();
            menuRef.toggle();
        }
    }

    /** @hidden */
    private get _tabPanelsChange$(): Observable<TabPanelComponent[]> {
        return this.tabPanels.changes.pipe(
            startWith(this.tabPanels),
            takeUntil(this._onDestroy$),
            map((tabPanels) => tabPanels.toArray())
        );
    }

    /** @hidden */
    private _detectChanges(): void {
        if (this._changeDetectorRef && !this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden */
    private _setupTabPanelsChangeListeners(): void {
        this._listenOnTabPanelsAndUpdateStorageStructures();
        this._listenOnTabPanelsAndSetupStackedContent();
        this._listenOnTabPanelsExpandedChange();
        this._listenOnTabPanelsAndInitiallyExpandTabPanel();
    }

    /** @hidden Setup mechanisms required for handling the overflowing tabs behavior */
    private _setupCollapsingOverflowedTabs(): void {
        if (this.collapseOverflow) {
            this._cacheTabsDimensions(this.tabHeaders.toArray());
            this._listenOnTabPanelsChangeAndCollapse();
            this._listenOnResizeAndHideItems();
            this.refreshOverflow();
        } else {
            this._isCollapsed = false;
        }
    }

    /** @hidden Setup mechanisms required for handling the stacked content behavior */
    private _listenOnTabPanelsAndSetupStackedContent(): void {
        if (this.stackContent) {
            this._tabPanelsChange$
                .pipe(delay(0))
                .subscribe(() =>
                    this._tabArray.filter((tab) => !tab.panel.disabled).forEach((tab) => tab.panel._expand(true))
                );
        }
    }

    /** @hidden */
    private _listenOnTabPanelsAndUpdateStorageStructures(): void {
        this._tabPanelsChange$.pipe(map((tabPanels) => tabPanels.map((el) => new TabInfo(el)))).subscribe((tabs) => {
            this._tabArray = tabs;
            this._numbOfVisibleTabs = tabs.length;
            this._resetVisualOrder();
        });
    }

    /** @hidden */
    private _listenOnTabPanelsExpandedChange(): void {
        this._tabPanelsChange$
            .pipe(
                map((tabPanels) => tabPanels.map((el) => el._expandedStateChange.asObservable())),
                switchMap((tabPanels) => merge(...tabPanels))
            )
            .subscribe((event) => this._expandTab(event.target, event.state));
    }

    /** @hidden */
    private _listenOnTabPanelsAndInitiallyExpandTabPanel(): void {
        this._tabPanelsChange$
            .pipe(
                filter((_) => !this._tabArray.some((tab) => tab.active)),
                map((_) => this._tabArray.find((tab) => !tab.disabled)),
                filter((tab) => !!tab),
                delay(0)
            )
            .subscribe((tab) => this._expandTab(tab.panel, true));
    }

    /** @hidden */
    private _listenOnPropertiesChange(): void {
        merge(this._tabsService.tabPanelPropertyChanged, this.tabPanels.changes)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._detectChanges());
    }

    /** @hidden */
    private _listenOnKeyboardTabSelect(): void {
        this._tabsService.tabSelected
            .pipe(
                takeUntil(this._onDestroy$),
                map((index) => this._visualOrder.visible[index].panel)
            )
            .subscribe((tabPanel) => this._expandTab(tabPanel, !tabPanel.expanded));
    }

    /** @hidden */
    private _listenOnResizeAndHideItems(): void {
        fromEvent(window, 'resize')
            .pipe(debounceTime(100), takeUntil(this._onDestroy$))
            .subscribe((_) => {
                this.refreshOverflow();
                this._detectChanges();
            });
    }

    /** @hidden */
    private _listenOnTabPanelsChangeAndCollapse(): void {
        const $tabHeadersSource = this.tabHeaders.changes.pipe(
            map((tabHeaders) => tabHeaders.toArray()),
            first()
        );

        this.tabPanels.changes
            .pipe(
                takeUntil(this._onDestroy$),
                switchMap(() => $tabHeadersSource)
            )
            .subscribe((tabHeaders) => {
                this._cacheTabsWidth(tabHeaders);
                this.refreshOverflow();
                this._detectChanges();
            });
    }

    /** @hidden */
    private _activateStackedTab(tabPanel: TabPanelComponent, scroll = true): void {
        if (scroll) {
            this._scrollToPanel(tabPanel);
        }
        this._tabArray.forEach((tab) => (tab.active = tab.panel === tabPanel));
    }

    /** @hidden */
    private _activateExpandableTab(tabPanel: TabPanelComponent, expand: boolean): void {
        const collapse = this.collapsibleTabs && !expand;
        this._tabArray.forEach((tab) => {
            const isActive = tab.panel === tabPanel && !collapse;
            tab.panel._expand(isActive);
            tab.active = isActive;
        });
    }

    /** @hidden */
    private _expandTab(tabPanel: TabPanelComponent, expand: boolean, detectChanges = true): void {
        if (this.stackContent) {
            this._activateStackedTab(tabPanel);
        } else {
            if (!this._canChangeExpandState(tabPanel, expand)) {
                return;
            }

            this._activateExpandableTab(tabPanel, expand);
        }

        if (detectChanges) {
            this._detectChanges();
        }
        this.selectedTabChange.emit(tabPanel);
    }

    /** @hidden Divides tabs into tabs visible in the header and moved tabs to the dropdown */
    private _hideOverflowingItems(): void {
        const capacity = getElementCapacity(this.headerContainer);
        const tabsLimit = this.maxVisibleTabs || Number.MAX_SAFE_INTEGER;
        const totalRequiredWidth = this._tabArray.reduce((total, tab) => total + tab.headerWidth, 0);

        this._isCollapsed = totalRequiredWidth > capacity || tabsLimit < this._tabArray.length;

        const requiredFreeSpace = this._isCollapsed ? this._overflowTriggerWidth : 0;
        this._numbOfVisibleTabs = 0;
        let capacityLeft = capacity;

        for (let i = 0; capacityLeft > requiredFreeSpace && this._tabArray.length > i && tabsLimit > i; i++) {
            const width = this._tabArray[i].headerWidth;

            if (capacityLeft - width > requiredFreeSpace) {
                this._numbOfVisibleTabs++;
            }
            capacityLeft -= width;
        }
        this._resetVisualOrder();
    }

    /** @hidden Check whether the active tab is visible */
    private _keepActiveTabVisible(): void {
        const activeTab = this._visualOrder.overflowing.find((tab) => tab.active);

        if (activeTab) {
            this._moveToVisible(activeTab);
        }
    }

    /** @hidden Make given tab visible in the tab bar*/
    private _moveToVisible(tabToMove: TabInfo): void {
        const activeTabWidth = tabToMove.headerWidth;
        const numOfVisibleTabs = this._numbOfVisibleTabs;
        const capacity = getElementCapacity(this.headerContainer);
        const tabsLimit = this.maxVisibleTabs || Number.MAX_SAFE_INTEGER;
        const visibleTabsWidth = this._visualOrder.visible.reduce((total, tab) => total + tab.headerWidth, 0);

        let widthRequired = activeTabWidth - (capacity - visibleTabsWidth - this._overflowTriggerWidth);
        let numOfTabsToMove = 0;

        /** As long as:
         * - There is not enough space for tab to move
         * - There are other tabs to move from visible to overflow
         * - Number of visible tabs is larger than the limit */
        for (
            let i = numOfVisibleTabs - 1;
            (widthRequired > 0 && i >= 0) || tabsLimit < numOfVisibleTabs + 1 - numOfTabsToMove;
            i--
        ) {
            widthRequired -= this._tabArray[i].headerWidth;
            numOfTabsToMove++;
        }

        const tabToMoveIndex = this._visualOrder.overflowing.indexOf(tabToMove);
        const [selectedTab] = this._visualOrder.overflowing.splice(tabToMoveIndex, 1);
        const tabsToMove = this._visualOrder.visible.splice(-numOfTabsToMove, numOfTabsToMove, selectedTab);
        this._visualOrder.overflowing.unshift(...tabsToMove);
        this._numbOfVisibleTabs = this._visualOrder.visible.length;
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
    private _resetVisualOrder(): void {
        this._visualOrder = {
            visible: this._tabArray.slice(0, this._numbOfVisibleTabs),
            overflowing: this._tabArray.slice(this._numbOfVisibleTabs)
        };
    }

    /** @hidden */
    private _scrollToPanel(tabPanel: TabPanelComponent): void {
        const panelElement = tabPanel.elementRef.nativeElement;
        const containerElement = this.contentContainer.nativeElement;
        const distanceToScroll = panelElement.offsetTop - containerElement.offsetTop;
        const maximumScrollTop = containerElement.scrollHeight - containerElement.clientHeight;
        const currentScrollPosition = Math.ceil(containerElement.scrollTop);

        if (!(currentScrollPosition === maximumScrollTop && distanceToScroll > maximumScrollTop)) {
            !this._init ? (this._disableScrollSpy = true) : (this._init = false);
            fromEvent(containerElement, 'scroll')
                .pipe(takeUntil(this._onDestroy$), debounceTime(100), first())
                .subscribe(() => (this._disableScrollSpy = false));
            scrollTop(containerElement, distanceToScroll);
        }
    }

    /** @hidden Whether tab can be expanded/collapsed */
    private _canChangeExpandState(tabPanel: TabPanelComponent, expand: boolean): boolean {
        return !tabPanel.disabled && expand !== tabPanel.expanded && expand === false ? this.collapsibleTabs : true;
    }
}
