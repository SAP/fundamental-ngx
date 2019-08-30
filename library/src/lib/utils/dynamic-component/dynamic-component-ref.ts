import { Observable, Subject } from 'rxjs';

export class DynamicComponentRef {

    private readonly _afterClosed: Subject<any> = new Subject<any>();

    /** Observable that is triggered when the dynamic component is dismissed. */
    public afterClosed: Observable<any> = this._afterClosed.asObservable();

    /** Data passed from the service open method. */
    public data: any;

    /**
     * Closes the dynamic component and passes the argument to the afterClosed observable.
     * @param result Value passed back to the observable as a result.
     */
    close(result?: any): void {
        this._afterClosed.next(result);
    }

    /**
     * Dismisses the dynamic component and passes the argument to the afterClosed observable as an error.
     * @param reason Value passed back to the observable as an error.
     */
    dismiss(reason?: any): void {
        this._afterClosed.next(reason);
    }
}
