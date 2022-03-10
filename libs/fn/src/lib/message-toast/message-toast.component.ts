import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    HostBinding,
    NgZone,
    HostListener,
    OnDestroy
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import {
    BaseToastDurationDismissibleComponent,
    toastAnimations,
    ToastDismissibleContainerComponent
} from '@fundamental-ngx/fn/cdk';
import { Observable, take } from 'rxjs';
import { MessageToastConfig } from './config/message-toast.config';

@Component({
    selector: 'fn-message-toast',
    templateUrl: './message-toast.component.html',
    styleUrls: ['./message-toast.component.scss'],
    animations: [toastAnimations.toastState],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.max-width]': 'maxWidth',
        '[style.height]': 'height',
        '[style.min-height]': 'minHeight',
        '[style.max-height]': 'maxHeight'
    }
})
export class MessageToastComponent
    extends BaseToastDurationDismissibleComponent<MessageToastConfig>
    implements OnDestroy, ToastDismissibleContainerComponent<MessageToastConfig>
{
    /** The state of the Message Toast animations. */
    @HostBinding('@state')
    _animationState = 'void';

    /** @hidden */
    constructor(private _ngZone: NgZone, config: MessageToastConfig) {
        super(config);
    }

    /** Begin animation of Message Toast entrance into view. */
    enter(): void {
        this._animationState = 'visible';
    }

    /** Begin animation of Message Toast removal. */
    exit(): Observable<void> {
        this._animationState = 'hidden';
        return this.onExit$;
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
        this._ngZone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
            this.onExit$.next();
            this.onExit$.complete();
        });
    }
}
