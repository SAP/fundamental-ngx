import { Table } from '../table';

export class TableSelectionChangeEvent<T> {
    selection: T[]; // currently selected items
    added: T[]; // items added
    removed: T[]; // items removed
    index: number[]; // indexes location of additions or removals
}

export class TableRowSelectionChangeEvent<T> extends TableSelectionChangeEvent<T> {
    source: Table;
}
