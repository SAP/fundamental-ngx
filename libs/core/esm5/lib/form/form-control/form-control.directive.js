/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, Input, ElementRef } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
var FormControlDirective = /** @class */ (function (_super) {
    tslib_1.__extends(FormControlDirective, _super);
    /** @hidden */
    function FormControlDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    FormControlDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-form__control');
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    };
    FormControlDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-form-control]'
                },] }
    ];
    /** @nocollapse */
    FormControlDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    FormControlDirective.propDecorators = {
        state: [{ type: Input }]
    };
    return FormControlDirective;
}(AbstractFdNgxClass));
export { FormControlDirective };
if (false) {
    /**
     *  The state of the form control - applies css classes.
     *  Can be `valid`, `error`, `warning` or blank for default.
     * @type {?}
     */
    FormControlDirective.prototype.state;
    /**
     * @type {?}
     * @private
     */
    FormControlDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2Zvcm0tY29udHJvbC9mb3JtLWNvbnRyb2wuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7OztBQVN2RTtJQUswQyxnREFBa0I7SUFpQnhELGNBQWM7SUFDZCw4QkFBb0IsVUFBc0I7UUFBMUMsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FDcEI7UUFGbUIsZ0JBQVUsR0FBVixVQUFVLENBQVk7O0lBRTFDLENBQUM7SUFYRCxjQUFjOzs7OztJQUNkLDZDQUFjOzs7O0lBQWQ7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQztJQUNMLENBQUM7O2dCQXBCSixTQUFTLFNBQUM7OztvQkFHUCxRQUFRLEVBQUUsbUJBQW1CO2lCQUNoQzs7OztnQkFkMEIsVUFBVTs7O3dCQXFCaEMsS0FBSzs7SUFlViwyQkFBQztDQUFBLEFBMUJELENBSzBDLGtCQUFrQixHQXFCM0Q7U0FyQlksb0JBQW9COzs7Ozs7O0lBTTdCLHFDQUNjOzs7OztJQVdGLDBDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmROZ3hDbGFzcyB9IGZyb20gJy4uLy4uL3V0aWxzL2Fic3RyYWN0LWZkLW5neC1jbGFzcyc7XG5cbi8qKlxuICogRGlyZWN0aXZlIGludGVuZGVkIGZvciB1c2Ugb24gZm9ybSBjb250cm9scy5cbiAqXG4gKiBgYGBodG1sXG4gKiA8aW5wdXQgdHlwZT1cInRleHRcIiBmZC1mb3JtLWNvbnRyb2wgLz5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1mb3JtLWNvbnRyb2xdJ1xufSlcbmV4cG9ydCBjbGFzcyBGb3JtQ29udHJvbERpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKiAgVGhlIHN0YXRlIG9mIHRoZSBmb3JtIGNvbnRyb2wgLSBhcHBsaWVzIGNzcyBjbGFzc2VzLlxuICAgICAqICBDYW4gYmUgYHZhbGlkYCwgYGVycm9yYCwgYHdhcm5pbmdgIG9yIGJsYW5rIGZvciBkZWZhdWx0LlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc3RhdGU6IHN0cmluZztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1mb3JtX19jb250cm9sJyk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnaXMtJyArIHRoaXMuc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxufVxuIl19