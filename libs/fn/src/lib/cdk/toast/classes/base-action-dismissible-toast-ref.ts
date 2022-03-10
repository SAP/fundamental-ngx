import { OverlayRef } from '@angular/cdk/overlay';
import { ToastDismissibleContainerComponent } from '../interfaces/toast-container-component.interface';
import { BaseDurationDismissibleToastRef } from './base-duration-dismissible-toast-ref';
import { Observable, Subject } from 'rxjs';

export abstract class BaseActionDismissibleToastRef<T = any, P = any> extends BaseDurationDismissibleToastRef<T, P> {
    /** Subject for notifying the user that the Toast action was called. */
    protected readonly onAction$ = new Subject<string | null>();

    /** Whether the Toast was dismissed using the action button. */
    protected dismissedByAction = false;

    protected constructor(
        public containerInstance: ToastDismissibleContainerComponent<P>,
        public overlayRef: OverlayRef
    ) {
        super(containerInstance, overlayRef);
        this.onAction().subscribe(() => this.dismiss());
    }

    /** Marks the Toast action clicked. */
    dismissWithAction(reason: string | null = null): void {
        if (!this.onAction$.closed) {
            this.dismissedByAction = true;
            this.onAction$.next(reason);
            this.onAction$.complete();
        }
    }

    /** Gets an observable that is notified when the Toast action is called. */
    onAction(): Observable<string | null> {
        return this.onAction$;
    }

    finishDismiss(): void {
        if (!this.onAction$.closed) {
            this.onAction$.complete();
        }

        super.finishDismiss();
    }
}
