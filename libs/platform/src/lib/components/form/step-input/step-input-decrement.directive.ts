import { Directive, HostListener, Self } from '@angular/core';

import { StepInputComponent } from './base.step-input';

/**
 * Tool directive used to achieve the infinite scroll mechanism.
 */
@Directive({
    selector: '[fdpStepInputDecrement]'
})
export class StepInputDecrementDirective {
    /** @hidden */
    constructor(@Self() private stepInput: StepInputComponent) {}

    @HostListener('click', ['$event'])
    click($event: Event) {
        $event.preventDefault();
        // Propagate event to decrease value
        this.stepInput.decrease();
    }
}
