import { SearchInput } from '@fundamental-ngx/platform/search-field';
import { Table } from '../table';

export interface SearchChange {
    current: SearchInput;
    previous: SearchInput;
}

export class TableSearchChangeEvent {
    /**
     * Table search change event
     * @param source Table component
     * @param current Current search (fields, directions)
     * @param previous Previous search (fields, directions)
     */
    constructor(public source: Table, public current: SearchInput, public previous: SearchInput) {}
}
