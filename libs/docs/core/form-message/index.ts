import { Routes } from '@angular/router';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '../shared/src';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./form-message-header/form-message-header.component').then((c) => c.FormMessageHeaderComponent),
        providers: [currentComponentProvider('form-message'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./form-message-docs.component').then((c) => c.FormMessageDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.formMessage } }
        ]
    }
];
