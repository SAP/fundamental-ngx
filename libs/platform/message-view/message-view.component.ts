import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    OnDestroy,
    ViewEncapsulation,
    booleanAttribute,
    inject,
    input
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { DialogRef, DialogService } from '@fundamental-ngx/core/dialog';
import { MessageListShared, MessagePopoverErrorGroup } from '@fundamental-ngx/platform/messages-shared';
import { MessageViewDialogComponent } from './components/message-view-dialog.component';

@Component({
    selector: 'fdp-message-view',
    template: ``,
    styleUrl: './message-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageViewComponent extends MessageListShared implements OnDestroy {
    /**
     * Messages to display in the message view.
     */
    readonly messages = input<MessagePopoverErrorGroup[]>([]);

    /**
     * Title to display in the message view dialog header.
     */
    readonly title = input<string>('');

    /**
     * Title to display in the message view dialog header when viewing message details.
     */
    readonly detailsTitle = input<string>('');

    /**
     * Whether the message view dialog should be opened in mobile mode.
     */
    readonly mobile = input(false, { transform: booleanAttribute });

    /**
     * Width of the dialog when not in mobile mode.
     * @default '24rem'
     */
    readonly width = input<string>('24rem');

    /**
     * Height of the dialog when not in mobile mode.
     * @default 'auto'
     */
    readonly height = input<string>('auto');

    /**
     * Whether the dialog should be resizable when not in mobile mode.
     * @default true
     */
    readonly resizable = input(true, { transform: booleanAttribute });

    /** @hidden */
    protected readonly dialogService = inject(DialogService);

    /** @hidden */
    protected readonly injector = inject(Injector);

    /** @hidden */
    protected dialogRef: Nullable<DialogRef>;

    /** @hidden */
    protected override readonly groupedErrors$ = this.messages;

    /** Opens the dialog. */
    open(): void {
        // Reset to list view when opening the dialog
        this.showList();

        const dialogConfig = this.mobile()
            ? {
                  focusTrapped: true,
                  disablePaddings: true,
                  mobile: true
              }
            : {
                  focusTrapped: true,
                  disablePaddings: true,
                  width: this.width(),
                  height: this.height(),
                  resizable: this.resizable()
              };
        this.dialogRef = this.dialogService.open(MessageViewDialogComponent, dialogConfig, this.injector);
    }

    /** Closes the dialog. */
    close(): void {
        this.dialogRef?.close();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.close();
    }
}
