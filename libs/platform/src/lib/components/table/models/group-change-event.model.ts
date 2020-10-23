import { TableComponent } from '../table.component';
import { CollectionGroup } from '../interfaces';

export class TableGroupChangeEvent {
    constructor(
        public source: TableComponent,
        public current: CollectionGroup[],
        public previous: CollectionGroup[]
    ) {}
}
