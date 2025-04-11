import { Directive, ElementRef, inject, input } from '@angular/core';
import { FD_NOTIFICATION_TITLE } from '../token';

let notificationTitleCounter = 0;

@Directive({
    selector: '[fdNotificationTitle], [fd-notification-title]',
    standalone: true,
    host: {
        class: 'fd-notification__title',
        '[class.fd-notification__title--unread]': 'unread()',
        '[attr.id]': 'id()'
    },
    providers: [
        {
            provide: FD_NOTIFICATION_TITLE,
            useExisting: NotificationTitleDirective
        }
    ]
})
export class NotificationTitleDirective {
    /**
     * Whether the notification title is unread.
     * default is false
     */
    unread = input(false);

    /**
     * id for the notification title
     * if not set, a default value is provided
     */
    id = input('fd-notification-title-' + ++notificationTitleCounter);

    /** @hidden */
    elementRef = inject(ElementRef);
}
