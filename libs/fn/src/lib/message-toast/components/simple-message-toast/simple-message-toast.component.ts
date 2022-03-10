import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { ToastTextComponent } from '@fundamental-ngx/fn/cdk';
import { MESSAGE_TOAST_DATA } from '../../constants/message-toast.token';
import { MessageToastRef } from '../../ref/message-toast.ref';

@Component({
    selector: 'fn-simple-message-toast',
    template: `{{ message }}`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SimpleMessageToastComponent implements ToastTextComponent {
    constructor(
        public toastRef: MessageToastRef<SimpleMessageToastComponent>,
        @Inject(MESSAGE_TOAST_DATA) public message: string
    ) {}
}
