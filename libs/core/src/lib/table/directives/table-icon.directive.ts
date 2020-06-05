import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTableIcon], [fd-table-icon]'
})
export class TableIconDirective {
    /** @hidden */
    @HostBinding('class.fd-table__icon')
    fdTableIconClass: boolean = true;
}
