import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformTableModule, TableDataProvider, TableDataSource, TableState } from '@fundamental-ngx/platform/table';
import {
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';

@Component({
    selector: 'fdp-platform-table-no-outer-borders-example',
    templateUrl: './platform-table-no-outer-borders-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        PlatformButtonModule,
        FdDatetimeModule
    ]
})
export class PlatformTableNoOuterBordersExampleComponent {
    source: TableDataSource<ExampleItem>;

    constructor() {
        this.source = new TableDataSource(new TableDataProviderExample());
    }

    alert(message: string): void {
        alert(message);
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

    fetch(tableState?: TableState): Observable<ExampleItem[]> {
        this.items = [...ITEMS];

        // apply searching
        if (tableState?.searchInput) {
            this.items = this.search(this.items, tableState);
        }

        this.totalItems = this.items.length;

        return of(this.items);
    }

    search(items: ExampleItem[], { searchInput, columnKeys }: TableState): ExampleItem[] {
        const searchText = searchInput?.text || '';
        const keysToSearchBy = columnKeys;

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

function getNestedValue<T extends Record<string, any>>(key: string, object: T): any {
    return key.split('.').reduce((a, b) => (a ? a[b] : null), object);
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
        name: 'Astro Laptop 1516',
        description: 'pede malesuada',
        price: {
            value: 489.01,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 2, 5),
        verified: true
    },
    {
        name: 'Astro Phone 6',
        description: 'penatibus et magnis',
        price: {
            value: 154.1,
            currency: 'IDR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 12),
        verified: true
    },
    {
        name: 'Beam Breaker B-1',
        description: 'fermentum donec ut',
        price: {
            value: 36.56,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 11, 24),
        verified: false
    },
    {
        name: 'Beam Breaker B-2',
        description: 'sapien in sapien iaculis congue',
        price: {
            value: 332.57,
            currency: 'NZD'
        },
        status: 'No info',
        date: new FdDate(2020, 10, 23),
        verified: true
    },
    {
        name: 'Benda Laptop 1408',
        description: 'suspendisse potenti cras in',
        price: {
            value: 243.49,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 9, 22),
        verified: true
    }
];
