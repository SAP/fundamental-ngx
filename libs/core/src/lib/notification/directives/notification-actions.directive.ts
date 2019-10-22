import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[fdNotificationActions], [fd-notification-actions]'
})
export class NotificationActionsDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__actions')
    fdNotificationMetaDataClass: boolean = true;
}
