import { DynamicFormGeneratorInputComponent } from '../dynamic-form-generator-input/dynamic-form-generator-input.component';
import { DynamicFormGeneratorCheckboxComponent } from '../dynamic-form-generator-checkbox/dynamic-form-generator-checkbox.component';
import { DynamicFormGeneratorRadioComponent } from '../dynamic-form-generator-radio/dynamic-form-generator-radio.component';
import { DynamicFormGeneratorEditorComponent } from '../dynamic-form-generator-editor/dynamic-form-generator-editor.component';
import { DynamicFormGeneratorSelectComponent } from '../dynamic-form-generator-select/dynamic-form-generator-select.component';
import { FormComponentDefinition } from '../interfaces/form-component-definition';
import { DynamicFormGeneratorDatepickerComponent } from '../dynamic-form-generator-datepicker/dynamic-form-generator-datepicker.component';
import { DynamicFormGeneratorSwitchComponent } from '../dynamic-form-generator-switch/dynamic-form-generator-switch.component';

export const DEFAULT_COMPONENTS_LIST: FormComponentDefinition[] = [
    {
        types: ['input', 'email', 'number', 'password'],
        component: DynamicFormGeneratorInputComponent
    },
    {
        types: ['checkbox'],
        component: DynamicFormGeneratorCheckboxComponent
    },
    {
        types: ['radio', 'confirm'],
        component: DynamicFormGeneratorRadioComponent
    },
    {
        types: ['editor'],
        component: DynamicFormGeneratorEditorComponent
    },
    {
        types: ['select', 'list'],
        component: DynamicFormGeneratorSelectComponent
    },
    {
        types: ['datepicker'],
        component: DynamicFormGeneratorDatepickerComponent
    },
    {
        types: ['switch'],
        component: DynamicFormGeneratorSwitchComponent
    }
];
