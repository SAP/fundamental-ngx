/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class AlertConfig {
    constructor() {
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL2FsZXJ0L2FsZXJ0LXV0aWxzL2FsZXJ0LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0EsTUFBTSxPQUFPLFdBQVc7SUFBeEI7Ozs7UUFHSSxnQkFBVyxHQUFhLElBQUksQ0FBQzs7OztRQVM3QixVQUFLLEdBQVksTUFBTSxDQUFDOzs7O1FBR3hCLGFBQVEsR0FBWSxPQUFPLENBQUM7Ozs7UUFNNUIsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUcxQixpQkFBWSxHQUFhLEtBQUssQ0FBQzs7OztRQUcvQixtQkFBYyxHQUFZLElBQUksQ0FBQzs7OztRQUcvQixjQUFTLEdBQVksSUFBSSxDQUFDOzs7O1FBRzFCLGNBQVMsR0FBMEIsTUFBTSxDQUFDO0lBQzlDLENBQUM7Q0FBQTs7Ozs7O0lBL0JHLGtDQUE2Qjs7Ozs7SUFHN0IsMkJBQWM7Ozs7O0lBR2QseUJBQVk7Ozs7O0lBR1osNEJBQXdCOzs7OztJQUd4QiwrQkFBNEI7Ozs7O0lBRzVCLDJCQUFXOzs7OztJQUdYLCtCQUEwQjs7Ozs7SUFHMUIsbUNBQStCOzs7OztJQUcvQixxQ0FBK0I7Ozs7O0lBRy9CLGdDQUEwQjs7Ozs7SUFHMUIsZ0NBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb25maWd1cmF0aW9uIGZvciBvcGVuaW5nIGFuIGFsZXJ0IHdpdGggdGhlIEFsZXJ0U2VydmljZS5cbiAqL1xuaW1wb3J0IHsgRHluYW1pY0NvbXBvbmVudENvbmZpZyB9IGZyb20gJy4uLy4uL3V0aWxzL2R5bmFtaWMtY29tcG9uZW50L2R5bmFtaWMtY29tcG9uZW50LWNvbmZpZyc7XG5cbmV4cG9ydCBjbGFzcyBBbGVydENvbmZpZyBpbXBsZW1lbnRzIER5bmFtaWNDb21wb25lbnRDb25maWcge1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGFsZXJ0IGlzIGRpc21pc3NpYmxlLiAqL1xuICAgIGRpc21pc3NpYmxlPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogVGhlIHR5cGUgb2YgdGhlIGFsZXJ0LiBDYW4gYmUgb25lIG9mICp3YXJuaW5nKiwgKnN1Y2Nlc3MqLCAqaW5mb3JtYXRpb24qLCAqZXJyb3IqIG9yIG51bGwuICovXG4gICAgdHlwZT86IHN0cmluZztcblxuICAgIC8qKiBJZCBmb3IgdGhlIGFsZXJ0IGNvbXBvbmVudC4gSWYgb21pdHRlZCwgYSB1bmlxdWUgb25lIGlzIGdlbmVyYXRlZC4gKi9cbiAgICBpZD86IHN0cmluZztcblxuICAgIC8qKiBXaWR0aCBvZiB0aGUgYWxlcnQuICovXG4gICAgd2lkdGg/OiBzdHJpbmcgPSAnMzN2dyc7XG5cbiAgICAvKiogTWluaW11bSB3aWR0aCBvZiB0aGUgYWxlcnQuICovXG4gICAgbWluV2lkdGg/OiBzdHJpbmcgPSAnMzAwcHgnO1xuXG4gICAgLyoqIERhdGEgYmVpbmcgaW5qZWN0ZWQgaW50byB0aGUgY2hpbGQgY29tcG9uZW50IG9yIHRlbXBsYXRlLiAqL1xuICAgIGRhdGE/OiBhbnk7XG5cbiAgICAvKiogRHVyYXRpb24gb2YgdGltZSAqaW4gbWlsbGlzZWNvbmRzKiB0aGF0IHRoZSBhbGVydCB3aWxsIGJlIHZpc2libGUuIFNldCB0byAtMSBmb3IgaW5kZWZpbml0ZS4gKi9cbiAgICBkdXJhdGlvbj86IG51bWJlciA9IDEwMDAwO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGFsZXJ0IHNob3VsZCBzdGF5IG9wZW4gaWYgdGhlIG1vdXNlIGlzIGhvdmVyaW5nIG92ZXIgaXQuICovXG4gICAgbW91c2VQZXJzaXN0PzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIElkIG9mIHRoZSBlbGVtZW50IHRoYXQgbGFiZWxzIHRoZSBhbGVydC4gKi9cbiAgICBhcmlhTGFiZWxsZWRCeT86IHN0cmluZyA9IG51bGw7XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIGFsZXJ0IGNvbXBvbmVudCBlbGVtZW50LiAqL1xuICAgIGFyaWFMYWJlbD86IHN0cmluZyA9IG51bGw7XG5cbiAgICAvKiogVGhlIGNvbnRhaW5lciB0aGF0IHRoZSBBbGVydCBpcyBhcHBlbmRlZCB0by4gQnkgZGVmYXVsdCwgaXQgaXMgYXBwZW5kZWQgdG8gdGhlIGJvZHkuICovXG4gICAgY29udGFpbmVyPzogSFRNTEVsZW1lbnQgfCAnYm9keScgPSAnYm9keSc7XG59XG4iXX0=