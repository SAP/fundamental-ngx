import { forwardRef, Provider } from '@angular/core';
import { FormField } from '../../form-field';
import { FormFieldGroup } from '../../form-field-group';
import { FORM_GROUP_CHILD_FIELD_TOKEN } from '../constants';
import { FormFieldGroupComponent } from '../form-field-group/form-field-group.component';
import { FormFieldComponent } from '../form-field/form-field.component';

export const formFieldGroupProvider: Provider = {
    provide: FormFieldGroup,
    useExisting: forwardRef(() => FormFieldGroupComponent)
};

export const formGroupChildProvider: Provider = {
    provide: FORM_GROUP_CHILD_FIELD_TOKEN,
    useExisting: forwardRef(() => FormFieldGroupComponent)
};

export const formFieldProvider: Provider = {
    provide: FormField,
    useExisting: forwardRef(() => FormFieldComponent)
};
