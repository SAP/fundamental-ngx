import { CollectionSort } from '../interfaces';
import { Table } from '../table';

export interface SortChange {
    current: CollectionSort[];
    previous: CollectionSort[];
}

export class TableSortChangeEvent {
    /**
     * Table sort change event
     * @param source Table component
     * @param current Current sort (fields, directions)
     * @param previous Previous sort (fields, directions)
     */
    constructor(
        public source: Table,
        public current: CollectionSort[],
        public previous: CollectionSort[]
    ) {}
}
