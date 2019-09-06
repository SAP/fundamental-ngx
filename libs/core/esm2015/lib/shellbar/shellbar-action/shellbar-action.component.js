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
export class ShellbarActionComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGxiYXItYWN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zaGVsbGJhci9zaGVsbGJhci1hY3Rpb24vc2hlbGxiYXItYWN0aW9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsS0FBSyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7Ozs7O0FBbUJsRixNQUFNLE9BQU8sdUJBQXVCOzs7WUFMbkMsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLHVjQUErQztnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDeEM7OztvQkFJSSxLQUFLO3VCQUlMLEtBQUs7b0JBSUwsS0FBSztnQ0FJTCxLQUFLO2dDQUlMLEtBQUs7Ozs7Ozs7SUFoQk4sd0NBQ2M7Ozs7O0lBR2QsMkNBQ21COzs7OztJQUduQix3Q0FDYzs7Ozs7SUFHZCxvREFDMEI7Ozs7O0lBRzFCLG9EQUMwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgcmVwcmVzZW50cyBhIHNoZWxsYmFyIGFjdGlvbi5cbiAqIGBgYGh0bWxcbiAqICA8ZmQtc2hlbGxiYXItYWN0aW9uICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgYWN0aW9uc1wiXG4gKiAgICAgICAgICAgICAgICAgICAgICBbZ2x5cGhdPVwiYWN0aW9uLmdseXBoXCJcbiAqICAgICAgICAgICAgICAgICAgICAgIFtjYWxsYmFja109XCJhY3Rpb24uY2FsbGJhY2tcIlxuICogICAgICAgICAgICAgICAgICAgICAgW2xhYmVsXT1cImFjdGlvbi5sYWJlbFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICBbbm90aWZpY2F0aW9uQ291bnRdPVwiYWN0aW9uLm5vdGlmaWNhdGlvbkNvdW50XCJcbiAqICAgICAgICAgICAgICAgICAgICAgIFtub3RpZmljYXRpb25MYWJlbF09XCJhY3Rpb24ubm90aWZpY2F0aW9uTGFiZWxcIj5cbiAqICA8L2ZkLXNoZWxsYmFyLWFjdGlvbj5cbiAqIGBgYFxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLXNoZWxsYmFyLWFjdGlvbicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NoZWxsYmFyLWFjdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBTaGVsbGJhckFjdGlvbkNvbXBvbmVudCB7XG5cbiAgICAvKiogVGhlIGdseXBoIChpY29uKSBuYW1lICovXG4gICAgQElucHV0KClcbiAgICBnbHlwaDogc3RyaW5nO1xuXG4gICAgLyoqIENhbGxiYWNrIHRoYXQgaGFubGRsZXMgdGhlIHJlc3BvbnNlIHRvIGNsaWNrcyBvbiBhbnkgb2YgdGhlIGFjdGlvbnMuICovXG4gICAgQElucHV0KClcbiAgICBjYWxsYmFjazogRnVuY3Rpb247XG5cbiAgICAvKiogVGhlIGFjdGlvbiBsYWJlbC4gKi9cbiAgICBASW5wdXQoKVxuICAgIGxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKiogVGhlIG5vdGlmaWNhdGlvbiBsYWJlbC4gKi9cbiAgICBASW5wdXQoKVxuICAgIG5vdGlmaWNhdGlvbkxhYmVsOiBzdHJpbmc7XG5cbiAgICAvKiogUmVwcmVzZW50cyB0aGUgbnVtYmVyIG9mIG5vdGlmaWNhdGlvbnMuICovXG4gICAgQElucHV0KClcbiAgICBub3RpZmljYXRpb25Db3VudDogbnVtYmVyO1xuXG59XG4iXX0=