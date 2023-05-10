import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ToastTextComponent } from '@fundamental-ngx/cdk/utils';
import { MESSAGE_TOAST_DATA } from '../constants/message-toast.token';
import { MessageToastRef } from '../ref/message-toast.ref';

@Component({
    selector: 'fd-message-toast-text',
    template: `{{ message }}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class MessageToastTextComponent implements ToastTextComponent {
    /** @hidden */
    constructor(
        public toastRef: MessageToastRef<MessageToastTextComponent>,
        @Inject(MESSAGE_TOAST_DATA) public message: string
    ) {}
}
