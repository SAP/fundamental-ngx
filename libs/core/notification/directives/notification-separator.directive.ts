import { Directive } from '@angular/core';

@Directive({
    selector: '[fdNotificationSeparator], [fd-notification-separator]',
    standalone: true,
    host: {
        class: 'fd-notification__separator'
    }
})
export class NotificationSeparatorDirective {}
