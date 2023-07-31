import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { NotificationService } from '@fundamental-ngx/core/notification';

@Component({
    selector: 'fd-notification-open-template-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './notification-open-template-example.component.html',
    styles: ['.action-button {margin-left: 12px;}']
})
export class NotificationOpenTemplateExampleComponent {
    @ViewChild('notificationTemplate') notificationTemplate: TemplateRef<unknown>;
    public closeReason: string;

    constructor(private notificationService: NotificationService, private _cdr: ChangeDetectorRef) {}

    open(): void {
        const notificationRef = this.notificationService.open(this.notificationTemplate);
        setTimeout(() => notificationRef.dismiss('dismissed'), 4000);
        notificationRef.afterClosed.subscribe(
            (result) => {
                this.closeReason = 'Notification closed with result: ' + result;
                this._cdr.detectChanges();
            },
            (error) => {
                this.closeReason = 'Notification dismissed with result: ' + error;
                this._cdr.detectChanges();
            }
        );
    }
}
