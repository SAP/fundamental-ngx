import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TableRow } from '../../models/table-row.model';
import { TableColumn } from '../table-column/table-column';

@Component({
    selector: 'fdp-table-cell-content',
    templateUrl: './table-cell-content.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TableCellContentComponent {
    /** Table column definition. */
    @Input()
    column: TableColumn;

    /** Table row definition. */
    @Input()
    row: TableRow;

    /** Whether the row is tree. */
    @Input()
    isTreeRowFirstCell = false;
}
