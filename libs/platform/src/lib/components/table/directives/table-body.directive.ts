import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdpTableBody], [fdp-table-body]'
})
export class TableBodyDirective {
    /** @hidden */
    @HostBinding('class.fd-table__body')
    fdTableBodyClass = true;
}
