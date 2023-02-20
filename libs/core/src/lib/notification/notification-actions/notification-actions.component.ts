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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationActionsComponent {
    /** @hidden */
    @HostBinding('class.fd-notification__actions')
    fdNotificationActionsClass = true;

    /** @hidden */
    @ContentChildren(FD_BUTTON_COMPONENT)
    buttons: QueryList<ButtonComponent>;
}
