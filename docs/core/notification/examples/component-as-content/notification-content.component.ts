import { Component } from '@angular/core';
import { NotificationRef } from '@fundamental-ngx/core/notification';

@Component({
    selector: 'fd-notification-example-content',
    templateUrl: './notification-content.component.html'
})
export class NotificationExampleContentComponent {
    constructor(public notificationRef: NotificationRef) {}
}
