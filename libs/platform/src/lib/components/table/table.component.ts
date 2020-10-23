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
    ViewChild
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

import { isObservable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { applyCssClass, CssClassBuilder, KeyUtil } from '@fundamental-ngx/core';
import { TableService } from './table.service';
import { TableColumnComponent, TableToolbarComponent } from './components';
import { ContentDensity, SelectionMode } from './enums';
import { ArrayTableDataSource, isDataSource, ObservableTableDataSource, TableDataSource } from '../../domain';
import { CollectionSort, SelectableRow, TableState } from './interfaces';
import {
    TableColumnFreezeEvent,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRowSelectionChangeEvent,
    TableSortChangeEvent
} from './models';
import { DEFAULT_TABLE_STATE } from './constants';
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
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ TableService ]
})
export class TableComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy, CssClassBuilder {
    /** Data source for table data. */
    @Input()
    set dataSource(value: FdpTableDataSource<any>) {
        if (value) {
            this._reset();
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
    popoverOpen = false;
    /** @hidden */
    popoverColumnName = '';
    /** @hidden */
    sortField: string;
    /** @hidden */
    sortColumn: string;
    /** @hidden */
    sortDirection: 'asc' | 'desc';

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
    private _destroyed = new Subject<void>();

    /** @hidden */
    private readonly stateChanges: Subject<any> = new Subject<any>();

    /** @hidden */
    constructor(
        private readonly _tableService: TableService,
        private readonly _cd: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.buildComponentCssClass();
        this._checkColumnsAbilities();
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
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
        this._reset();
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

    sort(field: string, direction: 'asc' | 'desc', columnName: string): void {
        if (this.sortField === field && this.sortDirection === direction) {
            return;
        }

        this.sortField = field;
        this.sortColumn = columnName;
        this.sortDirection = direction;
        const prevState = this.getTableState();
        const prevSortBy = prevState && prevState.sortBy || [];
        const newSortBy: CollectionSort[] = [{field: field, direction: direction}];
        let state: TableState;

        if (!prevState) {
            state = {...DEFAULT_TABLE_STATE, sortBy: newSortBy};
        } else {
            state = {
                ...prevState,
                sortBy: prevState.sortBy.map(s => {
                    if (s.field === newSortBy[0].field) {
                        return newSortBy[0];
                    }

                    return s;
                })
            };
        }

        this.setTableState(state);
        this.sortChange.emit(new TableSortChangeEvent(this, newSortBy, prevSortBy));
        this.popoverOpen = false;
    }

    doesColumnHasPopover(column: TableColumnComponent): boolean {
        if (!column) {
            return ;
        }
        return column.sortable || column.filterable || column.groupable;
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
        this.checkedAll = false;
        this._checked = [];
        this._unchecked = [];
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
            .pipe(takeUntil(this._destroyed))
            .subscribe((data) => {
                this._rows = data.map(c => ({checked: false, value: c})) || [];
                this.stateChanges.next(this._rows);
                this._cd.markForCheck();
            });
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
