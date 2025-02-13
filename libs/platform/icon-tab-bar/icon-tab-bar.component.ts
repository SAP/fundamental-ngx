import { NgTemplateOutlet } from '@angular/common';
import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    contentChildren,
    DestroyRef,
    ElementRef,
    HostBinding,
    inject,
    Input,
    input,
    model,
    OnInit,
    Optional,
    output,
    signal,
    viewChild,
    viewChildren,
    ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentDensityService, Nullable, RtlService, scrollTop } from '@fundamental-ngx/cdk/utils';
import { FD_DYNAMIC_PAGE } from '@fundamental-ngx/core/dynamic-page';
import { IconFont } from '@fundamental-ngx/core/icon';
import { ScrollSpyDirective } from '@fundamental-ngx/core/scroll-spy';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { FD_TABLIST, TabList } from '@fundamental-ngx/core/shared';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { IconTabBarBase } from './components';
import { IconTabBarFilterTypeComponent } from './components/icon-tab-bar-filter-type/icon-tab-bar-filter-type.component';
import { IconTabBarIconTypeComponent } from './components/icon-tab-bar-icon-type/icon-tab-bar-icon-type.component';
import { IconTabBarProcessTypeComponent } from './components/icon-tab-bar-process-type/icon-tab-bar-process-type.component';
import {
    IconTabBarTabComponent,
    IconTabBarTabContentDirective
} from './components/icon-tab-bar-tab/icon-tab-bar-tab.component';
import { IconTabBarTextTypeComponent } from './components/icon-tab-bar-text-type/icon-tab-bar-text-type.component';
import { UNIQUE_KEY_SEPARATOR } from './constants';
import { IconTabBarItem } from './interfaces/icon-tab-bar-item.interface';
import { TabColorAssociations } from './interfaces/tab-color-associations.interface';
import { TabConfig } from './interfaces/tab-config.interface';
import { IconTabBarBackground, IconTabBarSize, TabDestinyMode, TabType } from './types';

@Component({
    selector: 'fdp-icon-tab-bar',
    templateUrl: './icon-tab-bar.component.html',
    styleUrl: './icon-tab-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FD_TABLIST,
            useExisting: IconTabBarComponent
        }
    ],
    imports: [
        NgTemplateOutlet,
        IconTabBarProcessTypeComponent,
        IconTabBarFilterTypeComponent,
        IconTabBarIconTypeComponent,
        IconTabBarTextTypeComponent,
        ScrollbarDirective,
        ScrollSpyDirective,
        IconTabBarTabContentDirective
    ],
    host: {
        '[class.fd-settings__tab-bar]': 'settings()'
    }
})
export class IconTabBarComponent implements OnInit, TabList {
    /**
     * Whether to open tab content one under another without collapsing.
     * Works only for content-projected tab content.
     */
    @Input({ transform: booleanAttribute })
    stackContent = false;

    /** Heading level of the tab. */
    tabHeadingLevel = input<number | null>(null);

    /** @description Type of tab bar view. */
    iconTabType = input<TabType>('text');

    /**
     * @description A tab bar configuration that stores the state of each tab. Based on this configuration, a tab bar is representing.
     */
    tabsConfig = model<TabConfig[]>();

    /** @description Destiny mode. */
    densityMode = model<TabDestinyMode>('inherit');

    /** @description Icon font */
    iconTabFont = input<IconFont>('SAP-icons');

    /** @description Disable or enable reordering(drag and drop) feature. (supported by text type only) */
    enableTabReordering = input(false);

    /** @description Boolean flag indicating to show total tab.(supported by filter type only) */
    showTotalTab = input(true);

    /** Whether to render icon tab item as multi-click variant. */
    multiClick = input(false);

    /** @description Layout type for tab (supported by text type only) */
    layoutMode = input<'row' | 'column'>('row');

    /** @description Icon tab bar background type. */
    iconTabBackground = input<IconTabBarBackground>('solid');

    /** @description Icon tab bar size. */
    iconTabSize = input<IconTabBarSize>();

    /**
     * @description Associations for colors of the tabs.
     * If any of the color associations provided, they'll be read by screenreader instead of the actual color
     */
    colorAssociations = input<TabColorAssociations>();

