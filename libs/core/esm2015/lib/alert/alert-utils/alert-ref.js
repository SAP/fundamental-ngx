/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
export class AlertRef {
    constructor() {
        this._afterDismissed = new Subject();
        /**
         * Observable that is triggered when the alert is dismissed.
         */
        this.afterDismissed = this._afterDismissed.asObservable();
    }
    /**
     * Dismisses the alert.
     *
     * @param {?=} reason Data passed back to the calling component through the AfterDismissed observable.
     * @return {?}
     */
    dismiss(reason) {
        this._afterDismissed.next(reason);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AlertRef.prototype._afterDismissed;
    /**
     * Observable that is triggered when the alert is dismissed.
     * @type {?}
     */
    AlertRef.prototype.afterDismissed;
    /**
     * Data passed from the service open method.
     * @type {?}
     */
    AlertRef.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FsZXJ0L2FsZXJ0LXV0aWxzL2FsZXJ0LXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7O0FBTzNDLE1BQU0sT0FBTyxRQUFRO0lBQXJCO1FBRXFCLG9CQUFlLEdBQWlCLElBQUksT0FBTyxFQUFPLENBQUM7Ozs7UUFHN0QsbUJBQWMsR0FBb0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQWFqRixDQUFDOzs7Ozs7O0lBSEcsT0FBTyxDQUFDLE1BQVk7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNKOzs7Ozs7SUFoQkcsbUNBQW9FOzs7OztJQUdwRSxrQ0FBNkU7Ozs7O0lBRzdFLHdCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYW4gYWxlcnQgY29tcG9uZW50IGdlbmVyYXRlZCB2aWEgdGhlIEFsZXJ0U2VydmljZS5cbiAqIEl0IGNhbiBiZSBpbmplY3RlZCBpbnRvIHRoZSBjb250ZW50IGNvbXBvbmVudCBpbiB0aGUgc2FtZSB3YXkgYSBzZXJ2aWNlIHdvdWxkIGJlIGluamVjdGVkLlxuICogRm9yIGEgdGVtcGxhdGUsIGFkZCBsZXQtYWxlcnQgdG8geW91ciBuZy10ZW1wbGF0ZSB0YWcuIE5vdyB1c2luZyAqYWxlcnQqIGluIHRoZSB0ZW1wbGF0ZSByZWZlcnMgdG8gdGhpcyBjbGFzcy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFsZXJ0UmVmIHtcbiAgICBcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hZnRlckRpc21pc3NlZDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gICAgLyoqIE9ic2VydmFibGUgdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgYWxlcnQgaXMgZGlzbWlzc2VkLiAqL1xuICAgIHB1YmxpYyBhZnRlckRpc21pc3NlZDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5fYWZ0ZXJEaXNtaXNzZWQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICAvKiogRGF0YSBwYXNzZWQgZnJvbSB0aGUgc2VydmljZSBvcGVuIG1ldGhvZC4gKi9cbiAgICBwdWJsaWMgZGF0YTogYW55O1xuXG4gICAgLyoqXG4gICAgICogRGlzbWlzc2VzIHRoZSBhbGVydC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWFzb24gRGF0YSBwYXNzZWQgYmFjayB0byB0aGUgY2FsbGluZyBjb21wb25lbnQgdGhyb3VnaCB0aGUgQWZ0ZXJEaXNtaXNzZWQgb2JzZXJ2YWJsZS5cbiAgICAgKi9cbiAgICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hZnRlckRpc21pc3NlZC5uZXh0KHJlYXNvbik7XG4gICAgfVxufVxuIl19