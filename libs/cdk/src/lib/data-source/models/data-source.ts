import { Observable } from 'rxjs';

/**
 * Data source provider class controls the data stream.
 */
export interface DataSourceProvider<T = any> {
    /**
     * Opens the data stream.
     */
    open(): Observable<T[]>;

    /**
     * Closes the data stream.
     */
    close(): void;

    /**
     * Whether the data is currently being loaded.
     */
    isDataLoading: boolean;

    /**
     * Stream emits when new data has been requested.
     */
    onDataRequested(): Observable<void>;
    /**
     * Stream emits when new data has been loaded.
     */
    onDataReceived(): Observable<void>;
    /**
     * Stream emits when loading state has been changed.
     */
    onDataLoading(): Observable<boolean>;
}

/**
 * Acceptable data source types.
 */
export type DataSource<T = any> = DataSourceProvider<T> | Observable<T[]> | T[];

/**
 * Data source parser is a special class that parses incoming data into appropriate data source provider.
 */
export interface DataSourceParser<T = any, P extends DataSourceProvider = DataSourceProvider<T>> {
    /**
     * Defines which data provider class to initiate.
     * @param source data source to be parsed.
     */
    parse(source: DataSource<T>): P | undefined;
}
