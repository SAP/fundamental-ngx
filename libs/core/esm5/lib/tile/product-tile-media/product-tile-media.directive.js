/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Component that represents a product tile media container.
 * ```html
 * <div fd-product-tile-media [photo]="'https://techne.yaas.io/images/product-thumbnail-wide.png'">
 * </div>
 * ```
 */
var ProductTileMediaDirective = /** @class */ (function (_super) {
    tslib_1.__extends(ProductTileMediaDirective, _super);
    /** @hidden */
    function ProductTileMediaDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ProductTileMediaDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-product-tile__media');
        if (this.photo) {
            this._addStyleToElement('background-image', 'url(' + this.photo + ')');
        }
    };
    ProductTileMediaDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-product-tile-media]',
                },] }
    ];
    /** @nocollapse */
    ProductTileMediaDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    ProductTileMediaDirective.propDecorators = {
        photo: [{ type: Input }]
    };
    return ProductTileMediaDirective;
}(AbstractFdNgxClass));
export { ProductTileMediaDirective };
if (false) {
    /**
     * The image url.
     * @type {?}
     */
    ProductTileMediaDirective.prototype.photo;
    /**
     * @type {?}
     * @private
     */
    ProductTileMediaDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC10aWxlLW1lZGlhLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90aWxlL3Byb2R1Y3QtdGlsZS1tZWRpYS9wcm9kdWN0LXRpbGUtbWVkaWEuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7OztBQVN2RTtJQUkrQyxxREFBa0I7SUFJN0QsY0FBYztJQUNkLG1DQUFvQixVQUFzQjtRQUExQyxZQUNJLGtCQUFNLFVBQVUsQ0FBQyxTQUNwQjtRQUZtQixnQkFBVSxHQUFWLFVBQVUsQ0FBWTs7SUFFMUMsQ0FBQztJQUVELGNBQWM7Ozs7O0lBQ2Qsa0RBQWM7Ozs7SUFBZDtRQUNJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQTtTQUN6RTtJQUNMLENBQUM7O2dCQW5CSixTQUFTLFNBQUM7O29CQUVQLFFBQVEsRUFBRSx5QkFBeUI7aUJBQ3RDOzs7O2dCQWJtQixVQUFVOzs7d0JBZ0J6QixLQUFLOztJQWNWLGdDQUFDO0NBQUEsQUFwQkQsQ0FJK0Msa0JBQWtCLEdBZ0JoRTtTQWhCWSx5QkFBeUI7Ozs7OztJQUVsQywwQ0FBdUI7Ozs7O0lBR1gsK0NBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RGZE5neENsYXNzIH0gZnJvbSAnLi4vLi4vdXRpbHMvYWJzdHJhY3QtZmQtbmd4LWNsYXNzJztcblxuLyoqXG4gKiBDb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGEgcHJvZHVjdCB0aWxlIG1lZGlhIGNvbnRhaW5lci5cbiAqIGBgYGh0bWxcbiAqIDxkaXYgZmQtcHJvZHVjdC10aWxlLW1lZGlhIFtwaG90b109XCInaHR0cHM6Ly90ZWNobmUueWFhcy5pby9pbWFnZXMvcHJvZHVjdC10aHVtYm5haWwtd2lkZS5wbmcnXCI+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtcHJvZHVjdC10aWxlLW1lZGlhXScsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y3RUaWxlTWVkaWFEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuICAgIC8qKiBUaGUgaW1hZ2UgdXJsLiAqL1xuICAgIEBJbnB1dCgpIHBob3RvOiBzdHJpbmc7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICBzdXBlcihlbGVtZW50UmVmKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIF9zZXRQcm9wZXJ0aWVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnZmQtcHJvZHVjdC10aWxlX19tZWRpYScpO1xuICAgICAgICBpZiAodGhpcy5waG90bykge1xuICAgICAgICAgICAgdGhpcy5fYWRkU3R5bGVUb0VsZW1lbnQoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKCcgKyB0aGlzLnBob3RvICsgJyknKVxuICAgICAgICB9XG4gICAgfVxufVxuIl19