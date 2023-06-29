import { ListDataSource } from '@fundamental-ngx/platform/shared';
import { Observable } from 'rxjs';

export type SelectionType = 'none' | 'multi' | 'single' | 'delete';
export type ListType = 'inactive' | 'active' | 'detail';
export type FdpListDataSource<T> = ListDataSource<T> | Observable<T[]> | T[] | null;

export interface FdpList<T = any> {
    _setupListItem(item: T): void;
}
