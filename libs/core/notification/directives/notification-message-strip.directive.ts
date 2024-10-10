import { Directive } from '@angular/core';

@Directive({
    selector: '[fdNotificationMessageStrip], [fd-notification-message-strip]',
    standalone: true,
    host: {
        class: 'fd-notification-message-strip'
    }
})
export class NotificationMessageStripDirective {}
