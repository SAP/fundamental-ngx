import { Directive, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { FormError, FormErrorDescription, FormFieldErrorContext } from '@fundamental-ngx/platform/shared';
import { FDP_FORM_ERROR_DIRECTIVE } from './tokens';

@Directive({
    selector: '[fdpFormFieldErrorDescription]'
})
export class FormFieldErrorDescriptionDirective<T = any> implements FormErrorDescription {
    /** Used to connect data with model for typings support. */
    @Input()
    fdpFormFieldErrorDescriptionAs: T;

    /** @hidden */
    static ngTemplateContextGuard(
        dir: FormFieldErrorDescriptionDirective,
        ctx: FormFieldErrorContext<any>
    ): ctx is FormFieldErrorContext<any> {
        return true;
    }

    /** @hidden */
    constructor(
        public templateRef: TemplateRef<FormFieldErrorContext<T>>,
        @Optional() @Inject(FDP_FORM_ERROR_DIRECTIVE) private _formFieldErrorDirective: FormError
    ) {
        this._formFieldErrorDirective?.registerDescription(this);
    }
}
