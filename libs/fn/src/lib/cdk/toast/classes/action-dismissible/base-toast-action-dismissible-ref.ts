import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { BaseToastDurationDismissibleRef } from '../duration-dismissible/base-toast-duration-dismissible-ref';
import { BaseToastDurationDismissibleContainerComponent } from '../duration-dismissible/base-toast-duration-dismissible-container.component';

export abstract class BaseToastActionDismissibleRef<T = any, P = any> extends BaseToastDurationDismissibleRef<T, P> {
    /** Subject for notifying the user that the Toast action-dismissible was called. */
    protected readonly onAction$ = new Subject<string | null>();

    /** Whether the Toast was dismissed using the action-dismissible button. */
    protected dismissedByAction = false;

    protected constructor(
        public containerInstance: BaseToastDurationDismissibleContainerComponent<P>,
        public overlayRef: OverlayRef
    ) {
        super(containerInstance, overlayRef);

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

    /** Cleans up the DOM after closing. */
    protected _finishDismiss(): void {
        if (!this.onAction$.closed) {
            this.onAction$.complete();
        }

        super._finishDismiss();
    }
}
