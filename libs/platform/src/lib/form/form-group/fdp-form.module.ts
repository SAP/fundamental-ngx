import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FormModule as FdFormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { FormGroupComponent } from './form-group.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputMessageGroupWithTemplate } from '../input-message-group-with-template/input-message-group-with-template.component';
import { FormFieldGroupComponent } from './form-field-group/form-field-group.component';

@NgModule({
    declarations: [FormGroupComponent, FormFieldComponent, InputMessageGroupWithTemplate, FormFieldGroupComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FdFormModule,
        InlineHelpModule,
        PopoverModule,
        IconModule
    ],
    exports: [FormGroupComponent, FormFieldComponent, InputMessageGroupWithTemplate, FormFieldGroupComponent]
})
export class FdpFormGroupModule {}
