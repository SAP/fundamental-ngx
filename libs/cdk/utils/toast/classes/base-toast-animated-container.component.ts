import { Directive, ElementRef, HostBinding, inject, NgZone, OnDestroy, signal } from '@angular/core';
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
    protected _animationStateSignal = signal<'void' | 'visible' | 'hidden'>('void');

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

    /**
     * @hidden
     * Host binding for animation state CSS classes
     */
    @HostBinding('class')
    protected get _animationClasses(): string {
        const state = this._animationStateSignal();
        const classes = [this._baseClassName, `${this._baseClassName}--${state}`];

        if (state === 'visible') {
            classes.push(`${this._baseClassName}--entering`);
        } else if (state === 'hidden') {
            classes.push(`${this._baseClassName}--exiting`);
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
    }

    /** Begin animation of Message Toast removal. */
    exit(): void {
        this._animationStateSignal.set('hidden');
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
        // Note: we shouldn't use `this` inside the zone callback,
        // because it can cause a memory leak.
        const onExit = this.onExit$;

        this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
            onExit.next();
            onExit.complete();
        });
    }
}
