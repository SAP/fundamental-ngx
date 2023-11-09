import { Directive, HostBinding, Input } from '@angular/core';

let notificationHeaderCounter = 0;
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-notification-header',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NotificationHeaderComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__header')
    fdNotificationHeaderClass = true;

    /** Unique id for the notification header */
    @HostBinding('attr.id')
    @Input()
    uniqueId = `fd-notification-header-${++notificationHeaderCounter}`;
}
