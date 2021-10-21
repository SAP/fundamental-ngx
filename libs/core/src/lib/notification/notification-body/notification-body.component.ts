import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-notification-body',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBodyComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__body')
    fdNotificationBodyClass = true;
}
