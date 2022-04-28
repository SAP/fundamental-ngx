import { forwardRef, InjectionToken, Provider } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormField } from '@fundamental-ngx/platform/shared';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../../form-group/constants';
import { FormFieldComponent } from '../../form-group/form-field/form-field.component';
import { DynamicFormFieldItem } from '../interfaces/dynamic-form-item';

export const dynamicFormFieldProvider: Provider = {
    provide: FormField,
    useExisting: forwardRef(() => FormFieldComponent)
};

export const dynamicFormGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormFieldComponent)
};

export const FORM_GENERATOR_ITEM_CONFIG = new InjectionToken('FormGeneratorItemConfig');

export const defaultFormGeneratorItemConfig: Partial<DynamicFormFieldItem> = {
    useMessageAsPlaceholder: true,
    required: false,
    validators: [Validators.nullValidator]
};

export const defaultFormGeneratorItemConfigProvider: Provider = {
    provide: FORM_GENERATOR_ITEM_CONFIG,
    useValue: defaultFormGeneratorItemConfig
};
