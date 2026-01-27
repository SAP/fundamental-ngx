import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, signal } from '@angular/core';
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

        const notificationService = this.notificationService.open(NotificationExampleContentComponent, {
            data: {
                title: 'This is a very long notification title that will be truncated after two lines to keep the notification compact and readable in the list view',
                paragraph:
                    'This is a very long notification paragraph with multiple sentences. It contains important information that the user should read. The text will be truncated after two lines by default, but the user can click "Show More" to expand and read the full content.',
                firstFooterContent: 'SAP Analytics Cloud',
                secondFooterContent: 'Just Now',
                showTrigger: this.showTrigger,
                isExpanded: this.isExpanded
            },
            width: '500px'
        });

        // Check for truncation after notification renders
        setTimeout(() => this.checkTruncation(), 100);

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

    private checkTruncation(): void {
        // Query for the elements using unique identifiers
        const titleEl = document.querySelector('.fd-notification__title') as HTMLElement;
        const paragraphEl = document.querySelector('.fd-notification__paragraph') as HTMLElement;

        if (titleEl || paragraphEl) {
            const titleTruncated = titleEl ? titleEl.scrollHeight > titleEl.clientHeight : false;
            const paragraphTruncated = paragraphEl ? paragraphEl.scrollHeight > paragraphEl.clientHeight : false;

            this.isTruncated.set(titleTruncated || paragraphTruncated);
        }
    }
}
