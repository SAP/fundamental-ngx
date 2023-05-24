import { AbstractDataProvider, BaseDataSource, DataProvider } from '@fundamental-ngx/cdk/data-source';
import { Observable } from 'rxjs';

export class FdTreeDataSource<T> extends BaseDataSource<T> {
    /** @hidden */
    limitless = true;
    /** @hidden */
    constructor(public dataProvider: AbstractDataProvider<T>) {
        super(dataProvider);
    }
}

export class ArrayTreeDataSource<T> extends FdTreeDataSource<T> {
    /** @hidden */
    constructor(data: T[]) {
        super(new DataProvider(data));
    }
}

export class ObservableTreeDataSource<T> extends FdTreeDataSource<T> {
    /** @hidden */
    constructor(data: Observable<T[]>) {
        super(new DataProvider(data));
    }
}

/**
 * Type of acceptable objects as a datasource for the Multi-Combo Box component.
 */
export type FdTreeAcceptableDataSource<T = any> = FdTreeDataSource<T> | Observable<T[]> | T[];
export type FdTreeItemType<Type extends FdTreeAcceptableDataSource> = Type extends BaseDataSource<infer X>
    ? X
    : Type extends Array<infer X>
    ? X
    : Type extends Observable<infer X>
    ? X extends Array<infer V>
        ? V
        : X
    : Type;
