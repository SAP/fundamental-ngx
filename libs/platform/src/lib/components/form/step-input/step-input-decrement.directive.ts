import { Directive, HostListener, SkipSelf } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    private _streamUntilMouseUp$: Observable<number> = streamUntilMouseUp$;

    /** @hidden */
    constructor(@SkipSelf() private stepInput: StepInputComponent) {}

    /** @hidden */
    @HostListener('mousedown', ['$event'])
    click($event: Event): void {
        if (!this.stepInput.canChangeValue) {
            return;
        }

        $event.preventDefault();

        this._streamUntilMouseUp$.pipe(startWith(null)).subscribe(() => {
            this.stepInput.decrease();
            this.stepInput.detectChanges();
        });
    }
}
