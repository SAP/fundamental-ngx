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
    Output,
    QueryList,
    SimpleChanges,
    ViewChild, ViewEncapsulation
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

import { isObservable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';

import { applyCssClass, CssClassBuilder, KeyUtil, RtlService } from '@fundamental-ngx/core';
import { TableService } from './table.service';
import { TableColumnComponent, TableToolbarComponent } from './components';
import { CollectionStringFilterStrategy, ContentDensity, FilterValueType, SelectionMode, SortDirection } from './enums';
import { ArrayTableDataSource, isDataSource, ObservableTableDataSource, TableDataSource } from '../../domain';
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
    DEFAULT_TABLE_STATE,
    SELECTION_COLUMN_WIDTH
} from './constants';
import { getNestedValue } from '../../utils/object';

export type FdpTableDataSource<T> = TableDataSource<T> | T[];

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
    styles: [`        
        .fd-table--fixed .fd-table__cell {
            min-width: 200px;
            max-width: 200px;
        }
        
        .fd-table--fixed .fd-popover__control {
            position: initial;
        }
    `],
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

    /** @hidden */
    _contentDensityOptions = ContentDensity;

    /** @hidden */
    _selectionModeOptions = SelectionMode;

    /** @hidden */
    _sortDirections = SortDirection;

    /** @hidden */
    popoverOpen = false;
    /** @hidden */
    popoverColumnKey = '';

    /** @hidden */
    sortField: string;
    /** @hidden */
    sortDirection: SortDirection;

    /** @hidden */
    filterType: FilterValueType = FilterValueType.STRING;
    /** @hidden */
    filterValue: CollectionFilter;

    /** @hidden */
    freezableColumns: string[] = [];
    /** @hidden */
    columnsSize = DEFAULT_COLUMN_WIDTH;
    /** @hidden */
    selectionColumnsSize = 0;
    /** @hidden */
    tablePadding = 0;

    /** @hidden */
    checkedAll = false;

    /** @hidden */
    private _checked = [];

    /** @hidden */
    private _unchecked = [];

    /** @hidden */
    private _isSortable = false;

    /** @hidden */
    private _isFilterable = false;

    /** @hidden */
    private _isGroupable = false;

    /** @hidden */
    private _dataSource: FdpTableDataSource<any>;

    /** @hidden for data source handling */
    private _dsSubscription: Subscription | null;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _rtl = false;

    /** @hidden */
    private readonly rowsStateChanges: Subject<any> = new Subject<any>();

    /** @hidden */
    constructor(
        private readonly _cd: ChangeDetectorRef,
        private readonly _tableService: TableService,
        private readonly _rtlService: RtlService
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
            this._cd.detectChanges();
        }));
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setInitialState();
        this._checkColumnsAbilities();
        this._setFreezableInfo();

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
            this.contentDensity === ContentDensity.CONDENSED ? 'fd-table--condensed' : ''
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
        this.checkedAll = !checked ? false : this._rows.reduce((check, r) => check && r.checked, true);
        checked ? this._checked.push(row.value) : this._unchecked.push(row.value);
        this._emitChange(index);
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
            this._emitChange(index);

            return;
        }

        this._rows[index].checked = true;
        this._checked.push(row.value);
        this._emitChange(index);
    }

    /** @hidden Select/unselect all rows in 'multiple' mode. */
    selectAll(checked: boolean): void {
        this._resetChecks();
        this.checkedAll = checked;

        if (checked) {
            this._checkAll();
            this._emitChange();

            return;
        }

        this._uncheckAll();
        this._emitChange();
    }

    /** @hidden */
    getCellValue(key: string, row: SelectableRow): any {
        return getNestedValue(key, row.value);
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
        this.popoverOpen = false;
    }

    /** @hidden */
    filter(field: string, value: string): void {
        this._tableService.filter({
            field: field,
            value: value,
            strategy: CollectionStringFilterStrategy.CONTAINS
        } as CollectionFilter);
        this.popoverOpen = false;
    }

    /** @hidden */
    freezeTo(columnKey: string): void {
        this._tableService.freezeTo(columnKey);
        this.freezeColumnsTo = columnKey;
        this._setFreezableInfo();
    }

    /** @hidden */
    unfreeze(columnKey: string): void {
        const idx = this.freezableColumns.indexOf(columnKey);
        const freezeToKey = this.freezableColumns[idx - 1];
        this._tableService.freezeTo(freezeToKey);
        this.freezeColumnsTo = freezeToKey;
        this._setFreezableInfo();
    }

    /*doesColumnHasPopover(column: TableColumnComponent): boolean {
        if (!column) {
            return;
        }
        return column.sortable || column.filterable || column.groupable || this._isFreezable;
    }*/

    /** @hidden */
    _getFixedTableStyles(): { [klass: string]: any; } {
        const key = this._rtl ? 'padding-right.px' : 'padding-left.px';
        return { [key]: this.tablePadding };
    }

    /** @hidden */
    _getFreezableCellStyles(idx: number): { [klass: string]: any; } {
        const key = this._rtl ? 'margin-right.px' : 'margin-left.px';
        return { [key]: this.selectionColumnsSize + idx * this.columnsSize };
    }

    /** @hidden */
    _getFreezableSelectionCellStyles(): any {
        return { 'min-width.px': this.selectionColumnsSize, 'max-width.px': this.selectionColumnsSize };
    }

    /** @hidden */
    private _setFreezableInfo(): void {
        this.freezableColumns = this._getFreezableColumn();
        this.selectionColumnsSize = SELECTION_COLUMN_WIDTH.get(`${this.selectionMode}-${this.contentDensity}`) || 0;
        this.tablePadding = this.selectionColumnsSize + this.columnsSize * (this.freezableColumns && this.freezableColumns.length || 0);
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
                .pipe(filter(state => !!state), distinctUntilChanged())
                .subscribe(state => {
                    // SORTING
                    if (state.sortBy.length) {
                        this.sortDirection = state.sortBy[0].direction || null;
                        this.sortField = state.sortBy[0].field || null;
                    }

                    // filtering
                    const filterBy = state.filterBy;
                    if (filterBy.length) {
                        this.filterValue = filterBy[0] || null;
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
        this.checkedAll = false;
        this._rows.forEach(r => r.checked = false);
        this._reset();
    }

    /** @hidden */
    private _emitChange(index?: number): void {
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
        this._dsSubscription = initDataSource
            .open()
            .subscribe((data) => {
                this._rows = data.map(c => ({checked: false, value: c})) || [];
                this.rowsStateChanges.next(this._rows);
                this._cd.markForCheck();
            });

        this._subscriptions.add(this._dsSubscription);
        // initial data fetch
        initDataSource.match('*');
        return initDataSource;
    }

    /** @hidden */
    private _toDataStream(ds: FdpTableDataSource<any>): TableDataSource<any> {
        if (isDataSource(ds)) {
            return ds as TableDataSource<any>;
        } else if (Array.isArray(ds)) {
            // default implementation to work on top of arrays
            return new ArrayTableDataSource<any>(ds);
        } else if (isObservable(ds)) {
            return new ObservableTableDataSource<any>(ds);
        }

        return undefined;
    }
}
