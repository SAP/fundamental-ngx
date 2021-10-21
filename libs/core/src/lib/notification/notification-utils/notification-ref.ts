import { Observable, Subject } from 'rxjs';

/**
 * Reference to a notification component generated via the NotificationService.
 * It can be injected into the content component through the constructor.
 * For a template, it is declared as part of the implicit context, see examples.
 */
export class NotificationRef {
    /** @hidden */
    protected readonly _afterClosed = new Subject<any>();

    /**
     * Observable that is triggered when the notification is closed.
     * On close a *result* is passed back. On dismiss, an *error* is returned instead.
     */
    public afterClosed: Observable<any> = this._afterClosed.asObservable();

    /** Data passed from the calling component to the content.*/
    public data: any;

    /**
     * Closes the notification and passes the argument to the afterClosed observable.
     * @param result Value passed back to the observable as a result.
     */
    close(result?: any): void {
        this._afterClosed.next(result);
        this._afterClosed.complete();
    }

    /**
     * Dismisses the notification and passes the argument to the afterClosed observable as an error.
     * @param reason Value passed back to the observable as an error.
     */
    dismiss(reason?: any): void {
        this._afterClosed.error(reason);
    }
}
