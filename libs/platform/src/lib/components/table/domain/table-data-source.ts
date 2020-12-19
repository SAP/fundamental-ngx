import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DataSource } from '../../../domain';

import { TableState } from '../interfaces';
import { TableDataProvider } from './table-data-provider';

export class TableDataSource<T> implements DataSource<T> {
    readonly MAX_LIMIT = Number.MAX_SAFE_INTEGER;

    protected dataChanges = new BehaviorSubject<T[]>([]);

    constructor(readonly dataProvider: TableDataProvider<T>) {}

    fetch(tableState: TableState): void {
        this.dataProvider
            .fetch(tableState)
            .pipe(take(1))
            .subscribe({
                next: (data) => {
                    this.dataChanges.next(data);
                },
                error: (error) => {
                    this.dataChanges.error(error);
                }
            });
    }

    open(): Observable<T[]> {
        return this.dataChanges.asObservable();
    }

    close(): void {}
}
