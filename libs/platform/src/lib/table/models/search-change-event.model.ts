import { SearchInput } from '../interfaces/search-field.interface';
import { Table } from '../table';

export interface SearchChange {
    current: SearchInput;
    previous: SearchInput;
}

export class TableSearchChangeEvent {
    constructor(public source: Table, public current: SearchInput, public previous: SearchInput) {}
}
