import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { KeyValue } from '@angular/common';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

import { BehaviorSubject, isObservable, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, startWith } from 'rxjs/operators';

import { KeyUtil, RtlService } from '@fundamental-ngx/core';

import { isDataSource } from '../../domain';
import { getNestedValue } from '../../utils/object';

import { TableService } from './table.service';

import {
    CollectionFilter,
    CollectionGroup,
    CollectionSort,
    CollectionStringFilter,
    SelectableRow,
    TableState
} from './interfaces';
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
    TableSortChangeEvent
} from './models';
import {
    FILTER_STRING_STRATEGY,
    ContentDensity,
    FilterableColumnDataType,
    SelectionMode,
    SortDirection
} from './enums';
import { DEFAULT_COLUMN_WIDTH, DEFAULT_TABLE_STATE, ROW_HEIGHT, SELECTION_COLUMN_WIDTH } from './constants';
import { TableDataSource } from './domain/table-data-source';
import { ArrayTableDataSource } from './domain/array-data-source';
import { ObservableTableDataSource } from './domain/observable-data-source';

import { TableColumn } from './components/table-column/table-column';
import { TABLE_TOOLBAR, TableToolbarWithTemplate } from './components/table-toolbar/table-toolbar';
import { Table } from './table';

export type FdpTableDataSource<T> = T[] | Observable<T[]> | TableDataSource<T>;

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
@Component({
    selector: 'fdp-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TableService, { provide: Table, useExisting: TableComponent }],
    host: {
        '[class.fd-table]': 'true',
        '[class.fd-table--compact]': 'contentDensity === CONTENT_DENSITY.COMPACT',
        '[class.fd-table--condensed]': 'contentDensity === CONTENT_DENSITY.CONDENSED',
        '[class.fd-table--no-horizontal-borders]': 'noHorizontalBorders || noBorders',
        '[class.fd-table--no-vertical-borders]': 'noVerticalBorders || noBorders'
    }
})
export class TableComponent<T = any> extends Table implements AfterViewInit, OnDestroy, OnChanges {
    /** Data source for table data. */
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

    /** Initial state of table. */
    @Input()
    set state(value: TableState) {
        this.setTableState(value || DEFAULT_TABLE_STATE);
    }
    get state(): TableState {
        return this.getTableState();
    }

    /** The column `key` to freeze columns up to and including. */
    @Input()
    freezeColumnsTo: string;

    /** Toggle for page scrolling feature. */
    @Input()
    pageScrolling: boolean;

    /** Number of items per page. */
    @Input()
    pageSize: number;

    /** The content density for which to render table. 'cozy' | 'compact' | 'condensed' */
    @Input()
    contentDensity: ContentDensity = ContentDensity.COZY;

    /** Sets selection mode for the table. 'single' | 'multiple' | 'none' */
    @Input()
    selectionMode: SelectionMode = SelectionMode.NONE;

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

    /** Initial visible columns. Consist of list of unique columns names */
    @Input()
    initialVisibleColumns: string[];

    /** Sort options. It's applied on initial phase */
    @Input()
    initialSortBy: CollectionSort[];

    /** Filter options. It's applied on initial phase */
    @Input()
    initialFilterBy: CollectionFilter[];

    /** Group options. It's applied on initial phase */
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
    @ViewChild('tableContainer')
    readonly tableContainer: ElementRef;

    /** @hidden */
    @ContentChildren(TableColumn)
    readonly columns: QueryList<TableColumn>;

    _tableColumnsSubject: BehaviorSubject<TableColumn[]> = new BehaviorSubject([]);
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

    /** @hidden Formatted rows data. */
    _rows: SelectableRow[] = [];

    /** @hidden Grouped rows data. */
    _groupedRows: { [key: string]: SelectableRow[] };
    /** @hidden */
    _groupsMeta: { [key: string]: any };

    /** @hidden */
    _popoverOpen = false;

    /** @hidden */
    _popoverColumnKey: string;

    /** @hidden */
    _sortField: string;
    /** @hidden */
    _sortDirection: SortDirection;

    /** @hidden */
    _groupField: string;
    /** @hidden */
    _groupOrder: SortDirection;

    /** @hidden */
    _freezableColumns: string[] = [];
    /** @hidden */
    _columnsSize = DEFAULT_COLUMN_WIDTH;
    /** @hidden */
    _selectionColumnsSize = 0;
    /** @hidden */
    _tablePadding = 0;

    /** @hidden */
    _checkedAll = false;

    /** @hidden */
    _isShownSortSettingsInToolbar = false;

