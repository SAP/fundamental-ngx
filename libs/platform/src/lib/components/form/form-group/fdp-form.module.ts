import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormModule as FdFormModule, IconModule, InlineHelpModule, PopoverModule } from '@fundamental-ngx/core';

import { FormGroupComponent } from './form-group.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputMessageGroupWithTemplate } from '../input-message-group-with-template/input-message-group-with-template.component';
import { FormFieldGroupComponent } from './form-field-group/form-field-group.component';

@NgModule({
    declarations: [FormGroupComponent, FormFieldComponent, InputMessageGroupWithTemplate, FormFieldGroupComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FdFormModule, InlineHelpModule, PopoverModule, IconModule],
    exports: [FormGroupComponent, FormFieldComponent, InputMessageGroupWithTemplate, FormFieldGroupComponent]
})
export class FdpFormGroupModule {}
