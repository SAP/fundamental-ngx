import { NgModule } from '@angular/core';
import { FormGroupComponent } from './form-group.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputMessageGroupWithTemplate } from '../input-message-group-with-template/input-message-group-with-template.component';
import { FormFieldGroupComponent } from './form-field-group/form-field-group.component';
import { FormFieldControlExtrasComponent } from './form-field-extras/form-field-extras.component';
import { FormGroupHeaderComponent } from './form-group-header/form-group-header.component';
import { FieldGroupRowValuePipe } from './pipes/field-group-row-value.pipe';
import { FormFieldErrorDirective } from './form-field-error/form-field-error.directive';
import { FormFieldErrorHeadingDirective } from './form-field-error/form-field-error-heading.directive';
import { FormFieldErrorDescriptionDirective } from './form-field-error/form-field-error-description.directive';

const EXPORTABLE_DECLARATIONS = [
    FormGroupComponent,
    FormFieldComponent,
    InputMessageGroupWithTemplate,
    FormFieldGroupComponent,
    FormFieldControlExtrasComponent,
    FormGroupHeaderComponent,
    FieldGroupRowValuePipe,
    FormFieldErrorDirective,
    FormFieldErrorHeadingDirective,
    FormFieldErrorDescriptionDirective
];

@NgModule({
    imports: [...EXPORTABLE_DECLARATIONS],
    exports: [...EXPORTABLE_DECLARATIONS]
})
export class FdpFormGroupModule {}
