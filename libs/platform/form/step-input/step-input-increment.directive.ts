import { Directive, inject } from '@angular/core';

import { StepInputComponent } from './base.step-input';
import { StepInputActionButton } from './step-input-action-button';

/**
 * This Directive is used to be assigned to increment button.
 */
@Directive({
    selector: '[fdpStepInputIncrement]',
    standalone: true
})
export class StepInputIncrementDirective extends StepInputActionButton {
    private readonly stepInput = inject(StepInputComponent, { skipSelf: true });

    /** @hidden */
    canHandleAction(): boolean {
        return !!this.stepInput.canChangeValue;
    }

    /** @hidden */
    runAction(): void {
        this.stepInput.increase();
    }
}
