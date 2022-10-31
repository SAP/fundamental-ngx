import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetComponent } from '@fundamental-ngx/core/action-sheet';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { IndicatorStates } from '@fundamental-ngx/core/notification';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';

export type Notification = {
    avatar: string;
    indicator: IndicatorStates;
    title: string;
    unread: boolean;
    paragraph: string;
    footerContent1: string;
    footerContent2: string;
    actionButton: string;
};

@Component({
    selector: 'fd-notification-mobile-example',
    templateUrl: './notification-mobile-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationMobileExampleComponent {
    @ViewChild(ActionSheetComponent)
    actionSheetComponent: ActionSheetComponent;

    expanded = true;
    expandedByDate = true;
    expandedByType1 = true;
    expandedByType2 = false;
    expandedByPriority = true;

    notifications: Notification[] = [
        {
            avatar: 'batch-payments',
            indicator: 'success',
            title: 'Your leave request has been accepted',
            unread: false,
            paragraph:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            footerContent1: 'SAP Analytics Cloud',
            footerContent2: '7 minutes ago',
            actionButton: 'Accept'
        },
        {
            avatar: 'customer',
            indicator: 'success',
            title: 'Your leave request has been accepted',
            unread: true,
            paragraph:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            footerContent1: 'SAP Analytics Cloud',
            footerContent2: '7 minutes ago',
            actionButton: 'Accept'
        }
    ];

    notificationsWarning: Notification[] = [
        {
            avatar: 'work-history',
            indicator: 'warning',
            title: 'Approve order #1234',
            unread: true,
            paragraph: 'Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            footerContent1: 'SAP Ariba',
            footerContent2: '7 minutes ago',
            actionButton: 'Accept'
        },
        {
            avatar: 'sap-box',
            indicator: 'warning',
            title: 'Approve order #5678',
            unread: true,
            paragraph: 'Consectetur adipiscing elit tempor incididunt ut labore et dolore magna aliqua.',
            footerContent1: 'SAP Ariba',
            footerContent2: '2 days ago',
            actionButton: 'Accept'
        }
    ];

    mobileConfig: MobileModeConfig = {
        title: 'Notifications',
        hasCloseButton: true,
        dialogConfig: { verticalPadding: false, horizontalPadding: false }
    };

    constructor(private _messageToastService: MessageToastService) {}

    actionPicked(action: string): void {
        this.openMessageToast(action);
        this.actionSheetComponent.close();
    }

    openMessageToast(action: string): void {
        const content = `${action} action performed`;
        this._messageToastService.open(content, {
            duration: 2000
        });
    }
}
