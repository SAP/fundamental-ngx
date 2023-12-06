import { FdpTableDataSource } from './data-source.type';

export type TreeTableItem<T, P extends string> = {
    [key in P]?: FdpTableDataSource<T>;
};
