import { DataSource, DataSourceParser, isDataSource } from '@fundamental-ngx/cdk/data-source';
import { isObservable } from 'rxjs';
import { ArrayTableDataSource } from './array-data-source';
import { ObservableTableDataSource } from './observable-data-source';
import { TableDataSource } from './table-data-source';

export class TableDataSourceParser<T> implements DataSourceParser<T, TableDataSource<T>> {
    /** @hidden */
    parse(source: DataSource<T>): TableDataSource<T> | undefined {
        if (isDataSource(source)) {
            return source as TableDataSource<T>;
        }

        if (Array.isArray(source)) {
            return new ArrayTableDataSource(source);
        }

        if (isObservable(source)) {
            return new ObservableTableDataSource(source);
        }

        return undefined;
    }
}
