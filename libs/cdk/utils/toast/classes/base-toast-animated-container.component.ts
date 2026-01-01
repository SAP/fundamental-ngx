import { Directive, ElementRef, inject, NgZone, OnDestroy, signal } from '@angular/core';
import { BaseAnimatedToastConfig } from './base-toast-config';
import { BaseToastContainerComponent } from './base-toast-container.component';

@Directive({
    host: {
        '[class]': '_animationClasses'
    }
})
export abstract class BaseToastAnimatedContainerComponent<P extends BaseAnimatedToastConfig>
    extends BaseToastContainerComponent<P>
    implements OnDestroy
{
    /**
     * @hidden
     * The state of the Message Toast animations.
     */
    protected _animationStateSignal = signal<'void' | 'visible' | 'hidden'>('void');

    /**
     * @hidden
     * Whether we're currently animating (used to apply animation classes)
     */
    protected _isAnimatingSignal = signal<boolean>(false);

    /**
     * @hidden
     * Whether the animations should be disabled.
     */
    protected _animationsDisabled = false;

    /** @hidden */
    protected _ngZone = inject(NgZone);

    /** @hidden */
    private _elementRef = inject(ElementRef);

    /** @hidden */
    private _animationEndListener?: (event: AnimationEvent) => void;

    /** @hidden */
    private _exitCompleted = false;

    /**
     * @hidden
     * Host binding for animation state CSS classes
     */
    protected get _animationClasses(): string {
        const state = this._animationStateSignal();
        const isAnimating = this._isAnimatingSignal();
        const classes = [this._baseClassName, `${this._baseClassName}--${state}`];

        if (isAnimating) {
            if (state === 'visible') {
                classes.push(`${this._baseClassName}--entering`);
            } else if (state === 'hidden') {
                classes.push(`${this._baseClassName}--exiting`);
            }
        }

        if (this._animationsDisabled) {
            classes.push(`${this._baseClassName}--no-animation`);
        }

        return classes.join(' ');
    }

    /**
     * @hidden
     * Override in subclass to provide base CSS class name for animations
     */
    protected abstract get _baseClassName(): string;

    /** @hidden */
    constructor(config: P) {
        super(config);
        this._animationsDisabled = !config.animated;
        this._setupAnimationEndListener();
    }

    /** Begin animation of Message Toast entrance into view. */
    enter(): void {
        this._animationStateSignal.set('visible');
        this._isAnimatingSignal.set(!this._animationsDisabled);

        // If animations are disabled, immediately complete the enter
        // Use setTimeout to defer so subscriptions can be set up first
        if (this._animationsDisabled) {
            setTimeout(() => {
                this._ngZone.run(() => {
                    this.onEnter$.next();
                    this.onEnter$.complete();
                });
            }, 0);
        }
    }

    /** Begin animation of Message Toast removal. */
    exit(): void {
        this._animationStateSignal.set('hidden');
        this._isAnimatingSignal.set(!this._animationsDisabled);

        // If animations are disabled, immediately complete the exit
        if (this._animationsDisabled) {
            this._completeExit();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._removeAnimationEndListener();
        this._completeExit();
    }

    /**
     * @hidden
     * Set up native animationend event listener
     */
    private _setupAnimationEndListener(): void {
        this._animationEndListener = (event: AnimationEvent) => {
            // Only handle our own animations, not child animations
            if (event.target !== this._elementRef.nativeElement) {
                return;
            }

            const state = this._animationStateSignal();

            // Clear the animating flag when animation completes
            this._isAnimatingSignal.set(false);

            if (state === 'hidden') {
                this._completeExit();
            } else if (state === 'visible') {
                // Note: we shouldn't use `this` inside the zone callback,
                // because it can cause a memory leak.
                const onEnter = this.onEnter$;

                this._ngZone.run(() => {
                    onEnter.next();
                    onEnter.complete();
                });
            }
        };

        this._elementRef.nativeElement.addEventListener('animationend', this._animationEndListener);
    }

    /**
     * @hidden
     * Remove animation event listener
     */
    private _removeAnimationEndListener(): void {
        if (this._animationEndListener) {
            this._elementRef.nativeElement.removeEventListener('animationend', this._animationEndListener);
        }
    }

    /**
     * @hidden
     * Waits for the zone to settle before removing the element. Helps prevent
     * errors where we end up removing an element which is in the middle of an animation.
     */
    private _completeExit(): void {
        // Prevent multiple completions
        if (this._exitCompleted) {
            return;
        }
        this._exitCompleted = true;

        // Note: we shouldn't use `this` inside the zone callback,
        // because it can cause a memory leak.
        const onExit = this.onExit$;

        // Use setTimeout to defer execution to next tick to ensure DOM is ready
        setTimeout(() => {
            this._ngZone.run(() => {
                onExit.next();
                onExit.complete();
            });
        }, 0);
    }
}
