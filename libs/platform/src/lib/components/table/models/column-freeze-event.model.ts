import { Table } from '../table';

export interface FreezeChange {
    current: string;
    previous: string;
}

export class TableColumnFreezeEvent {
    constructor(public source: Table, public current: string, public previous: string) {}
}
