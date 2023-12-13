import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { BaseDataProvider, DataProvider, DataSource } from '@fundamental-ngx/platform/shared';

export class ValueHelpDialogDataSource<T> implements DataSource<T> {
    /** @ignore */
    protected _dataChanges: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    /** @ignore */
    protected _onDataRequested$ = new Subject<void>();
    /** @ignore */
    protected _onDataReceived$ = new Subject<void>();

    /** @ignore */
    protected _dataLoading = false;

    /** @ignore */
    get isDataLoading(): boolean {
        return this._dataLoading;
    }

    /** @ignore */
    constructor(public dataProvider: DataProvider<T>) {}

    /** @ignore */
    match(predicate?: string | Map<string, string>): void {
        this._onDataRequested$.next();
        this._dataLoading = true;

        let searchParam = new Map<string, any>();
        if (typeof predicate === 'string') {
            searchParam.set('query', predicate);
        } else if (predicate instanceof Map) {
            searchParam = predicate;
        }

        this.dataProvider
            .fetch(searchParam)
            .pipe(take(1))
            .subscribe(
                (result: T[]) => {
                    this._onDataReceived$.next();
                    this._dataLoading = false;
                    this._dataChanges.next(result);
                },
                () => {
                    this._onDataReceived$.next();
                    this._dataLoading = false;
                }
            );
    }

    /** @ignore */
    open(): Observable<T[]> {
        return this._dataChanges.asObservable();
    }

    /** @ignore */
    onDataRequested(): Observable<void> {
        return this._onDataRequested$.asObservable();
    }

    /** @ignore */
    onDataReceived(): Observable<void> {
        return this._onDataReceived$.asObservable();
    }

    /** @ignore */
    close(): void {}
}

export class ArrayValueHelpDialogDataSource<T> extends ValueHelpDialogDataSource<T> {
    /** @ignore */
    constructor(data: T[]) {
        super(new BaseDataProvider(data));
    }
}

export class ObservableValueHelpDialogDataSource<T> extends ValueHelpDialogDataSource<T> {
    /** @ignore */
    constructor(data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}

export class VhdDataProvider<R extends object> extends DataProvider<R> {
    /** @ignore */
    constructor(public values: R[]) {
        super();
    }

    /** @ignore */
    fetch(params: Map<string, string>): Observable<R[]> {
        let data = this.values;
        const arrayParams = Array.from(params);
        const filterFn = (row: R): boolean => {
            const rowEntries = Object.entries(row) as string[][];
            return arrayParams.every(([key, value]) => {
                if (key === '*') {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    return rowEntries.some(([_rowEntryKey, rowEntryValue]) =>
                        String(rowEntryValue).toLowerCase().includes(value.toLowerCase())
                    );
                } else {
                    return String(row[key]).toLowerCase().includes(value.toLowerCase());
                }
            });
        };
        if (params.size) {
            data = this.values.filter(filterFn);
        }

        return of(data);
    }
}
