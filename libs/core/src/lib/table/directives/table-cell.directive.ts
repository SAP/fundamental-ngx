import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableCell], [fd-table-cell]'
})
export class TableCellDirective {
    /** @hidden */
    @HostBinding('class.fd-table__cell')
    fdTableCellClass: boolean = true;

    /** Whether or not to show the table cell's horizontal borders */
    @HostBinding('class.fd-table__cell--no-horizontal-border')
    @Input()
    noBorderX: boolean = false;

    /** Whether or not to show the table cell's vertical borders */
    @HostBinding('class.fd-table__cell--no-vertical-border')
    @Input()
    noBorderY: boolean = false;
}
