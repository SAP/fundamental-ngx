import { Table } from '../table';

export class SelectionChangeEvent<T> {
    selection: T[]; // currently selected items
    added: T[]; // items added
    removed: T[]; // items removed
    index: number[]; // indexes location of additions or removals
}

export class TableRowSelectionChangeEvent<T> extends SelectionChangeEvent<T> {
    source: Table;
}
