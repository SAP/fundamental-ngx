import { getNestedValue } from '../../utils/object';

import {
    CollectionBooleanFilter,
    CollectionDateFilter,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionStringFilter,
    SelectableRow
} from './interfaces';
import { CollectionDateFilterStrategy, CollectionNumberFilterStrategy, CollectionStringFilterStrategy } from './enums';

export const filterByString = (rows: SelectableRow[], filter: CollectionStringFilter): SelectableRow[] => {
    const filterValue = filter.value && filter.value.toLocaleLowerCase();
    const filterValue2 = (filter.value2 && filter.value2.toLocaleLowerCase()) || '';

    switch (filter.strategy) {
        case CollectionStringFilterStrategy.EQ:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() === filterValue);
        case CollectionStringFilterStrategy.GT:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() > filterValue);
        case CollectionStringFilterStrategy.GTE:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() >= filterValue);
        case CollectionStringFilterStrategy.LT:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() < filterValue);
        case CollectionStringFilterStrategy.LTE:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase() <= filterValue);
        case CollectionStringFilterStrategy.BETWEEN:
            return rows.filter((r) => {
                const rowValue = getNestedValue(filter.field, r.value).toLocaleLowerCase();
                return rowValue >= filterValue && rowValue <= filterValue2;
            });
        case CollectionStringFilterStrategy.BEGINS_WITH:
            return rows.filter((r) =>
                getNestedValue(filter.field, r.value).toLocaleLowerCase().startsWith(filterValue)
            );
        case CollectionStringFilterStrategy.ENDS_WITH:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toLocaleLowerCase().endsWith(filterValue));
        case CollectionStringFilterStrategy.CONTAINS:
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

export const filterByNumber = (rows: SelectableRow[], filter: CollectionNumberFilter): SelectableRow[] => {
    const filterValue = filter.value;
    const filterValue2 = filter.value2 || 0;

    switch (filter.strategy) {
        case CollectionNumberFilterStrategy.EQ:
            return rows.filter((r) => getNestedValue(filter.field, r.value) === filterValue);
        case CollectionNumberFilterStrategy.GT:
            return rows.filter((r) => getNestedValue(filter.field, r.value) > filterValue);
        case CollectionNumberFilterStrategy.GTE:
            return rows.filter((r) => getNestedValue(filter.field, r.value) >= filterValue);
        case CollectionNumberFilterStrategy.LT:
            return rows.filter((r) => getNestedValue(filter.field, r.value) < filterValue);
        case CollectionNumberFilterStrategy.LTE:
            return rows.filter((r) => getNestedValue(filter.field, r.value) <= filterValue);
        case CollectionNumberFilterStrategy.BETWEEN:
            return rows.filter((r) => {
                const rowValue = getNestedValue(filter.field, r.value);
                return rowValue >= filterValue && rowValue <= filterValue2;
            });
        default:
            return rows.filter((r) => getNestedValue(filter.field, r.value).toString().includes(filterValue));
    }
};

export const filterByDate = (rows: SelectableRow[], filter: CollectionDateFilter): SelectableRow[] => {
    const filterValue = filter.value;
    const filterValue2 = filter.value2 || new Date();

    switch (filter.strategy) {
        case CollectionDateFilterStrategy.AFTER:
            return rows.filter((r) => getNestedValue(filter.field, r.value) > filterValue);
        case CollectionDateFilterStrategy.ON_OR_AFTER:
            return rows.filter((r) => getNestedValue(filter.field, r.value) >= filterValue);
        case CollectionDateFilterStrategy.BEFORE:
            return rows.filter((r) => getNestedValue(filter.field, r.value) < filterValue);
        case CollectionDateFilterStrategy.BEFORE_OR_ON:
            return rows.filter((r) => getNestedValue(filter.field, r.value) <= filterValue);
        case CollectionDateFilterStrategy.BETWEEN:
            return rows.filter((r) => {
                const rowValue = getNestedValue(filter.field, r.value);
                return rowValue >= filterValue && rowValue <= filterValue2;
            });
        case CollectionDateFilterStrategy.EQ:
        default:
            return rows.filter((r) => getNestedValue(filter.field, r.value) === filterValue);
    }
};

export const filterByBoolean = (rows: SelectableRow[], filter: CollectionBooleanFilter): SelectableRow[] => {
    return rows.filter((r) => getNestedValue(filter.field, r.value) === filter.value);
};

export const filterBySelect = (rows: SelectableRow[], filter: CollectionSelectFilter): SelectableRow[] => {
    // needs concat because of "error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'".
    const filterValues = [].concat(filter.value);
    if (!filterValues.length) {
        return rows;
    }

    return rows.filter((r) => filterValues.includes(getNestedValue(filter.field, r.value)));
};
