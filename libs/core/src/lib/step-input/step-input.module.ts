import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormInputMessageGroupModule, FormMessageModule } from '@fundamental-ngx/core/form';

import { StepInputComponent } from './step-input.component';

@NgModule({
    declarations: [StepInputComponent],
    imports: [CommonModule, ButtonModule, FormInputMessageGroupModule, FormMessageModule],
    exports: [StepInputComponent]
})
export class StepInputModule {}
