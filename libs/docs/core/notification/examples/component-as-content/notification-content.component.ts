import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { NotificationModule, NotificationRef } from '@fundamental-ngx/core/notification';

@Component({
    selector: 'fd-notification-example-content',
    templateUrl: './notification-content.component.html',
    standalone: true,
    imports: [MessageStripComponent, NotificationModule, ButtonModule]
})
export class NotificationExampleContentComponent {
    constructor(public notificationRef: NotificationRef) {}
}
