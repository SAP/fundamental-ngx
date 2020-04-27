import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTableBody], [fd-table-body]'
})
export class TableBodyDirective {
    /** @hidden */
    @HostBinding('class.fd-table__body')
    fdTableBodyClass: boolean = true;
}
