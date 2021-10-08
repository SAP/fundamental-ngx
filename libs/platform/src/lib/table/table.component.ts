import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    HostBinding,
    HostListener,
    Inject,
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
    ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, isObservable, merge, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

import { ContentDensityEnum, ContentDensityService, FdDropEvent, RtlService } from '@fundamental-ngx/core/utils';
import { TableRowDirective } from '@fundamental-ngx/core/table';
import { getNestedValue, isDataSource, isFunction, isString } from '@fundamental-ngx/platform/shared';

import { TableService } from './table.service';
import { CollectionFilter, CollectionGroup, CollectionSort, CollectionStringFilter, TableState } from './interfaces';
import { SearchInput } from './interfaces/search-field.interface';
import { FILTER_STRING_STRATEGY, SelectionMode, SortDirection, TableRowType } from './enums';
import { DEFAULT_TABLE_STATE, ROW_HEIGHT, SELECTION_COLUMN_WIDTH, SEMANTIC_HIGHLIGHTING_COLUMN_WIDTH } from './constants';
import { TableDataSource } from './domain/table-data-source';
import { ArrayTableDataSource } from './domain/array-data-source';
import { ObservableTableDataSource } from './domain/observable-data-source';
import { TableColumn } from './components/table-column/table-column';
import { TABLE_TOOLBAR, TableToolbarWithTemplate } from './components/table-toolbar/table-toolbar';
import { Table } from './table';
import { TableScrollable, TableScrollDispatcherService } from './table-scroll-dispatcher.service';
import { getScrollBarWidth } from './utils';
import {
    ColumnsChange,
    FilterChange,
    FreezeChange,
    GroupChange,
    SortChange,
    TableColumnFreezeEvent,
    TableColumnsChangeEvent,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRow,
    TableRowActivateEvent,
    TableRowSelectionChangeEvent,
    TableRowsRearrangeEvent,
    TableRowToggleOpenStateEvent,
    TableSortChangeEvent,
    RowComparator
} from './models';
import { TableColumnResizeService } from './table-column-resize.service';
import { TableColumnResizableSide } from './directives/table-cell-resizable.directive';

export type FdpTableDataSource<T> = T[] | Observable<T[]> | TableDataSource<T>;

export type TableRowClass<T> = string | ((row: T) => string);

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
 *  contentDensity="compact"
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
/** @dynamic */
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
        TableColumnResizeService
    ],
    host: {
        class: 'fdp-table',
        '[class.fd-table--compact]': 'contentDensity === CONTENT_DENSITY.COMPACT',
        '[class.fd-table--condensed]': 'contentDensity === CONTENT_DENSITY.CONDENSED',
        '[class.fd-table--no-horizontal-borders]': 'noHorizontalBorders || noBorders',
        '[class.fd-table--no-vertical-borders]': 'noVerticalBorders || noBorders',
        '[class.fd-table--tree]': 'isTreeTable',
        '[class.fd-table--group]': '_isGroupTable'
    }
})
export class TableComponent<T = any> extends Table implements AfterViewInit, OnDestroy, OnChanges, OnInit {
    /** Id for the Table. */
    @Input()
    @HostBinding('attr.id')
    id = `fdp-table-${tableUniqueId++}`;

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

    /** The content density for which to render table. 'cozy' | 'compact' | 'condensed' */
    @Input()
    contentDensity: ContentDensityEnum = ContentDensityEnum.COZY;

    /** Sets selection mode for the table. 'single' | 'multiple' | 'none' */
    @Input()
    selectionMode: SelectionMode = SelectionMode.NONE;

    /** Toggle for page scrolling feature. */
    @Input()
    pageScrolling = false;

    /** Number of items per page. */
    @Input()
    pageSize: number = null;

    /** Page scrolling threshold in px. */
    @Input()
    pageScrollingThreshold = 80;

    /** Table body height. */
    @Input()
    bodyHeight: string;

    /** Loading state */
    @Input()
    loading = false;

    /** Text displayed when table has no items. */
    @Input()
    emptyTableMessage = 'No data found';

    /** Table without horizontal borders. */
    @Input()
    noHorizontalBorders = false;

    /** Table without vertical borders. */
    @Input()
    noVerticalBorders = false;

    /** Table without borders. */
    @Input()
    noBorders = false;

    /** Table body without borders, but header with borders. */
    @Input()
    noBodyBorders = false;

    /** Initial visible columns. Consist of a list of unique column names */
    @Input()
    initialVisibleColumns: string[];

