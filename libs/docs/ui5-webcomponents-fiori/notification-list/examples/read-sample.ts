import { Component, signal } from '@angular/core';
import { Button } from '@fundamental-ngx/ui5-webcomponents';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NotificationList } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list';
import { NotificationListItem } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import icons
import '@ui5/webcomponents-icons/dist/document.js';
import '@ui5/webcomponents-icons/dist/email.js';
import '@ui5/webcomponents-icons/dist/locked.js';
import '@ui5/webcomponents-icons/dist/sys-monitor.js';

interface Notification {
    id: string;
    title: string;
    description: string;
    read: boolean;
    icon: string;
}

@Component({
    selector: 'ui5-doc-notification-list-read-sample',
    templateUrl: './read-sample.html',
    standalone: true,
    imports: [NotificationList, NotificationListItem, Avatar, Button]
})
export class ReadSample {
    notifications = signal<Notification[]>([
        {
            id: '1',
            title: 'New Message from John',
            description: 'Hey, can we schedule a meeting for tomorrow?',
            read: false,
            icon: 'email'
        },
        {
            id: '2',
            title: 'Weekly Report Available',
            description: 'Your weekly analytics report is ready for review.',
            read: true,
            icon: 'document'
        },
        {
            id: '3',
            title: 'Security Alert',
            description: 'A new login from an unrecognized device was detected.',
            read: false,
            icon: 'locked'
        },
        {
            id: '4',
            title: 'Update Completed',
            description: 'The system update has been successfully installed.',
            read: true,
            icon: 'sys-monitor'
        }
    ]);

    unreadCount = signal(2);

    onItemClick(event: UI5WrapperCustomEvent<NotificationList, 'ui5ItemClick'>): void {
        const clickedItem = event.detail.item;
        const title = clickedItem.titleText;

        this.notifications.update((notifs) => notifs.map((n) => (n.title === title ? { ...n, read: true } : n)));

        this.updateUnreadCount();
    }

    markAllAsRead(): void {
        this.notifications.update((notifs) => notifs.map((n) => ({ ...n, read: true })));
        this.updateUnreadCount();
    }

    private updateUnreadCount(): void {
        const count = this.notifications().filter((n) => !n.read).length;
        this.unreadCount.set(count);
    }
}
