import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
import { TableDataSource } from '@fundamental-ngx/platform';

import { ExampleItem, TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-initial-state-example',
    templateUrl: './platform-table-initial-state-example.component.html'
})
export class PlatformTableInitialStateExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
}
