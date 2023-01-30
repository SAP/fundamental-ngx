import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
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
    ViewChildren,
    ViewEncapsulation,
    ViewRef
} from '@angular/core';
import { NgForm } from '@angular/forms';
import set from 'lodash-es/set';
import { BehaviorSubject, fromEvent, isObservable, merge, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

import { FdDropEvent, KeyUtil, RangeSelector, resizeObservable, RtlService } from '@fundamental-ngx/cdk/utils';
import { TableComponent as FdTableComponent, TableRowDirective } from '@fundamental-ngx/core/table';
import { FDP_PRESET_MANAGED_COMPONENT, isDataSource, isString } from '@fundamental-ngx/platform/shared';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { cloneDeep, get } from 'lodash-es';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { EditableTableCell } from './table-cell.class';
import { TableResponsiveService } from './table-responsive.service';

import { TableService } from './table.service';
import { CollectionFilter, CollectionGroup, CollectionSort, CollectionStringFilter, TableState } from './interfaces';
import { SearchInput } from './interfaces/search-field.interface';
import {
    FILTER_STRING_STRATEGY,
    FilterableColumnDataType,
    SelectionMode,
    SelectionModeValue,
    SortDirection,
    TableRowType
} from './enums';
import {
    DEFAULT_HIGHLIGHTING_KEY,
    DEFAULT_SELECTABLE_KEY,
    DEFAULT_SELECTED_KEY,
    DEFAULT_TABLE_STATE,
    EDITABLE_ROW_SEMANTIC_STATE,
    SELECTION_COLUMN_WIDTH,
    SEMANTIC_HIGHLIGHTING_COLUMN_WIDTH
} from './constants';
import { TableDataSource } from './domain/table-data-source';
import { ArrayTableDataSource } from './domain/array-data-source';
import { ObservableTableDataSource } from './domain/observable-data-source';
import { TableColumn } from './components/table-column/table-column';
import { TABLE_TOOLBAR, TableToolbarWithTemplate } from './components/table-toolbar/table-toolbar';
import { Table } from './table';
import { TableScrollable, TableScrollDispatcherService } from './table-scroll-dispatcher.service';
import {
    ColumnsChange,
    FilterChange,
    FreezeChange,
    GroupChange,
    PlatformTableManagedPreset,
    RowComparator,
    SortChange,
    TableColumnFreezeEvent,
    TableColumnsChangeEvent,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRow,
    TableRowActivateEvent,
    TableRowClass,
    TableRowSelectionChangeEvent,
    TableRowsRearrangeEvent,
    TableRowToggleOpenStateEvent,
    TableSortChangeEvent,
    SaveRowsEvent
} from './models';
import { TableColumnResizeService } from './table-column-resize.service';
import {
    ContentDensityMode,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';

export type FdpTableDataSource<T> = T[] | Observable<T[]> | TableDataSource<T>;

type TreeLike<T> = T & {
    _children?: TreeLike<T>[];
};

interface GroupTableRowValueType {
    field: string;
    value: unknown;
    count: number;
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
        { provide: Table, useExisting: TableComponent },
        TableService,
        TableScrollDispatcherService,
        TableColumnResizeService,
        TableResponsiveService,
        contentDensityObserverProviders({
            supportedContentDensity: [
                ContentDensityMode.COMPACT,
                ContentDensityMode.COZY,
                ContentDensityMode.CONDENSED
            ],
            modifiers: {
                [ContentDensityMode.COMPACT]: 'fd-table--compact',
                [ContentDensityMode.CONDENSED]: 'fd-table--condensed'
            }
        }),
        {
            provide: FDP_PRESET_MANAGED_COMPONENT,
            useExisting: TableComponent
        }
    ],
    host: {
        class: 'fdp-table',
        '[class.fd-table--no-horizontal-borders]': 'noHorizontalBorders || noBorders',
        '[class.fd-table--no-vertical-borders]': 'noVerticalBorders || noBorders',
        '[class.fd-table--tree]': 'isTreeTable',
        '[class.fd-table--group]': '_isGroupTable',
        '[class.fdp-table--no-outer-border]': 'noOuterBorders'
    }
})
export class TableComponent<T = any> extends Table<T> implements AfterViewInit, OnDestroy, OnChanges, OnInit {
    /** Component name used in Preset managed component. */
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
     * Table data source.
     * Can be @type { T[] | Observable<T[]> | TableDataSource<T> }
     *
     */
    @Input()
    set dataSource(value: FdpTableDataSource<T>) {
        this._ds = value;

        if (value && this._viewInitiated) {
            this._initializeDS(value);
        }
    }

    get dataSource(): FdpTableDataSource<T> {
        return this._ds;
    }

    /**
     * Initial state of table.
     */
    @Input()
    set state(value: TableState) {
        this.setTableState(value || DEFAULT_TABLE_STATE);
    }

    get state(): TableState {
        return this.getTableState();
    }

    /** The column `name` to freeze columns up to and including. */
    @Input()
    freezeColumnsTo: string;

    /** Sets selection mode for the table. 'single' | 'multiple' | 'none' */
    @Input()
    selectionMode: SelectionModeValue = SelectionMode.NONE;

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

    // keeping "loading" field private to make sure "loadingState" is used instead
    /** Loading state */
    @Input()
    private loading: boolean | undefined;

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
    @Input()
    noOuterBorders = false;

    /** Table body without horizontal borders. */
    @Input()
    set noBorderX(value: boolean) {
        this._noBorderX = value;
    }

    get noBorderX(): boolean {
        return this._noBorderX || this.noBodyBorders;
    }

    /** @Hidden */
    private _noBorderX = false;

    /** Table body without vertical borders. */
    @Input()
    set noBorderY(value: boolean) {
        this._noBorderY = value;
    }

    get noBorderY(): boolean {
        return this._noBorderY || this.noBodyBorders;
    }

    /** @Hidden */
    private _noBorderY = false;

    /** Initial visible columns. Consist of a list of unique column names */
    @Input()
    initialVisibleColumns: string[];

    /** Initial sort options. */
    @Input()
    initialSortBy: CollectionSort[] = [];

    /** Initial filter options. */
    @Input()
    initialFilterBy: CollectionFilter[] = [];

    /** Initial group options. */
    @Input()
    initialGroupBy: CollectionGroup[] = [];

    /** Whether tree mode is enabled. */
    @Input()
    isTreeTable: boolean;

    /** Accessor to a children nodes of tree. */
    @Input()
    relationKey: string;

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

    /** Value with the key of the row item's field to compute semantic state of the row.  */
    @Input()
    set semanticHighlighting(value: string) {
        this._semanticHighlightingKey = value;
    }

    get semanticHighlighting(): string {
        if (!this._semanticHighlightingKey && this._forceSemanticHighlighting) {
            return DEFAULT_HIGHLIGHTING_KEY;
        }

        return this._semanticHighlightingKey;
    }

    /** @hidden */
    private _semanticHighlightingKey: string;

