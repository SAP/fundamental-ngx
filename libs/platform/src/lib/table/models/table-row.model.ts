import { TableRowType } from '../enums';

export type TableRowState = 'editable' | 'readonly';

/**
 * Table row entity
 * Used to represent table row in the template
 */
export interface TableRow<T = any> {
    /**
     * Row semantic type
     */
    type: TableRowType.ITEM | TableRowType.GROUP | TableRowType.TREE;

    /**
     * Indicates if row is selected
     */
    checked: boolean;

    /**
     * Index of a "value" in data source list
     */
    index: number;

    /**
     * Data model it represents
     */
    readonly value: T;

    /**
     * Reference to a parent if any
     */
    parent: TableRow | null;

    /**
     * Nesting level
     */
    level: number;

    /**
     * Expandable
     */
    expandable: boolean;

    /**
     * Expanded/Collapsed
     */
    expanded: boolean;

    /**
     * If item should be hidden. Used to skip rendering
     */
    hidden: boolean;

    /**
     * If the row is navigatable
     */
    navigatable: boolean;

    /**
     * Row state: readonly or editable.
     */
    state: TableRowState;

    /**
     * Children table rows.
     */
    children: TableRow[];
}

export type TableRowClass<T = any> = string | ((row: T) => string);
