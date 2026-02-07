import { PortalModule } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { BaseToastDurationDismissibleContainerComponent } from '@fundamental-ngx/cdk/utils';
import { MessageToastConfig } from './config/message-toast.config';

@Component({
    selector: 'fd-message-toast',
    template: `<ng-template cdkPortalOutlet></ng-template>`,
    styleUrls: ['./message-toast.component.scss', './message-toast-animations.scss'],
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
        role: 'alert',
        tabindex: '-1'
    },
    imports: [PortalModule]
})
export class MessageToastComponent extends BaseToastDurationDismissibleContainerComponent<MessageToastConfig> {
    /**
     * @hidden
     * Override base class method to provide CSS class name
     */
    protected get _baseClassName(): string {
        return 'fd-message-toast';
    }

    /** @hidden */
    constructor(config: MessageToastConfig) {
        super(config);
    }
}
