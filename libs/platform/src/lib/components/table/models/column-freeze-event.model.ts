import { TableComponent } from '../table.component';

export class TableColumnFreezeEvent {
    constructor (
        public source: TableComponent,
        public current: string,
        public previous: string
    ) {}
}
