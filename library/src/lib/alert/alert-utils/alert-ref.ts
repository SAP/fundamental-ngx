import { Observable, Subject } from 'rxjs';

/**
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
export class AlertRef {
    
    private readonly _afterDismissed: Subject<undefined> = new Subject<undefined>();

    /** Observable that is triggered when the alert is dismissed. */
    public afterDismissed: Observable<undefined> = this._afterDismissed.asObservable();

    /** Data passed from the service open method. */
    public data: any;

    /**
     * Dismisses the alert.
     */
    dismiss(): void {
        this._afterDismissed.next();
    }
}
