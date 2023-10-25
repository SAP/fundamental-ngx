import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationParagraph], [fd-notification-paragraph]',
    standalone: true
})
export class NotificationParagraphDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__paragraph')
    fdNotificationParagraphClass = true;
}
