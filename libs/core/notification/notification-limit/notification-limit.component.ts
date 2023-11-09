import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-notification-limit',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NotificationLimitComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__limit')
    fdNotificationLimitClass = true;
}
