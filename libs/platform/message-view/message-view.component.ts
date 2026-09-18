import { BooleanInput } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    Component,
    Injector,
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
export class MessageViewComponent extends MessageListShared {
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
    readonly mobile = input<boolean, BooleanInput>(false, { transform: booleanAttribute });

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
        this.dialogRef = this.dialogService.open(
            MessageViewDialogComponent,
            {
                focusTrapped: true,
                responsivePadding: false,
                disablePaddings: true,
                width: '24rem',
                height: 'auto',
                mobile: this.mobile()
            },
            this.injector
        );
    }

    /** Closes the dialog. */
    close(): void {
        this.dialogRef?.close();
    }
}
