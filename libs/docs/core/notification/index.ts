import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./notification-docs-header/notification-docs-header.component').then(
                (c) => c.NotificationDocsHeaderComponent
            ),
        providers: [currentComponentProvider('notification'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./notification-docs.component').then((c) => c.NotificationDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.notification } }
        ]
    }
];
