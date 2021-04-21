/**
 * Configuration for opening a notification with the NotificationService.
 */
export class NotificationConfig {
    /** Id for the notification component. If omitted, a unique one is generated. */
    id?: string;

    /** aria-label attribute for the notification component element. */
    ariaLabel?: string = null;

    /** aria-labelledby attribute for the notification component element. */
    ariaLabelledBy?: string = null;

    /** aria-describedby attribute for the notification component element. */
    ariaDescribedBy?: string = null;

    /** The container that the notification is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';

    /** Data to pass along to the content through the NotificationRef. */
    data?: any;

    /** Custom width of the notification. */
    width?: string;

    /** Whether the notification is in mobile mode. */
    mobile?: boolean;
}
