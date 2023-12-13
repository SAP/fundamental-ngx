import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-notification-footer',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotificationFooterComponent {
    /** @ignore */
    @HostBinding('class.fd-notification__footer')
    fdNotificationFooterClass = true;
}
