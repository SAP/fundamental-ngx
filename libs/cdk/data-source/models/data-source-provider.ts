import { Observable } from 'rxjs';

/**
 * Data source provider class controls the data stream.
 */
export interface DataSourceProvider<T = any> {
    /**
     * Stream emits when new data has been requested.
     */
    dataRequested: Observable<boolean>;
    /**
     * Stream emits when new data has been loaded.
     */
    dataReceived: Observable<boolean>;
    /**
     * Stream emits when loading state has been changed.
     */
    dataLoading: Observable<boolean>;
    /** Stream emits when data changed. */
    dataChanges: Observable<T[]>;
    /** Closes the data stream. */
    unsubscribe(): void;
}
