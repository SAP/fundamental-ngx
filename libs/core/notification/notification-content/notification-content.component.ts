import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-notification-content',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NotificationContentComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__content')
    fdNotificationFooterClass = true;
}
