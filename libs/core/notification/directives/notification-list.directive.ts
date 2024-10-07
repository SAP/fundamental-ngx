import { Directive, input } from '@angular/core';

@Directive({
    selector: '[fdNotificationList], [fd-notification-list]',
    standalone: true,
    host: {
        class: 'fd-notification-list',
        role: 'list',
        '[attr.aria-label]': 'ariaLabel()'
    }
})
export class NotificationListDirective {
    /**
     * aria-label attribute for the element
     * Default is set to 'Notifications'
     */
    ariaLabel = input('Notifications');
}
