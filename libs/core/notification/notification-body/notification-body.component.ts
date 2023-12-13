import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { NotificationGroupBaseDirective } from '../notification-utils/notification-group-base';

@Component({
    selector: 'fd-notification-body',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotificationBodyComponent extends NotificationGroupBaseDirective {
    /** @ignore */
    @HostBinding('class.fd-notification__body')
    fdNotificationBodyClass = true;
}
