import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DatetimeAdapter, FdDate, FdDatetimeModule, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { SelectItem, isSelectItem } from '@fundamental-ngx/platform/shared';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';
import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionFilterAndGroup,
    CollectionFilterGroup,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionStringFilter,
    FilterType,
    FilterableColumnDataType,
    ObservableTableDataProvider,
    PlatformTableModule,
    TableDataSource,
    TableState,
    isCollectionFilter
} from '@fundamental-ngx/platform/table';
import {
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';
import { get } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
    selector: 'fdp-smart-filter-bar-observable-example',
    templateUrl: './platform-smart-filter-bar-observable-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        PlatformSmartFilterBarModule,
        TitleComponent,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        FdDatetimeModule
    ],
    providers: [provideDateTimeFormats()]
})
export class PlatformSmartFilterBarObservableExampleComponent {
    readonly dataTypeEnum = FilterableColumnDataType;
    readonly filterTypeEnum = FilterType;

    source: TableDataSource<ExampleItem>;

    constructor(datetimeAdapter: DatetimeAdapter<FdDate>) {
        this.source = new TableDataSource(new ObservableTableDataProviderExample(ITEMS, datetimeAdapter));
    }

    trackBy(_: number, item: ExampleItem): number {
        return item.id;
    }

    alert(message: string): void {
        alert(message);
    }
}

export interface ExampleItem {
    id: number;
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
export class ObservableTableDataProviderExample extends ObservableTableDataProvider<ExampleItem> {
    /** @hidden */
    constructor(items: ExampleItem[], dateTimeAdapter?: DatetimeAdapter<any>) {
        super(of(items), dateTimeAdapter);
    }

    /**
     * Method for retrieving the data.
     * @param state @see TableState Set of table parameters.
     * @returns Observable with data.
     */
    fetch(state?: TableState): Observable<ExampleItem[]> {
        return this.items$.pipe(
            map((items) => {
                if (state?.searchInput) {
                    items = this.search(items, state);
                }

                if (state?.filterBy) {
                    items = this.applyFiltering(items, state.filterBy);
                }

                this.totalItems = items.length;

                return items;
            })
        );
    }

    /**
     * Method for filtering the data.
     * @param items Array of data source items.
     * @param filters Set of column filters.
     * @returns Array of filtered items.
     */
    applyFiltering(items: ExampleItem[], filters: CollectionFilterAndGroup[]): ExampleItem[] {
        items = items.filter((i) => this.getFilteringStrategy(i, filters));
        return items;
    }

    /**
     * Method for getting all possible options for particular field.
     * Used for creating select options.
     * Developers can override this method to extend the filtering functionality.
     * @param field key of the data item.
     * @returns Observable with select items.
     */
    getFieldOptions(field: string): Observable<SelectItem[]> {
        return this.fetch().pipe(
            take(1),
            map((data) => {
                const options: SelectItem[] = data
                    .filter((item) => get(item, field) !== undefined)
                    .map((item) => ({
                        label: get(item, field),
                        value: get(item, field)
                    }));

                return options;
            })
        );
    }

    /**
     * Method which selects appropriate filtering strategy of the field depending on the filter type.
     * Developers can override this method to extend the filtering functionality.
     * @param item item of the data source.
     * @param filters Set of column filters.
     * @returns Whether or not item should be included in data array.
     */
    getFilteringStrategy(item: ExampleItem, filters: CollectionFilterAndGroup[]): boolean {
        return filters
            .filter((condition) => condition.field)
            .every((filter) => {
                if (isCollectionFilter(filter)) {
                    return this.collectionFilterStrategy(item, filter);
                }

                return this.collectionFilterGroupStrategy(item, filter);
            });
    }

    /**
     * Method which filters item depending on applied condition result.
     * Developers can override this method to extend its functionality
     * @param item Item to apply conditions to.
     * @param filter Column filter.
     * @returns {boolean} Whether this item should be present in filtered array of items.
     */
    collectionFilterStrategy(item: ExampleItem, filter: CollectionFilter): boolean {
        let result: boolean;

        switch (filter.type) {
            case 'boolean':
                result = this._filterBoolean(item, filter as CollectionBooleanFilter);
                break;
            case 'number':
                result = this._filterNumber(item, filter as CollectionNumberFilter);
                break;
            case 'date':
                result = this._filterDate(item, filter as CollectionDateFilter, this.dateTimeAdapter);
                break;
            case 'string':
            default:
                result = Array.isArray(filter.value)
                    ? this._filterArray(item, filter as CollectionSelectFilter)
                    : this._filterString(item, filter as CollectionStringFilter);
                break;
        }

        return result;
    }

