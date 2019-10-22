import { Component, ComponentRef } from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core';
import { NotificationGroupComponent } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-notification-group-template-example',
    templateUrl: './notification-group-template-example.component.html'
})
export class NotificationGroupTemplateExampleComponent {

    public closeReason: string;

    constructor(private notificationService: NotificationService) {}

    public currentGroup: ComponentRef<NotificationGroupComponent>;

    newGroup(notificationComponent): void {
        this.currentGroup = this.notificationService.createNotificationGroup(null);
        const notifRef = this.notificationService.open(notificationComponent, {
            size: 's',
            type: 'warning'
        }, this.currentGroup);

        notifRef.afterClosedGroup.subscribe(result => {
            this.currentGroup = null;
            this.closeReason = 'Whole Group Closed ' + result
        }, error => {
            this.currentGroup = null;
            this.closeReason = 'Whole Group Dismissed ' + error
        });
    }

    addToGroup(notificationComponent): void {
        if (this.currentGroup) {
            const notificationRef = this.notificationService.open(notificationComponent, {
                size: 's',
                type: 'warning'
            }, this.currentGroup);

            notificationRef.afterClosed.subscribe(result => {
                this.closeReason = 'Notification closed with result: ' + result;
            }, error => {
                this.closeReason = 'Notification dismissed with result: ' + error;
            });
        }
    }

}
