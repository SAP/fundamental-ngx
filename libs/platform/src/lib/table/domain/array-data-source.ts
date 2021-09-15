import { of, Observable } from 'rxjs';

import { TableDataSource } from './table-data-source';
import { TableDataProvider } from './table-data-provider';
import { TableState } from '../interfaces/table-state.interface';

/**
 * Table Data Provider based on an array.
 *
 * Used to convert array source to the TableDataProvider interface.
 *
 * For now it does not handle table state and used just for back
 * compatibility with the previous table interface.
 *
 */

export class ArrayTableDataProvider<T> extends TableDataProvider<T> {
    items = [];
    totalItems = 0;

    constructor(items: T[]) {
        super();
        this.items = items;
        this.totalItems = this.items.length;
    }

    fetch(state: TableState): Observable<T[]> {
        return of(this.items);
    }
}

export class ArrayTableDataSource<T> extends TableDataSource<T> {
    constructor(data: T[]) {
        super(new ArrayTableDataProvider(data));
    }
}
