import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CdkScrollable } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
    forwardRef,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, Nullable, scrollTop, warnOnce } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import {
    MenuComponent,
    MenuInteractiveComponent,
    MenuItemComponent,
    MenuTitleDirective,
    MenuTriggerDirective
} from '@fundamental-ngx/core/menu';
import {
    OverflowExpandDirective,
    OverflowItemRefDirective,
    OverflowLayoutComponent,
    OverflowLayoutFocusableItemDirective,
    OverflowLayoutItemDirective
} from '@fundamental-ngx/core/overflow-layout';
import { ScrollSpyDirective } from '@fundamental-ngx/core/scroll-spy';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { FD_TABLIST, TabList } from '@fundamental-ngx/core/shared';
import { Observable, Subject, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime, delay, filter, first, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { TabItemExpandComponent } from './tab-item-expand/tab-item-expand.component';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabListComponentInterface } from './tab-list-component.interface';
import { LIST_COMPONENT } from './tab-list.token';
import { TabPanelComponent } from './tab-panel/tab-panel.component';
import {
    TabCountDirective,
    TabCounterHeaderDirective,
    TabHeaderDirective,
    TabIconComponent,
    TabLabelDirective,
    TabProcessDirective,
    TabProcessIconDirective,
    TabSeparatorDirective,
    TabTagDirective
} from './tab-utils/tab-directives';
import { TabInfo } from './tab-utils/tab-info.class';

export type TabModes = 'icon-only' | 'process' | 'filter';

export type TabSizes = 's' | 'm' | 'l' | 'xl' | 'xxl';

/**
 * Represents a list of tab-panels.
 * @deprecated
 * Use `@fundamental-ngx/platform/icon-tab-bar` instead
 */