    /** @hidden */
    private _forceSemanticHighlighting = false;

    /** Value with the key of the row item's field to enable selecting.  */
    @Input()
    set selectedKey(value: string) {
        this._selectedKey = value;
    }

    get selectedKey(): string {
        if (!this._selectedKey && this._forceSelected) {
            return DEFAULT_SELECTED_KEY;
        }

        return this._selectedKey;
    }

    /** @hidden */
    private _selectedKey: string;

    /** @hidden */
    private _forceSelected = false;

    /** Value with the key of the row item's field to enable selecting.  */
    @Input()
    set selectableKey(value: string) {
        this._selectableKey = value;
    }

    get selectableKey(): string {
        if (!this._selectableKey && this._forceSelectable) {
            return DEFAULT_SELECTABLE_KEY;
        }

        return this._selectableKey;
    }

    /** @hidden */
    private _selectableKey: string;

    /** @hidden */
    private _forceSelectable = false;

    /**
     * Tracking function that will be used to check the differences in data changes.
     * Used similarly to `ngFor` `trackBy` function.
     * Accepts a function that takes two parameters, index and item.
     */
    @Input()
    trackBy: TrackByFunction<T>;

    /**
     * An optional function, that identifies uniqueness of a particular row.
     * Table component uses it to be able to preserve selection when data list is changed.
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

    /** Event fired when there is a change in the frozen column. */
    @Output()
    readonly columnFreeze: EventEmitter<TableColumnFreezeEvent> = new EventEmitter<TableColumnFreezeEvent>();

    /** Event fired when group/tree row collapsed/expanded. */
    @Output()
    readonly rowToggleOpenState = new EventEmitter<TableRowToggleOpenStateEvent<T>>();

    /** Event fired when tree rows rearranged through drag & drop. Consider that rows rearranged with their children rows. */
    @Output()
    readonly rowsRearrange = new EventEmitter<TableRowsRearrangeEvent<T>>();

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

    /** Event emitted when data loading is started. */
    @Output() // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    @Output() // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onDataReceived = new EventEmitter<void>();

    /** @hidden */
    @ViewChild('verticalScrollable')
    readonly verticalScrollable: TableScrollable;

    /** @hidden */
    @ViewChildren('columnHeaderPopover')
    readonly columnHeaderPopovers: QueryList<PopoverComponent>;

    /** @hidden */
    @ViewChild('tableContainer')
    readonly tableContainer: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ViewChild(FdTableComponent, { read: ElementRef })
    readonly table: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ContentChildren(TableColumn)
    readonly columns: QueryList<TableColumn>;

    /** @hidden */
    @ContentChildren(EditableTableCell, { descendants: true })
    readonly customEditableCells: QueryList<EditableTableCell>;

    /** @hidden */
    @ViewChildren(EditableTableCell)
    readonly editableCells: QueryList<EditableTableCell>;

    /** @hidden */
    @ViewChildren(TableRowDirective)
    tableRows: QueryList<TableRowDirective>;

    /** @hidden */
    @ViewChildren(NgForm)
    editableCellForms: QueryList<NgForm>;

    /** @hidden */
    readonly _tableColumnsSubject = new BehaviorSubject<TableColumn[]>([]);

    /** @hidden */
    readonly tableColumnsStream = this._tableColumnsSubject.asObservable();

    /** @hidden */
    @ContentChild(TABLE_TOOLBAR)
    readonly tableToolbar: TableToolbarWithTemplate;

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    readonly SELECTION_MODE = SelectionMode;

    /**
     * @hidden
     * Data source items stream.
     */
    readonly _dataSourceItemsSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

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
     * Sort Rules Map. Where key is column key and value is associated sort rule
     */
    _sortRulesMap: Map<string, CollectionSort> = new Map();

    /**
     * @hidden
     * Filter Rules Map. Where key is column key and value is associated filter rules
     * Many filters can be applied to one column
     */
    _filterRulesMap: Map<string, CollectionFilter[]> = new Map();

    /**
     * @hidden
     * Group Rules Map. Where key is column key and value is associated group rule
     */
    _groupRulesMapSubject = new BehaviorSubject<Map<string, CollectionGroup>>(new Map());

    /** @hidden */
    get _groupRulesMap(): Map<string, CollectionGroup> {
        return this._groupRulesMapSubject.getValue();
    }

    /** @hidden */
    _isShownNavigationColumnSubject = new BehaviorSubject<boolean>(false);

    /** @hidden */
    get _isShownNavigationColumn(): boolean {
        return this._isShownNavigationColumnSubject.getValue();
    }

    /** @hidden */
    private get _headerCellFocused(): boolean {
        return document.activeElement?.tagName.toLowerCase() === 'th';
    }

    /**
     * @hidden
     * Table Column Map. Where key is column key and value is column
     */
    _keyToColumnMap: Map<string, TableColumn> = new Map();
    /**
     * @hidden
     * Table Column Map. Where key is column name and value is column
     */
    _nameToColumnMap: Map<string, TableColumn> = new Map();

    /**
     * @hidden
     * Freezable column names and their respective indexes
     */
    _freezableColumns: Map<string, number> = new Map();

    /** @hidden */
    _isShownSortSettingsInToolbar = false;

    /** @hidden */
    _isShownFilterSettingsInToolbar = false;

    /** @hidden */
    _isShownGroupSettingsInToolbar = false;

    /** @hidden */
    _isShownColumnSettingsInToolbar = false;

    /** @hidden */
    _isFilteringFromHeaderDisabled = false;

    /** @hidden */
    _tableColumnsLength = 0;

    /**
     * @hidden
     * RTL flag
     */
    _rtl = false;

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
    get checkedState(): boolean | null {
        if (this._checkedAll) {
            return true;
        }
        if (this._checkedAny) {
            return null; // passing null for indeterminate state
        }
        return false;
    }

    /**
     * @hidden
     * Total items length given by data source
     */
    _totalItems = 0;

    /**
     * @hidden
     * Columns to be rendered in the template
     */
    _visibleColumns: TableColumn[] = [];

    /**
     * @hidden
     * Columns to be rendered as a pop-in columns.
     */
    _poppingColumns: TableColumn[] = [];

    /**
     * @hidden
     * Mapping function for the trackBy, provided by the user.
     * Is needed, because we are wrapping user supplied data into a `TableRow` class.
     */
    _rowTrackBy: TrackByFunction<TableRow<T>>;

    /** @hidden */
    _isGroupTable = false;

    /** @hidden */
    get _isShownSelectionColumn(): boolean {
        return this.selectionMode === SelectionMode.SINGLE || this.selectionMode === SelectionMode.MULTIPLE;
    }

    /** @hidden */
    get _cellMockVisible(): boolean {
        return (
            this._tableColumnResizeService.fixedWidth &&
            (this.tableContainer?.nativeElement?.scrollWidth ?? 0) > (this.table?.nativeElement?.scrollWidth ?? 0)
        );
    }

