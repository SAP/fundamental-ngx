import { NgModule } from '@angular/core';
import { StepInputDecrementDirective } from './step-input-decrement.directive';
import { StepInputIncrementDirective } from './step-input-increment.directive';
import { StepInputControlDirective } from './step-input-control.directive';
import { NumberStepInputComponent } from './number/number-step-input.component';

@NgModule({
    imports: [
        StepInputDecrementDirective,
        StepInputIncrementDirective,
        StepInputControlDirective,
        NumberStepInputComponent
    ],
    exports: [
        StepInputDecrementDirective,
        StepInputIncrementDirective,
        StepInputControlDirective,
        NumberStepInputComponent
    ]
})
export class PlatformStepInputModule {}
