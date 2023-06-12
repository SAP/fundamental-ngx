import { Table } from '../table';

export class TableSelectionChangeEvent<T> {
    /** currently selected items */
    selection: T[];
    /** Items added */
    added: T[]; //
    /** Items removed */
    removed: T[];
    /** Indexes location of additions or removals */
    index: number[];
    /** Whether `Check/Uncheck` all checkbox was pressed. */
    all: boolean;
}

export class TableRowSelectionChangeEvent<T> extends TableSelectionChangeEvent<T> {
    /** Table component */
    source: Table;
}
