import { OverlayRef } from '@angular/cdk/overlay';
import { BaseToastDurationDismissibleRef } from '@fundamental-ngx/fn/cdk';
import { MessageToastConfig } from '../config/message-toast.config';
import { MessageToastComponent } from '../message-toast.component';

export class MessageToastRef<T> extends BaseToastDurationDismissibleRef<T, MessageToastConfig> {
    constructor(public containerInstance: MessageToastComponent, public overlayRef: OverlayRef) {
        super(containerInstance, overlayRef);
    }
}
