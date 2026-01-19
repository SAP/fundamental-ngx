import { Component, signal } from '@angular/core';
import { ValueState } from '@fundamental-ngx/ui5-webcomponents-base';
import { NotificationListItemImportance } from '@fundamental-ngx/ui5-webcomponents-fiori';
import { NotificationList } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list';
import { NotificationListItem } from '@fundamental-ngx/ui5-webcomponents-fiori/notification-list-item';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

// Import icons
import '@ui5/webcomponents-icons/dist/accept.js';
import '@ui5/webcomponents-icons/dist/alert.js';
import '@ui5/webcomponents-icons/dist/bell.js';
import '@ui5/webcomponents-icons/dist/error.js';
import '@ui5/webcomponents-icons/dist/hint.js';
import '@ui5/webcomponents-icons/dist/warning.js';

// Import Fundamental Styles
import 'fundamental-styles/dist/margins.css';

@Component({
    selector: 'ui5-doc-notification-list-states-sample',
    templateUrl: './states-sample.html',
    standalone: true,
    imports: [NotificationList, NotificationListItem, Avatar]
})
export class StatesSample {
    importance = signal(NotificationListItemImportance);
    state = signal(ValueState);
}
