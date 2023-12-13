import { Routes } from '@angular/router';
import { NotificationDocsHeaderComponent } from './notification-docs-header/notification-docs-header.component';
import { NotificationDocsComponent } from './notification-docs.component';

export const ROUTES: Routes = [
    {
        path: '',
        component: NotificationDocsHeaderComponent,
        children: [
            {
                path: '',
                component: NotificationDocsComponent
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'notification';
export const LIBRARY_IMPORT_PATH = '@fundamental-ngx/core/notification';
export const API_FILE_KEY = 'notification';
