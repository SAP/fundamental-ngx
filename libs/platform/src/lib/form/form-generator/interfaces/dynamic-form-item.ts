import { TemplateRef } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { Observable } from 'rxjs';

import { ContentDensity } from '@fundamental-ngx/cdk/utils';
import {
    ColumnLayout,
    FieldHintInput,
    HintInput,
    InlineLayout,
    LabelLayout,
    SelectItem
} from '@fundamental-ngx/platform/shared';
import { InputType } from '../../input/input.component';
import { DynamicFormGroup } from './dynamic-form-group';
import { DynamicFormControl, DynamicFormGroupControl } from '../dynamic-form-control';
import { TextAlignment } from '../../combobox';
import { FdDate } from '@fundamental-ngx/core/datetime';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { IndicationColorType } from '@fundamental-ngx/platform/object-status';

export type DynamicFormItemChoice<T = any> =
    | DynamicFormItemChoiceTypes<T>[]
    | Observable<DynamicFormItemChoiceTypes<T>[]>
    | Promise<DynamicFormItemChoiceTypes<T>[]>;

export type DynamicFormItemChoiceTypes<T = any> = number | string | SelectItem<T>;
/** Advanced error type. Used to render more complex error view with custom error type. */
export interface DynamicFormItemValidationObject {
    /** Error heading. */
    heading: string;
    /** Error description. */
    description?: string;
    /** Error state */
    type: FormStates;
}
export type DynamicFormItemValidationResult = null | boolean | string | DynamicFormItemValidationObject;
/**
 * Dynamic form item type.
 *
 * `T` type represents additional type properties.
 * `U` type represents additional `DynamicFormFieldItem` interface.
 */
export type DynamicFormItem<
    T extends Record<string, any> = Record<string, any>,
    U extends BaseDynamicFormFieldItem = AnyDynamicFormFieldItem
> = DynamicFormFieldGroup | DynamicFormFieldItem<T, U>;

export interface DynamicFormFieldGroup {
    /**
     * @description
     * ID of the form item, if not provided, name will be used instead
     */
    id?: string;

    /**
     * @description
     * Name of the form item in form.
     */
    name: string;

    /**
     * @description
     * Display name of the form item.
     * @param formValue the form value hash.
     */
    message?: string;

    /**
     * @description
     * List of @see DynamicFormItem representing the list of items
     * to be rendered in the form.
     */
    items?: DynamicFormFieldItem[];

    /**
     * @description
     * Rank is used for ordering.
     * Than lower number then higher priority.
     */
    rank?: number;

    /**
     * @description
     * Additional set of options that can affect UI of the form field group.
     */
    guiOptions?: BaseDynamicFormItemGuiOptions;
}

export type FdpFormGeneratorAsyncProperty<T = string> = T | Promise<T> | Observable<T>;

export interface BaseDynamicFormFieldItem<T = any> {
    /**
     * @description
     * Type of the form item. E.g. input, textarea, checkbox, etc.
     */
    type: string;
    /**
     * @description
     * ID of the form item, if not provided, name will be used instead
     */
    id?: string;

    /**
     * @description
     * Name of the form item in form.
     */
    name: string;

    /**
     * @description
     * Display name of the form item.
     * @param formValue the form value hash.
     */
    message:
        | FdpFormGeneratorAsyncProperty<string>
        | ((formValue?: DynamicFormValue) => FdpFormGeneratorAsyncProperty<string>);

    /**
     * @description
     * Display placeholder of the form item.
     * @param formValue the form value hash.
     */
    placeholder?:
        | FdpFormGeneratorAsyncProperty<string>
        | ((formValue?: DynamicFormValue) => FdpFormGeneratorAsyncProperty<string>);

    /**
     * @description
     * If true, will fall back to `message` property if `placeholder` was not provided.
     */
    useMessageAsPlaceholder?: boolean;

    /**
     * @description
     * Default value of the form item.
     */
    default?: FdpFormGeneratorAsyncProperty<T> | ((formValue?: DynamicFormValue) => FdpFormGeneratorAsyncProperty<T>);

