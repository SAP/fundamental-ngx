import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdNotificationLimitTitle], [fd-notification-limit-title]'
})
export class NotificationLimitTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__limit--title')
    fdNotificationTitleClass = true;
}
