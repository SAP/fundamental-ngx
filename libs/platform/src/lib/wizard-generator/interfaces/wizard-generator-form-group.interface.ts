import { Observable } from 'rxjs';
import { DynamicFormFieldGroup, DynamicFormFieldItem, DynamicFormGroup } from '@fundamental-ngx/platform/form';
import { HintInput } from '@fundamental-ngx/platform/shared';
import { WizardGeneratorDependencyFields, WizardGeneratorFormsValue } from './wizard-generator-item.interface';

export interface WizardGeneratorFormGroup {
    /**
     * @description Specify the column layout in the format `XLn-Ln-Mn-Sn`
     * where n is the number of columns and can be different for each size.
     * eg: XL2-L2-M2-S1 would create 2-column layouts for XL, L,
     * and M sizes and single-column layout for S size.
     */
    columnLayout?: string;
    /**
     * @description Form main title.
     */
    title: string;
    /**
     * @description List of @see DynamicFormItem representing the list of items
     * to be rendered in the form.
     */
    formItems: WizardGeneratorFormItem[];
    /**
     * @description Unique form ID.
     */
    id: string;
    /**
     * @description Should return true or false depending on whether this form group should be visible.
     * @returns Boolean
     */
    when?: (
        completedSteps: string[],
        answers: WizardGeneratorFormsValue,
        forms: Map<string, DynamicFormGroup>
    ) => boolean | Promise<boolean> | Observable<boolean>;
    /**
     * @description Object of dependency fields that are used with `when` function
     */
    dependencyFields?: WizardGeneratorDependencyFields;

    /**
     * @description
     * Additional set of options that can affect UI of the form item form control.
     */
    guiOptions?: WizardGeneratorFormGroupGuiOptions;
}

export interface WizardGeneratorFormGroupGuiOptions {
    /**
     * Hint options. Either only text or full config
     */
    hint?: HintInput;
}

export type WizardGeneratorFormItem = WizardGeneratorFormGroupItem | WizardGeneratorFormFieldItem;

export interface WizardGeneratorFormGroupItem extends DynamicFormFieldGroup {
    /**
     * @description Object of dependency fields that are used with `when` function
     */
    dependencyFields?: WizardGeneratorDependencyFields;
}

export type WizardGeneratorFormFieldItem = DynamicFormFieldItem<{ dependencyFields?: WizardGeneratorDependencyFields }>;
