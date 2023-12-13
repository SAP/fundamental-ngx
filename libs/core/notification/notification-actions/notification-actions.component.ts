import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-notification-actions',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class NotificationActionsComponent {
    /** @ignore */
    @HostBinding('class.fd-notification__actions')
    fdNotificationActionsClass = true;

    /** @ignore */
    @ContentChildren(FD_BUTTON_COMPONENT)
    buttons: QueryList<ButtonComponent>;
}
