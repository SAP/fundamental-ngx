import { Table } from '../table';
import { TableColumn } from '../table-column';

export interface TableColumnFreezeInternalEvent {
    name: TableColumn['name'];
    endFreezable: TableColumn['endFreezable'];
}

export interface FreezeChange {
    current: string | null;
    previous: string | null;
    end?: boolean;
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
