import { ContentChildren, Directive, HostBinding, QueryList } from '@angular/core';
import { ButtonComponent, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-notification-actions',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NotificationActionsComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__actions')
    fdNotificationActionsClass = true;

    /** @hidden */
    @ContentChildren(FD_BUTTON_COMPONENT)
    buttons: QueryList<ButtonComponent>;
}
