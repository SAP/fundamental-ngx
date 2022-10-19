import { Directive, SkipSelf } from '@angular/core';

import { StepInputComponent } from './base.step-input';
import { StepInputActionButton } from './step-input-action-button';

/**
 * This Directive is used to be assigned to increment button.
 */
@Directive({
    selector: '[fdpStepInputIncrement]'
})
export class StepInputIncrementDirective extends StepInputActionButton {
    /** @hidden */
    constructor(@SkipSelf() private stepInput: StepInputComponent) {
        super();
    }

    /** @hidden */
    canHandleAction(): boolean {
        return !!this.stepInput.canChangeValue;
    }

    /** @hidden */
    runAction(): void {
        this.stepInput.increase();
    }
}
