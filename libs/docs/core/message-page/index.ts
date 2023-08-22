import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-page-header/message-page-header.component').then((c) => c.MessagePageHeaderComponent),
        providers: [currentComponentProvider('message-page'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./message-page-docs.component').then((c) => c.MessagePageDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messagePage } }
        ]
    }
];
