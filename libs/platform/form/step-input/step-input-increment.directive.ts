import { Directive, SkipSelf } from '@angular/core';

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
    /** @ignore */
    constructor(@SkipSelf() private stepInput: StepInputComponent) {
        super();
    }

    /** @ignore */
    canHandleAction(): boolean {
        return !!this.stepInput.canChangeValue;
    }

    /** @ignore */
    runAction(): void {
        this.stepInput.increase();
    }
}
