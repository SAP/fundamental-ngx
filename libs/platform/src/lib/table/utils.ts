import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import { get } from 'lodash-es';
import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionNumberFilter,
    CollectionStringFilter
} from './interfaces';
import { TableRow } from './models/table-row.model';
import { FILTER_STRING_STRATEGY, FILTER_NUMBER_STRATEGY, FILTER_DATE_STRATEGY } from './enums';

export const filterByString = (rows: TableRow[], filter: CollectionStringFilter): TableRow[] => {
    const filterValue = filter.value && filter.value.toLocaleLowerCase();
    const filterValue2 = (filter.value2 && filter.value2.toLocaleLowerCase()) || '';

    switch (filter.strategy) {
        case FILTER_STRING_STRATEGY.EQ:
            return rows.filter((r) => get(r.value, filter.field).toLocaleLowerCase() === filterValue);
        case FILTER_STRING_STRATEGY.GT:
            return rows.filter((r) => get(r.value, filter.field).toLocaleLowerCase() > filterValue);
        case FILTER_STRING_STRATEGY.GTE:
            return rows.filter((r) => get(r.value, filter.field).toLocaleLowerCase() >= filterValue);
        case FILTER_STRING_STRATEGY.LT:
            return rows.filter((r) => get(r.value, filter.field).toLocaleLowerCase() < filterValue);
        case FILTER_STRING_STRATEGY.LTE:
            return rows.filter((r) => get(r.value, filter.field).toLocaleLowerCase() <= filterValue);
        case FILTER_STRING_STRATEGY.BETWEEN:
            return rows.filter((r) => {
                const rowValue = get(r.value, filter.field).toLocaleLowerCase();
                return rowValue >= filterValue && rowValue <= filterValue2;
            });
        case FILTER_STRING_STRATEGY.BEGINS_WITH:
            return rows.filter((r) => get(r.value, filter.field).toLocaleLowerCase().startsWith(filterValue));
        case FILTER_STRING_STRATEGY.ENDS_WITH:
            return rows.filter((r) => get(r.value, filter.field).toLocaleLowerCase().endsWith(filterValue));
        case FILTER_STRING_STRATEGY.CONTAINS:
        default:
            return rows.filter((r) => {
                let rowValue = get(r.value, filter.field);
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
            return rows.filter((r) => get(r.value, filter.field) === filterValue);
        case FILTER_NUMBER_STRATEGY.GT:
            return rows.filter((r) => get(r.value, filter.field) > filterValue);
        case FILTER_NUMBER_STRATEGY.GTE:
            return rows.filter((r) => get(r.value, filter.field) >= filterValue);
        case FILTER_NUMBER_STRATEGY.LT:
            return rows.filter((r) => get(r.value, filter.field) < filterValue);
        case FILTER_NUMBER_STRATEGY.LTE:
            return rows.filter((r) => get(r.value, filter.field) <= filterValue);
        case FILTER_NUMBER_STRATEGY.BETWEEN:
            return rows.filter((r) => {
                const rowValue = get(r.value, filter.field);
                return rowValue >= filterValue && rowValue <= filterValue2;
            });
        default:
            return rows.filter((r) => get(r.value, filter.field).toString().includes(filterValue));
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
            return rows.filter((r) => adapter.compareDate(get(r.value, filter.field), filterValue) > 0);
        case FILTER_DATE_STRATEGY.ON_OR_AFTER:
            return rows.filter((r) => adapter.compareDate(get(r.value, filter.field), filterValue) >= 0);
        case FILTER_DATE_STRATEGY.BEFORE:
            return rows.filter((r) => adapter.compareDate(get(r.value, filter.field), filterValue) < 0);
        case FILTER_DATE_STRATEGY.BEFORE_OR_ON:
            return rows.filter((r) => adapter.compareDate(get(r.value, filter.field), filterValue) <= 0);
        case FILTER_DATE_STRATEGY.BETWEEN:
            return rows.filter((r) => adapter.isBetween(get(r.value, filter.field), filterValue, filterValue2));
        case FILTER_DATE_STRATEGY.EQ:
        default:
            return rows.filter((r) => adapter.dateTimesEqual(get(r.value, filter.field), filterValue));
    }
};

export const filterByBoolean = (rows: TableRow[], filter: CollectionBooleanFilter): TableRow[] =>
    rows.filter((r) => get(r.value, filter.field) === filter.value);

export const getUniqueListValuesByKey = <T, K extends keyof T>(list: T[], key: K): T[] =>
    Array.from(
        list
            .reduce((map, item) => {
                map.delete(item[key]);
                map.set(item[key], item);
                return map;
            }, new Map<T[K], T>())
            .values()
    );

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

/** @hidden */
export function isCollectionFilter(item: any): item is CollectionFilter {
    return item.type !== undefined && item.strategy !== undefined && item.value !== undefined;
}