    /** @description If Icon tab bar is used in Settings Dialog */
    settings = input(false, { transform: booleanAttribute });

    /**
     * Maximum height of the content.
     * Works only for content-projected tab content.
     */
    maxContentHeight = input('100%');

    /** @description Emits when some tab is selected. */
    iconTabSelected = output<IconTabBarItem>();

    /** @description Emits when user drop tab. */
    iconTabReordered = output<IconTabBarItem[]>();

    /** Event emitted when user clicks on x icon in tab. */
    closeTab = output<IconTabBarItem>();

    /** @hidden */
    children = contentChildren(IconTabBarTabComponent, { descendants: false });

    /** @hidden */
    _scrollbar = viewChild(ScrollbarDirective);

    /** @hidden */
    tabDirectives = viewChildren(IconTabBarTabContentDirective);

    @HostBinding('class.fd-tabs-custom')
    private get _customTabs(): boolean {
        return this._inDynamicPage;
    }

    /** @hidden */
    get headerContainer(): Nullable<ElementRef> {
        return this._iconTabBarCmp()?.headerElement;
    }

    /** @hidden */
    _cssClassForContainer: string[];

    /** @hidden */
    _disableScrollSpy = false;

    /** @hidden */
    _init = true;

    /** Scrollable element reference. */
    get scrollableElement(): Nullable<ElementRef> {
        return this._scrollbar()?.elementRef;
    }

    /** @hidden */
    readonly _selectedUid = signal<string | undefined>(undefined);

    /** @hidden */
    readonly _tabs$ = computed(() => this._generateTabBarItems(this._tabsConfig$()));

    /** @hidden */
    readonly _flatTabs$ = computed(() => this._generateFlatTabs(this._tabs$()));

    /** @hidden */
    readonly _tabRenderer$ = signal<IconTabBarItem | null>(null);

    /** @hidden */
    readonly _rtl$ = computed(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    readonly _tabsConfig$ = computed(() => {
        const tabConfig = this.tabsConfig();
        if (tabConfig) {
            return this.tabsConfig() as TabConfig[];
        }

        const children = this.children();
        if (!children) {
            return [];
        }
        return children.map((t) => this._generateTabConfig(t));
    });

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    private readonly _inDynamicPage = !!inject(FD_DYNAMIC_PAGE, { optional: true });

    private readonly _iconTabBarCmp = viewChild<Nullable<IconTabBarBase>>(IconTabBarBase);

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._cssClassForContainer = this._generateContainerStyles();

        if (this.densityMode() === 'inherit') {
            this._contentDensityService?._contentDensityListener
                .pipe(distinctUntilChanged(), takeUntilDestroyed(this._destroyRef))
                .subscribe((density) => {
                    this.densityMode.set(density);
                    if (density !== 'compact') {
                        this._cssClassForContainer = this._cssClassForContainer.filter(
                            (cssClass) => cssClass !== 'fd-icon-tab-bar--compact'
                        );
                    } else {
                        this._cssClassForContainer.push('fd-icon-tab-bar--compact');
                    }
                    this._cd.detectChanges();
                });
        }
    }

    /**
     * @hidden
     * @param event reordered array of IconTabBarItem
     */
    _onReorder(event: IconTabBarItem[]): void {
        this.iconTabReordered.emit(event);
    }

    /**
     * @hidden
     * @param selectedItem
     */
    _selectItem(selectedItem: IconTabBarItem): void {
        this._tabRenderer$.set(selectedItem);
        this.iconTabSelected.emit(selectedItem);

        if (this.stackContent) {
            this._scrollToPanel(this.tabDirectives().find((tab) => tab.uId() === selectedItem.uId)!);
        }
    }

    /** @hidden */
    _closeTab(item: IconTabBarItem): void {
        this.closeTab.emit(item);
    }

    /** Programmatically select tab. */
    selectTab(id: Nullable<string>): void {
        const selectedItem = this._flatTabs$().find((t) => t.id === id);
        if (!selectedItem) {
            return;
        }
        this._selectedUid.set(selectedItem.uId);
        this._selectItem(selectedItem);
    }

