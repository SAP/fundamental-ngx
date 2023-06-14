export class TableRowToggleOpenStateEvent<T> {
    /**
     * Table row toggle open state event
     * @param index Index of the row
     * @param row Row that was toggled
     * @param expanded Expanded state of the row
     */
    constructor(public index: number, public row: T, public expanded: boolean) {}
}
