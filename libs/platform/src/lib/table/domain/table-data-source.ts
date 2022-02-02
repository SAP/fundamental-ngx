import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { DataSource } from '@fundamental-ngx/platform/shared';

import { TableState } from '../interfaces/table-state.interface';
import { TableDataProvider } from './table-data-provider';

export class TableDataSource<T> implements DataSource<T> {
    /** @hidden */
    protected _dataChanges = new BehaviorSubject<T[]>([]);
    /** @hidden */
    protected _onDataRequested$ = new Subject<void>();
    /** @hidden */
    protected _onDataReceived$ = new Subject<void>();

    /** @hidden */
    protected _dataLoading = false;

    /** @hidden */
    get isDataLoading(): boolean {
        return this._dataLoading;
    }

    /**
     * @hidden
     * @param dataProvider
     */
    constructor(readonly dataProvider: TableDataProvider<T>) {}

    /**
     * Method for retrieving the data of the provided data source.
     * @param tableState @see TableState Set of table parameters.
     */
    fetch(tableState: TableState): void {
        this._onDataRequested$.next();
        this._dataLoading = true;

        this.dataProvider.fetchData(tableState).subscribe({
            next: (items) => {
                this._onDataReceived$.next();
                this._dataLoading = false;
                const {
                    page: { currentPage, pageSize }
                } = tableState;
                const currentItems = this._dataChanges.getValue().slice();
                /**
                 * Page Scrolling
                 * Insert new page items to a specific position
                 */
                if (currentPage > 1 && currentItems.length > 0) {
                    const startIndex = (currentPage - 1) * pageSize;
                    currentItems.splice(startIndex, currentItems.length, ...items);
                    items = currentItems;
                }

                this._dataChanges.next(items);
            },
            error: (error) => {
                this._onDataReceived$.next();
                this._dataLoading = false;
                this._dataChanges.error(error);
            }
        });
    }

    /** @hidden */
    open(): Observable<T[]> {
        return this._dataChanges.asObservable();
    }

    /** @hidden */
    onDataRequested(): Observable<void> {
        return this._onDataRequested$.asObservable();
    }

    /** @hidden */
    onDataReceived(): Observable<void> {
        return this._onDataReceived$.asObservable();
    }

    /** @hidden */
    close(): void {}
}
