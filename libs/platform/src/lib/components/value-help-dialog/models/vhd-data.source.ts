import { BehaviorSubject, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { DataProvider, DataSource } from '../../../domain';
import { BaseDataProvider } from '../../../domain/base-data-provider';

export class ValueHelpDialogDataSource<T> implements DataSource<T> {
    dataChanges: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    constructor(public dataProvider: DataProvider<any>) { }
    // filter
    match(predicate?: string | Map<string, string>): void {
        const searchParam = new Map();
        if (typeof predicate === 'string') {
            searchParam.set('query', predicate);
        } else if (predicate instanceof Map) {
            predicate.forEach((v, k) => searchParam.set(k, v));
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
