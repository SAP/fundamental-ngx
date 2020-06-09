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

    /** Whether or not the table cell is activable */
    @HostBinding('class.fd-table__cell--activable')
    @Input()
    activable: boolean = false;

    /** Whether or not the table cell is hoverable */
    @HostBinding('class.fd-table__cell--hoverable')
    @Input()
    hoverable: boolean = false;

    /** Whether or not the table cell's width should fit to content  */
    @HostBinding('class.fd-table__cell--fit-content')
    @Input()
    fitContent: boolean = false;

    /** Whether or not the table cell shouldn't have padding on sides */
    @HostBinding('class.fd-table__cell--no-padding')
    @Input()
    noPadding: boolean = false;

    /** Whether or not the table cell has displayed only checkbox */
    @HostBinding('class.fd-table__cell--checkbox')
    @Input()
    checkbox: boolean = false;
}
