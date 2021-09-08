import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { getNestedValue } from '@fundamental-ngx/platform/shared';
import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionStringFilter
} from './interfaces';
import { TableRow } from './models/table-row.model';
import { FILTER_STRING_STRATEGY, FILTER_NUMBER_STRATEGY, FILTER_DATE_STRATEGY } from './enums';

export const filterByString = (rows: TableRow[], filter: CollectionStringFilter): TableRow[] => {
    const filterValue = filter.value && filter.value.toLocaleLowerCase();
    const filterValue2 = (filter.value2 && filter.value2.toLocaleLowerCase()) || '';

    switch (filter.strategy) {
        case FILTER_STRING_STRATEGY.EQ:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() === filterValue);
        case FILTER_STRING_STRATEGY.GT:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() > filterValue);
        case FILTER_STRING_STRATEGY.GTE:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() >= filterValue);
        case FILTER_STRING_STRATEGY.LT:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() < filterValue);
        case FILTER_STRING_STRATEGY.LTE:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() <= filterValue);
        case FILTER_STRING_STRATEGY.BETWEEN:
            return rows.filter((r) => {
                const rowValue = getNestedValue(filter.field, r.value).toLocaleLowerCase();
                return rowValue >= filterValue && rowValue <= filterValue2;
            });
        case FILTER_STRING_STRATEGY.BEGINS_WITH:
            return rows.filter((r) =>
                getNestedValue(filter.field, r.value).toLocaleLowerCase().startsWith(filterValue)
            );
        case FILTER_STRING_STRATEGY.ENDS_WITH:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase().endsWith(filterValue));
        case FILTER_STRING_STRATEGY.CONTAINS:
        default:
            return rows.filter((r) => {
                let rowValue = getNestedValue(filter.field, r.value);
                if (typeof rowValue === 'number') {
                    rowValue = rowValue.toString();
                }

                return rowValue.toLocaleLowerCase().includes(filterValue);
            });
    }
};

export const filterByNumber = (rows: TableRow[], filter: CollectionNumberFilter): TableRow[] => {
    const filterValue = filter.value;
    const filterValue2 = filter.value2 || 0;

    switch (filter.strategy) {
        case FILTER_NUMBER_STRATEGY.EQ:
            return rows.filter((r) => getNestedValue(filter.field, r.value) === filterValue);
        case FILTER_NUMBER_STRATEGY.GT:
            return rows.filter((r) => getNestedValue(filter.field, r.value) > filterValue);
        case FILTER_NUMBER_STRATEGY.GTE:
            return rows.filter((r) => getNestedValue(filter.field, r.value) >= filterValue);
        case FILTER_NUMBER_STRATEGY.LT:
            return rows.filter((r) => getNestedValue(filter.field, r.value) < filterValue);
        case FILTER_NUMBER_STRATEGY.LTE:
            return rows.filter((r) => getNestedValue(filter.field, r.value) <= filterValue);
        case FILTER_NUMBER_STRATEGY.BETWEEN:
            return rows.filter((r) => {
                const rowValue = getNestedValue(filter.field, r.value);
                return rowValue >= filterValue && rowValue <= filterValue2;
            });
        default:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toString().includes(filterValue));
    }
};

export const filterByDate = <D = any>(
    rows: TableRow[],
    filter: CollectionDateFilter,
    adapter: DatetimeAdapter<D>
): TableRow[] => {
    const filterValue = filter.value;
    const filterValue2 = filter.value2;

    switch (filter.strategy) {
        case FILTER_DATE_STRATEGY.AFTER:
            return rows.filter((r) => adapter.compareDate(getNestedValue(filter.field, r.value), filterValue) > 0);
        case FILTER_DATE_STRATEGY.ON_OR_AFTER:
            return rows.filter((r) => adapter.compareDate(getNestedValue(filter.field, r.value), filterValue) >= 0);
        case FILTER_DATE_STRATEGY.BEFORE:
            return rows.filter((r) => adapter.compareDate(getNestedValue(filter.field, r.value), filterValue) < 0);
        case FILTER_DATE_STRATEGY.BEFORE_OR_ON:
            return rows.filter((r) => adapter.compareDate(getNestedValue(filter.field, r.value), filterValue) <= 0);
        case FILTER_DATE_STRATEGY.BETWEEN:
            return rows.filter((r) => {
                return adapter.isBetween(getNestedValue(filter.field, r.value), filterValue, filterValue2);
            });
        case FILTER_DATE_STRATEGY.EQ:
        default:
            return rows.filter((r) => adapter.dateTimesEqual(getNestedValue(filter.field, r.value), filterValue));
    }
};

export const filterByBoolean = (rows: TableRow[], filter: CollectionBooleanFilter): TableRow[] => {
    return rows.filter((r) => getNestedValue(filter.field, r.value) === filter.value);
};

export const filterBySelect = (rows: TableRow[], filter: CollectionSelectFilter): TableRow[] => {
    // needs concat because of "error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'".
    const filterValues = [].concat(filter.value);
    if (!filterValues.length) {
        return rows;
    }

    return rows.filter((r) => filterValues.includes(getNestedValue(filter.field, r.value)));
};

export const getUniqueListValuesByKey = <T, K extends keyof T>(list: T[], key: K): T[] => {
    return Array.from(
        list
            .reduce((map, item) => {
                map.delete(item[key]);
                map.set(item[key], item);
                return map;
            }, new Map<T[K], T>())
            .values()
    );
};

export const getScrollBarWidth = (document: Document): number => {
    const div = document.createElement('div');
    div.innerText = 'W';
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.overflowY = 'scroll';
    document.body.appendChild(div);
    const scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth;
};
