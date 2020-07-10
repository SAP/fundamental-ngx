import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableBody], [fd-table-body]'
})
export class TableBodyDirective {
    /** @hidden */
    @HostBinding('class.fd-table__body')
    fdTableBodyClass: boolean = true;

    /** Whether or not to show the table body's horizontal borders */
    @HostBinding('class.fd-table__body--no-horizontal-borders')
    @Input()
    noBorderX: boolean = false;

    /** Whether or not to show the table body's vertical borders */
    @HostBinding('class.fd-table__body--no-vertical-borders')
    @Input()
    noBorderY: boolean = false;
}
