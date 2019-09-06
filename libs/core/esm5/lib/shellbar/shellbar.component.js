/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
/**
 * The shellbar offers consistent, responsive navigation across all products and applications.
 * Includes support for branding, product navigation, search, notifications, and user settings.
 * Shellbar is a composite component comprised of mandatory and optional elements.
 */
var ShellbarComponent = /** @class */ (function () {
    function ShellbarComponent() {
    }
    ShellbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar',
                    template: "<div class=\"fd-shellbar\">\n    <div class=\"fd-shellbar__group fd-shellbar__group--start\">\n        <ng-content select=\"fd-shellbar-logo\"></ng-content>\n        <div class=\"fd-shellbar__product\">\n            <ng-content select=\"fd-shellbar-title\"></ng-content>\n            <ng-content select=\"fd-product-menu\"></ng-content>\n        </div>\n        <ng-content select=\"fd-shellbar-subtitle\"></ng-content>\n    </div>\n    <div class=\"fd-shellbar__group fd-shellbar__group--end\">\n        <ng-content select=\"fd-shellbar-actions\"></ng-content>\n    </div>\n</div>\n"
                }] }
    ];
    return ShellbarComponent;
}());
export { ShellbarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGxiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL3NoZWxsYmFyL3NoZWxsYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBTzFDO0lBQUE7SUFLQSxDQUFDOztnQkFMQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLG1sQkFBd0M7aUJBQzNDOztJQUVELHdCQUFDO0NBQUEsQUFMRCxJQUtDO1NBRFksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIHNoZWxsYmFyIG9mZmVycyBjb25zaXN0ZW50LCByZXNwb25zaXZlIG5hdmlnYXRpb24gYWNyb3NzIGFsbCBwcm9kdWN0cyBhbmQgYXBwbGljYXRpb25zLlxuICogSW5jbHVkZXMgc3VwcG9ydCBmb3IgYnJhbmRpbmcsIHByb2R1Y3QgbmF2aWdhdGlvbiwgc2VhcmNoLCBub3RpZmljYXRpb25zLCBhbmQgdXNlciBzZXR0aW5ncy5cbiAqIFNoZWxsYmFyIGlzIGEgY29tcG9zaXRlIGNvbXBvbmVudCBjb21wcmlzZWQgb2YgbWFuZGF0b3J5IGFuZCBvcHRpb25hbCBlbGVtZW50cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1zaGVsbGJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoZWxsYmFyLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTaGVsbGJhckNvbXBvbmVudCB7XG59XG4iXX0=