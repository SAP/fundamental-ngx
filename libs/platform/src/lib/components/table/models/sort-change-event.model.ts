import { TableComponent } from '../table.component';
import { CollectionSort } from '../interfaces';

export class TableSortChangeEvent {
    constructor(
        public source: TableComponent,
        public current: CollectionSort[],
        public previous: CollectionSort[]
    ) {}
}
