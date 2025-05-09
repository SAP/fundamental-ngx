import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DatetimeAdapter, FdDate, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionNumberFilter,
    CollectionStringFilter,
    FilterableColumnDataType,
    PlatformTableManagedPreset,
    PlatformTableModule,
    SortDirection,
    TableDataProvider,
    TableDataSource,
    TableState
} from '@fundamental-ngx/platform/table';
import {
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';
import { Variant, VariantManagementModule } from '@fundamental-ngx/platform/variant-management';
import { Observable, of } from 'rxjs';

export interface TablePreset {
    renamedPlatformTable: PlatformTableManagedPreset;
}

@Component({
    selector: 'fdp-doc-variant-management-table-example',
    templateUrl: './variant-management-table-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideDateTimeFormats()],
    imports: [
        VariantManagementModule,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective
    ]
})
export class VariantManagementTableExampleComponent {
    source: TableDataSource<ExampleItem>;

    variants: Variant<TablePreset>[] = [
        {
            isDefault: true,
            name: 'Search preset',
            createdBy: 'SAP',
            readonly: true,
            favourite: true,
            access: 'public',
            data: {
                renamedPlatformTable: {
                    columns: ['name', 'description', 'status'],
                    page: {
                        currentPage: 1,
                        pageSize: 0
                    },
                    searchInput: {
                        category: null,
                        text: 'diam'
                    }
                }
            }
        },
        {
            isDefault: false,
            name: 'Filter preset',
            createdBy: 'John Doe',
            readonly: false,
            favourite: false,
            access: 'private',
            data: {
                renamedPlatformTable: {
                    columns: ['name', 'description', 'status'],
                    page: {
                        currentPage: 1,
                        pageSize: 0
                    },
                    searchInput: {
                        category: null,
                        text: ''
                    },
                    filterBy: [
                        {
                            exclude: false,
                            field: 'name',
                            strategy: 'contains',
                            value: 'Astro',
                            value2: null,
                            type: FilterableColumnDataType.STRING
                        }
                    ]
                }
            }
        },
        {
            isDefault: false,
            name: 'Sorting preset',
            createdBy: 'John Doe',
            readonly: false,
            favourite: false,
            access: 'private',
            data: {
                renamedPlatformTable: {
                    columns: ['name', 'description', 'status', 'price'],
                    page: {
                        currentPage: 1,
                        pageSize: 0
                    },
                    searchInput: {
                        category: null,
                        text: ''
                    },
                    sortBy: [
                        {
                            direction: SortDirection.DESC,
                            field: 'price.value'
                        }
                    ]
                }
            }
        },
        {
            isDefault: false,
            name: 'Grouping preset',
            createdBy: 'John Doe',
            readonly: false,
            favourite: false,
            access: 'private',
            data: {
                renamedPlatformTable: {
                    columns: ['name', 'description', 'status'],
                    page: {
                        currentPage: 1,
                        pageSize: 0
                    },
                    searchInput: {
                        category: null,
                        text: ''
                    },
                    groupBy: [
                        {
                            direction: SortDirection.ASC,
                            field: 'status',
                            showAsColumn: true
                        }
                    ]
                }
            }
        },
        {
            isDefault: false,
            name: 'Combined preset',
            createdBy: 'John Doe',
            readonly: false,
            favourite: false,
            access: 'private',
            data: {
                renamedPlatformTable: {
                    columns: ['name', 'description', 'status'],
                    page: {
                        currentPage: 1,
                        pageSize: 0
                    },
                    searchInput: {
                        category: null,
                        text: ''
                    },
                    filterBy: [
                        {
                            exclude: false,
                            field: 'name',
                            strategy: 'contains',
                            value: 'Astro',
                            value2: null,
                            type: FilterableColumnDataType.STRING
                        }
                    ],
                    sortBy: [
                        {
                            direction: SortDirection.DESC,
                            field: 'price.value'
                        }
                    ],
                    groupBy: [
                        {
                            direction: SortDirection.ASC,
                            field: 'status',
                            showAsColumn: true
                        }
                    ]
                }
            }
        }
    ];

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
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
    items: ExampleItem[] = [];
    totalItems = 0;

    constructor(public dateTimeAdapter: DatetimeAdapter<FdDate>) {
        super();
    }

    fetch(tableState?: TableState): Observable<ExampleItem[]> {
        this.items = [...ITEMS];

        // apply searching
        if (tableState?.searchInput) {
            this.items = this.search(this.items, tableState);
        }
        // apply filtering
        if (tableState?.filterBy) {
            this.items = this.filter(tableState);
        }
        // apply sorting
        if (tableState?.sortBy) {
            this.items = this.sort(tableState);
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

    private sort({ sortBy }: TableState): ExampleItem[] {
        const items = this.items.slice();

        sortBy = sortBy.filter(({ field }) => !!field);

        if (sortBy.length === 0) {
            return items;
        }

        return items.sort(
            (a, b) =>
                sortBy
                    .map(({ field, direction }) => {
                        const ascModifier = direction === SortDirection.ASC ? 1 : -1;
                        return sort(a, b, field as string) * ascModifier;
                    })
                    .find((result, index, list) => result !== 0 || index === list.length - 1) ?? 0
        );
    }

    private filter({ filterBy }: TableState): ExampleItem[] {
        let items = this.items;

        filterBy
            .filter(({ field }) => !!field)
            .forEach((rule) => {
                items = items.filter((item) => {
                    switch (rule.field) {
                        case 'name':
                        case 'description':
                        case 'status':
                        case 'statusColor':
                            return filterByString(item, rule as CollectionStringFilter);
                        case 'price.value':
                            return filterByNumber(item, rule as CollectionNumberFilter);
                        case 'verified':
                            return filterByBoolean(item, rule as CollectionBooleanFilter);
                        case 'date':
                            return filterByDate(item, rule as CollectionBooleanFilter, this.dateTimeAdapter);
                        default:
                            return false;
                    }
                });
            });

        return items;
    }
}

/* UTILS */

const sort = <T extends Record<string, any>>(a: T, b: T, key?: string): number => {
    if (key) {
        a = getNestedValue(key, a);
        b = getNestedValue(key, b);
    }
    return a > b ? 1 : a === b ? 0 : -1;
};

function getNestedValue<T extends Record<string, any>>(key: string, object: T): any {
    return key.split('.').reduce((a, b) => (a ? a[b] : null), object);
}

const filterByString = (item: ExampleItem, filter: CollectionStringFilter): boolean => {
    const filterValue = filter.value && filter.value.toLocaleLowerCase();
    const filterValue2 = (filter.value2 && filter.value2.toLocaleLowerCase()) || '';
    const itemValue = getNestedValue(filter.field, item).toLocaleLowerCase();
    let result = false;

    switch (filter.strategy) {
        case 'equalTo':
            result = itemValue === filterValue;
            break;
        case 'greaterThan':
            result = itemValue > filterValue;
            break;
        case 'greaterThanOrEqualTo':
            result = itemValue >= filterValue;
            break;
        case 'lessThan':
            result = itemValue < filterValue;
            break;
        case 'lessThanOrEqualTo':
            result = itemValue <= filterValue;
            break;
        case 'between':
            result = itemValue >= filterValue && itemValue <= filterValue2;
            break;
        case 'beginsWith':
            result = itemValue.startsWith(filterValue);
            break;
        case 'endsWith':
            result = itemValue.endsWith(filterValue);
            break;
        case 'contains':
        default:
            result = itemValue.includes(filterValue);
    }

    return filter.exclude ? !result : result;
};

const filterByNumber = (item: ExampleItem, filter: CollectionNumberFilter): boolean => {
    const filterValue = Number.parseFloat(filter.value as unknown as string);
    const filterValue2 = Number.parseFloat(filter.value2 as unknown as string) || 0;
    const itemValue = Number.parseFloat(getNestedValue(filter.field, item));
    let result = false;

    switch (filter.strategy) {
        case 'greaterThan':
            result = itemValue > filterValue;
            break;
        case 'greaterThanOrEqualTo':
            result = itemValue >= filterValue;
            break;
        case 'lessThan':
            result = itemValue < filterValue;
            break;
        case 'lessThanOrEqualTo':
            result = itemValue <= filterValue;
            break;
        case 'between':
            result = itemValue >= filterValue && itemValue <= filterValue2;
            break;
        case 'equalTo':
        default:
            result = itemValue === filterValue;
    }

    return filter.exclude ? !result : result;
};

const filterByDate = <D = FdDate>(
    item: ExampleItem,
    filter: CollectionDateFilter,
    adapter: DatetimeAdapter<D>
): boolean => {
    const filterValue = filter.value;
    const filterValue2 = filter.value2;
    const itemValue = getNestedValue(filter.field, item);
    const diff = adapter.compareDate(itemValue, filterValue);
    let result = false;

    switch (filter.strategy) {
        case 'after':
            result = diff > 0;
            break;
        case 'onOrAfter':
            result = diff >= 0;
            break;
        case 'before':
            result = diff < 0;
            break;
        case 'beforeOrOn':
            result = diff <= 0;
            break;
        case 'between':
            result = adapter.isBetween(itemValue, filterValue, filterValue2);
            break;

        case 'equalTo':
        default:
            result = adapter.dateTimesEqual(itemValue, filterValue);
    }

    return filter.exclude ? !result : result;
};

const filterByBoolean = (item: ExampleItem, filter: CollectionBooleanFilter): boolean => {
    const filterValue = filter.value;
    const itemValue = getNestedValue(filter.field, item);
    let result = false;

    switch (filter.strategy) {
        case 'equalTo':
        default:
            result = itemValue === filterValue;
    }

    return filter.exclude ? !result : result;
};

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
    },
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
        name: 'Ergo Screen E-II',
        description: 'orci eget',
        price: {
            value: 75.86,
            currency: 'EUR'
        },
        status: 'No info',
        date: new FdDate(2020, 3, 20),
        verified: false
    },
    {
        name: 'Gaming Monster',
        description: 'cubilia curae',
        price: {
            value: 152.95,
            currency: 'EGP'
        },
        status: 'No info',
        date: new FdDate(2020, 9, 20),
        verified: false
    },
    {
        name: 'Gaming Monster Pro',
        description: 'pharetra magna vestibulum aliquet',
        price: {
            value: 213.47,
            currency: 'MZN'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 4, 17),
        verified: false
    }
];
