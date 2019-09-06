/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
var ProductTileComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ProductTileComponent, _super);
    /** @hidden */
    function ProductTileComponent(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        /**
         * Whether the product tile is disabled.
         */
        _this.disabled = false;
        /**
         * Whether the product tile is rendered as a button.
         */
        _this.isButton = false;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ProductTileComponent.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-product-tile');
        if (this.disabled) {
            this._addClassToElement('is-disabled');
        }
    };
    ProductTileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-product-tile',
                    host: {
                        '[attr.role]': '(this.isButton === true ? "button" : "")',
                        '[class.fd-product-tile-custom]': 'true'
                    },
                    template: "<ng-content select=\"[fd-product-tile-media]\"></ng-content>\n<ng-content select=\"[fd-product-tile-content]\"></ng-content>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["\n        .fd-product-tile-custom {\n            display: block;\n        }\n    "]
                }] }
    ];
    /** @nocollapse */
    ProductTileComponent.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ProductTileComponent.propDecorators = {
        disabled: [{ type: Input }],
        isButton: [{ type: Input }]
    };
    return ProductTileComponent;
}(AbstractFdNgxClass));
export { ProductTileComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC10aWxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90aWxlL3Byb2R1Y3QtdGlsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFjcEU7SUFjMEMsZ0RBQWtCO0lBZXhELGNBQWM7SUFDZCw4QkFBb0IsVUFBc0I7UUFBMUMsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FDcEI7UUFGbUIsZ0JBQVUsR0FBVixVQUFVLENBQVk7Ozs7UUFkakMsY0FBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUcxQixjQUFRLEdBQVksS0FBSyxDQUFDOztJQWFuQyxDQUFDO0lBWEQsY0FBYzs7Ozs7SUFDZCw2Q0FBYzs7OztJQUFkO1FBQ0ksSUFBSSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0MsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7Z0JBM0JKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixJQUFJLEVBQUU7d0JBQ0YsYUFBYSxFQUFFLDBDQUEwQzt3QkFDekQsZ0NBQWdDLEVBQUUsTUFBTTtxQkFDM0M7b0JBQ0QscUtBQTRDO29CQUM1QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs2QkFDNUIsbUZBSVI7aUJBQ0o7Ozs7Z0JBNUJtQixVQUFVOzs7MkJBK0J6QixLQUFLOzJCQUdMLEtBQUs7O0lBY1YsMkJBQUM7Q0FBQSxBQWpDRCxDQWMwQyxrQkFBa0IsR0FtQjNEO1NBbkJZLG9CQUFvQjs7Ozs7O0lBRTdCLHdDQUFtQzs7Ozs7SUFHbkMsd0NBQW1DOzs7OztJQVd2QiwwQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcblxuLyoqXG4gKiBQcm9kdWN0IHRpbGUgaXMgdXNlZCB0byBkaXNwbGF5IHByb2R1Y3QgaW5mb3JtYXRpb24uXG4gKiBgYGBodG1sXG4gKiA8ZmQtcHJvZHVjdC10aWxlPlxuICogICAgIDxmZC1wcm9kdWN0LXRpbGUtbWVkaWEgW3Bob3RvXT1cIidodHRwczovL3RlY2huZS55YWFzLmlvL2ltYWdlcy9wcm9kdWN0LXRodW1ibmFpbC13aWRlLnBuZydcIj5cbiAqICAgICA8L2ZkLXByb2R1Y3QtdGlsZS1tZWRpYT5cbiAqICAgICA8ZmQtcHJvZHVjdC10aWxlLWNvbnRlbnQ+XG4gKiAgICAgICAgIDxoMiBmZC1wcm9kdWN0LXRpbGUtdGl0bGU+RGVmYXVsdCBQcm9kdWN0IFRpbGU8L2gyPlxuICogICAgIDwvZmQtcHJvZHVjdC10aWxlLWNvbnRlbnQ+XG4gKiA8L2ZkLXByb2R1Y3QtdGlsZT5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXByb2R1Y3QtdGlsZScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2F0dHIucm9sZV0nOiAnKHRoaXMuaXNCdXR0b24gPT09IHRydWUgPyBcImJ1dHRvblwiIDogXCJcIiknLFxuICAgICAgICAnW2NsYXNzLmZkLXByb2R1Y3QtdGlsZS1jdXN0b21dJzogJ3RydWUnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC10aWxlLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlczogW2BcbiAgICAgICAgLmZkLXByb2R1Y3QtdGlsZS1jdXN0b20ge1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0VGlsZUNvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyB7XG4gICAgLyoqIFdoZXRoZXIgdGhlIHByb2R1Y3QgdGlsZSBpcyBkaXNhYmxlZC4gKi9cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIHByb2R1Y3QgdGlsZSBpcyByZW5kZXJlZCBhcyBhIGJ1dHRvbi4gKi9cbiAgICBASW5wdXQoKSBpc0J1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXByb2R1Y3QtdGlsZScpO1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2lzLWRpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG59XG4iXX0=