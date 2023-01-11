import { QueryList } from '@angular/core';
import { FormError } from './form-error';
import { FormFieldControl } from './form-field-control';
import { FormStates } from './form-state';

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
