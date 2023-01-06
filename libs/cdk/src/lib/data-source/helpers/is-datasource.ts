import { DataSourceProvider } from '../models/data-source-provider';

/**
 * Checks whether passed value is a valid data source.
 */
export function isDataSource<T = any>(value: any): value is DataSourceProvider<T> {
    return value && typeof value.unsubscribe === 'function' && value.dataChanges;
}
