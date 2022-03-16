import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, NgZone } from '@angular/core';
import {
    BaseToastDurationDismissibleContainerComponent,
    baseToastAnimations,
    ToastDurationDismissibleContainerComponent
} from '@fundamental-ngx/fn/cdk';
import { NotificationConfig } from './config/notification-config';

@Component({
    selector: 'fn-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    animations: [baseToastAnimations.toastState],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.class]': '_composedClass',
        '[style.width]': 'width',
        '[style.min-width]': 'minWidth',
        '[style.max-width]': 'maxWidth',
        '[style.height]': 'height',
        '[style.min-height]': 'minHeight',
        '[style.max-height]': 'maxHeight'
    }
})
export class NotificationComponent
    extends BaseToastDurationDismissibleContainerComponent<NotificationConfig>
    implements OnDestroy, ToastDurationDismissibleContainerComponent<NotificationConfig>
{
    /** @hidden */
    constructor(protected _ngZone: NgZone, config: NotificationConfig) {
        super(_ngZone, config);
    }

    /** @hidden */
    get _composedClass(): string {
        return ['fn-notification', this.config.semantic?.state ? `fn-notification--${this.config.semantic?.state}` : '']
            .filter((c) => !!c)
            .join(' ');
    }
}
