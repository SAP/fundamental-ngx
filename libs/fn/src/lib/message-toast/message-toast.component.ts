import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, NgZone } from '@angular/core';
import {
    BaseToastDurationDismissibleContainerComponent,
    baseToastAnimations,
    ToastDurationDismissibleContainerComponent
} from '@fundamental-ngx/cdk/utils';
import { MessageToastConfig } from './config/message-toast.config';

@Component({
    selector: 'fn-message-toast',
    templateUrl: './message-toast.component.html',
    styleUrls: ['./message-toast.component.scss'],
    animations: [baseToastAnimations.toastState],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.max-width]': 'maxWidth',
        '[style.height]': 'height',
        '[style.min-height]': 'minHeight',
        '[style.max-height]': 'maxHeight'
    }
})
export class MessageToastComponent
    extends BaseToastDurationDismissibleContainerComponent<MessageToastConfig>
    implements OnDestroy, ToastDurationDismissibleContainerComponent<MessageToastConfig>
{
    /** @hidden */
    constructor(protected _ngZone: NgZone, config: MessageToastConfig) {
        super(_ngZone, config);
    }
}
