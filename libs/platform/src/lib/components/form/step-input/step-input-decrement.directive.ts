import { Directive, HostListener, SkipSelf } from '@angular/core';
import { startWith } from 'rxjs/operators';

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

        this._streamUntilMouseUp$.pipe(startWith(null)).subscribe(() => {
            this.stepInput.decrease();
            this.stepInput.detectChanges();
        });
    }
}
