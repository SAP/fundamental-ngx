import { DataSourceProvider } from '../models/data-source';

/**
 * Checks whether passed value is a valid data source.
 */
export function isDataSource<T = any>(value: any): value is DataSourceProvider<T> {
    return value && typeof value.open === 'function';
}
