import { Injectable, Type } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicFormItem, InquierChoiseItem } from './interfaces/dynamic-form-item';
import { FormComponentDefinition } from './interfaces/form-component-definition';
import { DEFAULT_COMPONENTS_LIST } from './config/default-components-list';
import { DEFAULT_VALIDATION_ERRORS } from './config/default-validation-errors';
import { SelectItem } from '../../../domain/data-model';
import { Observable } from 'rxjs';
import { isFunction } from '../../../utils/lang';

function isPromise<T = any>(obj: any): obj is Promise<T> {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && isFunction(obj.then);
}

function isSubscribable(obj: any|Observable<any>): obj is Observable<any> {
    return !!obj && isFunction(obj.subscribe);
}

interface SubscriptionStrategy {
    createSubscription(async: Observable<any>|Promise<any>|Function, updateLatestValue: any): Promise<any>;
  }

class SubscribableStrategy implements SubscriptionStrategy {
    createSubscription(async: Observable<any>, updateLatestValue: any): Promise<any> {
        return async.toPromise().then(updateLatestValue, e => {

            throw e;
        });
    }
}

class PromiseStrategy implements SubscriptionStrategy {
    createSubscription(async: Promise<any>, updateLatestValue: (v: any) => any): Promise<any> {
        return async.then(updateLatestValue, e => {

            throw e;
        });
    }
}

class FunctionStrategy implements SubscriptionStrategy {
    createSubscription(fn: Function, updateLatestValue: any): any {

        const result = isFunction(fn) ? fn() : fn;

        updateLatestValue(result);
    }
}

  const _promiseStrategy = new PromiseStrategy();
  const _subscribableStrategy = new SubscribableStrategy();
  const _functionStrategy = new FunctionStrategy();

/**
 * @description Form generator service
 */
@Injectable({
    providedIn: 'root'
})
export class FormGeneratorService {

    /**
     * @hidden
     * @private
     */
    private _formComponentDefinitions: FormComponentDefinition[] = DEFAULT_COMPONENTS_LIST;

    /**
     * @hidden
     * @private
     */
    private _validationErrorHints = DEFAULT_VALIDATION_ERRORS;

    /**
     * @hidden
     * @private
     */
    private _latestAsyncValue: any;

    constructor(
        private _fb: FormBuilder
    ) {
    }

    /**
     * @description Generates `FormGroup` class with the list of `DynamicFormControl` control classes
     * defined in `formItems` argument.
     * @param formItems the list of form items which used for form control generation.
     * @returns `FormGroup` class with the list of `DynamicFormControl` control classes.
     */
    async generateForm(formItems: DynamicFormItem[]): Promise<FormGroup> {
        const form = this._fb.group({});

        formItems.forEach((q) => {

            const formItemComponentType = this.getComponentDefinitionByType(q.type);

            if (!formItemComponentType) {
                console.warn(`Form item '${q.name}' with type '${q.type}' has no defined component.
                Please use 'addComponent' method in ${FormGeneratorService.name} to define appropriate relations.`);

                return;
            }

            let validator: AsyncValidatorFn = null;

            if (isFunction(q.validate)) {
                validator = async (control: DynamicFormControl) => {
                    const formValue = await this.getFormValue(form);

                    const obj = q.validate(control.value, formValue);

                    const result = await this._getFunctionValue(obj);

                    return result === true ? null : { validator: typeof result === 'boolean' ? true : result };
                };

                q.asyncValidators = q.asyncValidators || [];
                q.asyncValidators = typeof q.asyncValidators === 'function' ? [q.asyncValidators] : q.asyncValidators;

                q.asyncValidators.push(validator);
            }

            let formControl: DynamicFormControl;

            q.validators = q.validators || [Validators.nullValidator];

            formControl = new DynamicFormControl(q.default, {
                validators: q.validators,
                asyncValidators: q.asyncValidators,
                dynamicFormitem: q,
                updateOn: 'change'
            });

            form.addControl(q.name, formControl);

            formControl.updateValueAndValidity({ emitEvent: false });
        });

        const formControlNames = Object.keys(form.controls);

        // After we created initial form, we need to get dynamic labels, choices and value
        for (const key of formControlNames) {
            const formItem = formItems.find(fi => fi.name === key);

            formItem.message = await this._getFormItemLabel(formItem, form);
            formItem.choices = await this._getFormItemChoices(formItem, form);
            formItem.default = await this._getFormItemDefaultValue(formItem, form);

            (form.controls[key] as DynamicFormControl).formItem = formItem;
        }

        return form;
    }

