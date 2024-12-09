import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { NotificationModule } from '@fundamental-ngx/core/notification';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { FDP_ICON_TAB_BAR } from '@fundamental-ngx/platform/icon-tab-bar';

export type Notification = {
    avatar: string;
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
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        ButtonComponent,
        PopoverBodyComponent,
        NotificationModule,
        FDP_ICON_TAB_BAR,
        NgTemplateOutlet,
        AvatarComponent,
        MessageStripModule,
        ToolbarModule,
        ObjectStatusComponent,
        IconComponent
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
            title: 'Approve order #1234',
            unread: true,
            paragraph: 'Adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            footerContent1: 'SAP Ariba',
            footerContent2: '7 minutes ago',
            actionButton: 'Accept'
        },
        {
            avatar: 'sap-box',
            title: 'Approve order #5678',
            unread: true,
            paragraph: 'Consectetur adipiscing elit tempor incididunt ut labore et dolore magna aliqua.',
            footerContent1: 'SAP Ariba',
            footerContent2: '2 days ago',
            actionButton: 'Accept'
        }
    ];
}
