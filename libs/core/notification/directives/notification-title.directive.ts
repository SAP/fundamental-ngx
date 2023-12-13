import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[fdNotificationTitle], [fd-notification-title]',
    standalone: true
})
export class NotificationTitleDirective {
    /** @ignore */
    @HostBinding('class.fd-notification__title')
    fdNotificationTitleClass = true;

    /** Whether the title is unread. */
    @Input()
    @HostBinding('class.fd-notification__title--unread')
    unread = false;
}
