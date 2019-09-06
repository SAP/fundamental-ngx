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
export class ModalTitleDirective {
    constructor() {
        /**
         * @hidden
         */
        this.modalTitle = true;
    }
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
export class ModalCloseButtonDirective {
    constructor() {
        /**
         * @hidden
         */
        this.lightButton = true;
        /**
         * @hidden
         */
        this.modalClose = true;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC9tb2RhbC11dGlscy9tb2RhbC1kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7QUFjdkQsTUFBTSxPQUFPLG1CQUFtQjtJQUxoQzs7OztRQVNJLGVBQVUsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQzs7O1lBVkEsU0FBUyxTQUFDOzs7Z0JBR1AsUUFBUSxFQUFFLGtCQUFrQjthQUMvQjs7O3lCQUlJLFdBQVcsU0FBQyx1QkFBdUI7Ozs7Ozs7SUFBcEMseUNBQ2tCOzs7Ozs7Ozs7QUFldEIsTUFBTSxPQUFPLHlCQUF5QjtJQUx0Qzs7OztRQVNJLGdCQUFXLEdBQUcsSUFBSSxDQUFDOzs7O1FBSW5CLGVBQVUsR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQzs7O1lBZEEsU0FBUyxTQUFDOzs7Z0JBR1AsUUFBUSxFQUFFLHNCQUFzQjthQUNuQzs7OzBCQUlJLFdBQVcsU0FBQyx3QkFBd0I7eUJBSXBDLFdBQVcsU0FBQyx1QkFBdUI7Ozs7Ozs7SUFKcEMsZ0RBQ21COzs7OztJQUduQiwrQ0FDa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRoYXQgYXBwbGllcyBmdW5kYW1lbnRhbCBtb2RhbCBzdHlsaW5nIHRvIGEgaGVhZGVyLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxoMSBmZC1tb2RhbC10aXRsZT5Nb2RhbCBUaXRsZTwvaDE+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gVE9ETyB0byBiZSBkaXNjdXNzZWRcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtbW9kYWwtdGl0bGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBNb2RhbFRpdGxlRGlyZWN0aXZlIHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1tb2RhbF9fdGl0bGUnKVxuICAgIG1vZGFsVGl0bGUgPSB0cnVlO1xufVxuXG4vKipcbiAqIERpcmVjdGl2ZSB0aGF0IGFwcGxpZXMgZnVuZGFtZW50YWwgbW9kYWwgc3R5bGluZyB0byBhIGJ1dHRvbi5cbiAqXG4gKiBgYGBodG1sXG4gKiA8YnV0dG9uIGZkLW1vZGFsLWNsb3NlLWJ0bj48L2J1dHRvbj5cbiAqIGBgYFxuICovXG5ARGlyZWN0aXZlKHtcbiAgICAvLyBUT0RPIHRvIGJlIGRpc2N1c3NlZFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpkaXJlY3RpdmUtc2VsZWN0b3JcbiAgICBzZWxlY3RvcjogJ1tmZC1tb2RhbC1jbG9zZS1idG5dJ1xufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENsb3NlQnV0dG9uRGlyZWN0aXZlIHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1idXR0b24tLWxpZ2h0JylcbiAgICBsaWdodEJ1dHRvbiA9IHRydWU7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtbW9kYWxfX2Nsb3NlJylcbiAgICBtb2RhbENsb3NlID0gdHJ1ZTtcbn1cbiJdfQ==