import { FdDndDropEventMode } from '@fundamental-ngx/cdk/utils';

export class TableRowsRearrangeEvent<T> {
    /**
     * Table rows rearrange event
     * @param row Row that was rearranged
     * @param dropRow Row where the dragged item has been dropped
     * @param previousIndex Previous index of the row
     * @param newIndex New index of the row
     * @param insertAt Whether dragged the row was inserted before or after the dropped row
     * @param mode Whether the dropped element shifts other items or is grouped with them
     * @param rows All rows of the table in the state they exist on the datasource
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
