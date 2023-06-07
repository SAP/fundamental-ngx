import { FocusKeyManager } from '@angular/cdk/a11y';
import { BooleanInput } from '@angular/cdk/coercion';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { DataSourceDirective, FD_DATA_SOURCE_TRANSFORMER } from '@fundamental-ngx/cdk/data-source';
import { CvaDirective } from '@fundamental-ngx/cdk/forms';
import {
    applyCssClass,
    CssClassBuilder,
    DestroyedService,
    KeyUtil,
    Nullable,
    RtlService,
    SelectableListValueType,
    SelectComponentRootToken,
    SelectionService
} from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { distinctUntilChanged, filter, fromEvent, startWith, Subscription, switchMap, takeUntil } from 'rxjs';
import { FdTreeAcceptableDataSource, FdTreeDataSource, FdTreeItemType } from './data-source/tree-data-source';
import { TreeDataSourceParser } from './data-source/tree-data-source-parser';
import { TreeItemDefDirective } from './directives/tree-item-def.directive';
import { TreeItemDirective } from './directives/tree-item.directive';
import { BaseTreeItem } from './models/base-tree-item.class';
import { TreeService } from './tree.service';
import { SelectionPlacement, SelectionType } from './models/selection-type';
import { TreeItem, TreeItemGeneric } from './models/tree-item';

