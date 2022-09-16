import { TableCellInterface } from './table-cell.interface';
import { TableRowDirective } from './directives/table-row.directive';

/** @hidden */
export abstract class FdTable {
    abstract _onCellKeydown(event: KeyboardEvent, cell: TableCellInterface): void;
    abstract _onRowKeydown(event: KeyboardEvent, row: TableRowDirective): void;
    abstract allCellsFocusable: boolean;
    abstract _setCurrentFocusableCell(cell: TableCellInterface): void;
    abstract _setCurrentFocusableRow(row: TableRowDirective): void;
}
