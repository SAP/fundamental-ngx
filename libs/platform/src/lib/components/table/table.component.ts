import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
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
import { KeyValue } from '@angular/common';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, skip } from 'rxjs/operators';

import { applyCssClass, CssClassBuilder, KeyUtil, RtlService } from '@fundamental-ngx/core';
import { TableService } from './table.service';
import { TableColumnComponent, TableToolbarComponent } from './components';
import { CollectionStringFilterStrategy, ContentDensity, FilterValueType, SelectionMode, SortDirection } from './enums';
import { isDataSource } from '../../domain';
import { TableDataSource } from './domain';
import { CollectionFilter, SelectableRow, TableState } from './interfaces';
import {
    TableColumnFreezeEvent,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRowSelectionChangeEvent,
    TableSortChangeEvent
} from './models';
import {
    DEFAULT_COLUMN_WIDTH,
    DEFAULT_TABLE_STATE, ROW_HEIGHT,
    SELECTION_COLUMN_WIDTH
} from './constants';
import { getNestedValue } from '../../utils/object';

export type FdpTableDataSource<T> = TableDataSource<T>; // | T[] | Observable<T>;

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
    providers: [ TableService ]
})
export class TableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy, CssClassBuilder {
    /** Data source for table data. */
    @Input()
    set dataSource(value: FdpTableDataSource<any>) {
        if (value) {
            this._resetChecks();
            this._initializeDS(value);
        }
    }
    get dataSource(): FdpTableDataSource<any> {
        return this._dataSource;
    }

    /** Initial state of table. */
    @Input()
    set state(value: TableState) {
        if (!value) {
            this.setTableState(DEFAULT_TABLE_STATE);
        } else {
            this.setTableState(value);
        }
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

    /** Event fired when table selection has changed. */
    @Output()
    rowSelectionChange: EventEmitter<TableRowSelectionChangeEvent<any>> = new EventEmitter<TableRowSelectionChangeEvent<any>>();

    /** Event fired when table sort order has changed. */
    @Output()
    sortChange: EventEmitter<TableSortChangeEvent> = new EventEmitter<TableSortChangeEvent>();

    /** Event fired when the table filter has changed. */
    @Output()
    filterChange: EventEmitter<TableFilterChangeEvent> = new EventEmitter<TableFilterChangeEvent>();

    /** Event fired when table grouping has changed. */
    @Output()
    groupChange: EventEmitter<TableGroupChangeEvent> = new EventEmitter<TableGroupChangeEvent>();

    /** Event fired when there is a change in the frozen column. */
    @Output()
    columnFreeze: EventEmitter<TableColumnFreezeEvent> = new EventEmitter<TableColumnFreezeEvent>();

    /** @hidden */
    @ViewChild('tableContainer')
    tableContainer: ElementRef;

    /** @hidden */
    @ContentChildren(forwardRef(() => TableColumnComponent))
    columns: QueryList<TableColumnComponent>;

    /** @hidden */
    @ContentChild(TableToolbarComponent)
    tableToolbarComponent: TableToolbarComponent;

    /** @hidden */
    class: string;

    /** @hidden Formatted rows data. */
    _rows: SelectableRow[] = [];

    /** @hidden Grouped rows data. */
    _groupedRows: { [key: string]: SelectableRow[] };
    /** @hidden */
    _groupsMeta: { [key: string]: any };

    /** @hidden */
    _contentDensityOptions = ContentDensity;

    /** @hidden */
    _selectionModeOptions = SelectionMode;

    /** @hidden */
    _sortDirections = SortDirection;

    /** @hidden */
    _popoverOpen = false;
    /** @hidden */
    _popoverColumnKey = '';

    /** @hidden */
    _sortField: string;
    /** @hidden */
    _sortDirection: SortDirection;

    /** @hidden */
    _filterType: FilterValueType = FilterValueType.STRING;
    /** @hidden */
    _filterValue: CollectionFilter;

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
    _isSortable = false;

    /** @hidden */
    _isFilterable = false;

    /** @hidden */
    _isGroupable = false;

    /** @hidden */
    _rtl = false;

    /** @hidden */
    private _checked = [];

    /** @hidden */
    private _unchecked = [];

    /** @hidden */
    private _dataSource: FdpTableDataSource<any>;

    /** @hidden for data source handling */
    private _dsSubscription: Subscription | null;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private readonly _rowsStateChanges: Subject<any> = new Subject<any>();

    /** @hidden */
    constructor(
        private readonly _tableService: TableService,
        private readonly _cd: ChangeDetectorRef,
        private readonly _el: ElementRef,
        @Optional() private readonly _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
        this._onStateChanges();

        this._subscriptions.add(this._rtlService.rtl.pipe(distinctUntilChanged()).subscribe(rtl => {
            this._rtl = rtl;
            this._cd.markForCheck();
        }));
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setInitialState();
        this._checkColumnsAbilities();
        this._setFreezableInfo();
        this._onSearchSubmit();

        this.buildComponentCssClass();
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-table',
            this.contentDensity === ContentDensity.COMPACT ? 'fd-table--compact' : '',
            this.contentDensity === ContentDensity.CONDENSED ? 'fd-table--condensed' : '',
            this.noHorizontalBorders || this.noBorders ? 'fd-table--no-horizontal-borders ' : '',
            this.noVerticalBorders || this.noBorders ? 'fd-table--no-vertical-borders ' : '',
        ];
    }

