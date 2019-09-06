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
export class PanelBodyComponent {
    constructor() {
        /**
         * @hidden
         */
        this.fdPanelBodyClass = true;
        /**
         * Whether the edges of the panel should have bleeding padding.
         */
        this.bleed = false;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwtYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvcGFuZWwvcGFuZWwtYm9keS9wYW5lbC1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7QUFxQmpGLE1BQU0sT0FBTyxrQkFBa0I7SUFSL0I7Ozs7UUFZSSxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7Ozs7UUFLakMsVUFBSyxHQUFZLEtBQUssQ0FBQztJQUUzQixDQUFDOzs7WUFuQkEsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxlQUFlO2dCQUN6Qix1Q0FBMEM7Z0JBQzFDLElBQUksRUFBRTtvQkFDRiw4QkFBOEIsRUFBRSxNQUFNO2lCQUN6QztnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7OytCQUlJLFdBQVcsU0FBQyxzQkFBc0I7b0JBSWxDLEtBQUssWUFDTCxXQUFXLFNBQUMsNkJBQTZCOzs7Ozs7O0lBTDFDLDhDQUNpQzs7Ozs7SUFHakMsbUNBRXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogTWFpbiBjb250ZW50IG9mIHRoZSBwYW5lbCBjYW4gdGhhdCBob2xkIGxpc3RzLCB0YWJsZSwgdHJlZSwgdGV4dCwgZm9ybSBvciBhbnkgb3RoZXIgaW5mb3JtYXRpb24uXG4gKlxuICogYGBgaHRtbFxuICogPGZkLXBhbmVsPlxuICogICAgIDxmZC1wYW5lbC1ib2R5PlxuICogICAgICAgICBTb21lIHRleHQgY2FuIGdvIGhlcmUhXG4gKiAgICAgPC9mZC1wYW5lbC1ib2R5PlxuICogPC9mZC1wYW5lbD5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXBhbmVsLWJvZHknLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9wYW5lbC1ib2R5LmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MuZmQtaGFzLWRpc3BsYXktYmxvY2tdJzogJ3RydWUnXG4gICAgfSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsQm9keUNvbXBvbmVudCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtcGFuZWxfX2JvZHknKVxuICAgIGZkUGFuZWxCb2R5Q2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGVkZ2VzIG9mIHRoZSBwYW5lbCBzaG91bGQgaGF2ZSBibGVlZGluZyBwYWRkaW5nLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1wYW5lbF9fYm9keS0tYmxlZWQnKVxuICAgIGJsZWVkOiBib29sZWFuID0gZmFsc2U7XG5cbn1cbiJdfQ==