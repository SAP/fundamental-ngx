import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    DestroyRef,
    Inject,
    Input,
    OnDestroy,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { AbstractControl, ControlContainer, FormGroup, FormGroupDirective, NgForm, NgModel } from '@angular/forms';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
    FormFieldErrorDirectiveContext,
    PlatformFormField,
    PlatformFormFieldControl
} from '@fundamental-ngx/platform/shared';
import { BehaviorSubject, filter, startWith, Subject, Subscription, switchMap, zip } from 'rxjs';
import { FDP_MESSAGE_POPOVER_CONFIG, MessagePopoverConfig, MessagePopoverErrorConfig } from '../../default-config';
import { MessagePopoverFormItemDirective } from '../../directives/message-popover-form-item.directive';
import {
    MessagePopoverEntry,
    MessagePopoverErrorGroup,
    MessagePopoverErrorText
} from '../../models/message-popover-entry.interface';
import { MessagePopoverWrapper } from '../../models/message-popover-wrapper.interface';
import { convertFormState } from '../../utils';
import { MessagePopover } from '../../models/message-popover.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type MessagePopoverForm = NgForm | FormGroupDirective;

@Component({
    selector: 'fdp-message-popover-form-wrapper',
    templateUrl: './message-popover-form-wrapper.component.html',
    exportAs: 'messagePopoverWrapper',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MessagePopoverFormWrapperComponent implements MessagePopoverWrapper, AfterViewInit, OnDestroy {
    /** @hidden */
    @ContentChildren(ControlContainer, { descendants: true })
    private readonly _projectedForm: QueryList<MessagePopoverForm>;
    /** @hidden */
    @ContentChildren(NgModel, { descendants: true })
    private readonly _projectedFormItems!: QueryList<NgModel>;

    /** @hidden */
    @ContentChildren(PlatformFormFieldControl, { descendants: true })
    private readonly _projectedFormFieldControls!: QueryList<PlatformFormFieldControl>;

    /** @hidden */
    @ContentChildren(MessagePopoverFormItemDirective, { descendants: true })
    private readonly _directiveItems!: QueryList<MessagePopoverFormItemDirective>;

    /** Message Popover instance. */
    messagePopover$ = new Subject<MessagePopover>();

    /**
     * User-passed forms.
     */
    @Input()
    set forms(forms: MessagePopoverForm | MessagePopoverForm[]) {
        if (!forms) {
            return;
        }
        if (!Array.isArray(forms)) {
            forms = [forms];
        }
        this._ngForms = forms;
        this._startListeningForErrors();
    }

    /** User-passed form fields. */
    @Input()
    set formFields(value: PlatformFormFieldControl[]) {
        this._formFields = value;
        this._listenToFormFieldErrors(value);
    }

    get formFields(): PlatformFormFieldControl[] {
        return this._formFields;
    }

    /** @hidden */
    private readonly _errors$ = new BehaviorSubject<MessagePopoverErrorGroup[]>([]);

    /**
     * Error models Observable. Emitted when form submitted and contains invalid fields.
     */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    errors = this._errors$.asObservable();

    /** @hidden */
    private _formFields: PlatformFormFieldControl[] = [];

    /** @hidden */
    private _formErrorsSubscription: Subscription | undefined;

    /** @hidden */
    private _ngForms: (NgForm | FormGroupDirective)[] = [];

    /** @hidden */
    private _formItemErrorsSubscription = new Subscription();

    /** @hidden */
    private _formSubmitted = false;

    /** @hidden */
    constructor(
        private readonly _destroyRef: DestroyRef,
        @Inject(FDP_MESSAGE_POPOVER_CONFIG) private readonly _config: MessagePopoverConfig
    ) {}

    /** @hidden */
    ngAfterViewInit(): void {
        // Forms are passed via input property.
        if (this._ngForms.length > 0) {
            return;
        }
        this._ngForms = this._projectedForm?.toArray();
        this._startListeningForErrors();
        this._projectedForm?.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._ngForms = this._projectedForm.toArray();
            this._startListeningForErrors();
        });
    }

    /**
     * Sets Message Popover component instance.
     */
    setMessagePopover(messagePopover: MessagePopover): void {
        this.messagePopover$.next(messagePopover);
        // this.messagePopover = messagePopover;
    }

    /**
     * Programmatically add new form to array of forms.
     * @param forms
     */
    addForms(forms: MessagePopoverForm | MessagePopoverForm[]): void {
        const formsArray = Array.isArray(forms) ? forms : [forms];
        this._ngForms.push(...formsArray);
        this._startListeningForErrors();
    }

    /**
     * Programmatically add new form fields to array of listened form fields.
     * @param formFields
     */
    addFormFields(formFields: PlatformFormFieldControl[]): void {
        this._formFields.push(...formFields);
        this._listenToFormFieldErrors(this._formFields);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._formItemErrorsSubscription.unsubscribe();
    }

    /**
     * @hidden
     * Listens to the form submission and collects form control errors.
     */
    private _startListeningForErrors(): void {
        if (!this._ngForms) {
            return;
        }
        this._formErrorsSubscription?.unsubscribe();
        this._errors$.next([]);

        const formSubmitEvents = this._ngForms.map((form) =>
            form.ngSubmit.pipe(
                switchMap(() =>
                    form.statusChanges!.pipe(
                        startWith(form.status),
                        filter((status: string) => status.toLowerCase() !== 'pending')
                    )
                )
            )
        );

        this._formErrorsSubscription = zip(...formSubmitEvents)
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._formSubmitted = true;
                const errors =
                    this._directiveItems.length > 0 ? this._collectPlainFormData() : this._collectAdvancedFormData();

                this._errors$.next(errors);
            });

        this._listenToFormFieldErrors(this._projectedFormFieldControls.toArray());

        this._projectedFormFieldControls?.changes.subscribe(() => {
            this._listenToFormFieldErrors(this._projectedFormFieldControls.toArray());
        });
    }

    /** @hidden */
    private _listenToFormFieldErrors(fields: PlatformFormFieldControl[]): void {
        this._formItemErrorsSubscription.unsubscribe();

        this._formItemErrorsSubscription = new Subscription();

        fields?.forEach((field) => {
            this._formItemErrorsSubscription.add(
                field.formField?.errorsChange$.subscribe(() => {
                    if (!this._formSubmitted) {
                        return;
                    }
                    const errors =
                        this._directiveItems.length > 0
                            ? this._collectPlainFormData()
                            : this._collectAdvancedFormData();
                    this._errors$.next(errors);
                })
            );
        });
    }

    /** @hidden */
    private _collectPlainFormData(): MessagePopoverErrorGroup[] {
        const errors: MessagePopoverErrorGroup[] = [
            {
                errors: []
            }
        ];

        const fields = this._directiveItems.toArray();

        this._ngForms.forEach((form) => {
            Object.keys(form.form.controls).forEach((controlName) => {
                const control = form.form.get(controlName);
                const field = fields.find((formField) => formField.control?.name === controlName);

                if (!control?.errors || !field) {
                    return;
                }

                const configErrors = Object.keys(this._config.errors);

                Object.keys(control.errors)
                    .filter((error) => configErrors.includes(error))
                    .forEach((errorKey) => {
                        const errorObj = control.errors![errorKey];

                        const errorTextModel = this._getConfigErrorModel(errorKey);
                        const error: MessagePopoverEntry = {
                            name: controlName,
                            type: errorTextModel.type,
                            state: convertFormState('error'),
                            fieldName: field?.label ?? '',
                            element: field?.elementRef,
                            heading: {
                                type: 'string',
                                error: errorObj,
                                message: errorTextModel.heading
                            },
                            description: {
                                type: 'string',
                                error: errorObj,
                                message: errorTextModel.description
                            },
                            errors: control!.errors
                        };

                        errors[0].errors.push(error);
                    });
            });
        });

        return errors;
    }

    /** @hidden */
    private _collectAdvancedFormData(): MessagePopoverErrorGroup[] {
        let errors: MessagePopoverErrorGroup[] = [];
        const fields = this.formFields.length > 0 ? this.formFields : this._projectedFormFieldControls.toArray();

        /**
         * Iterates over form controls to collect their errors.
         * @param form Form Group or a collection of Form Groups.
         */
        const iterateOverForm = (form: FormGroup | FormGroup[]): MessagePopoverErrorGroup[] => {
            if (Array.isArray(form)) {
                form.forEach((formGroup) => {
                    errors = iterateOverForm(formGroup);
                });
                return errors;
            }
            Object.keys(form.controls).forEach((controlName) => {
                const control = form.get(controlName);
                const field = fields.find((formField) => formField.id === controlName);

                if (control instanceof FormGroup) {
                    errors = iterateOverForm(control);
                }

                if (!control?.errors || !field) {
                    return;
                }

                Object.keys(control.errors).forEach((errorKey) => {
                    const errorDirective = field.formField?.groupedErrors.find(
                        (groupedError) => groupedError.directive.error === errorKey
                    );

                    const groupName = this._getGroupName(field?.formField);
                    const error = this._getErrorModel(
                        controlName,
                        groupName,
                        control,
                        field,
                        errorKey,
                        errorDirective,
                        control.errors![errorKey]
                    );

                    let errorGroupIndex = errors.findIndex((errorGroup) => errorGroup.group === groupName);

                    if (errorGroupIndex === -1) {
                        errorGroupIndex =
                            errors.push({
                                group: groupName,
                                errors: []
                            }) - 1;
                    }

                    const group = errors[errorGroupIndex];

                    group.errors.push(error);
                });
            });

            return errors;
        };

        return iterateOverForm(this._ngForms.map((form) => form.form));
    }

    /**
     * @hidden
     * Creates error model
     */
    private _getErrorModel(
        controlName: string,
        groupName: string,
        control: AbstractControl,
        field: PlatformFormFieldControl,
        errorKey: string,
        errorDirective?: FormFieldErrorDirectiveContext,
        error?: any
    ): MessagePopoverEntry {
        let state: FormStates = 'error';
        const configError = this._config.errors[errorKey];

        if (errorDirective?.directive.type) {
            state = errorDirective.directive.type;
        } else if (this._isAdvancedError(configError)) {
            state = configError.type;
        }

        return {
            name: controlName,
            type: state,
            state: convertFormState(state),
            group: groupName,
            fieldName: field?.formField?.label ?? '',
            heading: this._getErrorText(field, errorDirective, 'heading', errorKey, error),
            description: this._getErrorText(field, errorDirective, 'description', errorKey, error),
            errors: control!.errors,
            formField: field,
            element: field?.elementRef
        };
    }

    /**
     * @hidden
     * Creates error text based on the type of the error.
     * @param field Form Field Control.
     * @param errorDirective Optional Error directive
     * @param section Section where text should be rendered.
     * @param errorKey
     * @param error
     */
    private _getErrorText(
        field: PlatformFormFieldControl,
        errorDirective: Nullable<FormFieldErrorDirectiveContext>,
        section: 'heading' | 'description' = 'heading',
        errorKey: string,
        error?: any
    ): MessagePopoverErrorText {
        const errorTextObj: MessagePopoverErrorText = {
            error: errorDirective?.error,
            type: errorDirective?.directive ? 'directive' : field?.formField?.i18Strings ? 'templateRef' : 'string'
        };

        if (errorTextObj.type === 'string') {
            const errorTextModel = this._getConfigErrorModel(errorKey);

            errorTextObj.error = error;
            errorTextObj.message = errorTextModel[section];
            return errorTextObj;
        }

        if (errorDirective?.directive) {
            errorTextObj.message =
                section === 'heading'
                    ? errorDirective.directive._headingTemplateRef ?? errorDirective.directive._descriptionTemplateRef
                    : errorDirective.directive._descriptionTemplateRef;
            return errorTextObj;
        }

        errorTextObj.message = field?.formField?.i18Strings ?? null;
        return errorTextObj;
    }

    /** @hidden */
    private _getGroupName(formField: Nullable<PlatformFormField>): string {
        const parts: string[] = [];

        if (formField?.formGroupContainer?.mainTitle) {
            parts.push(formField.formGroupContainer.mainTitle);
        }

        if (formField?.formFieldGroup?.label) {
            parts.push(formField.formFieldGroup.label);
        }

        return parts.join(', ');
    }

    /** @hidden */
    private _getConfigErrorModel(errorKey: string): MessagePopoverErrorConfig {
        const configError = this._config.errors[errorKey];
        const isPlainError = !this._isAdvancedError(configError);
        const errorType = isPlainError ? 'error' : configError.type;
        const headingMessage = isPlainError ? configError : configError.heading;
        const descriptionMessage = isPlainError ? undefined : configError.description;

        return {
            type: errorType,
            heading: headingMessage,
            description: descriptionMessage
        };
    }

    /** @hidden */
    private _isAdvancedError(error: string | MessagePopoverErrorConfig): error is MessagePopoverErrorConfig {
        return !!error && typeof error !== 'string';
    }
}