    /** Initial sort options. */
    @Input()
    initialSortBy: CollectionSort[];

    /** Initial filter options. */
    @Input()
    initialFilterBy: CollectionFilter[];

    /** Initial group options. */
    @Input()
    initialGroupBy: CollectionGroup[];

    /** Whether tree mode is enabled. */
    @Input()
    isTreeTable: boolean;

    /** Accessor to a children nodes of tree. */
    @Input()
    relationKey: string;

    /** Whether row is navigatable.
      * Pass boolean value to set state for the all rows.
      * Pass string value with the key of the row item's field to compute state for every single row.
      */
    @Input()
    rowNavigatable: string | boolean = false;

    /** Whether table row can be clicked */
    @Input()
    rowsActivable = false;

    /** Value with the key of the row item's field to compute semantic state of the row.  */
    @Input()
    semanticHighlighting: string;

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

    /** Event fired when table selection has changed. */
    @Output()
    readonly rowSelectionChange: EventEmitter<TableRowSelectionChangeEvent<T>> = new EventEmitter<TableRowSelectionChangeEvent<T>>();

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

    /* Event fired when tree rows rearranged through drag & drop. Consider that rows rearranged with their children rows. */
    @Output()
    readonly rowsRearrange = new EventEmitter<TableRowsRearrangeEvent<T>>();

    /* Event fired when row clicked. */
    @Output()
    readonly rowActivate = new EventEmitter<TableRowActivateEvent<T>>();

    /* Event fired when row navigated. */
    @Output()
    readonly rowNavigate = new EventEmitter<TableRowActivateEvent<T>>();

    /** @hidden */
    @ViewChild('verticalScrollable')
    readonly verticalScrollable: TableScrollable;

    /** @hidden */
    @ContentChildren(TableColumn)
    readonly columns: QueryList<TableColumn>;

    /** @hidden */
    @ViewChildren(TableRowDirective)
    tableRows: QueryList<TableRowDirective>;

    /** @hidden */
    _tableColumnsSubject: BehaviorSubject<TableColumn[]> = new BehaviorSubject([]);
    /** @hidden */
    readonly tableColumnsStream = this._tableColumnsSubject.asObservable();

    /** @hidden */
    @ContentChild(TABLE_TOOLBAR)
    readonly tableToolbar: TableToolbarWithTemplate;

    /** @hidden */
    readonly SORT_DIRECTION = SortDirection;

    /** @hidden */
    readonly SELECTION_MODE = SelectionMode;

    /** @hidden */
    readonly CONTENT_DENSITY = ContentDensityEnum;

    /**
     * @hidden
     * Data source items stream.
     */
    readonly _dataSourceItemsSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    /**
     * @hidden
     * Representation of table rows.
     * Contains all rows including group rows
     */
    _tableRows: TableRow<T>[] = [];

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

    /** @hidden */
    _freezableColumns: string[] = [];

    /** @hidden */
    _tablePadding = 0;

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
    _checkedAll = false;

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

    /** @hidden */
    _scrollBarWidth = 0;

    /** 
     * @hidden
     * Mappping function for the trackBy, provided by the user. 
     * Is needed, because we are wrapping user supplied data into a `TableRow` class.
     */
    _rowTrackBy: TrackByFunction<TableRow<T>>;

    /** @hidden */
    _isGroupTable = false;

    /** @hidden */
    get _isShownSelectionColumn(): boolean {
        return this.selectionMode !== SelectionMode.NONE;
    }

    /** @hidden */
    get _rowsDraggable(): boolean {
        return this.isTreeTable
            && !this._sortRulesMap.size
            && !this._groupRulesMap.size
            && !this._filterRulesMap.size
            && !this._freezableColumns.length;
    }

