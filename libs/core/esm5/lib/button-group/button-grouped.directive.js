/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Directive to be applied to buttons that are members of a button group.
 *
 * ```html
 * <button fd-button-grouped>Button</button>
 * ```
 */
var ButtonGroupedDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonGroupedDirective, _super);
    /** @hidden */
    function ButtonGroupedDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the button should be in compact form.
         */
        _this.compact = false;
        /**
         * @hidden
         */
        _this.fdButtonGroupedClass = true;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ButtonGroupedDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.size) {
            this._addClassToElement('fd-button--' + this.size);
        }
        if (this.glyph) {
            this._addClassToElement('sap-icon--' + this.glyph);
        }
        if (this.state) {
            this._addClassToElement('is-' + this.state);
        }
    };
    ButtonGroupedDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-button-grouped]'
                },] }
    ];
    /** @nocollapse */
    ButtonGroupedDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ButtonGroupedDirective.propDecorators = {
        size: [{ type: Input }],
        glyph: [{ type: Input }],
        state: [{ type: Input }],
        compact: [{ type: Input }, { type: HostBinding, args: ['class.fd-button--compact',] }],
        fdButtonGroupedClass: [{ type: HostBinding, args: ['class.fd-button--grouped',] }]
    };
    return ButtonGroupedDirective;
}(AbstractFdNgxClass));
export { ButtonGroupedDirective };
if (false) {
    /**
     * Size of the button. Can be `xs`, `s`, or left blank for large size.
     * @type {?}
     */
    ButtonGroupedDirective.prototype.size;
    /**
     * Glyph (icon) of the button.
     * @type {?}
     */
    ButtonGroupedDirective.prototype.glyph;
    /**
     * State of the button. Can be `selected` or `disabled`.
     * @type {?}
     */
    ButtonGroupedDirective.prototype.state;
    /**
     * Whether the button should be in compact form.
     * @type {?}
     */
    ButtonGroupedDirective.prototype.compact;
    /**
     * @hidden
     * @type {?}
     */
    ButtonGroupedDirective.prototype.fdButtonGroupedClass;
    /**
     * @type {?}
     * @private
     */
    ButtonGroupedDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLWdyb3VwZWQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2J1dHRvbi1ncm91cC9idXR0b24tZ3JvdXBlZC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7OztBQVNwRTtJQUs0QyxrREFBa0I7SUF1QjFELGNBQWM7SUFDZCxnQ0FBb0IsVUFBc0I7UUFBMUMsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FDcEI7UUFGbUIsZ0JBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFQMUMsYUFBTyxHQUFZLEtBQUssQ0FBQzs7OztRQUl6QiwwQkFBb0IsR0FBWSxJQUFJLENBQUM7O0lBS3JDLENBQUM7SUFFRCxjQUFjOzs7OztJQUNkLCtDQUFjOzs7O0lBQWQ7UUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0RDtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0M7SUFDTCxDQUFDOztnQkE1Q0osU0FBUyxTQUFDOzs7b0JBR1AsUUFBUSxFQUFFLHFCQUFxQjtpQkFDbEM7Ozs7Z0JBZG1CLFVBQVU7Ozt1QkFrQnpCLEtBQUs7d0JBSUwsS0FBSzt3QkFJTCxLQUFLOzBCQUlMLEtBQUssWUFDTCxXQUFXLFNBQUMsMEJBQTBCO3VDQUl0QyxXQUFXLFNBQUMsMEJBQTBCOztJQW9CM0MsNkJBQUM7Q0FBQSxBQTdDRCxDQUs0QyxrQkFBa0IsR0F3QzdEO1NBeENZLHNCQUFzQjs7Ozs7O0lBRy9CLHNDQUNhOzs7OztJQUdiLHVDQUNjOzs7OztJQUdkLHVDQUNjOzs7OztJQUdkLHlDQUV5Qjs7Ozs7SUFHekIsc0RBQ3FDOzs7OztJQUd6Qiw0Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYmUgYXBwbGllZCB0byBidXR0b25zIHRoYXQgYXJlIG1lbWJlcnMgb2YgYSBidXR0b24gZ3JvdXAuXG4gKlxuICogYGBgaHRtbFxuICogPGJ1dHRvbiBmZC1idXR0b24tZ3JvdXBlZD5CdXR0b248L2J1dHRvbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1idXR0b24tZ3JvdXBlZF0nXG59KVxuZXhwb3J0IGNsYXNzIEJ1dHRvbkdyb3VwZWREaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuXG4gICAgLyoqIFNpemUgb2YgdGhlIGJ1dHRvbi4gQ2FuIGJlIGB4c2AsIGBzYCwgb3IgbGVmdCBibGFuayBmb3IgbGFyZ2Ugc2l6ZS4gKi9cbiAgICBASW5wdXQoKVxuICAgIHNpemU6IHN0cmluZztcblxuICAgIC8qKiBHbHlwaCAoaWNvbikgb2YgdGhlIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKVxuICAgIGdseXBoOiBzdHJpbmc7XG5cbiAgICAvKiogU3RhdGUgb2YgdGhlIGJ1dHRvbi4gQ2FuIGJlIGBzZWxlY3RlZGAgb3IgYGRpc2FibGVkYC4gKi9cbiAgICBASW5wdXQoKVxuICAgIHN0YXRlOiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgYnV0dG9uIHNob3VsZCBiZSBpbiBjb21wYWN0IGZvcm0uICovXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWJ1dHRvbi0tY29tcGFjdCcpXG4gICAgY29tcGFjdDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWJ1dHRvbi0tZ3JvdXBlZCcpXG4gICAgZmRCdXR0b25Hcm91cGVkQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLWJ1dHRvbi0tJyArIHRoaXMuc2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZ2x5cGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdzYXAtaWNvbi0tJyArIHRoaXMuZ2x5cGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnaXMtJyArIHRoaXMuc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19