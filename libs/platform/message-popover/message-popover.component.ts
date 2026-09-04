import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialFocusDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { PopoverComponent, PopoverModule } from '@fundamental-ngx/core/popover';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MessagePopoverWrapper, MessagesListComponent } from '@fundamental-ngx/platform/messages-shared';
import { MessageListShared } from '@fundamental-ngx/platform/shared';

@Component({
    selector: 'fdp-message-popover',
    templateUrl: './message-popover.component.html',
    styleUrl: './message-popover.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        PopoverModule,
        ButtonComponent,
        NgClass,
        BarModule,
        SegmentedButtonComponent,
        FormsModule,
        ObjectStatusComponent,
        InitialFocusDirective,
        MessagesListComponent,
        FdTranslatePipe
    ]
})
export class MessagePopoverComponent extends MessageListShared {
    /** @hidden */
    @ViewChild('popover')
    readonly _popover: PopoverComponent;

    /** Message Popover Wrapper component. */
    @Input()
    set wrapper(value: Nullable<MessagePopoverWrapper>) {
        value?.setMessagePopover(this);
        this._wrapper$.set(value);
    }
    get wrapper(): Nullable<MessagePopoverWrapper> {
        return this._wrapper$();
    }

    /** @hidden */
    _closePopover(focusLast = true): void {
        this._popover.close(focusLast);
    }
}
