/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
/**
 * Panel level actions such as add, remove, delete, sort, etc.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-actions>
 *             <button fd-button (click)="action()">Action</button>
 *         </fd-panel-actions>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
var PanelActionsComponent = /** @class */ (function () {
    function PanelActionsComponent() {
        /**
         * @hidden
         */
        this.fdPanelActionsClass = true;
    }
    PanelActionsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-actions',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PanelActionsComponent.propDecorators = {
        fdPanelActionsClass: [{ type: HostBinding, args: ['class.fd-panel__actions',] }]
    };
    return PanelActionsComponent;
}());
export { PanelActionsComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    PanelActionsComponent.prototype.fdPanelActionsClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGFuZWwvcGFuZWwtYWN0aW9ucy9wYW5lbC1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBZTFFO0lBQUE7Ozs7UUFTSSx3QkFBbUIsR0FBWSxJQUFJLENBQUM7SUFDeEMsQ0FBQzs7Z0JBVkEsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLHVDQUE2QztvQkFDN0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7aUJBQ3hDOzs7c0NBSUksV0FBVyxTQUFDLHlCQUF5Qjs7SUFFMUMsNEJBQUM7Q0FBQSxBQVZELElBVUM7U0FMWSxxQkFBcUI7Ozs7OztJQUc5QixvREFDb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIFBhbmVsIGxldmVsIGFjdGlvbnMgc3VjaCBhcyBhZGQsIHJlbW92ZSwgZGVsZXRlLCBzb3J0LCBldGMuXG4gKlxuICogYGBgaHRtbFxuICogPGZkLXBhbmVsPlxuICogICAgIDxmZC1wYW5lbC1oZWFkZXI+XG4gKiAgICAgICAgIDxmZC1wYW5lbC1hY3Rpb25zPlxuICogICAgICAgICAgICAgPGJ1dHRvbiBmZC1idXR0b24gKGNsaWNrKT1cImFjdGlvbigpXCI+QWN0aW9uPC9idXR0b24+XG4gKiAgICAgICAgIDwvZmQtcGFuZWwtYWN0aW9ucz5cbiAqICAgICA8L2ZkLXBhbmVsLWhlYWRlcj5cbiAqIDwvZmQtcGFuZWw+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1wYW5lbC1hY3Rpb25zJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vcGFuZWwtYWN0aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbEFjdGlvbnNDb21wb25lbnQge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLXBhbmVsX19hY3Rpb25zJylcbiAgICBmZFBhbmVsQWN0aW9uc0NsYXNzOiBib29sZWFuID0gdHJ1ZTtcbn1cbiJdfQ==