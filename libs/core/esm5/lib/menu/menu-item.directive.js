/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding } from '@angular/core';
/**
 * The directive that represents a menu item.
 */
var MenuItemDirective = /** @class */ (function () {
    /** @hidden */
    function MenuItemDirective(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMenuItemClass = true;
    }
    /**
     * @return {?}
     */
    MenuItemDirective.prototype.focus = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.focus();
    };
    /**
     * @return {?}
     */
    MenuItemDirective.prototype.click = /**
     * @return {?}
     */
    function () {
        this.itemEl.nativeElement.click();
    };
    MenuItemDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-menu-item]',
                },] }
    ];
    /** @nocollapse */
    MenuItemDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    MenuItemDirective.propDecorators = {
        fdMenuItemClass: [{ type: HostBinding, args: ['class.fd-menu__item',] }]
    };
    return MenuItemDirective;
}());
export { MenuItemDirective };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MenuItemDirective.prototype.fdMenuItemClass;
    /** @type {?} */
    MenuItemDirective.prototype.itemEl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZW51L21lbnUtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQU1uRTtJQVdJLGNBQWM7SUFDZCwyQkFBb0IsTUFBa0I7UUFBbEIsV0FBTSxHQUFOLE1BQU0sQ0FBWTs7OztRQUh0QyxvQkFBZSxHQUFZLElBQUksQ0FBQztJQUdTLENBQUM7Ozs7SUFFbkMsaUNBQUs7OztJQUFaO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLGlDQUFLOzs7SUFBWjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RDLENBQUM7O2dCQXBCSixTQUFTLFNBQUM7OztvQkFHUCxRQUFRLEVBQUUsZ0JBQWdCO2lCQUM3Qjs7OztnQkFWbUIsVUFBVTs7O2tDQWN6QixXQUFXLFNBQUMscUJBQXFCOztJQWF0Qyx3QkFBQztDQUFBLEFBckJELElBcUJDO1NBaEJZLGlCQUFpQjs7Ozs7O0lBRzFCLDRDQUNnQzs7SUFHbkIsbUNBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGVmYXVsdE1lbnVJdGVtIH0gZnJvbSAnLi9kZWZhdWx0LW1lbnUtaXRlbSc7XG5cbi8qKlxuICogVGhlIGRpcmVjdGl2ZSB0aGF0IHJlcHJlc2VudHMgYSBtZW51IGl0ZW0uXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIFRPRE8gdG8gYmUgZGlzY3Vzc2VkXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLW1lbnUtaXRlbV0nLFxufSlcbmV4cG9ydCBjbGFzcyBNZW51SXRlbURpcmVjdGl2ZSBpbXBsZW1lbnRzIERlZmF1bHRNZW51SXRlbSB7XG5cbiAgICAvKiogQGhpZGRlbiovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1tZW51X19pdGVtJylcbiAgICBmZE1lbnVJdGVtQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBjb25zdHJ1Y3RvciAocHVibGljIGl0ZW1FbDogRWxlbWVudFJlZikge31cblxuICAgIHB1YmxpYyBmb2N1cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtRWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtRWwubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICAgIH1cbn1cbiJdfQ==