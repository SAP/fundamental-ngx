import { Table } from '../table';
import { CollectionGroup } from '../interfaces';

export interface GroupChange {
    current: CollectionGroup[];
    previous: CollectionGroup[];
}

export class TableGroupChangeEvent {
    constructor(public source: Table, public current: CollectionGroup[], public previous: CollectionGroup[]) {}
}
