import { Component } from '@angular/core';
import {
    BaseToastPosition,
    ToastBottomCenterPosition,
    ToastBottomLeftPosition,
    ToastBottomRightPosition,
    ToastTopCenterPosition,
    ToastTopLeftPosition,
    ToastTopRightPosition
} from '@fundamental-ngx/cdk/utils';
import { NotificationService } from '@fundamental-ngx/fn/notification';

export interface NotificationPosition {
    title: string;
    position: BaseToastPosition;
}

@Component({
    selector: 'fn-notification-position-example',
    templateUrl: './notification-position-example.component.html',
    providers: [NotificationService]
})
export class NotificationPositionExampleComponent {
    currentPosition = ToastTopRightPosition;

    constructor(private _notificationService: NotificationService) {
        this.changePosition(this.currentPosition);
    }

    positionOptions: NotificationPosition[] = [
        {
            title: 'Top Left',
            position: ToastTopLeftPosition
        },
        {
            title: 'Top Center',
            position: ToastTopCenterPosition
        },
        {
            title: 'Top Right',
            position: ToastTopRightPosition
        },
        {
            title: 'Bottom Left',
            position: ToastBottomLeftPosition
        },
        {
            title: 'Bottom Center',
            position: ToastBottomCenterPosition
        },
        {
            title: 'Bottom Right',
            position: ToastBottomRightPosition
        }
    ];

    changePosition(position: BaseToastPosition): void {
        this._notificationService.setNewPositionStrategy(position);
    }

    openFromString(): void {
        this._notificationService.open({
            dismissIcon: true,
            duration: 3000,
            message: 'Modi doloremque nesciunt nemo delectus cum dignissimos est voluptas commodi.',
            title: 'Notification opened from string.'
        });
    }
}
