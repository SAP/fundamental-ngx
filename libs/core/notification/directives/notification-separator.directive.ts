import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationSeparator], [fd-notification-separator]',
    standalone: true
})
export class NotificationSeparatorDirective {
    /** @ignore */
    @HostBinding('class.fd-notification__separator')
    fdNotificationSeparatorClass = true;
}
