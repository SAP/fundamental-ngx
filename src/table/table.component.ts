import { Component, Input } from '@angular/core';

export interface TableRowObject {
    rowData: any[];
}

@Component({
    selector: 'fd-table',
    templateUrl: './table.component.html'
})
export class TableComponent {
    @Input() headers: string[];

    @Input() tableData: TableRowObject[];

    typeOf(variable) {
        let retVal;
        if (typeof variable === 'string') {
            retVal = 'string';
        } else if (typeof variable === 'object') {
            retVal = 'object';
        }

        return retVal;
    }
}
