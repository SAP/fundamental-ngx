import { Table } from '../table';

export class ColumnsChange {
    /**
     * Columns change event
     * @param current Current columns
     * @param previous Previous columns
     */
    constructor(public current: string[], public previous: string[]) {}
}

export class TableColumnsChangeEvent extends ColumnsChange {
    /**
     * Table columns change event
     * @param source Table component
     * @param current Current columns
     * @param previous Previous columns
     */
    constructor(public source: Table, current: string[], previous: string[]) {
        super(current, previous);
    }
}
