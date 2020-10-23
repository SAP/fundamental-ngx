import { Pipe, PipeTransform } from '@angular/core';
import { SelectableRow } from '../interfaces';
import { getNestedValue } from '../../../utils/object';

const sort = (a, b, key?: string) => {
    if (key) {
        const aValue = getNestedValue(key, a);
        const bValue = getNestedValue(key, b);

        return aValue > bValue ? 1 : -1
    } else {
        return a > b ? 1 : -1;
    }
};

@Pipe({ name: 'sortBy', pure: false })
export class TableSortByPipe implements PipeTransform {
    transform(tableRows: SelectableRow[], direction: 'asc' | 'desc', sortKey?: string): any[] {
        const ascModifier: number = direction === 'asc' ? 1 : -1;
        tableRows.sort((a, b) => (sort(a.value, b.value, sortKey) * ascModifier));
        return tableRows;
    }
}
