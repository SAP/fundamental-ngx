import { ChangeDetectionStrategy, ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { NotificationModule, NotificationService } from '@fundamental-ngx/core/notification';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';

@Component({
    selector: 'fd-notification-open-template-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './notification-open-template-example.component.html',
    imports: [ButtonComponent, NotificationModule, AvatarComponent, ObjectStatusComponent, IconComponent]
})
export class NotificationOpenTemplateExampleComponent {
    @ViewChild('notificationTemplate') notificationTemplate: TemplateRef<unknown>;
    public closeReason: string;

    constructor(
        private notificationService: NotificationService,
        private _cdr: ChangeDetectorRef
    ) {}

    open(): void {
        const notificationRef = this.notificationService.open(this.notificationTemplate, { width: '450px' });
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
