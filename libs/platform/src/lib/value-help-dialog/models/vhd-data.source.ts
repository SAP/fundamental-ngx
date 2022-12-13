import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { BaseDataProvider, DataProvider, DataSource } from '@fundamental-ngx/platform/shared';

export class ValueHelpDialogDataSource<T> implements DataSource<T> {
    /** @hidden */
    protected _dataChanges: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
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

    /** @hidden */
    constructor(public dataProvider: DataProvider<T>) {}

    /** @hidden */
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

export class ArrayValueHelpDialogDataSource<T> extends ValueHelpDialogDataSource<T> {
    /** @hidden */
    constructor(data: T[]) {
        super(new BaseDataProvider(data));
    }
}

export class ObservableValueHelpDialogDataSource<T> extends ValueHelpDialogDataSource<T> {
    /** @hidden */
    constructor(data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}

export class VhdDataProvider<R extends object> extends DataProvider<R> {
    /** @hidden */
    constructor(public values: R[]) {
        super();
    }

    /** @hidden */
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
