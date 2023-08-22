import { Component } from '@angular/core';
import { NotificationRef } from '@fundamental-ngx/core/notification';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { NotificationModule } from '@fundamental-ngx/core/notification';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';

@Component({
    selector: 'fd-notification-example-content',
    templateUrl: './notification-content.component.html',
    standalone: true,
    imports: [MessageStripComponent, NotificationModule, ButtonModule]
})
export class NotificationExampleContentComponent {
    constructor(public notificationRef: NotificationRef) {}
}
