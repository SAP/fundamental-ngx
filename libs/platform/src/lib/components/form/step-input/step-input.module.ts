import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, OnlyDigitsModule } from '@fundamental-ngx/core';

import { StepInputDecrementDirective } from './step-input-decrement.directive';
import { StepInputIncrementDirective } from './step-input-increment.directive';
import { StepInputControlDirective } from './step-input-control.directive';
import { NumberStepInputComponent } from './number/number-step-input.component';

@NgModule({
    imports: [CommonModule, FormsModule, ButtonModule, OnlyDigitsModule],
    declarations: [
        StepInputDecrementDirective,
        StepInputIncrementDirective,
        StepInputControlDirective,
        NumberStepInputComponent
    ],
    exports: [NumberStepInputComponent]
})
export class PlatformStepInputModule {}
