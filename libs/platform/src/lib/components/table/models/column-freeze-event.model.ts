import { TableComponent } from '../table.component';

export interface FreezeChange {
    current: string;
    previous: string;
}

export class TableColumnFreezeEvent {
    constructor (
        public source: TableComponent,
        public current: string,
        public previous: string
    ) {}
}
