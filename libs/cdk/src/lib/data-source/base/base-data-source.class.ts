import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataSourceProvider } from '../models/data-source';
import { BaseDataProvider } from './base-data-provider.class';

export abstract class BaseDataSource<T> implements DataSourceProvider<T> {
    /** @hidden */
    static readonly MaxLimit = 5;

    /** @hidden */
    limitless = false;

    /** @hidden */
    protected readonly dataChanges: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    /** @hidden */
    protected readonly _onDataRequested$ = new Subject<void>();
    /** @hidden */
    protected readonly _onDataReceived$ = new Subject<void>();
    /** @hidden */
    protected readonly _onDestroy$ = new Subject<void>();
    /** @hidden */
    protected _dataLoading = false;

    /** @hidden */
    get isDataLoading(): boolean {
        return this._dataLoading;
    }

    /** @hidden */
    protected constructor(public dataProvider: BaseDataProvider<any>) {
        this.match('*');
    }

    /** @hidden */
    match(predicate: string | Map<string, string> = new Map<string, string>(), start = 0, end = Infinity): void {
        this._onDataRequested$.next();
        this._dataLoading = true;
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
            .pipe(takeUntil(this._onDestroy$))
            .subscribe({
                next: (result: T[]) => {
                    this._onDataReceived$.next();
                    this._dataLoading = false;
                    this.dataChanges.next(result);
                },
                error: () => {
                    this._onDataReceived$.next();
                    this._dataLoading = false;
                }
            });
    }

    /** @hidden */
    open(): Observable<T[]> {
        return this.dataChanges.asObservable().pipe(takeUntil(this._onDestroy$));
    }

    /** @hidden */
    close(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    onDataRequested(): Observable<void> {
        return this._onDataRequested$.asObservable();
    }

    /** @hidden */
    onDataReceived(): Observable<void> {
        return this._onDataReceived$.asObservable();
    }
}