    /** @hidden */
    get _rowsDraggable(): boolean {
        return (
            this.isTreeTable &&
            !this._sortRulesMap.size &&
            !this._groupRulesMap.size &&
            !this._filterRulesMap.size &&
            !this._freezableColumns.size
        );
    }

    /** @hidden */
    get _toolbarContext(): any {
        return {
            counter: this._totalItems,
            sortable: this._isShownSortSettingsInToolbar,
            filterable: this._isShownFilterSettingsInToolbar,
            groupable: this._isShownGroupSettingsInToolbar,
            columns: this._isShownColumnSettingsInToolbar
        };
    }

    /** @hidden */
    private _ds: FdpTableDataSource<T>;

    /** @hidden */
    private _tableDataSource: TableDataSource<T>;

    /** @hidden opened data source stream */
    private _dsOpenedStream: Observable<T[]> | null;

    /** @hidden for data source handling */
    private _dsSubscription: Subscription | null;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _viewInitiated = false;

    /** @hidden */
    private _dragDropInProgress = false;

    /** @hidden */
    _navigatedRowIndex: number;

    /** @hidden */
    get _selectionColumnWidth(): number {
        return this._isShownSelectionColumn ? SELECTION_COLUMN_WIDTH.get(this.contentDensityObserver.value) ?? 0 : 0;
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
        return this.loading ?? this._internalLoadingState;
    }

    /** @hidden
     * To differentiate between first loading when skeletons be shown and subsequent loadings when busy indicator be shown
     */
    _firstLoadingDone = false;

    /** @hidden */
    private _addedItems: T[] = [];

    /** @hidden */
    private _columnsWidthSet = false;

    /** @hidden */
    private _internalLoadingState = false;

    /** @hidden */
    private readonly _rangeSelector = new RangeSelector();

    /** @hidden */
    private _currentPreset: PlatformTableManagedPreset = {};

