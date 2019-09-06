/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation } from '@angular/core';
/**
 * The component that represents a navigation group.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *             <fd-side-nav-item>
 *                <a fd-side-nav-link [attr.href]="'#'">Link Item</a>
 *             </fd-side-nav-item>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
var SideNavigationGroupComponent = /** @class */ (function () {
    function SideNavigationGroupComponent() {
    }
    SideNavigationGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-side-nav-group',
                    template: "<div class=\"fd-side-nav__group\">\n  <ng-content></ng-content>\n  <ng-content select=\"[fd-side-nav-list]\"></ng-content>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return SideNavigationGroupComponent;
}());
export { SideNavigationGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaWRlLW5hdmlnYXRpb24vc2lkZS1uYXZpZ2F0aW9uLWdyb3VwL3NpZGUtbmF2aWdhdGlvbi1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQjdEO0lBQUE7SUFLNEMsQ0FBQzs7Z0JBTDVDLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixnSkFBcUQ7b0JBQ3JELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7SUFDMkMsbUNBQUM7Q0FBQSxBQUw3QyxJQUs2QztTQUFoQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYSBuYXZpZ2F0aW9uIGdyb3VwLlxuICogYGBgaHRtbFxuICogPGZkLXNpZGUtbmF2PlxuICogICAgPGZkLXNpZGUtbmF2LWdyb3VwPlxuICogICAgICAgIDxoMSBmZC1zaWRlLW5hdi10aXRsZT5Hcm91cCBOYW1lPC9oMT5cbiAqICAgICAgICAgIDxkaXYgZmQtc2lkZS1uYXYtbGlzdD5cbiAqICAgICAgICAgICAgIDxmZC1zaWRlLW5hdi1pdGVtPlxuICogICAgICAgICAgICAgICAgPGEgZmQtc2lkZS1uYXYtbGluayBbYXR0ci5ocmVmXT1cIicjJ1wiPkxpbmsgSXRlbTwvYT5cbiAqICAgICAgICAgICAgIDwvZmQtc2lkZS1uYXYtaXRlbT5cbiAqICAgICAgICAgIDwvZGl2Pj5cbiAqICAgIDwvZmQtc2lkZS1uYXYtZ3JvdXA+XG4gKiA8L2ZkLXNpZGUtbmF2PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtc2lkZS1uYXYtZ3JvdXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zaWRlLW5hdmlnYXRpb24tZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU2lkZU5hdmlnYXRpb25Hcm91cENvbXBvbmVudCB7IH1cbiJdfQ==