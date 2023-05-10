import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { BaseToastPosition } from '../../base-toast-positions';
import { BaseToastDurationDismissibleRef } from '../duration-dismissible/base-toast-duration-dismissible-ref';
import { BaseToastDurationDismissibleContainerComponent } from '../duration-dismissible/base-toast-duration-dismissible-container.component';
import { BaseToastConfig } from '../base-toast-config';

export abstract class BaseToastActionDismissibleRef<
    T = any,
    P extends BaseToastConfig<T> = any
> extends BaseToastDurationDismissibleRef<T, P> {
    /** Subject for notifying the user that the Toast action-dismissible was called. */
    protected readonly onAction$ = new Subject<string | null>();

    /** Whether the Toast was dismissed using the action-dismissible button. */
    protected dismissedByAction = false;

    /** @hidden */
    protected constructor(
        containerInstance: BaseToastDurationDismissibleContainerComponent<P>,
        overlayRef: OverlayRef,
        positionStrategy: BaseToastPosition
    ) {
        super(containerInstance, overlayRef, positionStrategy);

        this.onAction().subscribe(() => this.dismiss());
    }

    /** Marks the Toast action-dismissible clicked. */
    dismissWithAction(reason: string | null = null): void {
        if (!this.onAction$.closed) {
            this.dismissedByAction = true;

            this.onAction$.next(reason);
            this.onAction$.complete();
        }
    }

    /** Gets an observable that is notified when the Toast action-dismissible is called. */
    onAction(): Observable<string | null> {
        return this.onAction$;
    }

    /**
     * @hidden
     * Cleans up the DOM after closing.
     */
    protected override _finishDismiss(): void {
        if (!this.onAction$.closed) {
            this.onAction$.complete();
        }

        super._finishDismiss();
    }
}
