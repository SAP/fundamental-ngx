import { ComponentPortal } from '@angular/cdk/portal';
import { MessageStripAlertComponent } from './message-strip-alert/message-strip-alert.component';
import { Observable } from 'rxjs';

export abstract class MessageStripAlertRef<ComponentType = unknown> {
    /** Message strip alert component portal which is rendered in the container */
    abstract portal: ComponentPortal<MessageStripAlertComponent<ComponentType>>;
    /**
     * Function, which dismisses the alert, it calls the user-provided function
     * after dismissing the actual alert
     */
    abstract dismiss: () => void;
    /** Observable that emits when the alert is dismissed */
    abstract onDismiss$: Observable<void>;
}
