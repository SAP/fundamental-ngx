/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding } from '@angular/core';
/**
 * Applies fundamental layout and styling to the contents of a modal header.
 *
 * ```html
 * <fd-modal-header>
 *     <h1 fd-modal-title>Title</h1>
 *     <button fd-modal-close-btn></button>
 * </fd-modal-header>
 * ```
 */
var ModalHeaderComponent = /** @class */ (function () {
    function ModalHeaderComponent() {
        /**
         * @hidden
         */
        this.modalHeader = true;
    }
    ModalHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fd-modal-header',
                    template: "<ng-content></ng-content>\n",
                    styles: [':host {display: block;}']
                }] }
    ];
    ModalHeaderComponent.propDecorators = {
        modalHeader: [{ type: HostBinding, args: ['class.fd-modal__header',] }]
    };
    return ModalHeaderComponent;
}());
export { ModalHeaderComponent };
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    ModalHeaderComponent.prototype.modalHeader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC9tb2RhbC1oZWFkZXIvbW9kYWwtaGVhZGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7O0FBWXZEO0lBQUE7Ozs7UUFTSSxnQkFBVyxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDOztnQkFWQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsdUNBQTRDOzZCQUNuQyx5QkFBeUI7aUJBQ3JDOzs7OEJBSUksV0FBVyxTQUFDLHdCQUF3Qjs7SUFFekMsMkJBQUM7Q0FBQSxBQVZELElBVUM7U0FMWSxvQkFBb0I7Ozs7OztJQUc3QiwyQ0FDbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQXBwbGllcyBmdW5kYW1lbnRhbCBsYXlvdXQgYW5kIHN0eWxpbmcgdG8gdGhlIGNvbnRlbnRzIG9mIGEgbW9kYWwgaGVhZGVyLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1tb2RhbC1oZWFkZXI+XG4gKiAgICAgPGgxIGZkLW1vZGFsLXRpdGxlPlRpdGxlPC9oMT5cbiAqICAgICA8YnV0dG9uIGZkLW1vZGFsLWNsb3NlLWJ0bj48L2J1dHRvbj5cbiAqIDwvZmQtbW9kYWwtaGVhZGVyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtbW9kYWwtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwtaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZXM6IFsnOmhvc3Qge2Rpc3BsYXk6IGJsb2NrO30nXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEhlYWRlckNvbXBvbmVudCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtbW9kYWxfX2hlYWRlcicpXG4gICAgbW9kYWxIZWFkZXIgPSB0cnVlO1xufVxuIl19