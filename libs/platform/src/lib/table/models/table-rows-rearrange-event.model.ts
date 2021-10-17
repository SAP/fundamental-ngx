export class TableRowsRearrangeEvent<T> {
    constructor(public row: T, public previousIndex: number, public newIndex: number, public rows: T[]) {}
}
