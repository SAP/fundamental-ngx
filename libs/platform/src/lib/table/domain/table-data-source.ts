import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DataSource } from '@fundamental-ngx/platform/shared';

import { TableState } from '../interfaces/table-state.interface';
import { TableDataProvider } from './table-data-provider';

export class TableDataSource<T> implements DataSource<T> {
    protected dataChanges = new BehaviorSubject<T[]>([]);

    constructor(readonly dataProvider: TableDataProvider<T>) {}

    fetch(tableState: TableState): void {
        this.dataProvider
            .fetch(tableState)
            .pipe(take(1))
            .subscribe({
                next: (items) => {
                    const {
                        page: { currentPage, pageSize }
                    } = tableState;
                    const currentItems = this.dataChanges.getValue().slice();
                    /**
                     * Page Scrolling
                     * Insert new page items to a specific position
                     */
                    if (currentPage > 1 && currentItems.length > 0) {
                        const startIndex = (currentPage - 1) * pageSize;
                        currentItems.splice(startIndex, currentItems.length, ...items);
                        items = currentItems;
                    }

                    this.dataChanges.next(items);
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
