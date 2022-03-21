import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ToastTextComponent } from '@fundamental-ngx/fn/cdk';
import { NotificationConfig } from '../../config/notification-config';
import { NOTIFICATION_DATA } from '../../constants/notification-data.token';
import { NotificationRef } from '../../ref/notification-ref';

@Component({
    selector: 'fn-notification-text',
    templateUrl: './notification-text.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NotificationTextComponent implements ToastTextComponent {
    message: string;

    constructor(
        public toastRef: NotificationRef<NotificationTextComponent>,
        @Inject(NOTIFICATION_DATA) public config: NotificationConfig
    ) {
        this.message = this.config.message;
    }
}
