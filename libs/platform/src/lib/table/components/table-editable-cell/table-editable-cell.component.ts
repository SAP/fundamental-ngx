import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import set from 'lodash-es/set';
import { TableRow } from '../../models/table-row.model';
import { EditableTableCell } from '../../table-cell.class';
import { TableColumn } from '../table-column/table-column';

let controlUniqId = 0;

@Component({
    selector: 'fdp-table-editable-cell',
    templateUrl: './table-editable-cell.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: EditableTableCell, useExisting: TableEditableCellComponent }]
})
export class TableEditableCellComponent implements EditableTableCell {
    /** Table row definition. */
    @Input()
    row: TableRow;

    /** Table cell definition. */
    @Input()
    column: TableColumn;

    /** Column value. */
    @Input()
    set columnValue(value: any) {
        this._columnValue = value;
        set(this.row.value, this.column.key, value);
    }

    get columnValue(): any {
        return this._columnValue;
    }

    /** Editable cell form. */
    @ViewChild(NgForm)
    form: NgForm;

    /** @hidden */
    _controlUniqName = `input-${controlUniqId++}`;

    /** @hidden */
    private _columnValue: any;
}
