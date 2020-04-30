import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTableHeader], [fd-table-header]'
})
export class TableHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-table__header')
    fdTableHeaderClass: boolean = true;
}
