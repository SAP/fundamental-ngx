import { ChangeDetectorRef, Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import {
    FormError,
    FormErrorDescription,
    FormErrorHeading,
    FormFieldErrorContext
} from '@fundamental-ngx/platform/shared';
import { Subject } from 'rxjs';
import { FDP_FORM_ERROR_DIRECTIVE } from './tokens';

@Directive({
    selector: '[fdpFormFieldError]',
    providers: [
        {
            provide: FDP_FORM_ERROR_DIRECTIVE,
            useExisting: FormFieldErrorDirective
        }
    ],
    standalone: true
})
export class FormFieldErrorDirective<T = any> implements FormError<T>, OnInit {
    /** Used to connect data with model for typings support. */
    @Input()
    fdpFormFieldErrorAs: T;

    /** Error name */
    @Input('fdpFormFieldError')
    error: string;

    /** Error type */
    @Input()
    fdpFormFieldErrorType: FormStates = 'error';

    /** @ignore */
    detectChanges$ = new Subject<void>();

    /** Error type. Defines which type to return. Either self, or from heading directive. */
    get type(): FormStates {
        return this._headingDirective?.fdpFormFieldErrorHeadingType ?? this.fdpFormFieldErrorType;
    }

    /** @ignore */
    private _headingDirective: FormErrorHeading | undefined;

    /** @ignore */
    private _descriptionDirective: FormErrorDescription | undefined;

    /** @ignore */
    private _detectTimeout: ReturnType<typeof setTimeout>;

    /** @ignore */
    get _headingTemplateRef(): TemplateRef<FormFieldErrorContext<T>> {
        return this._headingDirective?.templateRef ?? this.templateRef;
    }

    /** @ignore */
    get _descriptionTemplateRef(): TemplateRef<FormFieldErrorContext<T>> | null {
        return this._descriptionDirective?.templateRef ?? null;
    }

    /** @ignore */
    static ngTemplateContextGuard(
        dir: FormFieldErrorDirective,
        ctx: FormFieldErrorContext<any>
    ): ctx is FormFieldErrorContext<any> {
        return true;
    }

    /** @ignore */
    constructor(
        public templateRef: TemplateRef<FormFieldErrorContext<T>>,
        private _viewContainer: ViewContainerRef,
        private _cdr: ChangeDetectorRef
    ) {}

    /** @ignore */
    ngOnInit(): void {
        // We need to create view in order to initialize child directives immediately.
        this._createView();
    }

    /** Registers child heading directive. */
    registerHeading(directive: FormErrorHeading): void {
        this._headingDirective = directive;
        this._detectChanges();
    }

    /** Registers child description directive. */
    registerDescription(directive: FormErrorDescription): void {
        this._descriptionDirective = directive;
        this._detectChanges();
    }

    /** @ignore */
    private _createView(): void {
        this._viewContainer.createEmbeddedView(this.templateRef);
        this._viewContainer.detach();
    }

    /** @ignore */
    private _detectChanges(): void {
        // Since child directives can register itself almost instantly, we need to trigger detect changes only one time,
        // in order to bypass error with expected/actual directives count.
        clearTimeout(this._detectTimeout);
        this._detectTimeout = setTimeout(() => {
            this._cdr.detectChanges();
            this.detectChanges$.next();
        }, 5);
    }
}
