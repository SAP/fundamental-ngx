import { Pipe, PipeTransform } from '@angular/core';

import {
    CollectionBooleanFilter,
    CollectionCustomFilter,
    CollectionDateFilter,
    CollectionFilter,
    CollectionNumberFilter,
    CollectionSelectFilter,
    CollectionStringFilter,
    SelectableRow
} from '../interfaces';
import { getNestedValue } from '../../../utils/object';
import {
    CollectionDateFilterStrategy,
    CollectionNumberFilterStrategy,
    CollectionStringFilterStrategy,
    FilterValueType
} from '../enums';

@Pipe({ name: 'filter' })
export class TableFilterPipe implements PipeTransform {
    transform(rows: SelectableRow[] = [], filterType: FilterValueType = FilterValueType.STRING, filter: CollectionFilter): SelectableRow[] {
        if (!filter || !rows.length) {
            return rows;
        }

        switch (filterType) {
            case FilterValueType.NUMBER:
                return this._filterByNumber(rows, filter as CollectionNumberFilter);
            case FilterValueType.DATE:
                return this._filterByDate(rows, filter as CollectionDateFilter);
            case FilterValueType.BOOLEAN:
                return this._filterByBoolean(rows, filter as CollectionBooleanFilter);
            case FilterValueType.SELECT:
                return this._filterBySelect(rows, filter as CollectionSelectFilter);
            case FilterValueType.CUSTOM:
                return this._filterByCustom(rows, filter as CollectionCustomFilter);
            case FilterValueType.STRING:
            default:
                return this._filterByString(rows, filter as CollectionStringFilter)
        }
    }

    private _filterByString(rows: SelectableRow[], filter: CollectionStringFilter): SelectableRow[] {
        const filterValue = filter.value && filter.value.toLocaleLowerCase();
        const filterValue2 = filter.value2 && filter.value2.toLocaleLowerCase() || '';
        switch (filter.strategy) {
            case CollectionStringFilterStrategy.EQ:
                return rows.filter(r => getNestedValue(filter.field, r.value).toLocaleLowerCase() === filterValue);
            case CollectionStringFilterStrategy.GT:
                return rows.filter(r => getNestedValue(filter.field, r.value).toLocaleLowerCase() > filterValue);
            case CollectionStringFilterStrategy.GTE:
                return rows.filter(r => getNestedValue(filter.field, r.value).toLocaleLowerCase() >= filterValue);
            case CollectionStringFilterStrategy.LT:
                return rows.filter(r => getNestedValue(filter.field, r.value).toLocaleLowerCase() < filterValue);
            case CollectionStringFilterStrategy.LTE:
                return rows.filter(r => getNestedValue(filter.field, r.value).toLocaleLowerCase() <= filterValue);
            case CollectionStringFilterStrategy.BETWEEN:
                return rows.filter(r => {
                    const rowValue = getNestedValue(filter.field, r.value).toLocaleLowerCase();
                    return rowValue >= filterValue && rowValue <= filterValue2;
                });
            case CollectionStringFilterStrategy.BEGINS_WITH:
                return rows.filter(r => getNestedValue(filter.field, r.value).toLocaleLowerCase().startsWith(filterValue));
            case CollectionStringFilterStrategy.ENDS_WITH:
                return rows.filter(r => getNestedValue(filter.field, r.value).toLocaleLowerCase().endsWith(filterValue));
            case CollectionStringFilterStrategy.CONTAINS:
            default:
                return rows.filter(r => {
                    let rowValue = getNestedValue(filter.field, r.value);
                    if (typeof rowValue === 'number') {
                        rowValue = rowValue.toString();
                    }

                    return rowValue.toLocaleLowerCase().includes(filterValue);
                });
        }
    }

    private _filterByNumber(rows: SelectableRow[], filter: CollectionNumberFilter): SelectableRow[] {
        const filterValue = filter.value && filter.value;
        const filterValue2 = filter.value2 && filter.value2 || 0;
        switch (filter.strategy) {
            case CollectionNumberFilterStrategy.EQ:
                return rows.filter(r => getNestedValue(filter.field, r.value) === filterValue);
            case CollectionNumberFilterStrategy.GT:
                return rows.filter(r => getNestedValue(filter.field, r.value) > filterValue);
            case CollectionNumberFilterStrategy.GTE:
                return rows.filter(r => getNestedValue(filter.field, r.value) >= filterValue);
            case CollectionNumberFilterStrategy.LT:
                return rows.filter(r => getNestedValue(filter.field, r.value) < filterValue);
            case CollectionNumberFilterStrategy.LTE:
                return rows.filter(r => getNestedValue(filter.field, r.value) <= filterValue);
            case CollectionNumberFilterStrategy.BETWEEN:
                return rows.filter(r => {
                    const rowValue = getNestedValue(filter.field, r.value);
                    return rowValue >= filterValue && rowValue <= filterValue2;
                });
            default:
                return rows.filter(r => getNestedValue(filter.field, r.value).toString().includes(filterValue));
        }
    }

    private _filterByDate(rows: SelectableRow[], filter: CollectionDateFilter): SelectableRow[] {
        const filterValue = filter.value && filter.value;
        const filterValue2 = filter.value2 && filter.value2 || new Date();
        switch (filter.strategy) {
            case CollectionDateFilterStrategy.AFTER:
                return rows.filter(r => getNestedValue(filter.field, r.value) > filterValue);
            case CollectionDateFilterStrategy.ON_OR_AFTER:
                return rows.filter(r => getNestedValue(filter.field, r.value) >= filterValue);
            case CollectionDateFilterStrategy.BEFORE:
                return rows.filter(r => getNestedValue(filter.field, r.value) < filterValue);
            case CollectionDateFilterStrategy.BEFORE_OR_ON:
                return rows.filter(r => getNestedValue(filter.field, r.value) <= filterValue);
            case CollectionDateFilterStrategy.BETWEEN:
                return rows.filter(r => {
                    const rowValue = getNestedValue(filter.field, r.value);
                    return rowValue >= filterValue && rowValue <= filterValue2;
                });
            case CollectionDateFilterStrategy.EQ:
            default:
                return rows.filter(r => getNestedValue(filter.field, r.value) === filterValue);
        }
    }

    private _filterByBoolean(rows: SelectableRow[], filter: CollectionBooleanFilter): SelectableRow[] {
        return rows.filter(r => getNestedValue(filter.field, r.value) === filter.value);
    }

    private _filterBySelect(rows: SelectableRow[], filter: CollectionSelectFilter): SelectableRow[] {
        // needs concat because of "error TS2345: Argument of type 'any' is not assignable to parameter of type 'never'".
        const filterValues = [].concat(filter.values);
        if (!filterValues.length) {
            return rows;
        }

        return rows.filter(r => filterValues.includes(getNestedValue(filter.field, r.value)));
    }

    private _filterByCustom(rows: SelectableRow[], filter: CollectionCustomFilter): SelectableRow[] {
        // TODO
        return rows;
    }
}
