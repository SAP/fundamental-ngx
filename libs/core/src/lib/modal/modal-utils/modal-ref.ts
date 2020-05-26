import { Observable, Subject } from 'rxjs';

/**
 * Reference to a modal component generated via the ModalService.
 * It can be injected into the content component through the constructor.
 * For a template, it is declared as part of the implicit context, see examples.
 */
export class ModalRef {
    private readonly _afterClosed = new Subject<any>();
    private readonly _afterLoaded = new Subject<any>();

    /**
     * Observable that is triggered when the modal is closed.
     * On close a *result* is passed back. On dismiss, an *error* is returned instead.
     */
    public afterClosed: Observable<any> = this._afterClosed.asObservable();

    /** Observable that is triggered when the modal view is initialised. */
    public afterLoaded: Observable<any> = this._afterLoaded.asObservable();

    /** Data passed from the calling component to the content.*/
    public data: any;

    /**
     * Closes the modal and passes the argument to the afterClosed observable.
     * @param result Value passed back to the observable as a result.
     */
    close(result?: any): void {
        this._afterClosed.next(result);
        this._afterClosed.complete();
    }

    /**
     * Dismisses the modal and passes the argument to the afterClosed observable as an error.
     * @param reason Value passed back to the observable as an error.
     */
    dismiss(reason?: any): void {
        this._afterClosed.error(reason);
    }

    /** Function that is called after the view of modal is initialised. */
    loaded(): void {
        this._afterLoaded.next();
    }
}
