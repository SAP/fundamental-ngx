import { OverlayRef } from '@angular/cdk/overlay';
import { BaseDurationDismissibleToastRef } from '@fundamental-ngx/fn/cdk';
import { MessageToastConfig } from '../config/message-toast.config';
import { MessageToastComponent } from '../message-toast.component';

export class MessageToastRef<T> extends BaseDurationDismissibleToastRef<T, MessageToastConfig> {
    constructor(public containerInstance: MessageToastComponent, public overlayRef: OverlayRef) {
        super(containerInstance, overlayRef);
    }
}
