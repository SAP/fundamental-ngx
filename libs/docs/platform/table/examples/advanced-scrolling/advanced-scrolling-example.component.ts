import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import {
    ChildTableDataSource,
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionNumberFilter,
    CollectionStringFilter,
    FdpTableDataSource,
    FilterableColumnDataType,
    FilterType,
    SortDirection,
    TableChildrenDataProvider,
    TableDataProvider,
    TableDataSource,
    TableRow,
    TableState,
    TreeTableItem
} from '@fundamental-ngx/platform/table-helpers';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'fdp-doc-advanced-scrolling-example',
    templateUrl: './advanced-scrolling-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedScrollingExampleComponent {
    source: TableDataSource<ExampleItem>;
    childSource: ChildTableDataSource<ExampleItem>;
    readonly filterTypeEnum = FilterType;
    readonly dataTypeEnum = FilterableColumnDataType;

    constructor() {
        this.source = new TableDataSource(new TableDataProviderExample());
        this.childSource = new ChildTableDataSource(new ChildTableProviderExample());
    }
}

export interface ExampleItem extends TreeTableItem<ExampleItem, 'children'> {
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
    hasChildren: boolean;
    children?: FdpTableDataSource<ExampleItem>;
}

class ChildTableProviderExample extends TableChildrenDataProvider<ExampleItem> {
    items: Map<TableRow<ExampleItem>, ExampleItem[]> = new Map();
    totalItems = 200;
    startIndex = 0;
    allItemsMap = new Map<TableRow<ExampleItem>, ExampleItem[]>();

    rowChildrenCount(row: TableRow<ExampleItem>): Observable<number> {
        return of(this.totalItems);
    }

    /**
     * Unlike default dataSource, childDataSource accepts array of table rows as a second argument.
     * This is done to load child rows in bulk for the cases when multiple rows being expanded at the same time.
     * @param tableState
     * @param tableRows
     */
    fetch(
        tableState?: TableState,
        tableRows?: TableRow<ExampleItem>[]
    ): Observable<Map<TableRow<ExampleItem>, ExampleItem[]>> {
        const itemsMap = new Map<TableRow<ExampleItem>, ExampleItem[]>();

        /** Logic of retrieving the child rows for a particular row in tableRows array. */
        tableRows?.forEach((row) => {
            let allItems = this.allItemsMap.get(row);
            const currentPage = tableState?.page.currentPage;
            if (!allItems) {
                allItems = generateItems(this.totalItems, row.level + 1);
                this.allItemsMap.set(row, allItems);
            }

            // apply searching
            if (tableState?.searchInput) {
                allItems = this.search(allItems, tableState);
            }
            // apply sorting
            if (tableState?.sortBy) {
                allItems = this.sort(allItems, tableState);
            }

            // apply filtering
            if (tableState?.filterBy) {
                allItems = this.filter(allItems, tableState);
            }

            // Apply paging
            if (currentPage && tableState?.page) {
                const startIndex = (currentPage - 1) * tableState.page.pageSize;
                allItems = allItems.slice(startIndex, startIndex + tableState.page.pageSize);
            }

            itemsMap.set(row, allItems);
        });

        return of(itemsMap).pipe(delay(1000));
    }

    private filter(items: ExampleItem[], { filterBy }: TableState): ExampleItem[] {
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
                        default:
                            return false;
                    }
                });
            });

        return items;
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

    private sort(items: ExampleItem[], { sortBy }: TableState): ExampleItem[] {
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
}

/**
 * Table Data Provider Example
 *
 */
export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    items: ExampleItem[] = [];
    totalItems = 5000;
    startIndex = 0;
    allItems: ExampleItem[];

    constructor(public level = 0) {
        super();
    }

    fetch(tableState?: TableState): Observable<ExampleItem[]> {
        this.allItems = this.allItems || generateItems(this.totalItems, this.level);
        this.items = [...this.allItems];

        // apply searching
        if (tableState?.searchInput) {
            this.items = this.search(this.items, tableState);
        }
        // apply sorting
        if (tableState?.sortBy) {
            this.items = this.sort(tableState);
        }

        // apply filtering
        if (tableState?.filterBy) {
            this.items = this.filter(this.items, tableState);
        }

        // Apply paging
        if (tableState?.page?.currentPage) {
            const startIndex = (tableState.page.currentPage - 1) * tableState.page.pageSize;
            this.items = this.items.slice(startIndex, startIndex + tableState.page.pageSize);
        }

        return of(this.items).pipe(delay(1000));
    }

    private filter(items: ExampleItem[], { filterBy }: TableState): ExampleItem[] {
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
                        default:
                            return false;
                    }
                });
            });

        return items;
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
}

function generateItems(size = 5000, level = 0, startIndex = 0): ExampleItem[] {
    return new Array(size).fill(null).map(() => ({
        name: `Laptops ${startIndex++} (Level ${level + 1})`,
        description: 'pede malesuada',
        price: {
            value: 489.01,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 2, 5),
        verified: true,
        hasChildren: level < 2 ? true : false
    }));
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
