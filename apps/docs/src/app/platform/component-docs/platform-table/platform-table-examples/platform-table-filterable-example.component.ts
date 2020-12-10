import { Component } from '@angular/core';

import { TableDataSource, TableFilterChangeEvent } from '@fundamental-ngx/platform';
import { TableDataProviderExample } from './platform-table-data-provider-example';

@Component({
    selector: 'fdp-table-filterable-example',
    templateUrl: './platform-table-filterable-example.component.html'
})
export class PlatformTableFilterableExampleComponent {
    source = new TableDataSource(new TableDataProviderExample());

    priceCurrencyFilteringValues = [
        { value: 'USA', label: '$ USA' },
        { value: 'EUR', label: '€ EURO' }
    ];

    statusFilteringValues = [
        { value: 'OUT_OF_STOCK', label: 'out of stock' },
        { value: 'AVAILABLE', label: 'available' }
    ];

    logFilterChange(event: TableFilterChangeEvent): void {
        console.log('TableFilterChangeEvent -> ', event);
    }
}
