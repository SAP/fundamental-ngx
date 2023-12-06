import { Observable } from 'rxjs';
import { TableDataSource } from '../domain/table-data-source';

export type FdpTableDataSource<T> = T[] | Observable<T[]> | TableDataSource<T>;
