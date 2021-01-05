import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
import { TableDataSource, TableSortChangeEvent } from '@fundamental-ngx/platform';

import { ExampleItem, TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-sortable-example',
    templateUrl: './platform-table-sortable-example.component.html'
})
export class PlatformTableSortableExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }

    logSortChange(event: TableSortChangeEvent): void {
        console.log('TableSortChangeEvent -> ', event);
    }
}
