/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, HostBinding } from '@angular/core';
/**
 * The directive that represents a menu item.
 */
export class MenuItemDirective {
    /**
     * @hidden
     * @param {?} itemEl
     */
    constructor(itemEl) {
        this.itemEl = itemEl;
        /**
         * @hidden
         */
        this.fdMenuItemClass = true;
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
MenuItemDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-menu-item]',
            },] }
];
/** @nocollapse */
MenuItemDirective.ctorParameters = () => [
    { type: ElementRef }
];
MenuItemDirective.propDecorators = {
    fdMenuItemClass: [{ type: HostBinding, args: ['class.fd-menu__item',] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MenuItemDirective.prototype.fdMenuItemClass;
    /** @type {?} */
    MenuItemDirective.prototype.itemEl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tZW51L21lbnUtaXRlbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVduRSxNQUFNLE9BQU8saUJBQWlCOzs7OztJQU8xQixZQUFvQixNQUFrQjtRQUFsQixXQUFNLEdBQU4sTUFBTSxDQUFZOzs7O1FBSHRDLG9CQUFlLEdBQVksSUFBSSxDQUFDO0lBR1MsQ0FBQzs7OztJQUVuQyxLQUFLO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDdEMsQ0FBQzs7OztJQUVNLEtBQUs7UUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7WUFwQkosU0FBUyxTQUFDOzs7Z0JBR1AsUUFBUSxFQUFFLGdCQUFnQjthQUM3Qjs7OztZQVZtQixVQUFVOzs7OEJBY3pCLFdBQVcsU0FBQyxxQkFBcUI7Ozs7Ozs7SUFBbEMsNENBQ2dDOztJQUduQixtQ0FBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZWZhdWx0TWVudUl0ZW0gfSBmcm9tICcuL2RlZmF1bHQtbWVudS1pdGVtJztcblxuLyoqXG4gKiBUaGUgZGlyZWN0aXZlIHRoYXQgcmVwcmVzZW50cyBhIG1lbnUgaXRlbS5cbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gVE9ETyB0byBiZSBkaXNjdXNzZWRcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtbWVudS1pdGVtXScsXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVJdGVtRGlyZWN0aXZlIGltcGxlbWVudHMgRGVmYXVsdE1lbnVJdGVtIHtcblxuICAgIC8qKiBAaGlkZGVuKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW1lbnVfX2l0ZW0nKVxuICAgIGZkTWVudUl0ZW1DbGFzczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgaXRlbUVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgcHVibGljIGZvY3VzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1FbC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLml0ZW1FbC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxufVxuIl19