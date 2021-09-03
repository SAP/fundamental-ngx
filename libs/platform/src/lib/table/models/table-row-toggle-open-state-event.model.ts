export class TableRowToggleOpenStateEvent<T> {
    constructor(
        public index: number,
        public row: T,
        public expanded: boolean
    ) {}
}
