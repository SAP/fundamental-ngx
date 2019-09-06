/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef } from '@angular/core';
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
export class SideNavigationSublistDirective {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.sublistIsOpen = false;
    }
    /**
     * @param {?} sublistIsOpen
     * @return {?}
     */
    subListIsOpenChange(sublistIsOpen) {
        this.sublistIsOpen = sublistIsOpen;
        this.elementRef.nativeElement.setAttribute('aria-hidden', !this.sublistIsOpen);
    }
}
SideNavigationSublistDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-side-nav-sublist]',
                host: {
                    class: 'fd-side-nav__sublist'
                }
            },] }
];
/** @nocollapse */
SideNavigationSublistDirective.ctorParameters = () => [
    { type: ElementRef }
];
if (false) {
    /** @type {?} */
    SideNavigationSublistDirective.prototype.sublistIsOpen;
    /**
     * @type {?}
     * @private
     */
    SideNavigationSublistDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLXN1Ymxpc3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NpZGUtbmF2aWdhdGlvbi9zaWRlLW5hdmlnYXRpb24tc3VibGlzdC9zaWRlLW5hdmlnYXRpb24tc3VibGlzdC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FBdUJ0RCxNQUFNLE9BQU8sOEJBQThCOzs7OztJQVN2QyxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBUm5DLGtCQUFhLEdBQVksS0FBSyxDQUFDO0lBUU8sQ0FBQzs7Ozs7SUFOdkMsbUJBQW1CLENBQUMsYUFBc0I7UUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuRixDQUFDOzs7WUFiSixTQUFTLFNBQUM7O2dCQUVQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLElBQUksRUFBRTtvQkFDRixLQUFLLEVBQUUsc0JBQXNCO2lCQUNoQzthQUNKOzs7O1lBdEJtQixVQUFVOzs7O0lBd0IxQix1REFBc0M7Ozs7O0lBUTFCLG9EQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIG5hdmlnYXRpb24gZ3JvdXAuXG4gKiBgYGBodG1sXG4gKiA8ZmQtc2lkZS1uYXY+XG4gKiAgICA8ZmQtc2lkZS1uYXYtZ3JvdXA+XG4gKiAgICAgICAgPGgxIGZkLXNpZGUtbmF2LXRpdGxlPkdyb3VwIE5hbWU8L2gxPlxuICogICAgICAgICAgPGRpdiBmZC1zaWRlLW5hdi1saXN0PlxuICogICAgICAgICAgICAgPGZkLXNpZGUtbmF2LWl0ZW0+XG4gKiAgICAgICAgICAgICAgICA8YSBmZC1zaWRlLW5hdi1saW5rIFthdHRyLmhyZWZdPVwiJyMnXCI+TGluayBJdGVtPC9hPlxuICogICAgICAgICAgICAgPC9mZC1zaWRlLW5hdi1pdGVtPlxuICogICAgICAgICAgPC9kaXY+PlxuICogICAgPC9mZC1zaWRlLW5hdi1ncm91cD5cbiAqIDwvZmQtc2lkZS1uYXY+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXNpZGUtbmF2LXN1Ymxpc3RdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAnZmQtc2lkZS1uYXZfX3N1Ymxpc3QnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlTmF2aWdhdGlvblN1Ymxpc3REaXJlY3RpdmUge1xuICAgIHB1YmxpYyBzdWJsaXN0SXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwdWJsaWMgc3ViTGlzdElzT3BlbkNoYW5nZShzdWJsaXN0SXNPcGVuOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuc3VibGlzdElzT3BlbiA9IHN1Ymxpc3RJc09wZW47XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAhdGhpcy5zdWJsaXN0SXNPcGVuKTtcbiAgICB9XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge31cbn1cbiJdfQ==