/**
 * Default implementation for Observable Arrays.
 */
import { Observable } from 'rxjs';

import { ComboBoxDataSource } from './data-source';
import { BaseDataProvider } from './base-data-provider';

export class ObservableComboBoxDataSource<T> extends ComboBoxDataSource<T> {
    constructor(private data: Observable<T[]>) {
        super(new BaseDataProvider(data));
    }
}
