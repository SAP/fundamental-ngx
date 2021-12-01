import { Directive } from '@angular/core';
/**
 * The directive that represents a table.
 * A table is a set of tabular data. Line items can support data, images and actions.
 * ```html
 *     <div fd-table-responsive-wrapper>
 *         <table fd-table>
 *         </table>
 *     </div>
 * ```
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-table-responsive-wrapper]',
    host: {
        style: 'overflow-x: auto'
    }
})
export class TableResponsiveWrapperDirective {}
