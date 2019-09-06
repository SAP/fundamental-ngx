/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
export class SideNavigationComponent {
    constructor() {
        /**
         * Whether the side navigation is collapsed.
         */
        this.collapsed = false;
    }
}
SideNavigationComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-side-nav',
                template: "<div class=\"fd-side-nav\" [ngClass]=\"{' fd-side-nav--icons': collapsed === true}\">\n  <ng-content></ng-content>\n</div>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];
SideNavigationComponent.propDecorators = {
    collapsed: [{ type: Input }]
};
if (false) {
    /**
     * Whether the side navigation is collapsed.
     * @type {?}
     */
    SideNavigationComponent.prototype.collapsed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaWRlLW5hdmlnYXRpb24vc2lkZS1uYXZpZ2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBV3BFLE1BQU0sT0FBTyx1QkFBdUI7SUFMcEM7Ozs7UUFRYSxjQUFTLEdBQVksS0FBSyxDQUFDO0lBQ3hDLENBQUM7OztZQVRBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsd0lBQStDO2dCQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7O3dCQUlJLEtBQUs7Ozs7Ozs7SUFBTiw0Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBzaWRlLW5hdmlnYXRpb24gaXMgYSB3cmFwcGluZyBjb21wb25lbnQgcmVwcmVzZW50aW5nXG4gKiBhIGxlZnQgbmF2aWdhdGlvbiB0aGF0IGNhbiBhbHdheXMgZGlzcGxheSBvciBleHBhbmQvY29sbGFwc2UgdXNpbmcgdGhlIG1lbnUgaWNvbiB3aXRoaW4gdGhlIGdsb2JhbCBuYXZpZ2F0aW9uLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXNpZGUtbmF2JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2lkZS1uYXZpZ2F0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFNpZGVOYXZpZ2F0aW9uQ29tcG9uZW50IHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBzaWRlIG5hdmlnYXRpb24gaXMgY29sbGFwc2VkLiAqL1xuICAgIEBJbnB1dCgpIGNvbGxhcHNlZDogYm9vbGVhbiA9IGZhbHNlO1xufVxuIl19