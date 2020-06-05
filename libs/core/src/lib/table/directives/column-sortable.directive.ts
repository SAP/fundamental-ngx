import { Directive, Input } from '@angular/core';

/**
 * Directive used to achieve column sorting.
 * The directive is placed on the the desired column(s) to sort,
 */
@Directive({
    selector: '[fdColumnSortable]'
})
export class ColumnSortableDirective {
    /**
     * The sorting direction.
     * Options include *asc*, *dsc*, *desc*, and *none*
     */
    @Input() sortDir: SortDirections;
}
export type SortDirections = 'asc' | 'dsc' | 'desc' | 'none';
