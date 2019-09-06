/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Subject } from 'rxjs';
/**
 * Reference to a modal component generated via the ModalService.
 * It can be injected into the content component through the constructor.
 * For a template, it is declared as part of the implicit context, see examples.
 */
export class ModalRef {
    constructor() {
        this._afterClosed = new Subject();
        /**
         * Observable that is triggered when the modal is closed.
         * On close a *result* is passed back. On dismiss, an *error* is returned instead.
         */
        this.afterClosed = this._afterClosed.asObservable();
    }
    /**
     * Closes the modal and passes the argument to the afterClosed observable.
     * @param {?=} result Value passed back to the observable as a result.
     * @return {?}
     */
    close(result) {
        this._afterClosed.next(result);
    }
    /**
     * Dismisses the modal and passes the argument to the afterClosed observable as an error.
     * @param {?=} reason Value passed back to the observable as an error.
     * @return {?}
     */
    dismiss(reason) {
        this._afterClosed.error(reason);
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ModalRef.prototype._afterClosed;
    /**
     * Observable that is triggered when the modal is closed.
     * On close a *result* is passed back. On dismiss, an *error* is returned instead.
     * @type {?}
     */
    ModalRef.prototype.afterClosed;
    /**
     * Data passed from the calling component to the content.
     * @type {?}
     */
    ModalRef.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtcmVmLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGFsL21vZGFsLXV0aWxzL21vZGFsLXJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7O0FBTzNDLE1BQU0sT0FBTyxRQUFRO0lBQXJCO1FBQ3FCLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQU8sQ0FBQzs7Ozs7UUFNNUMsZ0JBQVcsR0FBb0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQW9CM0UsQ0FBQzs7Ozs7O0lBWEcsS0FBSyxDQUFDLE1BQVk7UUFDZCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7SUFNRCxPQUFPLENBQUMsTUFBWTtRQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0o7Ozs7OztJQTFCRyxnQ0FBbUQ7Ozs7OztJQU1uRCwrQkFBdUU7Ozs7O0lBR3ZFLHdCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gYSBtb2RhbCBjb21wb25lbnQgZ2VuZXJhdGVkIHZpYSB0aGUgTW9kYWxTZXJ2aWNlLlxuICogSXQgY2FuIGJlIGluamVjdGVkIGludG8gdGhlIGNvbnRlbnQgY29tcG9uZW50IHRocm91Z2ggdGhlIGNvbnN0cnVjdG9yLlxuICogRm9yIGEgdGVtcGxhdGUsIGl0IGlzIGRlY2xhcmVkIGFzIHBhcnQgb2YgdGhlIGltcGxpY2l0IGNvbnRleHQsIHNlZSBleGFtcGxlcy5cbiAqL1xuZXhwb3J0IGNsYXNzIE1vZGFsUmVmIHtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9hZnRlckNsb3NlZCA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICAgIC8qKlxuICAgICAqIE9ic2VydmFibGUgdGhhdCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgbW9kYWwgaXMgY2xvc2VkLlxuICAgICAqIE9uIGNsb3NlIGEgKnJlc3VsdCogaXMgcGFzc2VkIGJhY2suIE9uIGRpc21pc3MsIGFuICplcnJvciogaXMgcmV0dXJuZWQgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWZ0ZXJDbG9zZWQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuX2FmdGVyQ2xvc2VkLmFzT2JzZXJ2YWJsZSgpO1xuXG4gICAgLyoqIERhdGEgcGFzc2VkIGZyb20gdGhlIGNhbGxpbmcgY29tcG9uZW50IHRvIHRoZSBjb250ZW50LiovXG4gICAgcHVibGljIGRhdGE6IGFueTtcblxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgbW9kYWwgYW5kIHBhc3NlcyB0aGUgYXJndW1lbnQgdG8gdGhlIGFmdGVyQ2xvc2VkIG9ic2VydmFibGUuXG4gICAgICogQHBhcmFtIHJlc3VsdCBWYWx1ZSBwYXNzZWQgYmFjayB0byB0aGUgb2JzZXJ2YWJsZSBhcyBhIHJlc3VsdC5cbiAgICAgKi9cbiAgICBjbG9zZShyZXN1bHQ/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYWZ0ZXJDbG9zZWQubmV4dChyZXN1bHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc21pc3NlcyB0aGUgbW9kYWwgYW5kIHBhc3NlcyB0aGUgYXJndW1lbnQgdG8gdGhlIGFmdGVyQ2xvc2VkIG9ic2VydmFibGUgYXMgYW4gZXJyb3IuXG4gICAgICogQHBhcmFtIHJlYXNvbiBWYWx1ZSBwYXNzZWQgYmFjayB0byB0aGUgb2JzZXJ2YWJsZSBhcyBhbiBlcnJvci5cbiAgICAgKi9cbiAgICBkaXNtaXNzKHJlYXNvbj86IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hZnRlckNsb3NlZC5lcnJvcihyZWFzb24pO1xuICAgIH1cbn1cbiJdfQ==