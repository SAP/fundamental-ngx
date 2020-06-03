import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableCellCheckbox], [fd-table-cell-checkbox]'
})
export class TableCellCheckboxDirective {
    /** @hidden */
    @HostBinding('class.fd-table__cell--checkbox')
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
}
