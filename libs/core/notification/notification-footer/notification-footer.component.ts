import { Directive, HostBinding } from '@angular/core';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-notification-footer',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NotificationFooterComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__footer')
    fdNotificationFooterClass = true;
}
