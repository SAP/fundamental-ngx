import { Directive, HostListener, Self } from '@angular/core';

import { StepInputComponent } from './base.step-input';

/**
 * Tool directive used to achieve the infinite scroll mechanism.
 */
@Directive({
    selector: '[fdpStepInputIncrement]'
})
export class StepInputIncrementDirective {
    /** @hidden */
    constructor(@Self() private stepInput: StepInputComponent) {}

    @HostListener('click', ['$event'])
    click($event: Event) {
        $event.preventDefault();
        // Propagate event to increase value
        this.stepInput.increase();
    }
}
