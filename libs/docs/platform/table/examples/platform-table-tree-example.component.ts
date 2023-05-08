import { Component, ViewChild } from '@angular/core';
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

@Component({
    selector: 'fdp-platform-table-tree-example',
    templateUrl: './platform-table-tree-example.component.html'
})
export class PlatformTableTreeExampleComponent {
    @ViewChild(TableComponent)
    table: TableComponent;

    source: TableDataSource<TableRow>;

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

    onRowSelectionChange(event: TableRowSelectionChangeEvent<TableRow<any>>) {
        console.log(event);
    }
}

export interface ExampleItem {
    name: string;
    description?: string;
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
export class TableDataProviderExample extends TableDataProvider<TableRow> {
    items: TableRow[] = [];
    totalItems = ITEMS.length;

    constructor() {
        super();
        this.items = convertToTree(null, ITEMS);
        this.totalItems = this.items.length;
    }

    fetch(tableState?: TableState): Observable<TableRow[]> {
        this.items = this.items = convertToTree(null, ITEMS);

        // apply searching
        if (tableState?.searchInput) {
            this.items = this.search(this.items, tableState);
        }

        this.totalItems = this.items.length;

        return of(this.items);
    }

    search(items: TableRow[], { searchInput, columnKeys }: TableState): TableRow[] {
        const searchText = searchInput?.text || '';
        const keysToSearchBy = columnKeys;

        if (searchText.trim() === '' || keysToSearchBy.length === 0) {
            return items;
        }

        return items.filter((item) => {
            const valuesForSearch = keysToSearchBy.map((key) => getNestedValue(key, item.value));
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

function convertToTree(parent: TableRow | null, items: ExampleItem[], level = 0): TableRow<ExampleItem>[] {
    const rows: TableRow<ExampleItem>[] = [];
    items.forEach((value, index) => {
        let children = [] as TableRow[];

        const treeItem = newTableRow({
            type: TableRowType.ITEM,
            checked: false,
            index,
            value,
            parent,
            level,
            expanded: false
        });

        if (value.children && value.children.length > 0) {
            children = convertToTree(treeItem, value.children, level + 1);
            treeItem.children = children;
            treeItem.type = TableRowType.TREE;
        }
        rows.push(treeItem);
    });
    return rows;
}

// Example items
const ITEMS: ExampleItem[] = [
    {
        name: 'Laptops',
        children: [
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
        ]
    },
    {
        name: 'Screens',
        children: [
            {
                name: 'Bending Screen 21HD',
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
        children: [
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
            }
        ]
    },
    {
        name: 'Other 2',
        children: [
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
                name: 'Camcorder View',
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
        children: [
            {
                name: 'Gaming Monster',
                children: []
            },
            {
                name: 'Other 4',
                children: [
                    {
                        name: 'Camcorder View',
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
                        children: [
                            {
                                name: 'Other 6',
                                children: [
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
