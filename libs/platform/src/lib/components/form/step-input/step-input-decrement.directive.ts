import { Directive, HostListener, SkipSelf } from '@angular/core';

import { StepInputComponent } from './base.step-input';
import { streamUntilMouseUp$ } from './step-input-increment.directive';

/**
 * This Directive is used to be assigned to decrement button.
 */
@Directive({
    selector: '[fdpStepInputDecrement]'
})
export class StepInputDecrementDirective {
    /** @hidden */
    readonly _streamUntilMouseUp$ = streamUntilMouseUp$;

    /** @hidden */
    constructor(@SkipSelf() private stepInput: StepInputComponent) {}

    @HostListener('mousedown', ['$event'])
    click($event: Event) {
        $event.preventDefault();
        // Propagate event to decrease value
        this.stepInput.decrease();

        // Until mouseup trigger "increment"
        this._streamUntilMouseUp$.subscribe(() => {
            this.stepInput.decrease();
        });
    }
}
