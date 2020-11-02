import { Component } from '@angular/core';

import { ITEMS } from '../platform-table-docs.component';
import { TableFilterChangeEvent, TableSortChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-table-filterable-example',
    templateUrl: './platform-table-filterable-example.component.html'
})
export class PlatformTableFilterableExampleComponent {
    source: any[] = ITEMS;

    logFilterChange(event: TableFilterChangeEvent): void {
        console.log('TableFilterChangeEvent -> ', event);
    }
}
