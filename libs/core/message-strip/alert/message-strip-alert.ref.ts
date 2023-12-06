import { ComponentPortal } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { MessageStripAlert } from './message-strip-alert/message-strip-alert.interface';

export abstract class MessageStripAlertRef {
    /** Message strip alert component portal which is rendered in the container */
    abstract portal: ComponentPortal<MessageStripAlert>;
    /**
     * Function, which dismisses the alert, it calls the user-provided function
     * after dismissing the actual alert
     */
    abstract dismiss: () => void;
    /** Observable that emits when the alert is dismissed */
    abstract onDismiss$: Observable<void>;
}
