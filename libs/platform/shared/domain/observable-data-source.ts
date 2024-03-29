/**
 * Default implementation for Observable Arrays.
 */
import { Observable } from 'rxjs';

import { BaseDataProvider } from './base-data-provider';
import { ComboBoxDataSource, ListDataSource, MultiComboBoxDataSource, MultiInputDataSource } from './data-source';

export class ObservableComboBoxDataSource<T> extends ComboBoxDataSource<T> {
    /** @hidden */
    constructor(private data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}

export class ObservableMultiComboBoxDataSource<T> extends MultiComboBoxDataSource<T> {
    /** @hidden */
    constructor(private data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}

export class ObservableListDataSource<T> extends ListDataSource<T> {
    /** @hidden */
    constructor(private data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}

export class ObservableMultiInputDataSource<T> extends MultiInputDataSource<T> {
    /** @hidden */
    constructor(private data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}
