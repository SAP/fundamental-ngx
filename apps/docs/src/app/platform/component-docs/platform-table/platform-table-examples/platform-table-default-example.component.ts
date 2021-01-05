import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
import { TableDataSource } from '@fundamental-ngx/platform';

import { ExampleItem, TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-default-example',
    templateUrl: './platform-table-default-example.component.html'
})
export class PlatformTableDefaultExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
    alert(message: string): void {
        alert(message);
    }
}
