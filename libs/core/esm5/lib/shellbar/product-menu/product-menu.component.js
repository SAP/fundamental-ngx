/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { PopoverComponent } from '../../popover/popover.component';
/**
 * The component that represents a product menu.
 * Product menu is used for navigating to applications within the product.
 * ```html
 * <fd-product-menu [control]="productMenuControl"
 *                  [items]="productMenuItems">
 * </fd-product-menu>
 * ```
 */
var ProductMenuComponent = /** @class */ (function () {
    function ProductMenuComponent() {
        /**
         * @hidden
         */
        this.productMenuCollapsed = false;
        /**
         * When set to true, popover list will be closed after selecting the option
         */
        this.closePopoverOnSelect = false;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ProductMenuComponent.prototype.onResize = /**
     * @hidden
     * @return {?}
     */
    function () {
        /** @type {?} */
        var mq = window.matchMedia('(max-width: 601px)');
        mq.matches ? this.productMenuCollapsed = true : this.productMenuCollapsed = false;
    };
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    ProductMenuComponent.prototype.ngOnInit = /**
     * @hidden
     * @return {?}
     */
    function () {
        this.onResize();
    };
    /**
     * @hidden
     */
    /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    ProductMenuComponent.prototype.itemClicked = /**
     * @hidden
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    function (item, event) {
        if (this.closePopoverOnSelect) {
            this.popoverComponent.close();
        }
        item.callback(event);
    };
    ProductMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-product-menu',
                    template: "<div class=\"fd-product-menu\">\n    <fd-popover [options]=\"{placement: 'bottom-end'}\"\n                [focusTrapped]=\"false\"\n                [disabled]=\"!items || items.length === 0\" >\n        <fd-popover-control>\n            <button class=\"fd-product-menu__control\">\n                <span class=\"fd-shellbar__title fd-product-menu__title\">\n                    {{control}}\n                </span>\n            </button>\n        </fd-popover-control>\n        <fd-popover-body>\n            <fd-menu>\n                <ul fd-menu-list>\n                    <li fd-menu-item *ngFor=\"let item of items\" (click)=\"itemClicked(item, $event)\">\n                        {{item.name}}\n                    </li>\n                </ul>\n            </fd-menu>\n        </fd-popover-body>\n    </fd-popover>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    ProductMenuComponent.propDecorators = {
        popoverComponent: [{ type: ViewChild, args: [PopoverComponent,] }],
        control: [{ type: Input }],
        items: [{ type: Input }],
        closePopoverOnSelect: [{ type: Input }],
        onResize: [{ type: HostListener, args: ['window:resize', [],] }]
    };
    return ProductMenuComponent;
}());
export { ProductMenuComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    ProductMenuComponent.prototype.popoverComponent;
    /**
     * The control element to toggle the product menu,
     * represented by the name of the current application.
     * @type {?}
     */
    ProductMenuComponent.prototype.control;
    /**
     * The items in the product menu.
     * @type {?}
     */
    ProductMenuComponent.prototype.items;
    /**
     * @hidden
     * @type {?}
     */
    ProductMenuComponent.prototype.productMenuCollapsed;
    /**
     * When set to true, popover list will be closed after selecting the option
     * @type {?}
     */
    ProductMenuComponent.prototype.closePopoverOnSelect;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaGVsbGJhci9wcm9kdWN0LW1lbnUvcHJvZHVjdC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEgsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7Ozs7QUFXbkU7SUFBQTs7OztRQXVCSSx5QkFBb0IsR0FBWSxLQUFLLENBQUM7Ozs7UUFJdEMseUJBQW9CLEdBQVksS0FBSyxDQUFDO0lBd0IxQyxDQUFDO0lBdEJHLGNBQWM7Ozs7O0lBRWQsdUNBQVE7Ozs7SUFEUjs7WUFFVSxFQUFFLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztRQUNsRCxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxjQUFjOzs7OztJQUNkLHVDQUFROzs7O0lBQVI7UUFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVEOztPQUVHOzs7Ozs7O0lBQ0gsMENBQVc7Ozs7OztJQUFYLFVBQVksSUFBUyxFQUFFLEtBQVU7UUFDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDOztnQkFqREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLHkwQkFBNEM7b0JBQzVDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7O21DQUlJLFNBQVMsU0FBQyxnQkFBZ0I7MEJBTzFCLEtBQUs7d0JBSUwsS0FBSzt1Q0FPTCxLQUFLOzJCQUlMLFlBQVksU0FBQyxlQUFlLEVBQUUsRUFBRTs7SUFxQnJDLDJCQUFDO0NBQUEsQUFuREQsSUFtREM7U0E5Q1ksb0JBQW9COzs7Ozs7SUFHN0IsZ0RBQ21DOzs7Ozs7SUFNbkMsdUNBQ2dCOzs7OztJQUdoQixxQ0FDYTs7Ozs7SUFHYixvREFBc0M7Ozs7O0lBR3RDLG9EQUNzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcG92ZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9wb3BvdmVyL3BvcG92ZXIuY29tcG9uZW50JztcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIHByb2R1Y3QgbWVudS5cbiAqIFByb2R1Y3QgbWVudSBpcyB1c2VkIGZvciBuYXZpZ2F0aW5nIHRvIGFwcGxpY2F0aW9ucyB3aXRoaW4gdGhlIHByb2R1Y3QuXG4gKiBgYGBodG1sXG4gKiA8ZmQtcHJvZHVjdC1tZW51IFtjb250cm9sXT1cInByb2R1Y3RNZW51Q29udHJvbFwiXG4gKiAgICAgICAgICAgICAgICAgIFtpdGVtc109XCJwcm9kdWN0TWVudUl0ZW1zXCI+XG4gKiA8L2ZkLXByb2R1Y3QtbWVudT5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXByb2R1Y3QtbWVudScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Byb2R1Y3QtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBWaWV3Q2hpbGQoUG9wb3ZlckNvbXBvbmVudClcbiAgICBwb3BvdmVyQ29tcG9uZW50OiBQb3BvdmVyQ29tcG9uZW50O1xuXG4gICAgLyoqIFxuICAgICAqIFRoZSBjb250cm9sIGVsZW1lbnQgdG8gdG9nZ2xlIHRoZSBwcm9kdWN0IG1lbnUsXG4gICAgICogcmVwcmVzZW50ZWQgYnkgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnQgYXBwbGljYXRpb24uIFxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgY29udHJvbDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBpdGVtcyBpbiB0aGUgcHJvZHVjdCBtZW51LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaXRlbXM6IGFueVtdO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBwcm9kdWN0TWVudUNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZW4gc2V0IHRvIHRydWUsIHBvcG92ZXIgbGlzdCB3aWxsIGJlIGNsb3NlZCBhZnRlciBzZWxlY3RpbmcgdGhlIG9wdGlvbiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2xvc2VQb3BvdmVyT25TZWxlY3Q6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFtdKVxuICAgIG9uUmVzaXplKCkge1xuICAgICAgICBjb25zdCBtcSA9IHdpbmRvdy5tYXRjaE1lZGlhKCcobWF4LXdpZHRoOiA2MDFweCknKTtcbiAgICAgICAgbXEubWF0Y2hlcyA/IHRoaXMucHJvZHVjdE1lbnVDb2xsYXBzZWQgPSB0cnVlIDogdGhpcy5wcm9kdWN0TWVudUNvbGxhcHNlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAaGlkZGVuXG4gICAgICovXG4gICAgaXRlbUNsaWNrZWQoaXRlbTogYW55LCBldmVudDogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlUG9wb3Zlck9uU2VsZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnBvcG92ZXJDb21wb25lbnQuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpdGVtLmNhbGxiYWNrKGV2ZW50KTtcbiAgICB9XG5cbn1cbiJdfQ==