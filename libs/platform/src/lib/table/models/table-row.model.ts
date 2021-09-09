import { TableRowType } from '../enums';

/**
 * Table row entity
 * Used to represent table row in the template
 */
export class TableRow<T = any> {
    constructor(
        /**
         * Row semantic type
         */
        public type: TableRowType.ITEM | TableRowType.GROUP | TableRowType.TREE,
        /**
         * Indicates if row is selected
         */
        public checked: boolean,
        /**
         * Index of a "value" in data source list
         */
        public index: number,
        /**
         * Data model it represents
         */
        public readonly value: T,
        /**
         * Reference to a parent if any
         */
        public parent: TableRow | null = null,
        /**
         * Nesting level
         */
        public level = 0,
        /**
         * Expandable
         */
        public expandable = false,
        /**
         * Expanded/Collapsed
         */
        public expanded = true,
        /**
         * If item should be hidden. Used to skip rendering
         */
        public hidden = false,
        /**
         * If the row is navigatable
         */
        public navigatable = false
    ) {}
}
