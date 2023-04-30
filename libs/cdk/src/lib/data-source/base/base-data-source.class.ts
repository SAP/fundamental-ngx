import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataSourceProvider } from '../models';
import { AbstractDataProvider } from './abstract-data-provider.class';

export abstract class BaseDataSource<T> implements DataSourceProvider<T> {
    /**
     * Max limit of items to be returned.
     */
    static readonly MaxLimit = 5;

    /**
     * Whether to enable limit of max items.
     */
    limitless = false;

    /** @hidden */
    protected readonly _dataChanges$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    /** @hidden */
    protected readonly _dataRequested$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    protected readonly _dataReceived$ = new BehaviorSubject<boolean>(false);
    /** @hidden */
    protected readonly _destroy$ = new Subject<void>();

    /** @hidden */
    protected readonly _dataLoading$ = new BehaviorSubject<boolean>(false);

    /**
     * Emitted when new data has been requested.
     * @returns Observable
     */
    get dataRequested(): Observable<boolean> {
        return this._dataRequested$.asObservable();
    }

    /**
     * Emitted when new data has been received.
     * @returns Observable
     */
    get dataReceived(): Observable<boolean> {
        return this._dataReceived$.asObservable();
    }

    /**
     * Emitted when loading state has been changed.
     * @returns Observable.
     */
    get dataLoading(): Observable<boolean> {
        return this._dataLoading$.asObservable();
    }

    /**
     * Emits when data from the provides has been changed.
     * @returns Observable of data source objects.
     */
    get dataChanges(): Observable<T[]> {
        return this._dataChanges$.asObservable().pipe(takeUntil(this._destroy$));
    }

    /** @hidden */
    protected constructor(public dataProvider: AbstractDataProvider<any>) {}

    /**
     * Searches through the data source with defined parameters.
     * @param predicate Search query.
     * @param start start index.
     * @param end end index.
     */
    match(predicate: string | Map<string, string> = new Map<string, string>(), start = 0, end = Infinity): void {
        this._dataRequested$.next(true);
        this._dataLoading$.next(true);
        const searchParam = new Map();

        if (typeof predicate === 'string') {
            searchParam.set('query', predicate);
        } else if (predicate instanceof Map) {
            predicate.forEach((v, k) => searchParam.set(k, v));
        } else {
            throw new Error('DataSource.match() predicate can only accepts string and Map');
        }

        if (!searchParam.has('limit') && !this.limitless) {
            searchParam.set('limit', BaseDataSource.MaxLimit);
        }

        this.dataProvider
            .fetch(searchParam, start, end)
            .pipe(takeUntil(this._destroy$))
            .subscribe({
                next: (result: T[]) => {
                    this._dataReceived$.next(true);
                    this._dataLoading$.next(false);
                    this._dataChanges$.next(result);
                },
                error: () => {
                    this._dataReceived$.next(false);
                    this._dataLoading$.next(false);
                }
            });
    }

    /**
     * Closes the stream
     */
    unsubscribe(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
