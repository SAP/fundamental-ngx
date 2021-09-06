import { Table } from '../table';
import { CollectionSort } from '../interfaces';

export interface SortChange {
    current: CollectionSort[];
    previous: CollectionSort[];
}

export class TableSortChangeEvent {
    constructor(public source: Table, public current: CollectionSort[], public previous: CollectionSort[]) {}
}
