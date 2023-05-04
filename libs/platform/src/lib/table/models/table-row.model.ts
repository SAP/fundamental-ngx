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
     * Indicates if row is selected. It also supports intermediate state
     */
    checked: boolean | null;

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

/** @hidden */
export function isTableRow<T = any>(row: TableRow<T>): row is TableRow<T> {
    return row && row.type !== undefined && row.value !== undefined && row.index >= 0 && row.state !== undefined;
}
