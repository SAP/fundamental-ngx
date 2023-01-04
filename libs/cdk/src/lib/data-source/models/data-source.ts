import { Observable } from 'rxjs';

export interface DataSourceProvider<T = any> {
    open(): Observable<T[]>;
    close(): void;
    isDataLoading: boolean;
    onDataRequested(): Observable<void>;
    onDataReceived(): Observable<void>;
    onDataLoading(): Observable<boolean>;
}

export type DataSource<T = any> = DataSourceProvider<T> | Observable<T[]> | T[];

export interface DataSourceParser<T = any, P extends DataSourceProvider = DataSourceProvider<T>> {
    parse(source: DataSource<T>): P | undefined;
}
