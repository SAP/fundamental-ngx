/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Label directive, used to indicate status, without any background or border
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
var LabelDirective = /** @class */ (function (_super) {
    tslib_1.__extends(LabelDirective, _super);
    /** @hidden */
    function LabelDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
         */
        _this.status = '';
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    LabelDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-label');
        if (this.status) {
            this._addClassToElement('fd-label--' + this.status);
        }
    };
    LabelDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-label]'
                },] }
    ];
    /** @nocollapse */
    LabelDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    LabelDirective.propDecorators = {
        status: [{ type: Input }]
    };
    return LabelDirective;
}(AbstractFdNgxClass));
export { LabelDirective };
if (false) {
    /**
     * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
     * @type {?}
     */
    LabelDirective.prototype.status;
    /**
     * @type {?}
     * @private
     */
    LabelDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2JhZGdlLWxhYmVsL2xhYmVsLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7QUFNcEU7SUFJb0MsMENBQWtCO0lBWWxELGNBQWM7SUFDZCx3QkFBb0IsVUFBc0I7UUFBMUMsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FDcEI7UUFGbUIsZ0JBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFYakMsWUFBTSxHQUFXLEVBQUUsQ0FBQzs7SUFhN0IsQ0FBQztJQVhELGNBQWM7Ozs7O0lBQ2QsdUNBQWM7Ozs7SUFBZDtRQUNJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7O2dCQWRKLFNBQVMsU0FBQzs7b0JBRVAsUUFBUSxFQUFFLFlBQVk7aUJBQ3pCOzs7O2dCQVZtQixVQUFVOzs7eUJBYXpCLEtBQUs7O0lBY1YscUJBQUM7Q0FBQSxBQXBCRCxDQUlvQyxrQkFBa0IsR0FnQnJEO1NBaEJZLGNBQWM7Ozs7OztJQUV2QixnQ0FBNkI7Ozs7O0lBV2pCLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogTGFiZWwgZGlyZWN0aXZlLCB1c2VkIHRvIGluZGljYXRlIHN0YXR1cywgd2l0aG91dCBhbnkgYmFja2dyb3VuZCBvciBib3JkZXJcbiAqIENvbG9ycywgZ2VuZXJhbGx5IGluIGNvbWJpbmF0aW9uIHdpdGggdGV4dCwgYXJlIHVzZWQgdG8gZWFzaWx5IGhpZ2hsaWdodCB0aGUgc3RhdGUgb2YgYW4gb2JqZWN0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtbGFiZWxdJ1xufSlcbmV4cG9ydCBjbGFzcyBMYWJlbERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyB7XG4gICAgLyoqIENvbG9yIGNvZGVkIHN0YXR1cyBmb3IgdGhlIGxhYmVsLiBPcHRpb25zIGFyZSAnc3VjY2VzcycsICd3YXJuaW5nJywgYW5kICdlcnJvcicuIExlYXZlIGVtcHR5IGZvciBkZWZhdWx0IGxhYmVsLiAqL1xuICAgIEBJbnB1dCgpIHN0YXR1czogc3RyaW5nID0gJyc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIF9zZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtbGFiZWwnKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtbGFiZWwtLScgKyB0aGlzLnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG59XG4iXX0=