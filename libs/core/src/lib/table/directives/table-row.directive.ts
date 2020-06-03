import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdTableRow], [fd-table-row]'
})
export class TableRowDirective {
    /** @hidden */
    @HostBinding('class.fd-table__row')
    fdTableRowClass: boolean = true;

    /** Whether or not the table row is activable */
    @HostBinding('class.fd-table__row--activable')
    @Input()
    activable: boolean = false;

    /** Whether or not the table row is hoverable */
    @HostBinding('class.fd-table__row--hoverable')
    @Input()
    hoverable: boolean = false;
}
