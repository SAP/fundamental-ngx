import { Directive, HostListener, OnDestroy } from '@angular/core';
import { fromEvent, timer, interval, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

/**
 * This is a base step input directive to be used for increase/decrease buttons.
 */
@Directive()
export abstract class StepInputActionButton implements OnDestroy {
    /** @hidden */
    protected _destroyed = new Subject<void>();

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

    /** @hidden  */
    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

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
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this.runAction());

        this.runAction();
    }
}
