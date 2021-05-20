/**
 * Table row entity
 * Used to represent table row in the template
 */
export class TableRow<T = any> {
    constructor(
        // Row semantic type
        public type: 'item' | 'group' | 'tree',
        // Indicates if row is selected
        public checked: boolean,
        // Index of a "value" in data source list
        public index: number,
        // data model it represents
        public readonly value: T,
        // Reference to a parent if any
        public parent: TableRow | null = null,
        // Nesting level
        public level = 0,
        // expandable
        public expandable = false,
        // expanded/collapsed
        public expanded = true,
        // if item should be hidden. Used to skip rendering
        public hidden = false
    ) {}
}
