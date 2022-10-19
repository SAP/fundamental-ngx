import { Directive, SkipSelf } from '@angular/core';

import { StepInputComponent } from './base.step-input';
import { StepInputActionButton } from './step-input-action-button';

/**
 * This Directive is used to be assigned to decrement button.
 */
@Directive({
    selector: '[fdpStepInputDecrement]'
})
export class StepInputDecrementDirective extends StepInputActionButton {
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
        this.stepInput.decrease();
    }
}
