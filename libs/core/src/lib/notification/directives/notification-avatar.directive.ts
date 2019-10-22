import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationAvatar], [fd-notification-avatar]'
})
export class NotificationAvatarDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__avatar')
    fdNotificationAvatarClass: boolean = true;
}
