import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableBody], [fd-table-body]'
})
export class TableBodyDirective {
    /** @hidden */
    @HostBinding('class.fd-table__body')
    fdTableBodyClass = true;

    /**  Whether to show the table body's horizontal borders */
    @HostBinding('class.fd-table__body--no-horizontal-borders')
    @Input()
    noBorderX = false;

    /**  Whether to show the table body's vertical borders */
    @HostBinding('class.fd-table__body--no-vertical-borders')
    @Input()
    noBorderY = false;
}
