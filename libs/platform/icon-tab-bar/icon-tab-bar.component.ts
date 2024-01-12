import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DestroyRef,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation,
    booleanAttribute,
    computed,
    inject,
    signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ContentDensityService, Nullable, RtlService, scrollTop } from '@fundamental-ngx/cdk/utils';
import { IconFont } from '@fundamental-ngx/core/icon';
import { ScrollSpyDirective } from '@fundamental-ngx/core/scroll-spy';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { FD_TABLIST, TabList } from '@fundamental-ngx/core/shared';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, startWith } from 'rxjs/operators';
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
    standalone: true,
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
    ]
})
export class IconTabBarComponent implements OnInit, AfterViewInit, TabList {
    /**
     * @description Type of tab bar view.
     */
    @Input()
    iconTabType: TabType = 'text';

    /**
     * @description A tab bar configuration that stores the state of each tab. Based on this configuration, a tab bar is representing.
     */
    @Input()
    set tabsConfig(value: TabConfig[]) {
        this._tabsConfig$.set(value);
    }

    get tabsConfig(): TabConfig[] {
        return this._tabsConfig$();
    }

    /**
     * @description Destiny mode.
     */
    @Input()
    densityMode: TabDestinyMode = 'inherit';

    /**
     * @description Icon font
     */
    @Input()
    iconTabFont: IconFont = 'SAP-icons';

    /**
     * @description Disable or enable reordering(drag and drop) feature. (supported by text type only)
     */
    @Input()
    enableTabReordering = false;

    /**
     * @description Boolean flag indicating to show total tab.(supported by filter type only)
     */
    @Input()
    showTotalTab = true;

    /**
     * @description Layout type for tab (supported by text type only)
     */
    @Input()
    layoutMode: 'row' | 'column' = 'row';

    /**
     * @description Icon tab bar background type.
     */
    @Input()
    iconTabBackground: IconTabBarBackground = 'solid';

    /**
     * @description Icon tab bar size.
     */
    @Input()
    iconTabSize: IconTabBarSize;

    /**
     * @description Associations for colors of the tabs.
     * If any of the color associations provided, they'll be read by screenreader instead of the actual color
     */
    @Input()
    colorAssociations: TabColorAssociations;

    /**
     * Whether to open tab content one under another without collapsing.
     * Works only for content-projected tab content.
     */
    @Input({ transform: booleanAttribute })
    stackContent = false;

    /**
     * Maximum height of the content.
     * Works only for content-projected tab content.
     */
    @Input()
    maxContentHeight = '100%';

    /**
     * @description Emits when some tab is selected.
     */
    @Output()
    iconTabSelected = new EventEmitter<IconTabBarItem>();

    /**
     * @description Emits when user drop tab.
     */
    @Output()
    iconTabReordered = new EventEmitter<IconTabBarItem[]>();

    /** Event emitted when user clicks on x icon in tab. */
    @Output()
    closeTab = new EventEmitter<IconTabBarItem>();

    /** @hidden */
    @ContentChildren(IconTabBarTabComponent, { descendants: false })
    children: QueryList<IconTabBarTabComponent>;

    /** @hidden */
    @ContentChildren(IconTabBarTabComponent, { descendants: true })
    allChildren: QueryList<IconTabBarTabComponent>;

    /** @hidden */
    @ViewChild(ScrollbarDirective)
    _scrollbar: ScrollbarDirective;

    /** @hidden */
    @ViewChildren(IconTabBarTabContentDirective)
    tabDirectives: QueryList<IconTabBarTabContentDirective>;

    @ViewChild(IconTabBarBase)
    private readonly _iconTabBarCmp: Nullable<IconTabBarBase>;

    /** @hidden */
    get headerContainer(): Nullable<ElementRef> {
        return this._iconTabBarCmp?.headerElement;
    }

    /** @hidden */
    _cssClassForContainer: string[];

    /** @hidden */
    _disableScrollSpy = false;

    /** @hidden */
    _init = true;

    /** Scrollable element reference. */
    get scrollableElement(): Nullable<ElementRef> {
        return this._scrollbar?.elementRef;
    }

    /** @hidden */
    readonly _selectedUid = signal<string | undefined>(undefined);

    /** @hidden */
    readonly _tabs$ = computed(() => this._generateTabBarItems(this._tabsConfig$()));

