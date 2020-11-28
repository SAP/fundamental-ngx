import { Observable } from 'rxjs';

import { DataProvider } from '../../../domain';
import { TableState } from '../interfaces';


export abstract class TableDataProvider<T> extends DataProvider<T> {
    abstract totalItems: number;
    abstract items: T[];

    /** @ts-ignore */
    abstract fetch(tableState: TableState): Observable<T[]>;
}
