import { Injectable, Type } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SelectItem, selectStrategy, isFunction } from '@fundamental-ngx/platform/shared';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormItem, DynamicFormItemChoices, DynamicFormValue } from './interfaces/dynamic-form-item';
import { FormComponentDefinition } from './interfaces/form-component-definition';
import { DEFAULT_COMPONENTS_LIST } from './config/default-components-list';
import { DEFAULT_VALIDATION_ERRORS } from './config/default-validation-errors';
import { BaseDynamicFormGeneratorControl } from './base-dynamic-form-generator-control';
import { DynamicFormGroup } from './interfaces/dynamic-form-group';

/**
 * @description Form generator service
 */
@Injectable()
export class FormGeneratorService {

    /**
     * @hidden
     */
     private _formComponentDefinitions: FormComponentDefinition[] = DEFAULT_COMPONENTS_LIST;

     /**
      * @hidden
      */
     private _validationErrorHints = DEFAULT_VALIDATION_ERRORS;

     /**
      * @hidden
      */
     private _latestAsyncValue: any;

    constructor(
        private _fb: FormBuilder
    ) { }

    /**
     * @description Generates `FormGroup` class with the list of `DynamicFormControl` control classes
     * defined in `formItems` argument.
     * @param formItems the list of form items which used for form control generation.
     * @returns `FormGroup` class with the list of `DynamicFormControl` control classes.
     */
    async generateForm(formItems: DynamicFormItem[]): Promise<DynamicFormGroup> {
        const form = this._fb.group({}) as DynamicFormGroup;

        formItems.forEach((formItem) => {

            const formItemComponentType = this.getComponentDefinitionByType(formItem.type);

            if (!formItemComponentType) {
                console.warn(`Form item '${formItem.name}' with type '${formItem.type}' has no defined component.
                Please use 'addComponent' method in ${FormGeneratorService.name} to define appropriate relations.`);

                return;
            }

            let validator: AsyncValidatorFn = null;

            if (isFunction(formItem.validate)) {
                validator = async (control: DynamicFormControl) => {
                    const obj = formItem.validate(control.value, form.value);

                    const result = await this._getFunctionValue(obj);

                    const returnObj = {};

                    returnObj[`${control.formItem.name}Validator`] = typeof result === 'boolean' ? true : result;

                    return result === null ? result : returnObj;
                };

                formItem.asyncValidators = formItem.asyncValidators || [];
                formItem.asyncValidators = typeof formItem.asyncValidators === 'function'
                    ? [formItem.asyncValidators]
                    : formItem.asyncValidators;

                formItem.asyncValidators.push(validator);
            }

            let formControl: DynamicFormControl;

            formItem.validators = formItem.validators || [Validators.nullValidator];

            formItem.required = formItem.required || formItem.validators.includes(Validators.required);

            formControl = new DynamicFormControl(formItem.default, {
                validators: formItem.validators,
                asyncValidators: formItem.asyncValidators,
                dynamicFormItem: formItem,
                updateOn: 'change'
            });

            form.addControl(formItem.name, formControl);

            formControl.updateValueAndValidity({ emitEvent: false });
        });

        const formControlNames = Object.keys(form.controls);

        // After we created initial form, we need to get dynamic labels, choices and value
        for (const key of formControlNames) {
            const formItem = formItems.find(fi => fi.name === key);

            formItem.message = await this._getFormItemPropertyValue(formItem, form, 'message');
            formItem.placeholder = await this._getFormItemPropertyValue(formItem, form, 'placeholder');
            formItem.choices = await this._getFormItemChoices(formItem, form);
            formItem.default = await this._getFormItemPropertyValue(formItem, form, 'default');

            // Update form value since it might be changed
            form.controls[formItem.name].setValue(formItem.default);

            form.controls[key].formItem = formItem;
        }

        return form;
    }

    /**
     * @description Returns form value with applied filters and transformers.
     * @param form
     * @returns form value object.
     */
    async getFormValue(form: DynamicFormGroup): Promise<DynamicFormValue> {
        const formValue = Object.assign({}, form.value);

        for (const [i, control] of Object.entries(form.controls)) {

            const formItem = control.formItem;

            if (formItem.shouldShow === false) {
                delete formValue[i];
                continue;
            }

            if (formItem.transformer) {

                const obj = formItem.transformer(formValue[i]);

                formValue[i] = await this._getFunctionValue(obj);
            }
        }

        return formValue;
    }

