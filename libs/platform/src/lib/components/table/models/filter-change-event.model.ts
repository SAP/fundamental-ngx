import { TableComponent } from '../table.component';
import { CollectionFilter } from '../interfaces';

export interface FilterChange {
    current: CollectionFilter[];
    previous: CollectionFilter[];
}

export class TableFilterChangeEvent {
    constructor(
        public source: TableComponent,
        public current: CollectionFilter[],
        public previous: CollectionFilter[]
    ) {}
}
