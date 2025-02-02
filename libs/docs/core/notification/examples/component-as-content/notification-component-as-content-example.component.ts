import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { NotificationService } from '@fundamental-ngx/core/notification';
import { NotificationExampleContentComponent } from './notification-content.component';

@Component({
    selector: 'fd-notification-component-as-content-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <button fd-button label="Open from Component" (click)="open()"></button>
        <span [style.margin-left.px]="24">{{ closeReason }}</span>
    `,
    imports: [ButtonComponent],
    providers: [NotificationService]
})
export class NotificationComponentAsContentExampleComponent {
    public closeReason: string;

    constructor(
        private notificationService: NotificationService,
        private _cdr: ChangeDetectorRef
    ) {}

    open(): void {
        const notificationService = this.notificationService.open(NotificationExampleContentComponent, {
            data: {
                title: 'Notification Title',
                paragraph: 'Notification Description',
                firstFooterContent: 'SAP Analytics Cloud',
                secondFooterContent: 'Just Now'
            },
            width: '500px'
        });

        notificationService.afterClosed.subscribe(
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
