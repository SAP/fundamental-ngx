import { Directive, ElementRef, inject, input } from '@angular/core';
import { FD_NOTIFICATION_PARAGRAPH } from '../token';

let notificationParagraphCounter = 0;

@Directive({
    selector: '[fdNotificationParagraph], [fd-notification-paragraph]',
    standalone: true,
    host: {
        class: 'fd-notification__paragraph',
        '[attr.id]': 'id()'
    },
    providers: [
        {
            provide: FD_NOTIFICATION_PARAGRAPH,
            useExisting: NotificationParagraphDirective
        }
    ]
})
export class NotificationParagraphDirective {
    /**
     * id for the notification paragraph
     * if not set, a default value is provided
     */
    id = input('fd-notification-paragraph-' + ++notificationParagraphCounter);

    /** @hidden */
    elementRef = inject(ElementRef);
}
