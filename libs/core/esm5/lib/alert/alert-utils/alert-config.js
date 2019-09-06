/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AlertConfig = /** @class */ (function () {
    function AlertConfig() {
        /**
         * Whether the alert is dismissible.
         */
        this.dismissible = true;
        /**
         * Width of the alert.
         */
        this.width = '33vw';
        /**
         * Minimum width of the alert.
         */
        this.minWidth = '300px';
        /**
         * Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite.
         */
        this.duration = 10000;
        /**
         * Whether the alert should stay open if the mouse is hovering over it.
         */
        this.mousePersist = false;
        /**
         * Id of the element that labels the alert.
         */
        this.ariaLabelledBy = null;
        /**
         * Aria label for the alert component element.
         */
        this.ariaLabel = null;
        /**
         * The container that the Alert is appended to. By default, it is appended to the body.
         */
        this.container = 'body';
    }
    return AlertConfig;
}());
export { AlertConfig };
if (false) {
    /**
     * Whether the alert is dismissible.
     * @type {?}
     */
    AlertConfig.prototype.dismissible;
    /**
     * The type of the alert. Can be one of *warning*, *success*, *information*, *error* or null.
     * @type {?}
     */
    AlertConfig.prototype.type;
    /**
     * Id for the alert component. If omitted, a unique one is generated.
     * @type {?}
     */
    AlertConfig.prototype.id;
    /**
     * Width of the alert.
     * @type {?}
     */
    AlertConfig.prototype.width;
    /**
     * Minimum width of the alert.
     * @type {?}
     */
    AlertConfig.prototype.minWidth;
    /**
     * Data being injected into the child component or template.
     * @type {?}
     */
    AlertConfig.prototype.data;
    /**
     * Duration of time *in milliseconds* that the alert will be visible. Set to -1 for indefinite.
     * @type {?}
     */
    AlertConfig.prototype.duration;
    /**
     * Whether the alert should stay open if the mouse is hovering over it.
     * @type {?}
     */
    AlertConfig.prototype.mousePersist;
    /**
     * Id of the element that labels the alert.
     * @type {?}
     */
    AlertConfig.prototype.ariaLabelledBy;
    /**
     * Aria label for the alert component element.
     * @type {?}
     */
    AlertConfig.prototype.ariaLabel;
    /**
     * The container that the Alert is appended to. By default, it is appended to the body.
     * @type {?}
     */
    AlertConfig.prototype.container;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FsZXJ0L2FsZXJ0LXV0aWxzL2FsZXJ0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0E7SUFBQTs7OztRQUdJLGdCQUFXLEdBQWEsSUFBSSxDQUFDOzs7O1FBUzdCLFVBQUssR0FBWSxNQUFNLENBQUM7Ozs7UUFHeEIsYUFBUSxHQUFZLE9BQU8sQ0FBQzs7OztRQU01QixhQUFRLEdBQVksS0FBSyxDQUFDOzs7O1FBRzFCLGlCQUFZLEdBQWEsS0FBSyxDQUFDOzs7O1FBRy9CLG1CQUFjLEdBQVksSUFBSSxDQUFDOzs7O1FBRy9CLGNBQVMsR0FBWSxJQUFJLENBQUM7Ozs7UUFHMUIsY0FBUyxHQUEwQixNQUFNLENBQUM7SUFDOUMsQ0FBQztJQUFELGtCQUFDO0FBQUQsQ0FBQyxBQWxDRCxJQWtDQzs7Ozs7OztJQS9CRyxrQ0FBNkI7Ozs7O0lBRzdCLDJCQUFjOzs7OztJQUdkLHlCQUFZOzs7OztJQUdaLDRCQUF3Qjs7Ozs7SUFHeEIsK0JBQTRCOzs7OztJQUc1QiwyQkFBVzs7Ozs7SUFHWCwrQkFBMEI7Ozs7O0lBRzFCLG1DQUErQjs7Ozs7SUFHL0IscUNBQStCOzs7OztJQUcvQixnQ0FBMEI7Ozs7O0lBRzFCLGdDQUEwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29uZmlndXJhdGlvbiBmb3Igb3BlbmluZyBhbiBhbGVydCB3aXRoIHRoZSBBbGVydFNlcnZpY2UuXG4gKi9cbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi8uLi91dGlscy9keW5hbWljLWNvbXBvbmVudC9keW5hbWljLWNvbXBvbmVudC1jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgQWxlcnRDb25maWcgaW1wbGVtZW50cyBEeW5hbWljQ29tcG9uZW50Q29uZmlnIHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBhbGVydCBpcyBkaXNtaXNzaWJsZS4gKi9cbiAgICBkaXNtaXNzaWJsZT86IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIFRoZSB0eXBlIG9mIHRoZSBhbGVydC4gQ2FuIGJlIG9uZSBvZiAqd2FybmluZyosICpzdWNjZXNzKiwgKmluZm9ybWF0aW9uKiwgKmVycm9yKiBvciBudWxsLiAqL1xuICAgIHR5cGU/OiBzdHJpbmc7XG5cbiAgICAvKiogSWQgZm9yIHRoZSBhbGVydCBjb21wb25lbnQuIElmIG9taXR0ZWQsIGEgdW5pcXVlIG9uZSBpcyBnZW5lcmF0ZWQuICovXG4gICAgaWQ/OiBzdHJpbmc7XG5cbiAgICAvKiogV2lkdGggb2YgdGhlIGFsZXJ0LiAqL1xuICAgIHdpZHRoPzogc3RyaW5nID0gJzMzdncnO1xuXG4gICAgLyoqIE1pbmltdW0gd2lkdGggb2YgdGhlIGFsZXJ0LiAqL1xuICAgIG1pbldpZHRoPzogc3RyaW5nID0gJzMwMHB4JztcblxuICAgIC8qKiBEYXRhIGJlaW5nIGluamVjdGVkIGludG8gdGhlIGNoaWxkIGNvbXBvbmVudCBvciB0ZW1wbGF0ZS4gKi9cbiAgICBkYXRhPzogYW55O1xuXG4gICAgLyoqIER1cmF0aW9uIG9mIHRpbWUgKmluIG1pbGxpc2Vjb25kcyogdGhhdCB0aGUgYWxlcnQgd2lsbCBiZSB2aXNpYmxlLiBTZXQgdG8gLTEgZm9yIGluZGVmaW5pdGUuICovXG4gICAgZHVyYXRpb24/OiBudW1iZXIgPSAxMDAwMDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBhbGVydCBzaG91bGQgc3RheSBvcGVuIGlmIHRoZSBtb3VzZSBpcyBob3ZlcmluZyBvdmVyIGl0LiAqL1xuICAgIG1vdXNlUGVyc2lzdD86IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBJZCBvZiB0aGUgZWxlbWVudCB0aGF0IGxhYmVscyB0aGUgYWxlcnQuICovXG4gICAgYXJpYUxhYmVsbGVkQnk/OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgLyoqIEFyaWEgbGFiZWwgZm9yIHRoZSBhbGVydCBjb21wb25lbnQgZWxlbWVudC4gKi9cbiAgICBhcmlhTGFiZWw/OiBzdHJpbmcgPSBudWxsO1xuXG4gICAgLyoqIFRoZSBjb250YWluZXIgdGhhdCB0aGUgQWxlcnQgaXMgYXBwZW5kZWQgdG8uIEJ5IGRlZmF1bHQsIGl0IGlzIGFwcGVuZGVkIHRvIHRoZSBib2R5LiAqL1xuICAgIGNvbnRhaW5lcj86IEhUTUxFbGVtZW50IHwgJ2JvZHknID0gJ2JvZHknO1xufVxuIl19