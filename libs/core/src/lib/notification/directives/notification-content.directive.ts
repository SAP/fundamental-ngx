import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationContent], [fd-notification-content]'
})
export class NotificationContentDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__content')
    fdNotificationContentClass: boolean = true;
}
