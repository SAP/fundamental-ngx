import { Component } from '@angular/core';

import { ITEMS } from '../platform-table-docs.component';
import { TableGroupChangeEvent, TableRowSelectionChangeEvent, TableSortChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-table-groupable-example',
    templateUrl: './platform-table-groupable-example.component.html'
})
export class PlatformTableGroupableExampleComponent {
    source: any[] = ITEMS;

    logSelectionChange(event: TableRowSelectionChangeEvent<any>): void {
        console.log('TableRowSelectionChangeEvent -> ', event);
    }

    logGroupChange(event: TableGroupChangeEvent): void {
        console.log('TableGroupChangeEvent -> ', event);
    }
}
