import { Table } from '../table';
import { CollectionFilter } from '../interfaces';

export interface FilterChange {
    current: CollectionFilter[];
    previous: CollectionFilter[];
}

export class TableFilterChangeEvent {
    constructor(public source: Table, public current: CollectionFilter[], public previous: CollectionFilter[]) {}
}
