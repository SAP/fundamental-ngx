import { Table } from '../table';
import { CollectionFilter } from '../interfaces';

export interface FilterChange {
    current: CollectionFilter[];
    previous: CollectionFilter[];
}

export class TableFilterChangeEvent {
    /**
     * Table filter change event
     * @param source Table component
     * @param current Current filters
     * @param previous Previous filters
     */
    constructor(public source: Table, public current: CollectionFilter[], public previous: CollectionFilter[]) {}
}