    /**
     * Method which applies group filtering conditions for the item.
     * @param item Item to apply conditions to.
     * @param filter Filter group.
     * @returns {boolean} Whether this item should be present in filtered items array.
     */
    collectionFilterGroupStrategy(item: ExampleItem, filter: CollectionFilterGroup): boolean {
        return filter.strategy === 'and'
            ? filter.filters.every((f) => this.collectionFilterStrategy(item, f))
            : filter.filters.some((f) => this.collectionFilterStrategy(item, f));
    }

    /**
     * Applies search of the search term for visible table columns.
     * Developers can override this method to extend the filtering functionality.
     * @param items data source items array.
     * @param tableState @see TableState Set of table parameters.
     * @returns filtered data source items array.
     */
    search(items: ExampleItem[], { searchInput, columnKeys }: TableState): ExampleItem[] {
        const searchText = searchInput?.text || '';
        const keysToSearchBy = columnKeys;

        if (searchText.trim() === '' || keysToSearchBy.length === 0) {
            return items;
        }

        items = items.filter((item) => {
            const valuesForSearch = keysToSearchBy.map((key) => get(item, key));
            return valuesForSearch
                .filter((value) => !!value)
                .map((value): string => value.toString())
                .some((value) => value.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
        });

        return items;
    }

    private _getSelectItemValue(item: any): any {
        return isSelectItem(item) ? item.value : item;
    }

    /**
     * @hidden
     * String filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    private _filterString(item: ExampleItem, filter: CollectionStringFilter): boolean {
        const filterValue = filter.value && filter.value.toLocaleLowerCase();
        const filterValue2 = (filter.value2 && filter.value2.toLocaleLowerCase()) || '';
        let itemValue = get(item, filter.field);

        itemValue = itemValue ? itemValue.toLocaleLowerCase() : itemValue;

        let result: boolean;

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
                result = itemValue ? itemValue.includes(filterValue) : itemValue === filterValue;
        }

        return filter.exclude ? !result : result;
    }

    /**
     * @hidden
     * Number filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    private _filterNumber(item: ExampleItem, filter: CollectionNumberFilter): boolean {
        const filterValue = Number.parseFloat(filter.value as unknown as string);
        const filterValue2 = Number.parseFloat(filter.value2 as unknown as string) || 0;
        const itemValue = Number.parseFloat(get(item, filter.field));
        let result: boolean;

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
    }

    /**
     * @hidden
     * Date filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @param adapter
     * @returns whether or not item should be included in data source array.
     */
    private _filterDate<D = FdDate>(
        item: ExampleItem,
        filter: CollectionDateFilter,
        adapter?: DatetimeAdapter<D>
    ): boolean {
        if (!adapter) {
            throw new Error(
                'In order to filter date columns, please provide DateTime adapter in your TableDataProvider constructor.'
            );
        }

        const filterValue = filter.value;
        const filterValue2 = filter.value2;
        const itemValue = get(item, filter.field);
        const diff = adapter.compareDate(itemValue, filterValue);
        let result: boolean;

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
    }

    /**
     * @hidden
     * Boolean filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    private _filterBoolean(item: ExampleItem, filter: CollectionBooleanFilter): boolean {
        const filterValue = filter.value;
        const itemValue = get(item, filter.field);
        let result: boolean;

        switch (filter.strategy) {
            case 'equalTo':
            default:
                result = itemValue === filterValue;
        }

        return filter.exclude ? !result : result;
    }

    /**
     * @hidden
     * Array filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    private _filterArray(item: ExampleItem, filter: CollectionSelectFilter): boolean {
        const filterValues = filter.value.map((v) => this._getSelectItemValue(v));
        const itemValue = get(item, filter.field);
        let result: boolean;

        switch (filter.strategy) {
            case 'equalTo':
            default:
                result = filterValues.includes(itemValue);
        }

        return !filterValues.length || filter.exclude ? !result : result;
    }
}

// Example items
const ITEMS: ExampleItem[] = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
        id: 16,
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
