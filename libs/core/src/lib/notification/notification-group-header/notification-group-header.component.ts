import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-notification-group-header',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationGroupHeaderComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__group-header')
    fdNotificationGroupHeaderClass = true;
}
