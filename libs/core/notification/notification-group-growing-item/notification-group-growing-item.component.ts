import { Component } from '@angular/core';

@Component({
    selector: 'fd-notification-group-growing-item',
    standalone: true,
    template: `<ng-content select="[fd-notification-group-growing-item-title]"></ng-content> <ng-content></ng-content>`,
    host: {
        class: 'fd-notification-group__growing-item',
        role: 'button',
        '[tabindex]': '0'
    }
})
export class NotificationGroupGrowingItemComponent {}
