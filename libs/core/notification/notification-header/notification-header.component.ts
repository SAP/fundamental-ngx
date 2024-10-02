import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

let notificationHeaderCounter = 0;

@Component({
    selector: 'fd-notification-header',
    template: `<ng-content select="fd-icon"></ng-content>
        <ng-content select="[fd-notification-title]"></ng-content> `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        class: 'fd-notification__header',
        '[attr.id]': 'uniqueId()'
    }
})
export class NotificationHeaderComponent {
    /**
     * Unique id for the notification header
     * if not set, a default value is provided
     */
    uniqueId = input('fd-notification-header-' + ++notificationHeaderCounter);
}
