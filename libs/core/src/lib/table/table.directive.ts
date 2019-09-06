import { Directive, HostBinding } from '@angular/core';
/**
 * The directive that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 * <table fd-table></table>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-table]'
})
export class TableDirective {

    /** @hidden */
    @HostBinding('class.fd-table')
    fdTableClass: boolean = true;

}
