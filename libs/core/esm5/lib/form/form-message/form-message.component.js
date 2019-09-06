/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * Form message. Intended to be displayed under a form control for validation purposes.
 */
var FormMessageComponent = /** @class */ (function () {
    function FormMessageComponent() {
        /**
         * Type of the message. Can be `text`, `help`, `error` and `warning`.
         */
        this.type = '';
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
    return FormMessageComponent;
}());
export { FormMessageComponent };
if (false) {
    /**
     * Type of the message. Can be `text`, `help`, `error` and `warning`.
     * @type {?}
     */
    FormMessageComponent.prototype.type;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BmdW5kYW1lbnRhbC1uZ3gvY29yZS8iLCJzb3VyY2VzIjpbImxpYi9mb3JtL2Zvcm0tbWVzc2FnZS9mb3JtLW1lc3NhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7OztBQUtwRTtJQUFBOzs7O1FBU0ksU0FBSSxHQUFXLEVBQUUsQ0FBQztJQUN0QixDQUFDOztnQkFWQSxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsOElBQTRDO29CQUM1QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDeEM7Ozt1QkFJSSxLQUFLOztJQUVWLDJCQUFDO0NBQUEsQUFWRCxJQVVDO1NBTFksb0JBQW9COzs7Ozs7SUFHN0Isb0NBQ2tCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBGb3JtIG1lc3NhZ2UuIEludGVuZGVkIHRvIGJlIGRpc3BsYXllZCB1bmRlciBhIGZvcm0gY29udHJvbCBmb3IgdmFsaWRhdGlvbiBwdXJwb3Nlcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdmZC1mb3JtLW1lc3NhZ2UnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mb3JtLW1lc3NhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgRm9ybU1lc3NhZ2VDb21wb25lbnQge1xuXG4gICAgLyoqIFR5cGUgb2YgdGhlIG1lc3NhZ2UuIENhbiBiZSBgdGV4dGAsIGBoZWxwYCwgYGVycm9yYCBhbmQgYHdhcm5pbmdgLiAqL1xuICAgIEBJbnB1dCgpXG4gICAgdHlwZTogc3RyaW5nID0gJyc7XG59XG4iXX0=