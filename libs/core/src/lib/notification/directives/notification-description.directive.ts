import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationDescription], [fd-notification-description]'
})
export class NotificationDescriptionDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__description')
    fdNotificationDescriptionClass: boolean = true;
}
