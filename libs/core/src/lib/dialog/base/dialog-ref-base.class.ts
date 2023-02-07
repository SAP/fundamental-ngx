import { Observable, Subject } from 'rxjs';

export class DialogRefBase<T, P = any> {
    /** @hidden */
    protected readonly _afterClosed = new Subject<P | undefined>();

    /** @hidden */
    protected readonly _afterLoaded = new Subject<boolean>();

    /** @hidden */
    public _endClose$ = new Subject<void>();

    /**
     * Observable that is triggered when the dialog is closed.
     * On close a *result* is passed back. On dismiss, an *error* is returned instead.
     */
    public afterClosed: Observable<P | undefined> = this._afterClosed.asObservable();

    /** Observable that is triggered when the modal view is initialised. */
    public afterLoaded: Observable<boolean> = this._afterLoaded.asObservable();

    /** Data passed from the calling component to the content.*/
    public data: T;

    /**
     * Closes the dialog and passes the argument to the afterClosed observable.
     * @param result Value passed back to the observable as a result.
     */
    close(result?: P): void {
        this._afterClosed.next(result);
        this._afterClosed.complete();
    }

    /**
     * Dismisses the dialog and passes the argument to the afterClosed observable as an error.
     * @param reason Value passed back to the observable as an error.
     */
    dismiss(reason?: any): void {
        this._afterClosed.error(reason);
    }

    /** Function that is called after the view of modal is initialised. */
    loaded(): void {
        this._afterLoaded.next(true);
    }
}
