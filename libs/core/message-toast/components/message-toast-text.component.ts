import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
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
    readonly toastRef = inject<MessageToastRef<MessageToastTextComponent>>(MessageToastRef);

    /** @hidden */
    readonly message = inject<string>(MESSAGE_TOAST_DATA);
}