    /** @hidden */
    private _initialStateSet = false;

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _onKeyDown(event: KeyboardEvent): void {
        if (
            (KeyUtil.isKeyCode(event, LEFT_ARROW) || (this._rtl && KeyUtil.isKeyCode(event, RIGHT_ARROW))) &&
            event.shiftKey &&
            this._headerCellFocused
        ) {
            this._tableColumnResizeService._processResize(-32);
            event.preventDefault();
            event.stopImmediatePropagation();
        } else if (
            (KeyUtil.isKeyCode(event, RIGHT_ARROW) || (this._rtl && KeyUtil.isKeyCode(event, LEFT_ARROW))) &&
            event.shiftKey &&
            this._headerCellFocused
        ) {
            this._tableColumnResizeService._processResize(32);
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    }

    /** @hidden */
    constructor(
        private readonly _ngZone: NgZone,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _tableService: TableService,
        private readonly _tableScrollDispatcher: TableScrollDispatcherService,
        public readonly _tableColumnResizeService: TableColumnResizeService,
        private readonly _elRef: ElementRef,
        @Optional() private readonly _rtlService: RtlService,
        readonly contentDensityObserver: ContentDensityObserver,
        readonly injector: Injector
    ) {
        super();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('loading' in changes) {
            this._tableService.setTableLoading(this.loadingState);
        }

        if ('trackBy' in changes) {
            this._rowTrackBy =
                typeof this.trackBy === 'function'
                    ? (index, item) => this.trackBy(index, item.value)
                    : (undefined as any);
        }

        // changes below should be checked only after view is initialized
        if (!this._viewInitiated) {
            return;
        }

        if ('selectionMode' in changes) {
            this._rangeSelector.reset();
        }

        if ('selectionMode' in changes || 'freezeColumnsTo' in changes || 'semanticHighlighting' in changes) {
            this.recalculateTableColumnWidth();
        }

        if ('rowNavigatable' in changes) {
            this._tableRows.forEach(
                (row) => (row.navigatable = this._isRowNavigatable(row.value, this.rowNavigatable))
            );

            this._calculateIsShownNavigationColumn();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._tableColumnResizeService.setTableRef(this);

        this._isGroupTable = this.initialGroupBy?.length > 0;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._viewInitiated = true;

        this._setInitialState();

        if (this._ds) {
            this._initializeDS(this._ds);
        }

        this._listenToRtlChanges();

        this._listenToTableStateChanges();

        this._listenToColumns();

        this._calculateVisibleColumns();

        this._constructTableMetadata();

        this._listenToTableRowsPipe();

        this._listenToPageScrolling();

        this._listenToColumnPropertiesChange();

        this._listenToTableWidthChanges();

        this._listenToTableContainerMouseLeave();

        this._cdr.detectChanges();

        if (this.expandOnInit) {
            this.expandAll();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._closeDataSource();
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
    freezeToColumn(columnName: string): void {
        this.freezeColumnsTo = columnName;

        this._tableService.freezeTo(columnName);
        this.recalculateTableColumnWidth();
    }

    /** Unfreeze column */
    unfreeze(columnName: string): void {
        const freezeToColumnIndex = this._freezableColumns.get(columnName) ?? -1;
        const freezeToPreviousColumnName = this._freezableColumns[freezeToColumnIndex - 1];

        this.freezeColumnsTo = freezeToPreviousColumnName;

        this._tableService.freezeTo(freezeToPreviousColumnName);
        this.recalculateTableColumnWidth();
    }

    /** expand all rows */
    expandAll(): void {
        this._tableRows.forEach((e) => {
            e.expanded = true;
            e.hidden = false;
        });
        this._onTableRowsChanged();
    }

    /** collapse all rows */
    collapseAll(): void {
        this._tableRows.forEach((e) => {
            e.expanded = false;
            if (e.parent) {
                e.hidden = true;
            }
        });
        this._onTableRowsChanged();
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
        this._isShownSortSettingsInToolbar = showSortSettings;
        this._cdr.detectChanges();
    }

    /** Toolbar Filter Settings button visibility */
    showFilterSettingsInToolbar(showFilterSettings: boolean): void {
        this._isShownFilterSettingsInToolbar = showFilterSettings;
        this._cdr.detectChanges();
    }

    /** Toolbar Group Settings button visibility */
    showGroupSettingsInToolbar(showGroupSettings: boolean): void {
        this._isShownGroupSettingsInToolbar = showGroupSettings;
        this._cdr.detectChanges();
    }

    /** Toolbar Columns Settings button visibility */
    showColumnSettingsInToolbar(showColumnSettings: boolean): void {
        this._isShownColumnSettingsInToolbar = showColumnSettings;
        this._cdr.detectChanges();
    }

    /** Disable filter from column heder menu */
    setHeaderColumnFilteringDisabled(disabled: boolean): void {
        this._isFilteringFromHeaderDisabled = disabled;
    }

    /** Set the row navigation */
    setRowNavigation(rowIndex: number, rowNavigatable: string | boolean): void {
        const row = this._tableRows[rowIndex];

        if (!row) {
            return;
        }

        row.navigatable = this._isRowNavigatable(row.value, rowNavigatable);

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
        } else if (this.selectionMode === this.SELECTION_MODE.MULTIPLE) {
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

    /** Manually triggers columns width recalculation */
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
        return this._tableDataSource;
    }

    /**
     * Adds empty row for editing at the beginning of the rows array.
     */
    addRow(): void {
        this._forceSemanticHighlighting = true;
        this._forceSelected = true;
        this._forceSelectable = true;

        const newRow = this._buildNewRowSkeleton();
        newRow[this.selectableKey] = true;
        newRow[this.selectedKey] = false;
        newRow[this.semanticHighlighting] = EDITABLE_ROW_SEMANTIC_STATE;

        this._addedItems.unshift(newRow);

        const newRows = this._createTableRowsByDataSourceItems([newRow]);
        this._newTableRows = [...newRows, ...this._newTableRows];

        this._setTableRows(this._dataSourceTableRows);
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
            this._tableDataSource.fetch(this.getTableState());
        }, [...this._addedItems]);

        const forms = [...this.customEditableCells.toArray(), ...this.editableCells.toArray()].map((t) => t.form);

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
        const newState: TableState = Object.assign({}, this._getDefaultPresetState(), data);
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

    // Private API

    /** @hidden */
    _isColumnHasHeaderMenu(column: TableColumn): boolean {
        return (
            column.sortable ||
            column.groupable ||
            column.freezable ||
            (column.filterable && !this._isFilteringFromHeaderDisabled)
        );
    }

    /** @hidden */
    _isTreeRow(row: TableRow): boolean {
        return row.type === TableRowType.TREE;
    }

    /** @hidden */
    _isItemRow(row: TableRow): boolean {
        return row.type === TableRowType.ITEM;
    }

    /** @hidden */
    _isGroupRow(row: TableRow): boolean {
        return row.type === TableRowType.GROUP;
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
            if (this._isItemRow(row) || this._isTreeRow(row)) {
                row.checked = checked;
                checked ? added.push(row) : removed.push(row);
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
        this._getSelectableRows().forEach((row) => {
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

        this._getSelectableRows().forEach((row) => {
            if (row.checked === selectAll) {
                return;
            }
            row.checked = selectAll;
            selectAll ? added.push(row) : removed.push(row);
        });

        this._rangeSelector.reset();

        this._emitRowSelectionChangeEvent(added, removed);

        this._calculateCheckedAll();
    }

    /**
     * @hidden
     * Create table row selection event
     */
    _emitRowSelectionChangeEvent(added: TableRow[], removed: TableRow[]): void {
        const selected = this._getSelectableRows()
            .filter(({ checked }) => checked)
            .map(({ value }) => value);

        this.rowSelectionChange.emit({
            source: this,
            selection: selected,
            added: added.map(({ value }) => value),
            removed: removed.map(({ value }) => value),
            index: added.concat(removed).map(({ index }) => index)
        });
    }

    /**
     * @hidden
     * Create table rows rearrange event
     */
    _emitRowsRearrangeEvent(row: TableRow, previousIndex: number, newIndex: number): void {
        const rows = this._tableRows.map(({ value }) => value);

        this.rowsRearrange.emit(new TableRowsRearrangeEvent(row.value, previousIndex, newIndex, rows));
    }

    /**
     * @hidden
     * Group By triggered from column header
     */
    _columnHeaderGroupBy(field: string): void {
        if (this.state.groupBy?.length === 1 && this.state.groupBy[0].field === field) {
            // reset grouping, if already grouped by this field
            this.group([]);
        } else {
            this.group([{ field, direction: SortDirection.NONE, showAsColumn: true }]);
        }
        this._closePopoverForColumnByFieldName(field);
    }

    /**
     * @hidden
     * Filter triggered from column header
     */
    _columnHeaderFilterBy(field: string, value: string): void {
        if (value) {
            const collectionFilter: CollectionStringFilter = {
                field,
                value,
                type: FilterableColumnDataType.STRING,
                strategy: FILTER_STRING_STRATEGY.CONTAINS,
                exclude: false
            };

            this.addFilter([collectionFilter]);
        } else {
            this.removeFilter([field]);
        }
        this._closePopoverForColumnByFieldName(field);
    }

    /**
     * @hidden
     * Sort triggered from column header
     */
    _columnHeaderSortBy(field: string, direction: SortDirection): void {
        this.sort([{ field, direction }]);
        this._closePopoverForColumnByFieldName(field);
    }

    /** @hidden */
    _onCellClick(colIdx: number, row: TableRow<T>): void {
        if (row.state === 'readonly' && this._isTreeRowFirstCell(colIdx, row)) {
            this._toggleGroupRow(row);
        }
    }

    /** @hidden */
    _onRowClick(row: TableRow<T>, event?: Event): void {
        if (row.state !== 'readonly') {
            return;
        }

        if (event && event instanceof KeyboardEvent && KeyUtil.isKeyCode(event, SPACE)) {
            const eventTarget = event.target as HTMLInputElement;
            if (
                eventTarget.type === 'checkbox' ||
                (eventTarget.tagName !== 'INPUT' && eventTarget.tagName !== 'TEXTAREA')
            ) {
                event.preventDefault(); // prevent page scroll but still allow space presses in inputs
            }
        }

        if (row.navigatable) {
            this._emitRowNavigate(row);
        }

        if (this.rowsActivable) {
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
    _toggleGroupRow(groupRow: TableRow): void {
        if (this._dragDropInProgress) {
            return;
        }

        this._toggleExpandableTableRow(groupRow);

        const groupRowIndex = this._tableRows.indexOf(groupRow);
        this.rowToggleOpenState.emit(
            new TableRowToggleOpenStateEvent(groupRowIndex, groupRow.value, groupRow.expanded)
        );
    }

    /** @hidden */
    _isTreeRowFirstCell(cellIndex: number, row: TableRow): boolean {
        return cellIndex === 0 && this._isTreeRow(row);
    }

    /** @hidden */
    _dragDropStart(): void {
        this._dragDropInProgress = true;
    }

    /** @hidden */
    _dragDropItemDrop(event: FdDropEvent<TableRow>): void {
        /** After timeout to make click event handled first */
        this._ngZone.runOutsideAngular(() => {
            setTimeout(() => (this._dragDropInProgress = false));
        });

        if (this.isTreeTable && event.draggedItemIndex !== event.replacedItemIndex) {
            const dragRow = this._tableRows.find((row) => row === this._tableRowsVisible[event.draggedItemIndex]);
            const dropRow = this._tableRows.find((row) => row === this._tableRowsVisible[event.replacedItemIndex]);

            if (!dragRow || !dropRow || this._isDroppedInsideItself(dropRow, dragRow)) {
                return;
            }

            this._dragDropUpdateDragParentRowAttributes(dragRow);
            this._dragDropRearrangeTreeRows(dragRow, dropRow);
            this._dragDropUpdateDropRowAttributes(dragRow, dropRow);

            if (!dropRow.expanded) {
                this._toggleExpandableTableRow(dropRow);
            } else {
                this._onTableRowsChanged();
            }

            this._cdr.markForCheck();
            this._emitRowsRearrangeEvent(dragRow, event.draggedItemIndex, event.replacedItemIndex);
        }
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

    /** @hidden */
    _columnTrackBy(index: number, column: TableColumn): string {
        return column.name;
    }

    /** Fetch data source data. */
    fetch(): void {
        this._tableDataSource.fetch(this.getTableState());
    }

    /** @hidden */
    private _closePopoverForColumnByFieldName(field: string): void {
        const index = this._visibleColumns.findIndex((c) => c.key === field);
        if (index !== -1) {
            this.columnHeaderPopovers.get(index)?.close();
        }
    }

    /** @hidden */
    private _isDroppedInsideItself(dropRow: TableRow, dragRow: TableRow): boolean {
        const dropRowParents = this._getRowParents(dropRow);
        return !!dropRowParents.find((row) => row === dragRow);
    }

    /** @hidden */
    private _dragDropUpdateDragParentRowAttributes(dragRow: TableRow): void {
        const parentRow = dragRow.parent;

        if (!parentRow) {
            return;
        }

        const parentRowChildren = this._findRowChildren(parentRow);
        const dragRowChildren = this._findRowChildren(dragRow);

        if (parentRowChildren.length - (dragRowChildren.length + 1) === 0) {
            parentRow.type = TableRowType.ITEM;
        }
    }

    /** @hidden */
    private _dragDropUpdateDropRowAttributes(dragRow: TableRow, dropRow: TableRow): void {
        dragRow.parent = dropRow.parent;
        dragRow.level = dropRow.level;

        if (!this._isTreeRow(dropRow)) {
            dropRow.type = TableRowType.TREE;
        }

        const children = this._findRowChildren(dragRow);
        children.forEach((row) => {
            row.level = this._getRowParents(row).length;
        });
    }

    /** @hidden */
    private _dragDropRearrangeTreeRows(dragRow: TableRow, dropRow: TableRow): void {
        const allRows = this._tableRows;
        let rowsBefore: any;
        let rowsAfter: any;

        const dragRowIndex = allRows.findIndex((row) => row === dragRow);
        const dragRowChildren = this._findRowChildren(dragRow);

        const rowsToMove = allRows.splice(dragRowIndex, dragRowChildren.length + 1);

        const dropRowIndex = allRows.findIndex((row) => row === dropRow);
        const dropRowChildren = this._findRowChildren(dropRow);

        if (dragRowIndex > dropRowIndex) {
            rowsBefore = allRows.slice(0, dropRowChildren.length + 1 - dropRowIndex);
            rowsAfter = allRows.slice(dropRowChildren.length + 1 - dropRowIndex);
        } else {
            rowsBefore = allRows.slice(0, dropRowIndex + dropRowChildren.length + 1);
            rowsAfter = allRows.slice(dropRowIndex + dropRowChildren.length + 1);
        }

        this._tableRows = [...rowsBefore, ...rowsToMove, ...rowsAfter];
    }

    /** @hidden */
    private _setInitialState(): void {
        const prevState = this.getTableState();
        const columns = this.getTableColumns();
        const page = prevState.page;
        const visibleColumns =
            this.initialVisibleColumns ||
            (prevState.columns.length ? prevState.columns : columns.map(({ name }) => name));

        this.setTableState({
            ...prevState,
            columns: visibleColumns,
            columnKeys: columns.filter((c) => visibleColumns.includes(c.name)).map((c) => c.key),
            sortBy: this.initialSortBy || prevState.sortBy,
            filterBy: this.initialFilterBy || prevState.filterBy,
            groupBy: this.initialGroupBy || prevState.groupBy,
            freezeToColumn: this.freezeColumnsTo || prevState.freezeToColumn,
            page: {
                currentPage: page.currentPage || 1,
                pageSize: this.pageSize || page.pageSize
            }
        });
    }

    /** @hidden */
    private _listenToTableRowsPipe(): void {
        this._subscriptions.add(
            this._dataSourceItemsSubject
                .pipe(
                    // map source items to table rows
                    map((source: T[]) => this._createTableRowsByDataSourceItems(source)),
                    // Insert items to show groups
                    switchMap((rows: TableRow[]) =>
                        this.isTreeTable
                            ? of(rows)
                            : this._groupRulesMapSubject.pipe(
                                  map((groupRules) => this._groupTableRows(rows, groupRules.values()))
                              )
                    )
                )
                .subscribe((rows) => {
                    this._setTableRows(rows);
                })
        );
    }

    /** @hidden */
    private _listenToTableStateChanges(): void {
        this._subscriptions.add(
            this._tableService.tableStateChanges$.subscribe(() => {
                this.presetChanged.emit(this.getCurrentPreset());
            })
        );
        this._subscriptions.add(
            merge(
                // Events that should trigger DataSource.fetch()
                this._tableService.sortChange,
                this._tableService.filterChange,
                this._tableService.searchChange,
                this._tableService.pageChange
            )
                .pipe(
                    map(() => this._tableService.getTableState()),
                    filter((state) => !!state && !!this._tableDataSource),
                    distinctUntilChanged()
                )
                .subscribe((state) => {
                    this._tableDataSource.fetch(state);
                })
        );

        this._subscriptions.add(
            this._tableService.sortChange.subscribe((event: SortChange) => {
                this._buildSortRulesMap();
                this.sortChange.emit(new TableSortChangeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.filterChange.subscribe((event: FilterChange) => {
                this._buildFilterRulesMap();
                this.filterChange.emit(new TableFilterChangeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.freezeChange.subscribe((event: FreezeChange) => {
                this.columnFreeze.emit(new TableColumnFreezeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.groupChange.subscribe((event: GroupChange) => {
                this._buildGroupRulesMap();
                this._calculateVisibleColumns();
                this.recalculateTableColumnWidth();

                this.groupChange.emit(new TableGroupChangeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.columnsChange.subscribe((event: ColumnsChange) => {
                this._calculateVisibleColumns();
                this.recalculateTableColumnWidth();

                this.columnsChange.emit(new TableColumnsChangeEvent(this, event.current, event.previous));
            })
        );
    }

    /** @hidden */
    private _listenToRtlChanges(): void {
        if (!this._rtlService) {
            return;
        }

        this._subscriptions.add(
            this._rtlService.rtl.pipe(distinctUntilChanged()).subscribe((rtl) => {
                this._rtl = rtl;
                this._cdr.markForCheck();
            })
        );
    }

    /** @hidden */
    private _createTableRowsByDataSourceItems(source: T[]): TableRow<T>[] {
        if (this.isTreeTable) {
            return this._createTreeTableRowsByDataSourceItems(source);
        }

        const selectedRowsMap = this._getSelectionStatusByRowValue(source);

        return source.map((item: T, index: number) => {
            const isNewItem = this._addedItems.includes(item);
            const row = new TableRow(
                TableRowType.ITEM,
                item[this.selectedKey] ?? !!selectedRowsMap.get(item),
                index,
                item
            );
            row.navigatable = this._isRowNavigatable(item, this.rowNavigatable);
            row.state = isNewItem ? 'editable' : 'readonly';
            return row;
        });
    }

    /** @hidden */
    private _createTreeTableRowsByDataSourceItems(source: T[]): TableRow<T>[] {
        const rows: TableRow<T>[] = [];

        const selectedRowsMap = this._getSelectionStatusByRowValue(source);

        source.forEach((item: T, index: number) => {
            const hasChildren =
                Object.prototype.hasOwnProperty.call(item, this.relationKey) &&
                Array.isArray(item[this.relationKey]) &&
                item[this.relationKey].length;
            const row = new TableRow(
                hasChildren ? TableRowType.TREE : TableRowType.ITEM,
                item[this.selectedKey] ?? !!selectedRowsMap.get(item),
                index,
                item
            );

            row.expanded = false;
            row.navigatable = this._isRowNavigatable(item, this.rowNavigatable);
            rows.push(row);

            if (hasChildren) {
                const children = this._createTreeTableRowsByDataSourceItems(item[this.relationKey]);

                children.forEach((c) => {
                    c.parent = c.parent || row;
                    c.level = c.parent.level + 1;
                    c.hidden = true;
                });

                rows.push(...children);
            }
        });

        return rows;
    }

    /**
     * @hidden
     * Runs `rowComparator` function against checked rows and compares them with the new `source`
     * If matched, creates an association between the source item and checked status of corresponding row.
     *
     * @returns `Map` object with the `checked` status for particular source item
     */
    private _getSelectionStatusByRowValue(source: T[]): Map<T, boolean> {
        const rowMap = new Map<T, boolean>();
        if (
            (this.selectionMode === SelectionMode.SINGLE || this.selectionMode === SelectionMode.MULTIPLE) &&
            typeof this.rowComparator === 'function'
        ) {
            const checkedRows = this._tableRows.filter((r) => r.checked);
            checkedRows.forEach((row) => {
                const found = source.find((e) => this.rowComparator(row.value, e));
                if (found) {
                    rowMap.set(found, row.checked);
                }
            });
        }
        return rowMap;
    }

    /** @hidden */
    private _setTableRows(rows: TableRow[]): void {
        this._dataSourceTableRows = rows;
        this._tableRows = [...this._newTableRows, ...this._dataSourceTableRows];
        this._onTableRowsChanged();

        this._calculateIsShownNavigationColumn();
        this._rangeSelector.reset();

        if (rows.length && !this._columnsWidthSet) {
            this.recalculateTableColumnWidth();
            this._columnsWidthSet = true;
            return;
        }

        /** Seems to be the only way to avoid ViewDestroyedError: Attempt to use a destroyed view: detectChange */
        setTimeout(() => {
            if (!(this._cdr as ViewRef).destroyed) {
                this._cdr.detectChanges();
            }
        });
    }

    /** @hidden */
    private _onTableRowsChanged(): void {
        this._calculateVisibleTableRows();
        this._calculateCheckedAll();
    }

    /** @hidden */
    private _calculateVisibleTableRows(): void {
        this._tableRowsVisible = this._tableRows.filter((row) => !row.hidden);
    }

    /** @hidden */
    private _listenToColumns(): void {
        this.columns.changes.pipe(startWith(null)).subscribe(() => {
            const columns = this.getTableColumns();
            const prevColumns = this._tableColumnsSubject.getValue().map((column) => column.name);
            const currentColumns = columns.map((column) => column.name);

            const newColumns = columns
                .filter((column) => column.visible && !prevColumns.includes(column.name))
                .map((c) => c.name);
            const stateColumns = this.getTableState().columns;

            this._buildColumnsMap(columns);
            this._tableColumnsSubject.next(columns);

            if (this._initialStateSet) {
                this.setColumns([...stateColumns, ...newColumns]);
            }

            this._initialStateSet = true;

            this._tableService.columnsChange.emit({ previous: currentColumns, current: prevColumns });
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

        this._visibleColumns = allColumns.filter((column) => column.responsiveState === 'visible');

        this._poppingColumns = allColumns.filter((column) => column.responsiveState === 'popping');

        this._calculateTableColumnsLength();
    }

    /** @hidden */
    private _calculateTableColumnsLength(): void {
        this._tableColumnsLength = this._visibleColumns.length + (this._isShownSelectionColumn ? 1 : 0);
    }

    /** @hidden */
    private _calculateIsShownNavigationColumn(): void {
        this._isShownNavigationColumnSubject.next(this._tableRows.some((tableRow) => tableRow.navigatable));
    }

    /** @hidden */
    private _setFreezableInfo(): void {
        this._freezableColumns = this._getFreezableColumns();
    }

    /** @hidden */
    private _getFreezableColumns(): Map<string, number> {
        const columnNames = new Map<string, number>();
        const columns = this._visibleColumns;

        if (!columns.length || !this.freezeColumnsTo) {
            return columnNames;
        }

        for (const column of columns) {
            if (!column.name) {
                continue;
            }

            // using columnNames.size as index of a column
            columnNames.set(column.name, columnNames.size);

            if (column.name === this.freezeColumnsTo) {
                return columnNames;
            }
        }

        return new Map();
    }

    /** @hidden */
    private _constructTableMetadata(): void {
        const state = this.getTableState();

        this._buildSortRulesMap(state);

        this._buildGroupRulesMap(state);

        this._buildFilterRulesMap(state);
    }

    /** @hidden */
    private _buildGroupRulesMap(state = this.getTableState()): void {
        const groupMap = new Map(state.groupBy.map((rule) => [rule.field, rule]));
        this._groupRulesMapSubject.next(groupMap);
        this._isGroupTable = groupMap.size > 0;
    }

    /** @hidden */
    private _buildSortRulesMap(state = this.getTableState()): void {
        this._sortRulesMap = new Map(state.sortBy.filter((rule) => rule.field).map((rule) => [rule.field!, rule]));
    }

    /** @hidden */
    private _buildFilterRulesMap(state = this.getTableState()): void {
        this._filterRulesMap = state.filterBy.reduce((hash, rule) => {
            const key = rule.field;
            if (!hash.has(key)) {
                hash.set(key, []);
            }
            hash.get(key)?.push(rule);
            return hash;
        }, new Map<string, CollectionFilter[]>());
    }

    /** @hidden */
    private _buildColumnsMap(columns = this._tableColumnsSubject.getValue()): void {
        this._keyToColumnMap = new Map(columns.map((column) => [column.key, column]));
        this._nameToColumnMap = new Map(columns.map((column) => [column.name, column]));
    }

    /**
     * @hidden
     * Group table rows and return tree like rows list.
     * It's intended to be called recursively.
     * @param rules group rules to group by
     * @param rows source table rows
     * @param parent row parent
     * @param level level of nesting
     */
    private _createGroupedTableRowsTree(
        rules: CollectionGroup[],
        rows: TableRow[],
        parent: TableRow | null = null,
        level = 0
    ): TreeLike<TableRow>[] {
        rules = [...rules];

        if (!rules.length) {
            // no rules mean that it's the level of source items
            return rows.map((row) => {
                row.parent = parent;
                row.level = level;
                row.hidden = !!parent && !parent.expanded;
                return row;
            });
        }

        // Retrieve first group rule
        const rule = rules.shift()!;

        // Build map of unique values for a given group rule
        const valuesHash = rows
            .filter((r) => r.state !== 'editable')
            .reduce((hash, row) => {
                const modelValue = get(row.value, rule.field);

                if (!hash.has(modelValue)) {
                    hash.set(modelValue, []);
                }

                hash.get(modelValue)?.push(row);

                return hash;
            }, new Map<unknown, TableRow[]>());

        // Build table rows tree
        let groupedTableRows: TreeLike<TableRow>[] = [];

        if (rows.some((r) => r.state === 'editable')) {
            groupedTableRows = rows
                .filter((r) => r.state === 'editable')
                .map((row) => {
                    row.parent = parent;
                    row.level = -1;
                    row.hidden = !!parent && !parent.expanded;
                    return row;
                });
        }

        for (const [value, values] of Array.from(valuesHash)) {
            const filteredRows = rows.filter((_item) => values.includes(_item));

            if (filteredRows.length === 0) {
                continue;
            }

            const groupTableRow: TreeLike<TableRow<GroupTableRowValueType>> = new TableRow<GroupTableRowValueType>(
                TableRowType.GROUP,
                false,
                0,
                { field: rule.field, value, count: 0 },
                parent,
                level,
                true /** expandable */,
                true /** expanded */,
                !!parent && !parent.expanded /** hidden */
            );

            // Ads group's children rows
            groupTableRow._children = this._createGroupedTableRowsTree(rules, filteredRows, groupTableRow, level + 1);

            groupTableRow.value.count = groupTableRow._children?.length;

            groupedTableRows.push(groupTableRow);
        }

        return groupedTableRows;
    }

    /**
     * @hidden
     * Sort tree like groups by group.direction setting
     */
    private _sortTreeLikeGroupedRows(groupedRows: TreeLike<TableRow>[]): TreeLike<TableRow>[] {
        if (!groupedRows[0] || !this._isGroupRow(groupedRows[0])) {
            return groupedRows;
        }

        const treeLikeRows = groupedRows as TreeLike<TableRow<GroupTableRowValueType>>[];
        const firstRow = treeLikeRows[0];

        treeLikeRows.forEach((group) => {
            if (group._children) {
                group._children = this._sortTreeLikeGroupedRows(group._children);
            }
        });

        const groupRule = this._groupRulesMap.get(firstRow.value.field);

        if (!groupRule || groupRule.direction === SortDirection.NONE) {
            return treeLikeRows;
        }

        const direction = groupRule.direction;
        const directionMultiplier = direction === SortDirection.ASC ? 1 : direction === SortDirection.DESC ? -1 : 0;

        return treeLikeRows.slice().sort((a, b) => {
            const aValue = a.value.value as any;
            const bValue = b.value.value as any;

            const aNumber = Number.parseFloat(aValue);
            const bNumber = Number.parseFloat(bValue);
            if (!Number.isNaN(aNumber) && !Number.isNaN(bNumber)) {
                return (aNumber - bNumber) * directionMultiplier;
            }

            return (aValue > bValue ? 1 : -1) * directionMultiplier;
        });
    }

    /** @hidden */
    private _convertTreeLikeToFlatList<K>(treeLikeList: TreeLike<K>[]): K[] {
        let flatList: K[] = [];

        for (const item of treeLikeList) {
            flatList.push(item);

            if (Array.isArray(item._children)) {
                flatList = flatList.concat(this._convertTreeLikeToFlatList(item._children));
                delete item._children;
            }
        }

        return flatList;
    }

    /** @hidden */
    private _groupTableRows(sourceRows: TableRow[], groups: Iterable<CollectionGroup>): TableRow[] {
        const groupRules = Array.from(groups);

        if (!groupRules.length) {
            /**
             * In case if previously we had groups with collapsed items
             * but now we don't have it we need to reset row.hidden flag
             * in order to avoid empty table after groups settings removing
             */
            sourceRows.forEach((row) => {
                row.hidden = false;
            });
            return sourceRows;
        }

        // Build tree like groups
        const treeLikeGroupedRows = this._createGroupedTableRowsTree(groupRules, sourceRows);

        // Sort tree like groups
        const sortedTreeLikeGroupedRows = this._sortTreeLikeGroupedRows(treeLikeGroupedRows);

        // Convert tree like list to a flat list
        return this._convertTreeLikeToFlatList(sortedTreeLikeGroupedRows);
    }

    /** @hidden */
    private _toggleExpandableTableRow(rowToToggle: TableRow): void {
        const expanded = (rowToToggle.expanded = !rowToToggle.expanded);

        this._findRowChildren(rowToToggle).forEach((row) => {
            // if parent is collapsed we want to hide all nested items
            if (!expanded) {
                row.hidden = true;
                row.expanded = false;
            }

            // if parent is expanded we want show only items which direct parents are expanded as well
            if (expanded) {
                row.hidden = !this._getRowParents(row, rowToToggle).every((parent) => parent.expanded);
            }
        });

        this._onTableRowsChanged();
    }

    /** @hidden */
    private _findRowChildren(row: TableRow): TableRow[] {
        const allRows = this._tableRows;
        const rowsLength = allRows.length;

        /**
         * Since we are dealing with a flat list
         * it means all children go next right after the expandable row
         * until the next row has a mutual parent
         */

        let index = allRows.indexOf(row);
        const parents = this._getRowParents(row);
        const children: TableRow<T>[] = [];

        while (index++ < rowsLength) {
            const nextRow = allRows[index];
            if (!nextRow?.parent || parents.includes(nextRow.parent)) {
                break;
            }
            children.push(nextRow);
        }

        return children;
    }

    /**
     * Get row parents path where the first is the direct parent
     * @param row Row which parents we need to find
     * @param untilParent Parent to stop a search on. Default is "null" that means look up until the root
     * @returns parents list [direct parent, ..., ancestor]
     * @hidden
     */
    private _getRowParents(row: TableRow, untilParent: TableRow | null = null): TableRow[] {
        untilParent = untilParent || null; // to avoid "undefined"
        const parents: TableRow<T>[] = [];
        let parent = row.parent || null; // empty parent should be coerced to "null" do not get into infinite loop
        while (parent && parent !== untilParent) {
            parents.push(parent);
            parent = parent.parent || null;
        }
        return parents;
    }

    /** @hidden */
    private _resetAllSelectedRows(emitEvent = false): void {
        this._checkedAll = false;
        this._checkedAny = false;
        const removed: TableRow<T>[] = [];
        this._getSelectableRows().forEach((r) => {
            if (emitEvent && r.checked) {
                removed.push(r);
            }
            r.checked = false;
        });
        if (emitEvent) {
            this._emitRowSelectionChangeEvent([], removed);
        }
    }

    /** @hidden */
    private _calculateCheckedAll(): void {
        const selectableRows = this._getSelectableRows();
        const totalSelected = selectableRows.filter((r) => r.checked);
        this._checkedAll = totalSelected.length === selectableRows.length;
        this._checkedAny = totalSelected.length > 0;
    }

    /** @hidden */
    private _getSelectableRows(): TableRow[] {
        return this._tableRows.filter((row) => this._isSelectableRow(row));
    }

    /** @hidden */
    private _isSelectableRow(row: TableRow): boolean {
        return (this._isItemRow(row) || this._isTreeRow(row)) && row.value[this.selectableKey] !== false;
    }

    /** @hidden */
    private _initializeDS(dataSource: FdpTableDataSource<T>): void {
        this._closeDataSource();
        this._resetAllSelectedRows();

        this._tableDataSource = this._openDataStream(dataSource);
    }

    /** @hidden */
    private _closeDataSource(): void {
        if (!this._tableDataSource) {
            return;
        }

        this._tableDataSource.close();

        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
            this._dsSubscription = null;
        }
    }

    /** @hidden */
    private _openDataStream(ds: FdpTableDataSource<T>): TableDataSource<T> {
        const dataSourceStream = this._toDataStream(ds);

        if (dataSourceStream === undefined) {
            throw new Error(`[TableDataSource] source did not match an Array, Observable, nor DataSource`);
        }

        /**
         * This is single point of data entry to the component. We don't want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsOpenedStream = dataSourceStream.open();

        this._dsSubscription = new Subscription();

        const dsSub = this._dsOpenedStream.subscribe((items) => {
            this._totalItems = dataSourceStream.dataProvider.totalItems;
            this._dataSourceItemsSubject.next(items);
            // calling "detectChanges" may result in content jumps
            // using markForCheck in order to let "items" changes to get applied in the UI first
            this._cdr.markForCheck();
        });
        this._dsSubscription.add(dsSub);

        this._dsSubscription.add(
            dataSourceStream.onDataRequested().subscribe(() => {
                this.onDataRequested.emit();
                this._internalLoadingState = true;
                this._tableService.setTableLoading(this.loadingState);
            })
        );
        this._dsSubscription.add(
            dataSourceStream.onDataReceived().subscribe(() => {
                this.onDataReceived.emit();
                this._internalLoadingState = false;
                this._firstLoadingDone = true;
                this._tableService.setTableLoading(this.loadingState);
            })
        );

        this._subscriptions.add(this._dsSubscription);

        // initial data fetch
        dataSourceStream.fetch(this.getTableState());

        return dataSourceStream;
    }

    /** @hidden */
    private _toDataStream(source: FdpTableDataSource<T>): TableDataSource<T> | undefined {
        if (isDataSource(source)) {
            return source as TableDataSource<T>;
        }

        if (Array.isArray(source)) {
            return new ArrayTableDataSource(source);
        }

        if (isObservable(source)) {
            return new ObservableTableDataSource(source);
        }

        return undefined;
    }

    /** @hidden */
    private _listenToPageScrolling(): void {
        this._subscriptions.add(
            this._tableScrollDispatcher
                .scrolled()
                .pipe(
                    filter(() => this.pageScrolling),
                    debounceTime(50),
                    filter((scrollable) => scrollable === this.verticalScrollable),
                    map((scrollable) => scrollable.getElementRef().nativeElement),
                    filter((element) => !!element),
                    filter(
                        ({ scrollHeight, clientHeight, scrollTop }) =>
                            scrollHeight - clientHeight - scrollTop <= this.pageScrollingThreshold
                    ),
                    filter(() => {
                        const {
                            page: { currentPage, pageSize }
                        } = this.getTableState();
                        const lastPage = Math.ceil(this._totalItems / (pageSize || this._totalItems));
                        return currentPage < lastPage;
                    })
                )
                .subscribe(() => {
                    const currentPage = this.getTableState().page.currentPage;
                    this._ngZone.run(() => {
                        this.setCurrentPage(currentPage + 1);
                    });
                })
        );
    }

    /** @hidden */
    private _listenToColumnPropertiesChange(): void {
        this._subscriptions.add(this._tableService.markForCheck$.subscribe(() => this._cdr.markForCheck()));
        this._subscriptions.add(this._tableService.detectChanges$.subscribe(() => this._cdr.detectChanges()));
    }

    /** @hidden */
    private _listenToTableWidthChanges(): void {
        this._subscriptions.add(
            resizeObservable(this.tableContainer.nativeElement)
                .pipe(debounceTime(100))
                .subscribe(() => {
                    this.recalculateTableColumnWidth();
                    if (this._freezableColumns.size) {
                        this._tableColumnResizeService.updateFrozenColumnsWidth();
                    }
                })
        );
    }

    /** @hidden */
    private _listenToTableContainerMouseLeave(): void {
        this._subscriptions.add(
            fromEvent(this.tableContainer.nativeElement, 'mouseleave').subscribe(() =>
                this._tableColumnResizeService.hideResizer()
            )
        );
    }

    /** @hidden */
    private _isRowNavigatable(row: T, rowNavigatable: string | boolean): boolean {
        if (!row) {
            return false;
        }

        /** If key of the of the row's item field passed */
        if (isString(rowNavigatable)) {
            return !!row[rowNavigatable as string];
        }

        return !!rowNavigatable;
    }

    /**
     * @hidden
     * @private
     * Creates empty column skeleton object.
     * @returns Column model.
     */
    private _buildNewRowSkeleton(): T {
        if (this.editableRowSkeleton) {
            return cloneDeep(this.editableRowSkeleton);
        }

        let newRow = {};
        this.columns.forEach((column) => {
            newRow = set(newRow, column.key, undefined);
        });

        return newRow as T;
    }

    /**
     * @hidden
     * Resets editable rows discarding the editable rows array.
     */
    private _resetEditState(): void {
        this._newTableRows = [];
        this._addedItems = [];
        this._forceSemanticHighlighting = false;
        this._forceSelected = false;
        this._forceSelectable = false;
        this._setTableRows(this._dataSourceTableRows);
    }

    /** @hidden */
    private _getDefaultPresetState(): TableState {
        const tableState = this._tableService.getTableState();
        return {
            columnKeys: tableState.columnKeys,
            sortBy: [],
            filterBy: [],
            groupBy: [],
            columns: tableState.columns,
            searchInput: {
                category: null,
                text: ''
            },
            freezeToColumn: null,
            page: {
                pageSize: 0,
                currentPage: 1
            }
        };
    }
}
