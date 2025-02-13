import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    contentChildren,
    input
} from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { FD_NOTIFICATION, FD_NOTIFICATION_GROUP_LIST } from '../token';

let notificationGroupListCounter = 0;

@Component({
    selector: 'fd-notification-group-list',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'fd-notification-group__list',
        role: 'list',
        '[attr.id]': 'id()'
    },
    providers: [
        {
            provide: FD_NOTIFICATION_GROUP_LIST,
            useExisting: NotificationGroupListComponent
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: []
})
export class NotificationGroupListComponent implements AfterViewInit {
    /**
     * id of the element labelling the group list
     */
    ariaLabelledBy = input<string>();

    /**
     * id for the notification group list
     * if not set, a default value is provided
     */
    id = input('fd-notification-group-list-' + ++notificationGroupListCounter);

    /**
     * @hidden
     */
    notifications = contentChildren<NotificationComponent>(FD_NOTIFICATION);

    /**
     * @hidden
     */
    ngAfterViewInit(): void {
        this.notifications()?.forEach((notification) => {
            notification.role.set('listitem');
            notification.ariaLevel.set(2);
        });
    }
}
