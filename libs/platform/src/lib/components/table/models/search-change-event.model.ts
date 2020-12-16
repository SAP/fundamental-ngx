import { SearchInput } from '../interfaces/search-field.interface';

import { TableComponent } from '../table.component';

export interface SearchChange {
    current: SearchInput;
    previous: SearchInput;
}

export class TableSearchChangeEvent {
    constructor(public source: TableComponent, public current: SearchInput, public previous: SearchInput) {}
}
