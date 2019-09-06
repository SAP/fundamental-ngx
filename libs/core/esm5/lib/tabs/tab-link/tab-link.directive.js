/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../../utils/abstract-fd-ngx-class';
/**
 * Tab link for nav mode
 *
 * ```html
 * <a fd-tab-link>
 *    link
 * </a>
 * ```
 */
var TabLinkDirective = /** @class */ (function (_super) {
    tslib_1.__extends(TabLinkDirective, _super);
    /** @hidden */
    function TabLinkDirective(elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.elementRef = elementRef;
        return _this;
    }
    /** @hidden */
    /**
     * @hidden
     * @return {?}
     */
    TabLinkDirective.prototype._setProperties = /**
     * @hidden
     * @return {?}
     */
    function () {
        this._addClassToElement('fd-tabs__link');
        if (this.active) {
            this._addClassToElement('is-selected');
        }
    };
    TabLinkDirective.decorators = [
        { type: Directive, args: [{
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-tab-link]',
                    host: {
                        'role': 'tab',
                    }
                },] }
    ];
    /** @nocollapse */
    TabLinkDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    TabLinkDirective.propDecorators = {
        active: [{ type: Input }, { type: HostBinding, args: ['attr.aria-selected',] }],
        disabled: [{ type: Input }, { type: HostBinding, args: ['attr.aria-disabled',] }]
    };
    return TabLinkDirective;
}(AbstractFdNgxClass));
export { TabLinkDirective };
if (false) {
    /**
     * Whether the link is active
     * @type {?}
     */
    TabLinkDirective.prototype.active;
    /**
     * Only visual / accessibility thing on tab-nav mode
     * RouterLink does not respect preventDefault/stopPropagation
     * @type {?}
     */
    TabLinkDirective.prototype.disabled;
    /** @type {?} */
    TabLinkDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3RhYnMvdGFiLWxpbmsvdGFiLWxpbmsuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Ozs7OztBQVl2RTtJQU9zQyw0Q0FBa0I7SUF1QnBELGNBQWM7SUFDZCwwQkFBbUIsVUFBc0I7UUFBekMsWUFDSSxrQkFBTSxVQUFVLENBQUMsU0FDcEI7UUFGa0IsZ0JBQVUsR0FBVixVQUFVLENBQVk7O0lBRXpDLENBQUM7SUFYRCxjQUFjOzs7OztJQUNkLHlDQUFjOzs7O0lBQWQ7UUFDSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7Z0JBNUJKLFNBQVMsU0FBQzs7b0JBRVAsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLElBQUksRUFBRTt3QkFDRixNQUFNLEVBQUUsS0FBSztxQkFDaEI7aUJBQ0o7Ozs7Z0JBbkJtQixVQUFVOzs7eUJBdUJ6QixLQUFLLFlBQ0wsV0FBVyxTQUFDLG9CQUFvQjsyQkFPaEMsS0FBSyxZQUNMLFdBQVcsU0FBQyxvQkFBb0I7O0lBZ0JyQyx1QkFBQztDQUFBLEFBbkNELENBT3NDLGtCQUFrQixHQTRCdkQ7U0E1QlksZ0JBQWdCOzs7Ozs7SUFHekIsa0NBRWdCOzs7Ozs7SUFNaEIsb0NBRWtCOztJQVdOLHNDQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi8uLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIFRhYiBsaW5rIGZvciBuYXYgbW9kZVxuICpcbiAqIGBgYGh0bWxcbiAqIDxhIGZkLXRhYi1saW5rPlxuICogICAgbGlua1xuICogPC9hPlxuICogYGBgXG4gKi9cblxuQERpcmVjdGl2ZSh7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLXRhYi1saW5rXScsXG4gICAgaG9zdDoge1xuICAgICAgICAncm9sZSc6ICd0YWInLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFiTGlua0RpcmVjdGl2ZSBleHRlbmRzIEFic3RyYWN0RmROZ3hDbGFzcyB7XG5cbiAgICAvKiogV2hldGhlciB0aGUgbGluayBpcyBhY3RpdmUgKi9cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXNlbGVjdGVkJylcbiAgICBhY3RpdmU6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBPbmx5IHZpc3VhbCAvIGFjY2Vzc2liaWxpdHkgdGhpbmcgb24gdGFiLW5hdiBtb2RlXG4gICAgICogUm91dGVyTGluayBkb2VzIG5vdCByZXNwZWN0IHByZXZlbnREZWZhdWx0L3N0b3BQcm9wYWdhdGlvblxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGlzYWJsZWQnKVxuICAgIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXRhYnNfX2xpbmsnKTtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRDbGFzc1RvRWxlbWVudCgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudFJlZik7XG4gICAgfVxuXG59XG4iXX0=