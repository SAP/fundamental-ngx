import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
import { TableDataSource } from '@fundamental-ngx/platform';

import { ExampleItem, TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-single-row-selection-example',
    templateUrl: './platform-table-single-row-selection-example.component.html'
})
export class PlatformTableSingleRowSelectionExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }

    onRowSelectionChange(event): void {
        console.log(event);
    }
}
