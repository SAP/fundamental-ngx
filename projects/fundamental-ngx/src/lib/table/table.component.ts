import { Component, Input } from '@angular/core';

import { TableRowObject } from './table-row-object.model';

@Component({
    selector: 'fd-table',
    templateUrl: './table.component.html'
})
export class TableComponent {
    @Input()
    headers: string[];

    @Input()
    headerWidths: string[];

    @Input()
    tableData: TableRowObject[];

    typeOf(variable) {
        return typeof variable;
    }

    public calculateColumnWidth(columns: number = 1): string {
        return 100 / columns + '%';
    }
}
