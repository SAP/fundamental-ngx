import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableCellCheckbox], [fd-table-cell-checkbox]'
})
export class TableCellCheckboxDirective {
    /** @hidden */
    @HostBinding('class.fd-table__cell--checkbox')
    fdTableCellClass: boolean = true;
}
