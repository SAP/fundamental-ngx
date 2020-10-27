import { TableComponent } from '../table.component';
import { CollectionSort } from '../interfaces';

export interface SortChange {
    current: CollectionSort[];
    previous: CollectionSort[];
}

export class TableSortChangeEvent {
    constructor(
        public source: TableComponent,
        public current: CollectionSort[],
        public previous: CollectionSort[]
    ) {}
}
