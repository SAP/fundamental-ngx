import { Directive, SkipSelf } from '@angular/core';

import { StepInputComponent } from './base.step-input';
import { StepInputActionButton } from './step-input-action-button';

/**
 * This Directive is used to be assigned to decrement button.
 */
@Directive({
    selector: '[fdpStepInputDecrement]',
    standalone: true
})
export class StepInputDecrementDirective extends StepInputActionButton {
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
        this.stepInput.decrease();
    }
}
