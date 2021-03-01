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
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, isObservable, merge, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core';

import { isDataSource } from '../../domain';
import { getNestedValue } from '../../utils/object';

import { TableService } from './table.service';

import { CollectionFilter, CollectionGroup, CollectionSort, CollectionStringFilter, TableState } from './interfaces';
import { SearchInput } from './interfaces/search-field.interface';
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
    TableRowSelectionChangeEvent,
    TableSortChangeEvent,
    TableRow
} from './models';
import { FILTER_STRING_STRATEGY, ContentDensity, SelectionMode, SortDirection } from './enums';
import { DEFAULT_COLUMN_WIDTH, DEFAULT_TABLE_STATE, ROW_HEIGHT, SELECTION_COLUMN_WIDTH } from './constants';
import { TableDataSource } from './domain/table-data-source';
import { ArrayTableDataSource } from './domain/array-data-source';
import { ObservableTableDataSource } from './domain/observable-data-source';

import { TableColumn } from './components/table-column/table-column';
import { TABLE_TOOLBAR, TableToolbarWithTemplate } from './components/table-toolbar/table-toolbar';
import { Table } from './table';
import { TableScrollable, TableScrollDispatcherService } from './table-scroll-dispatcher.service';
import { getScrollBarWidth } from './utils';

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
    providers: [{ provide: Table, useExisting: TableComponent }, TableService, TableScrollDispatcherService],
    host: {
        class: 'fdp-table',
        '[class.fd-table--compact]': 'contentDensity === CONTENT_DENSITY.COMPACT',
        '[class.fd-table--condensed]': 'contentDensity === CONTENT_DENSITY.CONDENSED',
        '[class.fd-table--no-horizontal-borders]': 'noHorizontalBorders || noBorders',
        '[class.fd-table--no-vertical-borders]': 'noVerticalBorders || noBorders'
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
    contentDensity: ContentDensity = ContentDensity.COZY;

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

    /** @hidden */
    @ViewChild('verticalScrollable')
    readonly verticalScrollable: TableScrollable;

    /** @hidden */
    @ContentChildren(TableColumn)
    readonly columns: QueryList<TableColumn>;

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
    readonly CONTENT_DENSITY = ContentDensity;

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
    _groupRulesMapSubject: BehaviorSubject<Map<string, CollectionGroup>> = new BehaviorSubject(new Map());
    /** @hidden */
    get _groupRulesMap(): Map<string, CollectionGroup> {
        return this._groupRulesMapSubject.getValue();
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
    _columnWidth = DEFAULT_COLUMN_WIDTH;
    /** @hidden */
    _selectionColumnWidth = 0;
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
    get _isShownSelectionColumn(): boolean {
        return this.selectionMode !== SelectionMode.NONE;
    }

    /** @hidden */
    _scrollBarWidth = 0;

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
    constructor(
        private readonly _tableService: TableService,
        private readonly _cd: ChangeDetectorRef,
        private readonly _tableScrollDispatcher: TableScrollDispatcherService,
        private readonly _ngZone: NgZone,
        @Inject(DOCUMENT) private readonly _document: Document | null,
        @Optional() private readonly _rtlService: RtlService
    ) {
        super();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (!this._viewInitiated) {
            return;
        }
        if ('selectionMode' in changes || 'freezeColumnsTo' in changes) {
            this._setFreezableInfo();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        this._calculateScrollbarWidth();
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

        this._setFreezableInfo();

        this._constructTableMetadata();

        this._listenToTableRowsPipe();

        this._listenToPageScrolling();

        this._cd.detectChanges();
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
        this._cd.markForCheck();
    }

    getTableColumns(): TableColumn[] {
        return this.columns?.toArray() || [];
    }

    /** Set Sorting rules */
    sort(sortRules: CollectionSort[]): void {
        this._tableService.setSort(sortRules);
        this._cd.markForCheck();
    }

    /** Add Sorting rules to the existing ones */
    addSort(sortRules: CollectionSort[]): void {
        this._tableService.addSort(sortRules);
        this._cd.markForCheck();
    }

    /** Set Filter rules */
    filter(filterRules: CollectionFilter[]): void {
        this._tableService.setFilters(filterRules);
        this._cd.markForCheck();
    }

    /** Add Filter rule */
    addFilter(filterRules: CollectionFilter[]): void {
        this._tableService.addFilters(filterRules);
        this._cd.markForCheck();
    }

    /** Set Groups */
    group(groups: CollectionGroup[]): void {
        this._tableService.setGroups(groups);
        this._cd.markForCheck();
    }

    /** Add Groups */
    addGroup(groups: CollectionGroup[]): void {
        this._tableService.addGroups(groups);
        this._cd.markForCheck();
    }

    /**
     * Set visible table columns
     * The order is matter
     * @param columns table columns names
     */
    setColumns(columns: string[]): void {
        this._tableService.setColumns(columns);
        this._cd.markForCheck();
    }

    /** Freeze table to column */
    freezeToColumn(columnName: string): void {
        this._tableService.freezeTo(columnName);
        this.freezeColumnsTo = columnName;
        this._setFreezableInfo();
        this._cd.markForCheck();
    }

    /** Unfreeze column */
    unfreeze(columnName: string): void {
        const idx = this._freezableColumns.indexOf(columnName);
        const freezeToName = this._freezableColumns[idx - 1];
        this._tableService.freezeTo(freezeToName);
        this.freezeColumnsTo = freezeToName;
        this._setFreezableInfo();
        this._cd.markForCheck();
    }

    /** Search in table */
    search(searchInput: SearchInput): void {
        this._tableService.search(searchInput);
        this._cd.markForCheck();
    }

    /** Search in table */
    setCurrentPage(currentPage: number): void {
        this._tableService.setCurrentPage(currentPage);
        this._cd.markForCheck();
    }

    /** Toolbar Sort Settings button visibility */
    showSortSettingsInToolbar(showSortSettings: boolean): void {
        this._isShownSortSettingsInToolbar = showSortSettings;
        this._cd.detectChanges();
    }

    /** Toolbar Filter Settings button visibility */
    showFilterSettingsInToolbar(showFilterSettings: boolean): void {
        this._isShownFilterSettingsInToolbar = showFilterSettings;
        this._cd.detectChanges();
    }

    /** Toolbar Group Settings button visibility */
    showGroupSettingsInToolbar(showGroupSettings: boolean): void {
        this._isShownGroupSettingsInToolbar = showGroupSettings;
        this._cd.detectChanges();
    }

    /** Toolbar Columns Settings button visibility */
    showColumnSettingsInToolbar(showColumnSettings: boolean): void {
        this._isShownColumnSettingsInToolbar = showColumnSettings;
        this._cd.detectChanges();
    }

    /** Disable filter from column heder menu */
    setHeaderColumnFilteringDisabled(disabled: boolean): void {
        this._isFilteringFromHeaderDisabled = disabled;
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
    _isColumnHasHeaderMenu(column: TableColumn): boolean {
        return (
            column.sortable ||
            column.groupable ||
            column.freezable ||
            (column.filterable && !this._isFilteringFromHeaderDisabled)
        );
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
        const removed = [];
        const added = [];

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
    _getFreezableCellStyles(colIdx: number): { [klass: string]: number } {
        const key = this._rtl ? 'margin-right.px' : 'margin-left.px';
        return { [key]: this._selectionColumnWidth + colIdx * this._columnWidth };
    }

    /** @hidden */
    _getFreezableSelectionCellStyles(): { [key: string]: string | number } {
        return { 'min-width.px': this._selectionColumnWidth, 'max-width.px': this._selectionColumnWidth };
    }

    /** @hidden */
    _getRowHeight(): number {
        return ROW_HEIGHT.get(this.contentDensity);
    }

    /**
     * @hidden
     * Expand/Collapse group row
     */
    _toggleGroupRow(groupRow: TableRow): void {
        this._toggleExpandableTableRow(groupRow);
    }

    /** @hidden */
    private _setInitialState(): void {
        const prevState = this.getTableState();
        const columns = this.columns.toArray();
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
        this._subscriptions.add(
            this._dataSourceItemsSubject
                .asObservable()
                .pipe(
                    // map source items to table rows
                    switchMap((source: T[]) => of(this._createTableRowsByDataSourceItems(source))),
                    // Insert items to show groups
                    switchMap((rows: TableRow[]) =>
                        this._groupRulesMapSubject.pipe(
                            map((groupRules) => this._groupTableRows(rows, groupRules.values()))
                        )
                    )
                )
                .subscribe((rows) => {
                    this._setTableRows(rows);

                    this._cd.markForCheck();
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
                this.groupChange.emit(new TableGroupChangeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.columnsChange.subscribe((event: ColumnsChange) => {
                this._calculateVisibleColumns();
                this.columnsChange.emit(new TableColumnsChangeEvent(this, event.current, event.previous));
            })
        );
    }

    /** @hidden */
    private _listenToRtlChanges(): void {
        this._subscriptions.add(
            this._rtlService.rtl.pipe(distinctUntilChanged()).subscribe((rtl) => {
                this._rtl = rtl;
                this._cd.markForCheck();
            })
        );
    }

    /** @hidden */
    private _createTableRowsByDataSourceItems(source: T[]): TableRow<T>[] {
        return source.map((item: T, index: number) => new TableRow('item', false, index, item));
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
            const columns = this.columns.toArray();
            this._buildColumnsMap(columns);
            this._tableColumnsSubject.next(columns);
        });
    }

    /**
     * @hidden
     * Construct visible columns for rendering purpose
     */
    private _calculateVisibleColumns(): void {
        const columnsDefinition = this.columns.toArray();
        const { columns, groupBy } = this.getTableState();
        const groupedColumnsToHide = groupBy.filter(({ showAsColumn }) => !showAsColumn).map(({ field }) => field);
        this._visibleColumns = columns // need to start mapping from state.columns list to keep right order
            .map((name) => columnsDefinition.find((column) => column.name === name))
            .filter((column) => !!column)
            // exclude columns which shouldn't be shown due to group settings
            .filter(({ key }) => !groupedColumnsToHide.includes(key));

        this._calculateTableColumnsLength();
    }

    /** @hidden */
    private _calculateTableColumnsLength(): void {
        const columnsLen = this._visibleColumns.length;
        this._tableColumnsLength = this._isShownSelectionColumn ? columnsLen + 1 : columnsLen;
    }

    /** @hidden */
    private _setFreezableInfo(): void {
        this._freezableColumns = this._getFreezableColumn();
        this._selectionColumnWidth = this._isShownSelectionColumn ? SELECTION_COLUMN_WIDTH.get(this.contentDensity) : 0;
        this._tablePadding = this._selectionColumnWidth + this._columnWidth * this._freezableColumns.length;
    }

    /** @hidden */
    private _getFreezableColumn(): string[] {
        const columnNames: string[] = [];
        const columns = this._visibleColumns;

        if (!columns.length || !this.freezeColumnsTo) {
            return columnNames;
        }

        for (const column of columns) {
            if (!column.name) {
                continue;
            }
            if (column.name === this.freezeColumnsTo) {
                columnNames.push(column.name);

                return columnNames;
            }

            columnNames.push(column.name);
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
                'group',
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
        if (!groupedRows[0] || groupedRows[0].type !== 'group') {
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
        return this._tableRows.filter(({ type }) => type === 'item');
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

            this._cd.markForCheck();
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
}
