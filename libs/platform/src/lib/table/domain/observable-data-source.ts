import { Observable } from 'rxjs';

import { TableDataSource } from './table-data-source';
import { TableDataProvider } from './table-data-provider';
import { TableState } from '../interfaces/table-state.interface';

/**
 * Table Data Provider based on an Observable.
 *
 * Used to convert observable source to the TableDataProvider interface.
 *
 * For now it does not handle table state and used just for back
 * compatibility with the previous table interface.
 *
 */

export class ObservableTableDataProvider<T> extends TableDataProvider<T> {
    items = [];
    totalItems = 0;
    items$: Observable<T[]>;

    constructor(items$: Observable<T[]>) {
        super();
        this.items$ = items$;
    }

    fetch(state: TableState): Observable<T[]> {
        return this.items$;
    }
}

export class ObservableTableDataSource<T> extends TableDataSource<T> {
    constructor(data: Observable<T[]>) {
        super(new ObservableTableDataProvider(data));
    }
}
