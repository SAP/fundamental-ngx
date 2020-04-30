import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]'
})
export class TableCellDirective {
    /** @hidden */
    @HostBinding('class.fd-table__cell')
    fdTableCellClass: boolean = true;
}
