/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input } from '@angular/core';
/**
 * Directive used to achieve column sorting.
 * The directive is placed on the the desired column(s) to sort,
 */
var ColumnSortableDirective = /** @class */ (function () {
    function ColumnSortableDirective() {
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
    return ColumnSortableDirective;
}());
export { ColumnSortableDirective };
if (false) {
    /**
     * The sorting direction.
     * Options include *asc*, *dsc*, *desc*, and *none*
     * @type {?}
     */
    ColumnSortableDirective.prototype.sortDir;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXNvcnRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS9jb2x1bW4tc29ydGFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFNakQ7SUFBQTtJQWdCQSxDQUFDOztnQkFoQkEsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLElBQUksRUFBRTt3QkFDRixLQUFLLEVBQUUsdUJBQXVCO3dCQUM5QixvQ0FBb0MsRUFBRSx5Q0FBeUM7d0JBQy9FLG9DQUFvQyxFQUFFLG1CQUFtQjtxQkFDNUQ7aUJBQ0o7OzswQkFPSSxLQUFLOztJQUVWLDhCQUFDO0NBQUEsQUFoQkQsSUFnQkM7U0FSWSx1QkFBdUI7Ozs7Ozs7SUFNaEMsMENBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIERpcmVjdGl2ZSB1c2VkIHRvIGFjaGlldmUgY29sdW1uIHNvcnRpbmcuXG4gKiBUaGUgZGlyZWN0aXZlIGlzIHBsYWNlZCBvbiB0aGUgdGhlIGRlc2lyZWQgY29sdW1uKHMpIHRvIHNvcnQsXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2ZkQ29sdW1uU29ydGFibGVdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtdGFibGVfX3NvcnQtY29sdW1uJyxcbiAgICAgICAgJ1tjbGFzcy5mZC10YWJsZV9fc29ydC1jb2x1bW4tLWRzY10nOiAnc29ydERpciA9PT0gXCJkZXNjXCIgfHwgc29ydERpciA9PT0gXCJkc2NcIicsXG4gICAgICAgICdbY2xhc3MuZmQtdGFibGVfX3NvcnQtY29sdW1uLS1hc2NdJzogJ3NvcnREaXIgPT09IFwiYXNjXCInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDb2x1bW5Tb3J0YWJsZURpcmVjdGl2ZSB7XG5cbiAgICAvKiogXG4gICAgICogVGhlIHNvcnRpbmcgZGlyZWN0aW9uLiBcbiAgICAgKiBPcHRpb25zIGluY2x1ZGUgKmFzYyosICpkc2MqLCAqZGVzYyosIGFuZCAqbm9uZSpcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzb3J0RGlyOiBTb3J0RGlyZWN0aW9ucztcblxufVxuZXhwb3J0IHR5cGUgU29ydERpcmVjdGlvbnMgPSAnYXNjJyB8ICdkc2MnIHwgJ2Rlc2MnIHwgJ25vbmUnO1xuIl19