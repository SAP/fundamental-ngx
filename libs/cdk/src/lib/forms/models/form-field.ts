import { ElementRef, QueryList } from '@angular/core';
import { FormError } from './form-error';
import { FormStates } from './form-state';
import { Observable } from 'rxjs';
import { NgControl } from '@angular/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';

/**
 * FormField base class.
 *
 * This class is used to create form field components.
 *
 */
export abstract class FormField {
    /**
     * Register underlying form control
     */
    registerFormFieldControl: (control: FormFieldControl) => void;
    /**
     * Unregister underlying form control
     */
    unregisterFormFieldControl: (control: FormFieldControl) => void;

    /**
     * Set default columns layout
     */
    setDefaultColumnLayout: () => void;

    /** Gets field error priority state. */
    getPriorityState: () => FormStates;

    /** Groups errors. */
    groupErrors: () => void;

    /** Sets error directives from parent container */
    setErrorDirectives: (directives: QueryList<FormError>) => void;
}

export interface FormFieldControl<T = any> {
    /**
     * Each input control has always a value. Need to make sure we keep a convention for
     * input fields
     */
    value: T | null;

    /**
     * Need to have a way to set placeholder to the input
     */
    placeholder: string;

    /**
     * Need to have a way to set Mandatory to the input field
     */
    required: boolean;

    /**
     * Sets id from FF to Input
     */
    id: string;

    /**
     * This should be coming from Parent.
     */
    editable: boolean;

    /**
     * The height of the extra content at the bottom of the form control,
     * which should not affect the alignment of form control and it's label
     */
    extraContentHeightPx?: number;

    /**
     *
     * Form Field listen for all the changes happening inside the input
     */
    stateChanges: Observable<void>;

    /**
     *  Each input should inject its own ngControl and we should retrieve it
     */
    ngControl: NgControl | null;

    /** Whether the control is disabled. */
    disabled: boolean;

    /**
     * Keeps track if the form element is in focus
     */
    focused: boolean;

    /** Whether control has errors */
    controlInvalid: boolean;

    /** Corresponding element reference. */
    elementRef: ElementRef;

    /** Form field instance. */
    formField: Nullable<FormField>;

    /** Method for focusing on the element */
    focus(event?: MouseEvent): void;

    /**
     * Handles even when we click on parent container which is the FormField Wrapping this
     * control
     */
    onContainerClick(event: MouseEvent): void;
}
