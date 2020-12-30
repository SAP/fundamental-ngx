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

import { BehaviorSubject, from, isObservable, merge, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

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
    TableSortChangeEvent,
    TableRowSelectionEventBuilder,
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

    /** The column `key` to freeze columns up to and including. */
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
    pageScrolling: boolean;

    /** Number of items per page. */
    @Input()
    pageSize: number;

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
    @ViewChild('tableContainer')
    readonly tableContainer: ElementRef;

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
    _tableRows: TableRow[] = [];

    /**
     * @hidden
     * Visible table rows.
     * Rows list that is used to be rendered in the ui.
     * Based on _tableRows and excludes hidden rows.
     */
    _tableRowsVisible: TableRow[] = [];

    /** @hidden */
    _popoverOpen = false;

    /** @hidden */
    _popoverColumnKey: string;

    /**
     * @hidden
     * Sort Rules Map. Where key is column key and value is associated sort rule
     */
    _sortRulesMap = new Map<string, CollectionSort>();

    /**
     * @hidden
     * Group Rules Map. Where key is column key and value is associated group rule
     */
    _groupRulesMapSubject: BehaviorSubject<Map<string, CollectionGroup>> = new BehaviorSubject(new Map());
    /** @hidden */
    get _groupRulesMap(): Map<string, CollectionGroup> {
        return this._groupRulesMapSubject.getValue();
    }

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
        return this.selectionMode !== this.SELECTION_MODE.NONE;
    }

    /** @hidden */
    private _ds: FdpTableDataSource<T>;

    /** @hidden */
    private _tableDataSource: TableDataSource<T>;

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

        this._listenToRtlChanges();

        this._listenToTableStateChanges();

        this._listenToColumns();

        this._setFreezableInfo();

        this._calculateVisibleColumns();

        this._constructTableMetadata();

        this._listenToTableRowsPipe();

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
    freezeToColumn(columnKey: string): void {
        this._tableService.freezeTo(columnKey);
        this.freezeColumnsTo = columnKey;
        this._setFreezableInfo();
        this._cd.markForCheck();
    }

    /** Unfreeze column */
    unfreeze(columnKey: string): void {
        const idx = this._freezableColumns.indexOf(columnKey);
        const freezeToKey = this._freezableColumns[idx - 1];
        this._tableService.freezeTo(freezeToKey);
        this.freezeColumnsTo = freezeToKey;
        this._setFreezableInfo();
        this._cd.markForCheck();
    }

    /** Search in table */
    search(searchInput: SearchInput): void {
        this._tableService.search(searchInput);
        this._cd.markForCheck();
    }

    /** Toolbar Sort Settings button visibility */
    showSortSettingsInToolbar(showSortSettings: boolean): void {
        this._isShownSortSettingsInToolbar = showSortSettings;
        this._cd.markForCheck();
    }

    /** Toolbar Filter Settings button visibility */
    showFilterSettingsInToolbar(showFilterSettings: boolean): void {
        this._isShownFilterSettingsInToolbar = showFilterSettings;
        this._cd.markForCheck();
    }

    /** Toolbar Group Settings button visibility */
    showGroupSettingsInToolbar(showGroupSettings: boolean): void {
        this._isShownGroupSettingsInToolbar = showGroupSettings;
        this._cd.markForCheck();
    }

    /** Toolbar Columns Settings button visibility */
    showColumnSettingsInToolbar(showColumnSettings: boolean): void {
        this._isShownColumnSettingsInToolbar = showColumnSettings;
        this._cd.markForCheck();
    }

    // Private API

    /** @hidden */
    _getRowNestingPadding(row: TableRow): number {
        return (row.level || 0) * SELECTION_COLUMN_WIDTH.get(this.contentDensity);
    }

    /**
     * @hidden
     * Select/unselect one row in 'multiple' mode.
     */
    _toggleSelectableRow(row: TableRow): void {
        const selectionBuilder = new TableRowSelectionEventBuilder<T>(this.selectionMode, this._tableRows);
        selectionBuilder.toggle(row);
        this._checkedAll = selectionBuilder.isAllSelected();
        this._emitSelectionEventByBuilder(selectionBuilder);
    }

    /**
     * @hidden
     * Select/Unselect all rows in 'multiple' mode.
     */
    _toggleAllSelectableRows(checked: boolean): void {
        const selectionBuilder = new TableRowSelectionEventBuilder<T>(this.selectionMode, this._tableRows);
        selectionBuilder.toggleAll(checked);
        this._checkedAll = selectionBuilder.isAllSelected();
        this._emitSelectionEventByBuilder(selectionBuilder);
    }

    /** @hidden */
    _triggerClickOnKeyboardEnter(event: KeyboardEvent): void {
        event.stopPropagation();

        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            const click = new MouseEvent('click');
            event.target.dispatchEvent(click);
            event.preventDefault();
        }
    }

    /** Group By triggered from column header */
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
        return { [key]: this._selectionColumnWidth + colIdx * this._columnWidth };
    }

    /** @hidden */
    _getFreezableSelectionCellStyles(): any {
        return { 'min-width.px': this._selectionColumnWidth, 'max-width.px': this._selectionColumnWidth };
    }

    /** @hidden */
    _getRowHeight(): number {
        return ROW_HEIGHT.get(this.contentDensity);
    }

    /**
     * @hidden
     * @deprecated
     * */
    _keyDescOrder = (a: KeyValue<string, SelectableRow[]>, b: KeyValue<string, SelectableRow[]>): number => {
        const ascModifier: number = this._groupRulesMap.get(a.key)?.direction === SortDirection.ASC ? 1 : -1;
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
    private _listenToTableRowsPipe(): void {
        this._subscriptions.add(
            this._dataSourceItemsSubject
                .asObservable()
                .pipe(
                    // map source items to table rows
                    switchMap((sourceItems: T[]) => {
                        return from([
                            sourceItems.map((item: T, index: number) => new TableRow('item', false, index, item))
                        ]);
                    }),
                    // Insert items to show groups
                    switchMap((rows: TableRow[]) =>
                        this._groupRulesMapSubject.pipe(
                            map((groupRules) => {
                                return this._groupTableRows(rows, groupRules.values());
                            })
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
            merge([
                // Events that should trigger DataSource.fetch()
                this._tableService.sortChange,
                this._tableService.filterChange,
                this._tableService.searchChange,
            ]).pipe(
                map(() => this._tableService.getTableState()),
                filter((state) => !!state),
                distinctUntilChanged()
            )
            .subscribe((state) => {
                this._tableDataSource?.fetch(state);
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
    private _setTableRows(rows: TableRow[]): void {
        this._tableRows = rows;

        this._onTableRowsChanged();
    }

    /** @hidden */
    private _onTableRowsChanged(): void {
        this._calculateVisibleTableRows();
    }

    /** @hidden */
    private _calculateVisibleTableRows(): void {
        this._tableRowsVisible = this._tableRows.filter((row) => !row.hidden);
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
        this._selectionColumnWidth = this._isShownSelectionColumn ? SELECTION_COLUMN_WIDTH.get(this.contentDensity) : 0;
        this._tablePadding = this._selectionColumnWidth + this._columnWidth * this._freezableColumns.length;
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
    private _constructTableMetadata(): void {
        const state = this.getTableState();

        this._buildSortRulesMap(state);

        this._buildGroupRulesMap(state);
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

    /**
     * Group given table rows and return flat rows list.
     * It's intended to be called recursively.
     * @param rules group rules to build rows for
     * @param rows source table rows to group by
     * @param parent row parent
     * @param level level of nesting
     * @returns flat table rows including a groups rows
     */
    private _wrapTableRowsIntoGroupRows(
        rules: CollectionGroup[],
        rows: TableRow[],
        parent: TableRow = null,
        level = 0
    ): TableRow[] {
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

        // Build table rows in a right order included required group rows
        let children: TableRow[] = [];
        for (const [value, values] of Array.from(valuesHash)) {
            const filteredRows = rows.filter((_item) => values.includes(_item));

            if (filteredRows.length === 0) {
                continue;
            }

            const groupTableRow = new TableRow(
                'group',
                false,
                0,
                { field: rule.field, value: value },
                parent,
                level,
                true /** expandable */,
                true /** expanded */,
                parent && !parent.expanded /** hidden */
            );

            // Add group row
            children.push(groupTableRow);
            // Ads group's children
            children = children.concat(this._wrapTableRowsIntoGroupRows(rules, filteredRows, groupTableRow, level + 1));
        }

        return children;
    }

    private _groupTableRows(sourceRows: TableRow[], groups: Iterable<CollectionGroup>): TableRow[] {
        const rules = Array.from(groups);

        if (!rules.length) {
            return sourceRows;
        }

        const flattenRowsIncludedGroups = this._wrapTableRowsIntoGroupRows(rules, sourceRows);

        return flattenRowsIncludedGroups;
    }

    /** @hidden */
    private _toggleExpandableTableRow(rowToToggle: TableRow): void {
        const expanded = (rowToToggle.expanded = !rowToToggle.expanded);

        this._findRowChildren(rowToToggle).forEach((row) => {
            /**
             * if parent is collapsed we want to hide all nested items
             * if parent is expanded we want show only items which direct parent is expanded as well
             */
            row.hidden = !expanded ? true : !row.parent.expanded;
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
     * @hidden
     * @returns parents list [direct parent, ..., ancestor]
     */
    private _getRowParents(row: TableRow): TableRow[] {
        const parents = [];
        let parent = row.parent;
        while (parent) {
            parents.push(parent);
            parent = parent.parent;
        }
        return parents;
    }

    /** @hidden */
    private _resetAllSelectedRows(): void {
        this._checkedAll = false;
        this._tableRows.filter(({ type }) => type === 'item').forEach((r) => (r.checked = false));
    }

    /** @hidden */
    private _emitSelectionEventByBuilder(builder: TableRowSelectionEventBuilder<T>): void {
        const event = builder.createEvent();
        this.rowSelectionChange.emit({
            ...event,
            source: this
        });
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
        const initDataSource = this._toDataStream(ds);

        if (initDataSource === undefined) {
            throw new Error(`[TableDataSource] source did not match an Array, Observable, nor DataSource`);
        }
        /**
         * This is single point of data entry to the component. We don't want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsSubscription = initDataSource.open().subscribe((items) => {
            // this._rows = items.map((row, index) => ({ checked: false, index: index, value: row })) || [];
            this._dataSourceItemsSubject.next(items);
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
