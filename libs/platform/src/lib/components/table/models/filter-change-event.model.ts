import { TableComponent } from '../table.component';
import { CollectionFilter } from '../interfaces';

export class TableFilterChangeEvent {
    constructor(
        public source: TableComponent,
        public current: CollectionFilter[],
        public previous: CollectionFilter[]
    ) {}
}
