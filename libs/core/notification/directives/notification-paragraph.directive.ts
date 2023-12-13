import { Directive, HostBinding } from '@angular/core';

@Directive({
    selector: '[fdNotificationParagraph], [fd-notification-paragraph]',
    standalone: true
})
export class NotificationParagraphDirective {
    /** @ignore */
    @HostBinding('class.fd-notification__paragraph')
    fdNotificationParagraphClass = true;
}
