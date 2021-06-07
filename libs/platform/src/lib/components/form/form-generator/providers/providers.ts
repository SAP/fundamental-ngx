import { forwardRef, Provider } from '@angular/core';
import { FormFieldComponent } from '@fundamental-ngx/platform';
import { FormField } from '../../form-field';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../../form-group/constants';

export const dynamicFormFieldProvider: Provider = {
    provide: FormField,
    useExisting: forwardRef(() => FormFieldComponent)
};

export const dynamicFormGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormFieldComponent)
};
