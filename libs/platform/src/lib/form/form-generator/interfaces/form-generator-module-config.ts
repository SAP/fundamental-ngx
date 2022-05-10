import { DynamicFormFieldItem } from './dynamic-form-item';

export interface FormGeneratorConfig {
    /**
     * Control names separator for multidimensional forms.
     */
    controlNameSeparator: string;
    /**
     * Name of the group which holds all ungrouped controls.
     */
    ungroupedControlsName: string;
}

export interface FormGeneratorModuleConfig {
    /**
     * Default configuration of the form generator item.
     */
    itemConfig?: Partial<DynamicFormFieldItem>;
    /**
     * Default configuration of the form generator form.
     */
    formConfig?: Partial<FormGeneratorConfig>;
}
