/**
 * Configuration for opening a notification with the NotificationService.
 */
export class NotificationConfig {
    /** Id for the notification component. If omitted, a unique one is generated. */
    id?: string;

    /** Aria label for the notification component element. */
    ariaLabel?: string = null;

    /** Id of the element that labels the notification. */
    ariaLabelledBy?: string = null;

    /** Id of the element that describes the notification. */
    ariaDescribedBy?: string = null;

    /** The container that the notification is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';

    /** Data to pass along to the content through the NotificationRef. */
    data?: any;

    /** Custom width of the notification. */
    width?: string;
}
