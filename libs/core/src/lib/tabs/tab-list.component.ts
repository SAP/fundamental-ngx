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
import { debounceTime, filter, first, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
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

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedIndexChange = new EventEmitter<number>();

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
    @ViewChild('headerContainer', { read: ElementRef })
    headerContainer: ElementRef;

    /** @hidden */
    @ViewChild('contentContainer', { read: ElementRef })
    contentContainer: ElementRef;

    /** @hidden */
    @ViewChild('overflowTrigger', { read: ElementRef })
    overflowTrigger: ElementRef;

    /** @hidden Tabs divided into tabs visible in the tab-bar and collapsed */
    _tabs: { [key: string]: TabPanelComponent[] } = { visible: [], overflowing: [] };

    /** @hidden  Cashed tab header items width */
    _tabHeadersWidth: [TabItemDirective, number][];

    /** @hidden Width of the expand overflowing tabs trigger */
    _overflowTriggerWidth: number;

    /** @hidden Whether the tabs header is collapsed */
    _isCollapsed = true;

    /** @hidden */
    _tabPanelsArray: TabPanelComponent[];

    /** @hidden Whether to disable scroll spy */
    _disableScrollSpy = true;

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
     * @param tabIndex - Index of the tab to select.
     * @param emitEvent - Whether to emit tab change event.
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
            this.tabHeaderLinks.map(tab => tab.elementRef.nativeElement)
        );
    }

    _highlightActiveTab({ id }: HTMLElement): void {
        const index = this._tabPanelsArray.findIndex(panel => panel.id === id);
        this.selectedIndex = index;
        this.selectedIndexChange.emit(index);
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
        this.tabPanels.changes
            .pipe(
                takeUntil(this._onDestroy$),
                filter(() => !this._isIndexInRange(this.selectedIndex) || this._isAnyTabExpanded())
            )
            .subscribe(() => this._resetTabHook());
    }

    /** @hidden */
    private _listenOnPropertiesChange(): void {
        merge(this._tabsService.tabPanelPropertyChanged, this.tabPanels.changes)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._detectChanges());
    }

    /** @hidden */
    private _isIndexInRange(index: number): boolean {
        return this.tabPanels && this.tabPanels.length > 0 && index < this.tabPanels.length;
    }

    /** @hidden */
    private _isAnyTabExpanded(): boolean {
        return !this.tabPanels.some((tab) => tab.expanded);
    }

    /** @hidden */
    private _resetTabHook(): void {
        this.selectTab(0, true);
    }

    /** @hidden */
    private _detectChanges(): void {
        if (this._changeDetectorRef && !this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }

    /** @hidden */
    private _isDisabled(index: number): boolean {
        return this._tabPanelsArray[index].disabled;
    }

    /** @hidden */
    private _canBeSelected(index: number): boolean {
        return this._isIndexInRange(index) && !this._isDisabled(index);
    }

    /** @hidden Divides tabs into visible in the header and moved to the dropdown */
    private _hideOverflowingItems(): void {
        const capacity = getElementCapacity(this.headerContainer);
        const tabsLimit = this.maxVisibleTabs || Number.MAX_SAFE_INTEGER;
        const totalRequiredWidth = this._tabHeadersWidth.reduce((total, [_, width]) => total + width, 0);

        this._isCollapsed = totalRequiredWidth > capacity || tabsLimit < this._tabHeadersWidth.length;

        const requiredFreeSpace = this._isCollapsed ? this._overflowTriggerWidth : 0;
        const visibleElements = [];
        let capacityLeft = capacity;

        for (let i = 0; capacityLeft > requiredFreeSpace && this._tabHeadersWidth.length > i && tabsLimit > i; i++) {
            const [element, width] = this._tabHeadersWidth[i];

            if (capacityLeft - width > requiredFreeSpace) {
                visibleElements.push(element);
            }
            capacityLeft -= width;
        }
        const tabPanels = [...this._tabPanelsArray];

        this._tabs = {
            visible: tabPanels.splice(0, visibleElements.length),
            overflowing: tabPanels
        }
    };

    /** @hidden */
    private _listenOnResizeAndHideItems(): void {
        fromEvent(window, 'resize').pipe(
            debounceTime(100),
            takeUntil(this._onDestroy$)
        ).subscribe(_ => {
            this._hideOverflowingItems();
            this._changeDetectorRef.detectChanges();
        })
    }

    /** @hidden Setup mechanisms required for handling the overflowing tabs behavior */
    private _setupCollapsingOverflowedTabs(): void {
        if (this.collapseOverflow) {
            this._cacheTabsDimensions(this.tabHeaders.toArray());
            this._listenOnTabPanelsChangeAndCollapse();
            this._listenOnResizeAndHideItems();
            this._hideOverflowingItems();
        } else {
            this._isCollapsed = false;
        }
    }

    /** @hidden Caches width dimension of the elements in the tabs header */
    private _cacheTabsDimensions(tabHeaders: TabItemDirective[]): void {
        this._overflowTriggerWidth = Math.ceil(getElementWidth(this.overflowTrigger));
        this._cacheTabsWidth(tabHeaders);
    }

    /** @hidden Caches the width of the tabs */
    private _cacheTabsWidth(tabHeaders: TabItemDirective[]): void {
        this._tabHeadersWidth = tabHeaders.map(item => [item, Math.ceil(getElementWidth(item.elementRef(), true))]);
    }

    /** @hidden Open tab */
    private _openTab(index: number): void {
        if (this.stackContent) {
            this._scrollToPanel(index);
        } else {
            this.tabPanels.forEach((tab, i) => tab.triggerExpandedPanel(i === index));
        }
    }

    /** @hidden Setup mechanisms required for handling the stacked content behavior */
    private _setupStackedContent(): void {
        if (this.stackContent) {
            timer(10)
                .subscribe(() => this.tabPanels.forEach(tab => tab.triggerExpandedPanel(true)))
        }
    }

    /** @hidden */
    private _scrollToPanel(index: number): void {
        const containerElement = this.contentContainer.nativeElement;
        const panelElement = this._tabPanelsArray[index].elementRef.nativeElement;
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

    private _listenOnTabPanelsChange(): void {
        this.tabPanels.changes.pipe(
            startWith(this.tabPanels),
            takeUntil(this._onDestroy$),
            map(tabPanels => tabPanels.toArray())
        ).subscribe(tabPanels => {
            this._tabPanelsArray = tabPanels;
            this._tabs = { visible: tabPanels, overflowing: [] };
        })
    }

    private _listenOnTabPanelsChangeAndCollapse(): void {
        const $tabHeadersSource = this.tabHeaders.changes.pipe(
            map(tabHeaders => tabHeaders.toArray()),
            first()
        );

        this.tabPanels.changes.pipe(
            takeUntil(this._onDestroy$),
            switchMap(() => $tabHeadersSource),
        ).subscribe(tabHeaders => {
            this._cacheTabsWidth(tabHeaders);
            this._hideOverflowingItems();
            this._changeDetectorRef.detectChanges();
        });
    }
}
