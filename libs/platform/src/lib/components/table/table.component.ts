import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    QueryList
} from '@angular/core';

import { isObservable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { KeyUtil } from '@fundamental-ngx/core';
import { ContentDensity, SelectionMode } from './types';
import { TableColumnComponent } from './table-column/table-column.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import {
    ArrayTableDataSource,
    isDataSource,
    ObservableTableDataSource,
    TableDataSource
} from '../../../';

export type FdpTableDataSource<T> = TableDataSource<T> | T[];

class SelectionChangeEvent<T> {
    selection: T[]; // currently selected items
    added: T[];     // items added
    removed: T[];   // items removed
    index: number[];  // indexes location of additions or removals
}

export class TableRowSelectionChangeEvent<T> extends SelectionChangeEvent<T> {
    source: TableComponent;
}

/** @hidden */
interface SelectableRow {
    checked: boolean;
    value: any;
}

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements AfterViewInit, OnDestroy {
    /** Data source for table data. */
    @Input()
    set dataSource(value: FdpTableDataSource<any>) {
        if (value) {
            this._initializeDS(value);
        }
    }
    get dataSource(): FdpTableDataSource<any> {
        return this._dataSource;
    }

    /** The content density for which to render table. 'cozy' | 'compact' | 'condensed' */
    @Input() contentDensity: ContentDensity = 'cozy';

    /** Sets selection mode for the table. 'single' | 'multiple' | 'none' */
    @Input() selectionMode: SelectionMode = 'none';

    /** Text displayed when table has no items. */
    @Input() emptyTableMessage: string;

    /** Event fired when table selection has changed. */
    @Output() rowSelectionChange: EventEmitter<TableRowSelectionChangeEvent<any>> = new EventEmitter<TableRowSelectionChangeEvent<any>>();

    /** @hidden */
    @ContentChildren(forwardRef(() => TableColumnComponent))
    columns: QueryList<TableColumnComponent>;

    /** @hidden */
    @ContentChild(TableToolbarComponent)
    tableToolbarComponent: TableToolbarComponent;

    /** @hidden */
    @HostBinding('class.fd-table') fdTable = true;

    /** @hidden */
    @HostBinding('class.fd-table--compact') get isCompact(): boolean { return this.contentDensity === 'compact' };

    /** @hidden */
    @HostBinding('class.fd-table--condensed') get isCondensed(): boolean { return this.contentDensity === 'condensed' };

    /** @hidden Formatted rows data. */
    rows: SelectableRow[];

    /** @hidden */
    checkedAll = false;

    /** @hidden */
    checked = [];

    /** @hidden */
    unchecked = [];

    /** @hidden */
    protected _dataSource: FdpTableDataSource<any>;

    /** @hidden */
    readonly stateChanges: Subject<any> = new Subject<any>();

    /** @hidden for data source handling */
    private _dsSubscription: Subscription | null;

    /** @hidden */
    private _destroyed = new Subject<void>();

    /** @hidden */
    constructor(private readonly _cd: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    /** @hidden Select/unselect one row in 'multiple' mode. */
    select(index: number, row: SelectableRow, checked: boolean): void {
        this._reset();
        row.checked = checked;
        this.checkedAll = !checked ? false : this.rows.reduce((check, r) => check && r.checked, true);
        checked ? this.checked.push(row.value) : this.unchecked.push(row.value);
        this._emitChange(index);
    }

    /** @hidden Select one row in 'single' mode. */
    selectSingle(index: number, row: SelectableRow): void {
        if (this.selectionMode !== 'single') {
            return;
        }

        this._reset();
        const alreadySelected = this.rows.find(r => r.checked === true);
        if (alreadySelected) {
            alreadySelected.checked = false;
        }

        if (alreadySelected === row) {
            this.unchecked.push(alreadySelected.value);
            this._emitChange(index);

            return;
        }

        this.rows[index].checked = true;
        this.checked.push(row.value);
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
        return key.split('.').reduce((a, b) => a[b], row.value);
    }

    /** @hidden */
    onKeydown(event: KeyboardEvent): void {
        // TODO: since the table should be able the focusable cells, needs to implement arrow buttons navigation in next phases

        event.stopPropagation();
        const click = new MouseEvent('click');

        if (KeyUtil.isKey(event, [' ', 'Enter'])) {
            event.target.dispatchEvent(click);
            event.preventDefault();
        }
    }

    /** @hidden */
    private _checkAll(): void {
        this.rows.forEach(r => {
            if (!r.checked) {
                this.checked.push(r.value);
            }

            r.checked = true;
        });
    }

    /** @hidden */
    private _uncheckAll(): void {
        this.rows.forEach(r => {
            if (r.checked) {
                this.unchecked.push(r.value);
            }

            r.checked = false;
        });
    }

    /** @hidden */
    private _reset(): void {
        this.checked = [];
        this.unchecked = [];
    }

    /** @hidden */
    private _emitChange(index?: number): void {
        const selected = this.rows.filter(r => r.checked).map(r => r.value);
        this.rowSelectionChange.emit({
            source: this,
            selection: selected,
            added: this.checked,
            removed: this.unchecked,
            index: index ? [index] : this.rows.reduce((indexes, row, idx) => {
                if (this.checked.includes(row.value) || this.unchecked.includes(row.value)) {
                    indexes.push(idx);
                }

                return indexes;
            }, [])
        })
    }

    /** @hidden */
    private _initializeDS(ds: FdpTableDataSource<any>): void {
        this.rows = [];
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
                this.rows = data.map(c => ({checked: false, value: c})) || [];
                this.stateChanges.next(this.rows);
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
