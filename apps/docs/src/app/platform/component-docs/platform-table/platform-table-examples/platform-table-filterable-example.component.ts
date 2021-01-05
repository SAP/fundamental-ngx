import { Component } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core';
import { TableDataSource, TableFilterChangeEvent, TableFilterSelectOption } from '@fundamental-ngx/platform';

import { ExampleItem, TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-filterable-example',
    templateUrl: './platform-table-filterable-example.component.html'
})
export class PlatformTableFilterableExampleComponent {
    statusFilteringValues: TableFilterSelectOption[] = [
        { value: 'Out of stock', label: 'Out of stock' },
        { value: 'Stocked on demand', label: 'Stocked on demand' }
    ];

    statusColorFilteringValues: TableFilterSelectOption[] = [
        { value: 'positive', label: 'Positive' },
        { value: 'negative', label: 'Negative' },
        { value: 'critical', label: 'Critical' }
    ];

    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
    }

    logFilterChange(event: TableFilterChangeEvent): void {
        console.log('TableFilterChangeEvent -> ', event);
    }
}