    /**
     * @description Returns form value with applied filters and transformers.
     * @param form
     * @returns form value object.
     */
    async getFormValue(form: FormGroup): Promise<{ [key: string]: any }> {
        const formValue = Object.assign({}, form.value);

        for (const [i, control] of Object.entries(form.controls)) {

            const formItem = (control as DynamicFormControl).formItem;

            if (formItem.shouldShow === false) {
                delete formValue[i];
                continue;
            }
            if (formItem.filter) {

                const obj = formItem.filter(formValue[i]);

                formValue[i] = await this._getFunctionValue(obj);
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
     * @param type type of the form item.
     */
    addComponent<T>(component: Type<T>, type: string): void {

        const existingIndex = this._formComponentDefinitions.findIndex(c => c.type === type);

        if (existingIndex > -1) {
            this._formComponentDefinitions[existingIndex].component = component;
            return;
        }

        this._formComponentDefinitions.push({
            type: type,
            component: component
        });
    }


    /**
     * @description Returns best-matched component based on provided `type` argument
     * @param type form item type
     * @returns @see FormComponentDefinition Component definition for the form item
     */
    getComponentDefinitionByType(type: string): FormComponentDefinition | null {
        return this._getFormComponents().find(c => c.type === type || c.types?.includes(type));
    }

    /**
     * @private
     */
    private _getFormComponents(): FormComponentDefinition[] {
        return this._formComponentDefinitions;
    }

    /**
     * @returns Object of available errors, where key is an error type,
     * and it's value is a display text.
     */
    getValidationErrorHints(): {[key: string]: any} {
        return this._validationErrorHints;
    }

    /**
     * @description Adds custom error hint defined by user.
     * @param type error type.
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
    async checkVisibleFormItems(form: FormGroup): Promise<Set<{[key: string]: boolean}>> {

        const shouldShowFields = new Set<{[key: string]: boolean}>();

        for (const [key, control] of Object.entries(form.controls)) {
            const formItem = (control as DynamicFormControl).formItem;

            if (formItem.when === undefined) {
                continue;
            }

            const obj = formItem.when(form.value);

            shouldShowFields[key] = await this._getFunctionValue(obj);
        }

        return shouldShowFields;
    }

    /**
     * @hidden
     * @private
     * @param formItem
     * @param form
     * @returns
     */
    private async _getFormItemLabel(formItem: DynamicFormItem, form: FormGroup): Promise<string> {
        let message = formItem.message;

        if (typeof formItem.message === 'function') {
            const currentAnswers = await this.getFormValue(form);

            const obj = formItem.message(currentAnswers);

            message = await this._getFunctionValue(obj);
        }

        return message as string;
    }

    /**
     * @hidden
     * @private
     * @param formItem
     * @param form
     * @returns
     */
    private async _getFormItemDefaultValue(formItem: DynamicFormItem, form: FormGroup): Promise<string> {
        let answer = formItem.default;

        if (typeof formItem.default === 'function') {
            const currentAnswers = await this.getFormValue(form);

            const obj = formItem.default(currentAnswers);

            answer = await this._getFunctionValue(obj);
        }

        form.controls[formItem.name].setValue(answer);

        return answer;
    }

    /**
     * @hidden
     * @private
     * @param formItem
     * @param form
     * @returns
     */
    private async _getFormItemChoices(formItem: DynamicFormItem, form: FormGroup): Promise<SelectItem[]> {

        const defaultChoices = formItem.choices;

        if (!defaultChoices) {
            return [];
        }

        let returnChoices: any;

        if (typeof defaultChoices === 'function') {

            const currentAnswers = await this.getFormValue(form);

            const obj = defaultChoices(currentAnswers);

            returnChoices = await this._getFunctionValue(obj) as string[] | number[] | SelectItem[];
        } else {
            returnChoices = defaultChoices;
        }

        returnChoices = returnChoices.map((c: string | number | SelectItem | InquierChoiseItem) => {

            if (typeof c === 'object') {
                c.label = c.label || (c as InquierChoiseItem).name;

                return c;
            }

            return { label: c, value: c } as SelectItem;
        }) as SelectItem[];

        return returnChoices;
    }

    /**
     * @hidden
     * @private
     * @param obj
     * @returns
     */
    private _selectStrategy(obj: Observable<any>|Promise<any>|Function): SubscriptionStrategy {
        if (isPromise(obj)) {
            return _promiseStrategy;
        }

        if (isSubscribable(obj)) {
            return _subscribableStrategy;
        }

        return _functionStrategy;
    }

    /**
     * @hidden
     * @private
     * @param value
     */
    private _updateLatestValue(value: any): void {
        this._latestAsyncValue = value;
    }

    /**
     * @hidden
     * @private
     * @param obj
     * @returns
     */
    private async _getFunctionValue(obj: any): Promise<any> {
        const strategy = this._selectStrategy(obj);

        await strategy.createSubscription(obj, (value: any) => this._updateLatestValue(value));

        if (isFunction(this._latestAsyncValue)) {
            await this._getFunctionValue(this._latestAsyncValue);
        }

        return this._latestAsyncValue;
    }
}
