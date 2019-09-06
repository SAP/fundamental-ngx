/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, HostBinding } from '@angular/core';
/**
 * Directive to be applied to the parent of a form control.
 *
 * ```html
 * <div fd-form-item>
 *     <input fd-form-control type="text" />
 * </div>
 * ```
 */
export class FormItemDirective {
    constructor() {
        /**
         * Whether the form item is a checkbox.
         */
        this.isCheck = false;
        /**
         * Whether the form item is inline.
         */
        this.isInline = false;
        /**
         * @hidden
         */
        this.fdFormItemClass = true;
    }
}
FormItemDirective.decorators = [
    { type: Directive, args: [{
                // TODO to be discussed
                // tslint:disable-next-line:directive-selector
                selector: '[fd-form-item]'
            },] }
];
FormItemDirective.propDecorators = {
    isCheck: [{ type: Input }, { type: HostBinding, args: ['class.fd-form__item--check',] }],
    isInline: [{ type: Input }, { type: HostBinding, args: ['class.fd-form__item--inline',] }],
    fdFormItemClass: [{ type: HostBinding, args: ['class.fd-form__item',] }]
};
if (false) {
    /**
     * Whether the form item is a checkbox.
     * @type {?}
     */
    FormItemDirective.prototype.isCheck;
    /**
     * Whether the form item is inline.
     * @type {?}
     */
    FormItemDirective.prototype.isInline;
    /**
     * @hidden
     * @type {?}
     */
    FormItemDirective.prototype.fdFormItemClass;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2Zvcm0taXRlbS9mb3JtLWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFnQjlELE1BQU0sT0FBTyxpQkFBaUI7SUFMOUI7Ozs7UUFVSSxZQUFPLEdBQVksS0FBSyxDQUFDOzs7O1FBS3pCLGFBQVEsR0FBWSxLQUFLLENBQUM7Ozs7UUFJMUIsb0JBQWUsR0FBWSxJQUFJLENBQUM7SUFDcEMsQ0FBQzs7O1lBcEJBLFNBQVMsU0FBQzs7O2dCQUdQLFFBQVEsRUFBRSxnQkFBZ0I7YUFDN0I7OztzQkFJSSxLQUFLLFlBQ0wsV0FBVyxTQUFDLDRCQUE0Qjt1QkFJeEMsS0FBSyxZQUNMLFdBQVcsU0FBQyw2QkFBNkI7OEJBSXpDLFdBQVcsU0FBQyxxQkFBcUI7Ozs7Ozs7SUFWbEMsb0NBRXlCOzs7OztJQUd6QixxQ0FFMEI7Ozs7O0lBRzFCLDRDQUNnQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbi8qKlxuICogRGlyZWN0aXZlIHRvIGJlIGFwcGxpZWQgdG8gdGhlIHBhcmVudCBvZiBhIGZvcm0gY29udHJvbC5cbiAqXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGZkLWZvcm0taXRlbT5cbiAqICAgICA8aW5wdXQgZmQtZm9ybS1jb250cm9sIHR5cGU9XCJ0ZXh0XCIgLz5cbiAqIDwvZGl2PlxuICogYGBgXG4gKi9cbkBEaXJlY3RpdmUoe1xuICAgIC8vIFRPRE8gdG8gYmUgZGlzY3Vzc2VkXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRpcmVjdGl2ZS1zZWxlY3RvclxuICAgIHNlbGVjdG9yOiAnW2ZkLWZvcm0taXRlbV0nXG59KVxuZXhwb3J0IGNsYXNzIEZvcm1JdGVtRGlyZWN0aXZlIHtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBmb3JtIGl0ZW0gaXMgYSBjaGVja2JveC4gKi9cbiAgICBASW5wdXQoKVxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtZm9ybV9faXRlbS0tY2hlY2snKVxuICAgIGlzQ2hlY2s6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBXaGV0aGVyIHRoZSBmb3JtIGl0ZW0gaXMgaW5saW5lLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1mb3JtX19pdGVtLS1pbmxpbmUnKVxuICAgIGlzSW5saW5lOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MuZmQtZm9ybV9faXRlbScpXG4gICAgZmRGb3JtSXRlbUNsYXNzOiBib29sZWFuID0gdHJ1ZTtcbn1cbiJdfQ==