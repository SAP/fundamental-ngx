import { Directive, HostListener, SkipSelf } from '@angular/core';
import { fromEvent, timer, interval } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { StepInputComponent } from './base.step-input';

export const streamUntilMouseUp$ = timer(500).pipe(
    switchMap(() => interval(40)),
    takeUntil(fromEvent(window, 'mouseup'))
);

/**
 * This Directive is used to be assigned to increment button.
 */
@Directive({
    selector: '[fdpStepInputIncrement]'
})
export class StepInputIncrementDirective {
    /** @hidden */
    readonly _streamUntilMouseUp$ = streamUntilMouseUp$;

    /** @hidden */
    constructor(@SkipSelf() private stepInput: StepInputComponent) {}

    @HostListener('mousedown', ['$event'])
    click($event: Event) {
        $event.preventDefault();
        // Propagate event to increase value
        this.stepInput.increase();

        // Until mouseup trigger "increment"
        this._streamUntilMouseUp$.subscribe(() => {
            this.stepInput.increase();
        });
    }
}