    /** @hidden */
    get _toolbarContext(): any {
        return {
            counter: this._totalItems,
            size: this.contentDensity,
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

    /** @hidden Is used to identify whether the `contentDensity` property was set by the user manually. */
    private contentDensityManuallySet = false;

    /** @hidden */
    private get _selectionColumnWidth(): number {
        return this._isShownSelectionColumn ? SELECTION_COLUMN_WIDTH.get(this.contentDensity) : 0;
    }

    /** @hidden */
    private get _semanticHighlightingColumnWidth(): number {
        return this.semanticHighlighting ? SEMANTIC_HIGHLIGHTING_COLUMN_WIDTH : 0;
    }

    /** @hidden */
    constructor(
        private readonly _ngZone: NgZone,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _tableService: TableService,
        private readonly _tableScrollDispatcher: TableScrollDispatcherService,
        private readonly _tableColumnResizeService: TableColumnResizeService,
        @Inject(DOCUMENT) private readonly _document: Document | null,
        @Optional() private readonly _rtlService: RtlService,
        @Optional() private readonly _contentDensityService: ContentDensityService,
    ) {
        super();
        this._trackContentDensityChanges();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('loading' in changes) {
            this._tableService.setTableLoading(this.loading);
        }

        if ('trackBy' in changes) {
            this._rowTrackBy = typeof this.trackBy === 'function' ? (index, item) => this.trackBy(index, item.value) : undefined;
        }

        if (changes.contentDensity?.currentValue) {
            this.contentDensityManuallySet = true;
        }

        // changes below should be checked only after view is initialized
        if (!this._viewInitiated) {
            return;
        }

        if ('selectionMode' in changes
            || 'freezeColumnsTo' in changes
            || 'semanticHighlighting' in changes
            || 'contentDensity' in changes
        ) {
            this.recalculateTableColumnWidth();
        }

        if ('rowNavigatable' in changes) {
            this._tableRows.forEach(row => row.navigatable = this._isRowNavigatable(row.value, this.rowNavigatable));

            this._calculateIsShownNavigationColumn();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._calculateScrollbarWidth();

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

        this._listenToColumnsWidthChange();

        this._cdr.detectChanges();
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

    getTableColumns(): TableColumn[] {
        return this.columns?.toArray() || [];
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
        this._tableService.setColumns(columns);
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
        const freezeToColumnIndex = this._freezableColumns.indexOf(columnName);
        const freezeToPreviousColumnName = this._freezableColumns[freezeToColumnIndex - 1];

        this.freezeColumnsTo = freezeToPreviousColumnName;

        this._tableService.freezeTo(freezeToPreviousColumnName);
        this.recalculateTableColumnWidth();
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

    /** Remove the row navigation */
    removeRowNavigation(rowIndex: number): void {
        const row = this._tableRows[rowIndex];

        if (!row) {
            return;
        }

        row.navigatable = null;

        this._calculateIsShownNavigationColumn();

        this._cdr.markForCheck();
    }

    /** Manually triggers columns width recalculation */
    recalculateTableColumnWidth(): void {
        this._cdr.detectChanges();

        this._tableColumnResizeService.setColumnsWidth(
            this._visibleColumns.map(column => column.name),
            this.freezeColumnsTo,
            this._selectionColumnWidth + this._semanticHighlightingColumnWidth,
        );
        this._setFreezableInfo();

        this._cdr.markForCheck();
    }

    /** @hidden
     *  Needs to prevent scrolling and other events on loading.
     *  TODO: refactor it on keyboard navigation implementation
     * */
    @HostListener('keydown', ['$event'])
    keyDownHandler(event: KeyboardEvent): void {
        if (this.loading) {
            event.preventDefault();
        }
    }

    // Private API

    /** @hidden */
    _getColumnResizableSide(columnIndex: number): TableColumnResizableSide {
        if (columnIndex === 0) {
            return 'end';
        }

        return 'both';
    }

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
     * Toggle selectable row
     */
    _toggleSelectableRow(rowToToggle: TableRow): void {
        const checked = (rowToToggle.checked = !rowToToggle.checked);
        const removed = [];
        const added = [];

        if (this.selectionMode === SelectionMode.SINGLE) {
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
        }

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

        this.rowsRearrange.emit(
            new TableRowsRearrangeEvent(row.value, previousIndex, newIndex, rows)
        );
    }

    /**
     * @hidden
     * Group By triggered from column header
     */
    _columnHeaderGroupBy(field: string): void {
        this.group([{ field: field, direction: SortDirection.NONE, showAsColumn: true }]);
    }

    /**
     * @hidden
     * Filter triggered from column header
     */
    _columnHeaderFilterBy(field: string, value: string): void {
        const collectionFilter: CollectionStringFilter = {
            field: field,
            value: value,
            strategy: FILTER_STRING_STRATEGY.CONTAINS,
            exclude: false
        };

        this.addFilter([collectionFilter]);
    }

    /**
     * @hidden
     * Sort triggered from column header
     */
    _columnHeaderSortBy(field: string, direction: SortDirection): void {
        this.sort([{ field: field, direction: direction }]);
    }

    /** @hidden */
    _getFixedTableStyles(): { [klass: string]: number } {
        const key = this._rtl ? 'padding-right.px' : 'padding-left.px';
        return { [key]: this._tablePadding };
    }

    /** @hidden */
    _getSelectionCellStyles(): { [klass: string]: string } {
        const key = this._rtl ? 'right' : 'left';
        return { [key]: this._semanticHighlightingColumnWidth + 'px' };
    }
    
    _getRowClasses(row: TableRow<T>): string {
        const treeRowClass = this._isTreeRow(row) ? 'fdp-table__row--tree' : '';
        const rowClasses = this._getRowCustomCssClasses(row);

        return rowClasses.concat(' ', treeRowClass).trim();
    }

    /** @hidden */
    _getCellStyles(column: TableColumn): { [klass: string]: number | string } {
        const styles: { [property: string]: number | string } = {};

        if (this._freezableColumns.includes(column.name)) {
            const key = this._rtl ? 'margin-right.px' : 'margin-left.px';
            styles[key] =
                this._semanticHighlightingColumnWidth
                + this._selectionColumnWidth
                + this._tableColumnResizeService.getPrevColumnsWidth(column.name);
        }

        const columnWidth = this._tableColumnResizeService.getColumnWidthStyle(column);
        styles['min-width'] = columnWidth;
        styles['max-width'] = columnWidth;

        if (!this._isShownSelectionColumn && !this.semanticHighlighting || this.freezeColumnsTo) {
            styles['width'] = columnWidth;
        }

        return styles;
    }

    /** @hidden */
    _getFreezableSelectionCellStyles(): { [key: string]: string | number } {
        return { 'min-width.px': this._selectionColumnWidth, 'max-width.px': this._selectionColumnWidth };
    }

    /** @hidden */
    _getRowHeight(): number {
        return ROW_HEIGHT.get(this.contentDensity);
    }

    /** @hidden */
    _onRowClick(row: TableRow<T>, event?: KeyboardEvent): void {
        event?.preventDefault();

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

    /**
     * @hidden
     * Select / Unselect all children rows
     */
    _toggleAllChildrenRows(treeRow: TableRow): void {
        const removed = [];
        const added = [];

        this._findRowChildren(treeRow).forEach((row) => {
            if (row.checked === treeRow.checked) {
                return;
            }
            row.checked = treeRow.checked;
            treeRow.checked ? added.push(row) : removed.push(row);
        });

        this._emitRowSelectionChangeEvent(added, removed);

        this._calculateCheckedAll();
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
            setTimeout(() => this._dragDropInProgress = false);
        });

        if (this.isTreeTable && event.draggedItemIndex !== event.replacedItemIndex) {
            const dragRow = this._tableRows.find(row => row === this._tableRowsVisible[event.draggedItemIndex]);
            const dropRow = this._tableRows.find(row => row === this._tableRowsVisible[event.replacedItemIndex]);

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
        this.rowNavigate.emit(new TableRowActivateEvent<T>(rowIndex, row.value));
    }

    /** @hidden */
    _columnTrackBy(index: number, column: TableColumn): string {
        return column.name;
    }

    /** @hidden */
    private _isDroppedInsideItself(dropRow: TableRow, dragRow: TableRow): boolean {
        const dropRowParents = this._getRowParents(dropRow);
        return !!dropRowParents.find(row => row === dragRow);
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
        dragRow.parent = dropRow;
        dragRow.level = dropRow.level + 1;

        if (!this._isTreeRow(dropRow)) {
            dropRow.type = TableRowType.TREE;
        }

        const children = this._findRowChildren(dragRow);
        children.forEach(row => {
            const updatedRowLevel = this._getRowParents(row).length;
            row.level = updatedRowLevel;
        });
    }

    /** @hidden */
    private _dragDropRearrangeTreeRows(dragRow: TableRow, dropRow: TableRow): void {
        const allRows = this._tableRows;

        const dragRowIndex = allRows.findIndex(row => row === dragRow);
        const dragRowChildren = this._findRowChildren(dragRow);

        const rowsToMove = allRows.splice(dragRowIndex, dragRowChildren.length + 1);

        const dropRowIndex = allRows.findIndex(row => row === dropRow);
        const dropRowChildren = this._findRowChildren(dropRow);

        const rowsBefore = allRows.slice(0, dropRowIndex + dropRowChildren.length + 1);
        const rowsAfter = allRows.slice(dropRowIndex + dropRowChildren.length + 1);

        this._tableRows = [
            ...rowsBefore,
            ...rowsToMove,
            ...rowsAfter
        ];
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
        let columnsWidthSet = false;

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

                    this._calculateIsShownNavigationColumn();

                    if (rows.length && !columnsWidthSet) {
                        this.recalculateTableColumnWidth();
                        columnsWidthSet = true;
                        return;
                    }

                    this._cdr.markForCheck();
                })
        );
    }

    /** @hidden */
    private _listenToTableStateChanges(): void {
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

        return source
            .map((item: T, index: number) => {
                const row = new TableRow(TableRowType.ITEM, !!selectedRowsMap.get(item), index, item);
                row.navigatable = this._isRowNavigatable(item, this.rowNavigatable);

                return row;
            });
    }

    /** @hidden */
    private _createTreeTableRowsByDataSourceItems(source: T[]): TableRow<T>[] {
        const rows: TableRow<T>[] = [];

        const selectedRowsMap = this._getSelectionStatusByRowValue(source);

        source.forEach((item: T, index: number) => {
            const hasChildren = item.hasOwnProperty(this.relationKey)
                && Array.isArray(item[this.relationKey])
                && item[this.relationKey].length;
            const row = new TableRow(hasChildren ? TableRowType.TREE : TableRowType.ITEM, !!selectedRowsMap.get(item), index, item);

            row.expanded = false;
            row.navigatable = this._isRowNavigatable(item, this.rowNavigatable);
            rows.push(row);

            if (hasChildren) {
                const children = this._createTreeTableRowsByDataSourceItems(item[this.relationKey]);

                children.forEach(c => {
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
        this._tableRows = rows;
        this._onTableRowsChanged();
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
            this._buildColumnsMap(columns);
            this._tableColumnsSubject.next(columns);
        });
    }

    /**
     * @hidden
     * Construct visible columns for rendering purpose
     */
    private _calculateVisibleColumns(): void {
        const columnsDefinition = this.getTableColumns();
        const { columns, groupBy } = this.getTableState();
        const groupedColumnsToHide = groupBy
            .filter(({ showAsColumn }) => !showAsColumn)
            .map(({ field }) => field);

        this._visibleColumns = columns // need to start mapping from state.columns list to keep right order
            .map((name) => columnsDefinition.find((column) => column.name === name))
            .filter((column) => !!column)
            .filter(({ key }) => !groupedColumnsToHide.includes(key)); // exclude columns which shouldn't be shown due to the group settings

        this._calculateTableColumnsLength();
    }

    /** @hidden */
    private _calculateTableColumnsLength(): void {
        this._tableColumnsLength = this._visibleColumns.length + (this._isShownSelectionColumn ? 1 : 0);
    }

    /** @hidden */
    private _calculateIsShownNavigationColumn(): void {
        this._isShownNavigationColumnSubject.next(this._tableRows.some(tableRow => tableRow.navigatable));
    }

    /** @hidden */
    private _setFreezableInfo(): void {
        this._freezableColumns = this._getFreezableColumns();

        const freezeToNextColumnName = this._visibleColumns[this._freezableColumns.length]?.name;

        this._tablePadding =
            this._semanticHighlightingColumnWidth
            + this._selectionColumnWidth
            + this._tableColumnResizeService.getPrevColumnsWidth(freezeToNextColumnName);
    }

    /** @hidden */
    private _getFreezableColumns(): string[] {
        const columnNames: string[] = [];
        const columns = this._visibleColumns;

        if (!columns.length || !this.freezeColumnsTo) {
            return columnNames;
        }

        for (const column of columns) {
            if (!column.name) {
                continue;
            }

            columnNames.push(column.name);

            if (column.name === this.freezeColumnsTo) {
                return columnNames;
            }
        }

        return [];
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
        this._sortRulesMap = new Map(state.sortBy.map((rule) => [rule.field, rule]));
    }

    /** @hidden */
    private _buildFilterRulesMap(state = this.getTableState()): void {
        this._filterRulesMap = state.filterBy.reduce((hash, rule) => {
            const key = rule.field;
            if (!hash.has(key)) {
                hash.set(key, []);
            }
            hash.get(key).push(rule);
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
        parent: TableRow = null,
        level = 0
    ): TreeLike<TableRow>[] {
        rules = [...rules];

        if (!rules.length) {
            // no rules mean that it's the level of source items
            return rows.map((row) => {
                row.parent = parent;
                row.level = level;
                row.hidden = parent && !parent.expanded;
                return row;
            });
        }

        // Retrieve first group rule
        const rule = rules.shift();

        // Build map of unique values for a given group rule
        const valuesHash = rows.reduce((hash, row) => {
            const modelValue = getNestedValue(rule.field, row.value);

            if (!hash.has(modelValue)) {
                hash.set(modelValue, []);
            }

            hash.get(modelValue).push(row);

            return hash;
        }, new Map<unknown, TableRow[]>());

        // Build table rows tree
        const groupedTableRows: TreeLike<TableRow>[] = [];
        for (const [value, values] of Array.from(valuesHash)) {
            const filteredRows = rows.filter((_item) => values.includes(_item));

            if (filteredRows.length === 0) {
                continue;
            }

            const groupTableRow: TreeLike<TableRow<GroupTableRowValueType>> = new TableRow<GroupTableRowValueType>(
                TableRowType.GROUP,
                false,
                0,
                { field: rule.field, value: value, count: 0 },
                parent,
                level,
                true /** expandable */,
                true /** expanded */,
                parent && !parent.expanded /** hidden */
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
        const flatTableRowsList = this._convertTreeLikeToFlatList(sortedTreeLikeGroupedRows);

        return flatTableRowsList;
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
        const children = [];

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
    private _getRowParents(row: TableRow, untilParent: TableRow = null): TableRow[] {
        untilParent = untilParent || null; // to avoid "undefined"
        const parents = [];
        let parent = row.parent || null; // empty parent should be coerced to "null" do not get into infinite loop
        while (parent !== untilParent) {
            parents.push(parent);
            parent = parent.parent || null;
        }
        return parents;
    }

    /** @hidden */
    private _resetAllSelectedRows(): void {
        this._checkedAll = false;
        this._getSelectableRows().forEach((r) => (r.checked = false));
    }

    /** @hidden */
    private _calculateCheckedAll(): void {
        this._checkedAll = this._getSelectableRows().every(({ checked }) => checked);
    }

    /** @hidden */
    private _getSelectableRows(): TableRow[] {
        return this._tableRows.filter((row) => this._isItemRow(row) || this._isTreeRow(row));
    }

    /** @hidden */
    private _initializeDS(dataSource: FdpTableDataSource<T>): void {
        if (isDataSource(this._tableDataSource)) {
            this._closeDataSource(this._tableDataSource);
        }

        this._resetAllSelectedRows();

        this._tableDataSource = this._openDataStream(dataSource);
    }

    /** @hidden */
    private _closeDataSource(dataSource: TableDataSource<T>): void {
        dataSource.close();

        this._subscriptions.remove(this._dsSubscription);

        if (this._dsSubscription) {
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

        this._dsSubscription = this._dsOpenedStream.subscribe((items) => {
            this._totalItems = dataSourceStream.dataProvider.totalItems;

            this._dataSourceItemsSubject.next(items);

            this._cdr.markForCheck();
        });

        this._subscriptions.add(this._dsSubscription);

        // initial data fetch
        dataSourceStream.fetch(this.getTableState());

        return dataSourceStream;
    }

    /** @hidden */
    private _toDataStream(source: FdpTableDataSource<T>): TableDataSource<T> {
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
    private _calculateScrollbarWidth(): void {
        if (!this._document) {
            return;
        }

        this._scrollBarWidth = getScrollBarWidth(this._document);
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
        this._subscriptions.add(
            this._tableService.markForCheck$
                .subscribe(() => this._cdr.markForCheck())
        );
    }

    /** @hidden */
    private _listenToColumnsWidthChange(): void {
        this._subscriptions.add(
            this._tableService.tableColumnsWidth$
                .subscribe(() => this.recalculateTableColumnWidth())
        )
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

    /** @hidden */
    private _trackContentDensityChanges(): void {
        if (this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService._contentDensityListener
                .pipe(filter(() => !this.contentDensityManuallySet))
                .subscribe((density) => {
                    this.contentDensity = density as ContentDensityEnum;
                    this._cdr.markForCheck();
                }))
        }
    }

    /** @hidden */
    private _getRowCustomCssClasses(row: TableRow<T>): string {
        if (!this.rowsClass) {
            return '';
        }

        let rowClasses = '';

        if (isString(this.rowsClass)) {
            rowClasses = this.rowsClass;
        }

        if (isFunction(this.rowsClass)) {
            rowClasses = (this.rowsClass as Function)(row.value) || '';
        }

        return rowClasses.trim();
    }
}
