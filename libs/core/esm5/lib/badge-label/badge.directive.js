/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Input, Directive, ElementRef, HostBinding } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Badge directive, used to indicate status.
 * Colors, generally in combination with text, are used to easily highlight the state of an object.
 */
var BadgeDirective = /** @class */ (function (_super) {
    tslib_1.__extends(BadgeDirective, _super);
    /** @hidden */
    function BadgeDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * @hidden
         */
        _this.fdBadgeClass = true;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    BadgeDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.status) {
            this._addClassToElement('fd-badge--' + this.status);
        }
        if (this.modifier) {
            this._addClassToElement('fd-badge--' + this.modifier);
        }
    };
    BadgeDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-badge]'
                },] }
    ];
    /** @nocollapse */
    BadgeDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    BadgeDirective.propDecorators = {
        status: [{ type: Input }],
        modifier: [{ type: Input }],
        fdBadgeClass: [{ type: HostBinding, args: ['class.fd-badge',] }]
    };
    return BadgeDirective;
}(AbstractFdNgxClass));
export { BadgeDirective };
if (false) {
    /**
     * Color coded status for the badge. Options are 'success', 'warning', and 'error'. Leave empty for default badge.
     * @type {?}
     */
    BadgeDirective.prototype.status;
    /**
     * Modifier for the badge. Options are 'pill' and 'filled'. Leave empty for normal.
     * @type {?}
     */
    BadgeDirective.prototype.modifier;
    /**
     * @hidden
     * @type {?}
     */
    BadgeDirective.prototype.fdBadgeClass;
    /**
     * @type {?}
     * @private
     */
    BadgeDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2JhZGdlLWxhYmVsL2JhZGdlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7O0FBTXBFO0lBSW9DLDBDQUFrQjtJQXFCbEQsY0FBYztJQUNkLHdCQUFvQixVQUFzQjtRQUExQyxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtRQUZtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7OztRQWIxQyxrQkFBWSxHQUFZLElBQUksQ0FBQzs7SUFlN0IsQ0FBQztJQWJELGNBQWM7Ozs7O0lBQ2QsdUNBQWM7Ozs7SUFBZDtRQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekQ7SUFDTCxDQUFDOztnQkF2QkosU0FBUyxTQUFDOztvQkFFUCxRQUFRLEVBQUUsWUFBWTtpQkFDekI7Ozs7Z0JBVjBCLFVBQVU7Ozt5QkFhaEMsS0FBSzsyQkFHTCxLQUFLOytCQUdMLFdBQVcsU0FBQyxnQkFBZ0I7O0lBaUJqQyxxQkFBQztDQUFBLEFBN0JELENBSW9DLGtCQUFrQixHQXlCckQ7U0F6QlksY0FBYzs7Ozs7O0lBRXZCLGdDQUFnQjs7Ozs7SUFHaEIsa0NBQWtCOzs7OztJQUdsQixzQ0FDNkI7Ozs7O0lBYWpCLG9DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIEJhZGdlIGRpcmVjdGl2ZSwgdXNlZCB0byBpbmRpY2F0ZSBzdGF0dXMuXG4gKiBDb2xvcnMsIGdlbmVyYWxseSBpbiBjb21iaW5hdGlvbiB3aXRoIHRleHQsIGFyZSB1c2VkIHRvIGVhc2lseSBoaWdobGlnaHQgdGhlIHN0YXRlIG9mIGFuIG9iamVjdC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLWJhZGdlXSdcbn0pXG5leHBvcnQgY2xhc3MgQmFkZ2VEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuICAgIC8qKiBDb2xvciBjb2RlZCBzdGF0dXMgZm9yIHRoZSBiYWRnZS4gT3B0aW9ucyBhcmUgJ3N1Y2Nlc3MnLCAnd2FybmluZycsIGFuZCAnZXJyb3InLiBMZWF2ZSBlbXB0eSBmb3IgZGVmYXVsdCBiYWRnZS4gKi9cbiAgICBASW5wdXQoKSBzdGF0dXM7XG5cbiAgICAvKiogTW9kaWZpZXIgZm9yIHRoZSBiYWRnZS4gT3B0aW9ucyBhcmUgJ3BpbGwnIGFuZCAnZmlsbGVkJy4gTGVhdmUgZW1wdHkgZm9yIG5vcm1hbC4gKi9cbiAgICBASW5wdXQoKSBtb2RpZmllcjtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1iYWRnZScpXG4gICAgZmRCYWRnZUNsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWJhZGdlLS0nICsgdGhpcy5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vZGlmaWVyKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtYmFkZ2UtLScgKyB0aGlzLm1vZGlmaWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==