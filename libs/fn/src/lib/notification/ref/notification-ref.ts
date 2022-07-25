import { OverlayRef } from '@angular/cdk/overlay';
import { BaseToastActionDismissibleRef } from '@fundamental-ngx/fn/cdk';
import { NotificationComponent } from '../notification.component';
import { NotificationConfig } from '../config/notification-config';

export class NotificationRef<T> extends BaseToastActionDismissibleRef<T, NotificationConfig> {
    constructor(public containerInstance: NotificationComponent, public overlayRef: OverlayRef) {
        super(containerInstance, overlayRef);
    }
}
