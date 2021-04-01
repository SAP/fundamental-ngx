export class TableRowsRearrangeEvent<T> {
    constructor(
        public row: any,
        public previousIndex: number,
        public newIndex: number,
        public rows: any[]
    ) {}
}
