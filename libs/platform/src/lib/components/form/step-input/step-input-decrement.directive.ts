import { Directive, HostListener, SkipSelf } from '@angular/core';

import { StepInputComponent } from './base.step-input';

/**
 * This Directive is used to be assigned to decrement button.
 */
@Directive({
    selector: '[fdpStepInputDecrement]'
})
export class StepInputDecrementDirective {
    /** @hidden */
    constructor(@SkipSelf() private stepInput: StepInputComponent) {}

    @HostListener('click', ['$event'])
    click($event: Event) {
        $event.preventDefault();
        // Propagate event to decrease value
        this.stepInput.decrease();
    }
}
