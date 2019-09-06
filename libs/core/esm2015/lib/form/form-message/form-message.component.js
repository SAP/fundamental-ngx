/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * Form message. Intended to be displayed under a form control for validation purposes.
 */
export class FormMessageComponent {
    constructor() {
        /**
         * Type of the message. Can be `text`, `help`, `error` and `warning`.
         */
        this.type = '';
    }
}
FormMessageComponent.decorators = [
    { type: Component, args: [{
                selector: 'fd-form-message',
                template: "<span class=\"fd-form__message\" [ngClass]=\"[type ? ' fd-form__message--' + type : '']\">\n  <ng-content></ng-content>\n</span>\n",
                encapsulation: ViewEncapsulation.None
            }] }
];
FormMessageComponent.propDecorators = {
    type: [{ type: Input }]
};
if (false) {
    /**
     * Type of the message. Can be `text`, `help`, `error` and `warning`.
     * @type {?}
     */
    FormMessageComponent.prototype.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2Zvcm0tbWVzc2FnZS9mb3JtLW1lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQVVwRSxNQUFNLE9BQU8sb0JBQW9CO0lBTGpDOzs7O1FBU0ksU0FBSSxHQUFXLEVBQUUsQ0FBQztJQUN0QixDQUFDOzs7WUFWQSxTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsOElBQTRDO2dCQUM1QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN4Qzs7O21CQUlJLEtBQUs7Ozs7Ozs7SUFBTixvQ0FDa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG4vKipcbiAqIEZvcm0gbWVzc2FnZS4gSW50ZW5kZWQgdG8gYmUgZGlzcGxheWVkIHVuZGVyIGEgZm9ybSBjb250cm9sIGZvciB2YWxpZGF0aW9uIHB1cnBvc2VzLlxuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2ZkLWZvcm0tbWVzc2FnZScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Zvcm0tbWVzc2FnZS5jb21wb25lbnQuaHRtbCcsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGb3JtTWVzc2FnZUNvbXBvbmVudCB7XG5cbiAgICAvKiogVHlwZSBvZiB0aGUgbWVzc2FnZS4gQ2FuIGJlIGB0ZXh0YCwgYGhlbHBgLCBgZXJyb3JgIGFuZCBgd2FybmluZ2AuICovXG4gICAgQElucHV0KClcbiAgICB0eXBlOiBzdHJpbmcgPSAnJztcbn1cbiJdfQ==