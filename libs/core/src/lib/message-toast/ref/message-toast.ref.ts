import { OverlayRef } from '@angular/cdk/overlay';
import { BaseToastDurationDismissibleRef, BaseToastPosition } from '@fundamental-ngx/cdk/utils';
import { MessageToastConfig } from '../config/message-toast.config';
import { MessageToastComponent } from '../message-toast.component';

export class MessageToastRef<T = any> extends BaseToastDurationDismissibleRef<T, MessageToastConfig> {
    /** Observable that is triggered when the message toast has timed out. */
    afterTimeout = this._afterDismissed$.asObservable();

    /** Data passed from the service open method. */
    readonly data: T;

    /** @hidden */
    constructor(
        public containerInstance: MessageToastComponent,
        public overlayRef: OverlayRef,
        public positionStrategy: BaseToastPosition
    ) {
        super(containerInstance, overlayRef, positionStrategy);

        this.data = this.containerInstance.config.data;
    }
}
