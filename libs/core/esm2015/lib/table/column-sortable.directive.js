/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
/**
 * Directive used to achieve column sorting.
 * The directive is placed on the the desired column(s) to sort,
 */
export class ColumnSortableDirective {
}
ColumnSortableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fdColumnSortable]',
                host: {
                    class: 'fd-table__sort-column',
                    '[class.fd-table__sort-column--dsc]': 'sortDir === "desc" || sortDir === "dsc"',
                    '[class.fd-table__sort-column--asc]': 'sortDir === "asc"'
                }
            },] }
];
ColumnSortableDirective.propDecorators = {
    sortDir: [{ type: Input }]
};
if (false) {
    /**
     * The sorting direction.
     * Options include *asc*, *dsc*, *desc*, and *none*
     * @type {?}
     */
    ColumnSortableDirective.prototype.sortDir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb2x1bW4tc29ydGFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFjakQsTUFBTSxPQUFPLHVCQUF1Qjs7O1lBUm5DLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixJQUFJLEVBQUU7b0JBQ0YsS0FBSyxFQUFFLHVCQUF1QjtvQkFDOUIsb0NBQW9DLEVBQUUseUNBQXlDO29CQUMvRSxvQ0FBb0MsRUFBRSxtQkFBbUI7aUJBQzVEO2FBQ0o7OztzQkFPSSxLQUFLOzs7Ozs7OztJQUFOLDBDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdXNlZCB0byBhY2hpZXZlIGNvbHVtbiBzb3J0aW5nLlxuICogVGhlIGRpcmVjdGl2ZSBpcyBwbGFjZWQgb24gdGhlIHRoZSBkZXNpcmVkIGNvbHVtbihzKSB0byBzb3J0LFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tmZENvbHVtblNvcnRhYmxlXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2ZkLXRhYmxlX19zb3J0LWNvbHVtbicsXG4gICAgICAgICdbY2xhc3MuZmQtdGFibGVfX3NvcnQtY29sdW1uLS1kc2NdJzogJ3NvcnREaXIgPT09IFwiZGVzY1wiIHx8IHNvcnREaXIgPT09IFwiZHNjXCInLFxuICAgICAgICAnW2NsYXNzLmZkLXRhYmxlX19zb3J0LWNvbHVtbi0tYXNjXSc6ICdzb3J0RGlyID09PSBcImFzY1wiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uU29ydGFibGVEaXJlY3RpdmUge1xuXG4gICAgLyoqIFxuICAgICAqIFRoZSBzb3J0aW5nIGRpcmVjdGlvbi4gXG4gICAgICogT3B0aW9ucyBpbmNsdWRlICphc2MqLCAqZHNjKiwgKmRlc2MqLCBhbmQgKm5vbmUqXG4gICAgICovXG4gICAgQElucHV0KCkgc29ydERpcjogU29ydERpcmVjdGlvbnM7XG5cbn1cbmV4cG9ydCB0eXBlIFNvcnREaXJlY3Rpb25zID0gJ2FzYycgfCAnZHNjJyB8ICdkZXNjJyB8ICdub25lJztcbiJdfQ==