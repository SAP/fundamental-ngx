import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationFooterContent], [fd-notification-footer-content]',
    standalone: true
})
export class NotificationFooterContentDirective {
    /** @ignore */
    @HostBinding('class.fd-notification__footer-content')
    fdNotificationTitleClass = true;
}
