import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    TemplateRef,
    ViewChild,
    computed,
    signal
} from '@angular/core';
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

    // Manual control signals for Show More/Show Less
    protected readonly isExpanded = signal(false);
    protected readonly isTruncated = signal(false);
    protected readonly showTrigger = computed(() => this.isTruncated() || this.isExpanded());

    constructor(
        private notificationService: NotificationService,
        private _cdr: ChangeDetectorRef
    ) {}

    open(): void {
        this.isExpanded.set(false);
        this.isTruncated.set(false);

        const notificationRef = this.notificationService.open(this.notificationTemplate, {
            width: '450px',
            closeOnNavigation: false
        });

        // Check for truncation after notification renders
        setTimeout(() => this.checkTruncation(), 100);

        setTimeout(() => notificationRef.dismiss('dismissed'), 6000);
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

    private checkTruncation(): void {
        // Query for the elements using class selectors
        const titleEl = document.querySelector('.fd-notification__title') as HTMLElement;
        const paragraphEl = document.querySelector('.fd-notification__paragraph') as HTMLElement;

        if (titleEl || paragraphEl) {
            const titleTruncated = titleEl ? titleEl.scrollHeight > titleEl.clientHeight : false;
            const paragraphTruncated = paragraphEl ? paragraphEl.scrollHeight > paragraphEl.clientHeight : false;

            this.isTruncated.set(titleTruncated || paragraphTruncated);
        }
    }
}
