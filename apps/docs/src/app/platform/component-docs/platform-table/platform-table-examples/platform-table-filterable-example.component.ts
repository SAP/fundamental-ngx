import { Component } from '@angular/core';
import { TableDataSource, TableFilterChangeEvent, TableFilterSelectOption } from '@fundamental-ngx/platform';

import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-filterable-example',
    templateUrl: './platform-table-filterable-example.component.html'
})
export class PlatformTableFilterableExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());

    statusFilteringValues: TableFilterSelectOption[] = [
        { value: 'Out of stock', label: 'Out of stock' },
        { value: 'Stocked on demand', label: 'Stocked on demand' }
    ];

    statusColorFilteringValues: TableFilterSelectOption[] = [
        { value: 'positive', label: 'Positive' },
        { value: 'negative', label: 'Negative' },
        { value: 'critical', label: 'Critical' }
    ];

    logFilterChange(event: TableFilterChangeEvent): void {
        console.log('TableFilterChangeEvent -> ', event);
    }
}
