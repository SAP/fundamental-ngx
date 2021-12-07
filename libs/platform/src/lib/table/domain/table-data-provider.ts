import { isDevMode } from '@angular/core';
import { DatetimeAdapter, FdDate } from '@fundamental-ngx/core/datetime';
import { SearchInput } from '@fundamental-ngx/platform/search-field';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionStringFilter
} from '../interfaces/collection-filter.interface';

import { TableState } from '../interfaces/table-state.interface';

export class TableDataProvider<T> {
    /** Total items count. */
    totalItems: number;
    /** Array of items. */
    items: T[];
    /** Date time adapter for date field filtering. */
    dateTimeAdapter?: DatetimeAdapter<any>;

    /** @hidden */
    private _filterBy: CollectionFilter[];
    /** @hidden */
    private _searchInput: SearchInput;

    /**
     * Method for retrieving the data.
     * @param tableState @see TableState Set of table parameters.
     * @returns Observable with data.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fetch(tableState?: TableState): Observable<T[]> {
        throw new Error('fetch method should be implemented by developers for custom data providers.');
    }

    /** @hidden */
    fetchData(state: TableState): Observable<T[]> {
        return this.fetch(state).pipe(
            map((items) => {
                if (this._searchInput) {
                    items = this.search(items, { ...state, ...{ searchInput: this._searchInput } });
                }

                if (this._filterBy) {
                    items = this.applyFiltering(items, this._filterBy);
                }

                this.totalItems = items.length;

                return items;
            })
        );
    }

    /**
     * Method for setting external filtering conditions.
     * @param filterBy Set of column filters.
     * @param searchInput Search condition from search field.
     */
    setFilters(filterBy: CollectionFilter[], searchInput?: SearchInput): void {
        this._filterBy = filterBy;
        this._searchInput = searchInput;
    }

    /**
     * Method for filtering the data.
     * @param items Array of data source items.
     * @param filters Set of column filters.
     * @returns Array of filtered items.
     */
    applyFiltering(items: T[], filters: CollectionFilter[]): T[] {
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
                const options: SelectItem[] = data.map((item) => ({
                    label: this._getNestedValue(field, item),
                    value: this._getNestedValue(field, item)
                }));

                return options;
            })
        );
    }

    /**
     * Method which selects appropriate filtering strategy of the field depending on the field type.
     * Developers can override this method to extend the filtering functionality.
     * @param item item of the data source.
     * @param filters Set of column filters.
     * @returns Whether or not item should be included in data array.
     */
    getFilteringStrategy(item: T, filters: CollectionFilter[]): boolean {
        return filters
            .filter(({ field }) => !!field)
            .every((filter) => {
                let result = false;
                switch (filter.type) {
                    case 'boolean':
                        result = this.filterBoolean(item, filter as CollectionBooleanFilter);
                        break;
                    case 'number':
                        result = this.filterNumber(item, filter as CollectionNumberFilter);
                        break;
                    case 'date':
                        result = this.filterDate(item, filter as CollectionDateFilter, this.dateTimeAdapter);
                        break;
                    case 'string':
                    default:
                        result = Array.isArray(filter.value)
                            ? this.filterArray(item, filter as CollectionSelectFilter)
                            : this.filterString(item, filter as CollectionStringFilter);
                        break;
                }

                return result;
            });
    }

    /**
     * Applies search of the search term for visible table columns.
     * Developers can override this method to extend the filtering functionality.
     * @param items data source items array.
     * @param tableState @see TableState Set of table parameters.
     * @returns filtered data source items array.
     */
    search(items: T[], { searchInput, columns }: TableState): T[] {
        const searchText = searchInput?.text || '';
        const keysToSearchBy = columns;

        if (searchText.trim() === '' || keysToSearchBy.length === 0) {
            return items;
        }

        items = items.filter((item) => {
            const valuesForSearch = keysToSearchBy.map((key) => this._getNestedValue(key, item));
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
        let itemValue = this._getNestedValue(filter.field, item);

        itemValue = itemValue ? itemValue.toLocaleLowerCase() : itemValue;

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
        const itemValue = Number.parseFloat(this._getNestedValue(filter.field, item));
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
    }

    /**
     * Date filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @param adapter
     * @returns whether or not item should be included in data source array.
     */
    protected filterDate<D = FdDate>(item: T, filter: CollectionDateFilter, adapter: DatetimeAdapter<D>): boolean {
        if (!adapter && isDevMode()) {
            console.error(
                'In order to filter date columns, please provide DateTime adapter in your TableDataProvider constructor.'
            );
        }

        const filterValue = filter.value;
        const filterValue2 = filter.value2;
        const itemValue = this._getNestedValue(filter.field, item);
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
    }

    /**
     * Boolean filtering strategy
     * @param item data source array item.
     * @param filter filter object
     * @returns whether or not item should be included in data source array.
     */
    protected filterBoolean(item: T, filter: CollectionBooleanFilter): boolean {
        const filterValue = filter.value;
        const itemValue = this._getNestedValue(filter.field, item);
        let result = false;

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
        const filterValues = filter.value;
        const itemValue = this._getNestedValue(filter.field, item);
        let result = false;

        switch (filter.strategy) {
            case 'equalTo':
            default:
                result = filterValues.includes(itemValue);
        }

        return !filterValues.length || filter.exclude ? !result : result;
    }

    /**
     * @hidden
     */
    protected _getNestedValue<P extends Record<string, any>>(key: string, object: P): any {
        return key.split('.').reduce((a, b) => a[b], object);
    }
}
