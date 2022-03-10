import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { ToastContainerComponent } from '../interfaces/toast-container-component.interface';

export abstract class BaseToastRef<T = any, P = any> {
    /** The instance of the component making up the content of the Toast. */
    instance!: T;

    /** Subject for notifying the user that the Toast has been dismissed. */
    protected readonly _afterDismissed = new Subject<void>();

    /** Subject for notifying the user that the Toast has opened and appeared. */
    protected readonly _afterOpened = new Subject<void>();

    protected constructor(public containerInstance: ToastContainerComponent<P>, public overlayRef: OverlayRef) {
        containerInstance.onExit$.subscribe(() => this.finishDismiss());
    }

    /** Dismisses the Toast. */
    dismiss(): void {
        if (!this._afterDismissed.closed) {
            this.containerInstance.exit();
        }
    }

    /** Marks the toast as opened */
    _open(): void {
        if (!this._afterOpened.closed) {
            this._afterOpened.next();
            this._afterOpened.complete();
        }
    }

    /** Cleans up the DOM after closing. */
    finishDismiss(): void {
        this.overlayRef.dispose();

        this._afterDismissed.next();
        this._afterDismissed.complete();
    }

    /** Gets an observable that is notified when the Toast is finished closing. */
    afterDismissed(): Observable<void> {
        return this._afterDismissed.asObservable();
    }

    /** Gets an observable that is notified when the Toast has opened and appeared. */
    afterOpened(): Observable<void> {
        return this.containerInstance.onEnter$.asObservable();
    }
}
