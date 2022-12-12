import { Table } from '../table';

export interface FreezeChange {
    current: string | null;
    previous: string | null;
}

export class TableColumnFreezeEvent {
    /**
     * Table column freeze event
     * @param source Table component
     * @param current Current freezeTo column
     * @param previous Previous freezeTo column
     */
    constructor(public source: Table, public current: string | null, public previous: string | null) {}
}
