/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ModalConfig = /** @class */ (function () {
    function ModalConfig() {
        /**
         * Aria label for the modal component element.
         */
        this.ariaLabel = null;
        /**
         * Id of the element that labels the modal.
         */
        this.ariaLabelledBy = null;
        /**
         * Id of the element that describes the modal.
         */
        this.ariaDescribedBy = null;
        /**
         * Whether the modal should have a backdrop.
         */
        this.hasBackdrop = true;
        /**
         * Global classes to apply to the backdrop.
         */
        this.backdropClass = '';
        /**
         * Whether clicking on the backdrop should close the modal. Only works if hasBackdrop is true.
         */
        this.backdropClickCloseable = true;
        /**
         * Global classes to apply to the modal panel.
         */
        this.modalPanelClass = '';
        /**
         * Whether the escape key should close the modal.
         */
        this.escKeyCloseable = true;
        /**
         * Whether the modal should be focus trapped.
         */
        this.focusTrapped = true;
        /**
         * The container that the modal is appended to. By default, it is appended to the body.
         */
        this.container = 'body';
    }
    return ModalConfig;
}());
export { ModalConfig };
if (false) {
    /**
     * Id for the modal component. If omitted, a unique one is generated.
     * @type {?}
     */
    ModalConfig.prototype.id;
    /**
     * Width of the modal.
     * @type {?}
     */
    ModalConfig.prototype.width;
    /**
     * Height of the modal.
     * @type {?}
     */
    ModalConfig.prototype.height;
    /**
     * Minimum width of the modal.
     * @type {?}
     */
    ModalConfig.prototype.minWidth;
    /**
     * Minimum height of the modal.
     * @type {?}
     */
    ModalConfig.prototype.minHeight;
    /**
     * Maximum width of the modal.
     * @type {?}
     */
    ModalConfig.prototype.maxWidth;
    /**
     * Maximum height of the modal.
     * @type {?}
     */
    ModalConfig.prototype.maxHeight;
    /**
     * Position of the modal.
     * @type {?}
     */
    ModalConfig.prototype.position;
    /**
     * Aria label for the modal component element.
     * @type {?}
     */
    ModalConfig.prototype.ariaLabel;
    /**
     * Id of the element that labels the modal.
     * @type {?}
     */
    ModalConfig.prototype.ariaLabelledBy;
    /**
     * Id of the element that describes the modal.
     * @type {?}
     */
    ModalConfig.prototype.ariaDescribedBy;
    /**
     * Whether the modal should have a backdrop.
     * @type {?}
     */
    ModalConfig.prototype.hasBackdrop;
    /**
     * Global classes to apply to the backdrop.
     * @type {?}
     */
    ModalConfig.prototype.backdropClass;
    /**
     * Whether clicking on the backdrop should close the modal. Only works if hasBackdrop is true.
     * @type {?}
     */
    ModalConfig.prototype.backdropClickCloseable;
    /**
     * Global classes to apply to the modal panel.
     * @type {?}
     */
    ModalConfig.prototype.modalPanelClass;
    /**
     * Whether the escape key should close the modal.
     * @type {?}
     */
    ModalConfig.prototype.escKeyCloseable;
    /**
     * Whether the modal should be focus trapped.
     * @type {?}
     */
    ModalConfig.prototype.focusTrapped;
    /**
     * The container that the modal is appended to. By default, it is appended to the body.
     * @type {?}
     */
    ModalConfig.prototype.container;
    /**
     * Data to pass along to the content through the ModalRef.
     * @type {?}
     */
    ModalConfig.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGZ1bmRhbWVudGFsLW5neC9jb3JlLyIsInNvdXJjZXMiOlsibGliL21vZGFsL21vZGFsLXV0aWxzL21vZGFsLWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUE7SUFBQTs7OztRQTJCSSxjQUFTLEdBQVksSUFBSSxDQUFDOzs7O1FBRzFCLG1CQUFjLEdBQVksSUFBSSxDQUFDOzs7O1FBRy9CLG9CQUFlLEdBQVksSUFBSSxDQUFDOzs7O1FBR2hDLGdCQUFXLEdBQWEsSUFBSSxDQUFDOzs7O1FBRzdCLGtCQUFhLEdBQVksRUFBRSxDQUFDOzs7O1FBRzVCLDJCQUFzQixHQUFhLElBQUksQ0FBQzs7OztRQUd4QyxvQkFBZSxHQUFZLEVBQUUsQ0FBQzs7OztRQUc5QixvQkFBZSxHQUFhLElBQUksQ0FBQzs7OztRQUdqQyxpQkFBWSxHQUFhLElBQUksQ0FBQzs7OztRQUc5QixjQUFTLEdBQTBCLE1BQU0sQ0FBQztJQUk5QyxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBMURELElBMERDOzs7Ozs7O0lBdkRHLHlCQUFZOzs7OztJQUdaLDRCQUFlOzs7OztJQUdmLDZCQUFnQjs7Ozs7SUFHaEIsK0JBQWtCOzs7OztJQUdsQixnQ0FBbUI7Ozs7O0lBR25CLCtCQUFrQjs7Ozs7SUFHbEIsZ0NBQW1COzs7OztJQUduQiwrQkFBeUI7Ozs7O0lBR3pCLGdDQUEwQjs7Ozs7SUFHMUIscUNBQStCOzs7OztJQUcvQixzQ0FBZ0M7Ozs7O0lBR2hDLGtDQUE2Qjs7Ozs7SUFHN0Isb0NBQTRCOzs7OztJQUc1Qiw2Q0FBd0M7Ozs7O0lBR3hDLHNDQUE4Qjs7Ozs7SUFHOUIsc0NBQWlDOzs7OztJQUdqQyxtQ0FBOEI7Ozs7O0lBRzlCLGdDQUEwQzs7Ozs7SUFHMUMsMkJBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbmZpZ3VyYXRpb24gZm9yIG9wZW5pbmcgYSBtb2RhbCB3aXRoIHRoZSBNb2RhbFNlcnZpY2UuXG4gKi9cbmltcG9ydCB7IE1vZGFsUG9zaXRpb24gfSBmcm9tICcuL21vZGFsLXBvc2l0aW9uJztcbmltcG9ydCB7IER5bmFtaWNDb21wb25lbnRDb25maWcgfSBmcm9tICcuLi8uLi91dGlscy9keW5hbWljLWNvbXBvbmVudC9keW5hbWljLWNvbXBvbmVudC1jb25maWcnO1xuXG5leHBvcnQgY2xhc3MgTW9kYWxDb25maWcgaW1wbGVtZW50cyBEeW5hbWljQ29tcG9uZW50Q29uZmlnIHtcblxuICAgIC8qKiBJZCBmb3IgdGhlIG1vZGFsIGNvbXBvbmVudC4gSWYgb21pdHRlZCwgYSB1bmlxdWUgb25lIGlzIGdlbmVyYXRlZC4gKi9cbiAgICBpZD86IHN0cmluZztcblxuICAgIC8qKiBXaWR0aCBvZiB0aGUgbW9kYWwuICovXG4gICAgd2lkdGg/OiBzdHJpbmc7XG5cbiAgICAvKiogSGVpZ2h0IG9mIHRoZSBtb2RhbC4gKi9cbiAgICBoZWlnaHQ/OiBzdHJpbmc7XG5cbiAgICAvKiogTWluaW11bSB3aWR0aCBvZiB0aGUgbW9kYWwuICovXG4gICAgbWluV2lkdGg/OiBzdHJpbmc7XG5cbiAgICAvKiogTWluaW11bSBoZWlnaHQgb2YgdGhlIG1vZGFsLiAqL1xuICAgIG1pbkhlaWdodD86IHN0cmluZztcblxuICAgIC8qKiBNYXhpbXVtIHdpZHRoIG9mIHRoZSBtb2RhbC4gKi9cbiAgICBtYXhXaWR0aD86IHN0cmluZztcblxuICAgIC8qKiBNYXhpbXVtIGhlaWdodCBvZiB0aGUgbW9kYWwuICovXG4gICAgbWF4SGVpZ2h0Pzogc3RyaW5nO1xuXG4gICAgLyoqIFBvc2l0aW9uIG9mIHRoZSBtb2RhbC4gKi9cbiAgICBwb3NpdGlvbj86IE1vZGFsUG9zaXRpb247XG5cbiAgICAvKiogQXJpYSBsYWJlbCBmb3IgdGhlIG1vZGFsIGNvbXBvbmVudCBlbGVtZW50LiAqL1xuICAgIGFyaWFMYWJlbD86IHN0cmluZyA9IG51bGw7XG5cbiAgICAvKiogSWQgb2YgdGhlIGVsZW1lbnQgdGhhdCBsYWJlbHMgdGhlIG1vZGFsLiAqL1xuICAgIGFyaWFMYWJlbGxlZEJ5Pzogc3RyaW5nID0gbnVsbDtcblxuICAgIC8qKiBJZCBvZiB0aGUgZWxlbWVudCB0aGF0IGRlc2NyaWJlcyB0aGUgbW9kYWwuICovXG4gICAgYXJpYURlc2NyaWJlZEJ5Pzogc3RyaW5nID0gbnVsbDtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBtb2RhbCBzaG91bGQgaGF2ZSBhIGJhY2tkcm9wLiAqL1xuICAgIGhhc0JhY2tkcm9wPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogR2xvYmFsIGNsYXNzZXMgdG8gYXBwbHkgdG8gdGhlIGJhY2tkcm9wLiAqL1xuICAgIGJhY2tkcm9wQ2xhc3M/OiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBiYWNrZHJvcCBzaG91bGQgY2xvc2UgdGhlIG1vZGFsLiBPbmx5IHdvcmtzIGlmIGhhc0JhY2tkcm9wIGlzIHRydWUuICovXG4gICAgYmFja2Ryb3BDbGlja0Nsb3NlYWJsZT86IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgLyoqIEdsb2JhbCBjbGFzc2VzIHRvIGFwcGx5IHRvIHRoZSBtb2RhbCBwYW5lbC4gKi9cbiAgICBtb2RhbFBhbmVsQ2xhc3M/OiBzdHJpbmcgPSAnJztcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBlc2NhcGUga2V5IHNob3VsZCBjbG9zZSB0aGUgbW9kYWwuICovXG4gICAgZXNjS2V5Q2xvc2VhYmxlPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogV2hldGhlciB0aGUgbW9kYWwgc2hvdWxkIGJlIGZvY3VzIHRyYXBwZWQuICovXG4gICAgZm9jdXNUcmFwcGVkPzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICAvKiogVGhlIGNvbnRhaW5lciB0aGF0IHRoZSBtb2RhbCBpcyBhcHBlbmRlZCB0by4gQnkgZGVmYXVsdCwgaXQgaXMgYXBwZW5kZWQgdG8gdGhlIGJvZHkuICovXG4gICAgY29udGFpbmVyPzogSFRNTEVsZW1lbnQgfCAnYm9keScgPSAnYm9keSc7XG5cbiAgICAvKiogRGF0YSB0byBwYXNzIGFsb25nIHRvIHRoZSBjb250ZW50IHRocm91Z2ggdGhlIE1vZGFsUmVmLiAqL1xuICAgIGRhdGE/OiBhbnk7XG59XG4iXX0=