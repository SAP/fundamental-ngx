export type GridListSelectionMode =
    | 'none'
    | 'delete'
    | 'singleSelect'
    | 'singleSelectLeft'
    | 'singleSelectRight'
    | 'multiSelect';

export enum GridListSelectionActions {
    ADD = 'add',
    REMOVE = 'remove'
}

export interface GridListSelectionEvent<T> {
    /** currently selected items */
    selection: T[];
    /** items added */
    added: T[];
    /** items removed */
    removed: T[];
    /** indexes location of additions or removals */
    index: number[];
}
