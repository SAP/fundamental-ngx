import { Component } from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core/notification';
import { NotificationExampleContentComponent } from './notification-content.component';

@Component({
    selector: 'fd-notification-component-as-content-example',
    template: `
        <button fd-button label="Open from Component" (click)="open()"></button>
        <span style="margin-left: 24px;">{{ closeReason }}</span>
    `
})
export class NotificationComponentAsContentExampleComponent {
    public closeReason: string;

    constructor(private notificationService: NotificationService) {}

    open(): void {
        const notificationService = this.notificationService.open(NotificationExampleContentComponent, {
            data: {
                title: 'Notification Title',
                paragraph: 'Notification Description',
                firstFooterContent: 'SAP Analytics Cloud',
                secondFooterContent: 'Just Now',
                open: 'Open'
            },
            width: '500px'
        });

        notificationService.afterClosed.subscribe(
            (result) => {
                this.closeReason = 'Notification closed with result: ' + result;
            },
            (error) => {
                this.closeReason = 'Notification dismissed with result: ' + error;
            }
        );
    }
}
