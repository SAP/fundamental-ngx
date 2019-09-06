/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * @hidden
 * The base class for the icon component
 * @type {?}
 */
const BASE_ICON_CLASS = 'sap-icon';
/**
 * @hidden
 * Prefix for icon prop classes
 * @type {?}
 */
const PREFIX_ICON_CLASS = BASE_ICON_CLASS + '--';
/**
 * The component that represents an icon.
 *
 * ```html
 * <fd-icon [glyph]="cart-approval" [size]="'l'"></fd-icon>
 * ```
 */
export class IconComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * The size of the icon
         * The predefined values for the input size are *xs*, *s*, *l*, and *xl*.
         * *size* can accept any other string, for example *xxs*, which will be translated into class *sap-icon--xxs*.
         */
        this.size = '';
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        if (this.glyph) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.glyph);
        }
        if (this.size) {
            this._addClassToElement(PREFIX_ICON_CLASS + this.size);
        }
    }
}
IconComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-icon',
                template: ``,
                host: {
                    role: 'presentation'
                },
                encapsulation: ViewEncapsulation.None
            }] }
];
/** @nocollapse */
IconComponent.ctorParameters = () => [
    { type: ElementRef }
];
IconComponent.propDecorators = {
    glyph: [{ type: Input }],
    size: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvaWNvbi9pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7TUFNOUQsZUFBZSxHQUFHLFVBQVU7Ozs7OztNQU01QixpQkFBaUIsR0FBRyxlQUFlLEdBQUcsSUFBSTs7Ozs7Ozs7QUFpQmhELE1BQU0sT0FBTyxhQUFjLFNBQVEsa0JBQWtCOzs7OztJQTBCakQsWUFBb0IsVUFBc0I7UUFDdEMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBREYsZUFBVSxHQUFWLFVBQVUsQ0FBWTs7Ozs7O1FBZGpDLFNBQUksR0FBVyxFQUFFLENBQUM7SUFnQjNCLENBQUM7Ozs7O0lBYkQsY0FBYztRQUNWLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWCxJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQzs7O1lBL0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxjQUFjO2lCQUN2QjtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7OztZQTdCbUIsVUFBVTs7O29CQW1DekIsS0FBSzttQkFPTCxLQUFLOzs7Ozs7Ozs7SUFQTiw4QkFBZTs7Ozs7OztJQU9mLDZCQUEyQjs7Ozs7SUFjZixtQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcblxuLyoqIFxuICogQGhpZGRlblxuICogVGhlIGJhc2UgY2xhc3MgZm9yIHRoZSBpY29uIGNvbXBvbmVudCBcbiAqL1xuY29uc3QgQkFTRV9JQ09OX0NMQVNTID0gJ3NhcC1pY29uJztcblxuLyoqIFxuICogQGhpZGRlblxuICogUHJlZml4IGZvciBpY29uIHByb3AgY2xhc3NlcyBcbiAqL1xuY29uc3QgUFJFRklYX0lDT05fQ0xBU1MgPSBCQVNFX0lDT05fQ0xBU1MgKyAnLS0nO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGFuIGljb24uXG4gKlxuICogYGBgaHRtbFxuICogPGZkLWljb24gW2dseXBoXT1cImNhcnQtYXBwcm92YWxcIiBbc2l6ZV09XCInbCdcIj48L2ZkLWljb24+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1pY29uJyxcbiAgICB0ZW1wbGF0ZTogYGAsXG4gICAgaG9zdDoge1xuICAgICAgICByb2xlOiAncHJlc2VudGF0aW9uJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBJY29uQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcblxuICAgIC8qKiBUaGUgaWNvbiBuYW1lIHRvIGRpc3BsYXkuIFNlZSB0aGUgaWNvbiBwYWdlIGZvciB0aGUgbGlzdCBvZiBpY29uc1xuICAgICAqIGhlcmU6IGh0dHBzOi8vc2FwLmdpdGh1Yi5pby9mdW5kYW1lbnRhbC1uZ3gvaWNvblxuICAgICAqICovXG4gICAgQElucHV0KCkgZ2x5cGg7XG5cbiAgICAvKiogXG4gICAgICogVGhlIHNpemUgb2YgdGhlIGljb25cbiAgICAgKiBUaGUgcHJlZGVmaW5lZCB2YWx1ZXMgZm9yIHRoZSBpbnB1dCBzaXplIGFyZSAqeHMqLCAqcyosICpsKiwgYW5kICp4bCouXG4gICAgICogKnNpemUqIGNhbiBhY2NlcHQgYW55IG90aGVyIHN0cmluZywgZm9yIGV4YW1wbGUgKnh4cyosIHdoaWNoIHdpbGwgYmUgdHJhbnNsYXRlZCBpbnRvIGNsYXNzICpzYXAtaWNvbi0teHhzKi5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaXplOiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgX3NldFByb3BlcnRpZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLmdseXBoKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudChQUkVGSVhfSUNPTl9DTEFTUyArIHRoaXMuZ2x5cGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoUFJFRklYX0lDT05fQ0xBU1MgKyB0aGlzLnNpemUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxufVxuIl19