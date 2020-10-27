import { Component } from '@angular/core';

import { ITEMS } from '../platform-table-docs.component';
import { TableSortChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-table-sortable-example',
    templateUrl: './platform-table-sortable-example.component.html'
})
export class PlatformTableSortableExampleComponent {
    source: any[] = ITEMS;

    logSortChange(event: TableSortChangeEvent): void {
        console.log('TableSortChangeEvent -> ', event);
    }
}
