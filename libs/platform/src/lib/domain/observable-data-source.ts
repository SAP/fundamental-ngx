/**
 * Default implementation for Observable Arrays.
 */
import { Observable } from 'rxjs';

import { ComboBoxDataSource, ListDataSource, TableDataSource } from './data-source';
import { BaseDataProvider } from './base-data-provider';

export class ObservableComboBoxDataSource<T> extends ComboBoxDataSource<T> {
    constructor(private data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}

export class ObservableTableDataSource<T> extends TableDataSource<T> {
    constructor(private data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}

export class ObservableListDataSource<T> extends ListDataSource<T> {
    constructor(private data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}
