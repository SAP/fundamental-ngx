import { Observable } from 'rxjs';
import { DataSourceProvider } from './data-source-provider';

/**
 * Acceptable data source types.
 */
export type DataSource<T = any, P extends DataSourceProvider<T> = DataSourceProvider<T>> = P | Observable<T[]> | T[];

/**
 * Data source parser is a special class that parses incoming data into appropriate data source provider.
 */
export interface DataSourceParser<T = any, P extends DataSourceProvider<T> = DataSourceProvider<T>> {
    /**
     * Defines which data provider class to initiate.
     * @param source data source to be parsed.
     */
    parse(source: DataSource<T>): P | undefined;
}
