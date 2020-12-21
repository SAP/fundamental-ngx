import { Observable, of } from 'rxjs';

import { SortDirection, TableDataProvider, TableState } from '@fundamental-ngx/platform';

import { ITEMS, ExampleItem } from './platform-table-data-items-example';

export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    items: ExampleItem[] = [];
    totalItems = 0;

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
        const items = this.items;
        const sortCriteria = sortBy[0];

        if (!sortCriteria?.field) {
            return items;
        }

        const ascModifier: number = sortCriteria.direction === SortDirection.ASC ? 1 : -1;

        return items.slice().sort((a, b) => sort(a, b, sortCriteria.field) * ascModifier);
    }

    private filter({ filterBy }: TableState): ExampleItem[] {
        let items = this.items;

        filterBy
            .filter(({ field }) => !!field)
            .forEach(({ field, value }) => {
                items = items.filter((item) => {
                    switch (field) {
                        case 'name':
                        case 'description':
                            return this.filterByTextField(item, field, value as string);
                        case 'price.value':
                            return this.filterByPriceRange(item, value as any);
                        case 'status':
                            return this.filterByStatus(item, value as string[]);
                        case 'statusColor':
                            return this.filterByStatusColor(item, value as string[]);
                        default:
                            const arbitraryValue = getNestedValue(field, item);
                            return arbitraryValue === value;
                    }
                });
            });

        return items;
    }

    private filterByTextField(item: ExampleItem, itemKey: keyof ExampleItem, filterText: string): boolean {
        const itemValue: string = getNestedValue(itemKey, item);
        return filterText && itemValue ? itemValue.toLocaleLowerCase().includes(filterText.toLocaleLowerCase()) : true;
    }

    private filterByPriceRange(item: ExampleItem, filterModel: { min: number; max: number }): boolean {
        const price = item.price.value;
        const min = Number.parseFloat(filterModel?.min as any);
        const max = Number.parseFloat(filterModel?.max as any);
        return (Number.isNaN(min) || price >= min) && (Number.isNaN(max) || price <= max);
    }

    private filterByStatus(item: ExampleItem, selected: string[]): boolean {
        return selected?.length ? selected.includes(item.status) : true;
    }

    private filterByStatusColor(item: ExampleItem, selected: string[]): boolean {
        return selected?.length ? selected.includes(item.statusColor) : true;
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
        const aValue = getNestedValue(key, a);
        const bValue = getNestedValue(key, b);

        return aValue > bValue ? 1 : -1;
    } else {
        return a > b ? 1 : -1;
    }
};

function getNestedValue<T extends {}>(key: string, object: T): any {
    return key.split('.').reduce((a, b) => a[b], object);
}

export { ExampleItem };
