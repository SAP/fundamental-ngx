import { Injectable, OnDestroy, Type } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { SelectItem, selectStrategy, isFunction } from '@fundamental-ngx/platform/shared';
import { DynamicFormControl, DynamicFormControlGroup } from './dynamic-form-control';
import {
    DynamicFormFieldItem,
    DynamicFormItem,
    DynamicFormItemChoices,
    DynamicFormValue
} from './interfaces/dynamic-form-item';
import { FormComponentDefinition } from './interfaces/form-component-definition';
import { DEFAULT_COMPONENTS_LIST } from './config/default-components-list';
import { DEFAULT_VALIDATION_ERRORS } from './config/default-validation-errors';
import { BaseDynamicFormGeneratorControl } from './base-dynamic-form-generator-control';
import { DynamicFormGroup } from './interfaces/dynamic-form-group';

export const UNGROUPED_FORM_GROUP_NAME = 'ungrouped';

/**
 * @description Form generator service
 */
@Injectable()
export class FormGeneratorService implements OnDestroy {
    /**
     * Map of generated forms to access later.
     */
    readonly forms: Map<string, DynamicFormGroup> = new Map<string, DynamicFormGroup>();

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
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(private _fb: FormBuilder) {}

    /**
     * @hidden
     */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /**
     * @description Generates `FormGroup` class with the list of `DynamicFormControl` control classes
     * defined in `formItems` argument.
     * @param formItems the list of form items which used for form control generation.
     * @returns `FormGroup` class with the list of `DynamicFormControl` control classes.
     */
    async generateForm(formName: string, formItems: DynamicFormItem[]): Promise<DynamicFormGroup> {
        const form = this._fb.group({}) as DynamicFormGroup;

        const defaultFormGroup = new DynamicFormControlGroup(
            {
                name: UNGROUPED_FORM_GROUP_NAME
            },
            {}
        );

        formItems.forEach((formItem) => {
            if (!this.isFormFieldItem(formItem)) {
                if (formItem.items.length === 0) {
                    return;
                }

                const group = new DynamicFormControlGroup(formItem, {});

                formItem.items.forEach((groupFormItem) => {
                    const groupFormControl = this._generateDynamicFormItem(groupFormItem, form);

                    group.addControl(groupFormItem.name, groupFormControl);

                    groupFormControl.updateValueAndValidity({ emitEvent: false });
                });

                form.addControl(formItem.name, group);
                return;
            }

            const formControl = this._generateDynamicFormItem(formItem, form);

            if (!formControl) {
                return;
            }

            defaultFormGroup.addControl(formItem.name, formControl);

            defaultFormGroup.formItem.items = [...[formItem]];

            formControl.updateValueAndValidity({ emitEvent: false });
        });

        const formControlNames = Object.keys(defaultFormGroup.controls);

        form.addControl(UNGROUPED_FORM_GROUP_NAME, defaultFormGroup);

        // After we created initial form, we need to get dynamic labels, choices and value
        for (const key of formControlNames) {
            const formItem = formItems.find((fi) => fi.name === key);

            if (!this.isFormFieldItem(formItem)) {
                continue;
            }

            formItem.message = await this._getFormItemPropertyValue(formItem, defaultFormGroup, 'message');
            formItem.placeholder = await this._getFormItemPropertyValue(formItem, defaultFormGroup, 'placeholder');
            formItem.choices = await this._getFormItemChoices(formItem, defaultFormGroup);
            formItem.default = await this._getFormItemPropertyValue(formItem, defaultFormGroup, 'default');

            // Update form value since it might be changed
            defaultFormGroup.controls[formItem.name].setValue(formItem.default);

            defaultFormGroup.controls[key].formItem = formItem;
        }

        this.forms.set(formName, form);

        return form;
    }

    private _generateDynamicFormItem(formItem: DynamicFormFieldItem, form: DynamicFormGroup): DynamicFormControl {
        const formItemComponentType = this.getComponentDefinitionByType(formItem.type);

        if (!formItemComponentType) {
            console.warn(`Form item '${formItem.name}' with type '${formItem.type}' has no defined component.
            Please use 'addComponent' method in ${FormGeneratorService.name} to define appropriate relations.`);

            return;
        }

        let validator: AsyncValidatorFn = null;

        if (isFunction(formItem.validate)) {
            validator = async (control: DynamicFormControl) => {
                const obj = formItem.validate(control.value, this._getFormValueWithoutUngrouped(form));

                const result = await this._getFunctionValue(obj);

                const returnObj = {};

                returnObj[`${control.formItem.name}Validator`] = typeof result === 'boolean' ? true : result;

                return result === null ? result : returnObj;
            };

            formItem.asyncValidators = formItem.asyncValidators || [];
            formItem.asyncValidators =
                typeof formItem.asyncValidators === 'function' ? [formItem.asyncValidators] : formItem.asyncValidators;

            formItem.asyncValidators.push(validator);
        }

        formItem.validators = formItem.validators || [Validators.nullValidator];

        formItem.required = formItem.required || formItem.validators.includes(Validators.required);

        const formControl = new DynamicFormControl(formItem.default, {
            validators: formItem.validators,
            asyncValidators: formItem.asyncValidators,
            dynamicFormItem: formItem,
            updateOn: 'change'
        });

        if (isFunction(formItem.onchange)) {
            formControl.valueChanges.pipe(debounceTime(50), takeUntil(this._onDestroy$)).subscribe(async (value) => {
                const obj = formItem.onchange(value, this.forms);

                await this._getFunctionValue(obj);
            });
        }

        formControl.updateValueAndValidity({ emitEvent: false });

        return formControl;
    }

