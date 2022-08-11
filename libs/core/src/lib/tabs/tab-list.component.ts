import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { OverflowLayoutComponent } from '@fundamental-ngx/core/overflow-layout';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, filter, first, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { DestroyedService, KeyUtil, scrollTop } from '@fundamental-ngx/core/utils';
import { TabItemExpandComponent } from './tab-item-expand/tab-item-expand.component';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabInfo } from './tab-utils/tab-info.class';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { MenuComponent } from '@fundamental-ngx/core/menu';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';

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
    providers: [contentDensityObserverProviders(), DestroyedService]
})
export class TabListComponent implements AfterContentInit, AfterViewInit, OnDestroy {
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
    collapseOverflow = true;

    /** Limits the maximum number of tabs visible in the tab bar in collapseOverflow mode.
     * Other tabs will be moved to the collapsed tabs dropdown */
    @Input()
    maxVisibleTabs = Infinity;

    /** Whether to open tab content one under another without collapsing */
    @Input()
    stackContent = false;

    /** Maximum height of the content */
    @Input()
    maxContentHeight = '100%';

    /** Whether to enable collapsing expanded tab on expanded tab click */
    @Input()
    collapsibleTabs = false;

    /**
     * @deprecated use i18n capabilities instead
     * Text visible in expand overflow trigger
     */
    @Input()
    expandOverflowText: string;

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedTabChange = new EventEmitter<TabPanelComponent>();

    /** Event emitted when visible items count has been changed. */
    @Output()
    visibleItemsCount = new EventEmitter<number>();

    /** Event emitted when hidden items count has been changed. */
    @Output()
    hiddenItemsCount = new EventEmitter<number>();

    /** @hidden */
    @ContentChildren(forwardRef(() => TabPanelComponent))
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

    @ViewChild(OverflowLayoutComponent)
    private _overflowLayout: OverflowLayoutComponent;

    /** @hidden Collection of tabs in original order */
    _tabArray: TabInfo[];

    /** @hidden Whether to disable scroll spy */
    _disableScrollSpy = false;

    /** @hidden */
    _init = true;

    /** Event is thrown always when tab is selected by keyboard actions */
    readonly tabSelected: Subject<number> = new Subject<number>();

    /** Event is thrown always, when some property is changed */
    readonly tabPanelPropertyChanged: Subject<void> = new Subject<void>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private _elRef: ElementRef,
        readonly _contentDensityObserver: ContentDensityObserver,
        private readonly _onDestroy$: DestroyedService
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._setupTabPanelsChangeListeners();
    }

    ngAfterViewInit(): void {
        this._listenOnPropertiesChange();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    _tabHeaderClickHandler(tabPanel: TabPanelComponent): void {
        this._expandTab(tabPanel, !tabPanel.expanded);
    }

    /** @hidden */
    _tabHeaderKeydownHandler(event: KeyboardEvent, tabPanel: TabPanelComponent): void {
        if (!KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            return;
        }

        event.preventDefault();
        this._tabHeaderClickHandler(tabPanel);
    }

    /** @hidden */
    _overflowingTabHeaderClickHandler(tabPanel: TabPanelComponent): void {
        this._tabArray.forEach((tab) => {
            tab.panel._forcedVisibility = tab.panel === tabPanel;
        });

        this._expandTab(tabPanel, true, false);

        this._overflowLayout.triggerRecalculation();

        this._detectChanges();
    }

    /** @hidden */
    _highlightActiveTab({ id }: HTMLElement): void {
        const tab = this._tabArray.find((_tab) => _tab.id === id);
        if (tab) {
            this._activateStackedTab(tab.panel, false);
            this.selectedTabChange.emit(tab.panel);
        }
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
            map((tabPanels) => tabPanels.toArray(), takeUntil(this._onDestroy$))
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

    /** @hidden Setup mechanisms required for handling the stacked content behavior */
    private _listenOnTabPanelsAndSetupStackedContent(): void {
        if (this.stackContent) {
            this._tabPanelsChange$
                .pipe(delay(0), takeUntil(this._onDestroy$))
                .subscribe(() =>
                    this._tabArray.filter((tab) => !tab.panel.disabled).forEach((tab) => tab.panel._expand(true))
                );
        }
    }

    /** @hidden */
    private _listenOnTabPanelsAndUpdateStorageStructures(): void {
        this._tabPanelsChange$
            .pipe(
                map((tabPanels) => tabPanels.map((el) => new TabInfo(el))),
                takeUntil(this._onDestroy$)
            )
            .subscribe((tabs) => {
                this._tabArray = tabs;
            });
    }

    /** @hidden */
    private _listenOnTabPanelsExpandedChange(): void {
        this._tabPanelsChange$
            .pipe(
                map((tabPanels) => tabPanels.map((el) => el._expandedStateChange.asObservable())),
                switchMap((tabPanels) => merge(...tabPanels)),
                takeUntil(this._onDestroy$)
            )
            .subscribe((event) => this._expandTab(event.target, event.state));
    }

    /** @hidden */
    private _listenOnTabPanelsAndInitiallyExpandTabPanel(): void {
        this._tabPanelsChange$
            .pipe(
                filter(() => !this._tabArray.some((tab) => tab.active)),
                map(() => this._tabArray.find((tab) => !tab.disabled)),
                filter((tab) => !!tab),
                delay(0),
                takeUntil(this._onDestroy$)
            )
            .subscribe((tab) => tab && this._expandTab(tab.panel, true));
    }

    /** @hidden */
    private _listenOnPropertiesChange(): void {
        merge(this.tabPanelPropertyChanged, this.tabPanels.changes)
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._detectChanges());
    }

    /** @hidden */
    private _activateStackedTab(tabPanel: TabPanelComponent, scroll = true): void {
        if (scroll) {
            this._scrollToPanel(tabPanel);
        }
        this._tabArray.forEach((tab) => {
            tab.active = tab.panel === tabPanel;
        });
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
                .pipe(debounceTime(100), first(), takeUntil(this._onDestroy$))
                .subscribe(() => (this._disableScrollSpy = false));
            scrollTop(containerElement, distanceToScroll);
        }
    }

    /** @hidden Whether tab can be expanded/collapsed */
    private _canChangeExpandState(tabPanel: TabPanelComponent, expand: boolean): boolean {
        return !tabPanel.disabled && expand !== tabPanel.expanded && expand === false ? this.collapsibleTabs : true;
    }
}
