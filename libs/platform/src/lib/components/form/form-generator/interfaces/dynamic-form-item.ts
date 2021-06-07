import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { SelectItem } from '../../../../domain/data-model';
import { ContentDensity } from '../../form-control';
import { HintPlacement, LabelLayout } from '../../form-options';
import { InputType } from '../../input/input.component';

export interface InquierChoiseItem {
    name: string;
    value?: any;
    description?: string;
    label?: string;
}

/**
 * Dynamic form item object interface which is used for generating form controls of defined type with validation rules.
 */
export interface DynamicFormItem {
    /**
     * @description
     * Type of the form item. E.g. input, textarea, checkbox, etc.
     */
    type: string;

    /**
     * @description
     * Additional set of options that can affect UI of the form item form control.
     */
    controlType?: InputType;

    /**
     * @description
     * Name of the form item in form.
     */
    name?: string;

    /**
     * @description
     * Display name of the form item.
     */
    message?: string | Function | Promise<string>;

    /**
     * @description
     * Default value of the form item.
     */
    default?: string | number | boolean | any | Function;

    /**
     * @description
     * The list of available options to select.
     */
    choices?: (number | string | InquierChoiseItem | SelectItem | Promise<number[] | string[] | SelectItem[]>)[] | Function;

    /**
     * @description
     * Receive the user input and answers hash.
     * Should return true if the value is valid, and an error message (String) otherwise.
     * If false is returned, a default error message is provided.
     * @returns Boolean
     */
    validate?: Function;

    /**
     * @description
     * The list of validators applied to a control.
     */
    validators?: ValidatorFn | ValidatorFn[] | null;

    /**
     * @description
     * The list of async validators applied to control.
     */
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;

    /**
     * @description
     * Receive the user input and answers hash.
     * @returns Object - the filtered value to be used inside the program.
     * The value returned will be added to the Answers hash.
     */
    filter?: Function;

    /**
     * @description
     * Receive the user input, answers hash and option flags, and return a transformed value to display to the user.
     * The transformation only impacts what is shown while editing. It does not modify the answers hash.
     */
    transformer?: Function;

    /**
     * @description
     * Receive the current user answers hash.
     * Should return true or false depending on whether or not this form item should be asked.
     * @returns Boolean
     */
    when?: Function;

    /**
     * @description
     * Change the default prefix message.
     */
    prefix?: string;

    /**
     * @description
     * Change the default suffix message.
     */
    suffix?: string;

    /**
     * @hidden
     * @description
     * Used as a static flag on should this form item be shown.
     */
    shouldShow?: boolean;

    /**
     * @description
     * Additional set of options that can affect UI of the form item form control.
     */
    guiOptions?: DynamicFormItemGuiOptions;
}

export interface DynamicFormItemGuiOptions {
    /**
     * @description
     * Index of column if form has multi-column layout
     */
    column?: number;
    /**
     * @description
     * If set, hint icon is added to control label with tooltip message as a value.
     */
    hint?: string;

    hintPlacement?: HintPlacement;

    layout?: LabelLayout;
    /**
     * @description
     * If set, controls inner elements will be inlined
     */
    inline?: boolean;
    /**
     * @description
     * If set, overrides current content density of the element defined on the global scope.
     */
    contentDensity?: ContentDensity;
    /**
     * @description
     * If set, adds a link element to the label.
     */
    link?: {
        /**
         * @description
         * If set, this function will be triggered, when user clicks on the link.
         */
        command?: Function;
        url?: string | SafeUrl;
        text?: string;
    };
    datePicker?: any;
    semantic?: boolean;

    additionalData?: any;
}
