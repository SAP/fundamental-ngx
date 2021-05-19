import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdNotificationLimitDescription], [fd-notification-limit-description]'
})
export class NotificationLimitDescriptionDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__limit--description')
    fdNotificationDescriptionClass = true;
}
