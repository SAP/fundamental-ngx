import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[fdTableRow], [fd-table-row]'
})
export class TableRowDirective {
    /** @hidden */
    @HostBinding('class.fd-table__row')
    fdTableRowClass: boolean = true;
}
