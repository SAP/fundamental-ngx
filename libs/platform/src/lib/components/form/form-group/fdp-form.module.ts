import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormModule as FdFormModule,
         InlineHelpModule, 
         PopoverModule } from '@fundamental-ngx/core';
import { FormGroupComponent } from './form-group.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { 
        InputMessageGroupWithTemplate 
        } from '../input-message-group-with-template/input-message-group-with-template.component';

@NgModule({
    declarations: [FormGroupComponent, FormFieldComponent, InputMessageGroupWithTemplate],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FdFormModule, InlineHelpModule, PopoverModule],
    exports: [FormGroupComponent, FormFieldComponent, InputMessageGroupWithTemplate]

})
export class FdpFormGroupModule {}
