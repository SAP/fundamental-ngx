import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { ToastContainerComponent } from '../interfaces/toast-container-component.interface';

export abstract class BaseToastRef<T = any, P = any> {
    /** The instance of the component is making up the content of the Toast. */
    instance!: T;

    /** Subject for notifying the user that the Toast has been dismissed. */
    protected readonly _afterDismissed$ = new Subject<void>();

    protected constructor(public containerInstance: ToastContainerComponent<P>, public overlayRef: OverlayRef) {
        containerInstance.onExit$.subscribe(() => this._finishDismiss());
    }

    /** Dismisses the Toast. */
    dismiss(): void {
        if (!this._afterDismissed$.closed) {
            this.containerInstance.exit();
        }
    }

    /** Gets an observable that is notified when the Toast is finished closing. */
    afterDismissed(): Observable<void> {
        return this._afterDismissed$.asObservable();
    }

    /** Gets an observable that is notified when the Toast has opened and appeared. */
    afterOpened(): Observable<void> {
        return this.containerInstance.onEnter$.asObservable();
    }

    /** Cleans up the DOM after closing. */
    protected _finishDismiss(): void {
        this.overlayRef.dispose();

        this._afterDismissed$.next();
        this._afterDismissed$.complete();
    }
}
