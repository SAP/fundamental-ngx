import { Directive, HostListener, SkipSelf } from '@angular/core';

import { StepInputComponent } from './base.step-input';

/**
 * This Directive is used to be assigned to increment button.
 */
@Directive({
    selector: '[fdpStepInputIncrement]'
})
export class StepInputIncrementDirective {
    /** @hidden */
    constructor(@SkipSelf() private stepInput: StepInputComponent) {}

    @HostListener('click', ['$event'])
    click($event: Event) {
        $event.preventDefault();
        // Propagate event to increase value
        this.stepInput.increase();
    }
}
