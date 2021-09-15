import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { BaseDataProvider, DataProvider, DataSource } from '@fundamental-ngx/platform/shared';

export class ValueHelpDialogDataSource<T> implements DataSource<T> {
    dataChanges: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    constructor(public dataProvider: DataProvider<T>) { }
    match(predicate?: string | Map<string, string>): void {
        let searchParam = new Map<string, any>();
        if (typeof predicate === 'string') {
            searchParam.set('query', predicate);
        } else if (predicate instanceof Map) {
            searchParam = predicate;
        }

        this.dataProvider.fetch(searchParam).pipe(
            take(1),
        ).subscribe((result: T[]) => {
            this.dataChanges.next(result);
        });
    }

    open(): Observable<T[]> {
        return this.dataChanges.asObservable();
    }

    close(): void { }
}

export class ArrayValueHelpDialogDataSource<T> extends ValueHelpDialogDataSource<T> {
    constructor(data: T[]) {
        super(new BaseDataProvider(data));
    }
}

export class ObservableValueHelpDialogDataSource<T> extends ValueHelpDialogDataSource<T> {
    constructor(data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}

export class VhdDataProvider<R> extends DataProvider<R> {
    constructor(public values: R[]) {
        super()
    }
    fetch(params: Map<string, string>): Observable<R[]> {
        let data = this.values;
        const arrayParams = Array.from(params);
        const filterFn = (row: R) => {
            const rowEntries = Object.entries(row) as string[][];
            return arrayParams.every(([key, value]) => {
                if (key === '*') {
                    return rowEntries.some(([_rowEntryKey, rowEntryValue]) => {
                        return String(rowEntryValue).toLowerCase().includes(value.toLowerCase())
                    });
                } else {
                    return String(row[key]).toLowerCase().includes(value.toLowerCase())
                }
            });
        };
        if (params.size) {
            data = this.values.filter(filterFn);
        }

        return of(data);
    }
}
