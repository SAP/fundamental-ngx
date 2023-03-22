import { AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { DynamicAbstractControlOptions } from './interfaces/dynamic-abstract-control';
import { DynamicFormFieldGroup, PreparedDynamicFormFieldItem } from './interfaces/dynamic-form-item';

export type DynamicFormGroupControl = DynamicFormControl | DynamicFormControlGroup;

export interface DynamicFormGroupControls {
    [key: string]: DynamicFormGroupControl;
}

export class DynamicFormControlGroup extends FormGroup {
    /** @hidden */
    public formItem: DynamicFormFieldGroup;
    /** @hidden */
    public type = 'group';
    /** @hidden */
    public override controls: DynamicFormGroupControls;

    /** @hidden */
    constructor(
        formItem: DynamicFormFieldGroup,
        controls: DynamicFormGroupControls,
        validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
        asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
    ) {
        super(controls, validatorOrOpts, asyncValidator);
        this.formItem = formItem;
    }
}

export class DynamicFormControl extends FormControl {
    /** @hidden */
    public formItem: PreparedDynamicFormFieldItem;
    /** @hidden */
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
    constructor(formState: any, validatorOrOpts: DynamicAbstractControlOptions) {
        super(formState, validatorOrOpts);
        this.formItem = validatorOrOpts.dynamicFormItem;
    }
}
