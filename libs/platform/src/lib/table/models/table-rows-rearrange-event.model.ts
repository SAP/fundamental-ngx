import { FdDndDropEventMode } from '@fundamental-ngx/cdk/utils';

export class TableRowsRearrangeEvent<T> {
    /**
     * Table rows rearrange event
     * @param row Row that was rearranged
     * @param previousIndex Previous index of the row
     * @param newIndex New index of the row
     * @param rows All rows of the table
     */
    constructor(
        public row: T,
        public dropRow: T,
        public previousIndex: number,
        public newIndex: number,
        public insertAt: 'before' | 'after' | null,
        public mode: FdDndDropEventMode,
        public rows: T[]
    ) {}
}
