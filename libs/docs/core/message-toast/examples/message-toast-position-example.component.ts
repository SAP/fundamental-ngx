import { ConnectedPosition } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
    BaseToastPosition,
    ToastBottomCenterPosition,
    ToastBottomLeftPosition,
    ToastBottomRightPosition,
    ToastGlobalPosition,
    ToastTopCenterPosition,
    ToastTopLeftPosition,
    ToastTopRightPosition
} from '@fundamental-ngx/cdk';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fd-message-toast-position-example',
    templateUrl: './message-toast-position-example.component.html',
    styles: [
        `
            .fd-button {
                margin-right: 12px;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastPositionExampleComponent {
    topLeftPosition = ToastTopLeftPosition;
    bottomLeftPosition = ToastBottomLeftPosition;
    topRightPosition = ToastTopRightPosition;
    bottomRightPosition = ToastBottomRightPosition;
    topCenterPosition = ToastTopCenterPosition;
    bottomCenterPosition = ToastBottomCenterPosition;
    customPosition = CustomToastPosition;

    messageToastService = inject(MessageToastService);

    open(position: BaseToastPosition): void {
        this.messageToastService.openFromString(
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            {
                positionStrategy: position
            }
        );
    }
}

export class CustomToastPosition extends BaseToastPosition {
    static global: ToastGlobalPosition = {
        centerVertically: true,
        center: false,
        left: '1rem'
    };
    static connected: ConnectedPosition = {
        originX: 'end',
        originY: 'center',
        overlayX: 'start',
        overlayY: 'center',
        offsetY: 16
    };
}