@Component({
    selector: 'fd-tab-list',
    templateUrl: './tab-list.component.html',
    styleUrl: './tab-list.component.scss',
    host: {
        class: 'fd-tabs-custom'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        contentDensityObserverProviders(),
        {
            provide: LIST_COMPONENT,
            useExisting: TabListComponent
        },
        {
            provide: FD_TABLIST,
            useExisting: TabListComponent
        }
    ],
    imports: [
        OverflowLayoutComponent,
        OverflowItemRefDirective,
        TabItemDirective,
        OverflowLayoutItemDirective,
        TabLinkDirective,
        OverflowLayoutFocusableItemDirective,
        NgTemplateOutlet,
        TabHeaderDirective,
        TabCounterHeaderDirective,
        TabLabelDirective,
        TabIconComponent,
        TabCountDirective,
        TabProcessDirective,
        TabTagDirective,
        TabProcessIconDirective,
        TabSeparatorDirective,
        OverflowExpandDirective,
        TabItemExpandComponent,
        MenuTriggerDirective,
        MenuComponent,
        MenuItemComponent,
        MenuInteractiveComponent,
        ScrollSpyDirective,
        CdkScrollable,
        ScrollbarDirective,
        MenuTitleDirective
    ]
})
export class TabListComponent
    implements TabListComponentInterface, AfterContentInit, AfterViewInit, OnDestroy, TabList
{
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

    /** Initially selected tab (by id). First not disabled one if not specified. */
    @Input()
    defaultTab: Nullable<string>;

    /** Whether to try to keep selected tab (default value) on tabs change or to select default one (first if not specified). */
    @Input()
    selectDefaultOnTabsChange = false;

    /** Whether to focus the first focusable element in a tab panel when using stacked tabs. */
    @Input()
    focusFirstFocusableElement = true;

    /** Event emitted when the selected panel changes. */
    @Output()
    selectedTabChange = new EventEmitter<TabPanelComponent>();

    /** Event emitted when the selected panel index changes. */
    @Output()
    selectedTabIndexChange = new EventEmitter<number>();

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
    @ViewChild(ScrollbarDirective)
    _scrollbar: ScrollbarDirective;

    /** @hidden */
    @ViewChild('menu', { read: MenuComponent })
    menu: MenuComponent;

    /** @hidden */
    @ViewChild(OverflowLayoutComponent)
    private _overflowLayout: OverflowLayoutComponent;

    /** @hidden */
    @ViewChild('scrollSpy', { read: ScrollSpyDirective })
    private readonly _scrollSpy: Nullable<ScrollSpyDirective>;

    /** @hidden */
    get contentContainer(): ElementRef<HTMLElement> {
        return this._scrollbar?.elementRef;
    }

    /** @hidden Collection of tabs in original order */
    _tabArray: TabInfo[] = [];

    /** @hidden Whether to disable scroll spy */
    _disableScrollSpy = false;

    /** @hidden */
    _init = true;

    /** @hidden */
    _currentNumberOfTabs = 0;

    /** Scrollable element reference. */
    get scrollableElement(): Nullable<ElementRef> {
        return this._scrollbar?.elementRef;
    }

    /** Event is thrown always when tab is selected by keyboard actions */
    readonly tabSelected: Subject<number> = new Subject<number>();

    /** Event is thrown always, when some property is changed */
    readonly tabPanelPropertyChanged: Subject<void> = new Subject<void>();

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private readonly _zone = inject(NgZone);

    /** @hidden */
    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        readonly _contentDensityObserver: ContentDensityObserver,
        private readonly _destroyRef: DestroyRef
    ) {
        warnOnce('TabListComponent is deprecated, use `@fundamental-ngx/platform/icon-tab-bar` instead');
    }

    /** @hidden */
    ngAfterContentInit(): void {
        this._setupTabPanelsChangeListeners();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initStackContentSubscription();
        this._listenOnTabPanelsExpandedChange();
        this._listenOnTabPanelsAndInitiallyExpandTabPanel();
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
    selectTab(id: Nullable<string>): void {
        this.highlightActiveTab(id);
    }

    /** @hidden */
    highlightActiveTab(id: Nullable<string>): void {
        const tab = this._tabArray.find((_tab) => _tab.panel._panelId === id);
        if (tab) {
            const _tabWasActive = tab.active;
            this._activateStackedTab(tab.panel, false);
            if (!_tabWasActive) {
                this._selectedTabChange(tab.panel);
            }
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
            map((tabPanels) => tabPanels.toArray()),
            takeUntilDestroyed(this._destroyRef)
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
    }

    /** @hidden Setup mechanisms required for handling the stacked content behavior */
    private _initStackContentSubscription(): void {
        this._tabPanelsChange$
            .pipe(
                filter(() => this.stackContent),
                delay(0),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() =>
                this._tabArray.filter((tab) => !tab.panel.disabled).forEach((tab) => tab.panel._expand(true))
            );
    }

    /** @hidden */
    private _listenOnTabPanelsAndUpdateStorageStructures(): void {
        this._tabPanelsChange$
            .pipe(
                map((tabPanels) =>
                    tabPanels.map((el) => this._tabArray?.find((tabInfo) => tabInfo.panel === el) || new TabInfo(el))
                ),
                tap((tabs) => (this._tabArray = tabs)),
                switchMap(() => this._zone.onStable.pipe(startWith(this._zone.isStable))),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(() => {
                if (this.stackContent && this._currentNumberOfTabs !== this._tabArray.length) {
                    this._zone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
                        this._scrollSpy?.onScroll(undefined, true);
                        this._currentNumberOfTabs = this._tabArray.length;
                    });
                }
            });
    }

    /** @hidden */
    private _listenOnTabPanelsExpandedChange(): void {
        this._tabPanelsChange$
            .pipe(
                map((tabPanels) => tabPanels.map((tab) => tab._expandedStateChange.asObservable())),
                switchMap((tabPanels) => merge(...tabPanels)),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((event) => {
                this._tabArray.forEach((tab) => {
                    tab.panel._forcedVisibility = tab.panel === event.target;
                });
                this._expandTab(event.target, event.state);
                this._overflowLayout.triggerRecalculation();
            });
    }

    /** @hidden */
    private _listenOnTabPanelsAndInitiallyExpandTabPanel(): void {
        this._tabPanelsChange$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            const activeTab = this._tabArray.find((_tab) => _tab.active);
            let tab: Nullable<TabInfo>;

            if (!activeTab || this.selectDefaultOnTabsChange) {
                if (this.defaultTab) {
                    tab = this._tabArray.find((_tab) => !_tab.disabled && _tab.id === this.defaultTab);
                }

                if (!tab) {
                    tab = this._tabArray.find((_tab) => !_tab.disabled);
                }
            }

            if (tab && activeTab !== tab) {
                this._expandTab(tab.panel, true);
            }
        });
    }

    /** @hidden */
    private _listenOnPropertiesChange(): void {
        merge(this.tabPanelPropertyChanged, this.tabPanels.changes)
            .pipe(takeUntilDestroyed(this._destroyRef))
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

        this._selectedTabChange(tabPanel);
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
                .pipe(debounceTime(100), first(), takeUntilDestroyed(this._destroyRef))
                .subscribe(() => (this._disableScrollSpy = false));
            scrollTop(containerElement, distanceToScroll);
        }

        if (this.focusFirstFocusableElement) {
            tabPanel._focusFirstFocusableElement();
        }
    }

    /** @hidden Whether tab can be expanded/collapsed */
    private _canChangeExpandState(tabPanel: TabPanelComponent, expand: boolean): boolean {
        return !tabPanel.disabled && expand !== tabPanel.expanded && expand === false ? this.collapsibleTabs : true;
    }

    /** @hidden */
    private _selectedTabChange(tabPanel: TabPanelComponent): void {
        this.selectedTabChange.emit(tabPanel);

        const index = this._tabArray.findIndex((tabInfo) => tabInfo.panel === tabPanel);
        this.selectedTabIndexChange.emit(index);
    }
}
