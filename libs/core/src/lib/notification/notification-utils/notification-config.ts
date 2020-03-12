/**
 * Configuration for opening a notification with the NotificationService.
 */
import { NotificationSize, NotificationType } from '../notification/notification.component';
import { InjectionToken } from '@angular/core';

export const NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<string[]>('NotificationConfig');

export class NotificationConfig {

    /** Id for the notification component. If omitted, a unique one is generated. */
    id?: string;

    /** size of notification: 's' | 'm' */
    size?: NotificationSize;

    /** Type of notification: 'success' | 'warning' | 'information' | 'error' */
    type?: NotificationType;

    /** Aria label for the notification component element. */
    ariaLabel?: string = null;

    /** Id of the element that labels the notification. */
    ariaLabelledBy?: string = null;

    /** The container that the notification is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';

    /** Data to pass along to the content through the NotificationRef. */
    data?: any;

    /** If Notification should be closable on Escape key */
    escKeyCloseable?: boolean = true;

    /** Notification custom class */
    notificationPanelClass?: string = '';

    // Features not yet implemented
    // /** If focus should be trapped inside Notification */
    // focusTrapped: boolean = true;

    // /** If Notification should be closable on backdrop click */
    // backdropClickCloseable: boolean = true;

    // /** If Notification has backdrop */
    // hasBackdrop: boolean = true;

    // /** Id of the element that describes the notification. */
    // ariaDescribedBy?: string = null;
}
