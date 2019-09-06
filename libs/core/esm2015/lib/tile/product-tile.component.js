/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Product tile is used to display product information.
 * ```html
 * <fd-product-tile>
 *     <fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 *     </fd-product-tile-media>
 *     <fd-product-tile-content>
 *         <h2 fd-product-tile-title>Default Product Tile</h2>
 *     </fd-product-tile-content>
 * </fd-product-tile>
 * ```
 */
export class ProductTileComponent extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Whether the product tile is disabled.
         */
        this.disabled = false;
        /**
         * Whether the product tile is rendered as a button.
         */
        this.isButton = false;
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-product-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
    }
}
ProductTileComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-product-tile',
                host: {
                    '[attr.role]': '(this.isButton === true ? "button" : "")',
                    '[class.fd-product-tile-custom]': 'true'
                },
                template: "<ng-content select=\"[fd-product-tile-media]\"></ng-content>\n<ng-content select=\"[fd-product-tile-content]\"></ng-content>\n<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                styles: [`
        .fd-product-tile-custom {
            display: block;
        }
    `]
            }] }
];
/** @nocollapse */
ProductTileComponent.ctorParameters = () => [
    { type: ElementRef }
];
ProductTileComponent.propDecorators = {
    disabled: [{ type: Input }],
    isButton: [{ type: Input }]
};
if (false) {
    /**
     * Whether the product tile is disabled.
     * @type {?}
     */
    ProductTileComponent.prototype.disabled;
    /**
     * Whether the product tile is rendered as a button.
     * @type {?}
     */
    ProductTileComponent.prototype.isButton;
    /**
     * @type {?}
     * @private
     */
    ProductTileComponent.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC10aWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90aWxlL3Byb2R1Y3QtdGlsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7Ozs7Ozs7Ozs7OztBQTRCcEUsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGtCQUFrQjs7Ozs7SUFnQnhELFlBQW9CLFVBQXNCO1FBQ3RDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQURGLGVBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFkakMsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUcxQixhQUFRLEdBQVksS0FBSyxDQUFDO0lBYW5DLENBQUM7Ozs7O0lBVkQsY0FBYztRQUNWLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMxQztJQUNMLENBQUM7OztZQTNCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsSUFBSSxFQUFFO29CQUNGLGFBQWEsRUFBRSwwQ0FBMEM7b0JBQ3pELGdDQUFnQyxFQUFFLE1BQU07aUJBQzNDO2dCQUNELHFLQUE0QztnQkFDNUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7eUJBQzVCOzs7O0tBSVI7YUFDSjs7OztZQTVCbUIsVUFBVTs7O3VCQStCekIsS0FBSzt1QkFHTCxLQUFLOzs7Ozs7O0lBSE4sd0NBQW1DOzs7OztJQUduQyx3Q0FBbUM7Ozs7O0lBV3ZCLDBDQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIFByb2R1Y3QgdGlsZSBpcyB1c2VkIHRvIGRpc3BsYXkgcHJvZHVjdCBpbmZvcm1hdGlvbi5cbiAqIGBgYGh0bWxcbiAqIDxmZC1wcm9kdWN0LXRpbGU+XG4gKiAgICAgPGZkLXByb2R1Y3QtdGlsZS1tZWRpYSBbcGhvdG9dPVwiJ2h0dHBzOi8vdGVjaG5lLnlhYXMuaW8vaW1hZ2VzL3Byb2R1Y3QtdGh1bWJuYWlsLXdpZGUucG5nJ1wiPlxuICogICAgIDwvZmQtcHJvZHVjdC10aWxlLW1lZGlhPlxuICogICAgIDxmZC1wcm9kdWN0LXRpbGUtY29udGVudD5cbiAqICAgICAgICAgPGgyIGZkLXByb2R1Y3QtdGlsZS10aXRsZT5EZWZhdWx0IFByb2R1Y3QgVGlsZTwvaDI+XG4gKiAgICAgPC9mZC1wcm9kdWN0LXRpbGUtY29udGVudD5cbiAqIDwvZmQtcHJvZHVjdC10aWxlPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtcHJvZHVjdC10aWxlJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbYXR0ci5yb2xlXSc6ICcodGhpcy5pc0J1dHRvbiA9PT0gdHJ1ZSA/IFwiYnV0dG9uXCIgOiBcIlwiKScsXG4gICAgICAgICdbY2xhc3MuZmQtcHJvZHVjdC10aWxlLWN1c3RvbV0nOiAndHJ1ZSdcbiAgICB9LFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wcm9kdWN0LXRpbGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICAuZmQtcHJvZHVjdC10aWxlLWN1c3RvbSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuICAgIGBdXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RUaWxlQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGZE5neENsYXNzIHtcbiAgICAvKiogV2hldGhlciB0aGUgcHJvZHVjdCB0aWxlIGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogV2hldGhlciB0aGUgcHJvZHVjdCB0aWxlIGlzIHJlbmRlcmVkIGFzIGEgYnV0dG9uLiAqL1xuICAgIEBJbnB1dCgpIGlzQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIF9zZXRQcm9wZXJ0aWVzKCkge1xuICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtcHJvZHVjdC10aWxlJyk7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnaXMtZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==