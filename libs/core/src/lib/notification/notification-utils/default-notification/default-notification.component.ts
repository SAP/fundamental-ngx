import { Component, Input } from '@angular/core';
import { NotificationDefault } from '../notification-default';
import { NotificationType } from '../../notification/notification.component';

@Component({
    selector: 'fd-default-notification',
    templateUrl: './default-notification.component.html'
})
export class DefaultNotificationComponent {
    /** @hidden */
    defaultConfigurationNotification: NotificationDefault;

    /** */
    type?: NotificationType;

    handleCloseButtonClick(): void {
        if (this.defaultConfigurationNotification.closeButtonCallback) {
            this.defaultConfigurationNotification.closeButtonCallback();
        }
    }

    handleApproveButtonClick(): void {
        if (this.defaultConfigurationNotification.approveCallback) {
            this.defaultConfigurationNotification.approveCallback();
        }
    }

    handleCancelButtonClick(): void {
        if (this.defaultConfigurationNotification.cancelCallback) {
            this.defaultConfigurationNotification.cancelCallback();
        }
    }
}
