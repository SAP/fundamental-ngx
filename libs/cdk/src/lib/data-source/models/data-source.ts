import { Observable } from 'rxjs';

export interface DataSourceProvider<T = any> {
    open(): Observable<T[]>;
    close(): void;
    isDataLoading: boolean;
    onDataRequested(): Observable<void>;
    onDataReceived(): Observable<void>;
}

export type DataSource<T = any> = DataSourceProvider<T> | Observable<T[]> | T[];

export type DataSourceParser<T = any, P extends DataSourceProvider = DataSourceProvider<T>> = (
    source: DataSource<T>
) => P | undefined;
