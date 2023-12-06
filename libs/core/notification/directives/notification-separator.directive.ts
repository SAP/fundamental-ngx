import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationSeparator], [fd-notification-separator]',
    standalone: true
})
export class NotificationSeparatorDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__separator')
    fdNotificationSeparatorClass = true;
}
