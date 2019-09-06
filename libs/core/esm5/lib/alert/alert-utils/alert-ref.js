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
var /**
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
AlertRef = /** @class */ (function () {
    function AlertRef() {
        this._afterDismissed = new Subject();
        /**
         * Observable that is triggered when the alert is dismissed.
         */
        this.afterDismissed = this._afterDismissed.asObservable();
    }
    /**
     * Dismisses the alert.
     *
     * @param reason Data passed back to the calling component through the AfterDismissed observable.
     */
    /**
     * Dismisses the alert.
     *
     * @param {?=} reason Data passed back to the calling component through the AfterDismissed observable.
     * @return {?}
     */
    AlertRef.prototype.dismiss = /**
     * Dismisses the alert.
     *
     * @param {?=} reason Data passed back to the calling component through the AfterDismissed observable.
     * @return {?}
     */
    function (reason) {
        this._afterDismissed.next(reason);
    };
    return AlertRef;
}());
/**
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
export { AlertRef };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FsZXJ0L2FsZXJ0LXV0aWxzL2FsZXJ0LXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7O0FBTzNDOzs7Ozs7SUFBQTtRQUVxQixvQkFBZSxHQUFpQixJQUFJLE9BQU8sRUFBTyxDQUFDOzs7O1FBRzdELG1CQUFjLEdBQW9CLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLENBQUM7SUFhakYsQ0FBQztJQVJHOzs7O09BSUc7Ozs7Ozs7SUFDSCwwQkFBTzs7Ozs7O0lBQVAsVUFBUSxNQUFZO1FBQ2hCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQzs7Ozs7Ozs7Ozs7O0lBaEJHLG1DQUFvRTs7Ozs7SUFHcEUsa0NBQTZFOzs7OztJQUc3RSx3QkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbi8qKlxuICogUmVmZXJlbmNlIHRvIGFuIGFsZXJ0IGNvbXBvbmVudCBnZW5lcmF0ZWQgdmlhIHRoZSBBbGVydFNlcnZpY2UuXG4gKiBJdCBjYW4gYmUgaW5qZWN0ZWQgaW50byB0aGUgY29udGVudCBjb21wb25lbnQgaW4gdGhlIHNhbWUgd2F5IGEgc2VydmljZSB3b3VsZCBiZSBpbmplY3RlZC5cbiAqIEZvciBhIHRlbXBsYXRlLCBhZGQgbGV0LWFsZXJ0IHRvIHlvdXIgbmctdGVtcGxhdGUgdGFnLiBOb3cgdXNpbmcgKmFsZXJ0KiBpbiB0aGUgdGVtcGxhdGUgcmVmZXJzIHRvIHRoaXMgY2xhc3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBBbGVydFJlZiB7XG4gICAgXG4gICAgcHJpdmF0ZSByZWFkb25seSBfYWZ0ZXJEaXNtaXNzZWQ6IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIC8qKiBPYnNlcnZhYmxlIHRoYXQgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIGFsZXJ0IGlzIGRpc21pc3NlZC4gKi9cbiAgICBwdWJsaWMgYWZ0ZXJEaXNtaXNzZWQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX2FmdGVyRGlzbWlzc2VkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgLyoqIERhdGEgcGFzc2VkIGZyb20gdGhlIHNlcnZpY2Ugb3BlbiBtZXRob2QuICovXG4gICAgcHVibGljIGRhdGE6IGFueTtcblxuICAgIC8qKlxuICAgICAqIERpc21pc3NlcyB0aGUgYWxlcnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcmVhc29uIERhdGEgcGFzc2VkIGJhY2sgdG8gdGhlIGNhbGxpbmcgY29tcG9uZW50IHRocm91Z2ggdGhlIEFmdGVyRGlzbWlzc2VkIG9ic2VydmFibGUuXG4gICAgICovXG4gICAgZGlzbWlzcyhyZWFzb24/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYWZ0ZXJEaXNtaXNzZWQubmV4dChyZWFzb24pO1xuICAgIH1cbn1cbiJdfQ==