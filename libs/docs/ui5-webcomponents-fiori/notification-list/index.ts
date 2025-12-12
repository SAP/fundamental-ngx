import { Routes } from '@angular/router';
import { NotificationListHeader } from './header/notification-list-header';
import { NotificationListDocs } from './notification-list-docs';

export const ROUTES: Routes = [
    {
        path: '',
        component: NotificationListHeader,
        data: { primary: true },
        children: [
            {
                path: '',
                component: NotificationListDocs
            }
        ]
    }
];
export const LIBRARY_NAME = 'notification-list';
export const API_FILE_KEY = 'notificationList';
