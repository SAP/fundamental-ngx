import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core/notification';

@Component({
    selector: 'fd-notification-open-template-example',
    templateUrl: './notification-open-template-example.component.html',
    styles: ['.action-button {margin-left: 12px;}']
})
export class NotificationOpenTemplateExampleComponent {
    @ViewChild('notificationTemplate') notificationTemplate: TemplateRef<unknown>;
    public closeReason: string;

    constructor(private notificationService: NotificationService) {}

    open(): void {
        const notificationRef = this.notificationService.open(this.notificationTemplate);
        setTimeout(() => notificationRef.dismiss('dismissed'), 4000);
        notificationRef.afterClosed.subscribe(
            (result) => {
                this.closeReason = 'Notification closed with result: ' + result;
            },
            (error) => {
                this.closeReason = 'Notification dismissed with result: ' + error;
            }
        );
    }
}
