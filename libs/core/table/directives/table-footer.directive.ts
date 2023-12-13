import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdTableFooter], [fd-table-footer]',
    standalone: true
})
export class TableFooterDirective {
    /** @ignore */
    @HostBinding('class.fd-table__footer')
    fdTableFooterClass = true;
}