    /** Get current state/settings of the Table. */
    getTableState(): TableState {
        return this._tableService.getTableState();
    }

    /** Set current state/settings of the Table. */
    setTableState(state: TableState): void {
        this._tableService.setTableState(state);
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this.tableContainer;
    }

    /** @hidden Select/unselect one row in 'multiple' mode. */
    select(index: number, row: SelectableRow, checked: boolean): void {
        this._reset();
        row.checked = checked;
        this._checkedAll = !checked ? false : this._rows.reduce((check, r) => check && r.checked, true);
        checked ? this._checked.push(row.value) : this._unchecked.push(row.value);
        this._emitSelectionChange(index);
    }

    /** @hidden Select one row in 'single' mode. */
    selectSingle(index: number, row: SelectableRow): void {
        if (this.selectionMode !== SelectionMode.SINGLE) {
            return;
        }

        this._reset();
        const alreadySelected = this._rows.find(r => r.checked === true);
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

    /** @hidden Select/unselect all rows in 'multiple' mode. */
    selectAll(checked: boolean): void {
        this._resetChecks();
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
    onKeydown(event: KeyboardEvent): void {
        // TODO: since the table should be able the focusable cells, needs to implement arrow buttons navigation in next phases

        event.stopPropagation();
        const click = new MouseEvent('click');

        if (KeyUtil.isKeyCode(event, [SPACE, ENTER])) {
            event.target.dispatchEvent(click);
            event.preventDefault();
        }
    }

    /** @hidden */
    sort(field: string, direction: SortDirection): void {
        this._tableService.sort(field, direction);
        this._popoverOpen = false;
    }

    /** @hidden */
    filter(field: string, value: string): void {
        this._tableService.filter({
            field: field,
            value: value,
            strategy: CollectionStringFilterStrategy.CONTAINS
        } as CollectionFilter);
        this._popoverOpen = false;
    }

    /** @hidden */
    group(field: string): void {
        this._tableService.group(field, SortDirection.ASC);
        this._popoverOpen = false;
    }

    /** @hidden */
    freezeTo(columnKey: string): void {
        this._tableService.freezeTo(columnKey);
        this.freezeColumnsTo = columnKey;
        this._setFreezableInfo();
    }

    /** @hidden */
    unfreeze(columnKey: string): void {
        const idx = this._freezableColumns.indexOf(columnKey);
        const freezeToKey = this._freezableColumns[idx - 1];
        this._tableService.freezeTo(freezeToKey);
        this.freezeColumnsTo = freezeToKey;
        this._setFreezableInfo();
    }

    /*doesColumnHasPopover(column: TableColumnComponent): boolean {
        if (!column) {
            return false;
        }
        return column.sortable || column.filterable || column.groupable || this._isFreezable;
    }*/

    /** @hidden */
    _getFixedTableStyles(): { [klass: string]: any; } {
        const key = this._rtl ? 'padding-right.px' : 'padding-left.px';
        return { [key]: this._tablePadding };
    }

    /** @hidden */
    _getFreezableCellStyles(colIdx: number): { [klass: string]: any; } {
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
    _keyDescOrder(a: KeyValue<string, SelectableRow[]>, b: KeyValue<string, SelectableRow[]>): number {
        const ascModifier: number = this._groupOrder === SortDirection.ASC ? 1 : -1;
        const aNumber = parseFloat(a.key);
        const bNumber = parseFloat(b.key);

        if (!isNaN(aNumber) && !isNaN(bNumber)) {
            return (aNumber > bNumber ? 1 : -1) * ascModifier
        }

        return (a.key > b.key ? 1 : -1) * ascModifier;
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
        if (!this.columns || !this.columns.length) {
            return columns;
        }

        for (const column of this.columns.toArray()) {
            if (column.key === this.freezeColumnsTo) {
                columns.push(column.key);

                return columns;
            }

            columns.push(column.key);
        }
    }

    /** @hidden */
    private _setInitialState(): void {
        const prevState = this.getTableState();

        this.setTableState({
            ...prevState,
            freezeToColumn: this.freezeColumnsTo || prevState.freezeToColumn,
            columns: this.columns
        })
    }

    /** @hidden */
    private _onStateChanges(): void {
        this._subscriptions.add(
            this._tableService.tableState$
                .pipe(
                    filter(state => !!state),
                    skip(2), // skipping setting default and initial state with columns
                    distinctUntilChanged()
                ).subscribe(state => {
                this.dataSource.fetch(state);

                // SORTING
                if (state.sortBy?.length) {
                    this._sortDirection = state.sortBy[0].direction || null;
                    this._sortField = state.sortBy[0].field || null;
                }

                // FILTERING
                const filterBy = state.filterBy;
                if (filterBy?.length) {
                    this._filterValue = filterBy[0] || null;
                }

                // GROUPING
                if (state.groupBy?.length) {
                    this._groupOrder = state.groupBy[0].direction || null;
                    this._groupField = state.groupBy[0].field || null;
                }
            })
        );

        this._subscriptions.add(
            this._tableService.sortChange.subscribe(event => {
                this.sortChange.emit(new TableSortChangeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.filterChange.subscribe(event => {
                this.filterChange.emit(new TableFilterChangeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.freezeChange.subscribe(event => {
                this.columnFreeze.emit(new TableColumnFreezeEvent(this, event.current, event.previous));
            })
        );

        this._subscriptions.add(
            this._tableService.groupChange.subscribe(event => {
                this._groupRows();
                this.groupChange.emit(new TableGroupChangeEvent(this, event.current, event.previous));
            })
        );
    }

    private _onSearchSubmit(): void {
        if (this.tableToolbarComponent) {
            this._subscriptions.add(
                this.tableToolbarComponent.searchSubmit.subscribe(input => this._tableService.search(input))
            );
        }
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

    private _checkColumnsAbilities(): void {
        if (!this.columns || !this.columns.length) {
            return;
        }

        this._isSortable = this.columns.some(c => c.sortable);
        this._isFilterable = this.columns.some(c => c.filterable);
        this._isGroupable = this.columns.some(c => c.groupable);
    }

    /** @hidden */
    private _checkAll(): void {
        this._rows.forEach(r => {
            if (!r.checked) {
                this._checked.push(r.value);
            }

            r.checked = true;
        });
    }

    /** @hidden */
    private _uncheckAll(): void {
        this._rows.forEach(r => {
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
        this._rows.forEach(r => r.checked = false);
        this._reset();
    }

    /** @hidden */
    private _emitSelectionChange(index?: number): void {
        const selected = this._rows.filter(r => r.checked).map(r => r.value);
        this.rowSelectionChange.emit({
            source: this,
            selection: selected,
            added: this._checked,
            removed: this._unchecked,
            index: index ? [index] : this._rows.reduce((indexes, row, idx) => {
                if (this._checked.includes(row.value) || this._unchecked.includes(row.value)) {
                    indexes.push(idx);
                }

                return indexes;
            }, [])
        })
    }

    /** @hidden */
    private _initializeDS(ds: FdpTableDataSource<any>): void {
        this._rows = [];
        if (isDataSource(this.dataSource)) {
            this.dataSource.close();
            if (this._dsSubscription) {
                this._dsSubscription.unsubscribe();
                this._dsSubscription = null;
            }
        }

        this._dataSource = this._openDataStream(ds);
    }

    /** @hidden */
    private _openDataStream(ds: FdpTableDataSource<any>): TableDataSource<any> {
        const initDataSource = this._toDataStream(ds);
        if (initDataSource === undefined) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }
        /**
         * This is single point of data entry to the component. We dont want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsSubscription = initDataSource.open().subscribe(rows => {
            this._rows = rows.map((row, index) => ({ checked: false, index: index, value: row })) || [];
            this._rowsStateChanges.next(this._rows);
            this._cd.markForCheck();
        });

        this._subscriptions.add(this._dsSubscription);
        // initial data fetch
        initDataSource.fetch(this.getTableState());
        return initDataSource;
    }

    /** @hidden */
    private _toDataStream(ds: FdpTableDataSource<any>): TableDataSource<any> {
        if (isDataSource(ds)) {
            return ds as TableDataSource<any>;
        }

        return undefined;
    }
}
