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
export class SideNavigationItemComponent {
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this.linkElement && this.subListElement) {
            /** After view content check if there is flag with opened true */
            this.subListElement.subListIsOpenChange(this.linkElement.sublistIsOpen);
            this.subListOpenChanged$ = this.linkElement.onSubListOpenChange.subscribe((/**
             * @param {?} isOpen
             * @return {?}
             */
            isOpen => {
                this.subListElement.subListIsOpenChange(isOpen);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.subListOpenChanged$) {
            this.subListOpenChanged$.unsubscribe();
        }
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZS1uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NpZGUtbmF2aWdhdGlvbi9zaWRlLW5hdmlnYXRpb24taXRlbS9zaWRlLW5hdmlnYXRpb24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBb0IsU0FBUyxFQUFFLFlBQVksRUFBYSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4RyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUVyRyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSw4REFBOEQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQXNCOUcsTUFBTSxPQUFPLDJCQUEyQjs7OztJQU83QixrQkFBa0I7UUFDckIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDekMsaUVBQWlFO1lBQ2pFLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQy9FLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQsQ0FBQyxFQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFDO0lBQ0wsQ0FBQzs7O1lBMUJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixnTEFBb0Q7Z0JBQ3BELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3hDOzs7MEJBRUksWUFBWSxTQUFDLDJCQUEyQjs2QkFDeEMsWUFBWSxTQUFDLDhCQUE4Qjs7OztJQUQ1QyxrREFBb0Y7O0lBQ3BGLHFEQUE2Rjs7Ozs7SUFHN0YsMERBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIE9uRGVzdHJveSwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNpZGVOYXZpZ2F0aW9uTGlua0RpcmVjdGl2ZSB9IGZyb20gJy4uL3NpZGUtbmF2aWdhdGlvbi1saW5rL3NpZGUtbmF2aWdhdGlvbi1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNpZGVOYXZpZ2F0aW9uU3VibGlzdERpcmVjdGl2ZSB9IGZyb20gJy4uL3NpZGUtbmF2aWdhdGlvbi1zdWJsaXN0L3NpZGUtbmF2aWdhdGlvbi1zdWJsaXN0LmRpcmVjdGl2ZSc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYSBuYXZpZ2F0aW9uIGdyb3VwLlxuICogYGBgaHRtbFxuICogPGZkLXNpZGUtbmF2PlxuICogICAgPGZkLXNpZGUtbmF2LWdyb3VwPlxuICogICAgICAgIDxoMSBmZC1zaWRlLW5hdi10aXRsZT5Hcm91cCBOYW1lPC9oMT5cbiAqICAgICAgICAgIDxkaXYgZmQtc2lkZS1uYXYtbGlzdD5cbiAqICAgICAgICAgICAgIDxmZC1zaWRlLW5hdi1pdGVtPlxuICogICAgICAgICAgICAgICAgPGEgZmQtc2lkZS1uYXYtbGluayBbYXR0ci5ocmVmXT1cIicjJ1wiPkxpbmsgSXRlbTwvYT5cbiAqICAgICAgICAgICAgIDwvZmQtc2lkZS1uYXYtaXRlbT5cbiAqICAgICAgICAgIDwvZGl2Pj5cbiAqICAgIDwvZmQtc2lkZS1uYXYtZ3JvdXA+XG4gKiA8L2ZkLXNpZGUtbmF2PlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtc2lkZS1uYXYtaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NpZGUtbmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFNpZGVOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gICAgQENvbnRlbnRDaGlsZChTaWRlTmF2aWdhdGlvbkxpbmtEaXJlY3RpdmUpIGxpbmtFbGVtZW50OiBTaWRlTmF2aWdhdGlvbkxpbmtEaXJlY3RpdmU7XG4gICAgQENvbnRlbnRDaGlsZChTaWRlTmF2aWdhdGlvblN1Ymxpc3REaXJlY3RpdmUpIHN1Ykxpc3RFbGVtZW50OiBTaWRlTmF2aWdhdGlvblN1Ymxpc3REaXJlY3RpdmU7XG5cbiAgICAvKiogQEhpZGRlbiAqL1xuICAgIHN1Ykxpc3RPcGVuQ2hhbmdlZCQ6IFN1YnNjcmlwdGlvbjtcblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmxpbmtFbGVtZW50ICYmIHRoaXMuc3ViTGlzdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8qKiBBZnRlciB2aWV3IGNvbnRlbnQgY2hlY2sgaWYgdGhlcmUgaXMgZmxhZyB3aXRoIG9wZW5lZCB0cnVlICovXG4gICAgICAgICAgICB0aGlzLnN1Ykxpc3RFbGVtZW50LnN1Ykxpc3RJc09wZW5DaGFuZ2UodGhpcy5saW5rRWxlbWVudC5zdWJsaXN0SXNPcGVuKTtcbiAgICAgICAgICAgIHRoaXMuc3ViTGlzdE9wZW5DaGFuZ2VkJCA9IHRoaXMubGlua0VsZW1lbnQub25TdWJMaXN0T3BlbkNoYW5nZS5zdWJzY3JpYmUoaXNPcGVuID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ykxpc3RFbGVtZW50LnN1Ykxpc3RJc09wZW5DaGFuZ2UoaXNPcGVuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnN1Ykxpc3RPcGVuQ2hhbmdlZCQpIHtcbiAgICAgICAgICAgIHRoaXMuc3ViTGlzdE9wZW5DaGFuZ2VkJC51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iXX0=