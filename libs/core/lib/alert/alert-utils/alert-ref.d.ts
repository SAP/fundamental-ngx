import { Observable } from 'rxjs';
/**
 * Reference to an alert component generated via the AlertService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-alert to your ng-template tag. Now using *alert* in the template refers to this class.
 */
export declare class AlertRef {
    private readonly _afterDismissed;
    /** Observable that is triggered when the alert is dismissed. */
    afterDismissed: Observable<any>;
    /** Data passed from the service open method. */
    data: any;
    /**
     * Dismisses the alert.
     *
     * @param reason Data passed back to the calling component through the AfterDismissed observable.
     */
    dismiss(reason?: any): void;
}
