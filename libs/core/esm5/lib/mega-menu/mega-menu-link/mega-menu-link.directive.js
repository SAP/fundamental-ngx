/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
/**
 *  Directive represents mega menu link.
 *  ```html
 * <a fd-mega-menu-link href="#">Link</a>
 *  ```
 *
 */
var MegaMenuLinkDirective = /** @class */ (function () {
    /** @hidden */
    function MegaMenuLinkDirective(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMegaMenuClass = true;
        /**
         * @hidden
         */
        this.hasChild = false;
        /**
         * @hidden
         */
        this.isExpanded = false;
    }
    /**
     * @return {?}
     */
    MegaMenuLinkDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MegaMenuLinkDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.click();
    };
    MegaMenuLinkDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-mega-menu-link]',
                    host: {
                        'tabindex': '0'
                    }
                },] }
    ];
    /** @nocollapse */
    MegaMenuLinkDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MegaMenuLinkDirective.propDecorators = {
        fdMegaMenuClass: [{ type: HostBinding, args: ['class.fd-mega-menu__link',] }],
        hasChild: [{ type: Input }, { type: HostBinding, args: ['class.has-child',] }, { type: HostBinding, args: ['attr.aria-haspopup',] }],
        isExpanded: [{ type: Input }, { type: HostBinding, args: ['attr.aria-expanded',] }]
    };
    return MegaMenuLinkDirective;
}());
export { MegaMenuLinkDirective };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuLinkDirective.prototype.fdMegaMenuClass;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuLinkDirective.prototype.hasChild;
    /**
     * @hidden
     * @type {?}
     */
    MegaMenuLinkDirective.prototype.isExpanded;
    /** @type {?} */
    MegaMenuLinkDirective.prototype.itemEl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVnYS1tZW51LWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21lZ2EtbWVudS9tZWdhLW1lbnUtbGluay9tZWdhLW1lbnUtbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBUTFFO0lBdUJJLGNBQWM7SUFDZCwrQkFBb0IsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTs7OztRQWR0QyxvQkFBZSxHQUFZLElBQUksQ0FBQzs7OztRQU1oQyxhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBSzFCLGVBQVUsR0FBWSxLQUFLLENBQUM7SUFHYSxDQUFDOzs7O0lBRW5DLHFDQUFLOzs7SUFBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFTSxxQ0FBSzs7O0lBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QyxDQUFDOztnQkFoQ0osU0FBUyxTQUFDOztvQkFFUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixJQUFJLEVBQUU7d0JBQ0YsVUFBVSxFQUFFLEdBQUc7cUJBQ2xCO2lCQUNKOzs7O2dCQWRtQixVQUFVOzs7a0NBaUJ6QixXQUFXLFNBQUMsMEJBQTBCOzJCQUl0QyxLQUFLLFlBQ0wsV0FBVyxTQUFDLGlCQUFpQixjQUM3QixXQUFXLFNBQUMsb0JBQW9COzZCQUloQyxLQUFLLFlBQ0wsV0FBVyxTQUFDLG9CQUFvQjs7SUFhckMsNEJBQUM7Q0FBQSxBQWpDRCxJQWlDQztTQTFCWSxxQkFBcUI7Ozs7OztJQUU5QixnREFDZ0M7Ozs7O0lBR2hDLHlDQUcwQjs7Ozs7SUFHMUIsMkNBRTRCOztJQUdmLHVDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogIERpcmVjdGl2ZSByZXByZXNlbnRzIG1lZ2EgbWVudSBsaW5rLlxuICogIGBgYGh0bWxcbiAqIDxhIGZkLW1lZ2EtbWVudS1saW5rIGhyZWY9XCIjXCI+TGluazwvYT5cbiAqICBgYGBcbiAqICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtbWVnYS1tZW51LWxpbmtdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICd0YWJpbmRleCc6ICcwJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgTWVnYU1lbnVMaW5rRGlyZWN0aXZlIHtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtbWVnYS1tZW51X19saW5rJylcbiAgICBmZE1lZ2FNZW51Q2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuaGFzLWNoaWxkJylcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1oYXNwb3B1cCcpXG4gICAgaGFzQ2hpbGQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1leHBhbmRlZCcpXG4gICAgaXNFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGl0ZW1FbDogRWxlbWVudFJlZikge31cblxuICAgIHB1YmxpYyBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtRWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtRWwubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cbn1cbiJdfQ==