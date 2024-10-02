import { ChangeDetectionStrategy, Component, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { ButtonComponent, FD_BUTTON_COMPONENT } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-notification-actions',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        class: 'fd-notification__actions'
    }
})
export class NotificationActionsComponent {
    /** @hidden */
    @ContentChildren(FD_BUTTON_COMPONENT)
    buttons: QueryList<ButtonComponent>;
}
