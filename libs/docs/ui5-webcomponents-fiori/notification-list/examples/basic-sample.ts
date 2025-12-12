import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NotificationList } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list';
import { NotificationListItem } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import icon
import '@ui5/webcomponents-icons/dist/product.js';

@Component({
    selector: 'ui5-doc-notification-list-basic-sample',
    templateUrl: './basic-sample.html',
    standalone: true,
    imports: [NotificationList, NotificationListItem, Avatar]
})
export class BasicSample {
    notifications = signal([
        {
            id: '1',
            title: 'New Order Received',
            description: 'Order #12345 has been placed and is awaiting processing.',
            read: false,
            showClose: true
        },
        {
            id: '2',
            title: 'System Maintenance',
            description: 'Scheduled maintenance will occur on Saturday from 2:00 AM to 6:00 AM.',
            read: true,
            showClose: true
        },
        {
            id: '3',
            title: 'Payment Processed',
            description: 'Your payment of $129.99 has been successfully processed.',
            read: false,
            showClose: true
        }
    ]);

    lastAction = signal<string>('');

    onItemClick(event: UI5WrapperCustomEvent<NotificationList, 'ui5ItemClick'>): void {
        const title = event.detail.item.titleText;
        console.log(`Item clicked: ${title}`);
    }

    onItemClose(event: UI5WrapperCustomEvent<NotificationList, 'ui5ItemClose'>): void {
        const title = event.detail.item.titleText;
        this.notifications.update((notifs) => notifs.filter((n) => n.title !== title));
        console.log(`Notification closed: ${title}`);
    }
}
