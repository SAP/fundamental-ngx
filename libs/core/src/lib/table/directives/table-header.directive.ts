import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableHeader], [fd-table-header]'
})
export class TableHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-table__header')
    fdTableHeaderClass: boolean = true;

    /** Whether or not to show the table header's horizontal borders */
    @HostBinding('class.fd-table__header--no-horizontal-borders')
    @Input()
    noBorderX: boolean = false;

    /** Whether or not to show the table header's vertical borders */
    @HostBinding('class.fd-table__header--no-vertical-borders')
    @Input()
    noBorderY: boolean = false;
}
