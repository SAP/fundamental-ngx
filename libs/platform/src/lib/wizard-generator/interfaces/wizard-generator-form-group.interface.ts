import { DynamicFormItem } from '@fundamental-ngx/platform/form';

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
    formItems: DynamicFormItem[];

    /**
     * @description Unique form ID.
     */
    id: string;
}