    /**
     * @description Returns form value with applied filters and transformers.
     * @param form Form generator form
     * @param renderValue Whether or not form value will be used for rendering purposes.
     * @returns form value object.
     */
    async getFormValue(
        form: DynamicFormGroup | DynamicFormControlGroup,
        renderValue = false
    ): Promise<DynamicFormValue> {
        const formValue = Object.assign({}, form.value);

        for (const [i, control] of Object.entries(form.controls)) {
            const formItem = control.formItem;

            if (!this.isFormFieldItem(formItem)) {
                formValue[i] = await this.getFormValue(control as DynamicFormControlGroup, renderValue);
                continue;
            }

            if (formItem.shouldShow === false) {
                delete formValue[i];
                continue;
            }

            if (formItem.transformer) {
                const obj = formItem.transformer(formValue[i], formValue, formItem);
                formValue[i] = await this._getFunctionValue(obj);
            }

            if (renderValue && formItem.valueRenderer) {
                const obj = formItem.valueRenderer(formValue[i], formValue, formItem);
                formValue[i] = await this._getFunctionValue(obj);
            }

            if (renderValue && formItem.controlType === 'password') {
                formValue[i] = this._formatPasswordValue(formValue[i]);
            }
        }

        return this._getFormValueWithoutUngrouped(formValue);
    }

    /**
     * @description Adds custom component to the list of available components for the form generator items.
     * @param component Angular component.
     * @param types types of the form item.
     */
    addComponent(component: Type<BaseDynamicFormGeneratorControl>, types: string[]): boolean {
        const bestMatchComponentIndex = this._formComponentDefinitions.findIndex((c) =>
            c.types.every((t) => types.includes(t))
        );

        if (bestMatchComponentIndex > -1) {
            this._formComponentDefinitions[bestMatchComponentIndex].component = component;
            return true;
        }

        // Try to find component in types key. There might be some unique cases when new component might replace multiple.
        const existingComponents = this._formComponentDefinitions.filter((c) =>
            c.types.filter((t) => types.includes(t))
        );

        for (const existingComponent of existingComponents) {
            existingComponent.types = existingComponent.types.filter((t) => !types.includes(t));

            const index = this._formComponentDefinitions.findIndex((c) => c.component === existingComponent.component);

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
        return this._formComponentDefinitions.find((c) => c.types.includes(type));
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
    async checkVisibleFormItems(form: DynamicFormGroup): Promise<{ [key: string]: boolean }> {
        const formValue = this._getFormValueWithoutUngrouped(form.value);

        const shouldShowFields: { [key: string]: boolean } = await this._checkFormControlsVisibility(form, formValue);

        return shouldShowFields;
    }

    /**
     * Is current form item is a field item.
     * @param item form item.
     * @returns is current form item is a field.
     */
    isFormFieldItem(item: DynamicFormItem): item is DynamicFormFieldItem {
        return !!(item as DynamicFormFieldItem).type;
    }

    /**
     * Method for searching a form control inside form group. Can also search inside ungrouped form group.
     * @param form Form group.
     * @param controlName Name of the form control.
     * @returns Found form control.
     */
    getFormControl(form: DynamicFormGroup, controlName: string): DynamicFormControl | DynamicFormControlGroup {
        let control = form.get(controlName);

        // If no control found, try to find it in ungrouped group
        if (!control) {
            control = form.get(UNGROUPED_FORM_GROUP_NAME + '.' + controlName);
        }

        return control as DynamicFormControl | DynamicFormControlGroup;
    }

    /** @hidden */
    _getFormValueWithoutUngrouped(value: any): any {
        if (value[UNGROUPED_FORM_GROUP_NAME]) {
            const ungroupedGroupValue: { [key: string]: any } = value[UNGROUPED_FORM_GROUP_NAME];
            for (const [fieldName, fieldValue] of Object.entries(ungroupedGroupValue)) {
                value[fieldName] = fieldValue;
            }
        }
        delete value[UNGROUPED_FORM_GROUP_NAME];

        return value;
    }

    /** @hidden */
    private async _checkFormControlsVisibility(
        form: DynamicFormGroup | DynamicFormControlGroup,
        formValue: any
    ): Promise<{ [key: string]: boolean }> {
        let shouldShowFields: { [key: string]: boolean } = {};
        form = form instanceof DynamicFormControlGroup ? form : form;

        for (const [key, control] of Object.entries(form.controls)) {
            const formItem = control.formItem;

            if (!this.isFormFieldItem(formItem)) {
                const groupVisibleItems = await this._checkFormControlsVisibility(
                    control as DynamicFormControlGroup,
                    formValue
                );

                shouldShowFields = Object.assign(shouldShowFields, groupVisibleItems);
                continue;
            }

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
    private async _getFormItemPropertyValue<T = string>(
        formItem: DynamicFormFieldItem,
        form: DynamicFormGroup,
        key: keyof DynamicFormFieldItem
    ): Promise<T> {
        let value = formItem[key];

        if (typeof value === 'function') {
            const obj = value(this._getFormValueWithoutUngrouped(form));

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
    private async _getFormItemChoices(formItem: DynamicFormFieldItem, form: DynamicFormGroup): Promise<SelectItem[]> {
        const defaultChoices = await this._getFormItemPropertyValue<DynamicFormItemChoices[]>(
            formItem,
            form,
            'choices'
        );

        if (!defaultChoices) {
            return [];
        }

        return defaultChoices.map((c: string | number | SelectItem) =>
            typeof c === 'object' ? c : ({ label: c, value: c } as SelectItem)
        ) as SelectItem[];
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

    /** @hidden */
    private _formatPasswordValue(password: string): string {
        return '*'.repeat(password.length);
    }
}
