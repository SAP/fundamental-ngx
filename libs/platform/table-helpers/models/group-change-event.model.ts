import { CollectionGroup } from '../interfaces';
import { Table } from '../table';

export interface GroupChange {
    current: CollectionGroup[];
    previous: CollectionGroup[];
}

export class TableGroupChangeEvent {
    /**
     * Table group change event
     * @param source Table component
     * @param current Current groups
     * @param previous Previous groups
     */
    constructor(
        public source: Table,
        public current: CollectionGroup[],
        public previous: CollectionGroup[]
    ) {}
}
