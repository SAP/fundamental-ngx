export class TableRowActivateEvent<T> {
    /**
     * Table row activate event
     * @param index Index of the activated row
     * @param ctrlKey Whether control/command key was pressed during the mouse/keyboard event
     * @param row Row that was activated
     */
    constructor(
        public index: number,
        public ctrlKey: boolean,
        public row: T
    ) {}
}
