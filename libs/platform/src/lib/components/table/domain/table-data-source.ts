import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DataSource } from '../../../domain';
import { TableDataProvider } from './table-data-provider';
import { TableState } from '../interfaces';


export class TableDataSource<T> implements DataSource<T> {
    readonly MAX_LIMIT = Number.MAX_SAFE_INTEGER;

    protected dataChanges = new BehaviorSubject<T[]>([]);

    constructor(public readonly dataProvider: TableDataProvider<T>) {}

    fetch(tableState: TableState): void {
        this.dataProvider
            .fetch(tableState)
            .pipe(take(1))
            .subscribe(this.dataChanges);
    }

    open(): Observable<T[]> {
        return this.dataChanges.asObservable();
    }

    close(): void {}
}
