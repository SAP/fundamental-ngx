import { Directive, Inject, Input, Optional, TemplateRef } from '@angular/core';
import { FormStates } from '@fundamental-ngx/core/shared';
import { FormError, FormErrorHeading, FormFieldErrorContext } from '@fundamental-ngx/platform/shared';
import { FDP_FORM_ERROR_DIRECTIVE } from './tokens';

@Directive({
    selector: '[fdpFormFieldErrorHeading]'
})
export class FormFieldErrorHeadingDirective<T = any> implements FormErrorHeading {
    /** Used to connect data with model for typings support. */
    @Input()
    fdpFormFieldErrorHeadingAs: T;

    /** Error type. */
    @Input()
    fdpFormFieldErrorHeadingType: FormStates | undefined;

    /** @hidden */
    static ngTemplateContextGuard(
        dir: FormFieldErrorHeadingDirective,
        ctx: FormFieldErrorContext<any>
    ): ctx is FormFieldErrorContext<any> {
        return true;
    }

    /** @hidden */
    constructor(
        public templateRef: TemplateRef<FormFieldErrorContext<T>>,
        @Optional() @Inject(FDP_FORM_ERROR_DIRECTIVE) private _formFieldErrorDirective: FormError
    ) {
        this._formFieldErrorDirective?.registerHeading(this);
    }
}
