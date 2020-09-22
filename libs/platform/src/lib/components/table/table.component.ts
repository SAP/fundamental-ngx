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
    Input, OnInit,
    Output,
    QueryList,
    ViewEncapsulation
} from '@angular/core';

import { ContentDensity, SelectionMode } from './types';
import { TableColumnComponent } from './table-column/table-column.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';

class SelectionChangeEvent<T> {
    selection: T[]; // currently selected items
    added: T[];     // items added
    removed: T[];   // items removed
    index: number[];  // indexes location of additions or removals
}

export class TableRowSelectionChangeEvent<T> extends SelectionChangeEvent<T> {
    source: TableComponent;
}

@Component({
    selector: 'fdp-table',
    templateUrl: './table.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterViewInit {
    /** Data source for table data. */
    @Input() dataSource: any[];

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
    rows;
    /** @hidden */
    checkedAll = false;
    /** @hidden */
    checked = [];
    /** @hidden */
    unchecked = [];

    /** @hidden */
    constructor(private readonly _cd: ChangeDetectorRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.rows = this.dataSource.map(c => ({checked: false, value: c}));
    }

    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    /** @hidden Select/unselect one row in 'multiple' mode. */
    select(index: number, row: any, checked: boolean): void {
        this._reset();
        this.checkedAll = !checked ? false : this.rows.reduce((check, r) => check && r.checked, true);
        checked ? this.checked.push(row.value) : this.unchecked.push(row.value);
        this._emitChange(index);
    }

    /** @hidden Select one row in 'single' mode. */
    selectSingle(index: number, row: any): void {
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
    private _getCellValue(key: string, row: any): any {
        return key.split('.').reduce((a, b) => a[b], row);
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
}
