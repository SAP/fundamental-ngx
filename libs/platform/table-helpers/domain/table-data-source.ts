import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { DataSource } from '@fundamental-ngx/platform/shared';
import { map, takeUntil } from 'rxjs/operators';

import { TableState } from '../interfaces/table-state.interface';
import { TableRow } from '../models';
import { TableChildrenDataProvider, TableDataProvider } from './table-data-provider';

export abstract class BaseTableDataSource<T, P = T[], L = boolean> implements DataSource<T, P, L> {
    /** @hidden */
    protected readonly _dataChanges$ = new BehaviorSubject<P>([] as any);
    /** @hidden */
    protected readonly _onDataRequested$ = new Subject<boolean>();
    /** @hidden */
    protected readonly _onDataReceived$ = new Subject<boolean>();

    /** @hidden */
    protected _dataLoading: L;

    /** @hidden */
    protected readonly _dataLoading$: BehaviorSubject<L>;

    /** @hidden */
    protected readonly _destroy$ = new Subject<void>();

    /** @hidden */
    constructor() {
        this._dataLoading$ = new BehaviorSubject(this._dataLoading);
    }

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
    get dataLoading(): Observable<L> {
        return this._dataLoading$.asObservable();
    }

    /**
     * Emits when the data from the provider has been changed.
     * @returns Observable of data source objects.
     */
    get dataChanges(): Observable<P> {
        return this._dataChanges$.asObservable().pipe(takeUntil(this._destroy$));
    }

    /** @hidden */
    get isDataLoading(): L {
        return this._dataLoading;
    }

    /** @hidden */
    get data(): P {
        return this._dataChanges$.value;
    }

    /**
     * Method for retrieving the data of the provided data source.
     * @param tableState @see TableState Set of table parameters.
     */
    abstract fetch(tableState: TableState, parentRows?: TableRow<T>[]): void;

    /** @hidden */
    open(): Observable<P> {
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

export class TableDataSource<T> extends BaseTableDataSource<T> {
    /**
     * @hidden
     */
    constructor(readonly dataProvider: TableDataProvider<T>) {
        super();
    }

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
                this._dataChanges$.next(items);
            },
            error: (error) => {
                this._onDataReceived$.next(false);
                this._dataLoading = false;
                this._dataChanges$.error(error);
            }
        });
    }
}

export class ChildTableDataSource<T> extends BaseTableDataSource<
    T,
    Map<TableRow<T>, T[]>,
    { row?: TableRow<T>; loading: boolean }[]
> {
    /**
     * @hidden
     */
    constructor(readonly dataProvider: TableChildrenDataProvider<T>) {
        super();
    }

    /**
     * Method responsible for retrieving the items from the data provider.
     * Additionaly, it sets the loading state along with the dataLoading and dataChanges streams.
     * @param tableState
     * @param parentRows
     */
    fetch(tableState: TableState, parentRows?: TableRow<T>[]): void {
        this._onDataRequested$.next(true);
        const loadingState = parentRows?.map((row) => ({ row, loading: true })) || [];
        const finishedLoadingState = loadingState.map(({ row }) => ({ row, loading: false }));
        this._dataLoading$.next(loadingState);
        this._dataLoading = loadingState;

        this.dataProvider.fetchData(tableState, parentRows).subscribe({
            next: (items) => {
                this._onDataReceived$.next(true);
                this._dataLoading = finishedLoadingState;
                this._dataLoading$.next(finishedLoadingState);
                this._dataChanges$.next(items);
            },
            error: (error) => {
                this._onDataReceived$.next(false);
                this._dataLoading = finishedLoadingState;
                this._dataLoading$.next(finishedLoadingState);
                this._dataChanges$.error(error);
            }
        });
    }
}
