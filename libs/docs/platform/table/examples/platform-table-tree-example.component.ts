import { Component, ViewChild } from '@angular/core';
import { DropPredicate } from '@fundamental-ngx/cdk/utils';
import { Observable, of } from 'rxjs';

import { FdDate } from '@fundamental-ngx/core/datetime';
import {
    newTableRow,
    TableComponent,
    TableDataProvider,
    TableDataSource,
    TableRow,
    TableRowSelectionChangeEvent,
    TableRowsRearrangeEvent,
    TableRowToggleOpenStateEvent,
    TableRowType,
    TableState
} from '@fundamental-ngx/platform/table';
import { delay, tap } from 'rxjs/operators';

@Component({
    selector: 'fdp-platform-table-tree-example',
    templateUrl: './platform-table-tree-example.component.html'
})
export class PlatformTableTreeExampleComponent {
    @ViewChild(TableComponent)
    table: TableComponent;

    source: TableDataSource<ExampleItem>;

    dropPredicate: DropPredicate<TableRow<ExampleItem>> = (dragRow, dropRow, evt) => {
        console.log(dragRow, dropRow, evt);
        // Cancel the drop if categories are different.
        if (dragRow.value.category !== dropRow.value.category) {
            return of(false).pipe(
                delay(2000),
                tap(() => {
                    alert(
                        `Item ${dragRow.value.name} cannot be dropped into ${dropRow.value.name} because their categories are different.`
                    );
                })
            );
        }
        return true;
    };

    constructor() {
        this.source = new TableDataSource(new TableDataProviderExample());
    }

    alert(message: string): void {
        alert(message);
    }

    onRowToggleOpenState(event: TableRowToggleOpenStateEvent<ExampleItem>): void {
        console.log(event);
    }

    onRowsRearrange(event: TableRowsRearrangeEvent<ExampleItem>): void {
        console.log(event);
    }

    toggleFirstRow(): void {
        this.table.toggleGroupRows(0);
    }

    onRowSelectionChange(event: TableRowSelectionChangeEvent<ExampleItem>) {
        console.log(event);
    }
}

export interface ExampleItem {
    name: string;
    description?: string;
    category?: string;
    price?: {
        value: number;
        currency: string;
    };
    status?: string;
    statusColor?: string;
    date?: FdDate;
    verified?: boolean;
    children?: ExampleItem[];
}

/**
 * Table Data Provider Example
 *
 */
export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    items: ExampleItem[] = [];
    totalItems = ITEMS.length;

    constructor() {
        super();
        this.items = [...ITEMS];
    }

    fetch(tableState?: TableState): Observable<ExampleItem[]> {
        this.items = this.items = [...ITEMS];

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
        name: 'Laptops',
        category: 'laptops',
        children: [
            {
                name: 'Astro Laptop 1516',
                category: 'laptops',
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
                name: 'Benda Laptop 1408',
                category: 'laptops',
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
        ]
    },
    {
        name: 'Screens',
        category: 'screens',
        children: [
            {
                name: 'Bending Screen 21HD',
                category: 'screens',
                description: 'nunc nisl duis bibendum',
                price: {
                    value: 66.46,
                    currency: 'EUR'
                },
                status: 'Available',
                statusColor: 'positive',
                date: new FdDate(2020, 8, 14),
                verified: false
            },
            {
                name: 'Broad Screen 22HD',
                category: 'screens',
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
                name: 'Ergo Screen E-I',
                category: 'screens',
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
                name: 'Ergo Screen E-II',
                category: 'screens',
                description: 'orci eget',
                price: {
                    value: 75.86,
                    currency: 'EUR'
                },
                status: 'No info',
                date: new FdDate(2020, 3, 20),
                verified: false
            }
        ]
    },
    {
        name: 'Other 1',
        category: 'other',
        children: [
            {
                name: '10 Portable DVD player',
                category: 'other',
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
                name: 'Astro Phone 6',
                category: 'other',
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
                category: 'other',
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
                category: 'other',
                description: 'sapien in sapien iaculis congue',
                price: {
                    value: 332.57,
                    currency: 'NZD'
                },
                status: 'No info',
                date: new FdDate(2020, 10, 23),
                verified: true
            }
        ]
    },
    {
        name: 'Other 2',
        category: 'other',
        children: [
            {
                name: 'Blaster Extreme',
                category: 'other',
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
                name: 'Camcorder View',
                category: 'other',
                description: 'integer ac leo pellentesque',
                price: {
                    value: 300.52,
                    currency: 'USD'
                },
                status: 'Available',
                statusColor: 'positive',
                date: new FdDate(2020, 5, 5),
                verified: true
            },
            {
                name: 'Cepat Tablet 10.5',
                category: 'other',
                description: 'rutrum rutrum neque aenean auctor',
                price: {
                    value: 365.12,
                    currency: 'NZD'
                },
                status: 'No info',
                date: new FdDate(2020, 5, 6),
                verified: true
            }
        ]
    },
    {
        name: 'Other 3',
        category: 'other',
        children: [
            {
                name: 'Gaming Monster',
                category: 'other',
                children: []
            },
            {
                name: 'Other 4',
                category: 'other',
                children: [
                    {
                        name: 'Camcorder View',
                        category: 'other',
                        description: 'integer ac leo pellentesque',
                        price: {
                            value: 300.52,
                            currency: 'USD'
                        },
                        status: 'Available',
                        statusColor: 'positive',
                        date: new FdDate(2020, 5, 5),
                        verified: true
                    },
                    {
                        name: 'Cepat Tablet 10.5',
                        category: 'other',
                        description: 'rutrum rutrum neque aenean auctor',
                        price: {
                            value: 365.12,
                            currency: 'NZD'
                        },
                        status: 'No info',
                        date: new FdDate(2020, 5, 6),
                        verified: true
                    },
                    {
                        name: 'Other 5',
                        category: 'other',
                        children: [
                            {
                                name: 'Other 6',
                                category: 'other',
                                children: [
                                    {
                                        name: 'Beam Breaker B-1',
                                        category: 'other',
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
                                        category: 'other',
                                        description: 'sapien in sapien iaculis congue',
                                        price: {
                                            value: 332.57,
                                            currency: 'NZD'
                                        },
                                        status: 'No info',
                                        date: new FdDate(2020, 10, 23),
                                        verified: true
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
