/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The component that represents a shellbar action.
 * ```html
 *  <fd-shellbar-action *ngFor="let action of actions"
 *                      [glyph]="action.glyph"
 *                      [callback]="action.callback"
 *                      [label]="action.label"
 *                      [notificationCount]="action.notificationCount"
 *                      [notificationLabel]="action.notificationLabel">
 *  </fd-shellbar-action>
 * ```
 */
var ShellbarActionComponent = /** @class */ (function () {
    function ShellbarActionComponent() {
    }
    ShellbarActionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-shellbar-action',
                    template: "<div class=\"fd-shellbar__action fd-shellbar__action--collapsible\">\n    <button class=\"fd-button--shell\" (click)=\"callback ? callback($event) : ''\"\n            [ngClass]=\"(glyph ? ('sap-icon--' + glyph) : '')\"\n            [attr.aria-label]=\"label\">\n        <span *ngIf=\"notificationCount\" class=\"fd-counter fd-counter--notification\" [attr.aria-label]=\"notificationLabel\">{{notificationCount}}</span>\n    </button>\n</div>\n",
                    encapsulation: ViewEncapsulation.None
                }] }
    ];
    ShellbarActionComponent.propDecorators = {
        glyph: [{ type: Input }],
        callback: [{ type: Input }],
        label: [{ type: Input }],
        notificationLabel: [{ type: Input }],
        notificationCount: [{ type: Input }]
    };
    return ShellbarActionComponent;
}());
export { ShellbarActionComponent };
if (false) {
    /**
     * The glyph (icon) name
     * @type {?}
     */
    ShellbarActionComponent.prototype.glyph;
    /**
     * Callback that hanldles the response to clicks on any of the actions.
     * @type {?}
     */
    ShellbarActionComponent.prototype.callback;
    /**
     * The action label.
     * @type {?}
     */
    ShellbarActionComponent.prototype.label;
    /**
     * The notification label.
     * @type {?}
     */
    ShellbarActionComponent.prototype.notificationLabel;
    /**
     * Represents the number of notifications.
     * @type {?}
     */
    ShellbarActionComponent.prototype.notificationCount;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGxiYXItYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaGVsbGJhci9zaGVsbGJhci1hY3Rpb24vc2hlbGxiYXItYWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBY2xGO0lBQUE7SUEyQkEsQ0FBQzs7Z0JBM0JBLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5Qix1Y0FBK0M7b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2lCQUN4Qzs7O3dCQUlJLEtBQUs7MkJBSUwsS0FBSzt3QkFJTCxLQUFLO29DQUlMLEtBQUs7b0NBSUwsS0FBSzs7SUFHViw4QkFBQztDQUFBLEFBM0JELElBMkJDO1NBdEJZLHVCQUF1Qjs7Ozs7O0lBR2hDLHdDQUNjOzs7OztJQUdkLDJDQUNtQjs7Ozs7SUFHbkIsd0NBQ2M7Ozs7O0lBR2Qsb0RBQzBCOzs7OztJQUcxQixvREFDMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgSW5wdXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IHJlcHJlc2VudHMgYSBzaGVsbGJhciBhY3Rpb24uXG4gKiBgYGBodG1sXG4gKiAgPGZkLXNoZWxsYmFyLWFjdGlvbiAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGFjdGlvbnNcIlxuICogICAgICAgICAgICAgICAgICAgICAgW2dseXBoXT1cImFjdGlvbi5nbHlwaFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICBbY2FsbGJhY2tdPVwiYWN0aW9uLmNhbGxiYWNrXCJcbiAqICAgICAgICAgICAgICAgICAgICAgIFtsYWJlbF09XCJhY3Rpb24ubGFiZWxcIlxuICogICAgICAgICAgICAgICAgICAgICAgW25vdGlmaWNhdGlvbkNvdW50XT1cImFjdGlvbi5ub3RpZmljYXRpb25Db3VudFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICBbbm90aWZpY2F0aW9uTGFiZWxdPVwiYWN0aW9uLm5vdGlmaWNhdGlvbkxhYmVsXCI+XG4gKiAgPC9mZC1zaGVsbGJhci1hY3Rpb24+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1zaGVsbGJhci1hY3Rpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9zaGVsbGJhci1hY3Rpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgU2hlbGxiYXJBY3Rpb25Db21wb25lbnQge1xuXG4gICAgLyoqIFRoZSBnbHlwaCAoaWNvbikgbmFtZSAqL1xuICAgIEBJbnB1dCgpXG4gICAgZ2x5cGg6IHN0cmluZztcblxuICAgIC8qKiBDYWxsYmFjayB0aGF0IGhhbmxkbGVzIHRoZSByZXNwb25zZSB0byBjbGlja3Mgb24gYW55IG9mIHRoZSBhY3Rpb25zLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgY2FsbGJhY2s6IEZ1bmN0aW9uO1xuXG4gICAgLyoqIFRoZSBhY3Rpb24gbGFiZWwuICovXG4gICAgQElucHV0KClcbiAgICBsYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFRoZSBub3RpZmljYXRpb24gbGFiZWwuICovXG4gICAgQElucHV0KClcbiAgICBub3RpZmljYXRpb25MYWJlbDogc3RyaW5nO1xuXG4gICAgLyoqIFJlcHJlc2VudHMgdGhlIG51bWJlciBvZiBub3RpZmljYXRpb25zLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgbm90aWZpY2F0aW9uQ291bnQ6IG51bWJlcjtcblxufVxuIl19