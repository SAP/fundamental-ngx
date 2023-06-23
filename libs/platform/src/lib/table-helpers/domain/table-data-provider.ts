import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import { SearchInput } from '@fundamental-ngx/platform/search-field';
import { isSelectItem, SelectItem } from '@fundamental-ngx/platform/shared';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionFilterAndGroup,
    CollectionFilterGroup,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionStringFilter
} from '../interfaces/collection-filter.interface';

import { TableState } from '../interfaces/table-state.interface';
import get from 'lodash-es/get';
import { TableRow } from '../models';
import { isCollectionFilter } from '../utils';

export abstract class BaseTableDataProvider<T, P = T[]> {
    /** Total items count. */
    totalItems: number;
    /** Array of items. */
    items: P;
    /** Date time adapter for date field filtering. */
    dateTimeAdapter?: DatetimeAdapter<any>;

    /** Additional set of filters provided by outside component. */
    protected filterBy: CollectionFilterAndGroup[];
    /** Additional search query provided by outside component. */
    protected searchInput?: SearchInput;

    /** @hidden */
    protected _destroy$ = new Subject<void>();

    abstract fetch(state?: TableState, parentRows?: TableRow<T>[]): Observable<P>;

    abstract fetchData(state: TableState, parentRows?: TableRow<T>[]): Observable<P>;

    /**
     * Method for setting external filtering conditions.
     * @param filterBy Set of column filters.
     * @param searchInput Search condition from search field.
     */
    setFilters(filterBy: CollectionFilterAndGroup[], searchInput?: SearchInput): void {
        this.filterBy = filterBy;
        this.searchInput = searchInput;
    }

    /**
     * Method for filtering the data.
     * @param items Array of data source items.
     * @param filters Set of column filters.
     * @returns Array of filtered items.
     */
    applyFiltering(items: T[], filters: CollectionFilterAndGroup[]): T[] {
        items = items.filter((i) => this.getFilteringStrategy(i, filters));
        return items;
    }

    /** @hidden */
    getSelectItemValue(item: any): any {
        return isSelectItem(item) ? item.value : item;
    }

    /**
     * Method which selects appropriate filtering strategy of the field depending on the filter type.
     * Developers can override this method to extend the filtering functionality.
     * @param item item of the data source.
     * @param filters Set of column filters.
     * @returns Whether or not item should be included in data array.
     */
    getFilteringStrategy(item: T, filters: CollectionFilterAndGroup[]): boolean {
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
    collectionFilterStrategy(item: T, filter: CollectionFilter): boolean {
        let result: boolean;

        switch (filter.type) {
            case 'boolean':
                result = this.filterBoolean(item, filter as CollectionBooleanFilter);
                break;
            case 'number':
                result = this.filterNumber(item, filter as CollectionNumberFilter);
                break;
            case 'date': {
                result = this.filterDate(item, filter as CollectionDateFilter, this.dateTimeAdapter);
                break;
            }
            case 'string':
            default:
                result = Array.isArray(filter.value)
                    ? this.filterArray(item, filter as CollectionSelectFilter)
                    : this.filterString(item, filter as CollectionStringFilter);
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
    collectionFilterGroupStrategy(item: T, filter: CollectionFilterGroup): boolean {
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
    search(items: T[], { searchInput, columnKeys }: TableState): T[] {
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

    /**
     * String filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    protected filterString(item: T, filter: CollectionStringFilter): boolean {
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
     * Number filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    protected filterNumber(item: T, filter: CollectionNumberFilter): boolean {
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
     * Date filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @param adapter
     * @returns whether or not item should be included in data source array.
     */
    protected filterDate<D = FdDate>(item: T, filter: CollectionDateFilter, adapter?: DatetimeAdapter<D>): boolean {
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
     * Boolean filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    protected filterBoolean(item: T, filter: CollectionBooleanFilter): boolean {
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
     * Array filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    protected filterArray(item: T, filter: CollectionSelectFilter): boolean {
        const filterValues = filter.value.map((v) => this.getSelectItemValue(v));
        const itemValue = get(item, filter.field);
        let result: boolean;

        switch (filter.strategy) {
            case 'equalTo':
            default:
                result = filterValues.includes(itemValue);
        }

        return !filterValues.length || filter.exclude ? !result : result;
    }

    /** @hidden */
    protected unsubscribe(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}

export class TableDataProvider<T> extends BaseTableDataProvider<T> {
    /**
     * Method for retrieving the data.
     * @param tableState @see TableState Set of table parameters.
     * @returns Observable with data.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetch(tableState?: TableState): Observable<T[]> {
        throw new Error('fetch method should be implemented by developers for custom data providers.');
    }

    /**
     * Method for applying filtering and retrieving the data.
     * @param state @see TableState Set of table parameters.
     * @returns Observable with filtered data.
     */
    fetchData(state: TableState): Observable<T[]> {
        return this.fetch(state).pipe(
            map((items) => {
                if (this.searchInput) {
                    items = this.search(items, { ...state, ...{ searchInput: this.searchInput } });
                }

                if (this.filterBy) {
                    items = this.applyFiltering(items, this.filterBy);
                }

                return items;
            }),
            takeUntil(this._destroy$)
        );
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
                const options: SelectItem[] = data.map((item) => ({
                    label: get(item, field),
                    value: get(item, field)
                }));

                return options;
            })
        );
    }
}

export abstract class TableChildrenDataProvider<T> extends BaseTableDataProvider<T, Map<TableRow<T>, T[]>> {
    /**
     * Method for retrieving the amount of child itemf or a defined row.
     * @param row
     */
    abstract rowChildrenCount(row: TableRow<T>, state: TableState): Observable<number>;
    /**
     * Method for retrieving the data.
     * @param tableState @see TableState Set of table parameters.
     * @returns Observable with data.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetch(tableState?: TableState, parentRows?: TableRow<T>[]): Observable<Map<TableRow<T>, T[]>> {
        throw new Error('fetch method should be implemented by developers for custom data providers.');
    }

    /**
     * Method for applying filtering and retrieving the data.
     * @param state @see TableState Set of table parameters.
     * @returns Observable with filtered data.
     */
    fetchData(state: TableState, tableRows?: TableRow<T>[]): Observable<Map<TableRow<T>, T[]>> {
        return this.fetch(state, tableRows).pipe(
            map((items) => {
                items.forEach((rowItems, row) => {
                    if (this.searchInput) {
                        rowItems = this.search(rowItems, { ...state, ...{ searchInput: this.searchInput } });
                    }

                    if (this.filterBy) {
                        rowItems = this.applyFiltering(rowItems, this.filterBy);
                    }

                    if (rowItems.length === 0) {
                        items.delete(row);
                    } else {
                        items.set(row, rowItems);
                    }
                });
                return items;
            }),
            takeUntil(this._destroy$)
        );
    }
}
