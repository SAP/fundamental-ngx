/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding } from '@angular/core';
/**
 *  Directive represents mega menu sub link.
 *  ```html
 * <a fd-mega-menu-sublink href="#">Link</a>
 *  ```
 *
 */
export class MegaMenuSublinkDirective {
    /**
     * @hidden
     * @param {?} itemEl
     */
    constructor(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
    }
    /**
     * @return {?}
     */
    focus() {
        this.itemEl.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    click() {
        this.itemEl.nativeElement.click();
    }
}
MegaMenuSublinkDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-mega-menu-sublink]',
                host: {
                    'tabindex': '0'
                }
            },] }
];
/** @nocollapse */
MegaMenuSublinkDirective.ctorParameters = () => [
    { type: ElementRef }
];
MegaMenuSublinkDirective.propDecorators = {
    fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__sublink',] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuSublinkDirective.prototype.fdMegaMenuClass;
    /** @type {?} */
    MegaMenuSublinkDirective.prototype.itemEl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LXN1YmxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lZ2EtbWVudS9tZWdhLW1lbnUtc3VibGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFlbkUsTUFBTSxPQUFPLHdCQUF3Qjs7Ozs7SUFNakMsWUFBb0IsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTs7OztRQUh0QyxvQkFBZSxHQUFZLElBQUksQ0FBQztJQUdTLENBQUM7Ozs7SUFFbkMsS0FBSztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFTSxLQUFLO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7O1lBckJKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsSUFBSSxFQUFFO29CQUNGLFVBQVUsRUFBRSxHQUFHO2lCQUNsQjthQUNKOzs7O1lBZG1CLFVBQVU7Ozs4QkFpQnpCLFdBQVcsU0FBQyw2QkFBNkI7Ozs7Ozs7SUFBMUMsbURBQ2dDOztJQUduQiwwQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogIERpcmVjdGl2ZSByZXByZXNlbnRzIG1lZ2EgbWVudSBzdWIgbGluay5cbiAqICBgYGBodG1sXG4gKiA8YSBmZC1tZWdhLW1lbnUtc3VibGluayBocmVmPVwiI1wiPkxpbms8L2E+XG4gKiAgYGBgXG4gKiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLW1lZ2EtbWVudS1zdWJsaW5rXScsXG4gICAgaG9zdDoge1xuICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51U3VibGlua0RpcmVjdGl2ZSB7XG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW1lZ2EtbWVudV9fc3VibGluaycpXG4gICAgZmRNZWdhTWVudUNsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBpdGVtRWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbUVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbUVsLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG59XG4iXX0=