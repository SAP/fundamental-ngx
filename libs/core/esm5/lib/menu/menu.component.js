/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, ViewEncapsulation, Input } from '@angular/core';
/**
 * The component that represents a menu.
 */
var MenuComponent = /** @class */ (function () {
    function MenuComponent() {
        /**
         * @hidden
         */
        this.fdMenuClass = true;
        /**
         * The separator line for each menu item. When set to true, it adds a separator below each menu item in the list.
         * False by default. Leave empty for default.
         */
        this.separator = false;
    }
    MenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-menu',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: [".fd-menu__item:focus{outline:var(--fd-color-action-focus) dotted 1px}"]
                }] }
    ];
    MenuComponent.propDecorators = {
        fdMenuClass: [{ type: HostBinding, args: ['class.fd-menu',] }],
        separator: [{ type: Input }, { type: HostBinding, args: ['class.fd-menu__list--separated',] }]
    };
    return MenuComponent;
}());
export { MenuComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    MenuComponent.prototype.fdMenuClass;
    /**
     * The separator line for each menu item. When set to true, it adds a separator below each menu item in the list.
     * False by default. Leave empty for default.
     * @type {?}
     */
    MenuComponent.prototype.separator;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbWVudS9tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBRSxXQUFXLEVBQ3RCLGlCQUFpQixFQUNqQixLQUFLLEVBQ1IsTUFBTSxlQUFlLENBQUM7Ozs7QUFLdkI7SUFBQTs7OztRQVNJLGdCQUFXLEdBQVksSUFBSSxDQUFDOzs7OztRQU01QixjQUFTLEdBQVksS0FBSyxDQUFDO0lBRS9CLENBQUM7O2dCQWpCQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLHVDQUFvQztvQkFDcEMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUV4Qzs7OzhCQUdJLFdBQVcsU0FBQyxlQUFlOzRCQUszQixLQUFLLFlBQ0wsV0FBVyxTQUFDLGdDQUFnQzs7SUFHakQsb0JBQUM7Q0FBQSxBQWpCRCxJQWlCQztTQVhZLGFBQWE7Ozs7OztJQUV0QixvQ0FDNEI7Ozs7OztJQUk1QixrQ0FFMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgSW5wdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYSBtZW51LlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLW1lbnUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWydtZW51LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWVudUNvbXBvbmVudCB7XG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW1lbnUnKVxuICAgIGZkTWVudUNsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIC8qKiBUaGUgc2VwYXJhdG9yIGxpbmUgZm9yIGVhY2ggbWVudSBpdGVtLiBXaGVuIHNldCB0byB0cnVlLCBpdCBhZGRzIGEgc2VwYXJhdG9yIGJlbG93IGVhY2ggbWVudSBpdGVtIGluIHRoZSBsaXN0LiBcbiAgICAgKiBGYWxzZSBieSBkZWZhdWx0LiBMZWF2ZSBlbXB0eSBmb3IgZGVmYXVsdC4gKi9cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtbWVudV9fbGlzdC0tc2VwYXJhdGVkJylcbiAgICBzZXBhcmF0b3I6IGJvb2xlYW4gPSBmYWxzZTtcblxufVxuIl19