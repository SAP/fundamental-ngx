import { Component, signal } from '@angular/core';
import { UI5WrapperCustomEvent } from '@fundamental-ngx/ui5-webcomponents-base';
import { NotificationListItemImportance } from '@fundamental-ngx/ui5-webcomponents-fiori';
import { NotificationList } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list';
import { NotificationListItem } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import { Menu } from '@fundamental-ngx/ui5-webcomponents/menu';
import { MenuItem } from '@fundamental-ngx/ui5-webcomponents/menu-item';

// Import icons
import '@ui5/webcomponents-icons/dist/cart.js';
import '@ui5/webcomponents-icons/dist/share.js';
import '@ui5/webcomponents-icons/dist/task.js';
import '@ui5/webcomponents-icons/dist/user-edit.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-notification-list-actions-sample',
    templateUrl: './actions-sample.html',
    standalone: true,
    imports: [NotificationList, NotificationListItem, Avatar, Menu, MenuItem]
})
export class ActionsSample {
    importance = signal(NotificationListItemImportance);

    onMenuItemClick(event: UI5WrapperCustomEvent<Menu, 'ui5ItemClick'>): void {
        console.log(`${event.detail.text} clicked.`);
    }
}
