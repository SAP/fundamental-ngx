import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DatetimeAdapter, FdDate, FdDatetimeModule, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformInputModule } from '@fundamental-ngx/platform/form';
import {
    CollectionBooleanFilter,
    CollectionCustomFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionStringFilter,
    FilterNumberStrategy,
    FilterType,
    PlatformTableModule,
    SortDirection,
    TableDataProvider,
    TableDataSource,
    TableFilterSelectOption,
    TableState
} from '@fundamental-ngx/platform/table';
import {
    FdpViewSettingsFilterCustomDef,
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';

@Component({
    selector: 'fdp-platform-table-initial-state-example',
    templateUrl: './platform-table-initial-state-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [provideDateTimeFormats()],
    imports: [
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        FdpViewSettingsFilterCustomDef,
        FdpFormGroupModule,
        PlatformInputModule,
        FormsModule,
        FdDatetimeModule,
        ButtonComponent
    ]
})
export class PlatformTableInitialStateExampleComponent {
    readonly filterTypeEnum = FilterType;
    statusFilteringValues: TableFilterSelectOption[] = [
        { value: 'Out of stock', label: 'Out of stock' },
        { value: 'Stocked on demand', label: 'Stocked on demand' }
    ];

    statusColorFilteringValues: TableFilterSelectOption[] = [
        { value: 'positive', label: 'Positive' },
        { value: 'negative', label: 'Negative' },
        { value: 'critical', label: 'Critical' }
    ];

    source: TableDataSource<ExampleItem>;

    readonly sortDirectionEnum = SortDirection;

    datetimeAdapter: DatetimeAdapter<any>;

    readonly initialFilterBy: CollectionCustomFilter<FilterNumberStrategy>[] = [
        {
            field: 'price.value',
            strategy: 'greaterThanOrEqualTo',
            value: { min: 100 }
        }
    ];

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.datetimeAdapter = datetimeAdapter;
        this.source = new TableDataSource(new TableDataProviderExample(this.datetimeAdapter, ITEMS));
    }

    protected readonly SortDirection = SortDirection;
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
    semantic: string;
}

/**
 * Table Data Provider Example
 *
 */
export class TableDataProviderExample extends TableDataProvider<ExampleItem> {
    items: ExampleItem[] = [];
    totalItems = 0;

    constructor(
        public dateTimeAdapter: DatetimeAdapter<FdDate>,
        public listOfany: any[]
    ) {
        super();
    }

    fetch(tableState?: TableState): Observable<ExampleItem[]> {
        this.items = this.listOfany;

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
        semantic: 'information'
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
        verified: true,
        semantic: 'information'
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
        semantic: 'information'
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
        verified: false,
        semantic: 'information'
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
        verified: true,
        semantic: 'information'
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
        verified: true,
        semantic: 'information'
    }
];
