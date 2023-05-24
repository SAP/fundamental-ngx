import { DataSourceParser, isDataSource } from '@fundamental-ngx/cdk/data-source';
import { isObservable } from 'rxjs';
import {
    ArrayTreeDataSource,
    FdTreeAcceptableDataSource,
    FdTreeDataSource,
    ObservableTreeDataSource
} from './tree-data-source';

export class TreeDataSourceParser<T> implements DataSourceParser<T, FdTreeDataSource<T>> {
    /**
     * Transforms plain array or observable into DataSource class.
     * @param source
     */
    parse(source: FdTreeAcceptableDataSource<T>): FdTreeDataSource<T> | undefined {
        if (isDataSource(source)) {
            return source as FdTreeDataSource<T>;
        }

        if (Array.isArray(source)) {
            return new ArrayTreeDataSource<T>(source);
        }

        if (isObservable(source)) {
            return new ObservableTreeDataSource<T>(source);
        }

        return undefined;
    }
}
