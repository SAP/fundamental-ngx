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
var MegaMenuSublinkDirective = /** @class */ (function () {
    /** @hidden */
    function MegaMenuSublinkDirective(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
    }
    /**
     * @return {?}
     */
    MegaMenuSublinkDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MegaMenuSublinkDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.click();
    };
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
    MegaMenuSublinkDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MegaMenuSublinkDirective.propDecorators = {
        fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__sublink',] }]
    };
    return MegaMenuSublinkDirective;
}());
export { MegaMenuSublinkDirective };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuSublinkDirective.prototype.fdMegaMenuClass;
    /** @type {?} */
    MegaMenuSublinkDirective.prototype.itemEl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LXN1YmxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lZ2EtbWVudS9tZWdhLW1lbnUtc3VibGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFRbkU7SUFZSSxjQUFjO0lBQ2Qsa0NBQW9CLE1BQWtCO1FBQWxCLFdBQU0sR0FBTixNQUFNLENBQVk7Ozs7UUFIdEMsb0JBQWUsR0FBWSxJQUFJLENBQUM7SUFHUyxDQUFDOzs7O0lBRW5DLHdDQUFLOzs7SUFBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFTSx3Q0FBSzs7O0lBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztnQkFyQkosU0FBUyxTQUFDOztvQkFFUCxRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxJQUFJLEVBQUU7d0JBQ0YsVUFBVSxFQUFFLEdBQUc7cUJBQ2xCO2lCQUNKOzs7O2dCQWRtQixVQUFVOzs7a0NBaUJ6QixXQUFXLFNBQUMsNkJBQTZCOztJQWE5QywrQkFBQztDQUFBLEFBdEJELElBc0JDO1NBZlksd0JBQXdCOzs7Ozs7SUFFakMsbURBQ2dDOztJQUduQiwwQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogIERpcmVjdGl2ZSByZXByZXNlbnRzIG1lZ2EgbWVudSBzdWIgbGluay5cbiAqICBgYGBodG1sXG4gKiA8YSBmZC1tZWdhLW1lbnUtc3VibGluayBocmVmPVwiI1wiPkxpbms8L2E+XG4gKiAgYGBgXG4gKiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLW1lZ2EtbWVudS1zdWJsaW5rXScsXG4gICAgaG9zdDoge1xuICAgICAgICAndGFiaW5kZXgnOiAnMCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIE1lZ2FNZW51U3VibGlua0RpcmVjdGl2ZSB7XG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW1lZ2EtbWVudV9fc3VibGluaycpXG4gICAgZmRNZWdhTWVudUNsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyBpdGVtRWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgICBwdWJsaWMgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbUVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xpY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbUVsLm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG59XG4iXX0=