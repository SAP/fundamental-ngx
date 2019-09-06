/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ViewEncapsulation } from '@angular/core';
/**
 *  Component represents mega menu group, which contains list with menu items.
 *  ```html
 *  <fd-mega-menu-group>
 *      <h3 fd-mega-menu-title>Title 1</h3>
 *      <ul fd-mega-menu-list>
 *          <fd-mega-menu-item>
 *              <a fd-mega-menu-link>Item 0</a>
 *              <li fd-mega-menu-subitem>
 *                 <a fd-mega-menu-sublink>Sub Item 1</a>
 *            </li>
 *              <li fd-mega-menu-subitem>
 *                <a fd-mega-menu-sublink>Sub Item 2</a>
 *           </li>
 *             <li fd-mega-menu-subitem>
 *                  <a fd-mega-menu-sublink>Sub Item 3</a>
 *             </li>
 *          </fd-mega-menu-item>
 *      </ul>
 *  </fd-mega-menu-group>
 *  ```
 *
 */
var MegaMenuGroupComponent = /** @class */ (function () {
    function MegaMenuGroupComponent() {
    }
    MegaMenuGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-mega-menu-group',
                    template: "<div class=\"fd-mega-menu__group\">\n    <ng-content select=\"[fd-mega-menu-title]\"></ng-content>\n    <ng-content select=\"[fd-mega-menu-list]\"></ng-content>\n</div>\n<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    return MegaMenuGroupComponent;
}());
export { MegaMenuGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LWdyb3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZWdhLW1lbnUvbWVnYS1tZW51LWdyb3VwL21lZ2EtbWVudS1ncm91cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCN0Q7SUFBQTtJQU1xQyxDQUFDOztnQkFOckMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLGlOQUErQztvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBRXhDOztJQUNvQyw2QkFBQztDQUFBLEFBTnRDLElBTXNDO1NBQXpCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiAgQ29tcG9uZW50IHJlcHJlc2VudHMgbWVnYSBtZW51IGdyb3VwLCB3aGljaCBjb250YWlucyBsaXN0IHdpdGggbWVudSBpdGVtcy5cbiAqICBgYGBodG1sXG4gKiAgPGZkLW1lZ2EtbWVudS1ncm91cD5cbiAqICAgICAgPGgzIGZkLW1lZ2EtbWVudS10aXRsZT5UaXRsZSAxPC9oMz5cbiAqICAgICAgPHVsIGZkLW1lZ2EtbWVudS1saXN0PlxuICogICAgICAgICAgPGZkLW1lZ2EtbWVudS1pdGVtPlxuICogICAgICAgICAgICAgIDxhIGZkLW1lZ2EtbWVudS1saW5rPkl0ZW0gMDwvYT5cbiAqICAgICAgICAgICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICAgICAgICAgPGEgZmQtbWVnYS1tZW51LXN1Ymxpbms+U3ViIEl0ZW0gMTwvYT5cbiAqICAgICAgICAgICAgPC9saT5cbiAqICAgICAgICAgICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICAgICAgICA8YSBmZC1tZWdhLW1lbnUtc3VibGluaz5TdWIgSXRlbSAyPC9hPlxuICogICAgICAgICAgIDwvbGk+XG4gKiAgICAgICAgICAgICA8bGkgZmQtbWVnYS1tZW51LXN1Yml0ZW0+XG4gKiAgICAgICAgICAgICAgICAgIDxhIGZkLW1lZ2EtbWVudS1zdWJsaW5rPlN1YiBJdGVtIDM8L2E+XG4gKiAgICAgICAgICAgICA8L2xpPlxuICogICAgICAgICAgPC9mZC1tZWdhLW1lbnUtaXRlbT5cbiAqICAgICAgPC91bD5cbiAqICA8L2ZkLW1lZ2EtbWVudS1ncm91cD5cbiAqICBgYGBcbiAqICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLW1lZ2EtbWVudS1ncm91cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21lZ2EtbWVudS1ncm91cC5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxuXG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51R3JvdXBDb21wb25lbnQge31cbiJdfQ==