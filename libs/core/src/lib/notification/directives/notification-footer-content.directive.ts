import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationFooterContent], [fd-notification-footer-content]'
})
export class NotificationFooterContentDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__footer-content')
    fdNotificationTitleClass = true;
}
