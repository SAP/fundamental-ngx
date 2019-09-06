/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive } from '@angular/core';
/**
 * The component that represents a sub item.
 * ```html
 * <fd-side-nav>
 *    <fd-side-nav-group>
 *        <h1 fd-side-nav-title>Group Name</h1>
 *          <div fd-side-nav-list>
 *            <a fd-side-nav-link>Link Item</a>
 *                <div fd-side-nav-sublist>
 *                    <div fd-side-nav-subitem>
 *                        <a fd-side-nav-sublink [attr.href]="'#'">Link Item</a>
 *                    </div>
 *                    <div fd-side-nav-subitem>
 *                        <a fd-side-nav-sublink [routerLink]="'#'">Link Item</a>
 *                    </div>
 *              </div>
 *          </div>>
 *    </fd-side-nav-group>
 * </fd-side-nav>
 * ```
 */
var SideNavigationSubitemDirective = /** @class */ (function () {
    function SideNavigationSubitemDirective() {
    }
    SideNavigationSubitemDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-side-nav-subitem]',
                    host: {
                        class: 'fd-side-nav__subitem'
                    }
                },] }
    ];
    return SideNavigationSubitemDirective;
}());
export { SideNavigationSubitemDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLXN1Yml0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NpZGUtbmF2aWdhdGlvbi9zaWRlLW5hdmlnYXRpb24tc3ViaXRlbS9zaWRlLW5hdmlnYXRpb24tc3ViaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QjFDO0lBQUE7SUFPNkMsQ0FBQzs7Z0JBUDdDLFNBQVMsU0FBQzs7b0JBRVAsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsSUFBSSxFQUFFO3dCQUNGLEtBQUssRUFBRSxzQkFBc0I7cUJBQ2hDO2lCQUNKOztJQUM0QyxxQ0FBQztDQUFBLEFBUDlDLElBTzhDO1NBQWpDLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGEgc3ViIGl0ZW0uXG4gKiBgYGBodG1sXG4gKiA8ZmQtc2lkZS1uYXY+XG4gKiAgICA8ZmQtc2lkZS1uYXYtZ3JvdXA+XG4gKiAgICAgICAgPGgxIGZkLXNpZGUtbmF2LXRpdGxlPkdyb3VwIE5hbWU8L2gxPlxuICogICAgICAgICAgPGRpdiBmZC1zaWRlLW5hdi1saXN0PlxuICogICAgICAgICAgICA8YSBmZC1zaWRlLW5hdi1saW5rPkxpbmsgSXRlbTwvYT5cbiAqICAgICAgICAgICAgICAgIDxkaXYgZmQtc2lkZS1uYXYtc3VibGlzdD5cbiAqICAgICAgICAgICAgICAgICAgICA8ZGl2IGZkLXNpZGUtbmF2LXN1Yml0ZW0+XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGZkLXNpZGUtbmF2LXN1YmxpbmsgW2F0dHIuaHJlZl09XCInIydcIj5MaW5rIEl0ZW08L2E+XG4gKiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gKiAgICAgICAgICAgICAgICAgICAgPGRpdiBmZC1zaWRlLW5hdi1zdWJpdGVtPlxuICogICAgICAgICAgICAgICAgICAgICAgICA8YSBmZC1zaWRlLW5hdi1zdWJsaW5rIFtyb3V0ZXJMaW5rXT1cIicjJ1wiPkxpbmsgSXRlbTwvYT5cbiAqICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgICAgICA8L2Rpdj5cbiAqICAgICAgICAgIDwvZGl2Pj5cbiAqICAgIDwvZmQtc2lkZS1uYXYtZ3JvdXA+XG4gKiA8L2ZkLXNpZGUtbmF2PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1zaWRlLW5hdi1zdWJpdGVtXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ2ZkLXNpZGUtbmF2X19zdWJpdGVtJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2lkZU5hdmlnYXRpb25TdWJpdGVtRGlyZWN0aXZlIHt9XG4iXX0=