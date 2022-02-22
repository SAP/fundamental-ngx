import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

let notificationHeaderCounter = 0;
@Component({
    selector: 'fd-notification-header',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationHeaderComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__header')
    fdNotificationHeaderClass = true;

    /** Unique id for the notification header */
    @HostBinding('attr.id')
    @Input()
    uniqueId = `fd-notification-header-${++notificationHeaderCounter}`;
}
