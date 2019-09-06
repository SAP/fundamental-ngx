/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding } from '@angular/core';
/**
 * Applies fundamental layout and styling to the contents of a modal body.
 *
 * ```html
 * <fd-modal-body>
 *     <div>Modal body content</div>
 * </fd-modal-body>
 * ```
 */
export class ModalBodyComponent {
    constructor() {
        /**
         * @hidden
         */
        this.modalBody = true;
    }
}
ModalBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-modal-body',
                template: "<ng-content></ng-content>\n",
                styles: [`
        :host {
            display: block;
            overflow: auto;
            flex-grow: 1;
        }
    `]
            }] }
];
ModalBodyComponent.propDecorators = {
    modalBody: [{ type: HostBinding, args: ['class.fd-modal__body',] }]
};
if (false) {
    /**
     * @hidden
     * @type {?}
     */
    ModalBodyComponent.prototype.modalBody;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYm9keS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZnVuZGFtZW50YWwtbmd4L2NvcmUvIiwic291cmNlcyI6WyJsaWIvbW9kYWwvbW9kYWwtYm9keS9tb2RhbC1ib2R5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFzQnZELE1BQU0sT0FBTyxrQkFBa0I7SUFYL0I7Ozs7UUFlSSxjQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7OztZQWhCQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLHVDQUEwQzt5QkFDakM7Ozs7OztLQU1SO2FBQ0o7Ozt3QkFJSSxXQUFXLFNBQUMsc0JBQXNCOzs7Ozs7O0lBQW5DLHVDQUNpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBBcHBsaWVzIGZ1bmRhbWVudGFsIGxheW91dCBhbmQgc3R5bGluZyB0byB0aGUgY29udGVudHMgb2YgYSBtb2RhbCBib2R5LlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmZC1tb2RhbC1ib2R5PlxuICogICAgIDxkaXY+TW9kYWwgYm9keSBjb250ZW50PC9kaXY+XG4gKiA8L2ZkLW1vZGFsLWJvZHk+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1tb2RhbC1ib2R5JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbW9kYWwtYm9keS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVzOiBbYFxuICAgICAgICA6aG9zdCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICB9XG4gICAgYF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxCb2R5Q29tcG9uZW50IHtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1tb2RhbF9fYm9keScpXG4gICAgbW9kYWxCb2R5ID0gdHJ1ZTtcbn1cbiJdfQ==