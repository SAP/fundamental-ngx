import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
import { TableDataSource } from '@fundamental-ngx/platform';

import { ExampleItem, TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-freezable-example',
    templateUrl: './platform-table-freezable-example.component.html'
})
export class PlatformTableFreezableExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
    onColumnFreezeChange(event): void {
        console.log(event);
    }
}
