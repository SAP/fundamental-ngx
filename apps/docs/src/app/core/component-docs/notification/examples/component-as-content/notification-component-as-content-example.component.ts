import { Component } from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core';
import { NotificationContentComponent } from './notification-content.component';

@Component({
    selector: 'fd-notification-component-as-content-example',
    template: `        
        <button fd-button (click)="open()">Open from Component</button>
        <span style="margin-left: 24px;">{{closeReason}}</span>
    `
})
export class NotificationComponentAsContentExampleComponent {

    public closeReason: string;


    constructor (
        private notificationService: NotificationService
    ) {}

    open() {
        const notificationService = this.notificationService.open(NotificationContentComponent, {
            data: {
                title: 'Notification Title',
                description: 'Notification Description',
                metadata: 'Other Data',
                moreInfo: 'More Info',
                approve: 'Approve',
                cancel: 'Cancel',
                type: 'success'
            },
            size: 'm',
            type: 'success'
        });

        notificationService.afterClosed.subscribe(result => {
            this.closeReason = 'Notification closed with result: ' + result;
        }, error => {
            this.closeReason = 'Notification dismissed with result: ' + error;
        });
    }
}
