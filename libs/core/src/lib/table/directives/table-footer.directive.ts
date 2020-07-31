import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTableFooter], [fd-table-footer]'
})
export class TableFooterDirective {
    /** @hidden */
    @HostBinding('class.fd-table__footer')
    fdTableFooterClass = true;
}
