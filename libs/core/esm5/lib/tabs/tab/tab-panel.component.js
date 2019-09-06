/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { TabTitleDirective } from '../tab-utils/tab-directives';
/** @type {?} */
var tabPanelUniqueId = 0;
/**
 * Represents the body of a tab element. It also contains elements pertaining to the associated tab header.
 */
var TabPanelComponent = /** @class */ (function () {
    function TabPanelComponent() {
        /**
         * Id of the tab. If none is provided, one will be generated.
         */
        this.id = 'fd-tab-panel' + tabPanelUniqueId++;
        /**
         * @hidden
         */
        this.expanded = false;
    }
    TabPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-tab',
                    template: "<ng-container *ngIf=\"expanded\">\n  <ng-content></ng-content>\n</ng-container>\n",
                    host: {
                        role: 'tabpanel',
                        class: 'fd-tabs__panel',
                        '[attr.id]': 'id',
                        '[attr.aria-expanded]': 'expanded ? true : null',
                        '[class.is-expanded]': 'expanded'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    TabPanelComponent.propDecorators = {
        titleTemplate: [{ type: ContentChild, args: [TabTitleDirective, { read: TemplateRef },] }],
        title: [{ type: Input }],
        ariaLabel: [{ type: Input }],
        ariaLabelledBy: [{ type: Input }],
        disabled: [{ type: Input }],
        id: [{ type: Input }]
    };
    return TabPanelComponent;
}());
export { TabPanelComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    TabPanelComponent.prototype.titleTemplate;
    /**
     * The title of the tab header.
     * @type {?}
     */
    TabPanelComponent.prototype.title;
    /**
     * Aria-label of the tab. Also applied to the tab header.
     * @type {?}
     */
    TabPanelComponent.prototype.ariaLabel;
    /**
     * Id of the element that labels the tab. Also applied to the tab header.
     * @type {?}
     */
    TabPanelComponent.prototype.ariaLabelledBy;
    /**
     * Whether the tab is disabled.
     * @type {?}
     */
    TabPanelComponent.prototype.disabled;
    /**
     * Id of the tab. If none is provided, one will be generated.
     * @type {?}
     */
    TabPanelComponent.prototype.id;
    /**
     * @hidden
     * @type {?}
     */
    TabPanelComponent.prototype.expanded;
    /**
     * @hidden
     * @type {?}
     */
    TabPanelComponent.prototype.index;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi90YWJzL3RhYi90YWItcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9GLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztJQUU1RCxnQkFBZ0IsR0FBVyxDQUFDOzs7O0FBS2hDO0lBQUE7Ozs7UUFvQ0ksT0FBRSxHQUFXLGNBQWMsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDOzs7O1FBR2pELGFBQVEsR0FBRyxLQUFLLENBQUM7SUFJckIsQ0FBQzs7Z0JBM0NBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsUUFBUTtvQkFDbEIsNkZBQXlDO29CQUN6QyxJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLEtBQUssRUFBRSxnQkFBZ0I7d0JBQ3ZCLFdBQVcsRUFBRSxJQUFJO3dCQUNqQixzQkFBc0IsRUFBRSx3QkFBd0I7d0JBQ2hELHFCQUFxQixFQUFFLFVBQVU7cUJBQ3BDO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7O2dDQUlJLFlBQVksU0FBQyxpQkFBaUIsRUFBRSxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUM7d0JBSW5ELEtBQUs7NEJBSUwsS0FBSztpQ0FJTCxLQUFLOzJCQUlMLEtBQUs7cUJBSUwsS0FBSzs7SUFRVix3QkFBQztDQUFBLEFBM0NELElBMkNDO1NBL0JZLGlCQUFpQjs7Ozs7O0lBRzFCLDBDQUNnQzs7Ozs7SUFHaEMsa0NBQ2M7Ozs7O0lBR2Qsc0NBQ2tCOzs7OztJQUdsQiwyQ0FDdUI7Ozs7O0lBR3ZCLHFDQUNrQjs7Ozs7SUFHbEIsK0JBQ2lEOzs7OztJQUdqRCxxQ0FBaUI7Ozs7O0lBR2pCLGtDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIElucHV0LCBUZW1wbGF0ZVJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRhYlRpdGxlRGlyZWN0aXZlIH0gZnJvbSAnLi4vdGFiLXV0aWxzL3RhYi1kaXJlY3RpdmVzJztcblxubGV0IHRhYlBhbmVsVW5pcXVlSWQ6IG51bWJlciA9IDA7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgYm9keSBvZiBhIHRhYiBlbGVtZW50LiBJdCBhbHNvIGNvbnRhaW5zIGVsZW1lbnRzIHBlcnRhaW5pbmcgdG8gdGhlIGFzc29jaWF0ZWQgdGFiIGhlYWRlci5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC10YWInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWItcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgcm9sZTogJ3RhYnBhbmVsJyxcbiAgICAgICAgY2xhc3M6ICdmZC10YWJzX19wYW5lbCcsXG4gICAgICAgICdbYXR0ci5pZF0nOiAnaWQnLFxuICAgICAgICAnW2F0dHIuYXJpYS1leHBhbmRlZF0nOiAnZXhwYW5kZWQgPyB0cnVlIDogbnVsbCcsXG4gICAgICAgICdbY2xhc3MuaXMtZXhwYW5kZWRdJzogJ2V4cGFuZGVkJ1xuICAgIH0sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgVGFiUGFuZWxDb21wb25lbnQge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBAQ29udGVudENoaWxkKFRhYlRpdGxlRGlyZWN0aXZlLCB7cmVhZDogVGVtcGxhdGVSZWZ9KVxuICAgIHRpdGxlVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgICAvKiogVGhlIHRpdGxlIG9mIHRoZSB0YWIgaGVhZGVyLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdGl0bGU6IHN0cmluZztcblxuICAgIC8qKiBBcmlhLWxhYmVsIG9mIHRoZSB0YWIuIEFsc28gYXBwbGllZCB0byB0aGUgdGFiIGhlYWRlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIElkIG9mIHRoZSBlbGVtZW50IHRoYXQgbGFiZWxzIHRoZSB0YWIuIEFsc28gYXBwbGllZCB0byB0aGUgdGFiIGhlYWRlci4gKi9cbiAgICBASW5wdXQoKVxuICAgIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICAvKiogV2hldGhlciB0aGUgdGFiIGlzIGRpc2FibGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgZGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKiogSWQgb2YgdGhlIHRhYi4gSWYgbm9uZSBpcyBwcm92aWRlZCwgb25lIHdpbGwgYmUgZ2VuZXJhdGVkLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgaWQ6IHN0cmluZyA9ICdmZC10YWItcGFuZWwnICsgdGFiUGFuZWxVbmlxdWVJZCsrO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBleHBhbmRlZCA9IGZhbHNlO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBpbmRleDogbnVtYmVyO1xufVxuIl19