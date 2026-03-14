import { DestroyRef, Directive, ElementRef, OnDestroy, inject } from '@angular/core';
import { BaseToastConfig } from './base-toast-config';
import { BaseToastContainerComponent } from './base-toast-container.component';

@Directive({
    host: {
        style: 'opacity: 0; transform: translateY(1rem)'
    }
})
export abstract class BaseToastAnimatedContainerComponent<P extends BaseToastConfig>
    extends BaseToastContainerComponent<P>
    implements OnDestroy
{
    /** @hidden */
    private readonly _animated: boolean;

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    private _currentAnimation: Animation | null = null;

    /** @hidden */
    constructor(config: P) {
        super(config);
        this._animated = config.animated !== false;

        // Register cleanup for animations
        this._destroyRef.onDestroy(() => {
            this._currentAnimation?.cancel();
            this._currentAnimation = null;
        });
    }

    /** Begin animation of Message Toast entrance into view. */
    enter(): void {
        const el: HTMLElement = this._elementRef.nativeElement;

        // Check if animations are disabled or Web Animations API is not available
        if (!this._animated || typeof el.animate !== 'function') {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            // Defer to allow subscribers to register before emitting.
            queueMicrotask(() => {
                this.onEnter$.next();
                this.onEnter$.complete();
            });
            return;
        }

        this._currentAnimation = el.animate(
            [
                { opacity: 0, transform: 'translateY(1rem)' },
                { opacity: 1, transform: 'translateY(0)' }
            ],
            { duration: 150, easing: 'cubic-bezier(0, 0, 0.2, 1)', fill: 'forwards' }
        );

        this._currentAnimation.finished
            .then(() => {
                this._currentAnimation = null;
                this.onEnter$.next();
                this.onEnter$.complete();
            })
            .catch(() => {
                // Animation was cancelled, clean up
                this._currentAnimation = null;
            });
    }

    /** Begin animation of Message Toast removal. */
    exit(): void {
        const el: HTMLElement = this._elementRef.nativeElement;

        if (!this._animated || typeof el.animate !== 'function') {
            this._completeExit();
            return;
        }

        this._currentAnimation?.cancel();

        this._currentAnimation = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 75,
            easing: 'cubic-bezier(0.4, 0, 1, 1)',
            fill: 'forwards'
        });

        this._currentAnimation.finished
            .then(() => {
                this._currentAnimation = null;
                this._completeExit();
            })
            .catch(() => {
                // Animation was cancelled, clean up
                this._currentAnimation = null;
                this._completeExit();
            });
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
