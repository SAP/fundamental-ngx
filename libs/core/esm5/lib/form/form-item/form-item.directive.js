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
var FormItemDirective = /** @class */ (function () {
    function FormItemDirective() {
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
    return FormItemDirective;
}());
export { FormItemDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1pdGVtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2Zvcm0taXRlbS9mb3JtLWl0ZW0uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUFXOUQ7SUFBQTs7OztRQVVJLFlBQU8sR0FBWSxLQUFLLENBQUM7Ozs7UUFLekIsYUFBUSxHQUFZLEtBQUssQ0FBQzs7OztRQUkxQixvQkFBZSxHQUFZLElBQUksQ0FBQztJQUNwQyxDQUFDOztnQkFwQkEsU0FBUyxTQUFDOzs7b0JBR1AsUUFBUSxFQUFFLGdCQUFnQjtpQkFDN0I7OzswQkFJSSxLQUFLLFlBQ0wsV0FBVyxTQUFDLDRCQUE0QjsyQkFJeEMsS0FBSyxZQUNMLFdBQVcsU0FBQyw2QkFBNkI7a0NBSXpDLFdBQVcsU0FBQyxxQkFBcUI7O0lBRXRDLHdCQUFDO0NBQUEsQUFwQkQsSUFvQkM7U0FmWSxpQkFBaUI7Ozs7OztJQUcxQixvQ0FFeUI7Ozs7O0lBR3pCLHFDQUUwQjs7Ozs7SUFHMUIsNENBQ2dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBEaXJlY3RpdmUgdG8gYmUgYXBwbGllZCB0byB0aGUgcGFyZW50IG9mIGEgZm9ybSBjb250cm9sLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxkaXYgZmQtZm9ybS1pdGVtPlxuICogICAgIDxpbnB1dCBmZC1mb3JtLWNvbnRyb2wgdHlwZT1cInRleHRcIiAvPlxuICogPC9kaXY+XG4gKiBgYGBcbiAqL1xuQERpcmVjdGl2ZSh7XG4gICAgLy8gVE9ETyB0byBiZSBkaXNjdXNzZWRcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGlyZWN0aXZlLXNlbGVjdG9yXG4gICAgc2VsZWN0b3I6ICdbZmQtZm9ybS1pdGVtXSdcbn0pXG5leHBvcnQgY2xhc3MgRm9ybUl0ZW1EaXJlY3RpdmUge1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGZvcm0gaXRlbSBpcyBhIGNoZWNrYm94LiAqL1xuICAgIEBJbnB1dCgpXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1mb3JtX19pdGVtLS1jaGVjaycpXG4gICAgaXNDaGVjazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgLyoqIFdoZXRoZXIgdGhlIGZvcm0gaXRlbSBpcyBpbmxpbmUuICovXG4gICAgQElucHV0KClcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZkLWZvcm1fX2l0ZW0tLWlubGluZScpXG4gICAgaXNJbmxpbmU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBAaGlkZGVuICovXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mZC1mb3JtX19pdGVtJylcbiAgICBmZEZvcm1JdGVtQ2xhc3M6IGJvb2xlYW4gPSB0cnVlO1xufVxuIl19