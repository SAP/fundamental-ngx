import { DynamicFormGeneratorCheckboxComponent } from '../controls/dynamic-form-generator-checkbox/dynamic-form-generator-checkbox.component';
import { DynamicFormGeneratorDatepickerComponent } from '../controls/dynamic-form-generator-datepicker/dynamic-form-generator-datepicker.component';
import { DynamicFormGeneratorEditorComponent } from '../controls/dynamic-form-generator-editor/dynamic-form-generator-editor.component';
import { DynamicFormGeneratorInputComponent } from '../controls/dynamic-form-generator-input/dynamic-form-generator-input.component';
import { DynamicFormGeneratorMultiInputComponent } from '../controls/dynamic-form-generator-multi-input/dynamic-form-generator-multi-input.component';
import { DynamicFormGeneratorObjectStatusComponent } from '../controls/dynamic-form-generator-object-status/dynamic-form-generator-object-status.component';
import { DynamicFormGeneratorRadioComponent } from '../controls/dynamic-form-generator-radio/dynamic-form-generator-radio.component';
import { DynamicFormGeneratorSelectComponent } from '../controls/dynamic-form-generator-select/dynamic-form-generator-select.component';
import { DynamicFormGeneratorSwitchComponent } from '../controls/dynamic-form-generator-switch/dynamic-form-generator-switch.component';
import { FormComponentDefinition } from '../interfaces/form-component-definition';

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
        types: ['editor', 'textarea'],
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
    },
    {
        types: ['multi-input'],
        component: DynamicFormGeneratorMultiInputComponent
    },
    {
        types: ['object-status'],
        component: DynamicFormGeneratorObjectStatusComponent
    }
];
