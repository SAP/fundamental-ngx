import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IndicatorStates, NotificationModule } from '@fundamental-ngx/core/notification';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { FDP_ICON_TAB_BAR } from '@fundamental-ngx/platform/icon-tab-bar';

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
    selector: 'fd-notification-group-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './notification-group-example.component.html',
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        ButtonComponent,
        PopoverBodyComponent,
        NotificationModule,
        FDP_ICON_TAB_BAR,
        NgTemplateOutlet,
        AvatarComponent
    ]
})
export class NotificationGroupExampleComponent {
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
}
