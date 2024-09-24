import { Directive, input } from '@angular/core';
import { FD_NOTIFICATION_GROUP_HEADER_TITLE } from '../token';

let notificationGroupHeaderTitleCounter = 0;

@Directive({
    selector: '[fdNotificationGroupHeaderTitle], [fd-notification-group-header-title]',
    standalone: true,
    host: {
        class: 'fd-notification-group__header-title',
        role: 'heading',
        '[attr.aria-level]': 'ariaLevel()',
        '[attr.id]': 'id()'
    },
    providers: [
        {
            provide: FD_NOTIFICATION_GROUP_HEADER_TITLE,
            useExisting: NotificationGroupHeaderTitleDirective
        }
    ]
})
export class NotificationGroupHeaderTitleDirective {
    /**
     * aria-level for the title
     * a numeric value from 1 to 6
     * default value is 3
     */
    ariaLevel = input<1 | 2 | 3 | 4 | 5 | 6>(3);

    /**
     * id for the notification group header title
     * if not set, a default value is provided
     */
    id = input('fd-notification-group-header-title-' + ++notificationGroupHeaderTitleCounter);
}
