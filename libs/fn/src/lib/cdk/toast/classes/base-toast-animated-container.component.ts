import { AnimationEvent } from '@angular/animations';
import { Directive, HostBinding, HostListener, NgZone, OnDestroy } from '@angular/core';
import { take } from 'rxjs';
import { BaseToastConfig } from './base-toast-config';
import { BaseToastContainerComponent } from './base-toast-container.component';
import { ToastContainerComponent } from '../interfaces/toast-container-component.interface';

@Directive()
export abstract class BaseToastAnimatedContainerComponent<P extends BaseToastConfig>
    extends BaseToastContainerComponent<P>
    implements OnDestroy, ToastContainerComponent<P>
{
    /** The state of the Message Toast animations. */
    @HostBinding('@state')
    _animationState = 'void';

    /** @hidden */
    protected constructor(protected _ngZone: NgZone, config: P) {
        super(config);
    }

    /** Begin animation of Message Toast entrance into view. */
    enter(): void {
        this._animationState = 'visible';
    }

    /** Begin animation of Message Toast removal. */
    exit(): void {
        this._animationState = 'hidden';
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._completeExit();
    }

    /** Handle end of animations, updating the state of the Message Toast. */
    @HostListener('@state.done', ['$event'])
    onAnimationEnd(event: AnimationEvent): void {
        const { fromState, toState } = event;

        if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
            this._completeExit();
        }

        if (toState === 'visible') {
            // Note: we shouldn't use `this` inside the zone callback,
            // because it can cause a memory leak.
            const onEnter = this.onEnter$;

            this._ngZone.run(() => {
                onEnter.next();
                onEnter.complete();
            });
        }
    }

    /**
     * @hidden
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     */
    private _completeExit(): void {
        // Note: we shouldn't use `this` inside the zone callback,
        // because it can cause a memory leak.
        const onExit = this.onExit$;

        this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
            onExit.next();
            onExit.complete();
        });
    }
}
