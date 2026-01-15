import { NgModule } from '@angular/core';
import { NumberStepInputComponent } from './number/number-step-input.component';
import { StepInputControlDirective } from './step-input-control.directive';
import { StepInputDecrementDirective } from './step-input-decrement.directive';
import { StepInputIncrementDirective } from './step-input-increment.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
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
