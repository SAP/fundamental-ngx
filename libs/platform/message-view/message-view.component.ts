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
import { MessagePopoverErrorGroup } from '@fundamental-ngx/platform/messages-shared';
import { MessageListShared } from '@fundamental-ngx/platform/shared';
import { MessageViewDialogComponent } from './components/message-view-dialog.component';

@Component({
    selector: 'fdp-message-view',
    template: ``,
    styleUrl: './message-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
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
    protected readonly _dialogService = inject(DialogService);

    /** @hidden */
    protected readonly _injector = inject(Injector);

    /** @hidden */
    protected _dialogRef: Nullable<DialogRef>;

    /** @hidden */
    protected override readonly _groupedErrors$ = this.messages;

    /** @hidden */
    _closeDialog(): void {
        this._dialogRef?.close();
    }

    /** Opens the dialog. */
    open(): void {
        this._dialogRef = this._dialogService.open(
            MessageViewDialogComponent,
            {
                focusTrapped: true,
                responsivePadding: false,
                disablePaddings: true,
                width: '24rem',
                height: 'auto',
                mobile: this.mobile()
            },
            this._injector
        );
    }

    /** Closes the dialog. */
    close(): void {
        this._dialogRef?.close();
    }
}
