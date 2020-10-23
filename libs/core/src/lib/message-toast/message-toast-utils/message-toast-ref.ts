import { Observable, Subject } from 'rxjs';
/**
 * Reference to a message toast component generated via the MessageToastService.
 * It can be injected into the content component in the same way a service would be injected.
 * For a template, add let-messageToast to your ng-template tag. Now using *messageToast* in the template refers to this class.
 */
export class MessageToastRef {
    private readonly _afterTimeout: Subject<any> = new Subject<any>();

    /** Observable that is triggered when the message toast has timed out. */
    afterTimeout: Observable<any> = this._afterTimeout.asObservable();

    /** Data passed from the service open method. */
    data: any;

    /**
     * Hides the message toast.
     */
    timeout(): void {
        this._afterTimeout.next();
    }
}
