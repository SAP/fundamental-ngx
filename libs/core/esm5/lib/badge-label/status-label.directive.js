/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Status Label directive with some default icons based on status input used to indicate status.
 * Icons are used to easily highlight the state of an object.
 */
var StatusLabelDirective = /** @class */ (function (_super) {
    tslib_1.__extends(StatusLabelDirective, _super);
    /** @hidden */
    function StatusLabelDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
         */
        _this.status = '';
        /**
         * Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'.
         */
        _this.statusIcon = '';
        /**
         * The icon used with the status indicator. See the icon page for the list of icons.
         */
        _this.icon = '';
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    StatusLabelDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-status-label');
        if (this.status) {
            this._addClassToElement('fd-status-label--' + this.status);
        }
        if (this.statusIcon) {
            this._addClassToElement('fd-status-label--' + this.statusIcon);
        }
        if (this.icon) {
            this._addClassToElement('sap-icon--' + this.icon);
        }
    };
    StatusLabelDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-status-label]'
                },] }
    ];
    /** @nocollapse */
    StatusLabelDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    StatusLabelDirective.propDecorators = {
        status: [{ type: Input }],
        statusIcon: [{ type: Input }],
        icon: [{ type: Input }]
    };
    return StatusLabelDirective;
}(AbstractFdNgxClass));
export { StatusLabelDirective };
if (false) {
    /**
     * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
     * @type {?}
     */
    StatusLabelDirective.prototype.status;
    /**
     * Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'.
     * @type {?}
     */
    StatusLabelDirective.prototype.statusIcon;
    /**
     * The icon used with the status indicator. See the icon page for the list of icons.
     * @type {?}
     */
    StatusLabelDirective.prototype.icon;
    /**
     * @type {?}
     * @private
     */
    StatusLabelDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWxhYmVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9iYWRnZS1sYWJlbC9zdGF0dXMtbGFiZWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7OztBQU1wRTtJQUkwQyxnREFBa0I7SUF3QnhELGNBQWM7SUFDZCw4QkFBb0IsVUFBc0I7UUFBMUMsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FDcEI7UUFGbUIsZ0JBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUF2QmpDLFlBQU0sR0FBVyxFQUFFLENBQUM7Ozs7UUFHcEIsZ0JBQVUsR0FBVyxFQUFFLENBQUM7Ozs7UUFHeEIsVUFBSSxHQUFXLEVBQUUsQ0FBQzs7SUFtQjNCLENBQUM7SUFqQkQsY0FBYzs7Ozs7SUFDZCw2Q0FBYzs7OztJQUFkO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ2xFO1FBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckQ7SUFDTCxDQUFDOztnQkExQkosU0FBUyxTQUFDOztvQkFFUCxRQUFRLEVBQUUsbUJBQW1CO2lCQUNoQzs7OztnQkFWbUIsVUFBVTs7O3lCQWF6QixLQUFLOzZCQUdMLEtBQUs7dUJBR0wsS0FBSzs7SUFvQlYsMkJBQUM7Q0FBQSxBQWhDRCxDQUkwQyxrQkFBa0IsR0E0QjNEO1NBNUJZLG9CQUFvQjs7Ozs7O0lBRTdCLHNDQUE2Qjs7Ozs7SUFHN0IsMENBQWlDOzs7OztJQUdqQyxvQ0FBMkI7Ozs7O0lBaUJmLDBDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcblxuLyoqXG4gKiBTdGF0dXMgTGFiZWwgZGlyZWN0aXZlIHdpdGggc29tZSBkZWZhdWx0IGljb25zIGJhc2VkIG9uIHN0YXR1cyBpbnB1dCB1c2VkIHRvIGluZGljYXRlIHN0YXR1cy5cbiAqIEljb25zIGFyZSB1c2VkIHRvIGVhc2lseSBoaWdobGlnaHQgdGhlIHN0YXRlIG9mIGFuIG9iamVjdC5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXN0YXR1cy1sYWJlbF0nXG59KVxuZXhwb3J0IGNsYXNzIFN0YXR1c0xhYmVsRGlyZWN0aXZlIGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcbiAgICAvKiogQ29sb3IgY29kZWQgc3RhdHVzIGZvciB0aGUgbGFiZWwuIE9wdGlvbnMgYXJlICdzdWNjZXNzJywgJ3dhcm5pbmcnLCBhbmQgJ2Vycm9yJy4gTGVhdmUgZW1wdHkgZm9yIGRlZmF1bHQgbGFiZWwuICovXG4gICAgQElucHV0KCkgc3RhdHVzOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBCdWlsdC1pbiBzdGF0dXMgaWNvbi4gT3B0aW9ucyBpbmNsdWRlICdhdmFpbGFibGUnLCAnYXdheScsICdidXN5JywgYW5kICdvZmZsaW5lJy4gKi9cbiAgICBASW5wdXQoKSBzdGF0dXNJY29uOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBUaGUgaWNvbiB1c2VkIHdpdGggdGhlIHN0YXR1cyBpbmRpY2F0b3IuIFNlZSB0aGUgaWNvbiBwYWdlIGZvciB0aGUgbGlzdCBvZiBpY29ucy4gKi9cbiAgICBASW5wdXQoKSBpY29uOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1zdGF0dXMtbGFiZWwnKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtc3RhdHVzLWxhYmVsLS0nICsgdGhpcy5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXR1c0ljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1zdGF0dXMtbGFiZWwtLScgKyB0aGlzLnN0YXR1c0ljb24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdzYXAtaWNvbi0tJyArIHRoaXMuaWNvbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG59XG4iXX0=