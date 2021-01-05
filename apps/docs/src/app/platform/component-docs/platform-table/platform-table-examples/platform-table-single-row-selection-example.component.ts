import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FdDate } from '@fundamental-ngx/core';
import {
    TableDataSource,
    TableRowSelectionChangeEvent,
    TableDataProvider,
    TableState
} from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-table-single-row-selection-example',
    templateUrl: './platform-table-single-row-selection-example.component.html'
})
export class PlatformTableSingleRowSelectionExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor() {
        this.source = new TableDataSource(new TableDataProviderExample());
    }

    onRowSelectionChange(event: TableRowSelectionChangeEvent<ExampleItem>): void {
        console.log(event);
    }
}

export interface ExampleItem {
    name: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
    status: string;
    statusColor?: string;
    date: FdDate;
    verified: boolean;
}

/**
 * Table Data Provider Example
 *
 */
export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    items: ExampleItem[] = [...ITEMS];
    totalItems = ITEMS.length;

    fetch(tableState: TableState): Observable<ExampleItem[]> {
        this.items = [...ITEMS];

        // apply searching
        if (tableState.searchInput) {
            this.items = this.search(tableState);
        }

        this.totalItems = this.items.length;

        return of(this.items);
    }

    private search({ searchInput, columns }: TableState): ExampleItem[] {
        const items = this.items;
        const searchText = searchInput?.text || '';
        const keysToSearchBy = columns;

        if (searchText.trim() === '' || keysToSearchBy.length === 0) {
            return items;
        }

        return items.filter((item) => {
            const valuesForSearch = keysToSearchBy.map((key) => getNestedValue(key, item));
            return valuesForSearch
                .filter((value) => !!value)
                .map((value): string => value.toString())
                .some((value) => value.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
        });
    }
}

function getNestedValue<T extends {}>(key: string, object: T): any {
    return key.split('.').reduce((a, b) => a[b], object);
}

// Example items
const ITEMS: ExampleItem[] = [
    {
        name: '10 Portable DVD player',
        description: 'diam neque vestibulum eget vulputate',
        price: {
            value: 66.04,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 7),
        verified: true
    },
    {
        name: 'Blaster Extreme',
        description: 'quisque ut',
        price: {
            value: 436.88,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 8, 15),
        verified: true
    },
    {
        name: 'Broad Screen 22HD',
        description: 'ultrices posuere',
        price: {
            value: 458.18,
            currency: 'CNY'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 5, 4),
        verified: true
    },
    {
        name: 'Ergo Mousepad',
        description: 'tortor duis mattis egestas',
        price: {
            value: 354.46,
            currency: 'EUR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 5, 7),
        verified: true
    },
    {
        name: 'Ergo Screen E-I',
        description: 'massa quis augue luctus tincidunt',
        price: {
            value: 387.23,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 3, 23),
        verified: true
    },
    {
        name: 'ITelO Vault Net',
        description: 'ut odio',
        price: {
            value: 353.29,
            currency: 'EUR'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 10, 23),
        verified: true
    },
    {
        name: 'Mini Tablet',
        description: 'condimentum neque',
        price: {
            value: 196.52,
            currency: 'EGP'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2019, 12, 30),
        verified: true
    },
    {
        name: 'Ultra Jet Mobile',
        description: 'est congue elementum in hac',
        price: {
            value: 226.91,
            currency: 'NZD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 10, 13),
        verified: false
    },
    {
        name: 'Astro Laptop 1516',
        description: 'justo sollicitudin ut',
        price: {
            value: 311.68,
            currency: 'MZN'
        },
        status: 'Become out of stock',
        statusColor: 'critical',
        date: new FdDate(2020, 7, 30),
        verified: true
    },
    {
        name: 'Beam Breaker B-1',
        description: 'vestibulum sit',
        price: {
            value: 286.95,
            currency: 'IDR'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 6, 17),
        verified: false
    }
];
