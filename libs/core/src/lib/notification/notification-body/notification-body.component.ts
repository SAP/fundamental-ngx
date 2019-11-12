import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-notification-body',
    templateUrl: './notification-body.component.html',
    styleUrls: ['./notification-body.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBodyComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__body')
    fdNotificationHeaderBody: boolean = true;
}
