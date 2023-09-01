import { Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, ApiDocsService, currentComponentProvider } from '@fundamental-ngx/docs/shared';

export const ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./button-header/button-header.component').then((c) => c.ButtonHeaderComponent),
        providers: [currentComponentProvider('button'), ApiDocsService],
        children: [
            {
                path: '',
                loadComponent: () => import('./button-docs.component').then((c) => c.ButtonDocsComponent)
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.button } }
        ]
    }
];
