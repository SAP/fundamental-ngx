import { DynamicFormFieldGroup, DynamicFormFieldItem } from '@fundamental-ngx/platform/form';
import { WizardGeneratorDependencyFields } from './wizard-generator-item.interface';

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
}

export type WizardGeneratorFormItem = WizardGeneratorFormGroupItem | WizardGeneratorFormFieldItem;

export interface WizardGeneratorFormGroupItem extends DynamicFormFieldGroup {
    /**
     * @description Object of dependency fields that are used with `when` function
     */
    dependencyFields?: WizardGeneratorDependencyFields;
}

export interface WizardGeneratorFormFieldItem extends DynamicFormFieldItem {
    /**
     * @description Object of dependency fields that are used with `when` function
     */
    dependencyFields?: WizardGeneratorDependencyFields;
}
