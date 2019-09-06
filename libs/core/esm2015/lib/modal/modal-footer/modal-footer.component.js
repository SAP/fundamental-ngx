/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding } from '@angular/core';
/**
 * Applies fundamental layout and styling to the contents of a modal footer.
 *
 * ```html
 * <fd-modal-footer>
 *     <button>Do action</button>
 * </fd-modal-footer>
 * ```
 */
export class ModalFooterComponent {
    constructor() {
        /**
         * @hidden
         */
        this.modalFooter = true;
    }
}
ModalFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-modal-footer',
                template: "<div class=\"fd-modal__actions\">\n    <ng-content></ng-content>\n</div>\n",
                styles: [`
        :host {
            display: block;
            border-top: 1px solid #eeeeef;
        }
    `]
            }] }
];
ModalFooterComponent.propDecorators = {
    modalFooter: [{ type: HostBinding, args: ['class.fd-modal__footer',] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    ModalFooterComponent.prototype.modalFooter;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtZm9vdGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9tb2RhbC9tb2RhbC1mb290ZXIvbW9kYWwtZm9vdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFxQnZELE1BQU0sT0FBTyxvQkFBb0I7SUFWakM7Ozs7UUFjSSxnQkFBVyxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDOzs7WUFmQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0Isc0ZBQTRDO3lCQUNuQzs7Ozs7S0FLUjthQUNKOzs7MEJBSUksV0FBVyxTQUFDLHdCQUF3Qjs7Ozs7OztJQUFyQywyQ0FDbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogQXBwbGllcyBmdW5kYW1lbnRhbCBsYXlvdXQgYW5kIHN0eWxpbmcgdG8gdGhlIGNvbnRlbnRzIG9mIGEgbW9kYWwgZm9vdGVyLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1tb2RhbC1mb290ZXI+XG4gKiAgICAgPGJ1dHRvbj5EbyBhY3Rpb248L2J1dHRvbj5cbiAqIDwvZmQtbW9kYWwtZm9vdGVyPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZmQtbW9kYWwtZm9vdGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwtZm9vdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZXM6IFtgXG4gICAgICAgIDpob3N0IHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWVlZWY7XG4gICAgICAgIH1cbiAgICBgXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbEZvb3RlckNvbXBvbmVudCB7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtbW9kYWxfX2Zvb3RlcicpXG4gICAgbW9kYWxGb290ZXIgPSB0cnVlO1xufVxuIl19