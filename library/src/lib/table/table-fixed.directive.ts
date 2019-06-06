import { Directive, HostBinding } from '@angular/core';
/**
 * The directive that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 *     <div fd-fixed-table>
 *         <table fd-fixed-table>
 *         </table>
 *     </div>
 * ```
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-table-fixed]'
})
export class TableFixedDirective {

    /** @hidden */
    @HostBinding('class.fd-table--fixed')
    fdTableFixedClass: boolean = true;

}
