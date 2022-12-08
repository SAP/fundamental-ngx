import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { NOTIFICATION_DATA, NotificationConfig, NotificationRef } from '@fundamental-ngx/fn/notification';
import { take } from 'rxjs/operators';
import { NotificationExampleData } from '../notification-default-example.component';

@Component({
    selector: 'fundamental-ngx-notification-with-component-example',
    templateUrl: './notification-with-component-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationWithComponentExampleComponent {
    constructor(
        public notificationRef: NotificationRef<any>,
        @Inject(NOTIFICATION_DATA) public notification: NotificationConfig<NotificationExampleData>
    ) {
        notificationRef
            .onAction()
            .pipe(take(1))
            .subscribe((result) => alert(`Notification dismissed with ${result}`));
    }
}
