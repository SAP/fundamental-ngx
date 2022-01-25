import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FdDate } from '@fundamental-ngx/core/datetime';
import {
    TableComponent,
    TableDataProvider,
    TableDataSource,
    TableState,
    TableRowActivateEvent
} from '@fundamental-ngx/platform/table';

@Component({
    selector: 'fdp-platform-table-navigatable-row-indicator-example',
    templateUrl: './platform-table-navigatable-row-indicator-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformTableNavigatableRowIndicatorExampleComponent {
    source: TableDataSource<ExampleItem>;

    @ViewChild(TableComponent)
    table: TableComponent;

    constructor() {
        this.source = new TableDataSource(new TableDataProviderExample());
    }

    setRowNavigation(): void {
        this.table.setRowNavigation(1, true);
    }

    removeRowNavigation(): void {
        this.table.removeRowNavigation(1);
    }

    onRowNavigate(event: TableRowActivateEvent<ExampleItem>): void {
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
    navigatable?: boolean;
}

/**
 * Table Data Provider Example
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
        verified: true,
        navigatable: true
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
        verified: true,
        navigatable: true
    }
];
