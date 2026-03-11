import { Directive, OnDestroy, signal } from '@angular/core';
import { BaseToastConfig } from './base-toast-config';
import { BaseToastContainerComponent } from './base-toast-container.component';

@Directive({
    host: {
        '[@state]': '_animationStateSignal()',
        '[@.disabled]': '_animationsDisabled',
        '(@state.done)': '_onAnimationEnd($event)'
    }
})
export abstract class BaseToastAnimatedContainerComponent<P extends BaseToastConfig>
    extends BaseToastContainerComponent<P>
    implements OnDestroy
{
    /**
     * @hidden
     * Whether the animations should be disabled.
     */
    protected _animationsDisabled: boolean;

    /** @hidden */
    protected readonly _animationStateSignal = signal('void');

    /** @hidden */
    constructor(config: P) {
        super(config);
        this._animationsDisabled = !config.animated;
    }

    /**
     * @hidden
     * Handle end of animations, updating the state of the Message Toast.
     */
    _onAnimationEnd(event: { fromState: string; toState: string }): void {
        const { fromState, toState } = event;

        if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
            this._completeExit();
        }

        if (toState === 'visible') {
            this.onEnter$.next();
            this.onEnter$.complete();
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
     * Defers the exit notification to the next microtask. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     */
    private _completeExit(): void {
        const onExit = this.onExit$;

        queueMicrotask(() => {
            onExit.next();
            onExit.complete();
        });
    }
}