@Component({
    selector: 'fd-tree',
    templateUrl: './tree.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tree.component.scss'],
    hostDirectives: [
        {
            directive: DataSourceDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['dataSource'],
            // eslint-disable-next-line @angular-eslint/no-outputs-metadata-property
            outputs: ['dataChanged']
        },
        {
            directive: CvaDirective,
            // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
            inputs: ['name', 'id', 'state', 'stateMessage', 'disabled', 'readonly']
        }
    ],
    host: {
        role: 'tree'
    },
    providers: [
        contentDensityObserverProviders(),
        TreeService,
        SelectionService,
        DestroyedService,
        {
            provide: FD_DATA_SOURCE_TRANSFORMER,
            useClass: TreeDataSourceParser
        }
    ]
})
export class TreeComponent<P extends FdTreeAcceptableDataSource, T extends TreeItem = FdTreeItemType<P>>
    implements CssClassBuilder, OnInit, OnChanges, AfterViewInit, SelectComponentRootToken, OnDestroy
{
    /** @hidden */
    @Input()
    class: string;

    /**
     * Whether the tree should be borderless.
     */
    @Input()
    noBorder = false;

    /** Type of tree items selection. */
    @Input()
    selection: SelectionType = 'none';

    /** Placement of the selection control. */
    @Input()
    selectionPlacement: SelectionPlacement = 'none';

    /**
     * Whether the sections should be dependent for selection mode.
     * If true, selection control will shift, according to the level.
     * If false, selection control will stay on the same place ignoring the item level.
     */
    @Input()
    independentSections = false;

    /**
     * Whether the Tree component has navigation indicators.
     */
    @Input()
    set navigationIndicator(value: boolean) {
        if (value === this._navigationIndicator) {
            return;
        }
        this._navigationIndicator = value;
        this._treeService.setNavigationIndicator(value);
    }

    get navigationIndicator(): boolean {
        return this._navigationIndicator;
    }

    /** @hidden */
    private _navigationIndicator = false;

    /** Event emitted when data loading is started. */
    @Output()
    dataRequested = new EventEmitter<boolean>();

    /** Event emitted when data loading is finished. */
    @Output()
    dataReceived = new EventEmitter<boolean>();

    /** Event emitted when selected state changed. */
    @Output()
    selectedChange = new EventEmitter<any>();

    /** @hidden */
    _items: TreeItem<TreeItemGeneric<T>>[] = [];

    /** Tree item template definition. */
    @ContentChild(TreeItemDefDirective)
    set treeItemDef(value: Nullable<TreeItemDefDirective>) {
        this._treeItemDef = value;
        // Set new renderer
        this._treeService.treeItemTemplateRef = value?.templateRef;
        this._items = this._treeService.normalizeTreeItems(this._items);
    }

    get treeItemDef(): Nullable<TreeItemDefDirective> {
        return this._treeItemDef;
    }

    /** @hidden */
    get multiple(): BooleanInput {
        return this.selection === 'multiple';
    }

    /** @hidden */
    get toggle(): BooleanInput {
        return true;
    }

    /**
     * @hidden
     * Used for skeleton to appear before first meaningful data being loaded.
     */
    _initialDataLoaded = false;

    /** @hidden */
    @ViewChildren(TreeItemDirective)
    _treeItemDirectives: QueryList<TreeItemDirective<TreeItem, any>>;

    /** @hidden */
    @ContentChildren(BaseTreeItem, { descendants: true })
    readonly _projectedTreeItems: QueryList<BaseTreeItem>;

    /** @hidden */
    private _treeItemDef: Nullable<TreeItemDefDirective>;

    /** @hidden */
    private readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    private readonly _dataSourceDirective = inject<DataSourceDirective<T, FdTreeDataSource<T>>>(DataSourceDirective);

    /** @hidden */
    private readonly _destroy$ = inject(DestroyedService);

    /** @hidden */
    public readonly elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _treeService = inject(TreeService);

    /** @hidden */
    private readonly _selectionService = inject(SelectionService);

    /** @hidden */
    private readonly _rtl = inject(RtlService, {
        optional: true
    });

    /** @hidden */
    private readonly _cvaDirective = inject(CvaDirective);

    /** @hidden */
    private readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    private _dsSubscription: Subscription | null = null;

    /** @hidden */
    private _expandedLevel: number | undefined;

    /** @hidden */
    private _focusKeyManager: FocusKeyManager<BaseTreeItem>;

    /**
     * @hidden
     * Sorted tree item components.
     */
    private _sortedTreeItems: BaseTreeItem[] = [];

    /**
     * @hidden
     * All tree item components.
     */
    private _allItems: BaseTreeItem[] = [];

    /** @hidden */
    private _eventSub: Subscription;

    /** @hidden */
    private _selectionSub: Subscription | undefined;

    /** @hidden */
    constructor() {
        this._selectionService.registerRootComponent(this);
        this._contentDensityObserver.subscribe();
    }

    /** @hidden */
    ngOnInit(): void {
        this._openDataStream();
        this.buildComponentCssClass();

        this._treeService.expandedLevel.pipe(distinctUntilChanged(), takeUntil(this._destroy$)).subscribe((level) => {
            this._expandedLevel = level;
            this.buildComponentCssClass();
            this._cdr.detectChanges();
        });

        this._treeService.detectChanges.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this._cdr.detectChanges();
        });

        if (this.selection !== 'none') {
            this._selectionService.setValue(this._cvaDirective.value);

            this._cvaDirective.ngControl?.valueChanges?.pipe(takeUntil(this._destroy$)).subscribe(() => {
                this._selectionService.setValue(this._cvaDirective.value);
            });
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();

        if ('selection' in changes || 'selectionPlacement' in changes) {
            this._treeService.setSelectionMode(this.selection, this.selectionPlacement);
            this._setSelectionListener();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listenToTreeItemsChanges();
        this._listenToTreeItemDirectiveChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._dsSubscription?.unsubscribe();
        this._eventSub?.unsubscribe();
        this._selectionSub?.unsubscribe();
    }

    /** @hidden */
    private _setSelectionListener(): void {
        this._selectionSub?.unsubscribe();
        if (this.selection !== 'none') {
            this._selectionService.setValue(this._cvaDirective.value);

            this._selectionSub = this._cvaDirective.ngControl?.valueChanges
                ?.pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                    this._selectionService.setValue(this._cvaDirective.value);
                });
        }
    }

    /** @hidden */
    private _listenToTreeItemDirectiveChanges(): void {
        this._treeItemDirectives.changes
            .pipe(
                startWith(null),
                filter(() => this.treeItemDef !== undefined),
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                this._allItems = this._treeItemDirectives.toArray().map((item) => item.treeItem!);
                const flattenedItems = this._sortTreeItems(this._allItems);
                this._setFlattenedItems(flattenedItems);
            });
    }

    /** @hidden */
    private _listenToTreeItemsChanges(): void {
        this._projectedTreeItems.changes
            .pipe(
                startWith(null),
                filter(() => !this.treeItemDef),
                takeUntil(this._destroy$)
            )
            .subscribe(() => {
                this._allItems = this._projectedTreeItems.toArray();
                const flattenedItems = this._sortTreeItems(this._allItems);
                this._setFlattenedItems(flattenedItems);
            });
    }

    /** @hidden */
    private _setFlattenedItems(items: BaseTreeItem[]): void {
        this._sortedTreeItems = items;

        const activeItem = this._focusKeyManager?.activeItem;
        const newActiveItemIndex = items.findIndex((item) => item === activeItem);
        this._focusKeyManager?.destroy();

        this._focusKeyManager = new FocusKeyManager(items)
            .withVerticalOrientation(true)
            .skipPredicate((item) => !item.keyboardAccessible);

        if (newActiveItemIndex > -1) {
            this._focusKeyManager.setActiveItem(newActiveItemIndex);
        }

        this._selectionService.initialize(this._sortedTreeItems.map((item) => item.selectableListItem));

        this._setupEventListeners();
    }

    /** @hidden */
    _onItemFocused(treeItem: BaseTreeItem): void {
        let focusedIndex = -1;
        this._sortedTreeItems.forEach((item, index) => {
            const isFocused = treeItem === item;
            item.setContainerTabIndex(isFocused ? 0 : -1);
            if (isFocused) {
                focusedIndex = index;
            }
        });

        if (focusedIndex === -1) {
            return;
        }

        this._focusKeyManager.setActiveItem(focusedIndex);
    }

    /** @hidden */
    private _setupEventListeners(): void {
        this._eventSub?.unsubscribe();
        this._eventSub = new Subscription();

        this._sortedTreeItems.forEach((item) => {
            this._eventSub.add(
                fromEvent<KeyboardEvent>(item.elementRef.nativeElement, 'keydown').subscribe((event) => {
                    this._onItemKeyDown(event, item);
                })
            );
            this._eventSub.add(
                fromEvent(item.itemContainer?.nativeElement, 'focus').subscribe(() => {
                    this._onItemFocused(item);
                })
            );
        });
    }

    /** @hidden */
    private _sortTreeItems(items: BaseTreeItem[]): BaseTreeItem[] {
        const components: BaseTreeItem[] = [];
        const rootItems = items.filter((item) => item.level === 1);

        rootItems.forEach((treeItem, index) => {
            treeItem.setPosition(rootItems.length, index + 1);
        });

        items.forEach((item) => {
            if (!item || components.includes(item)) {
                return;
            }

            components.push(item);

            if (item.children.length === 0) {
                return;
            }

            const childItems = this._sortTreeItems(this._allItems.filter((i) => i.parentId === item.id));

            childItems.forEach((treeItem, index) => {
                treeItem.setPosition(childItems.length, index + 1);
            });

            components.push(...childItems);
        });

        return components;
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            this.class,
            this._expandedLevel ? `expanded-level-${this._expandedLevel}` : '',
            this.noBorder ? 'fd-tree--no-border' : '',
            this._items.length === 0 && this._initialDataLoaded ? 'fd-tree--no-data' : '',
            this.independentSections ? 'fd-tree--independent-multi-selection' : '',
            'fd-tree'
        ];
    }

    /**
     * @hidden
     * Keyboard navigation
     * @param event Keyboard event.
     */
    @HostListener('keydown', ['$event'])
    private _onKeyUp(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [DOWN_ARROW, UP_ARROW])) {
            if (event.defaultPrevented) {
                return;
            }
            event.preventDefault();
            this._focusKeyManager?.onKeydown(event);
        }
    }

    /** @hidden */
    _onItemKeyDown(event: KeyboardEvent, treeItem: Nullable<BaseTreeItem>): void {
        if (!treeItem) {
            return;
        }

        const isRtl = !!this._rtl?.rtl.value;
        const expandKey = isRtl ? LEFT_ARROW : RIGHT_ARROW;
        const collapseKey = isRtl ? RIGHT_ARROW : LEFT_ARROW;

        if (KeyUtil.isKeyCode(event, expandKey) && (treeItem.hasDsChildren || treeItem.hasProjectedChildren)) {
            if (event.defaultPrevented) {
                return;
            }
            event.preventDefault();

            this._expandTreeSection(treeItem);
            return;
        }

        if (KeyUtil.isKeyCode(event, collapseKey)) {
            if (event.defaultPrevented) {
                return;
            }
            event.preventDefault();

            this._collapseTreeSection(treeItem);
            return;
        }
    }

    /** @hidden */
    _trackFn(index: number, item: TreeItem<TreeItemGeneric<T>>): string {
        return item.id;
    }

    /** @hidden */
    private _expandTreeSection(treeItem: BaseTreeItem): void {
        if (treeItem.expanded) {
            // Shift focus on the first child item
            const itemIndex = this._sortedTreeItems.findIndex((item) => item.id === treeItem.id);
            const nextItem = this._sortedTreeItems[itemIndex + 1];
            if (nextItem?.parentId === treeItem.id) {
                this._focusKeyManager.setActiveItem(itemIndex + 1);
            }

            return;
        }

        treeItem.expanded = true;
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _collapseTreeSection(treeItem: BaseTreeItem): void {
        if (!treeItem.expanded && treeItem.parentId) {
            const parentItemIndex = this._sortedTreeItems.findIndex((item) => item.id === treeItem.parentId);

            if (parentItemIndex > -1) {
                this._focusKeyManager.setActiveItem(parentItemIndex);
                return;
            }
        }
        treeItem.expanded = false;
        this._cdr.detectChanges();
    }

    /** @hidden */
    private _openDataStream(): void {
        this._dsSubscription?.unsubscribe();
        this._dsSubscription = new Subscription();
        this._dsSubscription.add(
            this._dataSourceDirective.dataSourceProvider?.dataRequested.subscribe(this.dataRequested)
        );
        this._dsSubscription.add(
            this._dataSourceDirective.dataSourceProvider?.dataReceived.subscribe(this.dataReceived)
        );

        this._dsSubscription.add(
            this._dataSourceDirective.dataSourceProvider?.dataReceived
                .pipe(
                    filter((received) => received),
                    switchMap(() => this._dataSourceDirective.dataChanged$)
                )
                .subscribe((data) => {
                    this._initialDataLoaded = true;
                    this._items = this._treeService.normalizeTreeItems(data);
                    this.buildComponentCssClass();

                    this._cdr.markForCheck();
                })
        );

        this._dataSourceDirective.dataSourceProvider?.match();
    }

    /**
     * @hidden
     * Select list interface method implementation.
     * Sets value for control value accessor and emits it.
     * @param value value of the selection.
     */
    onChange(value: SelectableListValueType<any>): void {
        this._cvaDirective.setValue(value, true);
    }
}