    /** @hidden */
    _isShownFilterSettingsInToolbar = false;

    /** @hidden */
    _isShownGroupSettingsInToolbar = false;

    /** @hidden */
    _isShownColumnSettingsInToolbar = false;

    /** @hidden */
    _tableColumnsLength = 0;

    /** @hidden */
    _rtl = false;

    /** @hidden */
    _totalItems = 0;

    /** Columns to be rendered in the template */
    _visibleColumns: TableColumn[] = [];

    /** @hidden */
    private _checked = [];

    /** @hidden */
    private _unchecked = [];

    /** @hidden */
    private _ds: FdpTableDataSource<T>;

    /** @hidden */
    private _tableDataSource: TableDataSource<T>;

    /** @hidden for data source handling */
    private _dsSubscription: Subscription | null;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private readonly _rowsStateChanges: Subject<SelectableRow[]> = new Subject<SelectableRow[]>();

    /** @hidden */
    private _viewInitiated = false;

    /** @hidden */
    constructor(
        private readonly _tableService: TableService,
        private readonly _cd: ChangeDetectorRef,
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
    ngAfterViewInit(): void {
        this._viewInitiated = true;

        this._setInitialState();

        if (this._ds) {
            this._initializeDS(this._ds);
        }

        this._listenToTableStateChanges();

        this._listenToRtlChanges();

        this._listenToColumns();

        this._setFreezableInfo();

        this._calculateVisibleColumns();

        this._constructTableMetadata();

        this._groupRows();

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
    }

    getTableColumns(): TableColumn[] {
        return this.columns?.toArray() || [];
    }

    /** Set Sorting rules */
    sort(sortRules: CollectionSort[]): void {
        this._tableService.setSort(sortRules);
    }

    /** Add Sorting rules to the existing ones */
    addSort(sortRules: CollectionSort[]): void {
        this._tableService.addSort(sortRules);
    }

    /** Set Filter rules */
    filter(filterRules: CollectionFilter[]): void {
        this._tableService.setFilters(filterRules);
    }

    /** Add Filter rule */
    addFilter(filterRules: CollectionFilter[]): void {
        this._tableService.addFilters(filterRules);
    }

    /** Set Groups */
    group(groups: CollectionGroup[]): void {
        this._tableService.setGroups(groups);
    }

    /** Add Groups */
    addGroup(groups: CollectionGroup[]): void {
        this._tableService.setGroups(groups);
    }

    /**
     * Set visible table columns
     * The order is matter
     * @param columns table columns names
     */
    setColumns(columns: string[]): void {
        this._tableService.setColumns(columns);
    }

    /** Freeze table to column */
    freezeToColumn(columnKey: string): void {
        this._tableService.freezeTo(columnKey);
        this.freezeColumnsTo = columnKey;
        this._setFreezableInfo();
    }

    /** Unfreeze column */
    unfreeze(columnKey: string): void {
        const idx = this._freezableColumns.indexOf(columnKey);
        const freezeToKey = this._freezableColumns[idx - 1];
        this._tableService.freezeTo(freezeToKey);
        this.freezeColumnsTo = freezeToKey;
        this._setFreezableInfo();
    }

    /** Search in table */
    search(searchInput: SearchInput): void {
        this._tableService.search(searchInput);
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

    /**
     * @hidden
     * Select/unselect one row in 'multiple' mode.
     */
    _select(index: number, row: SelectableRow, checked: boolean): void {
        this._reset();
        row.checked = checked;
        this._checkedAll = !checked ? false : this._rows.reduce((check, r) => check && r.checked, true);
        checked ? this._checked.push(row.value) : this._unchecked.push(row.value);
        this._emitSelectionChange(index);
    }

    /**
     * @hidden
     * Select one row in 'single' mode.
     */
    _selectSingle(index: number, row: SelectableRow): void {
        if (this.selectionMode !== SelectionMode.SINGLE) {
            return;
        }

        this._reset();

        const alreadySelected = this._rows.find((r) => r.checked === true);

        if (alreadySelected) {
            alreadySelected.checked = false;
        }

        if (alreadySelected === row) {
            this._unchecked.push(alreadySelected.value);
            this._emitSelectionChange(index);

            return;
        }

        this._rows[index].checked = true;
        this._checked.push(row.value);
        this._emitSelectionChange(index);
    }

    /**
     * @hidden
     * Select/Unselect all rows in 'multiple' mode.
     */
    _selectAll(checked: boolean): void {
        this._reset();
        this._checkedAll = checked;

        if (checked) {
            this._checkAll();
            this._emitSelectionChange();

            return;
        }

        this._uncheckAll();
        this._emitSelectionChange();
    }

    /** @hidden */
    _onSelectControlKeydown(event: KeyboardEvent): void {
        // TODO: since the table should be able the focusable cells, needs to implement arrow buttons navigation in next phases

        event.stopPropagation();

        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            const click = new MouseEvent('click');
            event.target.dispatchEvent(click);
            event.preventDefault();
        }
    }

    /** Group triggered from column header */
    _columnHeaderGroupBy(field: string): void {
        this.group([{ field: field, direction: SortDirection.ASC, showAsColumn: true }]);

        this._popoverOpen = false;
    }

    /** Filter triggered from column header */
    _columnHeaderFilterBy(field: string, value: string): void {
        const collectionFilter: CollectionStringFilter = {
            field: field,
            value: value,
            strategy: FILTER_STRING_STRATEGY.CONTAINS,
            exclude: false
        };

        this.addFilter([collectionFilter]);

        this._popoverOpen = false;
    }

    /** Sort triggered from column header */
    _columnHeaderSortBy(field: string, direction: SortDirection): void {
        this.sort([{ field: field, direction: direction }]);

        this._popoverOpen = false;
    }

    /** @hidden */
    _getFixedTableStyles(): { [klass: string]: number } {
        const key = this._rtl ? 'padding-right.px' : 'padding-left.px';
        return { [key]: this._tablePadding };
    }

    /** @hidden */
    _getFreezableCellStyles(colIdx: number): { [klass: string]: number } {
        const key = this._rtl ? 'margin-right.px' : 'margin-left.px';
        return { [key]: this._selectionColumnsSize + colIdx * this._columnsSize };
    }

    /** @hidden */
    _getFreezableSelectionCellStyles(): any {
        return { 'min-width.px': this._selectionColumnsSize, 'max-width.px': this._selectionColumnsSize };
    }

    /** @hidden */
    _getGroupRowHeight(): number {
        return ROW_HEIGHT.get(this.contentDensity);
    }

    /** @hidden */
    _keyDescOrder = (a: KeyValue<string, SelectableRow[]>, b: KeyValue<string, SelectableRow[]>): number => {
        const ascModifier: number = this._groupOrder === SortDirection.ASC ? 1 : -1;
        const aNumber = parseFloat(a.key);
        const bNumber = parseFloat(b.key);

        if (!isNaN(aNumber) && !isNaN(bNumber)) {
            return (aNumber > bNumber ? 1 : -1) * ascModifier;
        }

        return (a.key > b.key ? 1 : -1) * ascModifier;
    };

    /** @hidden */
    _isColumnPopoverOpened(key: string): boolean {
        return this._popoverOpen && this._popoverColumnKey === key;
    }

    /** @hidden */
    _setPopoverColumnKey(columnKey: string): void {
        this._popoverColumnKey = columnKey;
    }

    /** @hidden */
    private _setInitialState(): void {
        const prevState = this.getTableState();
        const columns = this.columns.toArray();
        const visibleColumns =
            this.initialVisibleColumns ||
            (prevState.columns.length ? prevState.columns : columns.map(({ name }) => name));

        this.setTableState({
            ...prevState,
            columns: visibleColumns,
            sortBy: this.initialSortBy || prevState.sortBy,
            filterBy: this.initialFilterBy || prevState.filterBy,
            groupBy: this.initialGroupBy || prevState.groupBy,
            freezeToColumn: this.freezeColumnsTo || prevState.freezeToColumn
        });
    }

    /** @hidden */
    private _listenToColumns(): void {
        this.columns.changes.pipe(startWith(null)).subscribe(() => {
            this._tableColumnsSubject.next(this.columns.toArray());
        });
    }

    /** Construct visible columns for rendering purpose  */
    private _calculateVisibleColumns(): void {
        const columnsDefinition = this.columns.toArray();
        const { columns } = this.getTableState();
        this._visibleColumns = columns
            .map((columnName) => columnsDefinition.find(({ name }) => columnName === name))
            .filter((v) => !!v);

        this._calculateTableColumnsLength();
    }

    private _calculateTableColumnsLength(): void {
        const columnsLen = this._visibleColumns.length;
        this._tableColumnsLength = this.selectionMode !== SelectionMode.NONE ? columnsLen + 1 : columnsLen;
    }

    /** @hidden */
    private _setFreezableInfo(): void {
        this._freezableColumns = this._getFreezableColumn();
        this._selectionColumnsSize = SELECTION_COLUMN_WIDTH.get(`${this.selectionMode}-${this.contentDensity}`) || 0;
        this._tablePadding = this._selectionColumnsSize + this._columnsSize * (this._freezableColumns?.length || 0);
    }

    /** @hidden */
    private _getFreezableColumn(): string[] {
        const columns = [];

        if (!this.columns?.length || !this.freezeColumnsTo) {
            return columns;
        }

        for (const column of this.columns.toArray()) {
            if (!column.key) {
                continue;
            }
            if (column.key === this.freezeColumnsTo) {
                columns.push(column.key);

                return columns;
            }

            columns.push(column.key);
        }

        return [];
    }

    /** @hidden */
    private _listenToTableStateChanges(): void {
        this._subscriptions.add(
            this._tableService.tableStateChanges$
                .pipe(
                    filter((state) => !!state),
                    distinctUntilChanged()
                )
                .subscribe((state) => {
                    this._tableDataSource?.fetch(state);

                    this._constructTableMetadata();
                })
        );

        this._subscriptions.add(
            this._tableService.sortChange.subscribe((event: SortChange) => {
                this.sortChange.emit(new TableSortChangeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.filterChange.subscribe((event: FilterChange) => {
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
                this._groupRows();
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

    private _listenToRtlChanges(): void {
        this._subscriptions.add(
            this._rtlService.rtl.pipe(distinctUntilChanged()).subscribe((rtl) => {
                this._rtl = rtl;
                this._cd.markForCheck();
            })
        );
    }

    /** @hidden */
    private _constructTableMetadata(): void {
        const state = this.getTableState();

        // SORTING
        this._sortDirection = state.sortBy[0]?.direction || null;
        this._sortField = state.sortBy[0]?.field || null;

        // GROUPING
        this._groupOrder = state.groupBy[0]?.direction || null;
        this._groupField = state.groupBy[0]?.field || null;
    }

    private _groupRows(): void {
        if (!this._groupField) {
            return;
        }

        this._groupsMeta = {};
        this._groupedRows = this._rows.reduce((acc, r) => {
            const groupKey = getNestedValue(this._groupField, r.value);
            if (!acc[groupKey]?.length) {
                acc[groupKey] = [];

                this._groupsMeta[groupKey] = { expanded: true };
            }
            acc[groupKey].push(r);

            return acc;
        }, {});

        this._cd.detectChanges();
    }

    /** @hidden */
    private _checkAll(): void {
        this._rows.forEach((r) => {
            if (!r.checked) {
                this._checked.push(r.value);
            }

            r.checked = true;
        });
    }

    /** @hidden */
    private _uncheckAll(): void {
        this._rows.forEach((r) => {
            if (r.checked) {
                this._unchecked.push(r.value);
            }

            r.checked = false;
        });
    }

    /** @hidden */
    private _reset(): void {
        this._checked = [];
        this._unchecked = [];
    }

    /** @hidden */
    private _resetChecks(): void {
        this._checkedAll = false;
        this._rows.forEach((r) => (r.checked = false));
        this._reset();
    }

    /** @hidden */
    private _emitSelectionChange(index?: number): void {
        const selected = this._rows.filter((r) => r.checked).map((r) => r.value);
        this.rowSelectionChange.emit({
            source: this,
            selection: selected,
            added: this._checked,
            removed: this._unchecked,
            index: index
                ? [index]
                : this._rows.reduce((indexes, row, idx) => {
                      if (this._checked.includes(row.value) || this._unchecked.includes(row.value)) {
                          indexes.push(idx);
                      }

                      return indexes;
                  }, [])
        });
    }

    /** @hidden */
    private _initializeDS(dataSource: FdpTableDataSource<T>): void {
        if (isDataSource(this._tableDataSource)) {
            this._closeDataSource(this._tableDataSource);
        }

        this._resetChecks();

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
        const initDataSource = this._toDataStream(ds);

        if (initDataSource === undefined) {
            throw new Error(`[TableDataSource] source did not match an Array, Observable, nor DataSource`);
        }
        /**
         * This is single point of data entry to the component. We don't want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsSubscription = initDataSource.open().subscribe((rows) => {
            this._rows = rows.map((row, index) => ({ checked: false, index: index, value: row })) || [];
            this._rowsStateChanges.next(this._rows);
            this._totalItems = initDataSource.dataProvider.totalItems;
            this._cd.markForCheck();
        });

        this._subscriptions.add(this._dsSubscription);

        // initial data fetch
        initDataSource.fetch(this.getTableState());

        return initDataSource;
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
}
