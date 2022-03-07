import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { NotificationGroupBaseDirective } from './../notification-utils/notification-group-base';

@Component({
    selector: 'fd-notification-body',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBodyComponent extends NotificationGroupBaseDirective {
    /** @hidden */
    @HostBinding('class.fd-notification__body')
    fdNotificationBodyClass = true;
}
