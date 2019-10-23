import { Component } from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-notification-open-template-example',
    templateUrl: './notification-open-template-example.component.html',
    styles: ['.action-button {margin-left: 12px;}']
})
export class NotificationOpenTemplateExampleComponent {

    public closeReason: string;

    constructor(private notificationService: NotificationService) {}

    open(notificationComponent): void {
        const notificationRef = this.notificationService.open(notificationComponent, {
            size: 's',
            type: 'warning',
        });

        notificationRef.afterClosed.subscribe(result => {
            this.closeReason = 'Notification closed with result: ' + result;
        }, error => {
            this.closeReason = 'Notification dismissed with result: ' + error;
        });
    }

}
