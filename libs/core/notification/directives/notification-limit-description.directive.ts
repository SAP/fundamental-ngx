import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationLimitDescription], [fd-notification-limit-description]',
    standalone: true
})
export class NotificationLimitDescriptionDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__limit--description')
    fdNotificationDescriptionClass = true;
}
