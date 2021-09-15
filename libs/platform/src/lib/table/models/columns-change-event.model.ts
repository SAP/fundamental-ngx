import { Table } from '../table';

export class ColumnsChange {
    constructor(public current: string[], public previous: string[]) {}
}

export class TableColumnsChangeEvent extends ColumnsChange {
    constructor(public source: Table, current: string[], previous: string[]) {
        super(current, previous);
    }
}
