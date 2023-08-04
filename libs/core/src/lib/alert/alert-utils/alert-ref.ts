import { Observable, Subject } from 'rxjs';

/**
 * @deprecated
 * Alert component is deprecated since version 0.16.0
 * Message Strip component should be used instead.
 *
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
export class AlertRef {
    /** Observable that is triggered when the alert is dismissed. */
    afterDismissed: Observable<any>;

    /** Data passed from the service open method. */
    data: any;

    /** @hidden */
    private readonly _afterDismissed: Subject<any> = new Subject<any>();

    /** @hidden */
    constructor() {
        console.warn(
            'AlertRef is deprecated since version 0.16.0 and will be removed in next release. Use Message Strip instead.'
        );
        this.afterDismissed = this._afterDismissed.asObservable();
    }

    /**
     * Dismisses the alert.
     *
     * @param reason Data passed back to the calling component through the AfterDismissed observable.
     */
    dismiss(reason?: any): void {
        this._afterDismissed.next(reason);
    }
}