    /**
     * @description
     * Receive the user input and form value hash.
     * Should return null if the value is valid, and an error message (String) or `false` otherwise.
     * If `false` is returned, a default error message is provided.
     * @param formItemValue raw form item value.
     * @param formValue the form value hash.
     * @returns null or String
     */
    validate?: (
        formItemValue: T,
        formValue?: DynamicFormValue
    ) =>
        | DynamicFormItemValidationResult
        | Promise<DynamicFormItemValidationResult>
        | Observable<DynamicFormItemValidationResult>;

    /**
     * @description
     * The list of validators applied to the form item.
     */
    validators?: ValidatorFn[] | null;

    /**
     * @description
     * The list of async validators applied to the form item.
     */
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;

    /**
     * @description Set when form item is a mandatory one.
     */
    required?: boolean;

    /**
     * @description Transforms raw form item value.
     * @param formItemValue raw form item value.
     * @param formValue the form value hash.
     * @param formItem @see DynamicFormFieldItem
     * @returns updated form item value to be used in the form value hash.
     */
    transformer?: (
        formItemValue: T,
        formValue?: DynamicFormValue,
        formItem?: DynamicFormFieldItem
    ) => any | Promise<any>;

    /**
     * @description Transforms raw form item value for render purposes.
     * @param formItemValue raw form item value.
     * @param formValue the form value hash.
     * @param formItem @see DynamicFormFieldItem
     * @returns updated form item value to be used in the form value hash for rendering purposes.
     */
    valueRenderer?: (
        formItemValue: T,
        formValue?: DynamicFormValue,
        formItem?: DynamicFormFieldItem
    ) => any | Promise<any>;

    /**
     * @description Should return true or false depending on whether this form item should be asked.
     * @param formValue the form value hash.
     * @param forms All available forms stored in form generator service.
     * @param control Dynamic form control.
     * @returns Boolean
     */
    when?: (
        formValue: DynamicFormValue,
        forms: Map<string, DynamicFormGroup>,
        control: DynamicFormGroupControl
    ) => boolean | Promise<boolean> | Observable<boolean>;

    /**
     * @description Callback function that is triggered after field value has been changed.
     * @param fieldValue Field value.
     * @param forms All available forms stored in form generator service.
     * @param control Dynamic form control.
     */
    onchange?: (
        fieldValue: T,
        forms: Map<string, DynamicFormGroup>,
        control: DynamicFormControl
    ) => void | Promise<void> | Observable<void>;

    /**
     * @hidden
     * @description
     * Used as a static flag on should this form item be shown.
     */
    shouldShow?: boolean;

    /**
     * @description
     * Rank is used for ordering.
     * Than lower number then higher priority.
     */
    rank?: number;

    /**
     * @description
     * Additional set of options that can affect UI of the form item form control.
     */
    guiOptions?: DynamicFormItemGuiOptions;
}

export interface InputDynamicFormFieldItem extends BaseDynamicFormFieldItem<string> {
    type: 'input' | 'email' | 'number' | 'password';
    /**
     * @description
     * Additional set of options that can affect UI of the form item form control.
     */
    controlType?: InputType;
}

export interface DatePickerDynamicFormFieldItem extends BaseDynamicFormFieldItem<FdDate> {
    type: 'datepicker';
}

export interface TextAreaDynamicFormFieldItem extends BaseDynamicFormFieldItem<string> {
    type: 'editor' | 'textarea';
}

export interface SwitchDynamicFormFieldItem extends BaseDynamicFormFieldItem<boolean> {
    type: 'switch';
}

export interface SelectDynamicFormFieldItem<T = DynamicFormItemChoiceTypes<any>> extends BaseDynamicFormFieldItem<T> {
    type: 'select' | 'list' | 'multi-input';
    /**
     * @description
     * The list of available options to select.
     * @param formValue raw form item value.
     */
    choices?: DynamicFormItemChoice | ((formValue?: DynamicFormValue) => DynamicFormItemChoice);

    secondaryKey?: string;

    /** Show the second column (Applicable for two columns layout) */
    showSecondaryText?: boolean;

