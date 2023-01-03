import { forwardRef, InjectionToken, Provider } from '@angular/core';
import { Validators } from '@angular/forms';
import { FD_FORM_FIELD } from '@fundamental-ngx/cdk/forms';

import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../../form-group/constants';
import { FormFieldComponent } from '../../form-group/form-field/form-field.component';
import { DynamicFormFieldItem } from '../interfaces/dynamic-form-item';
import { FormGeneratorConfig } from '../interfaces/form-generator-module-config';

export const dynamicFormFieldProvider: Provider = {
    provide: FD_FORM_FIELD,
    useExisting: forwardRef(() => FormFieldComponent)
};

export const dynamicFormGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormFieldComponent)
};

export const FORM_GENERATOR_ITEM_CONFIG = new InjectionToken<DynamicFormFieldItem>('FormGeneratorItemConfig');

export const FORM_GENERATOR_CONFIG = new InjectionToken<FormGeneratorConfig>('FormGeneratorConfig');

export const defaultFormGeneratorConfig: FormGeneratorConfig = {
    controlNameSeparator: '|',
    ungroupedControlsName: 'ungrouped'
};

export const defaultFormGeneratorConfigProvider: Provider = {
    provide: FORM_GENERATOR_CONFIG,
    useValue: defaultFormGeneratorConfig
};

export const defaultFormGeneratorItemConfig: Partial<DynamicFormFieldItem> = {
    useMessageAsPlaceholder: true,
    required: false,
    validators: [Validators.nullValidator]
};

export const defaultFormGeneratorItemConfigProvider: Provider = {
    provide: FORM_GENERATOR_ITEM_CONFIG,
    useValue: defaultFormGeneratorItemConfig
};