    /**
     * @description Adds custom component to the list of available components for the form generator items.
     * @param component Angular component.
     * @param types types of the form item.
     */
    addComponent(component: Type<BaseDynamicFormGeneratorControl>, types: string[]): boolean {

        const bestMatchComponentIndex = this._formComponentDefinitions.findIndex(c => c.types.every(t => types.includes(t)));

        if (bestMatchComponentIndex > -1) {
            this._formComponentDefinitions[bestMatchComponentIndex].component = component;
            return true;
        }

        // Try to find component in types key. There might be some unique cases when new component might replace multiple.
        const existingComponents = this._formComponentDefinitions.filter(c => c.types.filter(t => types.includes(t)));

        for (const existingComponent of existingComponents) {

            existingComponent.types = existingComponent.types.filter(t => !types.includes(t));

            const index = this._formComponentDefinitions.findIndex(c => c.component === existingComponent.component);

            this._formComponentDefinitions[index] = existingComponent;
        }

        this._formComponentDefinitions.push({
            types: types,
            component: component
        });

        return true;
    }


    /**
     * @description Returns best-matched component based on provided `type` argument
     * @param type form item type
     * @returns @see FormComponentDefinition Component definition for the form item
     */
    getComponentDefinitionByType(type: string): FormComponentDefinition | null {
        return this._formComponentDefinitions.find(c => c.types.includes(type));
    }

    /**
     * @returns Object of available errors, where key is an error type,
     * and it's value is a display text.
     */
    getValidationErrorHints(key: string): string {
        return this._validationErrorHints[key];
    }

    /**
     * @description Adds custom error hint defined by user.
     * @param type error type from validator.
     * @param value display text.
     */
    addValidationErrorHint(type: string, value: string): void {
        this._validationErrorHints[type] = value;
    }

    /**
     * @description Checks if some items of the form should be hidden,
     * or visible based on `when` method result.
     * @param form
     * @returns `Set` where key is item name, and boolean value if field needs to be shown.
     */
    async checkVisibleFormItems(form: DynamicFormGroup): Promise<{[key: string]: boolean}> {

        const shouldShowFields: {[key: string]: boolean} = {};

        const formValue = form.value;

        for (const [key, control] of Object.entries(form.controls)) {
            const formItem = control.formItem;

            if (!formItem.when) {
                shouldShowFields[key] = true;
                continue;
            }

            const obj = formItem.when(formValue);

            shouldShowFields[key] = await this._getFunctionValue(obj);
        }

        return shouldShowFields;
    }

    /**
     * @hidden
     * @param formItem
     * @param form
     * @param key
     * @returns
     */
    private async _getFormItemPropertyValue<T = string>(formItem: DynamicFormItem,
                                                        form: FormGroup,
                                                        key: keyof DynamicFormItem): Promise<T> {
        let value = formItem[key];

        if (typeof value === 'function') {
            const obj = value(form.value);

            value = await this._getFunctionValue(obj);
        }

        return value as T;
    }

    /**
     * @hidden
     * @param formItem
     * @param form
     * @returns
     */
    private async _getFormItemChoices(formItem: DynamicFormItem, form: FormGroup): Promise<SelectItem[]> {

        const defaultChoices = await this._getFormItemPropertyValue<DynamicFormItemChoices[]>(formItem, form, 'choices');

        if (!defaultChoices) {
            return [];
        }

        return defaultChoices.map((c: string | number | SelectItem) => {
            return typeof c === 'object' ? c : { label: c, value: c } as SelectItem;
        }) as SelectItem[];
    }

    /**
     * @hidden
     * @description Returns value from Promise-like, Observable-like, simple function or just some object.
     * @param obj
     * @returns
     */
    private async _getFunctionValue(obj: any): Promise<any> {
        const strategy = selectStrategy(obj);

        let result: any;

        await strategy.createSubscription(obj, (value: any) => {
            result = value;
        });

        if (isFunction(result)) {
            await this._getFunctionValue(result);
        }

        return result;
    }
}
