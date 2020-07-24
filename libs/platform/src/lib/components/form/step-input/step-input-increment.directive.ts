import { Directive, HostListener, SkipSelf } from '@angular/core';
import { fromEvent, timer, interval } from 'rxjs';
import { switchMap, takeUntil, startWith } from 'rxjs/operators';

import { StepInputComponent } from './base.step-input';

export const streamUntilMouseUp$ = timer(500).pipe(
    switchMap(() => interval(40)),
    takeUntil(fromEvent(window, 'mouseup', { capture: true, once: true }))
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

        this._streamUntilMouseUp$.pipe(startWith(null)).subscribe(() => {
            this.stepInput.increase();
            this.stepInput.detectChanges();
        });
    }
}
