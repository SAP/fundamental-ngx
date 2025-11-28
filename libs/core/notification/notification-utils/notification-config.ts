import { Nullable } from '@fundamental-ngx/cdk/utils';

/**
 * Configuration for opening a notification with the NotificationService.
 */
export class NotificationConfig<T = any> {
    /** Id for the notification component. If omitted, a unique one is generated. */
    id?: string;

    /** aria-label attribute for the notification component element. */
    ariaLabel?: Nullable<string>;

    /** aria-labelledby attribute for the notification component element. */
    ariaLabelledBy?: Nullable<string>;

    /** aria-describedby attribute for the notification component element. */
    ariaDescribedBy?: Nullable<string>;

    /** The container that the notification is appended to. By default, it is appended to the body. */
    container?: HTMLElement | 'body' = 'body';

    /** Data to pass along to the content through the NotificationRef. */
    data?: T;

    /** Custom width of the notification. */
    width?: string;

    /**
     * Whether the notification should trap focus within itself.
     * @default true
     */
    shouldTrapFocus?: boolean = true;

    /** Whether to dismiss the notification on router navigation start. */
    closeOnNavigation?: boolean = true;
}
