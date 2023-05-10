import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { BaseToastDurationDismissibleContainerComponent } from '@fundamental-ngx/cdk/utils';
import { MessageToastConfig } from './config/message-toast.config';
import { toastAnimation } from './constants/message-toast.animation';

@Component({
    selector: 'fd-message-toast',
    template: `<ng-template cdkPortalOutlet></ng-template>`,
    styleUrls: ['./message-toast.component.scss'],
    animations: [toastAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.max-width]': 'maxWidth',
        '[style.height]': 'height',
        '[style.min-height]': 'minHeight',
        '[style.max-height]': 'maxHeight',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-live]': '"polite"',
        '[attr.id]': 'id',
        class: 'fd-message-toast'
    }
})
export class MessageToastComponent extends BaseToastDurationDismissibleContainerComponent<MessageToastConfig> {
    /** @hidden */
    constructor(config: MessageToastConfig) {
        super(config);
    }
}
