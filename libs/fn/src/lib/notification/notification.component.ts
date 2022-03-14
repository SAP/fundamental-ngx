import { AnimationEvent } from '@angular/animations';
import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    OnDestroy,
    HostBinding,
    NgZone,
    HostListener
} from '@angular/core';
import { BaseToastDurationDismissibleComponent, baseToastAnimations } from '@fundamental-ngx/fn/cdk';
import { Observable, take } from 'rxjs';
import { NotificationConfig } from './config/notification-config';

@Component({
    selector: 'fn-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    animations: [baseToastAnimations.toastState],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.class]': '_composedClass',
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.max-width]': 'maxWidth',
        '[style.height]': 'height',
        '[style.min-height]': 'minHeight',
        '[style.max-height]': 'maxHeight'
    }
})
export class NotificationComponent
    extends BaseToastDurationDismissibleComponent<NotificationConfig>
    implements OnDestroy
{
    /** The state of the Notification animations. */
    @HostBinding('@state')
    animationState = 'void';

    /** @hidden */
    constructor(private _ngZone: NgZone, public config: NotificationConfig) {
        super(config);
    }

    /** @hidden */
    get _composedClass(): string {
        return ['fn-notification', this.config.semantic?.state ? `fn-notification--${this.config.semantic?.state}` : '']
            .filter((c) => !!c)
            .join(' ');
    }

    /** Begin animation of Notification entrance into view. */
    enter(): void {
        this.animationState = 'visible';
    }

    exit(): Observable<void> {
        this.animationState = 'hidden';
        return this.onExit$;
    }

    /** Makes sure the exit callbacks have been invoked when the element is destroyed. */
    ngOnDestroy(): void {
        this._completeExit();
    }

    /** Handle end of animations, updating the state of the Notification. */
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
