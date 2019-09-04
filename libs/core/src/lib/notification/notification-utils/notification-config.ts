/**
 * Configuration for opening a notification with the NotificationService.
 */
import { NotificationSize, NotificationType } from '../notification/notification.component';

export class NotificationConfig {

    /** Id for the modal component. If omitted, a unique one is generated. */
    id?: string;

    /** size of notification: 's' | 'm' */
    size?: NotificationSize;

    /** Type of notification: 'success' | 'warning' | 'information' | 'error' */
    type?: NotificationType;

    /** Aria label for the modal component element. */
    ariaLabel?: string = null;

    /** Id of the element that labels the modal. */
    ariaLabelledBy?: string = null;

    /** Id of the element that describes the modal. */
    ariaDescribedBy?: string = null;

    /** The container that the notification is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';

    /** Data to pass along to the content through the NotificationRef. */
    data?: any;
}
