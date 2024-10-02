import { Directive } from '@angular/core';

@Directive({
    selector: '[fdNotificationMessageStripContainer], [fd-notification-message-strip-container]',
    standalone: true,
    host: {
        class: 'fd-notification__message-strip-container'
    }
})
export class NotificationMessageStripContainerDirective {}