    /** @hidden */
    highlightActiveTab(id: Nullable<string>, scroll = false): void {
        if (this._disableScrollSpy) {
            return;
        }
        const activeTab = this.tabDirectives().find((tab) => tab.id() === id);
        this._selectedUid.set(activeTab?.uId() || undefined);
        if (scroll && activeTab) {
            this._scrollToPanel(activeTab);
        }
    }

    /**
     * @hidden
     * @returns array of css classes for icon-tab-bar container
     */
    private _generateContainerStyles(): string[] {
        const styles = [`fd-icon-tab-bar--${this.iconTabType()}`];
        const tabsConfig = this.tabsConfig();
        if (tabsConfig && this.iconTabType() === 'process' && tabsConfig[0].icon) {
            styles.push('fd-icon-tab-bar--icon');
        }
        if (this.iconTabBackground() !== 'solid') {
            styles.push(`fd-icon-tab-bar--${this.iconTabBackground()}`);
        }
        if (this.iconTabSize()) {
            styles.push(`fd-icon-tab-bar--${this.iconTabSize()!}`);
        }
        if (this.densityMode() === 'compact') {
            styles.push('fd-icon-tab-bar--compact');
        }
        if (this.layoutMode() === 'column') {
            styles.push('fd-icon-tab-bar--counters');
        }

        return styles;
    }

    private _generateTabConfig(tab: IconTabBarTabComponent): TabConfig {
        const tabConfig: TabConfig = {
            label: tab.label(),
            color: tab.color(),
            active: tab.active(),
            badge: tab.badge(),
            counter: tab.counter(),
            renderer: tab.renderer(),
            id: tab.id(),
            titleTemplate: tab.titleTemplate(),
            subItems: tab.children().map((c) => this._generateTabConfig(c))
        };

        return tabConfig;
    }

    /** @hidden */
    private _scrollToPanel(tabPanel: Nullable<IconTabBarTabContentDirective>): void {
        if (!tabPanel) {
            return;
        }
        const scrollbar = this._scrollbar();
        if (!scrollbar) {
            return;
        }
        const panelElement = tabPanel.elementRef.nativeElement;
        const containerElement = scrollbar.elementRef.nativeElement;
        const distanceToScroll = panelElement.offsetTop - containerElement.offsetTop;
        const maximumScrollTop = containerElement.scrollHeight - containerElement.clientHeight;
        const currentScrollPosition = Math.ceil(containerElement.scrollTop);

        if (!(currentScrollPosition === maximumScrollTop && distanceToScroll > maximumScrollTop)) {
            this._disableScrollSpy = true;
            fromEvent(containerElement, 'scroll')
                .pipe(debounceTime(100), first(), takeUntilDestroyed(this._destroyRef))
                .subscribe(() => (this._disableScrollSpy = false));
            scrollTop(containerElement, distanceToScroll);
        }
    }

    /**
     * @hidden
     * @description generate IconTabItems from TabConfig array
     */
    private _generateTabBarItems(
        config: TabConfig[],
        indexPrefix = '',
        flatIndexRef?: FlatIndex,
        parentUId?: string
    ): IconTabBarItem[] {
        flatIndexRef = flatIndexRef || { value: 0 };
        return config.map((item, index) => {
            const uId = `${indexPrefix}${index}`;
            item.color = item.color || 'default';
            const result: IconTabBarItem = {
                ...item,
                index,
                cssClasses: item.color ? [`fd-icon-tab-bar__item--${item.color}`] : [],
                uId,
                hidden: false,
                parentUId,
                flatIndex: flatIndexRef!.value++,
                subItems: this._generateTabBarItems(
                    item.subItems || [],
                    `${uId}${UNIQUE_KEY_SEPARATOR}`,
                    flatIndexRef,
                    uId
                )
            };
            return result;
        });
    }

    private _generateFlatTabs(tabs: IconTabBarItem[]): IconTabBarItem[] {
        const flatTabs = tabs.reduce((acc: IconTabBarItem[], tab) => {
            acc.push(tab);
            if (tab.subItems) {
                acc.push(...this._generateFlatTabs(tab.subItems));
            }
            return acc;
        }, []);

        return flatTabs;
    }
}

/** @hidden helper object that is used in tab generation functions to calculate their indexes not depending on level of nesting */
interface FlatIndex {
    value: number;
}
