import { Directive } from '@angular/core';

@Directive({
    selector: '[fdNotificationPopover], [fd-notification-popover]',
    standalone: true,
    host: {
        class: 'fd-notification-popover',
        role: 'dialog'
    }
})
export class NotificationPopoverDirective {}
