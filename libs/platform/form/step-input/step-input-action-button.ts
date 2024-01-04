import { DestroyRef, Directive, HostListener, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, interval, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

/**
 * This is a base step input directive to be used for increase/decrease buttons.
 */
@Directive()
export abstract class StepInputActionButton {
    /**
     * @hidden
     * Indicates if action can be handled
     */
    abstract canHandleAction(): boolean;

    /**
     * @hidden
     * Step input button action handler
     */
    abstract runAction(): void;
    /** @hidden */
    protected _destroyed = inject(DestroyRef);

    /** @hidden */
    @HostListener('mousedown')
    click(): void {
        if (!this.canHandleAction()) {
            return;
        }

        // Run action while button is pressed
        timer(500)
            .pipe(
                switchMap(() => interval(40)),
                takeUntil(fromEvent(window, 'mouseup', { capture: true, once: true }))
            )
            .pipe(takeUntilDestroyed(this._destroyed))
            .subscribe(() => this.runAction());

        this.runAction();
    }
}
