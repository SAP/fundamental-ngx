import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    HostBinding,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

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
    @ContentChildren(ButtonComponent)
    buttons: QueryList<ButtonComponent>;
}
