import { Component, Input } from '@angular/core';

import { TableRowObject } from './table-row-object.model';

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
