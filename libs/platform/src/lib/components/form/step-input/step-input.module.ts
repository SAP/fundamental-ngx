import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core';

import { StepInputDecrementDirective } from './step-input-decrement.directive';
import { StepInputIncrementDirective } from './step-input-increment.directive';
import { NumberStepInputComponent } from './number/number-step-input.component';

@NgModule({
    declarations: [StepInputDecrementDirective, StepInputIncrementDirective, NumberStepInputComponent],
    imports: [CommonModule, FormsModule, ButtonModule],
    exports: [NumberStepInputComponent]
})
export class PlatformStepInputModule {}
