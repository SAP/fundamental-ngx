import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-box-docs-header/message-box-docs-header.component').then(
                (c) => c.MessageBoxDocsHeaderComponent
            ),
        providers: [currentComponentProvider('message-box'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./message-box-docs.component').then((c) => c.MessageBoxDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messageBox } }
        ]
    }
];