    /** @hidden */
    readonly _flatTabs$ = computed(() => this._generateFlatTabs(this._tabs$()));

    /** @hidden */
    readonly _tabRenderer$ = signal<TemplateRef<any> | null>(null);

    /** @hidden */
    readonly _tabRenderers$ = signal<{ renderer: TemplateRef<any>; id: string }[]>([]);

    /** @hidden */
    readonly _rtl$ = computed(() => !!this._rtlService?.rtlSignal());

    /** @hidden */
    readonly _tabsConfig$ = signal<TabConfig[]>([]);

    /** @hidden */
    private _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        private _cd: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() private _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._cssClassForContainer = this._generateContainerStyles();

        if (this.densityMode === 'inherit') {
            this._contentDensityService?._contentDensityListener
                .pipe(distinctUntilChanged(), takeUntilDestroyed(this._destroyRef))
                .subscribe((density) => {
                    this.densityMode = density;
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

    /** @hidden */
    ngAfterViewInit(): void {
        this.children.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            const projectedTabs = this.children.toArray();

            if (projectedTabs.length === 0) {
                return;
            }

            this.tabsConfig = projectedTabs.map((t) => this._generateTabConfig(t));
            this._cd.detectChanges();
        });

        this.allChildren.changes.pipe(startWith(null), takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._tabRenderers$.set(
                this.allChildren.map((c) => ({
                    renderer: c.renderer,
                    id: c.id
                }))
            );
        });
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
        this._tabRenderer$.set(selectedItem?.renderer || null);
        this.iconTabSelected.emit(selectedItem);

        if (this.stackContent) {
            this._scrollToPanel(this.tabDirectives.find((tab) => tab.uId === selectedItem.uId)!);
        }
    }

    /** @hidden */
    _closeTab(item: IconTabBarItem): void {
        this.closeTab.emit(item);
    }

    /** @hidden */
    highlightActiveTab(id: Nullable<string>, scroll = false): void {
        if (this._disableScrollSpy) {
            return;
        }
        const activeTab = this.tabDirectives.find((tab) => tab.id === id);
        this._selectedUid.set(activeTab?.uId || undefined);
        if (scroll && activeTab) {
            this._scrollToPanel(activeTab);
        }
    }

    /**
     * @hidden
     * @returns array of css classes for icon-tab-bar container
     */
    private _generateContainerStyles(): string[] {
        const styles = [`fd-icon-tab-bar--${this.iconTabType}`];
        if (this.iconTabType === 'process' && this.tabsConfig[0].icon) {
            styles.push('fd-icon-tab-bar--icon');
        }
        if (this.iconTabBackground !== 'solid') {
            styles.push(`fd-icon-tab-bar--${this.iconTabBackground}`);
        }
        if (this.iconTabSize) {
            styles.push(`fd-icon-tab-bar--${this.iconTabSize}`);
        }
        if (this.densityMode === 'compact') {
            styles.push('fd-icon-tab-bar--compact');
        }
        if (this.layoutMode === 'column') {
            styles.push('fd-icon-tab-bar--counters');
        }
        return styles;
    }

    private _generateTabConfig(tab: IconTabBarTabComponent): TabConfig {
        const tabConfig: TabConfig = {
            label: tab.label,
            color: tab.color,
            active: tab.active,
            counter: tab.counter,
            renderer: tab.renderer,
            id: tab.id,
            subItems: tab.children.map((c) => this._generateTabConfig(c))
        };

        return tabConfig;
    }

    /** @hidden */
    private _scrollToPanel(tabPanel: Nullable<IconTabBarTabContentDirective>): void {
        if (!tabPanel) {
            return;
        }
        const panelElement = tabPanel.elementRef.nativeElement;
        const containerElement = this._scrollbar.elementRef.nativeElement;
        const distanceToScroll = panelElement.offsetTop - containerElement.offsetTop;
        const maximumScrollTop = containerElement.scrollHeight - containerElement.clientHeight;
        const currentScrollPosition = Math.ceil(containerElement.scrollTop);

        if (!(currentScrollPosition === maximumScrollTop && distanceToScroll > maximumScrollTop)) {
            this._disableScrollSpy = true;
            console.log(this._disableScrollSpy);
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
            const result: IconTabBarItem = {
                ...item,
                index,
                cssClasses: [],
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
            if (item.color) {
                result.cssClasses = [`fd-icon-tab-bar__item--${item.color}`];
            }
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
