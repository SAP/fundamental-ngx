import { AnimationEvent } from '@angular/animations';
import { Directive, HostBinding, HostListener, inject, NgZone, OnDestroy, signal } from '@angular/core';
import { take } from 'rxjs';
import { BaseAnimatedToastConfig } from './base-toast-config';
import { BaseToastContainerComponent } from './base-toast-container.component';

@Directive()
export abstract class BaseToastAnimatedContainerComponent<P extends BaseAnimatedToastConfig>
    extends BaseToastContainerComponent<P>
    implements OnDestroy
{
    /**
     * @hidden
     * The state of the Message Toast animations.
     */
    @HostBinding('@state')
    protected get _animationState(): string {
        return this._animationStateSignal();
    }
    /**
     * @hidden
     * Whether the animations should be disabled.
     */
    @HostBinding('@.disabled')
    protected _animationsDisabled = false;

    /** @hidden */
    protected _ngZone = inject(NgZone);

    /** @hidden */
    private _animationStateSignal = signal('void');

    /** @hidden */
    constructor(config: P) {
        super(config);
        this._animationsDisabled = !config.animated;
    }

    /**
     * @hidden
     * Handle end of animations, updating the state of the Message Toast.
     */
    @HostListener('@state.done', ['$event'])
    protected _onAnimationEnd(event: AnimationEvent): void {
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

    /** Begin animation of Message Toast entrance into view. */
    enter(): void {
        this._animationStateSignal.set('visible');
    }

    /** Begin animation of Message Toast removal. */
    exit(): void {
        this._animationStateSignal.set('hidden');
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._completeExit();
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
