import { TableRow } from './table-row.model';

export interface UpdatedDndRowsPosition {
    allRows: TableRow[];
    rowsToMove: TableRow[];
    rowsAfterDropRow: TableRow[];
    dropRowItems: TableRow[];
}
