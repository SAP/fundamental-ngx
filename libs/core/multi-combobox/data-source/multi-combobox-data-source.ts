import { AbstractDataProvider, BaseDataSource, DataProvider } from '@fundamental-ngx/cdk/data-source';
import { Observable } from 'rxjs';

export class FdMultiComboBoxDataSource<T> extends BaseDataSource<T> {
    /** @ignore */
    limitless = false;
    /** @ignore */
    constructor(public dataProvider: AbstractDataProvider<T>) {
        super(dataProvider);
    }
}

export class ArrayMultiComboBoxDataSource<T> extends FdMultiComboBoxDataSource<T> {
    /** @ignore */
    constructor(data: T[]) {
        super(new DataProvider(data));
    }
}

export class ObservableMultiComboBoxDataSource<T> extends FdMultiComboBoxDataSource<T> {
    /** @ignore */
    constructor(data: Observable<T[]>) {
        super(new DataProvider(data));
    }
}

/**
 * Type of acceptable objects as a datasource for the Multi-Combo Box component.
 */
export type FdMultiComboboxAcceptableDataSource<T> = FdMultiComboBoxDataSource<T> | Observable<T[]> | T[];
