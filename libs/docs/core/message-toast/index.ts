import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./message-toast-header/message-toast-header.component').then((c) => c.MessageToastHeaderComponent),
        providers: [currentComponentProvider('message-toast'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./message-toast-docs.component').then((c) => c.MessageToastDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.messageToast } }
        ]
    }
];
