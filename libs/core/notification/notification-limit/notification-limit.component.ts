import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-notification-limit',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotificationLimitComponent {
    /** @ignore */
    @HostBinding('class.fd-notification__limit')
    fdNotificationLimitClass = true;
}
