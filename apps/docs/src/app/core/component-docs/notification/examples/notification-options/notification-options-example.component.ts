import {
    Component,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core';
import { NotificationOptionsContentComponent } from './notification-options-content.component';


@Component({
    selector: 'fd-notification-options-example',
    templateUrl: './notification-options-example.component.html',
    styleUrls: ['./notification-options-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        NotificationService
    ]
})
export class NotificationOptionsExampleComponent {

    @ViewChild('vc', { read: ViewContainerRef })
    ref: ViewContainerRef;

    data = {
        title: 'Notification Title',
        description: 'Notification Description',
        metadata: 'Other Data',
        moreInfo: 'More Info',
        approve: 'Approve',
        cancel: 'Cancel',
    };

    constructor (
        private notificationService: NotificationService,
    ) {}

    openNotifications() {

        this.ref.clear();

        this.notificationService.open(NotificationOptionsContentComponent, {
            size: 's',
            type: 'success',
            data: this.data,
            container: this.ref.element.nativeElement
        });

        this.notificationService.open(NotificationOptionsContentComponent, {
            size: 'm',
            type: 'success',
            data: this.data,
            container: this.ref.element.nativeElement
        });

        this.notificationService.open(NotificationOptionsContentComponent, {
            type: 'success',
            data: this.data,
            container: this.ref.element.nativeElement
        });

        this.notificationService.open(NotificationOptionsContentComponent, {
            type: 'warning',
            data: this.data,
            container: this.ref.element.nativeElement
        });

        this.notificationService.open(NotificationOptionsContentComponent, {
            type: 'error',
            data: this.data,
            container: this.ref.element.nativeElement
        });

        this.notificationService.open(NotificationOptionsContentComponent, {
            type: 'information',
            data: this.data,
            container: this.ref.element.nativeElement
        });
    }


}
