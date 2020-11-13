import { Observable, of } from 'rxjs';

import {
    CollectionGroup,
    CollectionSort,
    SortDirection,
    TableDataProvider,
    TableState
} from '@fundamental-ngx/platform';
import { ITEMS } from '../platform-table-docs.component';

export class TableDataProviderExample<T> extends TableDataProvider<T> {
    // TODO: fix types
    items = ITEMS as any[];
    totalItems = ITEMS.length;

    fetch(tableState: TableState): Observable<T[]> {
        console.log('TableDataProviderExample – fetch()');
        const { sortBy, filterBy, groupBy, currentPage, pageSize } = tableState;

        if (sortBy?.length) {
            this._sort(sortBy);
        }
        if (groupBy?.length) {
            this._group(groupBy);
        }

        return of(this.items);
    }

    private _sort(sortBy: CollectionSort[]): void {
        console.log('TableDataProviderExample – _sort()');
        const sortCriteria = sortBy[0];

        if (!sortCriteria.field) {
            return;
        }

        const ascModifier: number = sortCriteria.direction === SortDirection.ASC ? 1 : -1;
        this.items.sort((a, b) => (sort(a, b, sortCriteria.field) * ascModifier));
    }

    private _group(groupBy: CollectionGroup[]): void {
        console.log('TableDataProviderExample – _group()');
        const groupCriteria = groupBy[0];

        if (!groupCriteria.field) {
            return;
        }

        const ascModifier: number = groupCriteria.direction === SortDirection.ASC ? 1 : -1;
        this.items.sort((a, b) => (getNestedValue(groupCriteria.field, a) > getNestedValue(groupCriteria.field, b)  ? 1 : -1) * ascModifier)
    }
}

/* UTILS */
const sort = (a, b, key?: string) => {
    if (key) {
        const aValue = getNestedValue(key, a);
        const bValue = getNestedValue(key, b);

        return aValue > bValue ? 1 : -1
    } else {
        return a > b ? 1 : -1;
    }
};

function getNestedValue(key: string, object: any): any {
    return key.split('.').reduce((a, b) => a[b], object);
}
