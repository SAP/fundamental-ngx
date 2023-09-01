import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./token-header/token-header.component').then((c) => c.TokenHeaderComponent),
        providers: [currentComponentProvider('token'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./token-docs.component').then((c) => c.TokenDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.token } }
        ]
    }
];
