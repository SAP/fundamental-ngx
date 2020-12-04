import { Observable } from 'rxjs';

import { TableState } from '../interfaces';

export abstract class TableDataProvider<T> {
    abstract totalItems: number;
    abstract items: T[];

    abstract fetch(tableState: TableState): Observable<T[]>;
}
