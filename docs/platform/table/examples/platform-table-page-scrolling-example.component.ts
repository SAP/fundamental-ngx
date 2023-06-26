import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { finalize, delay } from 'rxjs/operators';

import { FdDate } from '@fundamental-ngx/core/datetime';
import {
    TableDataSource,
    TableDataProvider,
    TableState,
    TableRowSelectionChangeEvent
} from '@fundamental-ngx/platform/table';

@Component({
    selector: 'fdp-platform-table-page-scrolling-example',
    templateUrl: './platform-table-page-scrolling-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class PlatformTablePageScrollingExampleComponent {
    sourceProvider = new TableDataProviderExample();
    source = new TableDataSource<ExampleItem>(this.sourceProvider);

    get loading(): Observable<boolean> {
        return this.sourceProvider.loading;
    }

    onRowSelectionChange({ added, removed, all }: TableRowSelectionChangeEvent<ExampleItem>): void {
        if (all) {
            const isAdd = added.length > 0;
            ALL_ITEMS.forEach((item) => {
                item.selected = isAdd;
            });
            return;
        }
        added.forEach((item) => {
            const storedItem = ALL_ITEMS.find((i) => i.name === item.name)!;
            storedItem.selected = true;
        });
        removed.forEach((item) => {
            const storedItem = ALL_ITEMS.find((i) => i.name === item.name)!;
            storedItem.selected = true;
        });
    }
}

export interface ExampleItem {
    name: string;
    description: string;
    selected: boolean;
    price: {
        value: number;
        currency: string;
    };
    status: string;
    statusColor?: string;
    date: FdDate;
    verified: boolean;
}

const ALL_ITEMS: ExampleItem[] = Array.from({ length: 450 }).map(
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
        verified: true,
        selected: false
    })
);

/**
 * Table Data Provider Example
 *
 */
export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    loading = new BehaviorSubject(true);

    items: ExampleItem[] = [];

    totalItems = 0;

    fetch(tableState?: TableState): Observable<ExampleItem[]> {
        this.items = [...ALL_ITEMS];

        // apply searching
        if (tableState?.searchInput) {
            this.items = this.search(this.items, tableState);
        }

        this.totalItems = this.items.length;

        // Apply paging
        if (tableState?.page?.currentPage) {
            const startIndex = (tableState.page.currentPage - 1) * tableState.page.pageSize;
            this.items = this.items.slice(startIndex, startIndex + tableState.page.pageSize);
        }

        this.loading.next(true);

        return of(this.items).pipe(
            delay(400),
            finalize(() => this.loading.next(false))
        );
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
