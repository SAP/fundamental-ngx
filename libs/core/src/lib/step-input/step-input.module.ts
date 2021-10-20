import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepInputComponent } from './step-input.component';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    declarations: [StepInputComponent],
    imports: [CommonModule, ButtonModule],
    exports: [StepInputComponent]
})
export class StepInputModule {}
