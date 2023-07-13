import { SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    inject,
    Injector,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    TrackByFunction,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {
    FDK_FOCUSABLE_GRID_DIRECTIVE,
    FocusableGridDirective,
    KeyUtil,
    Nullable,
    RangeSelector,
    resizeObservable,
    RtlService
} from '@fundamental-ngx/cdk/utils';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { TableComponent as FdTableComponent } from '@fundamental-ngx/core/table';
import { SearchInput } from '@fundamental-ngx/platform/search-field';
import { FDP_PRESET_MANAGED_COMPONENT, isJsObject } from '@fundamental-ngx/platform/shared';
import {
    buildNewRowSkeleton,
    CollectionFilter,
    CollectionGroup,
    CollectionSort,
    convertObjectsToTableRows,
    convertTreeObjectsToTableRows,
    convertTreeTableRowToFlatList,
    DEFAULT_HIGHLIGHTING_KEY,
    EDITABLE_ROW_SEMANTIC_STATE,
    EditableTableCell,
    FDP_TABLE_DRAGGABLE_DIRECTIVE,
    FDP_TABLE_STATE_DIRECTIVE,
    FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE,
    findRowChildren,
    getFreezableColumns,
    getFreezableEndColumns,
    getRowParents,
    getSelectableRows,
    isRowNavigatable,
    isTableRow,
    isTreeRowFirstCell,
    PlatformTableManagedPreset,
    ROW_HEIGHT,
    RowComparator,
    SaveRowsEvent,
    SELECTION_COLUMN_WIDTH,
    SelectionMode,
    SelectionModeValue,
    SEMANTIC_HIGHLIGHTING_COLUMN_WIDTH,
    Table,
    TableColumn,
    TableColumnFreezeEvent,
    TableColumnResizeService,
    TableColumnsChangeEvent,
    TableDataSource,
    TableDataSourceDirective,
    TableDraggable,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableHeaderResizerDirective,
    TableInitialState,
    TablePageChangeEvent,
    TableResponsiveService,
    TableRow,
    TableRowActivateEvent,
    TableRowClass,
    TableRowSelectionChangeEvent,
    TableRowService,
    TableRowToggleOpenStateEvent,
    TableRowType,
    TableScrollable,
    TableScrollDispatcherService,
    TableService,
    TableSortChangeEvent,
    TableState,
    TableVirtualScroll
} from '@fundamental-ngx/platform/table-helpers';
import equal from 'fast-deep-equal';
import { BehaviorSubject, fromEvent, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { TABLE_TOOLBAR, TableToolbarWithTemplate } from './components';

interface ToolbarContext {
    counter: Observable<number>;
    sortable: Observable<boolean>;
    filterable: Observable<boolean>;
    groupable: Observable<boolean>;
    columns: Observable<boolean>;
}

let tableUniqueId = 0;

/**
 * The component that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 * <fdp-table
 *  [dataSource]="source"
 *  fdCompact
 *  selectionMode="multiple"
 *  emptyTableMessage="No data found">
 *
 *  <fdp-table-toolbar
 *   title="Order Line Items"
 *   [hideItemCount]="false">
 *  </fdp-table-toolbar>
 *
 *  <fdp-column
 *   name="name"
 *   key="name"
 *   label="Name"
 *   align="start">
 *  </fdp-column>
 *
 *  <fdp-column
 *   name="description"
 *   key="description"
 *   label="Description">
 *  </fdp-column>
 * </fdp-table>
 * ```
 */
@Component({
    selector: 'fdp-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: Table, useExisting: forwardRef(() => TableComponent) },
        TableRowService,
        TableService,
        TableScrollDispatcherService,
        TableColumnResizeService,
        TableResponsiveService,
        contentDensityObserverProviders({
            supportedContentDensity: [ContentDensityMode.COMPACT, ContentDensityMode.COZY, ContentDensityMode.CONDENSED]
        }),
        {
            provide: FDP_PRESET_MANAGED_COMPONENT,
            useExisting: TableComponent
        }
    ],
    hostDirectives: [
        {
            directive: TableDataSourceDirective,
            inputs: ['dataSource', 'childDataSource'],
            // eslint-disable-next-line @angular-eslint/no-outputs-metadata-property
            outputs: [
                'childDataSourceChanged',
                // eslint-disable-next-line @angular-eslint/no-output-on-prefix
                'onDataRequested',
                // eslint-disable-next-line @angular-eslint/no-output-on-prefix
                'onDataReceived',
                'dataSourceChanged',
                'dataChanged',
                'isLoading'
            ]
        },
        TableHeaderResizerDirective
    ],
    host: {
        class: 'fdp-table',
        '[class.fd-table--no-horizontal-borders]': 'noHorizontalBorders || noBorders',
        '[class.fd-table--no-vertical-borders]': 'noVerticalBorders || noBorders'
    }
})
export class TableComponent<T = any>
    extends Table<T>
    implements AfterViewInit, OnDestroy, OnChanges, OnInit, AfterViewChecked
{
    /** Component name used in a Preset-managed component. */
    @Input()
    name = 'platformTable';

    /** ID for the Table. */
    @Input()
    @HostBinding('attr.id')
    id = `fdp-table-${tableUniqueId++}`;

    /** Whether to allow resizing columns by dragging the column edge with mouse. */
    @Input()
    enableDragResize = true;

    /**
     * Whether to fix the table header and footer. Default is true.
     * Note that if the table contains freezable columns, the header and
     * footer will be fixed automatically, regardless of this input value.
     * */
    @Input()
    fixed = true;

    /** The column `name` to freeze columns up to and including. */
    @Input()
    freezeColumnsTo: string;

    /** The column `name` to freeze columns after and including. */
    @Input()
    freezeEndColumnsTo: string;
    /** Toggle for page scrolling feature. */
    @Input()
    pageScrolling = false;
    /** Number of items per page. */
    @Input()
    pageSize: Nullable<number>;
    /** Page scrolling threshold in px. */
    @Input()
    pageScrollingThreshold = 80;
    /** Table body height. */
    @Input()
    bodyHeight: string;
    /** Text displayed when table has no items. */
    @Input()
    emptyTableMessage: string;
    /** Table without horizontal borders. */
    @Input()
    noHorizontalBorders = false;
    /** Table without vertical borders. */
    @Input()
    noVerticalBorders = false;
    /** Table without borders. */
    @Input()
    noBorders = false;
    /** Table body without any borders, but header with borders. */
    @Input()
    noBodyBorders = false;
    /** Table without outer borders */
    @HostBinding('class.fdp-table--no-outer-border')
    @Input()
    noOuterBorders = false;
    /** Table body without horizontal borders. */
    @Input()
    noBorderX = false;
    /** Table body without vertical borders. */
    @Input()
    noBorderY = false;
    /** Accessor to a children nodes of tree. */
    @Input()
    relationKey: string;
    /** Table row expanded state key. Used to set the initial state of tree row. */
    @Input()
    expandedStateKey: string;
    /** Property key indicating that the row has children accessible via [childDataSource]. */
    @Input()
    hasChildrenKey: string;
    /**
     * Whether row is navigatable.
     * Pass boolean value to set state for the all rows.
     * Pass string value with the key of the row item's field to compute state for every single row.
     */
    @Input()
    rowNavigatable: string | boolean = false;
    /**
     * Whether to highlight navigated row.
     */
    @Input()
    highlightNavigatedRow = false;
    /** Whether table row can be clicked */
    @Input()
    rowsActivable = false;
    /** Value with the key of the row item's field to enable selecting.  */
    @Input()
    selectedKey: string;
    /** Value with the key of the row item's field to enable selecting.  */
    @Input()
    selectableKey: string;
    /**
     * Tracking function that will be used to check the differences in data changes.
     * Used similarly to `ngFor` `trackBy` function.
     * Accepts a function that takes two parameters, index and item.
     */
    @Input()
    trackBy: TrackByFunction<T>;
    /**
     * An optional function that identifies uniqueness of a particular row.
     * Table component uses it to be able to preserve selection when a data list is changed.
     */
    @Input()
    rowComparator: RowComparator<T>;
    /** String or function to calculate additional rows' CSS classes. */
    @Input()
    rowsClass: TableRowClass<T>;
    /** Used to construct empty row object for editing. */
    @Input()
    editableRowSkeleton: T;
    /** Whether all rows should be collapsed by default after the table is loaded. */
    @Input()
    expandOnInit = false;
    /**
     * Height of the row, required for the virtualScroll,
     * default is 44px in cozy, 32px in compact and 24px in condensed (set automatically)
     */
    @Input()
    rowHeight = ROW_HEIGHT.get(ContentDensityMode.COZY)!;
    /** Event emitted when the current preset configuration has been changed. */
    /**
     * Whether to load previous pages.
     * This option works only when `pageScrolling` is true, and the initial page > 1
     */
    @Input()
    loadPagesBefore = false;

    /** @hidden */
    _selectionMode: SelectionModeValue = SelectionMode.NONE;

    /** Sets selection mode for the table. 'single' | 'multiple' | 'none' */
    @Input()
    set selectionMode(value: SelectionModeValue) {
        this._selectionMode = value;
        this._isShownSelectionColumn = this.selectionMode !== SelectionMode.NONE;
        this._setSelectionColumnWidth();
    }

    get selectionMode(): SelectionModeValue {
        return this._selectionMode;
    }

    /** @hidden */
    private _enableTristateMode = false;

    /**
     *  When True, the checked state of each tree item depends on the checked
     *  state of its parent or direct child.
     */
    @Input()
    set enableTristateMode(value: boolean) {
        this._enableTristateMode = value;
    }

    get enableTristateMode(): boolean {
        return this.isTreeTable && this._enableTristateMode;
    }

    /** Value with the key of the row item's field to compute semantic state of the row.  */
    @Input()
    set semanticHighlighting(value: string) {
        this._semanticHighlightingKey = value;
        this._setSemanticHighlighting();
    }
    get semanticHighlighting(): string {
        if (!this._semanticHighlightingKey && this._forceSemanticHighlighting) {
            return DEFAULT_HIGHLIGHTING_KEY;
        }

        return this._semanticHighlightingKey;
    }

    /**
     * Whether to force rows to follow 'checked all' state of the table.
     * If true, all new rows that are coming from the dataSource will follow 'checked all' state.
     * If false, row will respect `checkedKey` property to define checked state of itself.
     * Default is false.
     */
    @Input()
    forceCheckedAllState = false;

    /** @hidden */
    private _shouldCheckNewRows = false;

    /** Event emitted when current preset configuration has been changed. */
    @Output()
    presetChanged = new EventEmitter<PlatformTableManagedPreset>();
    /** Event fired when table selection has changed. */
    @Output()
    readonly rowSelectionChange: EventEmitter<TableRowSelectionChangeEvent<T>> = new EventEmitter<
        TableRowSelectionChangeEvent<T>
    >();
    /** Event fired when table sort order has changed. */
    @Output()
    readonly sortChange: EventEmitter<TableSortChangeEvent> = new EventEmitter<TableSortChangeEvent>();
    /** Event fired when the table filter has changed. */
    @Output()
    readonly filterChange: EventEmitter<TableFilterChangeEvent> = new EventEmitter<TableFilterChangeEvent>();
    /** Event fired when table grouping has changed. */
    @Output()
    readonly groupChange: EventEmitter<TableGroupChangeEvent> = new EventEmitter<TableGroupChangeEvent>();
    /** Event fired when visible columns list has been changed. */
    @Output()
    readonly columnsChange: EventEmitter<TableColumnsChangeEvent> = new EventEmitter<TableColumnsChangeEvent>();
    /** Event emitted when pagination state has been changed. */
    @Output()
    readonly pageChange = new EventEmitter<TablePageChangeEvent>();
    /** Event fired when there is a change in the frozen column. */
    @Output()
    readonly columnFreeze: EventEmitter<TableColumnFreezeEvent> = new EventEmitter<TableColumnFreezeEvent>();
    /** Event fired when group/tree row collapsed/expanded. */
    @Output()
    readonly rowToggleOpenState = new EventEmitter<TableRowToggleOpenStateEvent<T>>();
    /** Event fired when row clicked. */
    @Output()
    readonly rowActivate = new EventEmitter<TableRowActivateEvent<T>>();
    /** Event fired when row navigated. */
    @Output()
    readonly rowNavigate = new EventEmitter<TableRowActivateEvent<T>>();
    /** Event fired when empty row added. */
    @Output()
    readonly emptyRowAdded = new EventEmitter<void>();
    /** Event fired when save button pressed. */
    @Output()
    readonly save = new EventEmitter<SaveRowsEvent<T>>();
    /** Event fired when cancel button pressed. */
    @Output()
    readonly cancel = new EventEmitter<void>();
    /** Event emitted when table body being scrolled. */
    @Output()
    readonly tableScrolled = new EventEmitter<number>();
    /** Event emitted when new rows has been set and rendered. */
    @Output()
    readonly tableRowsSet = new EventEmitter<void>();
    /** Event emitted when all rows being expanded. */
    @Output()
    allRowsExpanded = new EventEmitter<void>();
    /** Event emitted when all rows being collapsed. */
    @Output()
    allRowsCollapsed = new EventEmitter<void>();
    /** @hidden */
    @ViewChild('tableScrollable')
    readonly tableScrollable: TableScrollable;
    /** @hidden */
    @ViewChild('tableContainer')
    readonly tableContainer: ElementRef<HTMLDivElement>;
    /** @hidden */
    @ViewChild(FdTableComponent, { read: ElementRef })
    readonly table: ElementRef<HTMLDivElement>;
    /** @hidden */
    @ViewChild(FDK_FOCUSABLE_GRID_DIRECTIVE)
    readonly _focusableGrid: FocusableGridDirective;
    /** @hidden */
    @ViewChild('tableBody', { read: ElementRef })
    private readonly _tableBody: ElementRef<HTMLElement>;
    /** @hidden */
    @ContentChildren(TableColumn)
    readonly columns: QueryList<TableColumn>;
    /** @hidden */
    @ContentChildren(EditableTableCell, { descendants: true })
    readonly customEditableCells: QueryList<EditableTableCell>;
    /** @hidden */
    @ContentChild(TABLE_TOOLBAR)
    readonly tableToolbar: TableToolbarWithTemplate;
    /** @hidden */
    get initialSortBy(): CollectionSort[] {
        return this.initialState?.initialSortBy ?? [];
    }

    /**
     * @hidden
     * Columns to be rendered in the template
     */
    get _visibleColumns(): TableColumn[] {
        return this._tableService.visibleColumns$.value;
    }

    /**
     * @hidden
     * Columns to be rendered as a pop-in columns.
     */
    get _poppingColumns(): TableColumn[] {
        return this._tableService.poppingColumns$.value;
    }

    /** @hidden */
    get isTreeTable(): boolean {
        return !!this._dndTableDirective?.isTreeTable;
    }

    /** @hidden */
    get enableRowReordering(): boolean {
        return !!this._dndTableDirective?.enableRowReordering;
    }

    /** Whether the table rows are draggable. */
    get isDraggable(): boolean {
        return !!this._dndTableDirective?.isTreeTable && !!this._dndTableDirective?.enableRowReordering;
    }

    /** @hidden */
    get _semanticHighlightingColumnWidth(): number {
        return this.semanticHighlighting ? SEMANTIC_HIGHLIGHTING_COLUMN_WIDTH : 0;
    }

    /** @hidden Sum of widths of fixed columns (semantic highlighting, selection) */
    get _fixedColumnsPadding(): number {
        return this._semanticHighlightingColumnWidth + this._selectionColumnWidth;
    }

    /** @hidden */
    get _tableWidthPx(): number {
        return this.tableContainer.nativeElement.getBoundingClientRect().width;
    }

    /** @hidden */
    get loadingState(): boolean {
        return (
            this.loading ??
            (this._dataSourceDirective._internalLoadingState ||
                this._dataSourceDirective._internalChildrenLoadingState ||
                this._dndLoadingState)
        );
    }
    /**
     * @hidden
     * Representation of combined table rows.
     * Contains all rows including group rows.
     */
    _tableRows: TableRow<T>[] = [];
    /**
     * @hidden
     * Representation of table rows that came from dataSource.
     * Contains all rows including group rows.
     */
    _dataSourceTableRows: TableRow<T>[] = [];
    /**
     * @hidden
     * Representation of added table rows.
     */
    _newTableRows: TableRow<T>[] = [];
    /**
     * @hidden
     * Visible table rows.
     * Rows list that is used to be rendered in the ui.
     * Based on _tableRows and excludes hidden rows.
     */
    _tableRowsVisible: TableRow<T>[] = [];
    /**
     * @hidden
     * Table Column Map. Where key is column key and value is column
     */
    _keyToColumnMap: Map<string, TableColumn> = new Map();
    /**
     * @hidden
     * Freezable column names and their respective indexes
     */
    _freezableColumns: Map<string, number> = new Map();
    /**
     * @hidden
     * Freezable column names and their respective indexes for columns that will be frozen to the end of the table
     */
    _freezableEndColumns: Map<string, number> = new Map();
    /** @hidden */
    _tableColumnsLength = 0;
    /** @hidden */
    _checkedState: boolean | null = false;
    /** @hidden */
    @HostBinding('class.fd-table--group')
    _isGroupTable = false;
    /**
     * @hidden
     * Used to create a row component placeholder and set data in it rather than re-create the row component when data changes.
     * Optimizes performance due to skipping initial setup of the component.
     */
    _tableRowsInViewPortPlaceholder: number[] = [];
    /** @hidden */
    _isShownSelectionColumn = false;
    /** @hidden */
    readonly _toolbarContext: ToolbarContext;
    /** @hidden */
    _navigatedRowIndex: number;
    /** @hidden */
    _selectionColumnWidth = 0;
    /** @hidden */
    readonly tableColumnsStream: Observable<TableColumn[]>;
    /** @hidden */
    _loadPreviousPages = false;
    /** @hidden */
    _rtl = false;
    /** @hidden */
    readonly _dataSourceDirective = inject<TableDataSourceDirective<T>>(TableDataSourceDirective);
    /** @hidden */
    readonly _tableRowService = inject(TableRowService);
    /** @hidden */
    readonly initialState = inject<TableInitialState>(FDP_TABLE_STATE_DIRECTIVE, {
        optional: true
    });
    /** @hidden */
    readonly _virtualScrollDirective = inject<TableVirtualScroll>(FDP_TABLE_VIRTUAL_SCROLL_DIRECTIVE, {
        optional: true
    });
    /** @hidden */
    readonly _dndTableDirective = inject<TableDraggable>(FDP_TABLE_DRAGGABLE_DIRECTIVE, {
        optional: true
    });
    // keeping "loading" field private to make sure "loadingState" is used instead
    /** Loading state */
    @Input()
    private loading: boolean | undefined;
    /** @hidden */
    private _semanticHighlightingKey: string;
    /** @hidden */
    private _forceSemanticHighlighting = false;
    /** @hidden */
    private readonly _isShownSortSettingsInToolbar$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    private readonly _isShownFilterSettingsInToolbar$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    private readonly _isShownGroupSettingsInToolbar$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    private readonly _isShownColumnSettingsInToolbar$ = new BehaviorSubject<boolean>(false);
    /**
     * @hidden
     * Indicates when all items are checked
     */
    private _checkedAll = false;
    /**
     * @hidden
     * Indicates whether at least 1 item is checked
     */
    private _checkedAny = false;
    /** @hidden */
    private _subscriptions = new Subscription();
    /** @hidden */
    private _viewInitiated = false;
    /** @hidden */
    private _addedItems: T[] = [];
    /** @hidden */
    private _columnsWidthSet = false;
    /** @hidden */
    private _dndLoadingState = false;
    /** @hidden */
    private readonly _rangeSelector = new RangeSelector();
    /** @hidden */
    private _currentPreset: PlatformTableManagedPreset = {};
    /** @hidden */
    private _initialStateSet = false;
    /** @hidden */
    private _rowHeightManuallySet = false;
    /** @hidden */
    private _shouldEmitRowsChange = false;
    /** @hidden */
    private readonly _tableHeaderResizer = inject(TableHeaderResizerDirective);

    /**
     * @hidden
     * Mapping function for the trackBy, provided by the user.
     * Is needed, because we are wrapping user supplied data into a `TableRow` class.
     */
    _rowTrackBy: TrackByFunction<TableRow<T>> | TrackByFunction<number>;

    /** @hidden */
    private readonly _defaultTrackBy: TrackByFunction<number> = (index: number) => index;

    /** @hidden */
    constructor(
        private readonly _ngZone: NgZone,
        private readonly _cdr: ChangeDetectorRef,
        readonly _tableService: TableService,
        private readonly _tableScrollDispatcher: TableScrollDispatcherService,
        public readonly _tableColumnResizeService: TableColumnResizeService,
        private readonly _elRef: ElementRef,
        @Optional() private readonly _rtlService: RtlService,
        readonly contentDensityObserver: ContentDensityObserver,
        readonly injector: Injector
    ) {
        super();
        this.initialState?.setTable(this);
        this._dndTableDirective?.setTable(this);
        this._virtualScrollDirective?.setTable(this);
        this._dataSourceDirective.setTable(this);

        this._rowTrackBy = this._defaultTrackBy;
        this._toolbarContext = {
            counter: this._dataSourceDirective.totalItems$,
            sortable: this._isShownSortSettingsInToolbar$,
            filterable: this._isShownFilterSettingsInToolbar$,
            groupable: this._isShownGroupSettingsInToolbar$,
            columns: this._isShownColumnSettingsInToolbar$
        };

        this.tableColumnsStream = this._tableService.tableColumns$.asObservable();

        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe((isRtl) => {
                    this._rtl = isRtl;
                    this._cdr.markForCheck();
                })
            );
        }
    }

    /** Returns array of rows that are currently in viewport. */
    getRowsInViewport(): number[] {
        return this._tableRowsInViewPortPlaceholder;
    }

    /**
     * Sets an array of rows that are currently in viewport.
     * @param startIndex Start index of all rows.
     * @param length Length of viewport rows.
     */
    setRowsInViewport(startIndex = 0, length: number): void {
        this._tableRowsInViewPortPlaceholder = new Array(length).fill(null).map((_, i) => i + startIndex);
        this._cdr.detectChanges();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('loading' in changes) {
            this._tableService.setTableLoading(this.loadingState);
        }

        if ('trackBy' in changes) {
            this._rowTrackBy =
                typeof this.trackBy === 'function'
                    ? (index) => this.trackBy(index, this._tableRowsVisible[index].value)
                    : this._defaultTrackBy;
        }

        // changes below should be checked only after view is initialized
        if (!this._viewInitiated) {
            return;
        }

        if ('selectionMode' in changes) {
            this._rangeSelector.reset();
        }

        if (
            'selectionMode' in changes ||
            'freezeColumnsTo' in changes ||
            'freezeEndColumnsTo' in changes ||
            'semanticHighlighting' in changes
        ) {
            this.recalculateTableColumnWidth();
        }

        if ('rowNavigatable' in changes) {
            this._tableRows.forEach((row) => (row.navigatable = isRowNavigatable(row.value, this.rowNavigatable)));

            this._calculateIsShownNavigationColumn();
        }

        if ('rowHeight' in changes) {
            this._rowHeightManuallySet = true;
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._tableColumnResizeService.setTableRef(this);

        this._isGroupTable = (this.initialState?.initialGroupBy?.length ?? 0) > 0;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._viewInitiated = true;

        this.initialState?.setInitialState();

        this._dataSourceDirective.initializeDataSource();

        this._listenToTableStateChanges();

        this._listenToColumns();

        this._calculateVisibleColumns();

        this._tableService.constructTableMetadata();

        this._listenToTableRowsPipe();

        this._listenToPageScrolling();

        this._virtualScrollDirective?.listenOnVirtualScroll();

        this._listenToRowHeightChange();

        this._listenToColumnPropertiesChange();

        this._listenToTableWidthChanges();

        this._listenToTableContainerMouseLeave();

        this._listenToLoadingAndRefocusCell();

        if (this.expandOnInit) {
            this.expandAll();
        }

        this._subscriptions.add(
            this._virtualScrollDirective?.virtualScrollTransform$
                .pipe(filter(() => !!this._virtualScrollDirective?.virtualScroll && !!this._tableBody))
                .subscribe((transform) => {
                    this._tableBody.nativeElement.style.transform = `translateY(${transform}px)`;
                })
        );

        if (this._focusableGrid) {
            this._focusableGrid.shortRowFocus = 'first';
        }
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        // When table rows are set, emit an event to manipulate the view (e.g., scroll to some row).
        if (!this._shouldEmitRowsChange) {
            return;
        }
        this._shouldEmitRowsChange = false;
        const emitter = this.tableRowsSet;
        this._onZoneFree(() => {
            emitter.emit();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this._tableService.getTableState();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this._tableService.setTableState(state);
        this._cdr.markForCheck();
    }

    /** Get table columns definition list. */
    getTableColumns(): TableColumn[] {
        return this.columns?.toArray() || [];
    }

    /** Get a list of visible table columns. */
    getVisibleTableColumns(): TableColumn[] {
        return this._visibleColumns || [];
    }

    /** Set Sorting rules */
    sort(sortRules: CollectionSort[]): void {
        this._tableService.setSort(sortRules);
        this._cdr.markForCheck();
    }

    /** Add Sorting rules to the existing ones */
    addSort(sortRules: CollectionSort[]): void {
        this._tableService.addSort(sortRules);
        this._cdr.markForCheck();
    }

    /** Set Filter rules */
    filter(filterRules: CollectionFilter[]): void {
        this._tableService.setFilters(filterRules);
        this._cdr.markForCheck();
    }

    /** Add Filter rule */
    addFilter(filterRules: CollectionFilter[]): void {
        this._tableService.addFilters(filterRules);
        this._cdr.markForCheck();
    }

    /** Removes filters for the provided fields */
    removeFilter(fields: string[]): void {
        this._tableService.removeFilters(fields);
        this._cdr.markForCheck();
    }

    /** Set Groups */
    group(groups: CollectionGroup[]): void {
        this._tableService.setGroups(groups);
        this._cdr.markForCheck();
    }

    /** Add Groups */
    addGroup(groups: CollectionGroup[]): void {
        this._tableService.addGroups(groups);
        this._cdr.markForCheck();
    }

    /**
     * Set visible table columns
     * The order is matter
     * @param columns table columns names
     */
    setColumns(columns: string[]): void {
        const tableColumns = this.getTableColumns();
        const columnsObject: Record<string, string[]> = {
            columns: [],
            keys: []
        };
        tableColumns
            .filter((column) => columns.includes(column.name))
            // We need to have same order of columns as user defined.
            .sort((a, b) => columns.indexOf(a.name) - columns.indexOf(b.name))
            .reduce((acc, column) => {
                acc.columns.push(column.name);
                acc.keys.push(column.key);
                return acc;
            }, columnsObject);
        this._tableService.setColumns(columnsObject.columns, columnsObject.keys);
        this._cdr.markForCheck();
    }

    /** Freeze table to column */
    freezeToColumn(columnName: string, end?: boolean): void {
        end ? (this.freezeEndColumnsTo = columnName) : (this.freezeColumnsTo = columnName);

        this._tableService.freezeTo(columnName, end);
        this.recalculateTableColumnWidth();
    }

    /** Unfreeze column */
    unfreeze(columnName: string, end?: boolean): void {
        const columns = end ? this._freezableEndColumns : this._freezableColumns;
        const freezeToColumnIndex = columns.get(columnName) ?? -1;
        const freezeToPreviousColumnName = columns[freezeToColumnIndex - 1];

        end
            ? (this.freezeEndColumnsTo = freezeToPreviousColumnName)
            : (this.freezeColumnsTo = freezeToPreviousColumnName);

        this._tableService.freezeTo(freezeToPreviousColumnName, end);
        this.recalculateTableColumnWidth();
    }

    /** expand all rows */
    expandAll(): void {
        const expandableRows = this._tableRows.filter((row) => row.type === TableRowType.TREE);
        if (this._dataSourceDirective.childDataSource) {
            this._tableRowService.loadChildRows(expandableRows);
        }
        this._markAsExpanded(expandableRows);
        this.allRowsExpanded.emit();
    }

    /** @hidden */
    private _markAsExpanded(rows: TableRow<T>[]): void {
        rows.forEach((e) => {
            e.expanded = true;
            e.hidden = false;
        });
        this.onTableRowsChanged();
    }

    /** collapse all rows */
    collapseAll(): void {
        this._tableRows.forEach((e) => {
            e.expanded = false;
            if (e.parent) {
                e.hidden = true;
            }
        });
        this.onTableRowsChanged();
        this.allRowsCollapsed.emit();
    }

    /** Search in table */
    search(searchInput: SearchInput): void {
        this._tableService.search(searchInput);
        this._cdr.markForCheck();
    }

    /** Search in table */
    setCurrentPage(currentPage: number): void {
        this._tableService.setCurrentPage(currentPage);
        this._cdr.markForCheck();
    }

    /** Toolbar Sort Settings button visibility */
    showSortSettingsInToolbar(showSortSettings: boolean): void {
        this._isShownSortSettingsInToolbar$.next(showSortSettings);
    }

    /** Toolbar Filter Settings button visibility */
    showFilterSettingsInToolbar(showFilterSettings: boolean): void {
        this._isShownFilterSettingsInToolbar$.next(showFilterSettings);
    }

    /** Toolbar Group Settings button visibility */
    showGroupSettingsInToolbar(showGroupSettings: boolean): void {
        this._isShownGroupSettingsInToolbar$.next(showGroupSettings);
    }

    /** Toolbar Columns Settings button visibility */
    showColumnSettingsInToolbar(showColumnSettings: boolean): void {
        this._isShownColumnSettingsInToolbar$.next(showColumnSettings);
    }

    /** Disable filter from column heder menu */
    setHeaderColumnFilteringDisabled(disabled: boolean): void {
        this._tableService._isFilteringFromHeaderDisabled$.next(disabled);
    }

    /** Set the row navigation */
    setRowNavigation(rowIndex: number, rowNavigatable: string | boolean): void {
        const row = this._tableRows[rowIndex];

        if (!row) {
            return;
        }

        row.navigatable = isRowNavigatable(row.value, rowNavigatable);

        this._calculateIsShownNavigationColumn();

        this._cdr.markForCheck();
    }

    /**
     * Toggle row checked state.
     * @param rowIndex Index of the row.
     */
    toggleSelectableRow(rowIndex: number): void {
        const row = this._tableRows[rowIndex];

        if (!row || row.value[this.selectableKey] === false) {
            return;
        }

        if (this.selectionMode === SelectionMode.SINGLE) {
            this._toggleSingleSelectableRow(row);
        } else if (this.selectionMode === SelectionMode.MULTIPLE) {
            this._toggleMultiSelectRow(row);
        }
    }

    /**
     * Sets the checked state of the row.
     * @param rowIndex Index of the row.
     * @param value Value of the checked state.
     */
    setRowCheckedState(rowIndex: number, value: boolean): void {
        const row = this._tableRows[rowIndex];

        if (!row) {
            return;
        }

        if (row.checked !== value) {
            this.toggleSelectableRow(rowIndex);
        }
    }

    /** Remove the row navigation */
    removeRowNavigation(rowIndex: number): void {
        const row = this._tableRows[rowIndex];

        if (!row) {
            return;
        }

        row.navigatable = false;

        this._calculateIsShownNavigationColumn();

        this._cdr.markForCheck();
    }

    /** Manually triggers column's width recalculation */
    recalculateTableColumnWidth(): void {
        this._tableColumnResizeService.setColumnNames(this._visibleColumns.map((column) => column.name));
        this._setFreezableInfo();
    }

    /** Gets the max allowed width for all freezable columns */
    getMaxAllowedFreezableColumnsWidth(): number {
        if (!this._freezableColumns.size) {
            return 0;
        }

        /** Themeable scrollbar has 0.75rem in dimension */
        const scrollbarSizeInPx = 12;

        return this._tableWidthPx - this._fixedColumnsPadding - scrollbarSizeInPx - 1;
    }

    /** Get table data source */
    getDataSource(): TableDataSource<T> {
        return this._dataSourceDirective._tableDataSource;
    }

    /**
     * Adds empty row for editing at the beginning of the rows array.
     */
    addRow(): void {
        this._forceSemanticHighlighting = true;
        this._setSemanticHighlighting();

        const newRow = buildNewRowSkeleton(this.editableRowSkeleton, this.columns.toArray());
        newRow[this.semanticHighlighting] = EDITABLE_ROW_SEMANTIC_STATE;

        this._addedItems.unshift(newRow);

        const newRows = this._createTableRowsByDataSourceItems([newRow]);
        this._newTableRows = [...newRows, ...this._newTableRows];

        this._setTableRows();
        this.emptyRowAdded.emit();
    }

    /** Cancels editing and discards newly added rows */
    cancelEditing(): void {
        this._resetEditState();
        this.cancel.emit();
    }

    /**
     * Emits save event and resets editable rows array.
     */
    saveRows(): void {
        const event = new SaveRowsEvent<T>(() => {
            this._dataSourceDirective._tableDataSource.fetch(this.getTableState());
        }, [...this._addedItems]);
        const editableCells: EditableTableCell[] = ([] as EditableTableCell[]).concat.apply(
            [],
            Array.from(this._tableRowService.editableCells.values())
        );

        const forms = [...this.customEditableCells.toArray(), ...editableCells].map((t) => t.form);

        // Trigger form revalidation
        forms.forEach((form) => form.onSubmit(null as any));
        if (forms.some((form) => form.invalid)) {
            return;
        }

        this._resetEditState();
        this.save.emit(event);
    }

    /** Sets current preset for the Table. */
    setPreset(data: PlatformTableManagedPreset): void {
        this._currentPreset = data;
        const newState: TableState = Object.assign({}, this._tableService.getDefaultState(), data);
        this._tableService.setSort(newState.sortBy);
        this._tableService.setFilters(newState.filterBy);
        this._tableService.setGroups(newState.groupBy);
        this.setColumns(newState.columns);
        this._tableService.search(newState.searchInput);
        this._tableService.freezeTo(newState.freezeToColumn);
        this.pageSize = newState.page.pageSize;
        this._tableService.setCurrentPage(newState.page.currentPage);
        this._tableService.setTableState(newState);
    }

    /** Returns current preset configuration. */
    getCurrentPreset(): PlatformTableManagedPreset {
        if (!this._currentPreset) {
            return this.getTableState();
        }
        // We need to return object as similar as the original preset.
        const currentPreset = { ...this._currentPreset };
        const presetKeys = Object.keys(currentPreset);
        const currentState = this.getTableState();

        Object.keys(currentState).forEach((stateKey) => {
            // Skip state entry if it's not present in preset and doesn't have any value.
            if (
                stateKey === 'columnKeys' ||
                ((!currentState[stateKey] ||
                    (Array.isArray(currentState[stateKey]) && currentState[stateKey]?.length === 0)) &&
                    !presetKeys.includes(stateKey))
            ) {
                return;
            }

            currentPreset[stateKey] = currentState[stateKey];
        });

        return currentPreset;
    }

    /**
     * Programmatically toggles `expand` state of the row with defined index.
     * @param rowIndexes row indexes including nested rows.
     *
     * Usage example:
     * * To toggle first level row, pass one argument:
     * ```
     * table.toggleGroupRows(0) // Will result in toggling first row if it's type is `TableRowType.TREE` or `TableRowType.GROUP`.
     * ```
     * * To toggle nested rows, pass additional arguments of indexes:
     * ```
     * table.toggleGroupRows(0, 1) // Will result in toggling first root row, then it's second child.
     * ```
     */
    toggleGroupRows(...rowIndexes: number[]): void {
        let tableRow: TableRow | null = null;
        for (const rowIndex of rowIndexes) {
            tableRow = tableRow ? tableRow.children[rowIndex] : this._tableRows[rowIndex];

            if (tableRow.type === TableRowType.ITEM) {
                break;
            }

            this._toggleGroupRow(tableRow);
        }
    }

    // Private API

    /** @hidden */
    _scrollToOverlappedCell(): void {
        this.tableScrollable.scrollToOverlappedCell(
            this._rtl,
            this._freezableColumns.size,
            this._freezableEndColumns.size
        );
    }

    /** @hidden */
    _calculatingLoading(isLoading: boolean): void {
        if (this._dndLoadingState === isLoading) {
            return;
        }

        this._dndLoadingState = isLoading;
        this._tableService.setTableLoading(this.loadingState);
    }

    /**
     * @hidden
     * Toggle selectable row in SelectionMode.MULTIPLE
     */
    _toggleMultiSelectRow(rowToToggle: TableRow, event?: Event): void {
        if (this.selectionMode !== SelectionMode.MULTIPLE) {
            throw new Error('Unexpected selection mode');
        }
        const checked = (rowToToggle.checked = !rowToToggle.checked);
        const rows = this._tableRows;
        const selectedIndex = this._tableRows.findIndex((row) => row === rowToToggle);

        const removed: TableRow<T>[] = [];
        const added: TableRow<T>[] = [];
        this._rangeSelector.onRangeElementToggled(selectedIndex, event as PointerEvent | KeyboardEvent);

        this._rangeSelector.applyValueToEachInRange((idx) => {
            const row = rows[idx];
            if (row.type === TableRowType.ITEM || row.isTree) {
                row.checked = checked;
                checked ? added.push(row) : removed.push(row);

                this._applyTristateSelection(row, added, removed);
            }
        });

        this._emitRowSelectionChangeEvent(added, removed);

        this._calculateCheckedAll();
    }

    /**
     * @hidden
     * Toggle selectable row in SelectionMode.SINGLE
     */
    _toggleSingleSelectableRow(rowToToggle: TableRow): void {
        if (this.selectionMode !== SelectionMode.SINGLE) {
            throw new Error('Unexpected selection mode');
        }

        const checked = (rowToToggle.checked = !rowToToggle.checked);
        const removed: TableRow<T>[] = [];
        const added: TableRow<T>[] = [];

        // uncheck previously checked
        getSelectableRows(this._tableRows, this.selectableKey).forEach((row) => {
            if (row === rowToToggle) {
                return;
            }

            if (row.checked) {
                row.checked = false;
                removed.push(row);
            }
        });
        checked ? added.push(rowToToggle) : removed.push(rowToToggle);

        this._emitRowSelectionChangeEvent(added, removed);

        this._calculateCheckedAll();
    }

    /**
     * @hidden
     * Select / Unselect all selectable rows
     */
    _toggleAllSelectableRows(selectAll: boolean): void {
        const removed: TableRow<T>[] = [];
        const added: TableRow<T>[] = [];

        getSelectableRows(this._tableRows, this.selectableKey).forEach((row) => {
            if (row.checked === selectAll) {
                return;
            }
            row.checked = selectAll;
            selectAll ? added.push(row) : removed.push(row);
        });

        this._rangeSelector.reset();

        this._shouldCheckNewRows = selectAll;

        this._emitRowSelectionChangeEvent(added, removed, true);

        this._calculateCheckedAll();
    }

    /**
     * @hidden
     * Create table row selection event
     */
    _emitRowSelectionChangeEvent(added: TableRow[], removed: TableRow[], all: boolean = false): void {
        const selected = getSelectableRows(this._tableRows, this.selectableKey)
            .filter(({ checked }) => checked)
            .map(({ value }) => value);

        this.rowSelectionChange.emit({
            source: this,
            selection: selected,
            added: added.map(({ value }) => value),
            removed: removed.map(({ value }) => value),
            index: added.concat(removed).map(({ index }) => index),
            all
        });
    }

    /** @hidden */
    _onCellClick(colIdx: number, row: TableRow<T>): void {
        if (row.state === 'readonly' && isTreeRowFirstCell(colIdx, row)) {
            this._toggleGroupRow(row);
        }
    }

    /** @hidden */
    _onRowClick(row: TableRow<T> | null, event: KeyboardEvent | MouseEvent): void {
        if (row && row.state !== 'readonly') {
            return;
        }

        if (event && event instanceof KeyboardEvent && KeyUtil.isKeyCode(event, SPACE)) {
            const eventTarget = event.target as HTMLInputElement;
            if (
                eventTarget.type === 'checkbox' ||
                (eventTarget.tagName !== 'INPUT' &&
                    eventTarget.tagName !== 'BUTTON' &&
                    eventTarget.tagName !== 'TEXTAREA')
            ) {
                event.preventDefault(); // prevent page scroll but still allow space presses in inputs
            }
        }

        if (row) {
            this._emitRowNavigate(row);
            this._emitRowActivate(row);
        }
    }

    /** @hidden */
    _emitRowActivate(row: TableRow<T>): void {
        if (!this.rowsActivable) {
            return;
        }

        const rowIndex = this._tableRows.indexOf(row);
        this.rowActivate.emit(new TableRowActivateEvent<T>(rowIndex, row.value));
    }

    /**
     * @hidden
     * Expand/Collapse group row
     */
    _toggleGroupRow(groupRow: TableRow<T>): void {
        if (this._dndTableDirective?.dragDropInProgress) {
            return;
        }

        this.toggleExpandableTableRow(groupRow);

        const groupRowIndex = this._tableRows.indexOf(groupRow);
        this.rowToggleOpenState.emit(
            new TableRowToggleOpenStateEvent(groupRowIndex, groupRow.value, groupRow.expanded)
        );
    }

    /** @hidden */
    _emitRowNavigate(row: TableRow<T>): void {
        if (!row.navigatable) {
            return;
        }
        const rowIndex = this._tableRows.indexOf(row);

        if (this.highlightNavigatedRow) {
            this._navigatedRowIndex = rowIndex;
        }

        this.rowNavigate.emit(new TableRowActivateEvent<T>(rowIndex, row.value));
    }

    /** Fetch data source data. */
    fetch(): void {
        this._dataSourceDirective._tableDataSource.fetch(this.getTableState());
    }

    /** @hidden */
    onTableRowsChanged(): void {
        this._calculateVisibleTableRows();
        this._calculateCheckedAll();
    }

    /** @hidden */
    toggleExpandableTableRow(rowToToggle: TableRow, forceFetch = false): void {
        rowToToggle.forceFetch = forceFetch;
        const expanded = (rowToToggle.expanded = !rowToToggle.expanded);

        findRowChildren(rowToToggle, this._tableRows).forEach((row) => {
            // if parent is collapsed we want to hide all nested items
            if (!expanded) {
                row.hidden = true;
                row.expanded = false;
            }

            // if parent is expanded, we want to show only items which direct parents are expanded as well
            if (expanded) {
                row.hidden = !getRowParents(row, rowToToggle).every((parent) => parent.expanded);
            }
        });

        this.onTableRowsChanged();
    }

    /** @hidden */
    _onSpyIntersect(intersected: boolean): void {
        if (!intersected) {
            return;
        }
        const {
            page: { currentPage, pageSize }
        } = this.getTableState();
        const totalItems = this._dataSourceDirective.totalItems$.value;
        const lastPage = Math.ceil(totalItems / (pageSize || totalItems));
        if (currentPage >= lastPage) {
            return;
        }
        this._ngZone.run(() => {
            this.setCurrentPage(currentPage + 1);
        });
    }

    /** @hidden */
    private _listenToTableRowsPipe(): void {
        this._subscriptions.add(
            this._dataSourceDirective.items$
                .pipe(
                    // map source items to table rows
                    map((source: T[]) => this._createTableRowsByDataSourceItems(source)),
                    // Insert items to show groups
                    switchMap((rows: TableRow[]) =>
                        this.isTreeTable
                            ? of(rows)
                            : this._tableService.groupRules$.pipe(
                                  map((groupRules) =>
                                      this._tableRowService.groupTableRows(rows, groupRules.values(), groupRules)
                                  )
                              )
                    )
                )
                .subscribe((rows) => {
                    rows =
                        this.pageScrolling && this.getTableState().page.currentPage > 1
                            ? [...this._tableRows, ...rows]
                            : rows;
                    this._setTableRows(rows);
                })
        );

        this._dataSourceDirective.childItems$
            .pipe(
                map((items) => {
                    const rowMap = new Map<TableRow<T>, TableRow<T>[]>();
                    items.forEach((rowItems, parentRow) => {
                        rowMap.set(
                            parentRow,
                            this._createTableRowsByDataSourceItems(rowItems).map((row) => {
                                row.parent = parentRow;
                                row.level = parentRow.level + 1;
                                row.hidden = !parentRow.expanded;
                                return row;
                            })
                        );
                    });

                    return rowMap;
                })
            )
            .subscribe((items) => {
                items.forEach((rows, parentRow) => {
                    this._tableRows.splice(parentRow.index + parentRow.children.length + 1, 0, ...rows);

                    parentRow.children.push(...rows);

                    parentRow.lastChild = parentRow.children[parentRow.children.length - 1];

                    this._tableRows.forEach((row, index) => {
                        row.index = index;
                    });

                    this._setTableRows(this._tableRows);
                });
            });
    }

    /** @hidden */
    private _listenToTableStateChanges(): void {
        this._subscriptions.add(
            this._tableService.tableStateChanges$.subscribe(() => {
                this.presetChanged.emit(this.getCurrentPreset());
            })
        );
        this._subscriptions.add(
            this._tableService.needFetch$
                .pipe(
                    map(() => this._tableService.getTableState()),
                    filter((state) => !!state && !!this._dataSourceDirective._tableDataSource),
                    distinctUntilChanged()
                )
                .subscribe((state) => {
                    this._dataSourceDirective._tableDataSource.fetch(state);
                })
        );

        this._subscriptions.add(
            this._tableService.groupRules$.subscribe((rules) => {
                this._isGroupTable = rules.size > 0;
            })
        );

        this._subscriptions.add(
            this._tableService.stateChange$.subscribe(({ type, state }) => {
                switch (type) {
                    case 'columns':
                        this._calculateVisibleColumns();
                        this.recalculateTableColumnWidth();

                        this.columnsChange.emit(new TableColumnsChangeEvent(this, state.current, state.previous));
                        break;
                    case 'filter':
                        this.filterChange.emit(new TableFilterChangeEvent(this, state.current, state.previous));
                        break;
                    case 'freeze':
                        this.columnFreeze.emit(new TableColumnFreezeEvent(this, state.current, state.previous));
                        this.fixed = !!this.fixed || !!this._freezableColumns.size || !!this._freezableEndColumns.size;
                        break;
                    case 'search':
                        break;
                    case 'group':
                        this._calculateVisibleColumns();
                        this.recalculateTableColumnWidth();

                        this.groupChange.emit(new TableGroupChangeEvent(this, state.current, state.previous));
                        break;
                    case 'page':
                        this.pageChange.emit(new TablePageChangeEvent(this, state.current, state.previous));
                        break;
                    case 'sort':
                        this.sortChange.emit(new TableSortChangeEvent(this, state.current, state.previous));
                        break;
                }
            })
        );

        this._listenToTableRowStateChange();
    }

    /** @hidden */
    private _listenToTableRowStateChange(): void {
        this._subscriptions.add(
            this._tableRowService.scrollToOverlappedCell$.subscribe(() => {
                this._scrollToOverlappedCell();
            })
        );

        this._subscriptions.add(
            this._tableRowService.loadChildRows$.subscribe((rows) => {
                const state = this.getTableState();
                rows.forEach((row) => {
                    this._dataSourceDirective.childDataSource?.dataProvider
                        .rowChildrenCount(row, state)
                        .pipe(
                            filter((count) => row.forceFetch || count > row.children.length),
                            tap(() => (row.forceFetch = false)),
                            take(1)
                        )
                        .subscribe(() => {
                            const rowState = {
                                ...state,
                                ...{
                                    page: {
                                        currentPage: Math.floor(row.children.length / state.page.pageSize) + 1,
                                        pageSize: state.page.pageSize
                                    }
                                }
                            };
                            this._dataSourceDirective.childDataSource?.fetch(rowState, [row]);
                        });
                });
            })
        );

        this._subscriptions.add(
            this._tableRowService.cellClicked$.subscribe((evt) => {
                this._onCellClick(evt.index, evt.row);
            })
        );

        this._subscriptions.add(
            this._tableRowService.toggleAllSelectableRows$.subscribe((evt) => {
                this._toggleAllSelectableRows(evt);
            })
        );

        this._subscriptions.add(
            this._tableRowService.toggleRow$.subscribe((evt) => {
                switch (evt.type) {
                    case 'toggleRow':
                        this._toggleGroupRow(evt.row);
                        break;
                    case 'toggleMultiSelectRow':
                        this._toggleMultiSelectRow(evt.row, evt.event);
                        break;
                    case 'toggleSingleSelectableRow':
                        this._toggleSingleSelectableRow(evt.row);
                        break;
                }
            })
        );
    }

    /** @hidden */
    private _createTableRowsByDataSourceItems(source: T[]): TableRow<T>[] {
        let rows: TableRow<T>[];
        if (this.isTreeTable) {
            rows = this._createTreeTableRowsByDataSourceItems(source);
        } else {
            rows = convertObjectsToTableRows(
                source,
                this._addedItems,
                this.selectedKey,
                this.rowNavigatable,
                this.selectionMode,
                this._tableRows,
                this.rowComparator
            );
        }

        if (this._shouldCheckNewRows && this.forceCheckedAllState) {
            rows.forEach((row) => {
                row.checked = row.checked || true;
            });
        }

        return rows;
    }

    /** @hidden */
    private _createTreeTableRowsByDataSourceItems(source: T[]): TableRow<T>[] {
        const item = source[0] as any;

        if (isTableRow(item)) {
            return convertTreeTableRowToFlatList(source as TableRow[], this.rowNavigatable);
        }

        if (isJsObject(item)) {
            return convertTreeObjectsToTableRows(
                source,
                this.selectionMode,
                this._tableRows,
                this.rowComparator,
                this.relationKey,
                this.hasChildrenKey,
                this.selectedKey,
                this.expandedStateKey,
                this.rowNavigatable
            );
        }
        return [];
    }

    /** @hidden */
    private _setTableRows(rows = this._dataSourceTableRows): void {
        this._dataSourceTableRows = rows;
        this._tableRows = [...this._newTableRows, ...this._dataSourceTableRows];
        this.onTableRowsChanged();

        this._calculateIsShownNavigationColumn();
        this._rangeSelector.reset();

        this._shouldEmitRowsChange = true;

        if (rows.length && !this._columnsWidthSet) {
            this.recalculateTableColumnWidth();
            this._columnsWidthSet = true;
        }

        this._cdr.detectChanges();
    }

    /** @hidden */
    private _calculateVisibleTableRows(): void {
        this._tableRowsVisible = this._tableRows.filter((row) => !row.hidden);

        if (this._virtualScrollDirective?.virtualScroll) {
            this._virtualScrollDirective.calculateVirtualScrollRows();
        } else {
            this.setRowsInViewport(0, this._tableRowsVisible.length);
        }
    }

    /** @hidden */
    private _listenToRowHeightChange(): void {
        this._subscriptions.add(
            this.contentDensityObserver
                .pipe(
                    tap(() => {
                        this._setSelectionColumnWidth();
                    }),
                    filter(() => !this._rowHeightManuallySet)
                )
                .subscribe((contentDensity) => {
                    this.rowHeight = ROW_HEIGHT.get(contentDensity) ?? ROW_HEIGHT.get(ContentDensityMode.COZY)!;
                    if (this._virtualScrollDirective?.virtualScroll) {
                        this._virtualScrollDirective.rowHeight = this.rowHeight;
                        this._virtualScrollDirective.calculateVirtualScrollRows();
                    }
                })
        );
    }

    /** @hidden */
    private _listenToColumns(): void {
        this.columns.changes.pipe(startWith(null)).subscribe(() => {
            const columns = this.getTableColumns();
            const prevColumns = this._tableService.tableColumns$.value.map((column) => column.name);
            const currentColumns = columns.map((column) => column.name);

            const newColumns = columns
                .filter((column) => column.visible && !prevColumns.includes(column.name))
                .map((c) => c.name);
            const stateColumns = this.getTableState().columns;

            this._buildColumnsMap(columns);
            this._tableService.tableColumns$.next(columns);

            if (this._initialStateSet) {
                this.setColumns([...stateColumns, ...newColumns]);
            }

            this._initialStateSet = true;

            const updatedColumns = this._tableService.tableColumns$.value.map((column) => column.name);

            if (!equal(updatedColumns, currentColumns)) {
                this._tableService.stateChange$.next({
                    type: 'columns',
                    state: { previous: currentColumns, current: updatedColumns }
                });
                this._tableService.columnsChange$.next({ previous: currentColumns, current: updatedColumns });
            }
            this._tableService.detectChanges();
        });
    }

    /**
     * Construct visible columns for rendering purpose.
     */
    private _calculateVisibleColumns(): void {
        const columnsDefinition = this.getTableColumns();
        const { columns, groupBy } = this.getTableState();
        const groupedColumnsToHide = groupBy.filter(({ showAsColumn }) => !showAsColumn).map(({ field }) => field);

        const allColumns = columns // need to start mapping from state.columns list to keep right order
            .map((name) => columnsDefinition.find((column) => column.name === name))
            .filter((column): column is TableColumn => !!column)
            .filter(({ key }) => !groupedColumnsToHide.includes(key));

        const [visibleColumns, poppingColumns] = allColumns.reduce(
            (acc, column) => {
                if (column.responsiveState === 'hidden') {
                    return acc;
                }
                acc[column.responsiveState === 'visible' ? 0 : 1].push(column);
                return acc;
            },
            [[], []] as TableColumn[][]
        );

        this._tableService.setVisibleColumns(visibleColumns);
        this._tableService.setPoppingColumns(poppingColumns);

        this._cdr.detectChanges();

        this._calculateTableColumnsLength();
    }

    /** @hidden */
    private _calculateTableColumnsLength(): void {
        this._tableColumnsLength = this._visibleColumns.length + (this._isShownSelectionColumn ? 1 : 0);
    }

    /** @hidden */
    private _calculateIsShownNavigationColumn(): void {
        this._tableService._isShownNavigationColumn$.next(this._tableRows.some((tableRow) => tableRow.navigatable));
    }

    /** @hidden */
    private _setFreezableInfo(): void {
        this._freezableColumns = getFreezableColumns(this._visibleColumns, this.freezeColumnsTo);
        this._freezableEndColumns = getFreezableEndColumns(this._visibleColumns, this.freezeEndColumnsTo);
        this.fixed = !!this.fixed || !!this._freezableColumns.size || !!this._freezableEndColumns.size;
        this.columns.forEach((column) => {
            column._freezed = this._freezableColumns.has(column.name);
            column._endFreezed = this._freezableEndColumns.has(column.name);
        });
    }

    /** @hidden */
    private _buildColumnsMap(columns = this._tableService.tableColumns$.value): void {
        this._keyToColumnMap = new Map(columns.map((column) => [column.key, column]));
    }

    /** @hidden */
    private _calculateCheckedAll(): void {
        const selectableRows = getSelectableRows(this._tableRows, this.selectableKey);
        const totalSelected = selectableRows.filter((r) => r.checked);
        this._checkedAll = totalSelected.length === selectableRows.length && selectableRows.length !== 0;
        this._checkedAny = totalSelected.length > 0;
        this._checkedState = this._checkedAll ? true : this._checkedAny ? null : false;
    }

    /**
     * Propagates tristate selection mode to the tree. It starts with updating a state for all the parents and then
     * to children
     *
     * @hidden
     */
    private _applyTristateSelection(row: TableRow, addedRows: TableRow<T>[], removedRows: TableRow<T>[]): void {
        if (!this.enableTristateMode) {
            return;
        }
        this._applySelectionToParents(row, addedRows, removedRows);
        this._applySelectionToChildren(row, addedRows, removedRows);
    }

    /** @hidden */
    private _applySelectionToParents(row: TableRow, addedRows: TableRow<T>[], removedRows: TableRow<T>[]): void {
        let currentRow = row.parent;

        while (currentRow) {
            const children = findRowChildren(currentRow, this._tableRows).filter((r) => r.parent === currentRow);
            const totalChecked = children.filter((r) => r.checked);
            const checkedAll = totalChecked.length === children.length;
            const checkedAny = totalChecked.length > 0;

            currentRow.checked = checkedAll ? true : checkedAny ? null : false;
            currentRow.checked || currentRow.checked === null
                ? addedRows.push(currentRow)
                : removedRows.push(currentRow);

            currentRow = currentRow.parent;
        }
    }

    /** @hidden */
    private _applySelectionToChildren(row: TableRow, addedRows: TableRow<T>[], removedRows: TableRow<T>[]): void {
        const allChilren = findRowChildren(row, this._tableRows);

        allChilren.forEach((r) => {
            r.checked = row.checked;
            r.checked ? addedRows.push(r) : removedRows.push(r);
        });
    }

    /** @hidden */
    private _listenToPageScrolling(): void {
        this._subscriptions.add(
            this._tableScrollDispatcher
                .scrolled()
                .pipe(
                    filter(() => this.pageScrolling),
                    map((scrollable) => scrollable.elementRef.nativeElement)
                )
                .subscribe(({ scrollTop }) => {
                    this.tableScrolled.emit(scrollTop);
                })
        );
    }

    /** @hidden */
    private _listenToColumnPropertiesChange(): void {
        this._subscriptions.add(
            this._tableService.markForCheck$.pipe(debounceTime(5)).subscribe(() => this._cdr.markForCheck())
        );
        this._subscriptions.add(
            this._tableService.detectChanges$.pipe(debounceTime(5)).subscribe(() => this._cdr.detectChanges())
        );
    }

    /** @hidden */
    private _listenToTableWidthChanges(): void {
        this._subscriptions.add(
            resizeObservable(this.tableContainer.nativeElement)
                .pipe(
                    tap(() => {
                        // this._tableContainerScrollWidth = this.tableContainer.nativeElement.scrollWidth;
                        this._checkCellMock();
                    }),
                    debounceTime(100)
                )
                .subscribe(() => {
                    this.recalculateTableColumnWidth();
                    if (this._freezableColumns.size || this._freezableEndColumns.size) {
                        this._tableColumnResizeService.updateFrozenColumnsWidth();
                        this._cdr.detectChanges();
                    }
                })
        );

        this._subscriptions.add(
            resizeObservable(this.table.nativeElement).subscribe(() => {
                // this._tableScrollWidth = this.table.nativeElement.scrollWidth;
                this._checkCellMock();
            })
        );
    }

    /** @hidden */
    private _listenToTableContainerMouseLeave(): void {
        this._ngZone.runOutsideAngular(() => {
            this._subscriptions.add(
                fromEvent(this.tableContainer.nativeElement, 'mouseleave').subscribe(() =>
                    this._tableColumnResizeService.hideResizer()
                )
            );
        });
    }

    /**
     * @hidden
     * Resets editable rows discarding the editable rows array.
     */
    private _resetEditState(): void {
        this._newTableRows = [];
        this._addedItems = [];
        this._forceSemanticHighlighting = false;
        this._setSemanticHighlighting();
        this._setTableRows();
    }

    /** @hidden */
    private _listenToLoadingAndRefocusCell(): void {
        this._subscriptions.add(
            this._tableService.tableLoading$.pipe(filter((loadingState) => !loadingState)).subscribe(() => {
                setTimeout(() => {
                    if (this._tableHeaderResizer.focusedCellPosition && this._focusableGrid) {
                        this._focusableGrid.focusCell(this._tableHeaderResizer.focusedCellPosition);
                    }
                });
            })
        );
    }

    /** @hidden */
    private _onZoneFree(callback: () => void): void {
        this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
            callback();
        });
    }

    /** @hidden */
    private _setSemanticHighlighting(): void {
        this._tableService._semanticHighlighting$.next(this.semanticHighlighting);
        this._tableService._semanticHighlightingColumnWidth$.next(this._semanticHighlightingColumnWidth);
    }

    /** @hidden */
    private _setSelectionColumnWidth(): void {
        this._selectionColumnWidth = this._isShownSelectionColumn
            ? SELECTION_COLUMN_WIDTH.get(this.contentDensityObserver.value) ?? 0
            : 0;
    }

    /** @hidden */
    private _checkCellMock(): void {
        this._tableColumnResizeService.cellMockVisible$.next(
            this._tableColumnResizeService.fixedWidth &&
                (this.tableContainer?.nativeElement?.scrollWidth ?? 0) > (this.table?.nativeElement?.scrollWidth ?? 0)
        );
    }
}
