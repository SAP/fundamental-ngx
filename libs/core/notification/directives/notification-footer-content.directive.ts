import { Directive } from '@angular/core';

@Directive({
    selector: '[fdNotificationFooterContent], [fd-notification-footer-content]',
    standalone: true,
    host: {
        class: 'fd-notification__footer-content'
    }
})
export class NotificationFooterContentDirective {}
