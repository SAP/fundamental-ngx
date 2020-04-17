import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as FdFormModule, RadioModule } from '@fundamental-ngx/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioGroupComponent } from './radio-group.component';
import { RadioButtonComponent } from './radio/radio.component';

@NgModule({
    imports: [CommonModule, FdFormModule, FormsModule, RadioModule, ReactiveFormsModule],
    exports: [RadioGroupComponent, RadioButtonComponent],
    declarations: [RadioGroupComponent, RadioButtonComponent],
})
export class PlatformRadioGroupModule {}
