import { DataSourceParser, isDataSource } from '@fundamental-ngx/cdk/data-source';
import { isObservable } from 'rxjs';
import {
    ArrayMultiComboBoxDataSource,
    FdMultiComboboxAcceptableDataSource,
    FdMultiComboBoxDataSource,
    ObservableMultiComboBoxDataSource
} from './multi-combobox-data-source';

export class MultiComboboxDataSourceParser<T> implements DataSourceParser<T, FdMultiComboBoxDataSource<T>> {
    /**
     * Transforms plain array or observable into DataSource class.
     * @param source
     */
    parse(source: FdMultiComboboxAcceptableDataSource<T>): FdMultiComboBoxDataSource<T> | undefined {
        if (isDataSource(source)) {
            return source as FdMultiComboBoxDataSource<T>;
        }

        if (Array.isArray(source)) {
            return new ArrayMultiComboBoxDataSource<T>(source);
        }

        if (isObservable(source)) {
            return new ObservableMultiComboBoxDataSource<T>(source);
        }

        return undefined;
    }
}
