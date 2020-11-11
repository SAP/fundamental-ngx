import { TableComponent } from '../table.component';
import { CollectionGroup } from '../interfaces';

export interface GroupChange {
    current: CollectionGroup[];
    previous: CollectionGroup[];
}

export class TableGroupChangeEvent {
    constructor(
        public source: TableComponent,
        public current: CollectionGroup[],
        public previous: CollectionGroup[]
    ) {}
}
