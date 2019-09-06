/**
 * Directive used to achieve column sorting.
 * The directive is placed on the the desired column(s) to sort,
 */
export declare class ColumnSortableDirective {
    /**
     * The sorting direction.
     * Options include *asc*, *dsc*, *desc*, and *none*
     */
    sortDir: SortDirections;
}
export declare type SortDirections = 'asc' | 'dsc' | 'desc' | 'none';
