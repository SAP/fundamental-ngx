/**
 * Default implementation for Observable Arrays and Arrays.
 */
import { Observable } from 'rxjs';

import { DataProvider } from '../../../domain';
import { TableState } from '../interfaces';

/**
 * In Memory implementation of DataProvider that supports fulltext search
 */
export abstract class TableDataProvider<T> extends DataProvider<T> {
    abstract totalItems = 0;
    abstract items: T[];

    /** @ts-ignore */
    abstract fetch(tableState: TableState): Observable<T[]>;
}
