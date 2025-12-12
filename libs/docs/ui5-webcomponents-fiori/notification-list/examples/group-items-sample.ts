import { Component } from '@angular/core';
import { Menu, MenuItem } from '@fundamental-ngx/ui5-webcomponents';
import { NotificationList } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list';
import { NotificationListGroupItem } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list-group-item';
import { NotificationListItem } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import icons
import '@ui5/webcomponents-icons/dist/accept.js';
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/message-error.js';

@Component({
    selector: 'ui5-doc-notification-list-group-items-sample',
    templateUrl: './group-items-sample.html',
    standalone: true,
    imports: [NotificationList, NotificationListItem, NotificationListGroupItem, Avatar, Menu, MenuItem]
})
export class GroupItemsSample {}
