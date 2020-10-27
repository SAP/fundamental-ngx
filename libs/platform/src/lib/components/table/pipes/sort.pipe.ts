import { Pipe, PipeTransform } from '@angular/core';

import { SelectableRow } from '../interfaces';
import { getNestedValue } from '../../../utils/object';
import { SortDirection } from '../enums';

let defaultRows: SelectableRow[];

const sort = (a, b, key?: string) => {
    if (key) {
        const aValue = getNestedValue(key, a);
        const bValue = getNestedValue(key, b);

        return aValue > bValue ? 1 : -1
    } else {
        return a > b ? 1 : -1;
    }
};

@Pipe({ name: 'sortBy' })
export class TableSortByPipe implements PipeTransform {
    transform(tableRows: SelectableRow[], direction: SortDirection, sortKey?: string): any[] {
        if (!defaultRows) {
            defaultRows = [...tableRows];
        }

        if (!direction && !sortKey) {
            return defaultRows;
        }

        const ascModifier: number = direction === SortDirection.ASC ? 1 : -1;
        tableRows.sort((a, b) => (sort(a.value, b.value, sortKey) * ascModifier));

        return tableRows;
    }
}
