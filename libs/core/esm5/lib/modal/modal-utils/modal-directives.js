/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, HostBinding } from '@angular/core';
/**
 * Directive that applies fundamental modal styling to a header.
 *
 * ```html
 * <h1 fd-modal-title>Modal Title</h1>
 * ```
 */
var ModalTitleDirective = /** @class */ (function () {
    function ModalTitleDirective() {
        /**
         * @hidden
         */
        this.modalTitle = true;
    }
    ModalTitleDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-modal-title]'
                },] }
    ];
    ModalTitleDirective.propDecorators = {
        modalTitle: [{ type: HostBinding, args: ['class.fd-modal__title',] }]
    };
    return ModalTitleDirective;
}());
export { ModalTitleDirective };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    ModalTitleDirective.prototype.modalTitle;
}
/**
 * Directive that applies fundamental modal styling to a button.
 *
 * ```html
 * <button fd-modal-close-btn></button>
 * ```
 */
var ModalCloseButtonDirective = /** @class */ (function () {
    function ModalCloseButtonDirective() {
        /**
         * @hidden
         */
        this.lightButton = true;
        /**
         * @hidden
         */
        this.modalClose = true;
    }
    ModalCloseButtonDirective.decorators = [
        { type: Directive, args: [{
                    // TODO to be discussed
                    // tslint:disable-next-line:directive-selector
                    selector: '[fd-modal-close-btn]'
                },] }
    ];
    ModalCloseButtonDirective.propDecorators = {
        lightButton: [{ type: HostBinding, args: ['class.fd-button--light',] }],
        modalClose: [{ type: HostBinding, args: ['class.fd-modal__close',] }]
    };
    return ModalCloseButtonDirective;
}());
export { ModalCloseButtonDirective };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    ModalCloseButtonDirective.prototype.lightButton;
    /**
     * @hidden
     * @type {?}
     */
    ModalCloseButtonDirective.prototype.modalClose;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC9tb2RhbC11dGlscy9tb2RhbC1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFTdkQ7SUFBQTs7OztRQVNJLGVBQVUsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQzs7Z0JBVkEsU0FBUyxTQUFDOzs7b0JBR1AsUUFBUSxFQUFFLGtCQUFrQjtpQkFDL0I7Ozs2QkFJSSxXQUFXLFNBQUMsdUJBQXVCOztJQUV4QywwQkFBQztDQUFBLEFBVkQsSUFVQztTQUxZLG1CQUFtQjs7Ozs7O0lBRzVCLHlDQUNrQjs7Ozs7Ozs7O0FBVXRCO0lBQUE7Ozs7UUFTSSxnQkFBVyxHQUFHLElBQUksQ0FBQzs7OztRQUluQixlQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7O2dCQWRBLFNBQVMsU0FBQzs7O29CQUdQLFFBQVEsRUFBRSxzQkFBc0I7aUJBQ25DOzs7OEJBSUksV0FBVyxTQUFDLHdCQUF3Qjs2QkFJcEMsV0FBVyxTQUFDLHVCQUF1Qjs7SUFFeEMsZ0NBQUM7Q0FBQSxBQWRELElBY0M7U0FUWSx5QkFBeUI7Ozs7OztJQUdsQyxnREFDbUI7Ozs7O0lBR25CLCtDQUNrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdGhhdCBhcHBsaWVzIGZ1bmRhbWVudGFsIG1vZGFsIHN0eWxpbmcgdG8gYSBoZWFkZXIuXG4gKlxuICogYGBgaHRtbFxuICogPGgxIGZkLW1vZGFsLXRpdGxlPk1vZGFsIFRpdGxlPC9oMT5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1tb2RhbC10aXRsZV0nXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsVGl0bGVEaXJlY3RpdmUge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLW1vZGFsX190aXRsZScpXG4gICAgbW9kYWxUaXRsZSA9IHRydWU7XG59XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYXBwbGllcyBmdW5kYW1lbnRhbCBtb2RhbCBzdHlsaW5nIHRvIGEgYnV0dG9uLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxidXR0b24gZmQtbW9kYWwtY2xvc2UtYnRuPjwvYnV0dG9uPlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIFRPRE8gdG8gYmUgZGlzY3Vzc2VkXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLW1vZGFsLWNsb3NlLWJ0bl0nXG59KVxuZXhwb3J0IGNsYXNzIE1vZGFsQ2xvc2VCdXR0b25EaXJlY3RpdmUge1xuXG4gICAgLyoqIEBoaWRkZW4gKi9cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWJ1dHRvbi0tbGlnaHQnKVxuICAgIGxpZ2h0QnV0dG9uID0gdHJ1ZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1tb2RhbF9fY2xvc2UnKVxuICAgIG1vZGFsQ2xvc2UgPSB0cnVlO1xufVxuIl19