import { Directive, HostBinding } from '@angular/core';
import { NotificationGroupBaseDirective } from '../notification-utils/notification-group-base';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-notification-body',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NotificationBodyComponent extends NotificationGroupBaseDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__body')
    fdNotificationBodyClass = true;
}
