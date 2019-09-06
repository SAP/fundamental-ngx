/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * @hidden
 * The base class for the icon component
 * @type {?}
 */
var BASE_ICON_CLASS = 'sap-icon';
/**
 * @hidden
 * Prefix for icon prop classes
 * @type {?}
 */
var PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';
/**
 * The component that represents an icon.
 *
 * ```html
 * <fd-icon [glyph]="cart-approval" [size]="'l'"></fd-icon>
 * ```
 */
var IconComponent = /** @class */ (function (_super) {
    tslib_1.__extends(IconComponent, _super);
    /** @hidden */
    function IconComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * The size of the icon
         * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
         * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
         */
        _this.size = '';
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    IconComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        if (this.glyph) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.glyph);
        }
        if (this.size) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.size);
        }
    };
    IconComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-icon',
                    template: "",
                    host: {
                        role: 'presentation'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    /** @nocollapse */
    IconComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    IconComponent.propDecorators = {
        glyph: [{ type: Input }],
        size: [{ type: Input }]
    };
    return IconComponent;
}(AbstractFdNgxClass));
export { IconComponent };
if (false) {
    /**
     * The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     *
     * @type {?}
     */
    IconComponent.prototype.glyph;
    /**
     * The size of the icon
     * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
     * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
     * @type {?}
     */
    IconComponent.prototype.size;
    /**
     * @type {?}
     * @private
     */
    IconComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvaWNvbi9pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7O0lBTTlELGVBQWUsR0FBRyxVQUFVOzs7Ozs7SUFNNUIsaUJBQWlCLEdBQUcsZUFBZSxHQUFHLElBQUk7Ozs7Ozs7O0FBU2hEO0lBUW1DLHlDQUFrQjtJQXlCakQsY0FBYztJQUNkLHVCQUFvQixVQUFzQjtRQUExQyxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtRQUZtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7Ozs7O1FBZGpDLFVBQUksR0FBVyxFQUFFLENBQUM7O0lBZ0IzQixDQUFDO0lBZEQsY0FBYzs7Ozs7SUFDZCxzQ0FBYzs7OztJQUFkO1FBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1osSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRDtRQUVELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUQ7SUFDTCxDQUFDOztnQkEvQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsRUFBRTtvQkFDWixJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLGNBQWM7cUJBQ3ZCO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7OztnQkE3Qm1CLFVBQVU7Ozt3QkFtQ3pCLEtBQUs7dUJBT0wsS0FBSzs7SUFpQlYsb0JBQUM7Q0FBQSxBQXJDRCxDQVFtQyxrQkFBa0IsR0E2QnBEO1NBN0JZLGFBQWE7Ozs7Ozs7O0lBS3RCLDhCQUFlOzs7Ozs7O0lBT2YsNkJBQTJCOzs7OztJQWNmLG1DQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKiogXG4gKiBAaGlkZGVuXG4gKiBUaGUgYmFzZSBjbGFzcyBmb3IgdGhlIGljb24gY29tcG9uZW50IFxuICovXG5jb25zdCBCQVNFX0lDT05fQ0xBU1MgPSAnc2FwLWljb24nO1xuXG4vKiogXG4gKiBAaGlkZGVuXG4gKiBQcmVmaXggZm9yIGljb24gcHJvcCBjbGFzc2VzIFxuICovXG5jb25zdCBQUkVGSVhfSUNPTl9DTEFTUyA9IEJBU0VfSUNPTl9DTEFTUyArICctLSc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYW4gaWNvbi5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZmQtaWNvbiBbZ2x5cGhdPVwiY2FydC1hcHByb3ZhbFwiIFtzaXplXT1cIidsJ1wiPjwvZmQtaWNvbj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWljb24nLFxuICAgIHRlbXBsYXRlOiBgYCxcbiAgICBob3N0OiB7XG4gICAgICAgIHJvbGU6ICdwcmVzZW50YXRpb24nXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEljb25Db21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuXG4gICAgLyoqIFRoZSBpY29uIG5hbWUgdG8gZGlzcGxheS4gU2VlIHRoZSBpY29uIHBhZ2UgZm9yIHRoZSBsaXN0IG9mIGljb25zXG4gICAgICogaGVyZTogaHR0cHM6Ly9zYXAuZ2l0aHViLmlvL2Z1bmRhbWVudGFsLW5neC9pY29uXG4gICAgICogKi9cbiAgICBASW5wdXQoKSBnbHlwaDtcblxuICAgIC8qKiBcbiAgICAgKiBUaGUgc2l6ZSBvZiB0aGUgaWNvblxuICAgICAqIFRoZSBwcmVkZWZpbmVkIHZhbHVlcyBmb3IgdGhlIGlucHV0IHNpemUgYXJlICp4cyosICpzKiwgKmwqLCBhbmQgKnhsKi5cbiAgICAgKiAqc2l6ZSogY2FuIGFjY2VwdCBhbnkgb3RoZXIgc3RyaW5nLCBmb3IgZXhhbXBsZSAqeHhzKiwgd2hpY2ggd2lsbCBiZSB0cmFuc2xhdGVkIGludG8gY2xhc3MgKnNhcC1pY29uLS14eHMqLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIHNpemU6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2x5cGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KFBSRUZJWF9JQ09OX0NMQVNTICsgdGhpcy5nbHlwaCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaXplKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudChQUkVGSVhfSUNPTl9DTEFTUyArIHRoaXMuc2l6ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG59XG4iXX0=