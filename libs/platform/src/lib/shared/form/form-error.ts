import { TemplateRef } from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { Subject } from 'rxjs';

export interface FormFieldErrorContext<T> {
    label: string;
    $implicit: T;
}

export interface FormError<T = any> {
    detectChanges$: Subject<void>;
    fdpFormFieldErrorAs: T;
    type: FormStates;
    error: string;
    _headingTemplateRef: TemplateRef<FormFieldErrorContext<T>>;
    _descriptionTemplateRef: TemplateRef<FormFieldErrorContext<T>> | null;
    templateRef: TemplateRef<FormFieldErrorContext<T>>;
    registerHeading: (heading: FormErrorHeading) => void;
    registerDescription: (description: FormErrorDescription) => void;
}

export interface FormErrorHeading<T = any> {
    fdpFormFieldErrorHeadingAs: T;
    fdpFormFieldErrorHeadingType?: FormStates;
    templateRef: TemplateRef<FormFieldErrorContext<T>>;
}

export interface FormErrorDescription<T = any> {
    fdpFormFieldErrorDescriptionAs: T;
    templateRef: TemplateRef<FormFieldErrorContext<T>>;
}

export interface FormFieldErrorDirectiveContext {
    directive: FormError;
    error: any;
}
