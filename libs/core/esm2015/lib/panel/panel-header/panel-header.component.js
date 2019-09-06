/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
/**
 * Header of the panel. Contains a head and actions.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-header>
 *         <fd-panel-head>
 *             <fd-panel-title>Title!</fd-panel-title>
 *         </fd-panel-head>
 *     </fd-panel-header>
 * </fd-panel>
 * ```
 */
export class PanelHeaderComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelHeaderClass = true;
    }
}
PanelHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-panel-header',
                template: "<ng-content select=\"fd-panel-head\"></ng-content>\n<ng-content select=\"fd-panel-actions\"></ng-content>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];
PanelHeaderComponent.propDecorators = {
    fdPanelHeaderClass: [{ type: HostBinding, args: ['class.fd-panel__header',] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    PanelHeaderComponent.prototype.fdPanelHeaderClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9wYW5lbC9wYW5lbC1oZWFkZXIvcGFuZWwtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBb0IxRSxNQUFNLE9BQU8sb0JBQW9CO0lBTGpDOzs7O1FBU0ksdUJBQWtCLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7OztZQVZBLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix1SEFBNEM7Z0JBQzVDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2FBQ3hDOzs7aUNBSUksV0FBVyxTQUFDLHdCQUF3Qjs7Ozs7OztJQUFyQyxrREFDMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEhlYWRlciBvZiB0aGUgcGFuZWwuIENvbnRhaW5zIGEgaGVhZCBhbmQgYWN0aW9ucy5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZmQtcGFuZWw+XG4gKiAgICAgPGZkLXBhbmVsLWhlYWRlcj5cbiAqICAgICAgICAgPGZkLXBhbmVsLWhlYWQ+XG4gKiAgICAgICAgICAgICA8ZmQtcGFuZWwtdGl0bGU+VGl0bGUhPC9mZC1wYW5lbC10aXRsZT5cbiAqICAgICAgICAgPC9mZC1wYW5lbC1oZWFkPlxuICogICAgIDwvZmQtcGFuZWwtaGVhZGVyPlxuICogPC9mZC1wYW5lbD5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXBhbmVsLWhlYWRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhbmVsLWhlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbEhlYWRlckNvbXBvbmVudCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtcGFuZWxfX2hlYWRlcicpXG4gICAgZmRQYW5lbEhlYWRlckNsYXNzID0gdHJ1ZTtcbn1cbiJdfQ==