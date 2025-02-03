import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import { NotificationModule, NotificationRef } from '@fundamental-ngx/core/notification';

@Component({
    selector: 'fd-notification-example-content',
    templateUrl: './notification-content.component.html',
    imports: [MessageStripComponent, NotificationModule, ButtonComponent]
})
export class NotificationExampleContentComponent {
    constructor(public notificationRef: NotificationRef) {}
}
