import { Observable, Subject } from 'rxjs';
import deprecated from "deprecated-decorator";

/**
 * @deprecated
 * Alert component is deprecated since version 0.16.0
 * Message Strip component should be used instead.
 *
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
@deprecated({
    version: '0.16.0',
    alternative: 'Message Strip component'
})
export class AlertRef {
    /** @hidden */
    private readonly _afterDismissed: Subject<any> = new Subject<any>();

    /** Observable that is triggered when the alert is dismissed. */
    public afterDismissed: Observable<any> = this._afterDismissed.asObservable();

    /** Data passed from the service open method. */
    public data: any;

    /**
     * Dismisses the alert.
     *
     * @param reason Data passed back to the calling component through the AfterDismissed observable.
     */
    dismiss(reason?: any): void {
        this._afterDismissed.next(reason);
    }
}
