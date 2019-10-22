import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationTitle], [fd-notification-title]'
})
export class NotificationTitleDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__title')
    fdNotificationTitleClass: boolean = true;
}
