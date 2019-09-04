import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-notification-component-as-object-example',
    template: `
        <ng-template #avatarRef>
            <span fd-identifier [size]="'s'" [circle]="true" aria-label="John Doe">JD</span>
        </ng-template>
        <button fd-button (click)="open()">Open from Object</button>
        <span style="margin-left: 24px;">{{closeReason}}</span>
    `
})
export class NotificationAsObjectExampleComponent {

    public closeReason: string;

    @ViewChild('avatarRef', {read: TemplateRef}) avatarRef: TemplateRef<any>;

    constructor (
        private notificationService: NotificationService
    ) {}

    open() {
        const notificationService = this.notificationService.open({
            title: 'Notification Title',
            description: 'Notification Description',
            metadata: 'Other Data',
            moreInfo: 'More Info',
            approve: 'Approve',
            cancel: 'Cancel',
            avatar: this.avatarRef,
            cancelCallback: () => {
                notificationService.close('Cancel Button')
            },
            closeButtonCallback: () => {
                notificationService.dismiss('Close Button')
            },
            approveCallback: () => {
                notificationService.close('Approve Button')
            }
        }, {
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
