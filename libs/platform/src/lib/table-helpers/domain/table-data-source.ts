import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { DataSource } from '@fundamental-ngx/platform/shared';
import { map, takeUntil } from 'rxjs/operators';

import { TableState } from '../interfaces/table-state.interface';
import { TableDataProvider } from './table-data-provider';

export class TableDataSource<T> implements DataSource<T> {
    /** @hidden */
    protected readonly _dataChanges$ = new BehaviorSubject<T[]>([]);
    /** @hidden */
    protected readonly _onDataRequested$ = new Subject<boolean>();
    /** @hidden */
    protected readonly _onDataReceived$ = new Subject<boolean>();

    /** @hidden */
    protected readonly _dataLoading$ = new BehaviorSubject<boolean>(false);

    /** @hidden */
    protected _dataLoading = false;

    /** @hidden */
    protected readonly _destroy$ = new Subject<void>();

    /**
     * Emitted when new data has been requested.
     * @returns Observable
     */
    get dataRequested(): Observable<boolean> {
        return this._onDataRequested$.asObservable();
    }

    /**
     * Emitted when new data has been received.
     * @returns Observable
     */
    get dataReceived(): Observable<boolean> {
        return this._onDataReceived$.asObservable();
    }

    /**
     * Emitted when loading state has been changed.
     * @returns Observable.
     */
    get dataLoading(): Observable<boolean> {
        return this._dataLoading$.asObservable();
    }

    /**
     * Emits when the data from the provider has been changed.
     * @returns Observable of data source objects.
     */
    get dataChanges(): Observable<T[]> {
        return this._dataChanges$.asObservable().pipe(takeUntil(this._destroy$));
    }

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
        this._onDataRequested$.next(true);
        this._dataLoading$.next(true);
        this._dataLoading = true;

        this.dataProvider.fetchData(tableState).subscribe({
            next: (items) => {
                this._onDataReceived$.next(true);
                this._dataLoading = false;
                this._dataLoading$.next(false);
                const {
                    page: { currentPage, pageSize }
                } = tableState;
                const currentItems = this._dataChanges$.getValue().slice();
                /**
                 * Page Scrolling
                 * Insert new page items to a specific position
                 */
                if (currentPage > 1 && currentItems.length > 0) {
                    const startIndex = (currentPage - 1) * pageSize;
                    currentItems.splice(startIndex, currentItems.length, ...items);
                    items = currentItems;
                }

                this._dataChanges$.next(items);
            },
            error: (error) => {
                this._onDataReceived$.next(false);
                this._dataLoading = false;
                this._dataChanges$.error(error);
            }
        });
    }

    /** @hidden */
    open(): Observable<T[]> {
        return this._dataChanges$.asObservable();
    }

    /** @hidden */
    onDataRequested(): Observable<void> {
        return this._onDataRequested$.asObservable().pipe(map(() => void 0));
    }

    /** @hidden */
    onDataReceived(): Observable<void> {
        return this._onDataReceived$.asObservable().pipe(map(() => void 0));
    }

    /** @hidden */
    close(): void {}

    /**
     * Closes the stream
     */
    unsubscribe(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
