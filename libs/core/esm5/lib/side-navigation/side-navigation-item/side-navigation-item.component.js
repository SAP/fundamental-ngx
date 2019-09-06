/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { SideNavigationLinkDirective } from '../side-navigation-link/side-navigation-link.directive';
import { SideNavigationSublistDirective } from '../side-navigation-sublist/side-navigation-sublist.directive';
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
var SideNavigationItemComponent = /** @class */ (function () {
    function SideNavigationItemComponent() {
    }
    /**
     * @return {?}
     */
    SideNavigationItemComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.linkElement && this.subListElement) {
            /** After view content check if there is flag with opened true */
            this.subListElement.subListIsOpenChange(this.linkElement.sublistIsOpen);
            this.subListOpenChanged$ = this.linkElement.onSubListOpenChange.subscribe((/**
             * @param {?} isOpen
             * @return {?}
             */
            function (isOpen) {
                _this.subListElement.subListIsOpenChange(isOpen);
            }));
        }
    };
    /**
     * @return {?}
     */
    SideNavigationItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.subListOpenChanged$) {
            this.subListOpenChanged$.unsubscribe();
        }
    };
    SideNavigationItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-side-nav-item',
                    template: "<div class=\"fd-side-nav__item\">\n  <ng-content select=\"[fd-side-nav-link]\"></ng-content>\n  <ng-content select=\"[fd-side-nav-sublist]\"></ng-content>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    SideNavigationItemComponent.propDecorators = {
        linkElement: [{ type: ContentChild, args: [SideNavigationLinkDirective,] }],
        subListElement: [{ type: ContentChild, args: [SideNavigationSublistDirective,] }]
    };
    return SideNavigationItemComponent;
}());
export { SideNavigationItemComponent };
if (false) {
    /** @type {?} */
    SideNavigationItemComponent.prototype.linkElement;
    /** @type {?} */
    SideNavigationItemComponent.prototype.subListElement;
    /**
     * \@Hidden
     * @type {?}
     */
    SideNavigationItemComponent.prototype.subListOpenChanged$;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NpZGUtbmF2aWdhdGlvbi9zaWRlLW5hdmlnYXRpb24taXRlbS9zaWRlLW5hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLFlBQVksRUFBYSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUVyRyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCOUc7SUFBQTtJQTRCQSxDQUFDOzs7O0lBaEJVLHdEQUFrQjs7O0lBQXpCO1FBQUEsaUJBUUM7UUFQRyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN6QyxpRUFBaUU7WUFDakUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3hFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFNBQVM7Ozs7WUFBQyxVQUFBLE1BQU07Z0JBQzVFLEtBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7SUFFRCxpREFBVzs7O0lBQVg7UUFDSSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsRUFBRTtZQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7SUFDTCxDQUFDOztnQkExQkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLGdMQUFvRDtvQkFDcEQsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzs7OEJBRUksWUFBWSxTQUFDLDJCQUEyQjtpQ0FDeEMsWUFBWSxTQUFDLDhCQUE4Qjs7SUFxQmhELGtDQUFDO0NBQUEsQUE1QkQsSUE0QkM7U0F2QlksMkJBQTJCOzs7SUFDcEMsa0RBQW9GOztJQUNwRixxREFBNkY7Ozs7O0lBRzdGLDBEQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBPbkRlc3Ryb3ksIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaWRlTmF2aWdhdGlvbkxpbmtEaXJlY3RpdmUgfSBmcm9tICcuLi9zaWRlLW5hdmlnYXRpb24tbGluay9zaWRlLW5hdmlnYXRpb24tbGluay5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTaWRlTmF2aWdhdGlvblN1Ymxpc3REaXJlY3RpdmUgfSBmcm9tICcuLi9zaWRlLW5hdmlnYXRpb24tc3VibGlzdC9zaWRlLW5hdmlnYXRpb24tc3VibGlzdC5kaXJlY3RpdmUnO1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgdGhhdCByZXByZXNlbnRzIGEgbmF2aWdhdGlvbiBncm91cC5cbiAqIGBgYGh0bWxcbiAqIDxmZC1zaWRlLW5hdj5cbiAqICAgIDxmZC1zaWRlLW5hdi1ncm91cD5cbiAqICAgICAgICA8aDEgZmQtc2lkZS1uYXYtdGl0bGU+R3JvdXAgTmFtZTwvaDE+XG4gKiAgICAgICAgICA8ZGl2IGZkLXNpZGUtbmF2LWxpc3Q+XG4gKiAgICAgICAgICAgICA8ZmQtc2lkZS1uYXYtaXRlbT5cbiAqICAgICAgICAgICAgICAgIDxhIGZkLXNpZGUtbmF2LWxpbmsgW2F0dHIuaHJlZl09XCInIydcIj5MaW5rIEl0ZW08L2E+XG4gKiAgICAgICAgICAgICA8L2ZkLXNpZGUtbmF2LWl0ZW0+XG4gKiAgICAgICAgICA8L2Rpdj4+XG4gKiAgICA8L2ZkLXNpZGUtbmF2LWdyb3VwPlxuICogPC9mZC1zaWRlLW5hdj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXNpZGUtbmF2LWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zaWRlLW5hdmlnYXRpb24taXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTaWRlTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBDb250ZW50Q2hpbGQoU2lkZU5hdmlnYXRpb25MaW5rRGlyZWN0aXZlKSBsaW5rRWxlbWVudDogU2lkZU5hdmlnYXRpb25MaW5rRGlyZWN0aXZlO1xuICAgIEBDb250ZW50Q2hpbGQoU2lkZU5hdmlnYXRpb25TdWJsaXN0RGlyZWN0aXZlKSBzdWJMaXN0RWxlbWVudDogU2lkZU5hdmlnYXRpb25TdWJsaXN0RGlyZWN0aXZlO1xuXG4gICAgLyoqIEBIaWRkZW4gKi9cbiAgICBzdWJMaXN0T3BlbkNoYW5nZWQkOiBTdWJzY3JpcHRpb247XG5cbiAgICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5saW5rRWxlbWVudCAmJiB0aGlzLnN1Ykxpc3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvKiogQWZ0ZXIgdmlldyBjb250ZW50IGNoZWNrIGlmIHRoZXJlIGlzIGZsYWcgd2l0aCBvcGVuZWQgdHJ1ZSAqL1xuICAgICAgICAgICAgdGhpcy5zdWJMaXN0RWxlbWVudC5zdWJMaXN0SXNPcGVuQ2hhbmdlKHRoaXMubGlua0VsZW1lbnQuc3VibGlzdElzT3Blbik7XG4gICAgICAgICAgICB0aGlzLnN1Ykxpc3RPcGVuQ2hhbmdlZCQgPSB0aGlzLmxpbmtFbGVtZW50Lm9uU3ViTGlzdE9wZW5DaGFuZ2Uuc3Vic2NyaWJlKGlzT3BlbiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJMaXN0RWxlbWVudC5zdWJMaXN0SXNPcGVuQ2hhbmdlKGlzT3Blbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJMaXN0T3BlbkNoYW5nZWQkKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ykxpc3RPcGVuQ2hhbmdlZCQudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19