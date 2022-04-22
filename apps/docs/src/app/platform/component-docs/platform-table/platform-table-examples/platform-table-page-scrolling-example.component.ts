import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FdDate } from '@fundamental-ngx/core/datetime';
import { TableDataSource, TableDataProvider, TableState } from '@fundamental-ngx/platform/table';

@Component({
    selector: 'fdp-platform-table-page-scrolling-example',
    templateUrl: './platform-table-page-scrolling-example.component.html'
})
export class PlatformTablePageScrollingExampleComponent {
    sourceProvider = new TableDataProviderExample();
    source = new TableDataSource<ExampleItem>(this.sourceProvider);

    get loading(): Observable<boolean> {
        return this.sourceProvider.loading;
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
    private readonly ALL_ITEMS: ExampleItem[] = Array.from({ length: 450 }).map(
        (_, i): ExampleItem => ({
            name: `Product name ${i}`,
            description: `Product description goes here ${i}`,
            price: {
                value: i,
                currency: 'USD'
            },
            status: ['Available', 'Stocked on demand', 'Out of stock'][i % 3],
            statusColor: ['positive', 'informative', 'negative'][i % 3],
            date: FdDate.getFdDateByDate(new Date(2021, 1, i)),
            verified: true
        })
    );

    loading = new BehaviorSubject(true);

    items: ExampleItem[] = [];

    totalItems = 0;

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
