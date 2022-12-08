import { Pipe, PipeTransform } from '@angular/core';

const sort = (a, b, key?: string): number => {
    if (key) {
        return a[key] > b[key] ? 1 : -1;
    } else {
        return a > b ? 1 : -1;
    }
};

@Pipe({ name: 'sortBy', pure: false })
export class SortByPipe implements PipeTransform {
    transform(tableRows: any[], ascending: boolean, sortKey?: string): any[] {
        const ascModifier: number = ascending ? 1 : -1;
        tableRows.sort((a, b) => sort(a, b, sortKey) * ascModifier);
        return tableRows;
    }
}
