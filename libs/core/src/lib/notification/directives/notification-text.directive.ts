import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[fdNotificationText], [fd-notification-text]'
})
export class NotificationTextDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__text')
    fdNotificationTextClass: boolean = true;
}
