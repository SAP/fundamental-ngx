import { Component } from '@angular/core';

import { TableDataSource, TableSortChangeEvent } from '@fundamental-ngx/platform';
import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-sortable-example',
    templateUrl: './platform-table-sortable-example.component.html'
})
export class PlatformTableSortableExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());

    logSortChange(event: TableSortChangeEvent): void {
        console.log('TableSortChangeEvent -> ', event);
    }
}
