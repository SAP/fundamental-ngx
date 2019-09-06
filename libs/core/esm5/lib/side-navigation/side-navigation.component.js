/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The side-navigation is a wrapping component representing
 * a left navigation that can always display or expand/collapse using the menu icon within the global navigation.
 */
var SideNavigationComponent = /** @class */ (function () {
    function SideNavigationComponent() {
        /**
         * Whether the side navigation is collapsed.
         */
        this.collapsed = false;
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
    return SideNavigationComponent;
}());
export { SideNavigationComponent };
if (false) {
    /**
     * Whether the side navigation is collapsed.
     * @type {?}
     */
    SideNavigationComponent.prototype.collapsed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaWRlLW5hdmlnYXRpb24vc2lkZS1uYXZpZ2F0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBTXBFO0lBQUE7Ozs7UUFRYSxjQUFTLEdBQVksS0FBSyxDQUFDO0lBQ3hDLENBQUM7O2dCQVRBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsYUFBYTtvQkFDdkIsd0lBQStDO29CQUMvQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7Ozs0QkFJSSxLQUFLOztJQUNWLDhCQUFDO0NBQUEsQUFURCxJQVNDO1NBSlksdUJBQXVCOzs7Ozs7SUFHaEMsNENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgc2lkZS1uYXZpZ2F0aW9uIGlzIGEgd3JhcHBpbmcgY29tcG9uZW50IHJlcHJlc2VudGluZ1xuICogYSBsZWZ0IG5hdmlnYXRpb24gdGhhdCBjYW4gYWx3YXlzIGRpc3BsYXkgb3IgZXhwYW5kL2NvbGxhcHNlIHVzaW5nIHRoZSBtZW51IGljb24gd2l0aGluIHRoZSBnbG9iYWwgbmF2aWdhdGlvbi5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1zaWRlLW5hdicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NpZGUtbmF2aWdhdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlTmF2aWdhdGlvbkNvbXBvbmVudCB7XG5cbiAgICAvKiogV2hldGhlciB0aGUgc2lkZSBuYXZpZ2F0aW9uIGlzIGNvbGxhcHNlZC4gKi9cbiAgICBASW5wdXQoKSBjb2xsYXBzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbn1cbiJdfQ==