import { TableCellDirective } from './directives/table-cell.directive';

/** @hidden */
export abstract class FdTable {
    abstract _onCellKeydown(event: KeyboardEvent, cell: TableCellDirective): void;
    abstract allCellsFocusable: boolean;
}
