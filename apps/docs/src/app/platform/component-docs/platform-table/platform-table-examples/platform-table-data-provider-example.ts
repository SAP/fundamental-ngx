import { Observable, of } from 'rxjs';

import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionStringFilter,
    SortDirection,
    TableDataProvider,
    TableState
} from '@fundamental-ngx/platform/table';

import { ITEMS, ExampleItem } from './platform-table-data-items-example';

/**
 * Table Data Provider Example
 *
 * The provider must be extended from TableDataProvider
 */
export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    items: ExampleItem[] = [];
    totalItems = 0;

    constructor(private dateTimeAdapter: DatetimeAdapter<FdDate>) {
        super();
    }

    fetch(tableState: TableState): Observable<ExampleItem[]> {
        this.items = [...ITEMS];

        // apply searching
        if (tableState.searchInput) {
            this.items = this.search(tableState);
        }
        // apply filtering
        if (tableState.filterBy) {
            this.items = this.filter(tableState);
        }
        // apply sorting
        if (tableState.sortBy) {
            this.items = this.sort(tableState);
        }
        // apply  grouping
        if (tableState.groupBy) {
            this.items = this.group(tableState);
        }

        this.totalItems = this.items.length;

        return of(this.items);
    }

    private sort({ sortBy }: TableState): ExampleItem[] {
        const items = this.items.slice();

        sortBy = sortBy.filter(({ field }) => !!field);

        if (sortBy.length === 0) {
            return items;
        }

        return items.sort((a, b) => {
            return sortBy
                .map(({ field, direction }) => {
                    const ascModifier = direction === SortDirection.ASC ? 1 : -1;
                    return sort(a, b, field) * ascModifier;
                })
                .find((result, index, list) => result !== 0 || index === list.length - 1);
        });
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
                            return filterByString(item, rule as CollectionStringFilter);
                        case 'price.value':
                            return this.filterByPrice(item, rule);
                        case 'status':
                            return this.filterByStatus(item, rule);
                        case 'statusColor':
                            return this.filterByStatusColor(item, rule);
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

    private filterByPrice(item: ExampleItem, rule: CollectionFilter): boolean {
        const filterValue = rule.value;
        if (filterValue && typeof filterValue === 'object' && ('min' in filterValue || 'max' in filterValue)) {
            const filterModel: { min: number; max: number } = rule.value;
            const price = item.price.value;
            const min = Number.parseFloat(filterModel?.min as any);
            const max = Number.parseFloat(filterModel?.max as any);
            return (Number.isNaN(min) || price >= min) && (Number.isNaN(max) || price <= max);
        }
        return filterByNumber(item, rule as CollectionNumberFilter);
    }

    private filterByStatus(item: ExampleItem, rule: CollectionFilter): boolean {
        if (Array.isArray(rule.value)) {
            return filterBySelect(item, rule as CollectionSelectFilter);
        }
        return filterByString(item, rule as CollectionStringFilter);
    }

    private filterByStatusColor(item: ExampleItem, rule: CollectionFilter): boolean {
        if (Array.isArray(rule.value)) {
            return filterBySelect(item, rule as CollectionSelectFilter);
        }
        return filterByString(item, rule as CollectionStringFilter);
    }

    private group(groupBy: TableState): ExampleItem[] {
        const items = this.items;
        const groupCriteria = groupBy[0];

        if (!groupCriteria?.field) {
            return items;
        }

        const ascModifier: number = groupCriteria.direction === SortDirection.ASC ? 1 : -1;

        items
            .slice()
            .sort(
                (a, b) =>
                    (getNestedValue(groupCriteria.field, a) > getNestedValue(groupCriteria.field, b) ? 1 : -1) *
                    ascModifier
            );
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

/* UTILS */

const sort = <T extends object>(a: T, b: T, key?: string) => {
    if (key) {
        a = getNestedValue(key, a);
        b = getNestedValue(key, b);
    }
    return a > b ? 1 : a === b ? 0 : -1;
};

function getNestedValue<T extends {}>(key: string, object: T): any {
    return key.split('.').reduce((a, b) => a[b], object);
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

const filterBySelect = (item: ExampleItem, filter: CollectionSelectFilter): boolean => {
    const filterValues = filter.value;
    const itemValue = getNestedValue(filter.field, item);
    let result = false;

    switch (filter.strategy) {
        case 'equalTo':
        default:
            result = filterValues.includes(itemValue);
    }

    return !filterValues.length || filter.exclude ? !result : result;
};
