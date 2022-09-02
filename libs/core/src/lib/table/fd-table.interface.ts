import { TableCellDirective } from './directives/table-cell.directive';
import { TableRowDirective } from './directives/table-row.directive';

/** @hidden */
export abstract class FdTable {
    abstract _onCellKeydown(event: KeyboardEvent, cell: TableCellDirective): void;
    abstract _onRowKeydown(event: KeyboardEvent, row: TableRowDirective): void;
    abstract allCellsFocusable: boolean;
    abstract _setCurrentFocusableCell(TableCellDirective): void;
    abstract _setCurrentFocusableRow(row: TableRowDirective): void;
}
