import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { set } from '@fundamental-ngx/cdk/utils';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { InputComponent, PlatformDatePickerComponent, SwitchComponent } from '@fundamental-ngx/platform/form';
import { EditableTableCell, TableColumn, TableRow } from '@fundamental-ngx/platform/table-helpers';

let controlUniqId = 0;

@Component({
    selector: 'fdp-table-editable-cell',
    templateUrl: './table-editable-cell.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: EditableTableCell, useExisting: TableEditableCellComponent }],
    imports: [FormsModule, InputComponent, PlatformDatePickerComponent, SwitchComponent, FdTranslatePipe]
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
