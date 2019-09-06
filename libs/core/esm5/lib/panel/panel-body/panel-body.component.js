/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
/**
 * Main content of the panel can that hold lists, table, tree, text, form or any other information.
 *
 * ```html
 * <fd-panel>
 *     <fd-panel-body>
 *         Some text can go here!
 *     </fd-panel-body>
 * </fd-panel>
 * ```
 */
var PanelBodyComponent = /** @class */ (function () {
    function PanelBodyComponent() {
        /**
         * @hidden
         */
        this.fdPanelBodyClass = true;
        /**
         * Whether the edges of the panel should have bleeding padding.
         */
        this.bleed = false;
    }
    PanelBodyComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-panel-body',
                    template: "<ng-content></ng-content>\n",
                    host: {
                        '[class.fd-has-display-block]': 'true'
                    },
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    PanelBodyComponent.propDecorators = {
        fdPanelBodyClass: [{ type: HostBinding, args: ['class.fd-panel__body',] }],
        bleed: [{ type: Input }, { type: HostBinding, args: ['class.fd-panel__body--bleed',] }]
    };
    return PanelBodyComponent;
}());
export { PanelBodyComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    PanelBodyComponent.prototype.fdPanelBodyClass;
    /**
     * Whether the edges of the panel should have bleeding padding.
     * @type {?}
     */
    PanelBodyComponent.prototype.bleed;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGFuZWwvcGFuZWwtYm9keS9wYW5lbC1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7QUFhakY7SUFBQTs7OztRQVlJLHFCQUFnQixHQUFZLElBQUksQ0FBQzs7OztRQUtqQyxVQUFLLEdBQVksS0FBSyxDQUFDO0lBRTNCLENBQUM7O2dCQW5CQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLHVDQUEwQztvQkFDMUMsSUFBSSxFQUFFO3dCQUNGLDhCQUE4QixFQUFFLE1BQU07cUJBQ3pDO29CQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7O21DQUlJLFdBQVcsU0FBQyxzQkFBc0I7d0JBSWxDLEtBQUssWUFDTCxXQUFXLFNBQUMsNkJBQTZCOztJQUc5Qyx5QkFBQztDQUFBLEFBbkJELElBbUJDO1NBWFksa0JBQWtCOzs7Ozs7SUFHM0IsOENBQ2lDOzs7OztJQUdqQyxtQ0FFdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBNYWluIGNvbnRlbnQgb2YgdGhlIHBhbmVsIGNhbiB0aGF0IGhvbGQgbGlzdHMsIHRhYmxlLCB0cmVlLCB0ZXh0LCBmb3JtIG9yIGFueSBvdGhlciBpbmZvcm1hdGlvbi5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZmQtcGFuZWw+XG4gKiAgICAgPGZkLXBhbmVsLWJvZHk+XG4gKiAgICAgICAgIFNvbWUgdGV4dCBjYW4gZ28gaGVyZSFcbiAqICAgICA8L2ZkLXBhbmVsLWJvZHk+XG4gKiA8L2ZkLXBhbmVsPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtcGFuZWwtYm9keScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhbmVsLWJvZHkuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy5mZC1oYXMtZGlzcGxheS1ibG9ja10nOiAndHJ1ZSdcbiAgICB9LFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgUGFuZWxCb2R5Q29tcG9uZW50IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1wYW5lbF9fYm9keScpXG4gICAgZmRQYW5lbEJvZHlDbGFzczogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgZWRnZXMgb2YgdGhlIHBhbmVsIHNob3VsZCBoYXZlIGJsZWVkaW5nIHBhZGRpbmcuICovXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLXBhbmVsX19ib2R5LS1ibGVlZCcpXG4gICAgYmxlZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxufVxuIl19