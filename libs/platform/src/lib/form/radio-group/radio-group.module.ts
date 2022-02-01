import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormModule as FdFormModule } from '@fundamental-ngx/core/form';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { RadioGroupComponent } from './radio-group.component';
import { RadioButtonComponent } from './radio/radio.component';

@NgModule({
    imports: [CommonModule, FdFormModule, FormsModule, RadioModule, ReactiveFormsModule, PipeModule],
    exports: [RadioGroupComponent, RadioButtonComponent],
    declarations: [RadioGroupComponent, RadioButtonComponent]
})
export class PlatformRadioGroupModule {}
