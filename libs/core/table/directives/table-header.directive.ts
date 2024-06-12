import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableHeader], [fd-table-header]',
    standalone: true
})
export class TableHeaderDirective {
    /** @hidden */
    @HostBinding('class.fd-table__header')
    fdTableHeaderClass = true;

    /** Whether or not to show the table header's horizontal borders */
    @HostBinding('class.fd-table__header--no-horizontal-borders')
    @Input()
    noBorderX = false;

    /** Whether or not to show the table header's vertical borders */
    @HostBinding('class.fd-table__header--no-vertical-borders')
    @Input()
    noBorderY = false;

    /**
     * Whether or not the header cells should be interactive
     * (have hover and active states)
     * default: false
     */
    @HostBinding('class.fd-table__header--non-interactive')
    @Input()
    nonInteractive = false;
}
