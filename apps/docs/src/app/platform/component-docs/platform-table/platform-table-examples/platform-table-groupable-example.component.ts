import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
import { TableDataSource, TableGroupChangeEvent, TableRowSelectionChangeEvent } from '@fundamental-ngx/platform';

import { ExampleItem, TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-groupable-example',
    templateUrl: './platform-table-groupable-example.component.html'
})
export class PlatformTableGroupableExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }
    logSelectionChange(event: TableRowSelectionChangeEvent<any>): void {
        console.log('TableRowSelectionChangeEvent -> ', event);
    }

    logGroupChange(event: TableGroupChangeEvent): void {
        console.log('TableGroupChangeEvent -> ', event);
    }
}
