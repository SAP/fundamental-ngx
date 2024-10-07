import { Directive } from '@angular/core';

@Directive({
    selector: '[fdNotificationGroupGrowingItemTitle], [fd-notification-group-growing-item-title]',
    standalone: true,
    host: {
        class: 'fd-notification-group__growing-item-title'
    }
})
export class NotificationGroupGrowingItemTitleDirective {}
