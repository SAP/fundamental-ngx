import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./notification-docs-header/notification-docs-header.component').then(
                (c) => c.NotificationDocsHeaderComponent
            ),
        children: [
            {
                path: '',
                loadComponent: () => import('./notification-docs.component').then((c) => c.NotificationDocsComponent)
            }
        ],
        data: {
            primary: true
        }
    }
];
export const LIBRARY_NAME = 'notification';
export const API_FILE_KEY = 'notification';