    /** Horizontally align text inside the second column (Applicable for two columns layout) */
    secondaryTextAlignment?: TextAlignment;
    /** Custom template used to build control body. */
    controlTemplate?: TemplateRef<any>;
}

export interface RadioDynamicFormFieldItem extends Omit<SelectDynamicFormFieldItem<any>, 'type'> {
    type: 'radio' | 'confirm';
}

export interface CheckboxDynamicFormFieldItem extends Omit<SelectDynamicFormFieldItem<any>, 'type'> {
    type: 'checkbox';
}

export interface ObjectStatusDynamicFormFieldItem extends BaseDynamicFormFieldItem<string> {
    type: 'object-status';
    guiOptions?: BaseDynamicFormFieldItem['guiOptions'] & {
        status?: ObjectStatus;
        icon?: string;
        indicationColor?: IndicationColorType;
    };
}

export interface AnyDynamicFormFieldItem<T = any> extends BaseDynamicFormFieldItem<T> {
    type: string;
    /**
     * @description
     * The list of available options to select.
     * @param formValue raw form item value.
     */
    choices?: DynamicFormItemChoice | ((formValue?: DynamicFormValue) => DynamicFormItemChoice);
}

export type DynamicFormFieldItem<
    T extends Record<string, any> = Record<string, any>,
    U extends BaseDynamicFormFieldItem = AnyDynamicFormFieldItem
> = T &
    (
        | InputDynamicFormFieldItem
        | DatePickerDynamicFormFieldItem
        | TextAreaDynamicFormFieldItem
        | SwitchDynamicFormFieldItem
        | SelectDynamicFormFieldItem
        | RadioDynamicFormFieldItem
        | CheckboxDynamicFormFieldItem
        | ObjectStatusDynamicFormFieldItem
        | U
        | AnyDynamicFormFieldItem
    );

type PreparedDynamicFormFieldItemFields = {
    message: string;
    default: any;
    placeholder?: string;
    choices?: SelectItem[];
};

/**
 * @hidden
 * Internal representation of DynamicFormFieldItem with all fields resolved to a plain value
 */
export type PreparedDynamicFormFieldItem<T extends BaseDynamicFormFieldItem = BaseDynamicFormFieldItem> = Omit<
    T,
    keyof PreparedDynamicFormFieldItemFields
> &
    PreparedDynamicFormFieldItemFields;

export interface BaseDynamicFormItemGuiOptions {
    /**
     * @description
     * Defines label's column layout.
     */
    labelColumnLayout?: ColumnLayout;

    /**
     * @description
     * Defines field's column layout.
     */
    fieldColumnLayout?: ColumnLayout;

    /**
     * @description
     * Defines gap column layout.
     */
    gapColumnLayout?: ColumnLayout;

    /**
     * @description
     * If set, hint icon is added to control label or group heading with tooltip message as a value.
     */
    hint?: HintInput;
}

export interface DynamicFormItemGuiOptions extends BaseDynamicFormItemGuiOptions {
    /**
     * @description
     * Index of column if form has multi-column layout.
     */
    column?: number;

    /**
     * @description
     * Column arrangement for form-field based on screen size.
     */
    columnLayout?: ColumnLayout;

    /**
     * @description
     * Inline layout for list based form item.
     */
    inlineLayout?: InlineLayout;

    /**
     * @deprecated
     * Use labelColumnLayout, fieldColumnLayout and gapColumnLayout properties.
     * Define form field label placement.
     */
    layout?: LabelLayout;

    /**
     * @description
     * Flag indicating that label should be hidden.
     */
    noLabelLayout?: boolean;

    /**
     * @description
     * If set, controls inner elements will be inlined.
     */
    inline?: boolean;

    /**
     * @description
     * If set, overrides current content density of the element defined on the global scope.
     */
    contentDensity?: ContentDensity;

    /**
     * @description Object contains additional payload. Useful for custom elements to manipulate it's view.
     */
    additionalData?: any;

    /**
     * @description
     * If label should be appended with colon. True by default.
     */
    appendColon?: boolean;

    /**
     * Hint options. Either only text or full config
     */
    hint?: FieldHintInput;
}

export type DynamicFormValue = Record<string, any>;
