/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { AbstractFdNgxClass } from '../utils/abstract-fd-ngx-class';
/**
 * Status Label directive with some default icons based on status input used to indicate status.
 * Icons are used to easily highlight the state of an object.
 */
export class StatusLabelDirective extends AbstractFdNgxClass {
    /**
     * @hidden
     * @param {?} elementRef
     */
    constructor(elementRef) {
        super(elementRef);
        this.elementRef = elementRef;
        /**
         * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
         */
        this.status = '';
        /**
         * Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'.
         */
        this.statusIcon = '';
        /**
         * The icon used with the status indicator. See the icon page for the list of icons.
         */
        this.icon = '';
    }
    /**
     * @hidden
     * @return {?}
     */
    _setProperties() {
        this._addClassToElement('fd-status-label');
        if (this.status) {
            this._addClassToElement('fd-status-label--' + this.status);
        }
        if (this.statusIcon) {
            this._addClassToElement('fd-status-label--' + this.statusIcon);
        }
        if (this.icon) {
            this._addClassToElement('sap-icon--' + this.icon);
        }
    }
}
StatusLabelDirective.decorators = [
    { type: Directive, args: [{
                // tslint:disable-next-line:directive-selector
                selector: '[fd-status-label]'
            },] }
];
/** @nocollapse */
StatusLabelDirective.ctorParameters = () => [
    { type: ElementRef }
];
StatusLabelDirective.propDecorators = {
    status: [{ type: Input }],
    statusIcon: [{ type: Input }],
    icon: [{ type: Input }]
};
if (false) {
    /**
     * Color coded status for the label. Options are 'success', 'warning', and 'error'. Leave empty for default label.
     * @type {?}
     */
    StatusLabelDirective.prototype.status;
    /**
     * Built-in status icon. Options include 'available', 'away', 'busy', and 'offline'.
     * @type {?}
     */
    StatusLabelDirective.prototype.statusIcon;
    /**
     * The icon used with the status indicator. See the icon page for the list of icons.
     * @type {?}
     */
    StatusLabelDirective.prototype.icon;
    /**
     * @type {?}
     * @private
     */
    StatusLabelDirective.prototype.elementRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzLWxhYmVsLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9iYWRnZS1sYWJlbC9zdGF0dXMtbGFiZWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDNUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7Ozs7O0FBVXBFLE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxrQkFBa0I7Ozs7O0lBeUJ4RCxZQUFvQixVQUFzQjtRQUN0QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFERixlQUFVLEdBQVYsVUFBVSxDQUFZOzs7O1FBdkJqQyxXQUFNLEdBQVcsRUFBRSxDQUFDOzs7O1FBR3BCLGVBQVUsR0FBVyxFQUFFLENBQUM7Ozs7UUFHeEIsU0FBSSxHQUFXLEVBQUUsQ0FBQztJQW1CM0IsQ0FBQzs7Ozs7SUFoQkQsY0FBYztRQUNWLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUQ7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsRTtRQUNELElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNYLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3JEO0lBQ0wsQ0FBQzs7O1lBMUJKLFNBQVMsU0FBQzs7Z0JBRVAsUUFBUSxFQUFFLG1CQUFtQjthQUNoQzs7OztZQVZtQixVQUFVOzs7cUJBYXpCLEtBQUs7eUJBR0wsS0FBSzttQkFHTCxLQUFLOzs7Ozs7O0lBTk4sc0NBQTZCOzs7OztJQUc3QiwwQ0FBaUM7Ozs7O0lBR2pDLG9DQUEyQjs7Ozs7SUFpQmYsMENBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZkTmd4Q2xhc3MgfSBmcm9tICcuLi91dGlscy9hYnN0cmFjdC1mZC1uZ3gtY2xhc3MnO1xuXG4vKipcbiAqIFN0YXR1cyBMYWJlbCBkaXJlY3RpdmUgd2l0aCBzb21lIGRlZmF1bHQgaWNvbnMgYmFzZWQgb24gc3RhdHVzIGlucHV0IHVzZWQgdG8gaW5kaWNhdGUgc3RhdHVzLlxuICogSWNvbnMgYXJlIHVzZWQgdG8gZWFzaWx5IGhpZ2hsaWdodCB0aGUgc3RhdGUgb2YgYW4gb2JqZWN0LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtc3RhdHVzLWxhYmVsXSdcbn0pXG5leHBvcnQgY2xhc3MgU3RhdHVzTGFiZWxEaXJlY3RpdmUgZXh0ZW5kcyBBYnN0cmFjdEZkTmd4Q2xhc3Mge1xuICAgIC8qKiBDb2xvciBjb2RlZCBzdGF0dXMgZm9yIHRoZSBsYWJlbC4gT3B0aW9ucyBhcmUgJ3N1Y2Nlc3MnLCAnd2FybmluZycsIGFuZCAnZXJyb3InLiBMZWF2ZSBlbXB0eSBmb3IgZGVmYXVsdCBsYWJlbC4gKi9cbiAgICBASW5wdXQoKSBzdGF0dXM6IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqIEJ1aWx0LWluIHN0YXR1cyBpY29uLiBPcHRpb25zIGluY2x1ZGUgJ2F2YWlsYWJsZScsICdhd2F5JywgJ2J1c3knLCBhbmQgJ29mZmxpbmUnLiAqL1xuICAgIEBJbnB1dCgpIHN0YXR1c0ljb246IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqIFRoZSBpY29uIHVzZWQgd2l0aCB0aGUgc3RhdHVzIGluZGljYXRvci4gU2VlIHRoZSBpY29uIHBhZ2UgZm9yIHRoZSBsaXN0IG9mIGljb25zLiAqL1xuICAgIEBJbnB1dCgpIGljb246IHN0cmluZyA9ICcnO1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBfc2V0UHJvcGVydGllcygpIHtcbiAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXN0YXR1cy1sYWJlbCcpO1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZENsYXNzVG9FbGVtZW50KCdmZC1zdGF0dXMtbGFiZWwtLScgKyB0aGlzLnN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzSWNvbikge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ2ZkLXN0YXR1cy1sYWJlbC0tJyArIHRoaXMuc3RhdHVzSWNvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaWNvbikge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3NUb0VsZW1lbnQoJ3NhcC1pY29uLS0nICsgdGhpcy5pY29uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKGVsZW1lbnRSZWYpO1xuICAgIH1cbn1cbiJdfQ==