export class TableCellActivateEvent<T> {
    /**
     * Table cell activate event
     * @param columnIndex Index of the clicked column
     * @param row Row that was activated
     */
    constructor(
        public columnIndex: number,
        public row: T
    ) {}
}
