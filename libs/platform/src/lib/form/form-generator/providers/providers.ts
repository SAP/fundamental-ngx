import { forwardRef, Provider } from '@angular/core';

import { FormField } from '@fundamental-ngx/platform/shared';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../../form-group/constants';
import { FormFieldComponent } from '../../form-group/form-field/form-field.component';

export const dynamicFormFieldProvider: Provider = {
    provide: FormField,
    useExisting: forwardRef(() => FormFieldComponent)
};

export const dynamicFormGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormFieldComponent)
};
