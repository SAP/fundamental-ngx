import { AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { DynamicAbstractControlOptions } from './interfaces/dynamic-abstract-control';
import { DynamicFormFieldGroup, DynamicFormFieldItem } from './interfaces/dynamic-form-item';

export interface DynamicFormGroupControls {
    [key: string]: DynamicFormControl | DynamicFormControlGroup;
}

export class DynamicFormControlGroup extends FormGroup {
    public formItem: DynamicFormFieldGroup;
    public type = 'group';
    public controls: DynamicFormGroupControls;

    constructor(
        formItem?: DynamicFormFieldGroup,
        controls?: DynamicFormGroupControls,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
        this.formItem = formItem;
    }
}

export class DynamicFormControl extends FormControl {
    public formItem: DynamicFormFieldItem;
    public type = 'field';

    /**
     * @description Creates a new `DynamicFormControl` instance.
     *
     * @param formState Initializes the control with an initial value,
     * or an object that defines the initial value and disabled state.
     *
     * @param validatorOrOpts A synchronous validator function, or an array of
     * such functions, or an `AbstractControlOptions` object that contains validation functions
     * and a validation trigger.
     *
     * @param asyncValidator A single async validator or array of async validator functions
     *
     * @param formItem `DynamicFormItem` object
     *
     */
    constructor(formState?: any, validatorOrOpts?: DynamicAbstractControlOptions | null) {
        super(formState, validatorOrOpts);
        this.formItem = validatorOrOpts.dynamicFormItem;
    }
}
